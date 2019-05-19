const Baccarat=require('./baccarat')


function regular(times,callback,targetTC=0){
    let totalHands=0
    let bankerWin=0
    let playerWin=0
    let tieWin=0

    for(let i=0;i<times;i++){
        let [results,burnCard]=Baccarat()
        const hands=results.length
        // while(true){
            for(let hand=0;hand<hands;hand++){
                const result=results[hand]
                totalHands+=1
                if(result.result==='b'){
                    bankerWin+=1
                }else if(result.result==='t'){
                    tieWin+=1
                }else{
                    playerWin+=1
                }
            }

            // const result=results.shift()
            // if(result){
            //     totalHands+=1
            //     if(result.result==='b'){
            //         bankerWin+=1
            //     }else if(result.result==='t'){
            //         tieWin+=1
            //     }else{
            //         playerWin+=1
            //     }
            // }else{
            //     break
            // }
        // }
    }


    callback(null,[(playerWin*2+tieWin)/totalHands-1,(bankerWin*1.95+tieWin)/totalHands-1])
}

module.exports=regular