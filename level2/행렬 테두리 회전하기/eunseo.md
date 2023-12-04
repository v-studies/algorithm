# 문제
- [행렬 테두리 회전하기](https://school.programmers.co.kr/learn/courses/30/lessons/77485)


# 내용
```
queries for문을 돌면서,
(1) 시계방향으로 map을 돌며 순회한 곳의 가장 작은 값 구하기
(2) 시계방향으로 돌면서 한칸씩 값 밀기 -> 핵심 로직 (next = map[i][j]; map[i][j] = prev; prev = next;)
(3) 반복
```


# 풀이
```java
import java.util.*;

class Solution {
    public List<Integer> solution(int rows, int columns, int[][] queries) {
        List<Integer> answer = new ArrayList<>();
        
        int map[][] = new int[rows][columns];

		int cnt = 1;
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < columns; j++) {
				map[i][j] = cnt++;
			}
		}


		for (int[] query : queries) {
			int startRow = query[0] - 1;
			int startCol = query[1] - 1;

			int endRow = query[2] - 1;
			int endCol = query[3] - 1;

			int prev = map[startRow][startCol];
			int next = map[startRow][startCol];
			int min = Integer.MAX_VALUE;

			for (int i = startRow; i <= startRow; i++) {
				for (int j = startCol + 1; j <= endCol; j++) {
					min = Math.min(min, map[i][j]);
					next = map[i][j];
					map[i][j] = prev;
					prev = next;
				}
			}

			for (int i = startRow + 1; i <= endRow; i++) {
				for (int j = endCol; j <= endCol; j++) {
					min = Math.min(min, map[i][j]);
					next = map[i][j];
					map[i][j] = prev;
					prev = next;
				}
			}

			for (int i = endRow; i <= endRow; i++) {
				for (int j = endCol - 1; j >= startCol; j--) {
					min = Math.min(min, map[i][j]);
					next = map[i][j];
					map[i][j] = prev;
					prev = next;
				}
			}

			for (int i = endRow - 1; i >= startRow; i--) {
				for (int j = startCol; j <= startCol; j++) {
					min = Math.min(min, map[i][j]);
					next = map[i][j];
					map[i][j] = prev;
					prev = next;
				}
			}

			answer.add(min);

		}
        
        
        
        return answer;
    }
}
```

![image](https://github.com/v-studies/algorithm/assets/70589857/514fdd90-c0d7-4eef-87c4-cbd934127c98)


