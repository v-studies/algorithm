# 문제
- [양궁 대회](https://school.programmers.co.kr/learn/courses/30/lessons/92342)


# 내용
1. dfs를 이용하여 라이언이 쏠 수 있는 가능한 과녁 점수를 가져온다. (단, 라이언이 어피치보다 한 과녁을 두발 이상 쏠 경우는 보지 않아야 시간 초과가 발생하지 않는다.)
2. 과녁을 n번 쏠 경우 점수 계산을 한다.
3. 점수 계산 시, 라이언 점수 - 어피치 점수가 최대값보다 크거나 <같으면> 최대값을 갱신시켜주며, answer배열도 업데이트하면 된다. (같으면 조건을 넣어야 최대 값이 같으며 낮은 점수를 더 많이 맞힌 경우도 탐색 할 수 있다.)

# 풀이
```java
class Solution {
    static int N;
	static int cnt = 10;
	static int maxScore = Integer.MIN_VALUE;
	static int answer[] = new int[11];
    
    public int[] solution(int n, int[] info) {
        int arr[] = new int[11];
        N = n;
        dfs(arr, 0, info);
        
        if(maxScore==Integer.MIN_VALUE) {
        	return new int[] {-1};
        }

		return answer;
    }

    public static int[] dfs(int[] arr, int depth, int[] info) {

		if (depth == N) {
			score(arr, info);
			return arr;
		}
        

		for (int i = 0; i < arr.length && arr[i] <= info[i] && arr[i] <= N; i++) {
			arr[i] += 1;
			dfs(arr, depth + 1, info);
			arr[i] -= 1;
		}

		return arr;
	}

	public static void score(int[] lionScore, int[] info) {
		int lion = 0;
		int apeach = 0;

		for (int i = 0; i < lionScore.length; i++) {
				if (lionScore[i] > info[i]) {
					lion += 10 - i;
				} else if(info[i] != 0){
					apeach += 10 - i;
				}
		}

		if (lion - apeach > 0 && maxScore <= lion - apeach) {
			maxScore = Math.max(maxScore, lion - apeach);
			answer = lionScore.clone();
		}
	}
}
```

<img width="429" alt="image" src="https://github.com/v-studies/algorithm/assets/70589857/3bc74ded-e7e7-44f4-b103-6baeb3e893b3">

