const fs=require('fs')
const readline=require('readline')
const rl=readline.createInterface({
    input: fs.createReadStream('data')
})
const writeStream=fs.createWriteStream('output.txt')
writeStream.on('close',()=>{
    console.log('done:)')
})
const MINE='X'
const EMPTY_SPACE='O'
let arrayData=[]
let row=0
rl.on('line',(line)=>{
    const data=line.split('')
    arrayData[row] = data.filter(input=>{ return !!input.trim() })
    row++
})
const calculateMineNumberAround=(arrayData, _row, _col)=>{
    let number=0
    for(let row=_row-1;row<=_row+1;row++){
        for(let col=_col-1;col<=_col+1;col++){
            if(col<0 || row <0 || col > arrayData.length-1 || row > arrayData[0].length-1) continue
            if(arrayData[row][col]==MINE) number++
        }
    }
    return number
}
rl.on('close', ()=>{
    let outputArray=[]
    let arrayRowLength=arrayData.length
    let arrayColLength=arrayData[0].length
    for(let row=0;row<arrayRowLength;row++){
        let rowData=arrayData[row]
        outputArray[row]=[]
        for(let col=0;col<arrayColLength;col++){
            let changedValue=rowData[col]
            if(changedValue==EMPTY_SPACE){
                changedValue=calculateMineNumberAround(arrayData, row, col)
            } 
            outputArray[row].push(changedValue)
        }
    } 
    outputArray.map((data)=>{
        writeStream.write(data.join(' ')+"\n")
    })
    writeStream.end()
})