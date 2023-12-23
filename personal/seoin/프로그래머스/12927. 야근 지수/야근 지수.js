// 이분탐색으로 야근 피로도로 맞춰줄 값을 구한다.
// 남는 시간은 순서대로 1씩 깎기
function solution(n, works) {
    const isPossible=(num)=>{
        let needTime = 0
        for (let w of works){
            if (w - num >0){       
            needTime += (w - num)
            }
        }
        
        return needTime <= n
    }
    
    let left = 0
    let right = Math.max(...works)
    let val = right

    while (left <= right){
        middle = parseInt((right+left)/2)
        if (isPossible(middle)){
             right= middle - 1    
             val = Math.min(middle,val)
        } else
        {
            left = middle+1
        }    
        
    }
    const futureWorks = []
    let usedTime= 0 
    for (let i = 0; i < works.length; i++){
        if (works[i] <= val){
            futureWorks.push(works[i])
        }
        else {
            futureWorks.push(val)
            usedTime += (works[i]-val)   
            
        }
        
    }
    futureWorks.sort((a,b)=>b-a)
    
    let j = 0
    while (n - usedTime > 0 && j < futureWorks.length ){
                
        if (futureWorks[j]-1 >= 0 ){            
        futureWorks[j]-=1
        usedTime += 1 
        } 
        j+=1
    }
    
    
    let answer = 0
    for (let k of futureWorks){
        answer += k**2
    }
    return answer
}