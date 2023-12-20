## 문제

- [k진수에서 소수 개수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/92335)

## 복잡도

- 시간 복잡도: O(N)

## 풀이 과정

- 소수인지 판별하는 함수를 작성한다.
- n을 k진수로 변경한다. (`n.toString(k)`)
- k진수로 변경된 문자열을 "0"을 기준으로 나눈다. (`convertedToK.split("0")`)

  - ex) k="11011" => "11", "11"
  - ex) k="110011" => "11", "", "11" ("0"이 연속되면 빈 문자열이 생김에 유의한다.)

  > `split`는 구분자를 기준으로 앞 뒤를 나누고 구분자를 삭제한다.<br/> > ["110011"] "11", "0" "011" => "11", "011"<br/> > ["011"] "", "0", "11" => "", "11"<br/>
  > result: ["11", "", "11"]

- 나눠진 문자열에서 소수의 개수를 구한다.

---

### "0"을 기준으로 문자열을 나눈 이유 생각해보기

문제에서 주어진 case는 아래와 같다.

1. 0P0처럼 소수 양쪽에 0이 있는 경우
2. P0처럼 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우
3. 0P처럼 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우

문제에 주어진 예시처럼 `211020101011` 가 있을 때, "0" 으로 문자열을 나누면

> ["211", "2", "1", "1", "11"]

- 가장 첫 문자열("211") 이 `split()`을 통한 결과라고 했을 때, 원 문자열은 `"2110..."`, `"...02110..."` 또는 `"...0211"`의 조합에서 구해진다는 사실을 유추해볼 수 있다.
- 즉, `split()` 자체가 문제에서 요구하는 case를 구현한 구현체이다.

- 만약 나누진 문자열에 `""`(공백) 문자열이 포함되어 있다면?

  > ["211", "", "2", "", "1", "1", "11"]

  - [`""`, `"2"`, `""`] 는 `"00200"` 과 같은 문자열을 통해 만들어졌음을 뜻한다. 이 경우 1번 case(`0P0`)만 만족하므로 `"2"`가 소수인지 판별한다.
  - [`"2"`, `""`, `"1"`] 는 `"02001"`, `"020010"` 또는 `"20010"` 와 같은 문자열을 통해 만들어 졌다고 생각할 수 있지만 `P`는 0을 포함하지 않아야 하기 때문에 해당 경우는 고려하지 않는다.

---

#### 소수를 판별하는 방법

(1) 주어진 수까지 1씩 늘리면서 나눠보기

```js
function isPrime(num) {
  if (num === 2) return true

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}
```

(2) 주어진 수의 반까지만 1씩 늘리면서 나눠보기

```js
function isPrime(num) {
  if (num === 2) return true

  for (let i = 2; i <= num / 2; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}
```

(3) 주어진 수의 스퀘어 루트 값까지 1씩 늘리면서 나눠보기

```js
function isPrime(num) {
  if (num === 2) {
    return true
  }

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}
```

\*\* (1), (2) 의 경우 timeout 이 되는 경우가 있어서 (3)으로 계산해야 한다.<br/>
(참고) https://ant-programmer.tistory.com/2

### 최종 답안

```js
function solution(n, k) {
  function isPrime(numString) {
    const num = Number(numString)
    if (num <= 1) return false // 빈 문자열("")은 Number로 바꾸면 0이 되기 때문에 0까지 고려해야 한다.
    if (num === 2) return true

    for (let i = 3; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  let cnt = 0
  const convertedToK = n.toString(k)
  const splitedByZero = convertedToK.split("0")

  for (let i = 0; i < splitedByZero.length; i++) {
    if (isPrime(splitedByZero[i])) cnt++
  }

  return cnt
}
```
