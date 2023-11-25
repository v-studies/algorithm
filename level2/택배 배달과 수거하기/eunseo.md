# 문제
- [택배 배달과 수거하기](https://school.programmers.co.kr/learn/courses/30/lessons/150369)

# 내용
1. 최소 이동 거리를 구하기 위해선, 무조건 이동해야하는 최대 거리부터 이동거리를 구하면 된다.
2. 즉, 마지막집부터 배달할 재활용 택배 상자의 개수와 수거할 빈 재활용 택배 상자의 개수를 확인하여 주어진 cap과 비교하여 해당 집에 이동할 필요가 있는지 판단하면 된다.
3. 만약 한번 이동한다면, 배달할 수 있는 개수 += cap 이며 pickup 개수도 += cap 개 증가한다.
4. 현재 배달 및 픽업할 수 있는 개수와 집마다 배달 및 픽업 개수를 비교하여 이동이 필요하다면 집까지의 거리 * 2를 해주면 된다. 


# 풀이
```java
class Solution{
  public long solution(int cap, int n, int[] deliveries, int[] pickups) {
    long answer = -1;
    int delivery = 0;
    int pickup = 0;

    for (int i = n - 1; i >= 0; i--) {
        if (deliveries[i] > 0 || pickups[i] > 0) {
            int move = 0;
            while (delivery < deliveries[i] || pickup < pickups[i]) {
                delivery += cap;
                pickup += cap;
                move++;
            }
            delivery -= deliveries[i];
            pickup -= pickups[i];
            answer += (i + 1) * move * 2;
          }
        }
        return answer+1;
    }
}
```

![image](https://github.com/v-studies/algorithm/assets/70589857/5543da98-cb04-418b-adef-7fcadf288d85)
