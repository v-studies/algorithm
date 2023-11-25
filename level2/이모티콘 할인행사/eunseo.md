# 문제
- [이모티콘 할인행사](https://school.programmers.co.kr/learn/courses/30/lessons/150368)

# 내용
1. 이모티콘마다 할인율은 다를 수 있으며, 할인율은 10%, 20%, 30%, 40% 중 하나로 설정 -> 따라서, 이모티콘 할인될 수 있는 경우의 수 dfs를 이용하여 완전 탐색 구현. 

- dfs ( ex. 이모티콘이 4개 있을 경우의 수 일부 첨부) 

![image](https://github.com/v-studies/algorithm/assets/70589857/0d97eb0c-4a2b-488e-af5c-27dc0848ba55)


2. users 배열을 돌면서, 해당 유저가 이모티콘 플러스 서비스 가입 대상자인지 확인 및 이모티콘 구매 가격 계산
   - emoticonPlusServiceUser Max값 체크 
   - 이모티콘 구매 가격은 revenue[plusServiceUser] 값의 Max를 계속해서 변경해준다.
     
3. emoticonPlusServiceUser 와 revenue[emoticonPlusServiceUser]의 값을 answer에 넣어주면 된다. 

# 풀이
```java
import java.util.*;

class Solution {
    static int emoticonPlusServiceUser = 0;
    static int revenue[];
    
    public List<Integer> solution(int[][] users, int[] emoticons) {
        List<Integer> answer = new ArrayList<>();
        
        int[] emoticonDiscount = new int[emoticons.length];
        revenue = new int[users.length + 1];
        
        dfs(emoticonDiscount, 0, users, emoticons);
        
        answer.add(emoticonPlusServiceUser);
        answer.add(revenue[emoticonPlusServiceUser]);
        
        return answer;
    }
    
   private int[] dfs(int[] emoticonDiscount, int depth, int[][] users, int[] emoticons) {
		if (depth == emoticonDiscount.length) {
            
            purchaseEmoticonPlusServiceOrEmoticon(emoticonDiscount, users, emoticons);   

			return emoticonDiscount;
		}

		for (int i = 10; i <= 40; i += 10) {
			emoticonDiscount[depth] = i;
			dfs(emoticonDiscount, depth + 1, users, emoticons);
		}

		return emoticonDiscount;
	}
    
    private void purchaseEmoticonPlusServiceOrEmoticon(int[] emoticonDiscount, int[][] users, int[] emoticons){
            int plusServiceUser = 0;
		    int revenueUser = 0;
        
            for(int i=0; i< users.length; i++){
                int ratio = users[i][0];
                int pay = users[i][1];
                int sum = 0;
                
                for (int k = 0; k < emoticonDiscount.length; k++) {
				    if(emoticonDiscount[k] >= ratio){
                        sum += emoticons[k] * (100 - emoticonDiscount[k]) * 0.01;
                    }
			    }
                

                if(sum >= pay){
                     plusServiceUser++;
                     continue;
                }
                    
                 revenueUser += sum;
            
            }

        	emoticonPlusServiceUser = Math.max(emoticonPlusServiceUser, plusServiceUser);
		    revenue[plusServiceUser] = Math.max(revenue[plusServiceUser], revenueUser);
    }
}
```
