# [level 2] 도넛과 막대 그래프

[문제 링크](https://school.programmers.co.kr/learn/courses/30/lessons/258711) 


### 문제 풀이

- 생성한 정점 구하고 그래프 탐색을 해야 한다.
- 따라서, 추후 코드 수정이 필요하다. 

```java
import java.util.*;


class Solution {

  static int MAX = 1000000;
	  static boolean[] visited = new boolean[MAX + 1];
          static int nodeCnt = 0;
	  static int edgeCnt = 0;

	  static int donut = 0;
	  static int bar = 0;
	  static int eight = 0;
          static int nodeNum = 0;
          static int graph = 0;
          static int start = 0;
          static int end = 0;

    public List<Integer> solution(int[][] edges) {
        List<List<Integer>> list = new ArrayList<>();

		for (int i = 0; i < MAX+1; i++) {
			list.add(new ArrayList<>());
		}

		for (int[] edge : edges) {
			int node1 = edge[0];
			int node2 = edge[1];

			list.get(node1).add(node2);
		}

		for (int i = 1; i < MAX+1; i++) {
			if (!visited[i] && list.get(i).size() > 0) {
				nodeCnt += 1;
                start = i;
				dfs(i, list);

				if (nodeCnt == edgeCnt && start == end) {
					donut += 1;
				}


                int n = 1;
                while( 2 * n + 1 <= nodeCnt){
                    if(2 * n + 1 == nodeCnt && 2 * n + 2 == edgeCnt){
                        eight +=1;
                        break;
                    }else{
                        n++;
                    }
                }

                if(edgeCnt > nodeCnt && list.get(i).size() >= 2){
                    nodeNum = i;
                    graph = list.get(i).size();
                }


                nodeCnt = 0;
                edgeCnt = 0;
                start = 0;
                end = 0;
			}
		}

        if(graph - eight - donut - bar > 0){
             bar += graph - eight - donut - bar;
        }


        List<Integer> answer = new ArrayList<>();
        answer.add(nodeNum);
        answer.add(donut);
        answer.add(bar);
        answer.add(eight);

        return answer;
    }

    public void dfs(int i, List<List<Integer>> list) {
		visited[i] = true;
		for (int k = 0; k < list.get(i).size(); k++) {
			int next = list.get(i).get(k);
            end = next;

			if (!visited[next] && list.get(next).size() > 0) {
				visited[next] = true;
				nodeCnt += 1;
				edgeCnt += 1;
				dfs(next, list);
			} else {
				edgeCnt += 1;
			}
		}
	}
}
```
