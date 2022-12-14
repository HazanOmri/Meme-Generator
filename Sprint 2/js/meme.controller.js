'use strict'

let gElCanvas
let gCtx
let gCountLines = 0

function showCanvas(elImg) {
    document.querySelector('canvas').classList.remove('hide')
    document.querySelector('.tools').classList.remove('hide')
    document.querySelector('.tools').classList.add('tools-show')
    document.querySelector('.main-content').classList.add('flex')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTextLine(txt, selectedLineIdx) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = "40px arial";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, gElCanvas.width / 2, 50 * (selectedLineIdx + 1))
    gCtx.strokeText(txt, gElCanvas.width / 2, 50 * (selectedLineIdx + 1))
}

function renderLines() {
    const meme = getMeme()
    meme.lines.forEach(line =>
        renderTextLine(line.txt, meme.selectedLineIdx)
    );
}

function onAddLineTxt(txt) {

    addMemeLine(txt, gCountLines)
    const elImg = getImg()
    clearMeme(elImg)
    renderLines()
}

function clearMeme(elImg) {
    clearCanvas()
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onChangeLine() {
    changeLineIndex()
}

function onAddLine() {
    changeLineIndex()
    clearMeme(getImg())
    renderLines()
}

function getImg() {
    const meme = getMeme()
    return document.getElementById(meme.selectedImgId)
}