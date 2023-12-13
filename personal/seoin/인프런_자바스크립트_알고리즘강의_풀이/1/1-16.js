// 중복 문자 제거
const sol = (voca)=>{
	const vocaList = voca.split('')
	const removeDuplicatedStringList = new Set(vocaList)
	return [...removeDuplicatedStringList].join('')
}
console.log(sol('ksekkset')) //kset
