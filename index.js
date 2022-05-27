let round=1;
let gameMatrix;
let correct=0;
let score=0;
let arr=[]
let mode=null
let timeSec=0;
let timer=0; 
let grandTime=0;
let flagTime=false;//gives a bonus score of (3*round) - (timer) at the end of the round
localStorage.setItem('LeaderBoard',JSON.stringify([]));
//0-regular
//1-Hacker
const updateTimer =()=>timer++;
const replay=()=>{
    if(mode==0){
        makeNormalMode()
    }else{
        makeHackerMode()
    }
}
const LeaderBoard=(score)=>{
    const root = document.getElementById('root')
    const LeaderP=document.createElement('p')
    const ldrBrd=document.createElement('div')
    root.appendChild(LeaderP)
    root.appendChild(ldrBrd)
    LeaderP.textContent='Leader Board'
    console.log(score)
    let newscore = score.sort(function(a,b){return a - b})
    newscore=newscore.reverse()
    for(let i=0;i<Math.min(score.length,5);i++){
        console.log(newscore[i])
        const scoreP=document.createElement('p')
        ldrBrd.appendChild(scoreP)
        scoreP.textContent=`${i+1}-${newscore[i]}`
    }
}
const gameOver=()=>{
    console.log(grandTime)
    grandTime=0;
    if(mode==1){
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-12.mp3')
        audio.play()
    }
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
    gameOverDOM.innerText="Game Over"
    scoreDOM.innerHTML=`your score ${score}`
    playAgainDOM.innerText='Play Again'
    homeScreenDOM.innerText='Go Home'
    playAgainDOM.addEventListener('click',replay)
    homeScreenDOM.addEventListener('click',setHomePage)
    if(mode==1){
        const list = JSON.parse(localStorage.getItem('LeaderBoard'))
        console.log(list)
        list.push(score);
        localStorage.setItem('LeaderBoard',JSON.stringify(list))
        LeaderBoard(list)
    }
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
    else if(gameMatrix[row][col]!=-1){
        if(mode==1){
            if(gameMatrix[row][col]==correct+1){
                gameMatrix[row][col]=-1;
                correct++
                score+=10
            }else{
                grandTime+=timer;
                gameOver();
                return;
            }
        }else{
            if (gameMatrix[row][col]!=0){
            gameMatrix[row][col]=-1;
            correct++
            score+=10
            }else{
                grandTime+=timer;
                gameOver();
                return;
            }
        }
    }    
    if(correct==round){
        score +=(3*round-timer>=0)?(3*round-timer):0
        grandTime+=timer;
        console.log('habibi')
        correct=0;
        round++
        if(mode==1){
            PlayRound(6,round)    
        }else{
            PlayRound(4,round)
        }
    }
    if(mode==1){
        UpdateScore()
    }
}
const addSound=()=>{
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-09a.mp3')
    audio.play()
}
const addFunctionality=()=>{
    timer=0
    const tiles = document.querySelectorAll('.cell');
    tiles.forEach(x=>x.addEventListener('click',checkCellNormal))
    if(mode==1){
        tiles.forEach(x=>x.addEventListener('click',addSound))
    }
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
        gameMatrix[r][c]=1;
        if(mode==1){
            gameMatrix[r][c]=i+1;
        }
    }
    ShowColorMatrixAndGameOn(randomNumber,num,gameMatrix)
}
const playGame=(num)=>{
    round=1
    PlayRound(num,round);
}
const addRoundAndScoreAndTimer=()=>{
    const home=document.getElementById('roundAndScoreDiv')
    const round= document.createElement('p')
    const score= document.createElement('p')
    if(mode==1){
        const timer=document.createElement('p')
    }
    home.appendChild(round)
    home.appendChild(score)
    round.id='roundContent'
    score.id='scoreContent'
}
const UpdateScore=()=>{
    document.getElementById('roundContent').innerText=`round: ${round}`
    document.getElementById('scoreContent').innerText=`score: ${score}`
}
const resetScores=()=>{
    arr=[]
    round=1
    correct=0
    score=0
    mode=null
    timer=0
    grandTime=0;
}
const buildGameUI=()=>{
    const root=document.getElementById('root')
    root.innerHTML=''
    if(mode) {
        const roundAnddScoreAndTimerDiv=document.createElement('div')
        roundAnddScoreAndTimerDiv.id="roundAndScoreDiv"
        root.appendChild(roundAnddScoreAndTimerDiv)
        addRoundAndScoreAndTimer()
        UpdateScore()
    }
    const gameDiv = document.createElement('div')
    root.appendChild(gameDiv)
    gameDiv.id="tilesGrid"
}
const normalModeRuleAndStartGame=()=>{
    const root = document.getElementById('root')
    root.innerHTML=''
    const normalH2= document.createElement('h1')
    const rulesDiv=document.createElement('div')
    const ruleTitle=  document.createElement('h2')
    const rulesUL=document.createElement('ul')
    const startGameButton=document.createElement('button')
    root.appendChild(normalH2)
    root.appendChild(rulesDiv)
    root.appendChild(startGameButton)
    rulesDiv.appendChild(ruleTitle)
    rulesDiv.append
}
const makeNormalMode=()=>{
    resetScores()
    mode=0
    buildGameUI()
    makeGrid(4)
    playGame(4)
}
const makeHackerMode=()=>{
    if(!flagTime){
        setInterval(updateTimer,1000)
        flagTime= true;
    }
    resetScores()
    mode=1
    buildGameUI()
    makeGrid(6)
    playGame(6)
}
const setHomePage=()=>{
    homeMenuLayout()
    const buttonNormal = document.getElementById('normalModeButton');
    const buttonHacker = document.getElementById('hackerModeButton')
    buttonNormal.addEventListener('click',makeNormalMode)
    buttonHacker.addEventListener('click',makeHackerMode)
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
    PianoTileGame.innerText="PianoTileGame"
    GameModes.innerText="Modes"
    NormalMode.id="normalModeButton"
    NormalMode.innerText="Normal Mode"
    HackerMode.id="hackerModeButton"
    HackerMode.innerText="Hacker Mode"
}
function main(){
    setHomePage()
}
main()