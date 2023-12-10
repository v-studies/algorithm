## 문제

- [level1] [달리기 경주](https://school.programmers.co.kr/learn/courses/30/lessons/178871)

## 복잡도

- 시간 복잡도: O(N)

## 풀이 과정

1. 플레이어의 이름을 key 등수를 value 로 가지는 object를 생성한다. (`playerRanks = {'mumu': 1, ...}`)
2. callings를 순회하며 이름이 불러진 선수의 등수는 playerRanks를 통해 찾아 등수를 올리고 이름이 불러진 선수 앞에 있던 선수는 players 어레이를 통해 찾아 등수를 내린다.
   <br/>(참고) players 어레이는 항상 등수 순을 유지한다. player[0]이 'mumu'이고 player[1]이 'soe' 라면 mumu가 1등 soe가 2등 인 상태이다.
   <br/>
   <br/>

### 최종 답안

```javascript
function solution(players, callings) {
  // 이름을 불린 사람이 한 칸 앞으로 옴
  // 1등 부터 현재 등 수 순으로 players
  // 이름이 불린 순서대로 callings
  // 경주가 끝났을 때 1등부터 이름 return

  var answer = []

  // player의 등수가 담긴 {}
  // player[0] 의 등수는 playerRanks.[player[0]의 이름]: 1
  const playerRanks = {}

  players.forEach((player, i) => {
    playerRanks[player] = i + 1 // 등수는 1부터 시작하니까 1 더하기
  })

  for (let i = 0; i < callings.length; i++) {
    const currCallingPlayer = callings[i]
    // 이름이 불린 선수의 현재 등수
    const currRank = playerRanks[currCallingPlayer]

    // 이름이 불린 선수의 앞에 있는 선수 이름
    const frontPlayer = players[currRank - 2]

    // 한 사람을 추월했으니까 등수가 하나 올라감
    playerRanks[currCallingPlayer] = currRank - 1
    players[currRank - 2] = currCallingPlayer

    // 원래 하나 위에 있던 선수는 추월한 선수의 추월 전 등수로 바뀜
    playerRanks[frontPlayer] = currRank
    players[currRank - 1] = frontPlayer
  }

  answer = players
  return answer
}
```
