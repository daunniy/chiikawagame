

const countDownDisplay = document.createElement('div');
countDownDisplay.classList.add('countdown');
countDownDisplay.style.position = 'fixed';
document.body.appendChild( countDownDisplay );


  let score = 0;
  const endScore = document.querySelector('.result-screen .score');
  const scoreElement = document.querySelector('.score span');
  let lives = 3;
  let playTime = 25;


  const playArea = document.querySelector('#play');
  const timeElement = document.querySelector('.time span');
  const lifeElement = document.querySelector('.life');
  const resultArea = document.querySelector('.result-screen');


  const initLives = 3;
  const areas = document.querySelectorAll('.play_area>div');
  const maxNum = areas.length;
  const imgs = ['anoko.png','kimera.png','pungdang.png','star.png','mushroom.png','chiikawa.png','hachiware.png'];
  

  /* -------------------- START -------------------- */
  function startCountDown() {
  let countDown = 3;
  const initCountDown = () => {
    countDownDisplay.innerHTML = countDown;
    countDown--;
    if (countDown < 0) {
      countDownDisplay.innerHTML = 'START';
    }
    if (countDown < -1) {
      clearInterval(countDownInterval);
      startGame();
    }
  }
  initCountDown();
  const countDownInterval = setInterval(initCountDown, 1000);
}

function startGame() {
  countDownDisplay.remove();
  timeElement.textContent = playTime;
  const countDownTimer = () => {
    playTime--;
    timeElement.textContent = playTime;
    if (playTime === 0) {
      clearInterval(timer);
      playArea.style.display = 'none';
      resultArea.style.display = 'block';
      endScore.innerHTML = score * 10;
      document.body.style.cursor = 'default';
      trident.style.display = 'none';
    }
  }
  timer = setInterval(countDownTimer, 1000);
}


  function initGame(){
    score = 0;
    lives = initLives;
    playTime = 26 ;
    updateScore();
    updateLive();
    updateTime();
    gameStart();
  }





  function clickControl(e){
    const imgNum = parseInt( e.target.dataset.number );
    if( imgNum >=4 ){
      lives--;
      updateLive();
    }else{
      score++;
      updateScore();
    }
  }

  function updateScore(){
    scoreElement.textContent = score;
  }
  function updateLive(){
    lifeElement.innerHTML = ''; // 기존 콘텐츠를 비움
    for (let i = 0; i < lives; i++) {
      const img = document.createElement('img');
      img.src = 'img/life.png'; // 라이프를 표시할 하트 이미지의 경로를 설정
      img.alt = 'lifeIcon';

      lifeElement.appendChild(img);
    }
  }
  function updateTime(){
    playTime--;
    timeElement.textContent = playTime;
  }


  // 추가 시간
  let timer;
  let imageInterval = 3000; // 기본 이미지 등장 주기 (3초)
  let scoreThreshold = 10; // 점수 기준점
  let scoreCheckPoint = 10; // 기준점에서 20점 이상 올라가는지 확인하는 변수
  
  // 점수 조건을 만족했을 때의 설정 함수
  function checkScore() {
    if (score >= scoreThreshold) {
      playTime += 10; // 플레이 시간 10초 추가
      imageInterval = 2000; // 이미지 등장 주기를 2초로 변경
      scoreCheckPoint = score; // 새로운 기준점 설정
      scoreThreshold += 20; // 다음 기준을 20점 높임
      clearInterval(timer); // 기존 타이머 정지
      gameStart(); // 새로운 타이머로 게임 재시작
    } else if (score < scoreCheckPoint + 20 && playTime <= 0) {
      // 20점 이상 올라가지 않았고, 플레이 시간이 끝났을 때 게임 종료
      clearInterval(timer);
      console.log('Time Over');
      playArea.style.display = 'none';
      updateResultScreen();
      endScore.innerHTML = score * 10;
      document.body.style.cursor = 'default';
      trident.style.display = 'none';
    }
  }

  function randomImageInsert(){
    let tempArea = [...areas]
    let tempImgs = [...imgs];
    for(let i=0; i<4; i++){
      let randomIndex = Math.floor(Math.random()*tempArea.length);
      const imgSrc = tempArea.splice(randomIndex, 1)[0];
      const imgIndex = Math.floor(Math.random()*tempImgs.length);
      const img = document.createElement('img');
      img.src = `img/${tempImgs.splice(imgIndex, 1)[0]}`;
      img.dataset.number = imgIndex;
      img.addEventListener('click', clickControl, { once:true });
      areas[randomIndex].appendChild(img);
      setTimeout(()=>{
        if( areas[randomIndex].contains(img)){
          areas[randomIndex].removeChild(img);
        }
      }, imageInterval );
    }
  }
  
  let gameEnded = false;

  function updateResultScreen() {
    if (gameEnded) return; // 이미 결과 화면이 표시되었으면 함수 종료
    gameEnded = true; // 결과 화면이 표시되었음을 기록
  
    // 모든 결과 화면을 숨김
    document.getElementById('lowScoreScreen').style.display = 'none';
    document.getElementById('midScoreScreen').style.display = 'none';
    document.getElementById('highScoreScreen').style.display = 'none';
    document.getElementById('resultViewScreen').style.display = 'none';
  
  // "결과보기" 창 표시
  document.getElementById('resultViewScreen').style.display = 'block';

  // 2초 후에 점수에 따른 결과 화면 표시
  setTimeout(() => {
    document.getElementById('resultViewScreen').style.display = 'none';
    // 점수에 따라 적절한 화면을 표시하고 점수를 업데이트
    if (score < 40) {
      document.getElementById('lowScoreScreen').style.display = 'block';
      document.querySelector('#lowScoreScreen .score').innerHTML = score * 10;
    } else if (score < 90) {
      document.getElementById('midScoreScreen').style.display = 'block';
      document.querySelector('#midScoreScreen .score').innerHTML = score * 10;
    } else {
      document.getElementById('highScoreScreen').style.display = 'block';
      document.querySelector('#highScoreScreen .score').innerHTML = score * 10;
    }
  }, 700);
}
  


function gameStart() {
  timer = setInterval(() => {
    randomImageInsert();
    updateTime();
    checkScore();
    if (playTime <= 0 || lives <= 0) {
      clearInterval(timer);
      console.log('게임 종료');
      playArea.style.display = 'none';
      updateResultScreen(); // 게임 종료 시 화면 업데이트
    }
  }, imageInterval);
}
  

  startCountDown();
  initGame();


document.body.style.cursor = 'none';
document.addEventListener('mousemove', (e) => {
trident.style.left = e.clientX + 'px';
trident.style.top = e.clientY + 'px';
});
document.addEventListener('mousedown', () => {
trident.style.marginLeft = '-70px';
setTimeout(() => { trident.style.margin = '0px'; }, 300);
});


/* ------ cursor style ------ */
const trident = document.querySelector('.trident');

document.body.style.cursor = 'none';
document.addEventListener('mousemove', (e)=>{
    trident.style.left = e.clientX+'px';
    trident.style.top = e.clientY+'px';
  });
  document.addEventListener('mousedown', ()=>{
    trident.style.marginLeft = '-70px';
    setTimeout(()=>{  trident.style.margin = '0px'; },300)
  });



