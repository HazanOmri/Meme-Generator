'use strict'

let gElCanvas
let gCtx
let gCountLines = 0

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function showCanvas(elImg) {
    document.querySelector('.canvas-container').classList.remove('hide')
    document.querySelector('.tools').classList.remove('hide')
    document.querySelector('.tools').classList.add('tools-show')
    document.querySelector('.main-content').classList.add('flex-grow')
    document.querySelector('.main-content').classList.add('flex-grow')
    document.querySelector('.header-nav a').classList.remove('active')
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.strokeStyle = `black`
    gCtx.strokeRect(gElCanvas.width / 2 - 50, gElCanvas.height - 50, 100, 30)
    gCtx.strokeRect(gElCanvas.width / 2 - 50, gElCanvas.height - 430, 100, 30)
    addListeners()
}

function onMoveToGallery() {
    document.querySelector('.canvas-container').classList.add('hide')
    document.querySelector('.tools').classList.add('hide')
    document.querySelector('.tools').classList.remove('tools-show')
    document.querySelector('.main-content').classList.remove('flex-grow')
    onShowGallery()
}

function renderTextLine(line, lineIdx) {
    const { x, y } = getCord(line, lineIdx)
    const memeSelectedLineIdx = getMeme().selectedLineIdx
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = `${line.align}`
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.txt, x, y)
    gCtx.strokeText(line.txt, x, y)
    if (memeSelectedLineIdx === lineIdx) drewTxtBox(line, x, y)
}

function renderLines() {
    const meme = getMeme()
    meme.lines.forEach((line, idx) => renderTextLine(line, idx))
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

function onSetFontSize(num) {
    setFontSize(num)
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

function onDeleteRow() {
    deleteRow()
    document.querySelector('.edit').value = ''
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    const lineIdx = getLineClickedIdx(pos)
    chooseLineByIdx(lineIdx)
    setLineDrag(true)
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onMove(ev) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (line == undefined) return
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - line.pos.x
        const dy = pos.y - line.pos.y
        moveLine(dx, dy)
        console.log(line.pos)
        renderMeme()
    }
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
    renderMeme()
}

function getEvPos(ev) {
    // Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onSetFont(font) {
    setFont(font)
    renderMeme()
}

function drewTxtBox(line, x, y) {
    const txtLength = line.txt.split('').length * line.size + 10
    gCtx.strokeStyle = `black`
    gCtx.strokeRect(x - txtLength / 2, y - (line.size / 2), txtLength, line.size)
    setLinePos(line, x, y, txtLength, line.size)
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}