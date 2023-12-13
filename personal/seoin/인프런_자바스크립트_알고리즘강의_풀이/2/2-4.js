const sol = (results)=>{
	const result_list = results.split(' ')
	let answer = 0
	let continuous_correct = 0
	
	result_list.forEach((result)=>{
		if (result === '1') {
			continuous_correct += 1
			answer += continuous_correct
		}
		else{
			continuous_correct = 0
		}
	})
	return answer
}

console.log(sol('1 0 1 1 1 0 0 1 1 0')) //10