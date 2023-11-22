## 문제
- [성격 유형 검사하기](https://school.programmers.co.kr/learn/courses/30/lessons/118666)

## 복잡도
- 시간 복잡도: O(N)

## 풀이 과정
(1) 필요한 요소 미리 정의하기 

- 각 지표에 해당하는 타입을 알파벳순으로 미리 정의한다.

```js
const types = ['R', 'T', 'C', 'F', 'J', 'M', 'A', 'N']
````
이 때, 앞에서 부터 2개씩 짝을 지으면 짝이된 각 타입은 같은 지표를 나타낸다.
<br/>반환되어야 하는 지표의 순서와 동일한 순서를 가진다. 


> ex) 'R', 'T' 는 같은 지표를 나타내고 1번째로 표현되어야 한다. <br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'C', 'F' 는 같은 지표를 나타내고 2번째로 표현되어야 한다.


- 각 지표가 가지는 점수를 오브젝트로 나타낸다. 모든 지표의 점수는 0으로 초기화한다.
```js
const typeScores = {R: 0, T: 0, C: 0, ... , N: 0}
```

---

(2) 각 지표의 점수 계산하기 
- 중앙점이 되는 인덱스를 정의한다. 선택지는 7개 이기 때문에 중앙점 인덱스는 4 이다.
- survey로 나타나는 두문자열쌍 중 choice가 중앙점 인덱스보다 작으면 왼쪽 지표에, 크면 오른쪽 지표에 점수를 추가한다.
- 점수는 중앙 점수(0점) 에서 멀어지는 거리만큼 1점씩 증가한다.
- 앞서 정의한 `typeScores`에 선택된 지표를 key로 가지는 요소에 계산한 점수를 추가한다.
```js
typeScores[selectedType] += Math.abs(MIDDLE_CHOICE_INDEX - currChoice)
```
---
(3) 타입 결정하기
- types를 2개씩 비교하며 합이 더 높은 것을 `answer`에 추가한다.

```js
for(let i = 0; i < types.length; i = i + 2) {
    const selectedType = typeScores[types[i]] >= typeScores[types[i+1]] ? types[i] : types[i+1]

    answer += selectedType
}
```

<br/>
<br/>

### 최종 답안
```javascript
function solution(survey, choices) {
    var answer = '';
    const MIDDLE_CHOICE_INDEX = 4
    const types = ['R', 'T', 'C', 'F', 'J', 'M', 'A', 'N'] // 지표 별 알파벳 순으로 소팅된 상태
    const typeScores = types.reduce((acc, curr) => ({...acc, [curr]: 0}), {})
    
    survey.forEach((pairType, idx) => {
        const currChoice = choices[idx]
        const selectedType = currChoice < MIDDLE_CHOICE_INDEX ? pairType[0] : pairType[1]
        
        typeScores[selectedType] += Math.abs(MIDDLE_CHOICE_INDEX - currChoice)
    })
    
    for(let i = 0; i < types.length; i = i + 2) {
        const selectedType = typeScores[types[i]] >= typeScores[types[i+1]] ? types[i] : types[i+1]

        answer += selectedType
    }
    
    return answer;
}
```