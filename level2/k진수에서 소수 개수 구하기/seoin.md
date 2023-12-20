### 풀이
1. 에라토스테네스의 체로 999,999이하 수 각각 소수인지 아닌지 1번 구한다. 
    - 최대 수는 999,999까지 가능(n이 999,999/k가 10인 경우)
    - 제곱근까지만 (1X8, 2X4, 4X2, 8X1 .. n = a*b일 때 a나 b는 루트 n 이하.)
    - 1은 소수 아님
2. n의 k진수를 구한다. (n을 k로 나눈 나머지를 역순으로 / 문자열 이용)
3. 2의 결과를 0으로 split해서 P0P, P0,0P, P 조건에 맞는 수를 찾는다.(숫자 리스트)
4. 그 수들을 소수인지 1번 결과를 가지고 판단한다.

### 코드
```js
const jinsu =(n,k)=>{
    let changed_number = ''
    while (n){
        changed_number = n % k + changed_number
        n = parseInt(n / k) 
    }
    return changed_number
}

const MAX_NUM = 1000000


const isSosuArray= Array.from({length:MAX_NUM},()=>true)
for (let i = 2; i < Math.floor(Math.sqrt(MAX_NUM)+1); i++){ 
    if (isSosuArray[i]){
        for (let j = 2; i*j <= MAX_NUM; j++){
            isSosuArray[i*j] = false
        }
    }
}

isSosuArray[1]=false


function solution(n, k) {
    const candidates = jinsu(n,k).split(0).map(num=>parseInt(num))
    let answer = 0;
    for (candidate of candidates){
        if (isSosuArray[candidate]) answer +=1
    }
    return answer;
}
```
### 결과
디버깅 퀴즈
![image](https://github.com/tjdls111/next-blog/assets/68271159/83eebc10-2491-4a77-a25e-e163eefb459c)
