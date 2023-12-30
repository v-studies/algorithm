### Level.2 멀쩡한 사각형

![seungwook_3.png](images%2Fseungwook_3.png) 
- 가로길이와 세로길이에 최대공약수 만큼 패턴이 반복된다.
  - 반복되는 패턴의 가로길이는 : w / gcd
  - 반복되는 패턴의 세로길이는 : h / gcd
- 패턴에서 대각선이 지나가는 곳에 크기는 : h + w - 1
  - 높이당 한개씩은 지나가므로 h / gcd 개는 무조건 지나간다.
  - 두개를 지나가는 경우는 w / gcd - 1 과 같다.
- (w / gcd + h / gcd - 1) * gcd 만큼 빼주면 된다.

### 코드 1 (실패)

![img.png](images%2Fseungwook_2.png)

가로 길이와 세로길이중 작은 값 * 2 값이 규칙인거 같아서 풀이 -> 실패

```java

public class 멀쩡한_사각형 {
	public static void main(String[] args) {
		int w = 8;
		int h = 12;
		System.out.println(solution(w, h));
	}

	public static long solution(int w, int h) {
		long wh = (long)w * h;

		if (w == h) {
			return wh - w;
		} else if (w > h) {
			return wh - h * 2L;
		} else {
			return wh - w * 2L;
		}
	}
}

```

### 코드 2 (풀이참고)

```java

public class 멀쩡한_사각형 {
	public static void main(String[] args) {
		int w = 8;
		int h = 12;
		System.out.println(solution(w, h));
	}

	public static long solution(int w, int h) {
		long answer = (long)w * h;

		int gcd = GCD(w,h);
		int gcdW = w / gcd;
		int gcdH = h / gcd;
		long sum = (long)(gcdW + gcdH - 1) * gcd;
		return answer - sum;
	}

	public static int GCD(int a, int b) {
		if (a % b == 0) {
			return b;
		} else {
			return GCD(b, a % b);
		}
	}
}

```


### 결과

![img.png](images%2Fseungwook_1.png)
