// 2차원 배열 - 각 행, 각 열, 두 대각선 합 중 최대값
const dx=[0,0,1,-1]
const dy = [1,-1,0,0]

const sol = (N, arrList)=>{
	const arr = Array.from(Array(N), () => new Array(N))
    const modifiedArrList= arrList.split('\n').map(a=>a.split(' ').map((s)=>Number(s)))					 
	let answer = 0	
	console.log(modifiedArrList)
	for (let i = 0; i < N ; i ++){
		for (let j = 0 ; j < N ; j ++){
			let flag = false
			const currentValue = modifiedArrList[i][j]
				for (let k = 0; k < 4 ; k++){
					y = dy[k]
					x = dx[k]
				
					if (0<=i+y && i+y < N && 0<=j+x && j+x < N && currentValue <= modifiedArrList[i+y][j+x]){
						flag = true
						break
					}
				}
			if (flag === false)
				answer +=1
			}
			

	}
return answer
}


console.log(sol(5,'5 3 7 2 3\n3 7 1 6 1\n7 2 5 3 4\n4 3 6 4 1\n8 7 3 5 2'))
//10