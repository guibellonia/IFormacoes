const quizData = [
    {
      question:'1) Você tem afinidade com geografia, principalmente com a parte de geografia física?',
      options:['Sim, inclusive é uma das que mais gosto', 'Não tenho afinidade com geografia', 'Sim, mas tenho afinidade em outras áreas da geografia'],
      answer:'Sim, inclusive é uma das que mais gosto',
    },
    {
      question:'2) Você se considera uma pessoa curiosa/exploradora?',
      options:['Sim, gosto de sempre saber mais sobre diversos assuntos', 'Não sou uma pessoa curiosa', 'Sim, mas só com assuntos específicos'],
      answer:'Sim, gosto de sempre saber mais sobre diversos assuntos',
    },
    {
      question:'3) Você tem afinidade com ciências, principalmente na área que envolve tabela periódica e/ou misturas de substâncias?',
      options:['Sim, tenho afinidade', 'Gosto de ciências, mas não nesta área', 'Não gosto de ciências'],
      answer:'Sim, tenho afinidade',
    },
    {
      question:'4) Você gosta de pesquisar sobre minérios e/ou rochas?',
      options:['Sim, me interesso', 'Gosto de pesquisar, mas não nesta área', 'Não me interesso'],
      answer:'Sim, me interesso',
    },
    {
      question:'5) Você gosta de atividades práticas?',
      options:['Sim', 'Não', 'Depende da atividade'],
      answer:'Sim',
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
    resultContainer.innerHTML = `Seu perfil para mineração é de ${score}/${quizData.length}`;
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