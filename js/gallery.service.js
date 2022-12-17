'use strict'

let imgCount = 18
let gImgs = []

function init() {
    _createImgs()
}

function _createImgs() {
    for (let i = 0; i < imgCount; i++) {
        gImgs.push({
            id: i + 1,
            url: `img/${i + 1}.jpg`,
            keywords: makeKeyword(i)
        })
    }
}

function getImgs() {
    return gImgs
}

function filterSearch(key) {
    const imgs = gImgs.filter(img => img.keywords.join('').includes(key))
    return imgs
}

function makeKeyword(i) {
    const keyWords = [['politics', 'funny', 'people'], ['animals', 'cute'], ['animals', 'cute', 'kids'],
    ['animals', 'cute'], ['kids', 'cute', 'funny'], ['funny', 'people'], ['funny', 'kids', 'cute'],
    ['funny', 'people'], ['funny', 'kids'], ['funny', 'politics', 'people'], ['funny', 'people'],
    ['funny', 'people'], ['funny', 'people'], ['serious', 'people'], ['funny', 'people'],
    ['funny', 'people'], ['politics', 'people'], ['funny', 'kids'], ['funny', 'people']]
    return keyWords[i]
}
