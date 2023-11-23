# 문제

- [개인정보 수집 유효기간](https://school.programmers.co.kr/learn/courses/30/lessons/150370)

# 복잡도

O(n)

# 코드

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
	private static final int DAYS_IN_YEAR = 336;
	private static final int DAYS_IN_MONTH = 28;


	public List<Integer> solution(String today, String[] terms, String[] privacies) {
		int numberOfToday = calculateDate(today);
		Map<Character, Integer> termFactory = new HashMap<>();
		for (String term : terms) {
			termFactory.put(term.charAt(0), Integer.valueOf(term.substring(2)) * 28);
		}

		String privacyDate;
		char termType;

		List<Integer> answer = new ArrayList<>(privacies.length / 2);
		int answerCount = 0;

		for (int i = 0; i < privacies.length; i++) {
			privacyDate = privacies[i].substring(0, 10);
			termType = privacies[i].charAt(privacies[i].length() -1);

			int numberOfPrivacyDate = calculateDate(privacyDate) + termFactory.get(termType);
			if (numberOfToday >= numberOfPrivacyDate) {
				answer.add(i+1);
				answerCount++;
			}
		}
		return answer;
	}

	protected int calculateDate(String date) {
		int year = Integer.parseInt(date.substring(0, 4));
		int month = Integer.parseInt(date.substring(5, 7));
		int day = Integer.parseInt(date.substring(8));

		return (year * DAYS_IN_YEAR) + (month * DAYS_IN_MONTH) + day;
	}
}
```

# 결과

![개인_정보_수집_유효기간_풀이.png](images%2F%EA%B0%9C%EC%9D%B8_%EC%A0%95%EB%B3%B4_%EC%88%98%EC%A7%91_%EC%9C%A0%ED%9A%A8%EA%B8%B0%EA%B0%84_%ED%92%80%EC%9D%B4.png)

# 설명

총 3가지 단계로 이루어 집니다

* 약관 매핑
* 약관 계산
* 정답 추출

## 생각 흐름

1. 제약 조건 생각
    * 모든 달은 28일 까지만 존재
    * 약관은 입력되는 데이터 (입력 될수도, 되지 않을수도 있음)
    * 약관은 중복 입력 되지 않음
    * 약관은 무조건 개월 수 로 계산된다
    * 만일 날짜가 같다면? => 만료
2. 필수 구분 조건 생각
    * for 문의 조건은? => privacies 배열
    * for 문 안에서 terms 의 배열을 순회 할텐데, 더 좋은 방식은? => Map 적용 (조회 성능이 압도적으로 좋으며, 중복되지 않는 데이터)
    * LocalDate 클래스가 필요할까? => 모든 달은 28일 까지만 계산되기 때문에, LocalDate 는 불필요할듯
3. 핵심 로직 생각
    * 날짜 비교는 어떻게?
    * String 문자열 조작을 통한 비교는 성능이 낮은데, 문자열의 형태를 유지 할 필요가 있을까? => 없음 (결과 인덱스만 반환하면 되기 때문에)
    * 문자열을 숫자로 바꿀 수는 없을까? => 2022.05.12 날짜 데이터를 분리 계산. 2022 * 336(12개월 * 28일) + 05 * 28 + 12
    * 위 논리가 문제될 사항이 있을까? => 논리 검증 수행



