const sol = (num, cars) =>{
	
	let ans = 0
	let number = String(num)
	const cars_list = cars.split(' ')
	
	for (let car of cars_list){
		if (car[1]===number) ans ++
	}
	return ans
	
}

console.log(sol(3,'25 23 11 47 53 17 33')) // 3
console.log(sol(0,'12 20 54 30 87 91 30')) // 3