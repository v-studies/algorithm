# 문제
- [k진수에서 소수 개수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/92335)


# 내용
1. num을 k진수로 구한다. (convertBinary)
2. 구해진 K진수 문자열을 한 문자씩 보면서, 문자가 0이 아닐 경우는 decimal 문자열에 문자를 더해주고, 0일 경우 앞서 더했던 decimal이 소수인지, 아닌지 판별한다.
   
# 풀이
```java
class Solution {
    public int solution(int n, int k) {
        int answer = 0;
        String convertBinary = convertBinary(n, k);

    		String decimal = "";
    
    		for (int i = 0; i < convertBinary.length(); i++) {
    			if (convertBinary.charAt(i) != '0') {
    				decimal += convertBinary.charAt(i);
    			} else {
    				if (!decimal.isEmpty() && isDecimal(Long.parseLong(decimal)))
    					answer++;
    				    decimal = "";
    			}
    
    		}
    
    		if (!decimal.isEmpty() && isDecimal(Long.parseLong(decimal)))
    			answer++;

        
        return answer;
    }
    
    private String convertBinary(int num, int k) {

    		StringBuffer binary = new StringBuffer();
    
    		while (num > 0) {
    			binary.append(num % k);
    			num /= k;
    		}

		return binary.reverse().toString();
	}

	private  boolean isDecimal(long num) {
		if (num <= 1) {
			return false;
		}
		if (num == 2) {
			return true;
		}
		if (num % 2 == 0) {
			return false;
		}

		for (int i = 3; i <= Math.sqrt(num); i++) {
			if (num % i == 0)
				return false;
		}

		return true;
	}
}
```

![image](https://github.com/v-studies/algorithm/assets/70589857/84a016bb-6bc8-4e57-aa93-0e2df9065049)

