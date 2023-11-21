# 문제

- [Level.2] [두 큐 합 같게 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/118667)

### 시간 복잡도

O(3n)

### 공간 복잡도

O(1)

### 풀이

#### 문제 풀이 코드

```java

import java.util.Arrays;

public class MakeTheTwoQueuesEqual {
	public int solution(int[] queue1, int[] queue2) {
		int count = 0;
		long queue1Sum = sum(queue1);
		long queue2Sum = sum(queue2);
		long totalSum = queue1Sum + queue2Sum;
		long reference = totalSum/2;

		if (queue1Sum == reference) {
			return 0;
		}
		if (queue1.length == 1 || totalSum % 2 == 1) {
			return -1;
		}
		int limitSwitching = queue1.length * 3;

		long minusSum = 0;
		long plusSum = 0;

		int query1Index = 0;
		int query2Index = 0;

		for (int i = 0; i <= limitSwitching; i++) {
			if (reference == plusSum + queue1Sum - minusSum) {
				break;
			}
			if (reference < plusSum + queue1Sum - minusSum) {
				long pop = pop(queue1, query1Index++, queue2);
				minusSum += pop;
				count++;
				System.out.println(Arrays.toString(queue1) + ", " + Arrays.toString(queue2) + "plus["+plusSum+"]/minus["+minusSum+"]/origin:["+queue1Sum+"]/pop1:["+pop+"]");
			} else if (reference > plusSum + queue1Sum - minusSum) {
				long pop = pop(queue2, query2Index++, queue1);
				plusSum += pop;
				count++;
				System.out.println(Arrays.toString(queue1) + ", " + Arrays.toString(queue2) + "plus["+plusSum+"]/minus["+minusSum+"]/origin:["+queue1Sum+"]/pop2:["+pop+"]");
			}
		}

		if (reference == plusSum + queue1Sum - minusSum){
			System.out.println(Arrays.toString(queue1) + ", " + Arrays.toString(queue2) + "plus["+plusSum+"]/minus["+minusSum+"]/origin:["+queue1Sum+"]");
			return count;
		}

		return -1;
	}

	public long sum(int[] array) {
		long result = 0L;
		for (int i : array) {
			result += i;
		}
		return result;
	}

	public long pop(int[] array1, int arrayIndex, int[] array2) {
		if (arrayIndex / array1.length % 2 == 0) {
			return array1[arrayIndex % array1.length];
		}
		return array2[arrayIndex % array1.length];
	}
}

```

#### 테스트 코드

```java

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Kakao TECH - 두 큐 합 같게 만들기")
class MakeTheTwoQueuesEqualTest {

	MakeTheTwoQueuesEqual makeTheTwoQueuesEqual = new MakeTheTwoQueuesEqual();

	@Test
	@DisplayName("[3, 2, 7, 2], [4, 6, 5, 1] => 2")
	void example01() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {3, 2, 7, 2}, new int[] {4, 6, 5, 1});

		assertEquals(solution, 2);
	}

	@Test
	@DisplayName("[1, 2, 1, 2], [1, 10, 1, 2] => 7")
	void example02() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {1, 2, 1, 2}, new int[] {1, 10, 1, 2});

		assertEquals(solution, 7);
	}

	@Test
	@DisplayName("[1, 1], [1, 5] => -1")
	void example03() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {1, 1}, new int[] {1, 5});

		assertEquals(solution, -1);
	}

	@Test
	@DisplayName("[2], [1] => -1")
	void example04() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {2}, new int[] {1});

		assertEquals(solution, -1);
	}

	@Test
	@DisplayName("[2, 5], [1, 3] => -1")
	void example05() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {2, 5}, new int[] {1, 3});

		assertEquals(solution, -1);
	}

	@Test
	@DisplayName("[1, 1, 1, 1, 1, 1, 1, 1, 1, 10], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] => -1")
	void example06() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {1, 1, 1, 1, 1, 1, 1, 1, 1, 10}, new int[] {1, 1, 1, 1, 1, 1, 1, 1, 1, 1});

		assertEquals(solution, -1);
	}

	/**
	 * 예외 케이스:
	 * [1, 1, 1, 1, 1], [1, 1, 1, 9, 1]
	 *
	 * [1, 1, 1, 1, 1, 1], [1, 1, 9, 1]pop2:[1]
	 * [1, 1, 1, 1, 1, 1, 1], [1, 9, 1]pop2:[1]
	 * [1, 1, 1, 1, 1, 1, 1, 1], [9, 1]pop2:[1]
	 * [1, 1, 1, 1, 1, 1, 1, 1, 9], [1]pop2:[9]
	 * [1, 1, 1, 1, 1, 1, 1, 9], [1, 1]pop1:[1]
	 * [1, 1, 1, 1, 1, 1, 9], [1, 1, 1]pop1:[1]
	 * [1, 1, 1, 1, 1, 9], [1, 1, 1, 1]pop1:[1]
	 * [1, 1, 1, 1, 9], [1, 1, 1, 1, 1]pop1:[1]
	 * [1, 1, 1, 9], [1, 1, 1, 1, 1, 1]pop1:[1]
	 * [1, 1, 9], [1, 1, 1, 1, 1, 1, 1]pop1:[1]
	 * [1, 9], [1, 1, 1, 1, 1, 1, 1, 1]pop1:[0]
	 * [9], [1, 1, 1, 1, 1, 1, 1, 1, 1]...?
	 */
	@Test
	@DisplayName("[1, 1, 1, 1, 1], [1, 1, 1, 9, 1] => 12")
	void example07() {
		int solution = makeTheTwoQueuesEqual.solution(new int[] {1, 1, 1, 1, 1}, new int[] {1, 1, 1, 9, 1});

		assertEquals(solution, 12);
	}
}
```

## 결과
![pollra_image_01.png](images%2Fpollra_image_01.png)
