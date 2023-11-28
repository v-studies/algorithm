# 문제
- [Level.3] [미로 탈출 명령어](https://school.programmers.co.kr/learn/courses/30/lessons/150365)


# 풀이
```java
import java.util.*;

class Solution {
    static PriorityQueue<String> pq = new PriorityQueue<>(String::compareTo);
    
    public String solution(int n, int m, int x, int y, int r, int c, int k) {
       Queue<int[]> q = new LinkedList<>();
		q.add(new int[] {x, y});

		Queue<String> dq = new LinkedList<>();
		dq.add("");

		int[] dx = {1, 0, 0, -1};
		int[] dy = {0, -1, 1, 0};
		String[] direct = {"d", "l", "r", "u"};

		int move = 0;
		while (!q.isEmpty()) {
			move++;
			int[] array = q.poll();
			int i = array[0];
			int j = array[1];
			String prevD = dq.poll();

			for (int p = 0; p < 4; p++) {
				int nx = i + dx[p];
				int ny = j + dy[p];

				int remainDistance = Math.abs(nx - r) + Math.abs(ny - c);

				if (nx > n || ny > m || nx < 1 || ny < 1)
					continue;

				if (prevD.length() > k)
					continue;

				if (k - move >= remainDistance && (k - move - remainDistance) % 2 == 0) {
					String result = prevD + direct[p];
					q.add(new int[] {nx, ny});
					dq.add(result);
					if (nx == r && ny == c && k == result.length()) {
						return result;
					}
					break;
				}

			}
		}
        
        return "impossible";
    }
}
```
