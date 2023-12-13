// 숫자가 이전 숫자보다 큰 개수. (처음 꺼는 무조건 ok)
const sol = (student_heights)=>{
	const heights = student_heights.split(' ').map((height)=>Number(height))
	let highest = heights[0]
	let answer = 1
	heights.slice(1).forEach((height)=>{
		if (highest < height){
			answer +=1 
			highest = height
		}
	})
	return answer

}
console.log(sol('130 135 148 140 145 150 150 153')) //5