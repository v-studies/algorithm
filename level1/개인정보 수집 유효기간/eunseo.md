# 문제
- [개인정보 수집 유효기간](https://school.programmers.co.kr/learn/courses/30/lessons/150370)

# 내용
- 약관 종류는 A~Z 이므로, legalTypeTerms 배열을 int[26]으로 초기화한다.
- terms 배열 for문을 돌면서 약관 종류와 유효기간을 legalTypeTerms 배열에 저장한다.

  - 여기서 주의할 점은 약관 종류는 String 타입으므로 String -> char -> int로 바꾸고 'A'는 아스키로 65이므로, 65를 뺀 인덱스에 약관 유효기간을 저장한다. 

- privacies 배열 for문을 돌면서 개인정보의 수집일자와 약관 종류에 맞춰 약관 유효기간을 가져온다.
   
  - 약관 유효기간을 더할때는 LocalDate 클래스의 plusMonths 메소드를 사용하면 편리하다. 
https://docs.oracle.com/javase/8/docs/api/java/time/LocalDate.html

마지막으로, 오늘과 유효한 기간을 비교하여 수집일자 기준 유효한 개인정보인지 판단한다.



```java
import java.util.*;
import java.time.*;
import java.time.format.DateTimeFormatter;

class Solution {
    static List<Integer> answer = new LinkedList<>();
    
    public List<Integer> solution(String today, String[] terms, String[] privacies) {
        int[] legalTypeTerms = new int[26];
        
        for(String term: terms){
            String [] splitTerm = term.split(" ");
                
            char legalType = splitTerm[0].charAt(0);
            String legalTerm = splitTerm[1];
            
            legalTypeTerms[(int) legalType - 65] = Integer.parseInt(legalTerm);
        }
        
        
        for(int i=0; i<privacies.length; i++){
            String[] splitPrivacy = privacies[i].split(" ");
            String privacyTerm = splitPrivacy[0];
            char privacyType = splitPrivacy[1].charAt(0);

            int legalTerm = legalTypeTerms[(int) privacyType - 65];
            
            if(!isValidPrivacyData(privacyTerm, legalTerm, today)){
                answer.add(i+1);
            }
          }  
  
        return answer;
    }
    
    private boolean isValidPrivacyData(String privacyTerm, int legalTerm, String today){
        LocalDate privacyDate = changeStringDateToLocalDate(privacyTerm);
        LocalDate validTerm = privacyDate.plusMonths(legalTerm);
        

        LocalDate todayDate = changeStringDateToLocalDate(today);
        
        if(todayDate.isBefore(validTerm)){
              return true;
        }
        
        return false;   
    }
    
    private LocalDate changeStringDateToLocalDate(String date){
         LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy.MM.dd"));
         return localDate;
    }

}
```
