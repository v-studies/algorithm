# 문제

- [두 큐 합 같게 만들기 : 프로그래머스]

# 내용
- QeueL, QueueR 을 이용하여 합이 더 큰 큐에서 작은 큐로 하나씩 이동시키면 된다.
- 시간 복잡도 O(N) -> 최악의 시간복잡도 3N - 3 

# 문제 풀이

```java
import java.util.*;

class Solution {
    public long solution(int[] queue1, int[] queue2) {		 
    Queue<Integer> queueL = new LinkedList<>();
		Queue<Integer> queueR = new LinkedList<>();
        
		long sumL = 0;
		long sumR = 0;
		long cnt = 0;

		for (int i = 0; i < queue1.length; i++) {
			sumL += queue1[i];
			queueL.add(queue1[i]);

			sumR += queue2[i];
			queueR.add(queue2[i]);
		}
        
		while (!queueL.isEmpty() && !queueR.isEmpty()) {

                        if(sumL == sumR) return cnt;

			if (sumL > sumR) {
					int poll = queueL.poll();
					sumL -= poll;
					sumR += poll;
					queueR.add(poll);
					cnt++;
			} else if(sumR > sumL) {
					int poll = queueR.poll();
					sumR -= poll;
					sumL += poll;
					queueL.add(poll);
					cnt++;
			  }
		  }
        return -1;
   }  
}
```

## 시간 초과 발생 
- 최악의 시간복잡도를 넘어갈 경우 while문 반복을 멈춰야 한다.
- 즉, 종료 조건이 추가로 필요하다. 

![스크린샷 2023-11-21 오전 11 09 42](https://github.com/eunseo2/Programmers/assets/70589857/2b0b7992-d847-42c0-9070-15c70de5c58e)

그렇다면, 최악의 시간복잡도를 게산해보자. 

<img src="https://github.com/eunseo2/Programmers/assets/70589857/94113d90-e499-419b-883a-80e7790b6ad0" width="300" height="300">

ex) [......X.] [..N] 이 주어졌다고 가정해보자. 

X가 가장 큰 수이고, 다른 모든 원소의 합과 X 원소의 수가 동일하다. 
즉 [L1....R1]  [L2....R2] 로 볼 경우 X가 L2이면서 R2가 되는 시점이 최악의 시간복잡도이다. 

L1 = a + 1
R1 = n + a 가 된다.

대략 a = n-2 이므로, n-2 + 1 + n + n - 2 = 3n -3 이 된다. 

### 문제 해결 코드
```java
import java.util.*;

class Solution {
    public long solution(int[] queue1, int[] queue2) {		 
        Queue<Integer> queueL = new LinkedList<>();
		Queue<Integer> queueR = new LinkedList<>();
    
		long sumL = 0;
		long sumR = 0;
		long cnt = 0;

		for (int i = 0; i < queue1.length; i++) {
			sumL += queue1[i];
			queueL.add(queue1[i]);

			sumR += queue2[i];
			queueR.add(queue2[i]);
		}
        
		 while (!queueL.isEmpty() && !queueR.isEmpty() ) {
            
                        if((queue1.length+ queue2.length) * 3 - 3 < cnt){ // 최악의 시간복잡도 종료 조건 추가 
                           return -1;
                        }
            
      
                        if(sumL == sumR) return cnt;
            
			if (sumL > sumR) {
					int poll = queueL.poll();
					sumL -= poll;
					sumR += poll;
					queueR.add(poll);
					cnt++;
			} else if(sumR > sumL) {
					int poll = queueR.poll();
					sumR -= poll;
					sumL += poll;
					queueL.add(poll);
					cnt++;
			}
		}
        
        return -1;
    }  
}

```


