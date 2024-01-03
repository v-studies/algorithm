# 문제

[k진수에서 소수 개수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/92335)

# 내용

1. 진수변환
   10진수 -> N진수의 경우 toString(),
   2진수 -> N진수의 경우 parseInt() 메소드 사용
2. 0을 기준으로 자른뒤, 1을 제외하고 리스트로 저장
3. 소수인지 체크
   3-1. 값의 절반까지만 체크 (parseInt() 사용)
   3-2. 값의 제곱근까지만 체크 (Math.sqrt())
   나눈 값이 정수인지 실수인지 체크 (% 연산자 활용)
4. 주의할 점
   3-1번의 값의 절반까지 체크하는 방법을 사용하면 시간 초과나는 케이스가 존재
   divisor과 같아도 됨에 주의 (<이 아니라 <=)

# 코드

```javascript
const solution = (n, k) => {
  const bin = n.toString(k)
  const primeList = bin.split('0').filter(str => {
    return str !== '' && checkIsPrime(Number(str))
  })
  const answer = primeList.length
  return answer
}

const checkIsPrime = bin => {
  if (bin <= 1) return false
  const num = parseInt(bin)
  const divisor = Math.sqrt(num)
  for (let i = 2; i <= divisor; i++) {
    if (num % i === 0) return false
  }
  return true
}
```
