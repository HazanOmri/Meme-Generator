'use strict'

let gElCanvas
let gCtx

function showCanvas(url) {
    document.querySelector('canvas').classList.remove('hide')
    document.querySelector('.tools').classList.remove('hide')
    document.querySelector('.tools').classList.add('tools-show')
    document.querySelector('.main-content').classList.add('flex')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    loadImageFromInput(url)
}

function loadImageFromInput(url) {
    let img = new Image()
    img.src = `${url}`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}