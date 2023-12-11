// 2차원 배열 - 각 행, 각 열, 두 대각선 합 중 최대값
const sol = (N, arrList)=>{
	const arr = Array.from(Array(N), () => new Array(N))
    const modifiedArrList= arrList.split('\n').map(a=>a.split(' ').map((s)=>Number(s)))					 
	console.log(modifiedArrList)

	let answer = 0
	
	for (let i = 0; i < N; i ++){
		let column_sum = 0
		let row_sum = 0
		let diagonal_sum = 0
		let reverse_diagonal_sum = 0
		diagonal_sum += modifiedArrList[i][i]
		reverse_diagonal_sum += modifiedArrList[i][N-i-1]
		
		for (let j = 0; j < N;j ++){
			column_sum += modifiedArrList[j][i]
			row_sum += modifiedArrList[i][j]
		}
		answer = Math.max(answer, diagonal_sum, column_sum, row_sum,reverse_diagonal_sum)		
	
	}
	console.log(answer)
	return answer
	
}

sol(5,'10 13 10 12 15\n12 39 30 23 11\n11 25 50 53 15\n19 27 29 37 27\n19 13 30 13 19')
// 155