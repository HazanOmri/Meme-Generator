'use strict'

let gElCanvas
let gCtx
let gCountLines = 0
let gToggleTxtBox = true

function showCanvas(elImg) {
    document.querySelector('canvas').classList.remove('hide')
    document.querySelector('.tools').classList.remove('hide')
    document.querySelector('.tools').classList.add('tools-show')
    document.querySelector('.main-content').classList.add('flex')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTextLine(line, lineIdx) {
    let hgt = gElCanvas.height * 0.1
    const memeSelectedLineIdx = getMeme().selectedLineIdx
    if (lineIdx === 1) hgt = 400
    else if (lineIdx != 0) hgt = gElCanvas.height / 2 - lineIdx * 30
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px arial`
    gCtx.textAlign = `${line.align}`
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, gElCanvas.width / 2, hgt)
    gCtx.strokeText(line.txt, gElCanvas.width / 2, hgt)
    if (memeSelectedLineIdx === lineIdx && gToggleTxtBox) {
        const txtLength = line.txt.split('').length * line.size + 10
        gCtx.strokeStyle = `black`
        gCtx.strokeRect(gElCanvas.width / 2 - txtLength / 2, hgt - (line.size / 2), txtLength, line.size)
    }
}

function renderLines() {
    const meme = getMeme()
    meme.lines.forEach((line, idx) =>
        renderTextLine(line, idx)
    );
}

function onAddLineTxt(txt) {
    addMemeLine(txt, gCountLines)
    renderMeme()
}

function renderMeme() {
    clearMeme()
    renderLines()
}

function clearMeme(elImg = getImg()) {
    clearCanvas()
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onChangeLine() {
    changeLineIndex()
    let elInput = document.querySelector('.edit')
    elInput.value = gMeme.lines[gMeme.selectedLineIdx].txt
    renderMeme()
}

function onAddLine() {
    const elInput = document.querySelector('.edit')
    addLineIndex()
    elInput.value = ''
    renderMeme()
}

function getImg() {
    const meme = getMeme()
    return document.getElementById(meme.selectedImgId)
}

function onSetFont(num) {
    setFont(num)
    renderMeme()
}


function onSetAlign(val) {
    setAlign(val)
    console.log(gMeme.lines)
    renderMeme()
}

function onSetFillColor(color) {
    setFillColor(color)
    renderMeme()
}
function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}