const questions = [
  {
    image: "q1.jpg",
    question: "Kādā Latvijas pilsētā atrodas šī slavenā Kaķu māja?",
    answers: ["Rīga", "Liepāja", "Daugavpils", "Valmiera"],
    correct: 0
  },
  {
    image: "q2.jfif",
    question: "Kurš ir lielākais nacionālais parks Latvijā?",
    answers: ["Kemeri", "Slītere", "Gauja", "Rāzna"],
    correct: 2
  },
  {
    image: "q3.jfif",
    question: "Kā sauc šo Rīgas Vecrīgas ēku?",
    answers: ["Melngalvju nams", "Rīgas Doms", "Latvijas Nacionālais teātris", "Pulvertornis"],
    correct: 0
  },
  {
    image: "q4.jpg",
    question: "Kur atrodas šī populārā pludmale?",
    answers: ["Saulkrasti", "Ventspils", "Jūrmala", "Engure"],
    correct: 2
  },
  {
    image: "q5.jfif",
    question: "Kur atrodas Turaidas pils?",
    answers: ["Sigulda", "Cēsis", "Valmiera", "Kuldīga"],
    correct: 0
  },
  {
    image: "q6.jfif",
    question: "Kāds muzejs redzams attēlā?",
    answers: ["Turaidas muzejrezervāts", "Latvijas Etnogrāfiskais brīvdabas muzejs", "Cēsu Vēstures muzejs", "Krustpils muzejs"],
    correct: 1
  },
  {
    image: "q7.jpg",
    question: "Kā sauc šo pili?",
    answers: ["Jelgavas pils", "Rundāles pils", "Mežotnes pils", "Cesvaines pils"],
    correct: 1
  },
  {
    image: "q8.jfif",
    question: "Kā sauc šo pieminekli?",
    answers: ["Latvijas Brīvības piemineklis", "Solidaritātes monuments", "Brīvības skulptūra", "Vienotības piemineklis"],
    correct: 0
  },
  {
    image: "q9.jfif",
    question: "Kur atrodas Ventas rumba?",
    answers: ["Kuldīgā", "Liepājā", "Jēkabpilī", "Talsos"],
    correct: 0
  },
  {
    image: "q10.jfif",
    question: "Kāds objekts redzams šajā attēlā?",
    answers: ["Cēsu pils", "Daugavpils cietoksnis", "Alūksnes pilsdrupas", "Aizkraukles pilsdrupas"],
    correct: 1
  },
  {
    image: "q11.jfif",
    question: "Kā sauc šo sakrālo celtni?",
    answers: ["Aglonas bazilika", "Rīgas Doms", "Jelgavas katedrāle", "Rēzeknes baznīca"],
    correct: 0
  },
  {
    image: "q12.jfif",
    question: "Kāds ir šīs ēkas nosaukums?",
    answers: ["Latvijas Universitāte", "Latvijas Nacionālā bibliotēka", "Latvijas Zinātņu akadēmija", "Rīgas pils"],
    correct: 1
  },
  {
    image: "q13.jfif",
    question: "Kā sauc šo pili?",
    answers: ["Turaidas pils", "Cēsu pils", "Rundāles pils", "Bauskas pils"],
    correct: 1
  },
  {
    image: "q14.jfif",
    question: "Kur atrodas Bauskas pils?",
    answers: ["Dobele", "Bauska", "Aizkraukle", "Jelgava"],
    correct: 1
  },
  {
    image: "q15.jfif",
    question: "Kā sauc šo pili?",
    answers: ["Cesvaines pils", "Mežotnes pils", "Vecgulbenes pils", "Rundāles pils"],
    correct: 0
  }
];

let current = 0;
let score = 0;

const img = document.getElementById("question-image");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const lastScoresEl = document.getElementById("last-score");

function loadQuestion() {
  const q = questions[current];
  img.src = q.image;
  questionText.textContent = q.question;
  progress.textContent = `Jautājums ${current + 1} no ${questions.length}`;
  answersContainer.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index);
    answersContainer.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function selectAnswer(index) {
  const isCorrect = index === questions[current].correct;
  if (isCorrect) score++;

  [...answersContainer.children].forEach((btn, i) => {
    btn.disabled = true;
    btn.style.backgroundColor = i === questions[current].correct ? "#28a745" : "#dc3545";
  });
  nextBtn.style.display = "inline-block";
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  document.querySelector(".quiz-container").classList.add("hidden");
  resultContainer.classList.remove("hidden");

  scoreEl.textContent = `🎯 Tavs rezultāts: ${score} no ${questions.length} punktiem.`;

  let message = "";
  if (score <= 5) message = "😕 Nebaidies no neveiksmēm, mēģini vēlreiz un kļūsi labāks!";
  else if (score <= 12) message = "👍 Labi padarīts! Tu jau daudz zini! Turpini mēģināt!";
  else message = "🏆 Wow! Tu esi īsts eksperts! Tā turēt!";
  messageEl.textContent = message;

  // Nolasām iepriekšējos rezultātus no localStorage (masīvs)
  let results = JSON.parse(localStorage.getItem("quizResults")) || [];

  // Pievienojam jauno rezultātu ar datumu un laiku
  const now = new Date();
  const nowStr = now.toLocaleString();

  results.push({ score, date: nowStr });

  // Saglabājam tikai pēdējos 3 rezultātus
  if (results.length > 3) results.shift();

  localStorage.setItem("quizResults", JSON.stringify(results));

  // Attēlojam pēdējos 3 rezultātus ar datumu
  if (results.length > 0) {
    lastScoresEl.innerHTML = "<strong>📈 Iepriekšējie mēģinājumi:</strong><br>";
    results.forEach((res, i) => {
      lastScoresEl.innerHTML += `${i + 1}. ${res.score} punkti — ${res.date}<br>`;
    });
  } else {
    lastScoresEl.textContent = "💡 Šis bija tavs pirmais mēģinājums!";
  }
}

// Sākuma ielāde
loadQuestion();