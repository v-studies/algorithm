package org.studies.kakao.one;

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
		int limitSwitching = queue1.length + queue2.length + 1;

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
