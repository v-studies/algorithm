## 문제
- [주차 요금 계산](https://school.programmers.co.kr/learn/courses/30/lessons/92341)

## 복잡도
- 시간 복잡도: O(N)

## 풀이 과정
(1) 정렬
- 결과는 차량 번호가 작은 순으로 나와야 하기 때문에 주어진 records를 번호순으로 정렬한다.
- 번호가 같다면 입/출차 시간이 이른 순으로 정렬한다.

(2) 준비
정렬된 records의 마지막 차량이 'IN' 상태라면 records의 마지막에 23:59에 출차한 기록을 추가한다. 
```js
const lastCar = splitRecord(sortedRecords[sortedRecords.length - 1])

if(lastCar.inOut === 'IN') {
    sortedRecords.push(`23:59 ${lastCar.carNo} OUT`)
}
```

(3) 요금 계산 (코드의 주석 참고)
- 정렬된 records를 순회하면서 요금을 계산한다.
- 차량이 출차 했다고 판단하면 answer에 계산된 fee를 추가한다.
- 차량의 출차 판단
- - 이전 차량이 IN 이고 현재 차량이 IN 인 경우 === 이전 차량의 OUT이 기록 되지 않았으므로 23:59 에 출차 한 경우이다
- - 이전 차량이 IN 이고 현재 차량이 OUT 인 경우 === 이전 차가 나가지 않았는 데 새로운 차가 나갈 경우는 있을 수 없으므 같은 차가 들어갔다가 나간 경우이다.
- 차량이 두 번 이상 입/출차 했는 지 여부 판단 (누적 시간을 구해야 하기 때문에 필요하다)
- - 이전 차량이 OUT 이고 현재 차량이 IN 인 경우, 이전 차량과 현재 차량의 번호가 같으면 다시 들어온 것이고 다르면 새로운 차량이 들어온 것이다.

<br/>
<br/>

### 최종 답안
```javascript
const splitRecord = (record) => {
    const [time, carNo, inOut] = record.split(' ')
    
    return {carNo, time, inOut}
}

const convertToMinute = (time) => {
    const [hour, minute] = time.split(':')
    
    return Number(hour) * 60 + Number(minute)
}


function solution(fees, records) {
    var answer = [];
    const [normalMinute, normalFee, exceedPerMinute, exceedFee] = fees
    
    const getFee = (stayMinute) => {
        const exceedMinute = stayMinute - normalMinute

        if(exceedMinute > 0) {
            return normalFee + (Math.ceil(exceedMinute / exceedPerMinute) * exceedFee)
        }

        return normalFee
    }
    
    
    const sortedRecords = records.sort((record1, record2) => {
        const car1 = splitRecord(record1)
        const car2 = splitRecord(record2)
        
        if(car1.carNo === car2.carNo) {
            return convertToMinute(car1.time) - convertToMinute(car2.time)
        }
        
        return car1.carNo - car2.carNo
    })
    
    const lastCar = splitRecord(sortedRecords[sortedRecords.length - 1])

    if(lastCar.inOut === 'IN') {
        sortedRecords.push(`23:59 ${lastCar.carNo} OUT`)
    }

    let reEnter = false
    let totalTime = 0
    let prevCar = null
    
    for(let i = 0; i < sortedRecords.length; i++) {
        currCar = splitRecord(sortedRecords[i])

        if(prevCar === null) {
            prevCar = currCar
            continue
        }

        if(prevCar.inOut === 'IN' && currCar.inOut === 'IN') {
            // 이전 차가 나간 기록이 없는 데 새로운 차가 들어온 경우
            // 이전 차는 23:59에 출차 했다고 가정 한다.
            totalTime += convertToMinute('23:59') - convertToMinute(prevCar.time)

            const fee = getFee(totalTime)

            // 이전 차가 나왔다 다시 들어간 거라면 마지막 answer에 추가되어야 한다.
            // 이전 차가 나왔다 다시 들어간 거라면 OUT, IN을 거쳤을 것이다. -> reEnter가 true이다
            if(reEnter) {
                answer[answer.length > 0 ? answer.length - 1 : 0] = fee
            } else {
                // 이전 차가 처음 들어갔다 나온 기록이 없는 거라면 새로운 answer를 추가해야 한다.
                answer.push(fee)
            }

            totalTime = 0
            reEnter = false
        } else if(prevCar.inOut === 'IN' && currCar.inOut === 'OUT') {
            // 이전 차가 나가지 않았는 데 새로운 차가 나간 경우는 있을 수 없다.
            // 즉, 이 경우 같은 차가 들어갔다가 나간 경우라고 볼 수 있다.
            totalTime += convertToMinute(currCar.time) - convertToMinute(prevCar.time)
            const fee = getFee(totalTime)
            
            if(reEnter) {
                answer[answer.length > 0 ? answer.length - 1 : 0] = fee
            } else {
                answer.push(fee)
            }
        } else if(prevCar.inOut === 'OUT' && currCar.inOut === 'IN') {
            // 이전 차가 나가고 현재 차가 들어온 경우

            // 나간 차와 현재 차가 같다 === 같은 차가 나갔다가 다시 들어왔다
            if(prevCar.carNo === currCar.carNo) {
                // 같은 차이므로 totalTime을 유지 시켜야 한다.
                reEnter = true
            }else {
                reEnter = false
                totalTime = 0
            }
        }


        prevCar = currCar
    } 
    
    return answer;
}
```