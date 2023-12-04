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
