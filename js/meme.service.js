'use strict'


let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}

function getMeme() {
    return gMeme
}

function addMemeLine(txt) {
    console.log(gMeme.lines)
    const idx = gMeme.selectedLineIdx
    if (gMeme.lines[idx]) gMeme.lines[idx].txt = txt
    else {
        gMeme.lines.push({
            txt,
            align: 'center',
            fillColor: 'white',
            strokeColor: 'black',
            size: 40,
            pos: {},
        })
    }
}

function setMemeImgId(id) {
    gMeme.selectedImgId = id
}

function addLineIndex() {
    gMeme.lines.push()
    gMeme.selectedLineIdx = gMeme.lines.length
}

function resetLines() {
    gMeme.lines = []
    gMeme.selectedLineIdx = 0
}

function changeLineIndex() {
    if (gMeme.selectedLineIdx === 0 || gMeme.selectedLineIdx === -1) { gMeme.selectedLineIdx = gMeme.lines.length - 1 }
    else { gMeme.selectedLineIdx-- }
}

function chooseLineIdx(lineIdx) {
    gMeme.selectedLineIdx === lineIdx
}

function setFont(num) {
    gMeme.lines[gMeme.selectedLineIdx].size += num
}

function setAlign(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function deleteRow() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function getLineClickedIdx(pos) {
    console.log(pos)
    const { x, y } = pos
    return gMeme.lines.findIndex(line =>
        x >= line.pos.x - line.pos.width / 2 &&
        x < line.pos.x + line.pos.width / 2 &&
        y >= line.pos.y - line.pos.height / 2 &&
        y < line.pos.y + line.pos.height / 2)
}

function chooseLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setLineDrag(isDrag) {
    if (gMeme.lines[gMeme.selectedLineIdx]) {
        gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
        console.log('drag')
    }

}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}
