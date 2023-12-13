const sol = (n)=>{
	let answer = 0
	for (let i = 0; i <= n; i++) answer=answer +i
	
	return answer
}
console.log(sol(6)) // 21
console.log(sol(10)) //55
