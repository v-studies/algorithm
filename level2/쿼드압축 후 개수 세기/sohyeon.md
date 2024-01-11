## 문제

- [쿼드압축 후 개수 세기](https://school.programmers.co.kr/learn/courses/30/lessons/68936)

## 유형

- 완전 탐색 (재귀)

## 풀이 과정

- 주어진 네모의 시작점(`[x, y]`)와 끝점(`[x', y']`) 계산한다.
- (1) 시작점 x 에서 끝점 x'까지의 거리가 1인지 판단한다.
- - 거리가 1이라는 의미는 네모가 차지하는 칸이 1개라는 뜻이다. (=== 더 이상 쪼갤 수 없다)
- - 거리가 2라면 네모가 차지하는 칸은 2\*2 칸 이다.
- (2) 시작점에서 끝점까지 하나씩 탐색하면서 다른 숫자가 있는 지 판단한다.
- (1)과 (2) 를 만족하지 않으면 주어진 네모를 4개의 네모로 쪼갠다.
- 쪼개진 각각의 네모로 위의 과정을 반복한다.

<img src="/images/sohyeon_2.jpg" width="300px" />
<br/>
<br/>

### 최종 답안

```javascript
function solution(arr) {
  let zeroCount = 0
  let oneCount = 0

  divideToQuad([0, 0], [arr.length - 1, arr.length - 1])

  function allTheSame(startPoint, endPoint) {
    const firstValue = arr[startPoint[0]][startPoint[1]]

    for (let i = startPoint[0]; i <= endPoint[0]; i++) {
      for (let j = startPoint[1]; j <= endPoint[1]; j++) {
        if (firstValue !== arr[i][j]) return false
      }
    }

    return true
  }

  // 각 point 는 [row, col]을 나타냄
  function divideToQuad(startPoint, endPoint) {
    const [startX, startY] = startPoint
    const [endX, endY] = endPoint

    // 가로 세로 길이는 언제나 같으니까 한쪽만 구한다
    const length = endX - startX + 1

    if (length === 1) {
      arr[startX][startY] === 1 ? oneCount++ : zeroCount++
      return
    }

    const sameAll = allTheSame(startPoint, endPoint)
    if (sameAll) {
      const firstValue = arr[startX][startY]
      if (firstValue === 0) zeroCount++
      else oneCount++
    } else {
      // length 가 4 이면
      // 2*2 (4/2) 네모 4개로 쪼갤 수 있다.
      const halfLength = length / 2

      // 왼쪽 위 시작점
      const leftTopStartPoint = startPoint

      // 왼쪽 아래 시작점
      const leftBottomStartPoint = [startX + halfLength, startY]

      // 오른쪽 위 시작점
      const rightTopStartPoint = [startX, startY + halfLength]

      // 오른쪽 아래 시작점
      const rightBottomStartPoint = [startX + halfLength, startY + halfLength]

      const quadStartPoint = [
        leftTopStartPoint,
        leftBottomStartPoint,
        rightTopStartPoint,
        rightBottomStartPoint,
      ]

      for (let i = 0; i < quadStartPoint.length; i++) {
        const currStartPoint = quadStartPoint[i]
        const currEndPoint = [
          currStartPoint[0] + halfLength - 1,
          currStartPoint[1] + halfLength - 1,
        ]

        divideToQuad(currStartPoint, currEndPoint)
      }
    }
  }

  return [zeroCount, oneCount]
}
```
