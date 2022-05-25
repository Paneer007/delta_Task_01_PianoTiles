const makeGrid =(num)=>{
    console.log('fshjsdh')

    const tilesGrid =document.getElementById('tilesGrid');
    for(var i=0;i<num;i++){
        const rowTile = document.createElement('div')
        rowTile.id=`row ${i}`
        tilesGrid.appendChild(rowTile)
        rowTile.className="row"
        for(var j=0;j<num;j++){
            const columnTile =document.createElement('div')
            columnTile.dataset.row=i;
            columnTile.dataset.columnTile=j;
            columnTile.className="cell"
            rowTile.appendChild(columnTile)
        }
    }
}
function matrix(m) {
    var result = []
    for(let i = 0; i < m; i++) {
    console.log('fshjsdh')

        result.push(new Array(m).fill(0))
    }
    return result
}
const listOfRandomInteger=(num,round)=>{
    console.log(num,round)
    return
    let max=round*round
    let arr=[]
    while(arr.length < num){
        console.log('fshjsdh')
        var r = Math.floor(Math.random() * max);
        console.log(r,arr)
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}
const PlayRound=(num,round)=>{
    console.log('fshjsdh')

    let gameMatrix= matrix(num);
    const cells = document.querySelectorAll('.cell')
    let randomNumber=listOfRandomInteger(num,round)
    console.log(randomNumber)
    cells.forEach(x=>x.addEventListener('click',()=>console.log('scoppp')))
}
const playGame=(num)=>{
    console.log('fshjsdh')

    let round=1
    PlayRound(num,round);
}
const makeNormalMode=()=>{
    console.log('fshjsdh')
    const root=document.getElementById('root')
    root.innerHTML=''
    const gameDiv = document.createElement('div')
    root.appendChild(gameDiv)
    gameDiv.id="tilesGrid"
    let score=0
    makeGrid(4)
    playGame(4)


}
const setHomePage=()=>{
    const button = document.getElementById('normalModeButton');
    console.log(button)
    button.addEventListener('click',()=>{
        makeNormalMode()
    })
}

function main(){
    setHomePage()
}
main()