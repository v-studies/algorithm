// '대문자로 입력된 단어가 입력되면' : 단어 전체가 대문자인지 판단 필요 -> 아스키 코드로 판단해야 한다고 생각함.
// 그런데 조건이 대문자로 입력된 단어가 들어온다는 뜻이었음
const sol = (voca)=>{
	// const isAllCapital = ()=>{
	// 	for ( let i =0;i<=voca.length;i++){
	// 		if (07 <= v.charCodeAt(i)  && v.charCodeAt(i) <=122) continue
	// 		return false
	// 	}
	// 	return true
	// 	}	

	// return isAllCapital ? voca.replace(/A/g, '#') : voca
	return voca.replace(/A/g, '#') 
}	
console.log(sol('BANANA')) //B#N#N#
