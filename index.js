let round=0;
let gameMatrix;
let correct=0;
let score=0;
const gameOver=()=>{
    const root=document.getElementById('root')
    root.innerHTML=''
    const gameOverDOM = document.createElement('h1')
    const scoreDOM = document.createElement('h1')
    const playAgainDOM = document.createElement('h1')
    const homeScreenDOM = document.createElement('h1')
    root.appendChild(gameOverDOM)
    root.appendChild(scoreDOM)
    root.appendChild(playAgainDOM)
    root.appendChild(homeScreenDOM)
    console.log(score)
    gameOverDOM.innerText="Game Over"
    scoreDOM.innerHTML=`your score ${score}`
    playAgainDOM.innerText='Play Again'
    homeScreenDOM.innerText='Go Home'
    playAgainDOM.addEventListener('click',makeNormalMode)

}
const makeGrid =(num)=>{
    const tilesGrid =document.getElementById('tilesGrid');
    for(var i=0;i<num;i++){
        const rowTile = document.createElement('div')
        rowTile.id=`row ${i}`
        tilesGrid.appendChild(rowTile)
        rowTile.className="row"
        for(var j=0;j<num;j++){
            const columnTile =document.createElement('div')
            columnTile.dataset.row=i;
            columnTile.dataset.col=j;
            columnTile.className="cell"
            columnTile.id=`cell ${i} ${j}`
            rowTile.appendChild(columnTile)
        }
    }
}
function matrix(m) {
    var result = []
    for(let i = 0; i < m; i++) {
        result.push(new Array(m).fill(0))
    }
    return result
}
const listOfRandomInteger=(num,round)=>{
    console.log(num,round)
    let max=num*num
    console.log(max)
    let arr=[]
    while(arr.length < round){
        let r = Math.floor(Math.random()*max);
        console.log(r,arr)
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}
const resetColor=()=>{
    const tiles = document.querySelectorAll('.cell');
    tiles.forEach(x=>x.style.backgroundColor='beige')
}
const checkCellNormal=(e)=>{
    const row= e.target.dataset.row
    const col = e.target.dataset.col
    if (gameMatrix[row][col]==-1){
        null
    }
    else if(gameMatrix[row][col]!=0){
        gameMatrix[row][col]=-1;
        correct++
        score++
    }else{
        gameOver();
        return;
    }
    if(correct==round){
        console.log('habibi')
        correct=0;
        round++
        PlayRound(4,round)
    }
    UpdateScore()
}
const addFunctionality=()=>{
    const tiles = document.querySelectorAll('.cell');
    tiles.forEach(x=>x.addEventListener('click',checkCellNormal))
}
const ShowColorMatrixAndGameOn= async(randomNumber,num)=>{
    const cells = document.querySelectorAll('.cell')
    console.log(cells)
    cells.forEach(x=>x.removeEventListener('click',checkCellNormal))
    let timeOut=0
    for(let i=0;i<randomNumber.length+1;i++){
        let r=Math.floor(randomNumber[i]/num);
        let c=randomNumber[i]%num;
        setTimeout(()=>{
            if(i==randomNumber.length){
                resetColor();
                addFunctionality();
            }else{
                resetColor()
                document.getElementById(`cell ${r} ${c}`).style.backgroundColor="black"
            }
        },timeOut+=500)

    }
}
const PlayRound=async(num,round)=>{
    gameMatrix= matrix(num);
    const cells = document.querySelectorAll('.cell')
    let randomNumber=listOfRandomInteger(num,round)
    console.log(randomNumber)
    for(let i=0;i<randomNumber.length;i++){
        let r=Math.floor(randomNumber[i]/num);
        let c=randomNumber[i]%num;
        //for hackermode make sure you index instead of one
        gameMatrix[r][c]=1;
    }
    ShowColorMatrixAndGameOn(randomNumber,num,gameMatrix)
}
const playGame=(num)=>{
    round=1
    PlayRound(num,round);
}
const addRoundAndScore=()=>{
    const home=document.getElementById('roundAndScoreDiv')
    const round= document.createElement('p')
    const score= document.createElement('p')
    home.appendChild(round)
    home.appendChild(score)
    round.id='roundContent'
    score.id='scoreContent'
}
const UpdateScore=()=>{
    document.getElementById('roundContent').innerText=`round: ${round}`
    document.getElementById('scoreContent').innerText=`score: ${score}`

}
const makeNormalMode=()=>{
    round=0
    correct=0
    score=0
    const root=document.getElementById('root')
    root.innerHTML=''
    const roundAnddScoreDiv=document.createElement('div')
    const gameDiv = document.createElement('div')
    root.appendChild(roundAnddScoreDiv)
    root.appendChild(gameDiv)
    gameDiv.id="tilesGrid"
    roundAnddScoreDiv.id="roundAndScoreDiv"
    addRoundAndScore()
    UpdateScore()
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
const homeMenuLayout=()=>{
    const gameNameDiv = document.createElement('div')
    const modesDiv = document.createElement('div')
    const PianoTileGame= document.createElement('h1')
    const GameModes= document.createElement('h2')
    const NormalMode= document.createElement('p')
    const HackerMode= document.createElement('p')
    const HackerppMode= document.createElement('p')
    const buttonListDiv = document.createElement('div')
    const rootDiv = document.getElementById('root')
    rootDiv.innerHTML=''
    rootDiv.appendChild(gameNameDiv)
    rootDiv.appendChild(modesDiv)
    modesDiv.appendChild(GameModes)
    modesDiv.appendChild(buttonListDiv)
    buttonListDiv.appendChild(NormalMode)
    buttonListDiv.appendChild(HackerMode)
    buttonListDiv.appendChild(HackerppMode)
    gameNameDiv.appendChild(PianoTileGame)
}
function main(){
    setHomePage()
}
main()