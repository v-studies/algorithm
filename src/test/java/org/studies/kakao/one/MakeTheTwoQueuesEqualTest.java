package org.studies.kakao.one;

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