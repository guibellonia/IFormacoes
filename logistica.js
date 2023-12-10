const quizData = [
  {
    question:'1) Em um trabalho em grupo, como você age?',
    options:['Apenas obedeço', 'Lidero', 'Faço o mínimo'],
    answer:'Lidero',
  },
  {
    question:'2) Como seu quarto costuma ser?',
    options:['Organizado', 'Bagunçado', 'Meio termo'],
    answer:'Organizado',
  },
  {
    question:'3) Quando surge um problema, como você age?',
    options:['Não resolvo', 'Deixo para resolver depois', 'Resolvo no mesmo instante'],
    answer:'Resolvo no mesmo instante',
  },
  {
    question:'4) Quando você está em grupo de pessoas desconhecidas, você busca se comunicar?',
    options:['Sim', 'As vezes', 'Não'],
    answer:'Sim',
  },
  {
    question:'5) Quando é passado uma tarefa, como você executa?',
    options:['Planejo primeiro como vou fazer e depois executo','Faço sem planejamento','Faço e enquanto isso vou pensando na melhor forma de executar a tarefa',],
    answer:'Planejo primeiro como vou fazer e depois executo',
  },
];

const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const advanceButton= document.getElementById("meu-botao")
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
    optionsElement.style.textAlign='left';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'block';
    document.getElementById('retry').style.display = 'inline-block';
    resultContainer.innerHTML = `Seu perfil para logística é de ${score}/${quizData.length}`;
    document.getElementById('voltar').style.display = 'inline-block';
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';
    retryButton.style.display = 'none';
    resultContainer.innerHTML = '';

    document.getElementById('voltar').style.display='none';
    displayQuestion();
  }
  
  
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  
  
  displayQuestion();