// 1 가위, 2 바위, 3 보 -> 승자 출력 / 비기면 D

const rock_paper_scissor=(a,b)=>{
	// 비김
	if (a===b) return 'D'
	// a가 보, b가 가위일 때 B 승리
	if (a===3 && b===1) return 'B'
	// 그 외에는 b <a 이거나, a가 가위 / b가 보이면 a 승리
	if ( b < a || (a===1 && b===3)) return 'A'
	// b 승리
	return 'B'
}
const sol = (a_choices, b_choices)=>{
	const a_choice_list = a_choices.split(' ').map(choice => Number(choice))
	const b_choice_list = b_choices.split(' ').map(choice => Number(choice))
	
	for (let i=0; i < a_choice_list.length; i++){
		const a  = a_choice_list[i]
		const b = b_choice_list[i]
		console.log(rock_paper_scissor(a,b))
	}

		
}

console.log(sol('2 3 3 1 3', '1 1 2 2 3')) // A B A B D