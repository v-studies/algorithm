### 순위 검색

## 시도 1 
이중 for문 효율성 통과 x -> 효율성 생각하여 다시 풀기 
```java
import java.util.*;

class Solution {
    public List<Integer> solution(String[] info, String[] query) {
        List<Integer> answer = new ArrayList<>();
        
        for(String q : query){
            String [] querySplit = q.split(" ");
            
            String language = querySplit[0];
            String job = querySplit[2];
            String career = querySplit[4];
            String food = querySplit[6];
            String score = querySplit[7];

            
            answer.add(checkInfo(info, language, job, career, food, score));
            
        }
        
        return answer;
    }
    
    public int checkInfo(String[] info, String language, String job, String career, String food, String score){
            int cnt = 0;
        
            for(String i : info){
                
                String [] infoSplit = i.split(" ");
                String infoLanguage = infoSplit[0];
                String infoJob = infoSplit[1];
                String infoCareer = infoSplit[2];
                String infoFood = infoSplit[3];
                String infoScore = infoSplit[4];
                
                
                if(!language.equals("-") && !language.equals(infoLanguage)){
                    continue;
                }  
                
                if(!job.equals("-") && !job.equals(infoJob)){
                    continue;
                }
                
                if(!career.equals("-") && !career.equals(infoCareer)){
                    continue;
                }
                
                if(!food.equals("-") && !food.equals(infoFood)){
                    continue;
                }
                
                if(Integer.valueOf(score) > Integer.valueOf(infoScore)){
                    continue;
                }
                cnt++;  
            }
        return cnt;    
    }
}
```

<img width="453" alt="image" src="https://github.com/v-studies/algorithm/assets/70589857/620fb95a-a38e-4fa1-8a72-1e1208d7829c">
