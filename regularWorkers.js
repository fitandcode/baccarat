'use strict'

const _=require('lodash')



let workerFarm = require('worker-farm')
    , workers    = workerFarm(require.resolve('./regular'),['regular','regularTC'])
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
    workers.regular(100000, function (err, result) {
        // console.log(result)
        results.push(result)
        // console.log(JSON.stringify(result,null,2))
        if (++ret == numberWorkers){
            workerFarm.end(workers)
            let [player,banker]=_.zip(...results)

            console.log(_.sum(player)/numberWorkers,_.sum(banker)/numberWorkers)
            console.timeEnd('regular')


            // let [player,banker]=_.zip(...results)
            //
            // console.log([_.sum(player)/10,_.sum(banker)/10])
            // console.timeEnd('regular')
            // console.log(results.length,results)
        }

    })
}


