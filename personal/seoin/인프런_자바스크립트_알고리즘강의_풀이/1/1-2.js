// 삼각형 기준 : 두 변의 길이의 합이 나머지 한 변의 길이보다 커야 한다는 것
//python의 sum같은 함수는 없고, reduce를 사용해서 구현해야 함. arr.reduce((a, b) => a + b, 0);

const sol = (a,b,c) =>{
	const lines=[a,b,c].sort()
	const max_line= lines.pop()
	if (max_line < lines.reduce((a, b) => a + b, 0)) console.log('YES')
	else console.log('NO')
	
}

sol(6,7,11)
sol(13, 33, 17)