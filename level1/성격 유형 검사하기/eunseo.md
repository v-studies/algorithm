# 문제
- [성격 유형 검사하기](https://school.programmers.co.kr/learn/courses/30/lessons/118666)

# 내용
- 시간 복잡도 o(N)
- surveyType 과 score 점수를 미리 정의한다.

<img width="247" alt="image" src="https://github.com/v-studies/algorithm/assets/70589857/794c5054-cdd4-40d1-8e57-fc2cd7c59c65">

String[] surveyType = {"R","T","C","F","J","M","A","N"};

<img width="328" alt="image" src="https://github.com/v-studies/algorithm/assets/70589857/4150d83c-15fe-4b8e-8fdf-0788fdcbc840">

int[] score = {3,2,1,0,1,2,3};

- 성격은 각 지표에서 두 유형 중 하나로 결정되므로, choice가 NEUTRAL보다 클 경우는 survey 지표의 2번째 타입이며, 기본적으로 survey 지표의 1번째 타입으로 결정된다.
- surveyScore 점수를 모두 0으로 초기화 해주고, 결정된 성격 유형을 surveyType을 통해 index값을 가져와 index에 해당하는 score 점수를 누적합 한다. 

- 마지막으로, surveyScore를 2개씩 비교하며 합이 더 높은 것으로 성격유형이 결정된다. 


```java
import java.util.*;

class Solution {
    static final int NEUTRAL = 4;
    
    
    public StringBuilder solution(String[] survey, int[] choices) {  
        StringBuilder answer = new StringBuilder();
        String[] surveyType = {"R","T","C","F","J","M","A","N"};
        int[] surveyScore = {0,0,0,0,0,0,0,0};
        int[] score = {3,2,1,0,1,2,3};
        
        for(int i=0; i<survey.length; i++){
            int choice = choices[i];
            String type = String.valueOf(survey[i].charAt(0));
            
            if(choice > NEUTRAL){
                type = String.valueOf(survey[i].charAt(1));
            }
            
            int idx = Arrays.asList(surveyType).indexOf(type);
            surveyScore[idx] += score[choice-1];
        }
        
        personalityTest(answer, surveyType, surveyScore);
        
        return answer;
    }
    
    private void personalityTest(StringBuilder answer, String[] surveyType, int[] surveyScore) {
		for (int i = 0; i < surveyScore.length; i++) {
			if (surveyScore[i] >= surveyScore[i + 1]) {
				answer.append(surveyType[i]);
			} else {
				answer.append(surveyType[i + 1]);
			}
			i++;
		}
	}
}
```
