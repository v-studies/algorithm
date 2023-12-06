# 문제
# - [행렬 테두리 회전하기](https://school.programmers.co.kr/learn/courses/30/lessons/77485)

# 내용
```
문자열 조작
1. table 세팅
2. query for문 실행
- 인덱스를 조작하기 쉽도록 x1,y1,x2,y2 값을 각각 -1 하고 시작함.
- 왼쪽 -> 아래 -> 오른쪽 -> 위 순서로 방향에 맞게 그 옆의 값을 덮어씌움
    - table[y1][x1+1]의 값은 table[y1][x1] 값이 되어야 하는데, 이미 다른 값으로 덮어씌워짐 -> 값 변경 전에 tmp 값을 table[y1][x1]로 지정
- tmp 값을 최소값으로 초기화하고, 변경될 값과 비교하여 최소값 정함

```
![image](https://github.com/v-studies/algorithm/assets/68271159/df0ed9c7-3bbf-4814-9304-eeb4853abb51)

# 코드
```py
def solution(rows, columns, queries):
    answer = []
    # table 그리기
    table = [[0 for j in range(columns)] for i in range(rows)]
    cnt = 1
    for i in range(rows):
        for j in range(columns):
            table[i][j]=cnt
            cnt+=1
    
    # queries 실행
    for query in queries:
        modified_query = list(map(lambda x: x -1,query))
        y1, x1, y2, x2 = modified_query
        
        
        tmp = table[y1][x1]
        min_value = tmp
        for j in range(y1,y2):
            min_value = min(min_value, table[j+1][x1])
            table[j][x1]=table[j+1][x1]
        
        for i in range(x1,x2):
            min_value = min(min_value, table[y2][i+1])
            table[y2][i]=table[y2][i+1]
        
        for j in range(y2,y1,-1):
            min_value = min(min_value, table[j-1][x2])
            table[j][x2]=table[j-1][x2]
            
        for i in range(x2, x1, -1):
            min_value = min(min_value, table[y1][i-1])
            table[y1][i] = table[y1][i-1]
        table[y1][x1+1]=tmp
        
        answer.append(min_value)
            
    return answer
```

참고 ) deque - rotate 사용한 풀이
1. 일정한 순서대로 순회하며, 변경될 값들(테두리 영역)을 deque에 넣기
2. deque.rotate`시간복잡도 O(k)` / deque 의 min 값 구하기
3. 1과 동일한 순서대로, rotate된 deque의 값을 대입하기
