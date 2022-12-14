'use strict'

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}

function getMeme() {
    return gMeme
}

function addMemeLine(txt, lineIdx) {
    console.log(gMeme.lines)
    if (gMeme.lines[lineIdx]) gMeme.lines[lineIdx].txt = txt
    else {
        gMeme.lines.push({
            txt,
            align: 'center',
            color: 'red'
        })
    }
}

function setMemeImgId(id) {
    gMeme.selectedImgId = id
}

function changeLineIndex(){
    gMeme.selectedLineIdx++
}