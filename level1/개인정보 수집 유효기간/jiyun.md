# 문제

[성격 유형 검사하기](https://school.programmers.co.kr/learn/courses/30/lessons/118666)

# 시간 복잡도

o(N)

# 내용

- calculateEndDate()를 통해 만료날짜를 산출하며, checkExpireDate()를 통해 현재 날짜와 비교한다.
- 변경점
  - 처음엔 각 함수에서 for문을 이용해 pravacies의 길이만큼 순회했으나, 공통적으로 돌게 되는 부분을 메인 함수로 뽑아서 privacies 길이에 대해 for문을 하나만 돌게 했다.
  - checkExpireDate를 flag를 사용해 끝까지 로직이 돌게 하지 않고 바로바로 return하도록 했다.
  - day는 고려할 필요가 없으므로 month에 28을 곱해 계산하지 않는다. (지문의 n일까지 라는 표현은 바꿔 말하면 n+1일부터 만료라는 표현)

# 코드

```javascript
function solution(today, terms, privacies) {
  const termsList = {}
  for (let i = 0; i < terms.length; i++) {
    const termData = terms[i].split(' ')
    termsList[termData[0]] = Number(termData[1])
  }

  const todayList = today.split('.').map(n => Number(n))
  let answer = []
  for (let i = 0; i < privacies.length; i++) {
    const expireDateList = calculateEndDate(termsList, privacies[i])
    if (checkExpireDate(todayList, expireDateList)) {
      answer.push(i + 1)
    }
  }
  return answer
}

const calculateEndDate = (termsList, privacy) => {
  const [startDate, type] = privacy.split(' ')
  const dateList = startDate.split('.').map(n => Number(n))
  let [year, month, date] = dateList
  const monthAdd = termsList[type] % 12
  const yearAdd = Math.floor(termsList[type] / 12)

  if (month + monthAdd > 12) {
    month = month + monthAdd - 12
    year = year + yearAdd + 1
  } else {
    month += monthAdd
    year += yearAdd
  }
  return [year, month, date]
}

const checkExpireDate = (todayList, expireList) => {
  if (todayList[0] > expireList[0]) {
    return true
  } else if (todayList[0] === expireList[0] && todayList[1] > expireList[1]) {
    return true
  } else if (
    todayList[0] === expireList[0] &&
    todayList[1] === expireList[1] &&
    todayList[2] >= expireList[2]
  ) {
    return true
  }
  return false
}
```
