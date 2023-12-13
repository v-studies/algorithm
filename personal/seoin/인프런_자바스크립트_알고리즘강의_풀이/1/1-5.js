const sol = (n)=>{
	const numbers = n.split(' ').map(i=>Number(i))
	const min_number = Math.min(...numbers)
	return min_number
									 
}
console.log(sol('5 3 7 11 2 15 17')) // 2
