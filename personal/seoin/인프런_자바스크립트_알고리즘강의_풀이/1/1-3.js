const solve = (student)=>{
	
	if (student%12) return Number(student/12) + 1 // Math.ceil도 가능 
	return Number(student/12)
}
console.log(solve(25)) // 3
console.log(solve(178)) // 15
