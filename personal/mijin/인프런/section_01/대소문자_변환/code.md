```java
/*
* < 대소문자 변환 >
* 문자열의 대문자는 -> 소문자로 / 소문자는 -> 대문자로 변환
* */
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        final String str = scanner.nextLine();
        System.out.println(solution(str));
    }

    private static String solution(String str) {
        StringBuilder answer = new StringBuilder();
        char[] targets = str.toCharArray();

        for (char target : targets) {
            if (Character.isUpperCase(target)) {
                answer.append((char)(target + 32));
            } else {
                answer.append((char)(target - 32));
            }
        }
        return answer.toString();
    }
}
```