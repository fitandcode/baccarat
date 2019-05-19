const Baccarat=require('./baccarat')
const _=require('lodash')
let RC=0
let TC=0
const table={
    1:1,
    2:1,
    3:1,
    4:2,
    5:-1,
    6:-2,
    7:-1,
    8:-1,
    9:0,
    10:0,
    11:0,
    12:0,
    13:0
}

function regular(times,callback,targetTC=0){

    const resultsByTC={}
    let totalHands=0

    for(let i=0;i<times;i++){
        let [results,burnCard]=Baccarat()
        RC=table[burnCard]
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
                        hands:0
                    }
                }


                if(result.result==='b'){
                    resultsByTC[currentTC].bankerWin+=1
                }else if(result.result==='t'){
                    resultsByTC[currentTC].tieWin+=1
                }else{
                    resultsByTC[currentTC].playerWin+=1
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
        const bankerEV=(v.bankerWin*1.95+v.tieWin)/v.hands-1
        const playerEV=(v.playerWin*2+v.tieWin)/v.hands-1
        o[k]=[playerEV,bankerEV,v.hands*100/totalHands]
    })


    callback(null,resultsByTC)
}

function getTC(arr,table){
    // console.log(arr)
    deck=arr[2]/52
    if(deck<1){
        deck=1
    }
    var temp=[...arr[0],...arr[1]]
    _.forEach(temp,function(item){
        RC+=table[item]
    })
    TC=RC/deck



}

module.exports=regular