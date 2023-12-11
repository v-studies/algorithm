// 홀수인 자연수 합
// 홀수 중 최소값 찾기
const sol=(nums)=>{
	const numbers = nums.split(' ').map(i=>Number(i))
	let min_odd = 101 // 최대값 100 
	let odd_sum = 0
	
	for (let i =0 ;i<numbers.length;i++){
		if (numbers[i]%2 !==0) {
			odd_sum += numbers[i]
			if (min_odd > numbers[i]) min_odd = numbers[i]
		}
	}
	return [odd_sum, min_odd]
	
}

console.log(sol('12 77 38 41 53 92 85')) // 256 41