package coding;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class 두_큐_합_같게_만들기 {
	public static void main(String[] args) {
		int[] queue1 = {3, 2, 7, 2};
		int[] queue2 = {4, 6, 5, 1};
		System.out.println(solution(queue1, queue2));
	}

	public static int solution(int[] queue1, int[] queue2) {
		int answer = 0;
		int count = 0;

		int size = 600000;

		long totalQ1 = Arrays.stream(queue1).sum();
		long totalQ2 = Arrays.stream(queue2).sum();

		Integer[] q1 = Arrays.stream(queue1).boxed().toArray(Integer[]::new);
		Integer[] q2 = Arrays.stream(queue2).boxed().toArray(Integer[]::new);

		List<Integer> list1 = Arrays.stream(q1).collect(Collectors.toList());
		List<Integer> list2 = Arrays.stream(q2).collect(Collectors.toList());

		long total = totalQ1 + totalQ2;

		if (total % 2 != 0) {
			return -1;
		}

		long half = total / 2;

		for (Integer i : list1) {
			if (i > half) {
				return -1;
			}
		}

		for (Integer i : list2) {
			if (i > half) {
				return -1;
			}
		}

		while (true) {
			if (totalQ1 > totalQ2) {
				Long pop = Long.valueOf(list1.remove(0));
				totalQ1 -= pop;
				totalQ2 += pop;
				list2.add(list2.size(), pop.intValue());
				answer++;
			} else if (totalQ1 < totalQ2) {
				Long pop = Long.valueOf(list2.remove(0));
				totalQ1 += pop;
				totalQ2 -= pop;
				list1.add(list1.size(), pop.intValue());
				answer++;
			} else {
				break;
			}

			if (count > size) {
				answer = -1;
				break;
			}
			count++;
		}

		return answer;
	}

}
