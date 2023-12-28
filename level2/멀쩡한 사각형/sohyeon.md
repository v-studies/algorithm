## 문제

- [멀쩡한 사각형](https://school.programmers.co.kr/learn/courses/30/lessons/62048)

## 복잡도

- 시간 복잡도: O(n)? (gcd 구하는 시간)

## 풀이 과정

1. 대각선으로 나누었을 때 사용할 수 없는 정사각형은 일정한 패턴을 그린다.
2. 그 패턴은 w과 h의 최대 공약수만큼 반복된다.
3. 한 패턴이 차지하는 정사각형의 개수는 w / gcd(w, h) + h / gcd(w, h) - 1 개 이다.
4. 따라서, 사용할 수 없는 정사각형의 개수는
   `gcd(w, h) * (w / gcd(w, h) + h / gcd(w, h) - 1) === w + h - gcd(w, h)` 개 이다.

\*\* 3번 이 어떻게 나온 건 지 풀이를 봐도 이해할 수 없었다..

### 최종 답안

```javascript
function gcd(a, b) {
  if (a === 0) return b

  return gcd(b % a, a)
}

function solution(w, h) {
  return w * h - (w + h - gcd(w, h))
}
```
