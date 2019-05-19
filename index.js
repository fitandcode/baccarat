'use strict'

const _=require('lodash')



let workerFarm = require('worker-farm')
    , workers    = workerFarm(require.resolve('./regular'))
    , ret        = 0
    , results    = []
console.time('regular')
for (let i = 0; i < 10; i++) {
    workers(100000, function (err, result) {
        // console.log(result)
        results.push(result)
        if (++ret == 10){
            workerFarm.end(workers)
            let [player,banker]=_.zip(...results)

            console.log([_.sum(player)/10,_.sum(banker)/10])
            console.timeEnd('regular')
            // console.log(results.length,results)
        }

    })
}


