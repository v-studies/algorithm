## 문제

- [요격 시스템](https://school.programmers.co.kr/learn/courses/30/lessons/1811888)

## 복잡도

- 시간 복잡도: O(n)

## 풀이 과정

1. targets를 시작 지점을 기준으로 오름차순으로 정렬한다.
2. targets를 하나씩 순회하면서 타겟의 시작 지점과 최근 요격 지점을 비교한다.
3. 타겟의 시작 지점이 최근 요격 지점보다 크면 필요한 미사일을 수를 증가시키고 최근 요격 지점을 타겟의 시작 지점 바로 앞으로 설정한다.<br/>
   \*\*바로 앞으로 설정하는 이유: 시작점와 끝점에 발사하는 미사일은 요격할 수 없다는 조건이 있으므로
4. 타겟의 시작 지점이 최근 요격 지점 보다 작으면 타겟의 끝 바로 앞 지점과 최근 요격 지점을 비교 하여 더 작은 쪽을 최근 요격 지점으로 설정한다.

### 최종 답안

```js
function solution(targets) {
  // 시작 지점 기준으로 오름차순 정렬
  targets.sort((t1, t2) => t1[0] - t2[0])

  let result = 0 // 필요한 요격 미사일의 수
  let lastCoveredPoint = -1 // 요격 가능한 최대 종료 지점

  for (let [start, end] of targets) {
    if (start > lastCoveredPoint) {
      result++ // 요격 미사일 추가

      lastCoveredPoint = end - 0.5
    } else {
      lastCoveredPoint = Math.min(lastCoveredPoint, end - 0.5)
    }
  }

  return result // 필요한 요격 미사일의 최소 개수 반환
}
```
