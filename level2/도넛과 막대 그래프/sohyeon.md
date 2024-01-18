```js
function solution(edges) {
  // 모든 정점의 수가 2n + 1(3개) 이상
  // 중간이 되는 정점이 향하는 간선, 정점으로 향하하는 간선이 각 2개씩 있어야 함. (=== 모든 간선이 4개인 정점이 있어야 함.)
  function isEightGraph(graph) {
    if (Object.values(graph).length < 3) return false
    return Object.values(graph).some((count) => count >= 4)
  }

  // 모든 정점에서 향하는 간선이 1개씩 있어야 함.
  // 정점이 1개밖에 없다면 간선은 0개
  function isBarGraph(graph) {
    if (Object.values(graph).length === 1 && Object.values(graph)[0] === 0)
      return true
    return !Object.values(graph).some((count) => count !== 1)
  }

  // 모든 점이 2번씩 (시작점으로 한번, 끝점으로 한번) 나와야 함.
  // 정점이 1개밖에 없다면 간선은 1개
  function isDonutGraph(graph) {
    if (Object.values(graph).length === 1 && Object.values(graph)[0] === 2)
      return true
    return !Object.values(graph).some((count) => count !== 2)
  }

  // 독립된 그래프에 속한 정점 구하기
  function getGraphPoints(startPoint, graphPoints) {
    if (graphPoints.has(startPoint)) return graphPoints
    else {
      graphPoints.add(startPoint)
    }

    points.delete(startPoint)

    // start에서 시작에서 어딘가로
    if (startPoint in from) {
      const endPoints = from[startPoint].keys()
      for (let i = 0; i < from[startPoint].size; i++) {
        const endPoint = String(endPoints.next().value)
        getGraphPoints(endPoint, graphPoints)
      }
    }

    return graphPoints
  }

  function getCountPoint(graphPoints) {
    const pointCount = {}

    graphPoints.forEach((currPoint) => {
      const toMe = currPoint in to ? to[currPoint].size : 0
      const fromMe = currPoint in from ? from[currPoint].size : 0
      pointCount[currPoint] = toMe + fromMe
    })

    return pointCount
  }

  // key: 시작점 value: 끝점의 집합
  // 나로부터 시작해서 어딘가로 가는
  const from = {}

  // key: 끝점 value: 시작점의 집합
  // 누군가에서 나에게로 오는
  const to = {}

  edges.forEach(([startPoint, endPoint]) => {
    // ex) [4, 7]
    // from { 4: Set(7) }
    if (!(startPoint in from)) {
      from[startPoint] = new Set([endPoint])
    } else from[startPoint].add(endPoint)

    // to { 7: Set(4) }
    if (!(endPoint in to)) {
      to[endPoint] = new Set([startPoint])
    } else to[endPoint].add(startPoint)
  })

  // 생성된 정점 찾기
  let addedPoint
  Object.entries(from).forEach(([startPoint, endPoints]) => {
    if (!addedPoint) addedPoint = Number(startPoint)
    else if (
      endPoints.size > from[addedPoint].size && // 나로부터 누군가에서 향하는 간선의 개수가 가장 많은
      !(startPoint in to) // 나에게로 향하는 간선이 없는
    )
      addedPoint = Number(startPoint)
  })

  from[addedPoint].forEach((endPoint) => {
    to[endPoint].delete(addedPoint)
  })

  delete from[addedPoint] // 생성한 정점을 from에서 제거

  // 생성된 정점을 제외한 전체 정점
  const points = new Set(Object.keys(from).concat(Object.keys(to)))

  let eight = 0
  let donut = 0
  let bar = 0

  while (points.size != 0) {
    const graphPoints = getGraphPoints(points.keys().next().value, new Set())
    const pointsCount = getCountPoint(graphPoints)
    if (isEightGraph(pointsCount)) eight++
    if (isBarGraph(pointsCount)) bar++
    if (isDonutGraph(pointsCount)) donut++

    // console.log({ graphPoints, pointsCount })
  }

  return [addedPoint, donut, bar, eight]
}
```
