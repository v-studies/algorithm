```java
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        System.out.println(solution(num));
    }

    private static int solution(int num) {
        int[] candidates = new int[num + 1];
        int limit = (int) Math.sqrt(num);
        int cnt = 0;

        for (int i = 2; i <= limit; i++) {
            for (int j = i * 2; j <= num; j += i) {
                if (j % i == 0) {
                    candidates[j] = 1;
                }
            }
        }

        for (int i = 2; i <= num; i++) {
            if (candidates[i] == 0) cnt++;
        }

        return cnt;
    }
}
```