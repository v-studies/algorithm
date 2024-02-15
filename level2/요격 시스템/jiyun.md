# 문제

[요격 시스템]([https://school.programmers.co.kr/learn/courses/30/lessons/92335](https://school.programmers.co.kr/learn/courses/30/lessons/181188))

# 내용

- 시작점만 기준으로 정렬하면 요걱 가능한 최대 지점을 계산할 때 이전 값과 최근 값을 비교해 최소값을 구해야 한다.
- 시작점과 종료점을 둘 다 정렬하며, 이 때 종료점을 첫번 째 기준, 시작점을 두번 째 기준으로 정렬하면 앞선 미사일보다 시작점이 늦지만 종료점이 빠른 미사일이 들어오는 경우가 없게 되어 최소값을 구하지 않아도 된다.

# 코드

```javascript
function solution(targets) {
    var answer = 0;
    
    let sortedTargets = targets.sort((a, b) => {
        if (a[1] === b[1]) return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
        return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0; 
    })
    let lastPoint = -1
    for (let [start, end] of sortedTargets) {
        if (start < lastPoint) {

        } else {
            answer++
            lastPoint = end
        }
    }
    return answer;
}
```
