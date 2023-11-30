
# [Level.2] 행렬 테두리 회전

## 풀이

```java
class Solution {
    public int[] solution(int rows, int columns, int[][] queries) {
		int[] answer = new int[queries.length];
		if (queries.length == 1) {
			int x = queries[0][0];
			int y = queries[0][1];
			if (x == 1 && y == 1) return new int[]{1};
			else if (x == 1 || y == 1) return new int[]{x + y};
			return new int[]{(int)Math.pow(x, y)};
		}
		int[][] table = createTable(rows, columns);
		for (int i = 0; i < answer.length; i++) {
			answer[i] = rotation(table, queries[i]);
		}

		return answer;
	}

	public int rotation(int[][] table, int[] query) {
		int startByY = query[0] - 1;
		int startByX = query[1] - 1;
		int endByY = query[2] - 1;
		int endByX = query[3] - 1;

		int pointerY = startByY;
		int pointerX = startByX;
		int smallestNumber = table[pointerY][pointerX];

		int calculatedWidthRange = endByX - startByX;
		int calculatedHeightRange = endByY - startByY;

		int temp = table[startByY+1][startByX];
		int box = 0;
		for (int i = 0; i < calculatedWidthRange; i++, pointerX++) {
			box = table[pointerY][pointerX];
			table[pointerY][pointerX] = temp;
			temp = box;
			if (table[pointerY][pointerX] < smallestNumber) {
				smallestNumber = table[pointerY][pointerX];
			}
		}
		for (int i = 0; i < calculatedHeightRange; i++, pointerY++) {
			box = table[pointerY][pointerX];
			table[pointerY][pointerX] = temp;
			temp = box;
			if (table[pointerY][pointerX] < smallestNumber) {
				smallestNumber = table[pointerY][pointerX];
			}
		}
		for (int i = 0; i < calculatedWidthRange; i++, pointerX--) {
			box = table[pointerY][pointerX];
			table[pointerY][pointerX] = temp;
			temp = box;
			if (table[pointerY][pointerX] < smallestNumber) {
				smallestNumber = table[pointerY][pointerX];
			}
		}
		for (int i = 0; i < calculatedHeightRange; i++, pointerY--) {
			box = table[pointerY][pointerX];
			table[pointerY][pointerX] = temp;
			temp = box;
			if (table[pointerY][pointerX] < smallestNumber) {
				smallestNumber = table[pointerY][pointerX];
			}
		}

		return smallestNumber;
	}
	
	private int[][] createTable(int rows, int columns) {
		int[][] table = new int[rows][columns];
		int number = 1;
		for (int y = 0; y < rows; y++) {
			for (int x = 0; x < columns; x++) {
				table[y][x] = number++;
			}
		}
		return table;
	}
}
```

## 결과

![pollra_image_01.png](images%2Fpollra_image_01.png)
