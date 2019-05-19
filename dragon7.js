const Baccarat=require('./baccarat')
function dragon7(times,callback){
    let totalHands=0
    let bankerWin=0
    let playerWin=0
    let tieWin=0
    let bankerTie=0

    for(let i=0;i<times;i++){
        let [results,burnCard]=Baccarat()
        const hands=results.length
        // while(true){
        for(let hand=0;hand<hands;hand++){
            const result=results[hand]
            totalHands+=1
            if(result.result==='p'){
                playerWin+=1
            }else if(result.result==='t'){
                tieWin+=1
            }else{
                if(result.bp===7&&result.bc===3){
                    bankerTie+=1
                }else{
                    bankerWin+=1
                }
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


    callback(null,[(playerWin*2+tieWin)/totalHands-1,(bankerWin*2+tieWin+bankerTie)/totalHands-1])
}
module.exports=dragon7
