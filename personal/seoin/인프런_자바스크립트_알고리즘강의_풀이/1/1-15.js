// 가운데 문자 출력하기 (홀수라면 가운데 한개 문자, 짝수라면 가운데 두개 문자)
const sol = (voca)=>{
	const voca_length = voca.length
	const mid_index = Math.floor(voca_length/2)
	
	// 홀수 
	if (voca_length % 2){
		return voca.slice(mid_index, mid_index+1)
	}
	// 짝수
	return voca.slice(mid_index-1, mid_index+1)
}

console.log(sol('study')) // u
console.log(sol('herb')) // er

// slice(start,end) 대신 substring(start,end) 사용 가능
// slice 와 substring의 차이? start > end 일 때, start나 end가 음수일 때 
// 참고 : https://codechacha.com/ko/javascript-substring-vs-slice/