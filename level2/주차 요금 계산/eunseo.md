# 문제
- [주차 요금 계산]([https://school.programmers.co.kr/learn/courses/30/lessons/150369](https://school.programmers.co.kr/learn/courses/30/lessons/92341))


# 내용
1. 먼저, TreeSet을 이용하여 차량번호를 저장한다. (TreeSet은 이진트리구조로서, 저장 시 작은 차량번호 순으로 저장된다.
2. 저장한 차량번호를 반복문으로 돌면서, 입차/출차 시간을 리스트에 저장한다. (시간을 저장할때는 h*60 + m 으로 (분) 단위로 저장한다.)
3. 입차/출차 저장 시 입차는 있으나, 출차가 없다면 11:59분에 출차한것으로 되어야하므로, 23*60 + 59를 리스트에 추가로 저장한다.
4. 저장된 타임 리스트를 통해 누적 주차 시간과 주차 요금을 계산하면 된다. 


# 풀이
```java
import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;


class Solution {
    public static List<Integer> solution(int[] fees, String[] records) {

		List<Integer> answer = new ArrayList<>();

		int default_time = fees[0];
		int default_cost = fees[1];
		int unit_time = fees[2];
		int unit_cost = fees[3];

		TreeSet<String> carSet = getCarNumberTreeSet(records);

		for (String car : carSet) {
            List<Integer> carInOutTimeList = new ArrayList<>();
            
            for(String record : records){
                String[] history = record.split(" ");
                
                String carNum = history[1];

			    if(carNum.equals(car)){
                    String time[] = history[0].split(":");
                    int h = Integer.valueOf(time[0]);
                    int m = Integer.valueOf(time[1]);
                    
                    carInOutTimeList.add(h*60 + m);
                }
            }
            
            if(carInOutTimeList.size() % 2 == 1){
                carInOutTimeList.add(23*60 + 59);
            }
            
            int sum = 0;
            
            for(int i=0; i< carInOutTimeList.size(); i+=2){
                int diff = carInOutTimeList.get(i+1) - carInOutTimeList.get(i);
                sum += diff;
            }
            
            if(default_time >= sum){
                answer.add(default_cost);
                continue;
            }
            
            double ceilUnit = Math.ceil((sum - default_time) /  (double)unit_time);
            
            answer.add(default_cost + (int) ceilUnit *  unit_cost);
		}

		return answer;
	}
    
    private static TreeSet<String> getCarNumberTreeSet(String[] records) {
		TreeSet<String> carSet = new TreeSet<>();

		for(String record : records){
			String[] history = record.split(" ");
			carSet.add(history[1]);
		}
		return carSet;
	}

}
```

![image](https://github.com/v-studies/algorithm/assets/70589857/dc8a7298-8ab6-4a13-af72-b3e77afef00d)

