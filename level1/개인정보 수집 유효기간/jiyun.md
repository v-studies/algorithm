# 문제

[성격 유형 검사하기](https://school.programmers.co.kr/learn/courses/30/lessons/118666)

# 시간 복잡도

o(N)

# 내용

- 문제 유형(-> mbti)과 선택지 별 얻을 수 있는 점수(->point)를 미리 정의한다.
- 성격 유형을 산출하기 위해 스코어를 계산할 때 배열을 8자리로 만들지 않고 4자리로 만든 뒤 부호를 보고 유형을 결정한다.
- test()를 통해 totalScore를 산출하며, getResult()를 통해 totalScore로 부터 성격 유형을 도출한다.
- test()에서는 문제 유형이 5번째 이상, 즉 +- 부호가 반대로 되어야 하는 문항의 경우 스코어의 부호를 바꾸어 더한다.

# 코드

```javascript
function solution(today, terms, privacies) {
  const expireDateList = calculateEndDate(terms, privacies)
  const answer = checkExpireDate(today, expireDateList)
  return answer
}

const calculateEndDate = (terms, privacies) => {
  const termsList = {}
  for (let i = 0; i < terms.length; i++) {
    const termData = terms[i].split(' ')
    termsList[termData[0]] = Number(termData[1])
  }
  // { A: '6', B: '12', C: '3' }
  const expireDateList = []
  for (let i = 0; i < privacies.length; i++) {
    const rowData = privacies[i].split(' ') // [ '2021.05.02', 'A' ]
    const dateList = rowData[0].split('.').map(n => Number(n)) // [ 2019, 1, 1 ]
    let keepDate = termsList[rowData[1]] * 28

    let date = dateList[2] + keepDate
    let share = Math.floor(date / 28)
    let remainder = date % 28
    if (remainder === 0) {
      share -= 1
      remainder += 28
    }
    let month = dateList[1]
    month += share
    if (month > 12) {
      const share2 = Math.floor(month / 12)
      month = month % 12
      if (month === 0) {
        share2 -= 1
        month += 12
      }
      dateList[0] += share2
    }
    dateList[1] = month
    dateList[2] = remainder
    expireDateList[i] = dateList
  }
  return expireDateList
}

const checkExpireDate = (today, expireDateList) => {
  let answer = []
  const todayList = today.split('.').map(n => Number(n))
  for (let i = 0; i < expireDateList.length; i++) {
    let flag = false
    const expireList = expireDateList[i]
    if (todayList[0] > expireList[0]) {
      flag = true
    } else if (todayList[0] === expireList[0] && todayList[1] > expireList[1]) {
      flag = true
    } else if (
      todayList[0] === expireList[0] &&
      todayList[1] === expireList[1] &&
      todayList[2] >= expireList[2]
    ) {
      flag = true
    }
    if (flag) answer.push(i + 1)
  }
  return answer
}
```
