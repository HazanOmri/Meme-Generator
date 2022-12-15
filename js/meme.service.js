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
            align: 'left',
            fillColor: 'red',
            strokeColor: 'red',
            size: 40
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
    if (gMeme.selectedLineIdx === 0) gMeme.selectedLineIdx = gMeme.lines.length - 1
    else gMeme.selectedLineIdx--
}

function setFont(num){
    gMeme.lines[gMeme.selectedLineIdx].size += num 
}


function setAlign(val){
    gMeme.lines[gMeme.selectedLineIdx].align = val
}

function setFillColor(color){
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}
function setStrokeColor(color){
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}