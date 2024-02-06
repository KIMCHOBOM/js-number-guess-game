//랜덤 번호를 담을 변수
let computerNum = 0;

//"play-button" id를 가진 버튼 요소를 가져와서 playButton 변수에 할당
let playButton = document.getElementById("play-button");
//document=웹페이지 그자체를 나타냄     //getElementById=태그를 선택해올건데 Id로 선택해올것이다

//유저에게 입력 받을 숫자를 담는 변수 생성
let userInput = document.getElementById("user-input");

//결과를 출력할 div 요소를 가져와 resultArea 변수에 할당
let resultArea = document.getElementById("result-area");

//"reset-button" id를 가진 버튼 요소를 가져와서 resetButton 변수에 할당
let resetButton = document.getElementById("reset-button");

//게임 기회 횟수
let chances = 5;

//게임이 종료되었는지를 나타내는 변수
let gameOver = false;

//"chance-area" id를 가진 div 요소를 가져와서 chanceArea 변수에 할당
let chanceArea = document.getElementById("chance-area");

//유저가 입력한 숫자들을 기록할 배열
let history = [];


//play-button 클릭이벤트 발생 → play함수 실행
playButton.addEventListener("click", play);      //함수가 매개변수로서 들어가면 ()를 빼야함
//클릭 이벤트가 발생했을 때 play 함수를 호출하는 것이 아니라, 이벤트가 발생할 때 실행할 함수를 play 함수로 지정한다는 의미

//reset-button 클릭이벤트 발생 → reset함수 실행
resetButton.addEventListener("click", reset);

//userInput칸에 포커스를 가져오면 담겨있던 값을 비워주는 이벤트
userInput.addEventListener("focus", function(){
    userInput.value="";
});


//랜덤 번호 생성 함수
function pickRandomNum() {
    //Math.random() 함수는 0 이상 1 미만 숫자를 반환 (0 <= x < 1)
    //Math.floor() = 주어진 수 이하의 가장 큰 정수 반환 (소수점 버림)
    computerNum = Math.floor(Math.random()*100) +1;      //1~100사이의 정수를 받기 위해 X100 +1을 해준다
    console.log("정답", computerNum);
}

function play() {
    //유저가 입력한 값을 가져옴
    let userValue = userInput.value;
    
    //유저가 입력한 값의 유효성 검사
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요";

        return;     //기회를 소진하지 않고 종료 시킴
    }

    //이전에 입력한 값과 같은 값을 입력했는지 검사
    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";

        return;     //기회 소진하지 않고 종료
    }


    //play 버튼을 누를때마다 기회를 1씩 줄여줌
    chances -- ;

    //남은 기회를 출력해 준다
    chanceArea.textContent = `남은 기회 : ${chances}번`;     //""는 정적인 값에만 쓸 수 있다    //``(backtick)은 정적인 값과 동적인 값을 같이 둘 수있다

    if(userValue < computerNum) {   //유저가 입력한 값이 랜덤번호보다 작을 경우
        resultArea.textContent = "UP!";
    } else if(userValue > computerNum) {    //유저가 입력한 값이 랜덤번호보다 클 경우
        resultArea.textContent = "DOWN!";
    } else {    //유저가 입력한 값이 랜덤번호와 일치할 경우
        resultArea.textContent = "정답입니다!";
        gameOver = true;    //정답을 맞춘경우 gameOver값을 변경해 실행버튼을 비활성화 해줌
    }

    //유저가 입력한 값을 history에 저장
    history.push(userValue);
    console.log(history);

    //기회를 다쓸경우
    if(chances < 1){
        gameOver = true;
    }

    //기회를 다쓰면 실행버튼 비활성화
    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    //user input창 비우기
    userInput.value = "";
    //새로운 랜덤 번호 생성
    pickRandomNum();
    //새로운 게임을 알리는 문구 출력
    resultArea.textContent="결과값이 여기 나옵니다";

    //실행버튼 초기화
    gameOver = false;
    playButton.disabled = false;

    //게임 기회 초기화
    chances = 5;
    chanceArea.textContent = `남은 기회 : ${chances}번`;

    //유저 입력 숫자 기록 초기화
    history = [];
}


//랜덤 번호 생성 함수 호출!
pickRandomNum();