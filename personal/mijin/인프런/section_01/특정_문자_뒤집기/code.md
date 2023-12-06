```java
/*
 * < 특정 문자 뒤집기 >
 * 영어 알파벳과 특수문자로 구성된 문자열이 주어지면 영어 알파벳만 뒤집어서 출력
 * */
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        System.out.println(solution(str));
    }

    private static String solution(String str) {
        int lt = 0, rt = str.length() - 1;
        char[] chars = str.toCharArray();

        while (lt < rt) {
            if (Character.isAlphabetic(chars[lt]) && Character.isAlphabetic(chars[rt])) {
                char temp = chars[rt];
                chars[rt--] = chars[lt];
                chars[lt++] = temp;
            }

            lt = Character.isAlphabetic(chars[lt]) ? lt : lt + 1;
            rt = Character.isAlphabetic(chars[rt]) ? rt : rt - 1;
        }

        return String.valueOf(chars);
    }
}
```