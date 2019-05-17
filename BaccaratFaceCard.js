const fs=require('fs')
const points=JSON.parse(fs.readFileSync('faceCardBackUp.txt',{encoding:'utf-8'}))
let last=false
const newShoe=require('./shoeWithFaceCard')

function Baccarat(showCardsLeft=false,deck=8,cutCard=14){
    const [shoe,burnCard]=newShoe(deck,cutCard)
    last=false
    const result=[]
    while(true){
        let r=round(shoe,showCardsLeft)
        if(r){
            result.push(r)
        }else{
            break
        }
    }
    return [result,burnCard]
}
function round(shoe,showCardsLeft=true,burnCard=false){
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
        if(bankerPoint>=8||playerPoint>=8){
            if(showCardsLeft){
                return [player,banker,(shoe.length-1)/52]//including one cut card
            }else{
                return [player,banker]
            }

        }else if(playerPoint<=5){
            playerThirdCard=drawCard(shoe)
            player.push(playerThirdCard)
            drawThirdCard(shoe,playerThirdCard,banker,bankerPoint)
            if(showCardsLeft){
                return [player,banker,(shoe.length-1)/52]
            }else{
                return [player,banker]
            }
        }else{//player does not draw third card
            if(bankerPoint<=5){
                banker.push(drawCard(shoe))
            }
            if(showCardsLeft){
                return [player,banker,(shoe.length-1)/52]
            }else{
                return [player,banker]
            }
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

module.exports=Baccarat