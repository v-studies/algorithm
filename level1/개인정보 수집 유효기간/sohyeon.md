## 문제
- [개인정보 수집 유효기간](https://school.programmers.co.kr/learn/courses/30/lessons/150370)

## 복잡도
- 시간 복잡도: O(N)

## 풀이 과정
(1) 약관별 유효기간을 Object(key-value) 형태로 정의한다.
```js
const termsObj = terms.reduce((acc, curr) => {
    const [type, months] = curr.split(' ')
    return {...acc, [type]: Number(months)}
}, {})
````

---

(2) 수집된 개인정보마다 만료일을 계산한다.
- 유효기간은 최대 100달 까지 올 수 있으므로 유효기간을 통해 몇년, 몇달이 현재 날짜에서 추가되어야 하는 지 계산한다.
```js
const monthAdded = termsObj[type] % 12
const yearAdded = Math.trunc(termsObj[type] / 12) // 몫만 가져오기
```
- 현재 달에서 monthAdded를 추가했을 때 12를 넘으면 만료 년도에 1년을 추가한다.
- 만료일이 현재날짜와 같거나 작으면 answer에 추가한다.


<br/>
<br/>

### 최종 답안

(1) 직접 계산한 경우
```javascript
function solution(today, terms, privacies) {
    var answer = [];

    const termsObj = terms.reduce((acc, curr) => {
        const [type, months] = curr.split(' ')
        return {...acc, [type]: Number(months)}
    }, {})
    
    
    privacies.forEach((currPrivacy, idx) => {
        const [startDate, type] = currPrivacy.split(' ')
                
        const monthAdded = termsObj[type] % 12
        const yearAdded = Math.trunc(termsObj[type] / 12) // 몫만 가져오기
        
        const [nowYear, nowMonth, nowDay] = today.split('.').map(date => Number(date))
        let [startYear, startMonth, startDay] = startDate.split('.').map(date => Number(date))
        
        let [expiredYear, expiredMonth, expiredDay] = [startYear, startMonth, startDay]
        expiredYear += yearAdded
        
        if(startMonth + monthAdded > 12) {
            expiredYear += 1
            expiredMonth += monthAdded - 12
        } else {
            expiredMonth += monthAdded
        }
        
        if(expiredYear < nowYear) {
            answer.push(idx + 1)
        } else if(expiredYear === nowYear) {
            if(expiredMonth < nowMonth){
                answer.push(idx + 1)
            }else if(expiredMonth === nowMonth){
                if(expiredDay <= nowDay) {
                    answer.push(idx + 1)
                }
            }
        }
    })
    
    return answer;
}
```


---
(2) Date API를 사용할 경우
```js
function solution(today, terms, privacies) {
    var answer = [];
    const todayDate = new Date(today)

    const termsObj = terms.reduce((acc, curr) => {
        const [type, months] = curr.split(' ')
        return {...acc, [type]: Number(months)}
    }, {})
    

    privacies.forEach((currPrivacy, idx) => {
        const [startDateString, type] = currPrivacy.split(' ')
        const expiredDate = new Date(startDateString)
        
        expiredDate.setMonth(expiredDate.getMonth() + Number(termsObj[type]), expiredDate.getDate());
        if(todayDate >= expiredDate) answer.push(idx+1);
    })
    
    return answer;
}
```

**결과 비교는 PR에서 스크린샷을 확인해주세요**