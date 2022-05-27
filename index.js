let round=1;
let gameMatrix;
let correct=0;
let score=0;
let arr=[]
let mode=null
let timeSec=0;
let timer=0; 
let grandTime=0;
let sixTrueOr4false=true;
let flagTime=false;
let pauseTime=true
//gives a bonus score of (3*round) - (timer) at the end of the round
localStorage.setItem('LeaderBoard',JSON.stringify([]));
//0-regular
//1-Hacker
const updateTimer =()=>{
    timer++;
    const timerElement=document.getElementById('timerElement')
    if(timerElement){
        if(pauseTime){
            timerElement.textContent=`Time: 0 Seconds`
        }else{
            timerElement.textContent=`Time: ${timer} Seconds`
        }
    }
};
const replay=()=>{
    if(mode==0){
        makeNormalMode()
    }else{
        if(sixTrueOr4false){
            makeHackerMode6()
        }else{
            makeHackerMode4()
        }
    }
}
const LeaderBoard=(score)=>{
    const root = document.getElementById('root')
    const LeaderP=document.createElement('p')
    const ldrBrd=document.createElement('div')
    root.appendChild(LeaderP)
    root.appendChild(ldrBrd)
    LeaderP.className='leaderboard'
    ldrBrd.className='leaderBoardDiv'
    LeaderP.textContent='Leader Board'
    let newscore = score.sort(function(a,b){return a - b})
    newscore=newscore.reverse()
    for(let i=0;i<Math.min(score.length,5);i++){
        const scoreP=document.createElement('p')
        ldrBrd.appendChild(scoreP)
        scoreP.textContent=`${i+1}: ${newscore[i]} points`
        scoreP.className='RankingScore'
    }
}
const gameOver=()=>{
    grandTime=0;
    if(mode==1){
        const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-12.mp3')
        audio.play()
    }
    const root=document.getElementById('root')
    root.innerHTML=''
    const gameOverDOM = document.createElement('h1')
    const scoreDOM = document.createElement('h1')
    const playAgainDOM = document.createElement('h3')
    const homeScreenDOM = document.createElement('h3')
    root.appendChild(gameOverDOM)
    root.appendChild(scoreDOM)
    if(mode==1){
        const list = JSON.parse(localStorage.getItem('LeaderBoard'))
        list.push(score);
        localStorage.setItem('LeaderBoard',JSON.stringify(list))
        LeaderBoard(list)
    }
    root.appendChild(playAgainDOM)
    root.appendChild(homeScreenDOM)
    gameOverDOM.className="GameOverText"
    scoreDOM.className="scoreText"
    playAgainDOM.className="EndMenu"
    homeScreenDOM.className='EndMenu'
    gameOverDOM.innerText="Game Over"
    scoreDOM.innerHTML=`Score: ${score}`
    playAgainDOM.innerText='Play Again'
    homeScreenDOM.innerText='Return Home'
    playAgainDOM.addEventListener('click',replay)
    homeScreenDOM.addEventListener('click',setHomePage)
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
    let max=num*num
    while(arr.length < round){
        let r = Math.floor(Math.random()*max);
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
        if(mode){
            score +=(3*round-timer>=0)?(3*round-timer):0
            grandTime+=timer;
        }
        correct=0;
        round++
        if(mode){
            if(sixTrueOr4false){
                if(round>36){
                    gameOver();
                    return
                }else{
                    if(round>16){
                        gameOver();
                        return;
                    }
                }
            }else{
                if(round>16){
                    gameOver();
                    return;
                }
            }
        }
        if(mode==1){
            if(sixTrueOr4false){
                PlayRound(6,round)    
            }else{
                PlayRound(4,round)
                
            }
        }else{
            PlayRound(4,round)
        }
    }
    UpdateScore()   
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
    timer=0;
    const cells = document.querySelectorAll('.cell')
    cells.forEach(x=>x.removeEventListener('click',checkCellNormal))
    let timeOut=0
    pauseTime=true;
    for(let i=0;i<randomNumber.length+1;i++){
        let r=Math.floor(randomNumber[i]/num);
        let c=randomNumber[i]%num;
        setTimeout(()=>{
            if(i==randomNumber.length){
                pauseTime=false
                resetColor();
                addFunctionality();
            }else{
                resetColor()
                timer=-1;
                document.getElementById(`cell ${r} ${c}`).style.backgroundColor="black"
            }
        },timeOut+=500)
    }
}
const PlayRound=async(num,round)=>{
    gameMatrix= matrix(num);
    const cells = document.querySelectorAll('.cell')
    let randomNumber=listOfRandomInteger(num,round)
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
const addRound=()=>{
    const home=document.getElementById('roundDiv')
    const round= document.createElement('p')
    home.appendChild(round)
    round.id='roundContent'
    round.className='Round'
}
const addRoundAndScoreAndTimer=()=>{
    const home=document.getElementById('roundAndScoreDiv')
    const round= document.createElement('p')
    const score= document.createElement('p')
    home.appendChild(round)
    home.appendChild(score)
    round.id='roundContent'
    round.className="Round"
    score.id='scoreContent'
    score.className="Score"
    if(mode==1){
        const timerElement=document.createElement('p')
        home.appendChild(timerElement)
        timerElement.textContent=`Time: ${timer} Seconds`
        timerElement.id='timerElement'
        timerElement.className="Timer"
    }
}
const UpdateScore=()=>{
    document.getElementById('roundContent').innerText=`Round: ${round}`
    if(mode){
        document.getElementById('scoreContent').innerText=`Score: ${score}`        
    }
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
        roundAnddScoreAndTimerDiv.className="RandSDiv"
        roundAnddScoreAndTimerDiv.id="roundAndScoreDiv"
        root.appendChild(roundAnddScoreAndTimerDiv)
        addRoundAndScoreAndTimer()
        UpdateScore()
    }else{
        const roundDiv=document.createElement('div')
        roundDiv.id ='roundDiv'
        roundDiv.className='roundDiv'
        root.appendChild(roundDiv)
        addRound()
        UpdateScore()
    }
    const gameDiv = document.createElement('div')
    root.appendChild(gameDiv)
    gameDiv.id="tilesGrid"
    gameDiv.className="tilesGrid"
}
const makeNormalMode=()=>{
    resetScores()
    mode=0
    buildGameUI()
    makeGrid(4)
    playGame(4)
}
const makeHackerMode6=()=>{
    sixTrueOr4false=true
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
const makeHackerMode4=()=>{
    sixTrueOr4false=false
    if(!flagTime){
        setInterval(updateTimer,1000)
        flagTime= true;
    }
    resetScores()
    mode=1
    buildGameUI()
    makeGrid(4)
    playGame(4)
}
const setHomePage=()=>{
    homeMenuLayout()
    const buttonNormal = document.getElementById('normalModeButton');
    const buttonHacker4 = document.getElementById('hackerModeButton4')
    const buttonHacker6 = document.getElementById('hackerModeButton6')
    buttonNormal.addEventListener('click',makeNormalMode)
    buttonHacker4.addEventListener('click',makeHackerMode4)
    buttonHacker6.addEventListener('click',makeHackerMode6)
}
const homeMenuLayout=()=>{
    const gameNameDiv = document.createElement('div')
    const titleDiv = document.createElement('div')
    const PianoTileGame= document.createElement('h1')
    const NormalMode= document.createElement('p')
    const HackerMode4= document.createElement('p')
    const HackerMode6= document.createElement('p')
    const buttonListDiv = document.createElement('div')
    const rules= document.createElement('div')
    const rulesHeader=document.createElement('h2')
    const rulesPara=document.createElement('p')
    const rootDiv = document.getElementById('root')
    gameNameDiv.className="theMainTitleDiv"
    rootDiv.innerHTML=''
    rootDiv.appendChild(gameNameDiv)
    rootDiv.appendChild(buttonListDiv)
    rootDiv.appendChild(rules)

    rules.appendChild(rulesHeader)
    rules.appendChild(rulesPara)
    buttonListDiv.appendChild(NormalMode)
    buttonListDiv.appendChild(HackerMode4)
    buttonListDiv.appendChild(HackerMode6)
    gameNameDiv.appendChild(PianoTileGame)
    buttonListDiv.className='OptionButtonList'
    PianoTileGame.innerText="PianoTileGame"
    PianoTileGame.className="MainTitle"
    NormalMode.className="OptionButton"
    HackerMode4.className="OptionButton"
    HackerMode6.className="OptionButton"
    NormalMode.id="normalModeButton"
    NormalMode.innerText="Normal Mode"
    HackerMode4.id="hackerModeButton4"
    HackerMode6.id="hackerModeButton6"
    HackerMode4.innerText="Hacker Mode-4"
    HackerMode6.innerText="Hacker Mode-6"
    rulesHeader.textContent="Rules:"
    rulesHeader.className='rulesHeader'
    rulesPara.className='rulesPara'
    rules.className='rulesDiv'
    rulesPara.innerHTML=`The game consists of pressing the tiles present in a n x n grid. The tiles light up each round and you have the press them. There are n square number of rounds and the game ends when you complete all the rounds or when you press the wrong tile. 
    Additionally in hackermode , the sequence in which you press the tile is also important and failing to do so will be considered as a wrong tile pressed.
    <br> In Normal mode, it comprises of a 4x4 grid. Hacker mode consists of two game modes: Hacker-4 and Hacker-6 where it is 4x4 and 6x6 grid game respectively.
    Each correct tile pressed has a score of 10 points.
    In hackermode there is a time based reward system. If you managed to enter all the tiles within 3 x round seconds,
    you will be awarded a bonus score of 3 times the time spared.
    In normal mode the final score shall be displayed at the end but in hacker mode the score shall be showed cumulatively each round.
    Futhermore in hackermode, there is also a leaderboard where top 5 scores shall be displayed.
    `
}
function main(){
    setHomePage()
}
main()