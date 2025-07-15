// ________FAKE_DATA_______________
let questions = [
  {
    quiz_id: 1,
    question:
      "Thông tư 143/2023/TT-BQP có bao nhiêu nguyên tắc xử lý kỷ luật?",
    answers: [
      "7", 
      "8", 
      "9", 
      "10"
    ],
  },
  {
    quiz_id: 2,
    question:
      "Thông tư 143/2023/TT-BQP có bao nhiêu đối tượng áp dụng?",
    answers: ["5", "6", "7", "8"],
  },
  {
    quiz_id: 3,
    question:
      "Thông tư 143/2023/TT-BQP có bao nhiêu tình tiết giảm nhẹ, tăng nặng?",
    answers: [
      "4 tình tiết giảm nhẹ, 5 tình tiết tăng nặng", 
      "4 tình tiết giảm nhẹ, 4 tình tiết tăng nặng", 
      "5 tình tiết giảm nhẹ, 5 tình tiết tăng nặng", 
      "5 tình tiết giảm nhẹ, 4 tình tiết tăng nặng"],
  },
  {
    quiz_id: 4,
    question: "Thông tư 143/2023/TT-BQP quy định thời hiệu xử lý kỷ luật khiển trách là bao lâu?",
    answers: ["5 năm", "6 năm", "7 năm", "4 năm"],
  },
  {
    quiz_id: 5,
    question:
      "Thông tư 143/2023/TT-BQP quy định thời hạn xử lý kỷ luật không quá bao nhiêu ngày?",
    answers: ["70", "80", "90", "100"],
  },
  {
    quiz_id: 6,
    question: "Thông tư 143/2023/TT-BQP quy định có bao nhiêu hình thức kỷ luật đối với Sĩ quan?",
    answers: [
      "8",
       "7", 
       "6",
        "5"
      ],
  },
  {
    quiz_id: 7,
    question:
      " Thông tư 143/2023/TT-BQP quy định có bao nhiêu hình thức kỷ luật đối với QNCN?",
    answers: ["5", "6", "7", "8"],
  },
  {
    quiz_id: 8,
    question: "Thông tư 143/2023/TT-BQP quy định có bao nhiêu hình thức kỷ luật đối với HSQ-BS?",
    answers: ["5", "6", "7", "8"],
  },
  {
    quiz_id: 9,
    question: "Thông tư 143/2023/TT-BQP quy định hiệu lực thi hành kỷ luật đối với hình thức khiển trách, cảnh cáo là bao lâu?",
    answers: ["6 tháng", "12 tháng", "24 tháng", "18 tháng"],
  },
  {
    quiz_id: 10,
    question: "Thông tư 143/2023/TT-BQP có hiệu lực từ ngày nào?",
    answers: [
      "15/02/2024", 
      "12/02/2024", 
      "12/5/2024", 
      "14/5/2024"],
  },
];
const results = [
  {
    quiz_id: 1,
    answer: "10",
  },
  {
    quiz_id: 3,
    answer: "4 tình tiết giảm nhẹ, 5 tình tiết tăng nặng",
  },
  {
    quiz_id: 2,
    answer: "7",
  },
  {
    quiz_id: 4,
    answer: "5 năm",
  },
  {
    quiz_id: 5,
    answer: "90",
  },
  {
    quiz_id: 6,
    answer: "8",
  },
  {
    quiz_id: 7,
    answer: "7",
  },
  {
    quiz_id: 8,
    answer: "6",
  },
  {
    quiz_id: 9,
    answer: "12 tháng",
  },
  {
    quiz_id: 10,
    answer: "15/02/2024",
  },
];
// ________QUIZ_APP________________
const quizTimer = document.querySelector("#timer");
const quizProgress = document.querySelector("#progress");
const quizProgressText = document.querySelector("#progress_text");
const quizSubmit = document.querySelector("#quiz_submit");
const quizPrev = document.querySelector("#quiz_prev");
const quizNext = document.querySelector("#quiz_next");
const quizCount = document.querySelector(".quiz_question h5");
const quizAnswers = document.querySelectorAll(".quiz_question ul li");
let quizQuestions = document.querySelectorAll(".quiz_numbers ul li");
const quizQuestionList = document.querySelector(".quiz_numbers ul");
const quizAnswersItem = document.querySelectorAll(".quiz_answer_item");
const quizTitle = document.querySelector("#quiz_title");
let currentIndex = null;
let listSubmit = []; // Lưu index đáp án đã chọn
let listResults = []; // Lưu index kết quả đúng, theo mảng đã random
let isSubmit = false;
function randomArray(array) {
  return (array = array.sort(() => Math.random() - Math.random()));
}
const quiz = {
  randomQuestions: function () {
    questions = randomArray(questions);
    questions.forEach((q) => {
      q.answers = randomArray(q.answers);
    });
    console.log(questions);
  },
  renderQuestionList: function () {
    let render = "";
    questions.forEach((question, index) => {
      render += `<li>${index + 1}</li>`;
    });
    quizQuestionList.innerHTML = render;
    quizQuestions = document.querySelectorAll(".quiz_numbers ul li");
  },
  renderCurrentQuestion: function () {
    quizCount.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
    quizTitle.innerText = questions[currentIndex].question;
    quizAnswersItem.forEach((answer, index) => {
      answer.innerText = questions[currentIndex].answers[index];
    });
  },
  renderProgress: function () {
    quizProgress.style = `stroke-dasharray: 0 9999;`;
    quizProgressText.innerText = `0/${questions.length}`;
  },
  renderTimer: function () {
    var timer = 600;
    let _this = this;
    // Lấy thẻ p có id là "timer"
    var countdownElement = document.getElementById("timer");

    // Hàm cập nhật thời gian
    function updateTimer() {
      var minutes = Math.floor(timer / 60);
      var seconds = timer % 60;

      // Định dạng thời gian thành chuỗi HH:MM:SS
      var timerString =
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds;

      // Gán thời gian đã định dạng vào thẻ p
      countdownElement.innerHTML = timerString;

      // Giảm thời gian mỗi giây
      timer--;
      // Kiểm tra nếu hết thời gian
      if (timer < 0) {
        countdownElement.innerHTML = "Hết thời gian!";
        _this.handleCheckResults();
      }
      if (isSubmit) {
        clearInterval(intervalId);
      }
    }

    // Gọi hàm updateTimer mỗi giây
    var intervalId = setInterval(updateTimer, 1000);
  },
  renderResults: function () {
    if (listResults[currentIndex] === listSubmit[currentIndex]) {
      quizAnswers.forEach((item) => {
        item.classList.remove("incorrect");
      });
        quizAnswers[listResults[currentIndex]].classList.add("active");
    } else {
      quizAnswers.forEach((item) => {
        item.classList.remove("active");
        item.classList.remove("incorrect");
      });
      quizAnswers[listResults[currentIndex]].classList.add("active");
      quizAnswers[listSubmit[currentIndex]].classList.add("incorrect");
    }
  },
  handleProgress: function (correct) {
    const r = quizProgress.getAttribute("r");
    if (!isSubmit) {
      const progressLen = listSubmit.filter((item) => item >= 0);
      quizProgress.style = `stroke-dasharray: ${
        (2 * Math.PI * r * progressLen.length) / questions.length
      } 9999;`;
      quizProgressText.innerText = `${progressLen.length}/${questions.length}`;
    } else {
      quizProgress.style = `stroke-dasharray: ${
        (2 * Math.PI * r * correct) / questions.length
      } 9999;`;
      quizProgressText.innerText = `${correct}/${questions.length}`;
    }
  },
  handleQuestionList: function () {
    quizQuestions.forEach((item, index) => {
      item.addEventListener("click", () => {
        item.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
        quizQuestions.forEach((item) => item.classList.remove("active"));
        item.classList.add("active");
        currentIndex = index;
        this.renderCurrentQuestion();
        quizAnswers.forEach((item) => item.classList.remove("active"));
        const selected = listSubmit[currentIndex];
        selected >= 0 && quizAnswers[selected].click();
        if (isSubmit) {
          this.renderResults();
        }
      });
    });
    quizQuestions[0].click();
  },
  handleAnswer: function () {
    quizAnswers.forEach((answer, index) => {
      answer.addEventListener("click", () => {
        if (!isSubmit) {
          quizAnswers.forEach((item) => item.classList.remove("active"));
          answer.classList.add("active");
          quizQuestions[currentIndex].classList.add("selected");
          listSubmit[currentIndex] = index;
          console.log(listSubmit);
          this.handleProgress();
        } else {
          return;
        }
      });
    });
  },
  handleNext: function () {
    quizNext.addEventListener("click", () => {
      ++currentIndex;
      if (currentIndex > questions.length - 1) {
        currentIndex = 0;
      }
      quizQuestions[currentIndex].click();
    });
  },
  handlePrev: function () {
    quizPrev.addEventListener("click", () => {
      --currentIndex;
      if (currentIndex < 0) {
        currentIndex = questions.length - 1;
      }
      quizQuestions[currentIndex].click();
    });
  },
  handleSubmit: function () {
    quizSubmit.addEventListener("click", () => {
      const progressLen = listSubmit.filter((item) => item >= 0);
      if (progressLen.length === questions.length) {
        this.handleCheckResults();
      } else {
        alert("Bạn chưa chọn hết đáp án");
      }
    });
  },
  handleCheckResults: function () {
    let correct = 0;
    questions.forEach((item, index) => {
      const result = results.find((r) => r.quiz_id === item.quiz_id);
      if (item.answers[listSubmit[index]] === result.answer) {
        listResults[index] = listSubmit[index];
        correct++;
      } else {
        quizQuestions[index].classList.add("incorrect");
        listResults[index] = item.answers.indexOf(result.answer);
      }
    });
    isSubmit = true;
    this.handleProgress(correct);
  },
  handleKeyDown: function () {
    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      switch (e.key) {
        case "ArrowRight":
          return quizNext.click();
        case "ArrowLeft":
          return quizPrev.click();
        default:
          return false;
      }
    });
  },
  render: function () {
    this.renderQuestionList();
    this.renderProgress();
    this.renderTimer();
  },
  handle: function () {
    this.handleQuestionList();
    this.handleAnswer();
    this.handleNext();
    this.handlePrev();
    this.handleKeyDown();
    this.handleSubmit();
  },
  start: function () {
    this.randomQuestions();
    this.render();
    this.handle();
  },
};
quiz.start();