const quizData = [
    {
      question:'1) Você tem afinidade com matemática? ',
      options:['Sim, é uma das partes que mais tenho afinidade', 'Não tenho afinidade com matemática', 'Meio termo, depende da matéria'],
      answer:'Sim, é uma das partes que mais tenho afinidade',
    },
    {
      question:'2) Você gosta de atividades práticas?',
      options:['Sim', 'Não', 'Depende da atividade'],
      answer:'Sim',
    },
    {
      question:'3) Você tem afinidade com ciências, principalmente com a parte voltada para mudanças dos estados físicos?',
      options:['Sim, é uma das partes que mais tenho afinidade', 'Não tenho afinidade com ciências', 'Sim, mas tenho mais afinidade em outras áreas da ciências'],
      answer:'Sim, é uma das partes que mais tenho afinidade',
    },
    {
      question:'4) Quando você está em grupo de pessoas desconhecidas, você busca se comunicar?',
      options:['Sim', 'As vezes', 'Não'],
      answer:'Não',
    },
    {
      question:'5) O seu raciocínio lógico é bom?',
      options:['Sou bom em raciocínio lógico', 'Não sou bom em raciocínio logíco','Meio termo',],
      answer:'Sou bom em raciocínio lógico',
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
      resultContainer.innerHTML = `Seu perfil para eletrotécnica é de ${score}/${quizData.length}`;
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