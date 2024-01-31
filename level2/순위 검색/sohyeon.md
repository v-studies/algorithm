## 문제

- [순위 검색](https://school.programmers.co.kr/learn/courses/30/lessons/72412)

### 최종 답안

```javascript
function solution(infos, queries) {
  return queries.map((query) => {
    const score = query.replace(/[^0-9]/g, "")
    const [lang, position, career, food] = query.split(score)[0].split(" and ")

    return search(lang, position, career, food.trim(), score)
  })

  function search(lang, position, career, food, score) {
    let count = 0
    for (const info of infos) {
      const [mLang, mPosition, mCareer, mFood, mScore] = info.split(" ")
      if (lang !== "-" && mLang !== lang) continue
      if (position !== "-" && mPosition !== position) continue
      if (career !== "-" && mCareer !== career) continue
      if (food !== "-" && mFood !== food) continue
      if (parseInt(score) > parseInt(mScore)) continue

      count++
    }

    return count
  }
}
```
