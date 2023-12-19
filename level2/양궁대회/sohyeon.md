## 문제

- [양궁 대회](https://school.programmers.co.kr/learn/courses/30/lessons/92342)

## 복잡도

- 시간 복잡도:

## 풀이 과정

**(참고)**
라이언이 취할 수 있는 점수가 가장 큰 조합을 찾아야 한다고 생각 했는데, 구현을 어떻게 해야할 지 감이 안와서 풀이 찾아보았습니다.<br/>
참고한 풀이는 https://velog.io/@tnehd1998/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%96%91%EA%B6%81%EB%8C%80%ED%9A%8C-JavaScript 입니다!

- 라이언이 0~10 과녁 점수를 각각 취하는 경우와 취하지 못하는 경우(어피치가 취하는 경우) 모든 조합을 계산한다.
- - 라이언이 쏠 수 있는 화살은 n 개 이고 화살을 n개 보다 많이 쏴 해당 점수를 취할 수 있다면 탐색을 종료한다.
- - 취하려하는 과녁 점수가 10을 넘으면 탐색을 종료한다. (과녁은 10점까지 밖에 없기 때문)
- 탐색이 종료되었을 때 라이언과 어피치의 점수 차를 계산하여 차가 가장 큰 경우 라이언의 조합을 찾는다.

<br/>
<br/>

### 최종 답안

```javascript
function solution(n, info) {
  let answer = new Array(11).fill(0)
  let maxScore = 0

  // 이길 수 있는 조합을 모두 찾고  (어떤 과녁을 취해야 하는 지.) 점수 비교
  function findMaxScore(
    apeachScore,
    ryanScore,
    usedShots,
    targetPoint,
    ryanInfo
  ) {
    if (n < usedShots) return // 사용한 화살의 수가 전체 화살수 보다 큰 경우

    if (targetPoint > 10) {
      // 과녁의 점수는 10까지 밖에 없으니 이상 가면 모든 조합을 다 탐색했다고 판단
      let diffScore = ryanScore - apeachScore
      if (maxScore < diffScore) {
        ryanInfo[10] = n - usedShots
        maxScore = diffScore
        answer = ryanInfo
      }

      return
    }

    // 아직 쏠 수 있는 화살 수가 있으면 라이언이 targetPoint를 가져간다고 가정
    if (n > usedShots) {
      let currRyanInfo = [...ryanInfo]
      let needShots = info[10 - targetPoint] + 1

      currRyanInfo[10 - targetPoint] = needShots

      findMaxScore(
        apeachScore,
        ryanScore + targetPoint,
        usedShots + needShots,
        targetPoint + 1,
        currRyanInfo
      )
    }

    // 어피치가 targetPoint를 취하는 경우
    if (info[10 - targetPoint] > 0) {
      findMaxScore(
        apeachScore + targetPoint,
        ryanScore,
        usedShots,
        targetPoint + 1,
        ryanInfo
      )
    } else {
      // 둘 다 점수를 얻지 못하는 경우 (동점이면 둘 다 점수를 가져가지 못한다)
      findMaxScore(apeachScore, ryanScore, usedShots, targetPoint + 1, ryanInfo)
    }
  }

  findMaxScore(0, 0, 0, 0, answer) // 0 포인트부터 나올 수 있는 모든 경우 탐색하기
  return maxScore <= 0 ? [-1] : answer
}
```
