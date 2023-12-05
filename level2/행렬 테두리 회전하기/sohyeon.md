## 문제

- [행렬 테두리 회전하기](https://school.programmers.co.kr/learn/courses/30/lessons/77485)

## 복잡도

- 시간 복잡도: O(N)

## 풀이 과정

- rows \* cols 행렬을 일차행렬로 만든다
- 시계 방향을 차례대로 오른쪽방향 아래방향 왼쪽방향 위쪽방향 으로 쪼개서 옮겨야하는 값(targets)과 그 값의 인덱스(targetIndexes)를 각각 배열로 저장한다.
- 기존 array에서 옮겨져야 하는 인덱스와 위의 과정에서 옮겨진 값을 매칭하여 한 칸씩 옮긴다.
  > ex)
  > target(옮겨진 값): [1, 2, 3, 4, ...]
  > 옮겨져야 하는 인덱스: [0, 1, 2, 3, ....]
  > array[옮겨져야 하는 인덱스[i]] = target[i - 1]

```js
array[targetIndexes[0]] = targets[targets.length - 1]
for (let i = 1; i < targetIndexes.length; i++) {
  array[targetIndexes[i]] = targets[i - 1]
}
```

<br/>
<br/>

### 최종 답안

```javascript
function solution(rows, columns, queries) {
  // row x column 가 몇번째 idx인지 계산하는 함수
  const getIndex = (row, column) => {
    // 1 2 3
    // 4 5 6
    // === 1 2 3 4 5 6
    return columns * (row - 1) + (column - 1)
  }

  const spiral = (array, startRow, startCol, endRow, endCol) => {
    let targets = []
    let targetIndexes = []

    let minValue = 100 * 100 + 1

    // 오른쪽
    for (let i = startCol; i <= endCol; i++) {
      const currIdx = getIndex(startRow, i)
      targets.push(array[currIdx])
      targetIndexes.push(currIdx)

      minValue = Math.min(minValue, array[currIdx])
    }

    // 아래
    for (let i = startRow + 1; i <= endRow; i++) {
      const currIdx = getIndex(i, endCol)
      targets.push(array[currIdx])
      targetIndexes.push(currIdx)

      minValue = Math.min(minValue, array[currIdx])
    }

    // 왼쪽
    for (let i = endCol - 1; i >= startCol; i--) {
      const currIdx = getIndex(endRow, i)
      targets.push(array[currIdx])
      targetIndexes.push(currIdx)

      minValue = Math.min(minValue, array[currIdx])
    }

    // 위
    for (let i = endRow - 1; i >= startRow; i--) {
      const currIdx = getIndex(i, startCol)
      targets.push(array[currIdx])
      targetIndexes.push(currIdx)

      minValue = Math.min(minValue, array[currIdx])
    }

    // 한 칸씩 옮기기
    array[targetIndexes[0]] = targets[targets.length - 1]
    for (let i = 1; i < targetIndexes.length; i++) {
      array[targetIndexes[i]] = targets[i - 1]
    }
    return minValue
  }

  var answer = []

  // 1 ~ n 까지 적힌 배열 만들기
  // 이중배열이 아닌 일차배열로 만듦
  const array = new Array(rows * columns).fill(0).map((_, idx) => idx + 1)

  for (let i = 0; i < queries.length; i++) {
    const minValue = spiral(
      array,
      queries[i][0],
      queries[i][1],
      queries[i][2],
      queries[i][3]
    )
    answer.push(minValue)
  }
  return answer
}
```
