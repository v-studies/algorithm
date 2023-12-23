
function solution(picks, minerals) {
    let answer = 50*25+1;
    
    const deepDown = (diamondPick,ironPick, stonePick, mineralList, fatigue) => {
        if ((diamondPick===0 && ironPick === 0 && stonePick ===0 )|| mineralList.length ===0){
            answer = Math.min(answer, fatigue)
            return 
        }
        const brokenMinerals = mineralList.slice(0, 5)
        
        if (diamondPick){
            deepDown(diamondPick-1, ironPick, stonePick,mineralList.slice(5),fatigue+brokenMinerals.length) 
        }
        
        const brokenMinerals2 = mineralList.slice(0, 5)
        
        
        if (ironPick){
            let thisTimeFatigue = 0
            for (let mi of brokenMinerals2){
                if (mi ==='diamond') thisTimeFatigue += 5
                else{
                    thisTimeFatigue += 1
                }
            }
            deepDown(diamondPick, ironPick-1, stonePick,mineralList.slice(5), fatigue+thisTimeFatigue) 
        }
        
        const brokenMinerals3 = mineralList.slice(0, 5)
        
        if (stonePick){
            let thisTimeFatigue = 0
            for (let mi of brokenMinerals3){
                if (mi ==='diamond') thisTimeFatigue += 25
                else if (mi==='iron'){
                    thisTimeFatigue += 5
                }
                else{
                    thisTimeFatigue += 1
                }
            }
            deepDown(diamondPick, ironPick, stonePick-1,mineralList.slice(5), fatigue+thisTimeFatigue) 
            
        }
        
    }

    deepDown(picks[0], picks[1],picks[2],minerals,0)
    return answer;
}