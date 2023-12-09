```java
/*
 * 입력된 문자열이 회문 문자열이면 "YES" 출력, 아니라면 "NO" 출력
 * */
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        System.out.println(solution(str));
    }

    private static String  solution(String str) {
        char[] chars = str.toLowerCase().toCharArray();
        int lt = 0, rt = str.length() - 1;
        while (lt < rt) {
            if (chars[lt++] != chars[rt--]) return "NO";
        }
        return "YES";
    }
}
```