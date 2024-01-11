# 문제

[쿼드압축 후 개수 세기](https://school.programmers.co.kr/learn/courses/30/lessons/68936)

# 내용

4 _ 4 배열을 네 부분으로 나눴을 때 각 부분마다 제일 좌측 상단의 시작점은 다음과 같다.
0, 0 / 0, 2 / 2, 0 / 2, 2
8 _ 8 배열을 네 부분으로 나눴을 때 각 부분마다 제일 좌측 상단의 시작점은 다음과 같다.
0, 0 / 0, 4 / 4, 0 / 4, 4

시작점 [x, y]의 각각 + n / 2 - 1까지 반복문을 통해 인덱스를 만들어 값에 접근할 수 있다.
ex. 시작점이 [0, 0]이고, 8 \* 8 배열로 n = 8 이고 x 또는 y 좌표가 0일 때
0 + 8 / 2 - 1 = 3이므로 0, 1, 2, 3까지 반복문을 통해 값 접근(y도 동일)

다음과 같다.
00 01 02 03 | 04 05 06 07
10 11 12 13 | 14 15 16 17
20 21 22 23 | 24 25 26 27
30 31 32 33 | 34 35 36 37

---

40 41 42 44 ...

풀이

1. 처음 배열이 단일 수로 이루어져있는지 확인을 위해 checkIsAllSame()
   2-1. 맞다면 최종적으로 0과 1을 모으는 배열인 quadZoneArr에 넣어준 뒤 0과 1의 개수를 구해 return
   2-2. 아니라면 0과 arr의 길이인 n을 중복순열을 통해 각 사분면의 좌측 최상단이 될 시작점 네 개를 구한다.
   2-3. 사분할하는 함수 divideToQuad(), 이때 n값으로 초기 리스트의 절반을 나눈 값(n/2)이 들어간다.
   3-1. 쿼드압축 함수 내에서 n이 1이면 2\*2 배열이므로 사분할을 할 필요 없이 각 원소를 quadZoneArr에 넣어준다
   3-2. n이 1이 아니라면 사분할을 실행한 뒤, checkIsAllSame() 함수에서 해당 사분면을 순회하며 모든 수가 시작점과 같은지 확인하면서 사분면인 quadZone을 생성한다.
   3-3. checkIsAllSame()함수는 [isAllSame, quadZone]을 반환하는데 모든 수가 시작점과 같다면 [true, 시작점값]을 반환하며, 다르다면 [false, quadZone]을 반환한다.
2. 함수 반환값을 보고 isAllSame이 true라면 quadZone을 최종적으로 0과 1을 모으는 배열인 quadZoneArr에 넣어주고, 아니라면 다시 quadZone을 가지고 재귀적으로 divideToQuad()를 수행한다. (2-3 부터 4까지를 반복한다)
3. 최종적으로 quadZoneArr의 0과 1의 개수를 세어 정답을 반환한다.

# 코드

```javascript
function solution(arr) {
  let n = arr.leng
  let quadZoneArr = []
  const [isAllSame, quadZone] = checkIsAllSame(arr, n, [0, 0])
  if (isAllSame) {
    quadZoneArr.push(quadZone)
  } else {
    divideToQuad(arr, n, quadZoneArr)
  }
  let answer = []
  for (let i = 0; i < 2; i++) {
    const cnt = quadZoneArr.reduce((cnt, element) => cnt + (element === i), 0)
    answer.push(cnt)
  }
  return answer
}

function divideToQuad(arr, n, quadZoneArr) {
  if (n === 1) {
    for (x = 0; x < 2; x++) {
      for (y = 0; y < 2; y++) {
        quadZoneArr.push(arr[x][y])
      }
    }
  } else {
    const half = parseInt(n / 2)
    const startArr = getPermutations([0, half], 2)
    for (let i = 0; i < startArr.length; i++) {
      const start = startArr[i]
      const [isAllSame, quadZone] = checkIsAllSame(arr, half, start)
      if (isAllSame) {
        quadZoneArr.push(quadZone)
      } else {
        divideToQuad(quadZone, half, quadZoneArr)
      }
    }
  }
}

function getPermutations(arr, selectNumber) {
  const results = []
  if (selectNumber === 1) return arr.map(el => [el])
  arr.forEach((fixed, index, origin) => {
    const permutations = getPermutations(origin, selectNumber - 1)
    const attached = permutations.map(el => [fixed, ...el])
    results.push(...attached)
  })
  return results
}

function checkIsAllSame(arr, n, start) {
  const [x, y] = start
  let quadZone = []
  let flag = true
  for (let a = 0; a < n; a++) {
    let quadZoneRow = []
    for (let b = 0; b < n; b++) {
      if (arr[x + a][y + b] !== arr[x][y]) {
        flag = false
      }
      quadZoneRow.push(arr[x + a][y + b])
    }
    quadZone.push(quadZoneRow)
  }
  if (flag) return [flag, arr[x][y]]
  else return [flag, quadZone]
}
```
