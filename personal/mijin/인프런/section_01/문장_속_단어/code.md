```java
/*
* < 문장 속 단어 >
* 주어진 문장 속 가장 긴 단어 출력
* */
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        System.out.println(solution(str));
    }

    private static String solution(String str) {
        String answer = "";
        final int i = str.indexOf(" ");
        String[] words = str.split(" ");
        for (String word : words) {
            if (word.length() > answer.length()) {
                answer = word;
            }
        }
        return answer;
    }
}
```