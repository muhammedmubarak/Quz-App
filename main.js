// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

//Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;
// let currentIndex
function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      //Create Bullets + Set Questions Count
      createBullets(qCount);

      //Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);
      //Start count Dwon
      countdown(5,qCount);

      //Click On Submit
      submitButton.onclick = () => {
        //Get rghit answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        //IncreaseAnswer
        currentIndex++;
        //check The Answer
        checkAnswer(theRightAnswer, qCount);

        //Remove previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        //Add Question Data

        addQuestionData(questionsObject[currentIndex], qCount);
        // Handle Bullets Class
        handelBullets();

        // Start CountDown
     
        // clearInterval(countdownInterval);
        clearInterval(countdownInterval)
        countdown(3, qCount);

        // Show Results
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "html_quastions.json", true);
  myRequest.send();
}
getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  //Create Spans
  for (let i = 0; i < num; i++) {
    //Create Bullet
    let theBullet = document.createElement("span");
    //Check if the first Span
    if (i === 0) {
      theBullet.className = "on";
    }

    //append Bullets TO MAin Bullits COntainer
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    if (currentIndex < count) {
      // H2 Questions Title
      let questionTitle = document.createElement("h2");

      //Create Question Text
      let questionText = document.createTextNode(obj["title"]);

      //Append Text To H2
      questionTitle.appendChild(questionText);
      // Append the to the Quiz Area
      quizArea.appendChild(questionText);

      //Create The Answers
      for (let i = 1; i <= 4; i++) {
        // Create Main Answer Div
        let mainDiv = document.createElement("div");

        //Add Class To Main Div
        mainDiv.className = "answer";

        //Create radio Input
        let radioInput = document.createElement("input");
        //Add Type + Name + Id + Data-Attribute
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];

        //Make First Option Selected
        if (i === 3) {
          radioInput.checked = true;
        }

        //Create Lable
        let theLable = document.createElement("label");

        //Add For Attribute
        theLable.htmlFor = `answer_${i}`;

        // Create Lable Text

        let theLabelText = document.createTextNode(obj[`answer_${i}`]);
        // Add The Text To Label
        theLable.appendChild(theLabelText);

        // Add Input + Label To Main Div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLable);

        //Append All Divs To Answers Area
        answersArea.appendChild(mainDiv);
      }
    }
  }
}
function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // H2 Questions Title
    let questionTitle = document.createElement("h2");

    //Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    //Append Text To H2
    questionTitle.appendChild(questionText);
    // Append the to the Quiz Area
    quizArea.appendChild(questionText);

    //Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      //Add Class To Main Div
      mainDiv.className = "answer";

      //Create radio Input
      let radioInput = document.createElement("input");
      //Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      //Make First Option Selected
      if (i === 0) {
        radioInput.checked = true;
      }

      //Create Lable
      let theLable = document.createElement("label");

      //Add For Attribute
      theLable.htmlFor = `answer_${i}`;

      // Create Lable Text

      let theLabelText = document.createTextNode(obj[`answer_${i}`]);
      // Add The Text To Label
      theLable.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLable);

      //Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}
function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
    console.log("Good Answer");
  }
}
function handelBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arryOfSpans = Array.from(bulletsSpans);
  arryOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}
function showResults(count) {
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();
    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good"Good</span> , ${rightAnswers} Form
      ${count} IS Good`;
    } else if (rightAnswers == count) {
      theResults = `<span class="perfect">Perfect</span> ,All Answers is Good`;
    } else {
      theResults = `<span class="bad"Sory your good but try agein</span> ,  ${rightAnswers} Form
      ${count} `;
    }
    resultsContainer.innerHTML= theResults;
    resultsContainer.style.padding = '10px';
    resultsContainer.style.backgroundColor= 'withe';
    resultsContainer.style.marginTop ='10px'

  }
}
function countdown(duration, count){
  if(currentIndex < count){
    let minutes ,seconds;
    countdownInterval = setInterval(function(){
           minutes =parseInt(duration/ 60);
        seconds =parseInt(duration % 60);
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if(--duration < 0 ){
clearInterval(countdownInterval)
console.log("Finished");
      }


    },1000);

  }
}
