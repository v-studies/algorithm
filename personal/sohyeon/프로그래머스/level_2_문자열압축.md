## 문제

- 2020 KAKAO BLIND RECRUITMENT
- [문자열 압축](https://school.programmers.co.kr/learn/courses/30/lessons/60057)
  <br/>
  <br/>

## 복잡도

- 시간 복잡도: O(N^2)
  <br/>
  <br/>

## 풀이 과정

- 자르는 문자 개수를 하나씩 증가 시키면서 다음 문자와 비교한다.
  - 자르는 문자는 s.length / 2 까지만 증가 한다.
  - 자르는 문자 개수가 주어진 문자열의 반 보다 크면 뒤에 남은 문자의 수가 자르는 문자 수보다 작으므로 압축할 수 없다.
- s의 0부터 자르는 문자 개수 만큼을 기억해두었다가(currString) 자르는 문자 수씩 뒤로 이동하며 currString과 비교한다.
  - currString과 nextString이 같으면 currStringCnt를 1씩 증가한다.
  - currString과 현재 순회중인 문자열(nextString)이 다르면 currString을 현재 순회중인 문자열로 업데이트 한다. 이 경우, 현재 순회중인 문자열 앞의 문자열은 압축이 완료 되었다는 의미이므로 currStringCnt와 currString을 붙여서 resultString을 만든다.
- 문자열을 모두 순회하면 resultString의 길이와 minLength를 비교하여 더 짧은 쪽을 minLength로 설정한다.

<br/>
<br/>

### 최종 답안

```js
function solution(s) {
  var answer = 0
  let minLength = s.length
  let resultString = ''

  for (let wordCnt = 1; wordCnt <= s.length / 2; wordCnt++) {
    let currString = s.slice(0, wordCnt)
    let currStringCnt = 1

    for (let i = wordCnt; i < s.length; i += wordCnt) {
      const nextString = s.slice(i, i + wordCnt)

      if (currString !== nextString) {
        resultString +=
          currStringCnt === 1 ? currString : currStringCnt + currString
        currString = nextString
        currStringCnt = 1
      } else currStringCnt++
    }
    resultString +=
      currStringCnt === 1 ? currString : currStringCnt + currString

    minLength = Math.min(minLength, resultString.length)
    resultString = ''
  }

  return minLength
}
```
