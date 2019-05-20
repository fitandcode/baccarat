const Baccarat=require('./baccarat')
const _=require('lodash')

let RC=0
let TC=0
const table={
    1:0,
    2:0,
    3:0,
    4:-1,
    5:-1,
    6:-1,
    7:-1,
    8:2,
    9:2,
    10:0,
    11:0,
    12:0,
    13:0
}





function dragon7TC(times,callback){

    const resultsByTC={}
    let totalHands=0

    for(let i=0;i<times;i++){
        let [results,burnCard]=Baccarat()
        RC=table[burnCard]
        TC=0
        const hands=results.length
        // while(true){
        for(let hand=0;hand<hands;hand++){
            const result=results[hand]
            totalHands+=1
            const currentTC=Math.round(TC)
            if(resultsByTC[currentTC]===undefined){
                resultsByTC[currentTC]={
                    bankerWin:0,
                    playerWin:0,
                    tieWin:0,
                    dragon7:0,
                    hands:0
                }
            }


            if(result.result==='p'){
                resultsByTC[currentTC].playerWin+=1
            }else if(result.result==='t'){
                resultsByTC[currentTC].tieWin+=1
            }else{
                if(result.bc===3&&result.bp===7){
                    resultsByTC[currentTC].dragon7+=1
                }else{
                    resultsByTC[currentTC].bankerWin+=1
                }

            }
            resultsByTC[currentTC].hands+=1

            getTC([result.player,result.banker,result.csl],table)
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

    _.forEach(resultsByTC,function(v,k,o){
        const bankerEV=(v.bankerWin*2+v.dragon7+v.tieWin)/v.hands-1
        const playerEV=(v.playerWin*2+v.tieWin)/v.hands-1
        o[k]=[playerEV,bankerEV,v.hands*100/totalHands]
    })


    callback(null,resultsByTC)
}


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

function getTC(arr,table){
    // console.log(arr)
    let deck=arr[2]/52
    // if(deck<1){
    //     deck=1
    // }
    const temp=[...arr[0],...arr[1]]
    _.forEach(temp,function(item){
        RC+=table[item]
    })
    TC=RC/deck



}
exports.dragon7=dragon7
exports.dragon7TC=dragon7TC
