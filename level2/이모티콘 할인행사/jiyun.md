# 문제

[이모티콘 할인행사](https://school.programmers.co.kr/learn/courses/30/lessons/150368)

# 내용

- 중복순열로 미리 가능한 할인율을 정의
- 유저별 buy, subscribe를 계산
- 할인율별 sell, user를 계산
- maxSell, maxUser와 비교

# 코드

```javascript
function solution(users, emoticons) {
  const discount = [10, 20, 30, 40]
  const discountList = getPermutations(discount, emoticons.length)
  const answer = test(discountList, users, emoticons)
  return answer
}

const getPermutations = function (arr, selectNumber) {
  const results = []
  if (selectNumber === 1) return arr.map(el => [el])
  arr.forEach((fixed, index, origin) => {
    const permutations = getPermutations(origin, selectNumber - 1)
    const attached = permutations.map(el => [fixed, ...el])
    results.push(...attached)
  })

  return results
}

const test = (discountList, users, emoticons) => {
  let maxUser = 0
  let maxSell = 0
  for (let i = 0; i < discountList.length; i++) {
    let user = 0
    let sell = 0
    for (let j = 0; j < users.length; j++) {
      const [buyDiscount, buyMax] = users[j]
      let buy = 0
      let subscribe = false
      for (let k = 0; k < emoticons.length; k++) {
        if (discountList[i][k] >= buyDiscount) {
          buy += (emoticons[k] * (100 - discountList[i][k])) / 100
        }
        if (buy >= buyMax) {
          subscribe = true
          break
        }
      }
      if (subscribe) user += 1
      else sell += buy
      if (user > maxUser || (user == maxUser && sell > maxSell)) {
        maxUser = user
        maxSell = sell
      }
    }
    return [maxUser, maxSell]
  }
}
```
