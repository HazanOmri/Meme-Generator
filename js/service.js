'use strict'

let imgCount = 18
let gImgs = []
let id = 1

function init() {
    _createImgs()
}

function _createImgs() {
    for (let i = 0; i < imgCount; i++) {
        gImgs.push({
            id: id++,
            url: `img/${i + 1}.jpg`,
            keywords: ['funny', 'cat']
        })
    }
}

function getImgs(){
    return gImgs
}