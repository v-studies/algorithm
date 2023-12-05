## 문제
- [택배 배달과 수거하기](https://school.programmers.co.kr/learn/courses/30/lessons/150369)

## 복잡도
- 시간 복잡도: O(N^2)

## 풀이 과정
- 최소 이동거리를 구하기 위해서는 가장 마지막에 있는 집에 들리는 경우가 적어야하므로 마지막 집의 수거/배달 부터 처리한다.

**배달**
- 배달은 `물류창고 -> 마지막 집` 으로 이동하는 길에 처리된다고 가정한다. 그럼 `마지막 집 -> 물류창고` 로 돌아가는 길에는 트럭에 짐이 하나도 없는 상태라고 가정할 수 있다. 
- 가장 마지막 집의 배달부터 마지막에서 가까운 순으로 배달을 처리한다.

**수거**
- `마지막 집 -> 물류창고` 로 돌아가는 길에 수거할 수 있는 모든 짐을 수거한다.


<br/>
<br/>

### 최종 답안 - (1) 시간초과 😢
```javascript
function solution(cap, n, deliveries, pickups) {
    var answer = 0;
    let lastVisitHomeNo = n
    
    while(lastVisitHomeNo > 0) {     
        if(deliveries[lastVisitHomeNo - 1] === 0 && pickups[lastVisitHomeNo - 1] === 0){
            lastVisitHomeNo -= 1
        } else {
            let restDeliver = cap // 차에 실은 택배 상자 수
            let currCap = cap // 차에 남은 공간 수

            for(let i = lastVisitHomeNo - 1; i >= 0 ; i--) {                
                const deliverable = Math.min(deliveries[i], restDeliver)
                deliveries[i] -= deliverable
                restDeliver -= deliverable
    
                const pickupable = Math.min(pickups[i], currCap) 
                pickups[i] -= pickupable
                currCap -= pickupable
                
                if(currCap === 0 && restDeliver === 0) {
                    break
                }
            }
            answer += lastVisitHomeNo
        }

    }
    
    return answer * 2;
}
```