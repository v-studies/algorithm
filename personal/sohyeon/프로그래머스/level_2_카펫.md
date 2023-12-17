## 문제

- [카펫](https://school.programmers.co.kr/learn/courses/30/lessons/42842)
  <br/>
  <br/>

## 복잡도

- 시간 복잡도: O(N)
  <br/>
  <br/>

## 풀이 과정

- yellow의 가로 \* yellow의 세로 = yellow가 되어야 하므로 가로/세로는 yellow의 공약수여야 한다.
- yellow의 가로를 하나씩 늘리면서 가로 \* 세로 = yellow 가 되는 조합을 찾는다.
- 조합을 찾았을 때 brown의 개수를 구한다. 이 때 brown의 개수와 주어진 brown의 개수가 일치 하는 조합을 반환한다.

(주의) 문제에서 가로는 세로보다 크거나 같다고 했으므로 조합을 찾았을 때 긴 쪽을 가로로 한다.

<br/>
<br/>

### 최종 답안

```js
function solution(brown, yellow) {
  var answer = []

  for (let i = 1; i <= yellow; i++) {
    const yellowCols = i

    if (yellow % yellowCols === 0) {
      const yellowRows = yellow / yellowCols
      const calcBrownCols = yellowCols + 2
      const calcBrownRows = yellowRows + 2
      const finalBrown = calcBrownCols * calcBrownRows - yellow

      if (finalBrown === brown) {
        const cols = Math.max(calcBrownCols, calcBrownRows)
        const rows = Math.min(calcBrownCols, calcBrownRows)

        return [cols, rows]
      }
    }
  }

  return answer
}
```
