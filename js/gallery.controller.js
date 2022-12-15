'use strict'

let currImgUrl

function onInit() {
    init()
    renderImgs()
}

function renderImgs() {
    const imgs = getImgs()
    let strHTML = ''
    imgs.forEach(img => {
        strHTML += `<img src="${img.url}" id = "${img.id}"onclick="moveToCanvas(this)">`
    })
    document.querySelector(".imgs-container").innerHTML = strHTML
}

function moveToCanvas(elImg) {
    setMemeImgId(elImg.id)
    document.querySelector('.search').classList.add('hide')
    document.querySelector('.imgs-container').classList.add('hide')
    document.querySelector('.designer').classList.add('hide')
    showCanvas(elImg)
}

function getCurrImgUrl(){
    return currImgUrl
}