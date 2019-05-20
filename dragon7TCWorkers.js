'use strict'

const _=require('lodash')



let workerFarm = require('worker-farm')
    , workers    = workerFarm(require.resolve('./dragon7'),['dragon7','dragon7TC'])
    , ret        = 0
    , results    = []
    , numberWorkers=10
console.time('regular')

function customizer(objValue,srcValue){
    if(_.isEmpty(objValue)){
        objValue=[]

    }
    objValue.push(srcValue)
    return objValue
}


for (let i = 0; i < numberWorkers; i++) {
    workers.dragon7TC(10000, function (err, result) {
        // console.log(result)
        results.push(result)
        // console.log(JSON.stringify(result,null,2))
        if (++ret == numberWorkers){
            workerFarm.end(workers)
            const mergedResults=_.mergeWith({},...results,customizer)
            _.forEach(mergedResults,function(v,k,o){
                const length=v.length
                let [player,banker,frequency]=_.zip(...v)
                o[k]=[_.sum(player)/length,_.sum(banker)/length,_.sum(frequency)/length]
            })

            console.log(JSON.stringify(mergedResults,null,2))
            console.timeEnd('regular')


            // let [player,banker]=_.zip(...results)
            //
            // console.log([_.sum(player)/10,_.sum(banker)/10])
            // console.timeEnd('regular')
            // console.log(results.length,results)
        }

    })
}


