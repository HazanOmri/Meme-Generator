'use strict'

let currImgUrl

function onInit() {
    init()
    renderImgs()
}

function renderImgs(key) {
    let imgs = getImgs()
    if (key != undefined && key != '') imgs = filterSearch(key)
    let strHTML = ''
    imgs.forEach(img => {
        strHTML += `<img src="${img.url}" id = "${img.id}"onclick="moveToCanvas(this)">`
    })
    document.querySelector(".imgs-container").innerHTML = strHTML
}

function moveToCanvas(elImg) {
    setMemeImgId(elImg.id)
    document.body.classList.add('meme-editor')
    document.querySelector('.search').classList.add('hide')
    document.querySelector('.imgs-container').classList.add('hide')
    document.querySelector('.designer').classList.add('hide')
    showCanvas(elImg)
}

function onShowGallery() {
    document.body.classList.remove('meme-editor')
    document.querySelector('.search').classList.remove('hide')
    document.querySelector('.imgs-container').classList.remove('hide')
    document.querySelector('.designer').classList.remove('hide')
    document.querySelector('.canvas-container').classList.add('hide')
    document.querySelector('.header-nav a').classList.add('active')
}

function getCurrImgUrl() {
    return currImgUrl
}

function onToogleNav(elButton) {
    if (elButton) elButton.classList.toggle('hide')
    else document.querySelector('.hamburger').classList.toggle('hide')
    const elMenu = document.querySelector('.header-nav')
    elMenu.classList.toggle('open')
}

function onFilterSearch(key) {
    renderImgs(key)
}
