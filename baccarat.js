const fs=require('fs')
const points=JSON.parse(fs.readFileSync('faceCard.txt',{encoding:'utf-8'}))
let last=false
const newShoe=require('./shoe')

function Baccarat(deck=8,cutCard=14){
    const [shoe,burnCard]=newShoe(deck,cutCard)
    last=false
    const results=[]
    while(true){
        let r=round(shoe)
        if(r){
            results.push(r)
        }else{
            break
        }
    }

    // console.log(JSON.stringify(results,null,2))
    return [results,burnCard]

}
function round(shoe,burnCard=false){
    const result={}
    let banker=[]
    let player=[]
    let bankerPoint=undefined
    let playerPoint=undefined
    let playerThirdCard=undefined
    if(!last){
        if(burnCard){
            drawCard((shoe))
        }
        player.push(drawCard(shoe))
        banker.push(drawCard(shoe))
        player.push(drawCard(shoe))
        banker.push(drawCard(shoe))
        bankerPoint=points[banker.toString()]
        playerPoint=points[player.toString()]
        result.b2p=bankerPoint
        result.p2p=playerPoint
        if(bankerPoint>=8||playerPoint>=8){
            result.banker=banker
            result.player=player
            result.bp=bankerPoint
            result.pp=playerPoint
            result.bc=2
            result.pc=2
            result.cs=4
            result.csl=shoe.length-1
            if(bankerPoint>playerPoint){
                result.result='b'
            }else if(bankerPoint===playerPoint){
                result.result='t'
            }else{
                result.result='p'
            }

            return result

        }else if(playerPoint<=5){
            playerThirdCard=drawCard(shoe)
            player.push(playerThirdCard)
            drawThirdCard(shoe,playerThirdCard,banker,bankerPoint)
            bankerPoint=points[banker.toString()]
            playerPoint=points[player.toString()]

            result.banker=banker
            result.player=player
            result.bp=bankerPoint
            result.pp=playerPoint
            result.bc=banker.length
            result.pc=3
            result.cs=3+banker.length
            result.csl=shoe.length-1
            if(bankerPoint>playerPoint){
                result.result='b'
            }else if(bankerPoint===playerPoint){
                result.result='t'
            }else{
                result.result='p'
            }

            return result




        }else{//player does not draw third card
            if(bankerPoint<=5){
                banker.push(drawCard(shoe))
            }
            bankerPoint=points[banker.toString()]

            result.banker=banker
            result.player=player
            result.bp=bankerPoint
            result.pp=playerPoint
            result.bc=banker.length
            result.pc=2
            result.cs=2+banker.length
            result.csl=shoe.length-1
            if(bankerPoint>playerPoint){
                result.result='b'
            }else if(bankerPoint===playerPoint){
                result.result='t'
            }else{
                result.result='p'
            }

            return result
        }
    }else{//end of the shoe
        return undefined
    }
}

function drawThirdCard(shoe,playerThirdCard,banker,bankerPoint){
    if(bankerPoint<=2){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===3&&playerThirdCard!=8){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===4&&(playerThirdCard>=2&&playerThirdCard<=7)){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===5&&(playerThirdCard>=4&&playerThirdCard<=7)){
        banker.push(drawCard(shoe))
    }
    else if(bankerPoint===6&&(playerThirdCard===6||playerThirdCard===7)){
        banker.push(drawCard(shoe))
    }
}

function drawCard(shoe){
    let card=shoe.pop()
    if(card===undefined){
        last=true
        card=shoe.pop()
    }
    return card


}



// Baccarat()

module.exports=Baccarat