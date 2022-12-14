'use strict'

function onInit() {
    init()
    renderImgs()
}

function renderImgs() {
    const imgs = getImgs()
    let strHTML = ''
    imgs.forEach(img => {
        strHTML += `<img src="${img.url}" onclick="moveToCanvas('${img.url}')">`
    })
    document.querySelector(".imgs-container").innerHTML = strHTML
}

function moveToCanvas(ev, url) {
    document.querySelector('.imgs-container').classList.add('hide')
    document.querySelector('.designer').classList.add('hide')
    showCanvas(ev, url)
}

