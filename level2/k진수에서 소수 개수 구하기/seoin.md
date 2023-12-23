### 풀이
1. n의 k진수를 구한다. (n을 k로 나눈 나머지를 역순으로 / 문자열 이용)
2. 2의 결과를 0으로 split해서 P0P, P0,0P, P 조건에 맞는 수를 찾는다.(숫자 리스트)
3. 그 수들을 소수인지 판단한다.

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


// 제곱근 올림한 값까지만 하면 됨 (예 16- 1X16, 2X8, 4X4 까지 하면 됨. 8X2, 16X1은 이전에 체크했음. / m = a*b라면 a, b 중 하나는 루트 n 이하.)
function isPrime(num) {
  if (num === 1) return false
  if(num === 2) {
    return true;
  }
  
  for(let i = 2; i <= Math.floor(Math.sqrt(num)); i++){
    if (num % i === 0){
      return false; 
    }
  }
  return true; 
}


function solution(n, k) {
    const candidates = jinsu(n,k).split('0').filter(val=> val!=='').map(val=>parseInt(val))
    let answer = 0;
    for (candidate of candidates){
        if (isPrime(candidate)) answer +=1
        
        console.log(candidate, isPrime(candidate))
    }
    return answer;
}
```
### 결과
1. 처음
처음에 풀었을 때는 에라토스테네스의 체로 999,999까지 수를 구했다. 
최대 수는 999,999까지 가능(n이 999,999/k가 10인 경우)하다고 생각했다.
그런데 k진수로 하다보면, 수가 더 커질 수 있다!

![image](https://github.com/tjdls111/next-blog/assets/68271159/83eebc10-2491-4a77-a25e-e163eefb459c)

2. 현재
<img width="475" alt="image" src="https://github.com/v-studies/algorithm/assets/68271159/4a9c6d69-7afb-4f4d-bbac-f93ce0eacc7c">
