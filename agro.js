const quizData = [
  {
    question:'1) Você gosta de atividades práticas?',
    options:['Sim', 'Não', 'Depende da atividade'],
    answer:'Sim',
  },
  {
    question:'2) Você tem afinidade com ciências, principalmente com a parte voltada para plantas e solo?',
    options:['Sim, é uma das partes que mais tenho afinidade', 'Não tenho afinidade com ciências', 'Sim, mas tenho mais afinidade em outras áreas da ciências'],
    answer:'Sim, é uma das partes que mais tenho afinidade',
  },
    {
      question:'3)Quando você tem um tempo livre, como prefere aproveitá-lo?',
      options:['Jogando', 'Passeando ao ar livre, tendo contato com a natureza', 'Acessando as mídias sociais, como instagram e tik tok'],
      answer:'Passeando ao ar livre, tendo contato com a natureza',
    },
    { 
      question:'4) Você se preocupa com o impacto da falta de cuidado do meio ambiente?',
      options:['Me preocupo', 'Não me preocupo', 'Preocupo só quando é mostrado as consequências'],
      answer:'Me preocupo',
    },
    {
      question:'5) Você considera importante ter técnicas sustentáveis no campo?',
      options:['Considero importante', 'Não considero importante', 'Considero importante em outras áreas',],
      answer:'Considero importante',
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
    resultContainer.innerHTML = `Seu perfil para agroecologia é de ${score}/${quizData.length}`;
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