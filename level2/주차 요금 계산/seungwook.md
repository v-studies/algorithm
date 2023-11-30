### [Level.2] 주차 요금 계산

- 차량이 'IN' 했을경우 map에 넣어주고 'OUT' 했을경우 주차시간을 계산하여 totalTimeMap에 넣어주고 map에서 제거한다.
- map에 계속 남아있는 차량은 출차를 안한차량이므로 23:59으로 주차시간을 계산하여 totalTimeMap에 넣어준다.
- 차량번호순으로 totalTimeMap을 탐색해 주차시간을 비용으로 환산한다.
  - 주차시간이 기본시간보다 작으면 기본요금만 나온다.
  - 주차시간이 기본시간보다 더 크다면 단위시간당 단위요금을 추가하고 나머지값은 올림해준다.

### 코드

```java

public static List<Integer> solution(int[] fees, String[] records) {
		List<Integer> answer = new ArrayList<>();

		int basicTime = fees[0];
		int basicAmount = fees[1];
		int unitTime = fees[2];
		int unitAmount = fees[3];
		int lastTimeMin = 23 * 60 + 59;

		Map<Integer, String> map = new HashMap<>(); // carNumber, time
		Map<Integer, Integer> totalTimeMap = new HashMap<>(); // carNumber, remainMin

		for (String record : records) {
			String[] split = record.split(" ");
			String time = split[0];
			Integer carNumber = Integer.valueOf(split[1]);
			String status = split[2];
			if (status.equals("IN")) {
				map.put(carNumber, time);
			} else {
				String inTime = map.get(carNumber);
				Integer inTimeMin = getMinute(inTime);
				Integer outTimeMin = getMinute(time);

				Integer remainMin = outTimeMin - inTimeMin;

				// totalTimeMap에 존재한다면 이미 계산한 금액이 존재하므로 누적으로 쌓는다.
				totalTimeMap.merge(carNumber, remainMin, Integer::sum);
				map.remove(carNumber);
			}
		}

		// map에 남아있는게 있다면 "OUT"을 안한 차량이다.
		for (Integer number : map.keySet()) {
			String time = map.get(number);
			Integer inTimeMin = getMinute(time);

			Integer remainMin = lastTimeMin - inTimeMin;

			totalTimeMap.merge(number, remainMin, Integer::sum);
		}

		List<Integer> carNumbers = new ArrayList<>(totalTimeMap.keySet());
		Collections.sort(carNumbers);

		// 주차시간으로 요금계산
		for (Integer carNumber : carNumbers) {
			int parkingTime = totalTimeMap.get(carNumber);

			if (parkingTime <= basicTime) {
				answer.add(basicAmount);
			} else {
				int totalAmount = 0;

				parkingTime -= basicTime;
				totalAmount += basicAmount;

				int unit = parkingTime / unitTime;
				int remainTime = parkingTime % unitTime;

				totalAmount += unit * unitAmount;

				// 올림처리
				if (remainTime > 0) {
					totalAmount += unitAmount;
				}
				answer.add(totalAmount);
			}
		}

		return answer;
	}

	private static Integer getMinute(String inTime) {
		String[] timeMins = inTime.split(":");
		return Integer.parseInt(timeMins[0]) * 60 + Integer.parseInt(timeMins[1]);
	}

```


### 결과

![img.png](seungwook-1.png)
