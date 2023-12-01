# 풀이

## 풀이 1번. 런타임 에러
```java
public List<Integer> solution(int[] fees, String[] records) {
		List<Integer> answer = new ArrayList<>();
		final int limitTime = 1439; // 23:59

		Map<String, Integer> hoursOfUse = new HashMap<>();

		for (String record : records) {
			String[] split = record.split(" ");
			if ("IN".equals(split[2])) {
				hoursOfUse.put(split[1] + split[2], timeToNumber(split[0]));
			} else { // "OUT".equals(split[2]) == true
				Integer startTime = hoursOfUse.get(split[1] + "IN");
				hoursOfUse.put(split[1], timeToNumber(split[0]) - startTime);
				hoursOfUse.remove(split[1] + "IN");
			}
			System.out.println("record = " + record + " / " + hoursOfUse);
		}
		for (Map.Entry<String, Integer> entry : hoursOfUse.entrySet()) {
			String key = entry.getKey();
			Integer startTime = entry.getValue();
			if (key.length() > 4 && key.charAt(4) == 'I') {
				if (hoursOfUse.containsKey(key.substring(0, 4))) {
					hoursOfUse.put(key.substring(0, 4), hoursOfUse.get(key.substring(0, 4)) + limitTime - startTime);
				} else {
					hoursOfUse.put(key.substring(0, 4), limitTime - startTime);
				}
			}
		}
		String[] recordOrder = hoursOfUse.keySet().toArray(new String[0]);
		Arrays.sort(recordOrder);

		System.out.println("hoursOfUse = " + hoursOfUse);

		for (String record : recordOrder) {
			if (record.length() < 5) {
				Integer useTime = hoursOfUse.get(record);
				int calculateFee = 0;
				calculateFee += fees[1];
				if (useTime > fees[0]) {
					System.out.println(calculateFee +" + "+((useTime - fees[0]) / fees[2] + ((useTime - fees[0]) % fees[2] == 0 ? 0 : 1) ) + " * " + fees[3]);
					calculateFee += ((useTime - fees[0]) / fees[2] + ((useTime - fees[0]) % fees[2] == 0 ? 0 : 1) ) * fees[3];
				}
				answer.add(calculateFee);
			}
		}

		return answer;
	}

	private int timeToNumber(String time) {
		String[] split = time.split(":");
		return (Integer.parseInt(split[0]) * 60) + Integer.parseInt(split[1]);
	}

```


## 풀이 2번. 성공
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
	private int timeToNumber(String time) {
		String[] split = time.split(":");
		return (Integer.parseInt(split[0]) * 60) + Integer.parseInt(split[1]);
	}

	public int[] solution(int[] fees, String[] records) {
		Map<String, List<Integer>> useTimes = new HashMap<>();

		for (int i = 0; i < records.length; i++) {
			String[] information = records[i].split(" ");
			if (useTimes.containsKey(information[1])) {
				List<Integer> useTime = useTimes.get(information[1]);
				useTime.add(timeToNumber(information[0]));
				useTimes.put(information[1], useTime);
			} else {
				List<Integer> initArray = new ArrayList<>(records.length - i);
				initArray.add(timeToNumber(information[0]));
				useTimes.put(information[1], initArray);
			}
		}

		String[] recordOrder = useTimes.keySet().toArray(new String[0]);
		Arrays.sort(recordOrder);

		int[] answer = new int[recordOrder.length];

		int answerIndex = 0;
		for (int i = 0; i < recordOrder.length; i++) {
			List<Integer> useTime = useTimes.get(recordOrder[i]);
			int totalUseTime = totalUseTime(useTime);

			answer[answerIndex++] = calculateFee(totalUseTime, fees);
		}

		return answer;
	}

	public int calculateFee(int time, int[] fees) {
		if (time < fees[0]) {
			return fees[1];
		}
		return (((time - fees[0]) / fees[2] + ((time - fees[0]) % fees[2] == 0 ? 0 : 1)) * fees[3]) + fees[1];
	}

	public int totalUseTime(List<Integer> useTimes) {
		final int limitTime = 1439; // 23:59
		if (useTimes.size() == 1) {
			return limitTime - useTimes.get(0);
		}
		if (useTimes.size() == 2) {
			return useTimes.get(1) - useTimes.get(0);
		}
		int forCount = useTimes.size() - (useTimes.size() % 2);
		int result = 0;
		for (int i = 0; i < forCount; i+= 2) {
			result += useTimes.get(i+1) - useTimes.get(i);
		}
		if (useTimes.size() % 2 == 1) {
			result += limitTime - useTimes.get(useTimes.size()-1);
		}
		return result;
	}
}
```

# 결과

![pollra_image.png](images%2Fpollra_image.png)
