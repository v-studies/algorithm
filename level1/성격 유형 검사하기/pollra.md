# 문제

- [Level.1] [성격 유형 검사하기](https://school.programmers.co.kr/learn/courses/30/lessons/118666)

## 복잡도

### 시간 복잡도

O(n)

### 공간 복잡도

O(1)

## 풀이

### 문제 풀이 코드

```java

public class PersonalityTypeTesting {
	public String solution(String[] survey, int[] choices) {
		StringBuilder answer = new StringBuilder();
		int RT = 0;
		int CF = 0;
		int JM = 0;
		int AN = 0;

		for (int i = 0; i < survey.length; i++) {
			switch (survey[i]) {
				case "RT":
					RT += choices[i] - 4;
					break;
				case "TR":
					RT -= choices[i] - 4;
					break;
				case "FC":
					CF -= choices[i] - 4;
					break;
				case "CF":
					CF += choices[i] - 4;
					break;
				case "MJ":
					JM -= choices[i] - 4;
					break;
				case "JM":
					JM += choices[i] - 4;
					break;
				case "AN":
					AN += choices[i] - 4;
					break;
				case "NA":
					AN -= choices[i] - 4;
					break;
			}
		}

		if (0 < RT) {
			answer.append('T');
		} else {
			answer.append('R');
		}
		if (0 < CF) {
			answer.append('F');
		} else {
			answer.append('C');
		}
		if (0 < JM) {
			answer.append('M');
		} else {
			answer.append('J');
		}
		if (0 < AN) {
			answer.append('N');
		} else {
			answer.append('A');
		}
		return answer.toString();
	}
}
```

### 테스트 코드

```java

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("알고리즘 테스트")
class PersonalityTypeTestingTest {

	PersonalityTypeTesting personalityTypeTesting = new PersonalityTypeTesting();

	@Test
	@DisplayName("[\"AN\", \"CF\", \"MJ\", \"RT\", \"NA\"] & [5, 3, 2, 7, 5] => TCMA")
	void test01() {
		String answer = personalityTypeTesting.solution(new String[] {"AN", "CF", "MJ", "RT", "NA"},
			new int[] {5, 3, 2, 7, 5});

		assertEquals("TCMA", answer);
	}

	@Test
	@DisplayName("[\"TR\", \"RT\", \"TR\"] & [7, 1, 3] => TCMA")
	void test02() {
		String answer = personalityTypeTesting.solution(new String[] {"TR", "RT", "TR"},
			new int[] {7, 1, 3});

		assertEquals("RCJA", answer);
	}
}
```

![pollra_image_01.png](images%2Fpollra_image_01.png)
