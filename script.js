const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
   content.style.display = "flex";
   contentFinish.style.display = "none";

   currentIndex = 0;
   questionsCorrect = 0;
   loadQuestion();
};

function nextQuestion(e) {
   const isCorrect = e.target.getAttribute("data-correct") === "true";

   // Adiciona a animação de acerto ou erro
   if (isCorrect) {
      e.target.classList.add("correct");
      questionsCorrect++;
   } else {
      e.target.classList.add("incorrect");

      // Mostra a resposta correta
      const correctAnswer = Array.from(
         document.querySelectorAll(".answer")
      ).find((answer) => answer.getAttribute("data-correct") === "true");
      correctAnswer.classList.add("correct-visible"); // Destaque na resposta certa
   }

   // Desabilitar todos os botões de resposta após clicar
   document.querySelectorAll(".answer").forEach((button) => {
      button.disabled = true;
   });

   // Esperar um tempo antes de carregar a próxima pergunta ou terminar
   setTimeout(() => {
      if (currentIndex < questions.length - 1) {
         currentIndex++;
         loadQuestion();
      } else {
         finish();
      }
   }, 1000); // Tempo de espera antes de ir para a próxima pergunta ou finalizar
}

function finish() {
   textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
   content.style.display = "none";
   contentFinish.style.display = "flex";
}

function loadQuestion() {
   spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
   const item = questions[currentIndex];
   answers.innerHTML = "";
   question.innerHTML = item.question;

   item.answers.forEach((answer) => {
      const div = document.createElement("div");

      div.innerHTML = `
         <button class="answer" data-correct="${answer.correct}">
            ${answer.option}
         </button>
      `;

      answers.appendChild(div);
   });

   // Habilitar os botões e remover qualquer classe de animação ou destaque antigo
   document.querySelectorAll(".answer").forEach((item) => {
      item.disabled = false; // Reabilita os botões
      item.classList.remove("correct", "incorrect", "correct-visible"); // Remove qualquer animação anterior
      item.addEventListener("click", nextQuestion);
   });
}

loadQuestion();
