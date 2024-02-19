# [Level.2] 요격 시스템

## 결과

![pollra-1.png](images%2Fpollra-1.png)

## 문제 풀이

1. target[n][0] 을 1차 기준으로 정렬, 같은 경우 target[n][1] 을 2차 기준으로 정렬
2. 배열을 돌아가며 타겟 범위를 좁힘
3. 좁혀진 범위를 벗어난 경우 answer 증가 및 해당 범위부터 다시 2번으로 돌아감
4. 모든 배열을 돌았다면 리턴

## 코드

```java
package org.example.studies.programers.level.two;

import java.util.Arrays;

public class 요격시스템 {
 public int solution(int[][] targets) {
  int answer = 1;

  // 작은 순서대로 정렬. 앞 숫자를 기준으로 정렬하고 같으면 뒷 숫자를 기준으로 정렬
  Arrays.sort(targets, (a, b) -> {
   if (a[0] == b[0]) {
    return a[1] - b[1];
   }
   return a[0] - b[0];
  });

  int lastVisitedIndex = 0;

  for (int i = 0; i < targets.length -1; i = lastVisitedIndex) {
   int[] target = targets[i];
   int min = target[0];
   int height = target[1];

   for (int j = i + 1; j < targets.length; j++) {

    int nextMin = targets[j][0];
    int nextHeight = targets[j][1];

    lastVisitedIndex = j;
    if (!(min <= nextMin && nextMin < height)) {
     answer++;
     break;
    } else if (min <= nextMin && nextMin < height) {
     min = nextMin;
    }

    if (min <= nextMin) {
     min = nextMin;
    }
    if (height > nextHeight) {
     height = nextHeight;
    }
   }
  }

  return answer;
 }
}
```