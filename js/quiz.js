// ===== MocAndChill - Quiz JavaScript =====

const QUIZ_QUESTIONS = [
  {
    id: 1,
    emoji: '😊',
    question: 'Hôm nay bạn cảm thấy thế nào?',
    subtitle: 'Hãy chọn trạng thái gần nhất với bạn lúc này',
    options: [
      { id: 'stressed', icon: '😰', label: 'Căng thẳng', desc: 'Áp lực công việc/học tập' },
      { id: 'tired', icon: '😴', label: 'Mệt mỏi', desc: 'Thiếu ngủ, kiệt sức' },
      { id: 'bloated', icon: '🤢', label: 'Khó chịu', desc: 'Đầy bụng, khó tiêu' },
      { id: 'chill', icon: '😌', label: 'Thư giãn', desc: 'Muốn chill, tận hưởng' }
    ]
  },
  {
    id: 2,
    emoji: '🍵',
    question: 'Bạn thích hương vị nào?',
    subtitle: 'Khẩu vị sẽ giúp chúng mình chọn trà phù hợp',
    options: [
      { id: 'sweet', icon: '🍯', label: 'Ngọt nhẹ', desc: 'Mật ong, hoa quả' },
      { id: 'fresh', icon: '🌿', label: 'Tươi mát', desc: 'Bạc hà, chanh' },
      { id: 'warm', icon: '🔥', label: 'Ấm nồng', desc: 'Gừng, quế' },
      { id: 'mild', icon: '🌸', label: 'Thanh nhẹ', desc: 'Hoa, lá, nhẹ nhàng' }
    ]
  },
  {
    id: 3,
    emoji: '⏰',
    question: 'Bạn thường uống trà vào lúc nào?',
    subtitle: 'Thời điểm uống cũng quan trọng lắm nha!',
    options: [
      { id: 'morning', icon: '🌅', label: 'Buổi sáng', desc: 'Khởi đầu ngày mới' },
      { id: 'afternoon', icon: '☀️', label: 'Buổi chiều', desc: 'Giải lao giữa giờ' },
      { id: 'evening', icon: '🌙', label: 'Buổi tối', desc: 'Thư giãn cuối ngày' },
      { id: 'anytime', icon: '🕐', label: 'Bất kỳ lúc nào', desc: 'Linh hoạt, tùy hứng' }
    ]
  },
  {
    id: 4,
    emoji: '🎯',
    question: 'Mục tiêu sức khỏe của bạn?',
    subtitle: 'Chọn điều bạn quan tâm nhất',
    options: [
      { id: 'sleep', icon: '💤', label: 'Ngủ ngon hơn', desc: 'Cải thiện giấc ngủ' },
      { id: 'energy', icon: '⚡', label: 'Tăng năng lượng', desc: 'Tỉnh táo, tập trung' },
      { id: 'detox', icon: '🧹', label: 'Thanh lọc cơ thể', desc: 'Detox, giải độc' },
      { id: 'beauty', icon: '✨', label: 'Đẹp da', desc: 'Chăm sóc làn da' }
    ]
  }
];

const QUIZ_RESULTS = {
  relaxation: {
    emoji: '🌼',
    title: 'Bạn cần sự thư giãn!',
    desc: 'Trà Hoa Cúc Mật Ong là lựa chọn hoàn hảo cho bạn. Hương hoa cúc nhẹ nhàng kết hợp mật ong sẽ giúp bạn xả stress và có giấc ngủ ngon hơn.',
    products: [1, 4],
    tips: [
      'Uống trà hoa cúc 30 phút trước khi ngủ',
      'Kết hợp với thiền 10 phút mỗi ngày',
      'Hạn chế caffeine sau 3 giờ chiều'
    ]
  },
  energy: {
    emoji: '🫚',
    title: 'Tăng cường năng lượng!',
    desc: 'Trà Gừng Nghệ và Hồng Trà Quế sẽ giúp bạn tràn đầy năng lượng, tăng cường sức đề kháng và khởi đầu ngày mới thật sảng khoái.',
    products: [2, 7],
    tips: [
      'Uống 1 ly trà gừng nghệ mỗi sáng',
      'Bổ sung thêm vitamin C tự nhiên',
      'Tập thể dục nhẹ 15-20 phút mỗi ngày'
    ]
  },
  detox: {
    emoji: '🌿',
    title: 'Thanh lọc cơ thể!',
    desc: 'Trà Atiso Đà Lạt sẽ giúp bạn mát gan, giải độc, cải thiện hệ tiêu hóa. Kết hợp với Trà Bạc Hà Chanh Sả để cơ thể luôn nhẹ nhàng, tươi mát.',
    products: [3, 5],
    tips: [
      'Uống trà atiso sau bữa ăn 30 phút',
      'Uống đủ 2 lít nước mỗi ngày',
      'Ăn nhiều rau xanh và trái cây'
    ]
  },
  chill: {
    emoji: '🍂',
    title: 'Tận hưởng khoảnh khắc!',
    desc: 'Set Trà Thảo Mộc Mùa Thu là lựa chọn hoàn hảo cho những lúc bạn muốn chậm lại, tận hưởng cuộc sống. Thử pha trà tại nhà với bộ pha chế của chúng mình nhé!',
    products: [6, 8],
    tips: [
      'Dành 15 phút mỗi ngày cho "tea time"',
      'Thử pha trà theo công thức riêng',
      'Chia sẻ trà với bạn bè, người thân'
    ]
  }
};

let currentStep = 0;
let answers = {};

function initQuiz() {
  renderQuizStep(0);
  updateProgress();
}

function renderQuizStep(step) {
  const container = document.getElementById('quizSteps');
  if (!container) return;

  const q = QUIZ_QUESTIONS[step];
  
  container.innerHTML = `
    <div class="quiz-step active">
      <div class="quiz-emoji">${q.emoji}</div>
      <h2>${q.question}</h2>
      <p>${q.subtitle}</p>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <div class="quiz-option-card ${answers[q.id] === opt.id ? 'selected' : ''}" 
               onclick="selectOption(${q.id}, '${opt.id}', this)">
            <div class="option-icon">${opt.icon}</div>
            <h4>${opt.label}</h4>
            <p>${opt.desc}</p>
          </div>
        `).join('')}
      </div>
      <div class="quiz-nav">
        ${step > 0 ? '<button class="btn btn-secondary btn-sm" onclick="prevStep()">← Quay lại</button>' : ''}
        <button class="btn btn-primary btn-sm" id="nextBtn" onclick="nextStep()" ${!answers[q.id] ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
          ${step === QUIZ_QUESTIONS.length - 1 ? 'Xem kết quả 🎉' : 'Tiếp theo →'}
        </button>
      </div>
    </div>
  `;
}

function selectOption(questionId, optionId, element) {
  answers[questionId] = optionId;
  
  // Update UI
  element.closest('.quiz-options').querySelectorAll('.quiz-option-card').forEach(card => {
    card.classList.remove('selected');
  });
  element.classList.add('selected');

  // Enable next button
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
  }
}

function nextStep() {
  const q = QUIZ_QUESTIONS[currentStep];
  if (!answers[q.id]) return;

  if (currentStep < QUIZ_QUESTIONS.length - 1) {
    currentStep++;
    renderQuizStep(currentStep);
    updateProgress();
  } else {
    showResult();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    renderQuizStep(currentStep);
    updateProgress();
  }
}

function updateProgress() {
  const steps = document.querySelectorAll('.quiz-progress .progress-step');
  steps.forEach((step, i) => {
    step.classList.remove('active', 'completed');
    if (i < currentStep) step.classList.add('completed');
    if (i === currentStep) step.classList.add('active');
  });
}

function getResult() {
  const feeling = answers[1];
  const flavor = answers[2];
  const time = answers[3];
  const goal = answers[4];

  // Smart recommendation logic
  if (goal === 'sleep' || feeling === 'stressed') return 'relaxation';
  if (goal === 'energy' || feeling === 'tired') return 'energy';
  if (goal === 'detox' || feeling === 'bloated') return 'detox';
  if (feeling === 'chill' || goal === 'beauty') return 'chill';

  // Fallback based on flavor preference
  if (flavor === 'warm') return 'energy';
  if (flavor === 'mild' || flavor === 'sweet') return 'relaxation';
  if (flavor === 'fresh') return 'detox';

  return 'chill';
}

function showResult() {
  const resultKey = getResult();
  const result = QUIZ_RESULTS[resultKey];
  const container = document.getElementById('quizSteps');
  const progressBar = document.querySelector('.quiz-progress');
  
  if (progressBar) {
    progressBar.querySelectorAll('.progress-step').forEach(s => s.classList.add('completed'));
  }

  const recommendedProducts = result.products.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="quiz-result active">
      <div class="quiz-result-card">
        <div class="result-emoji">${result.emoji}</div>
        <h2>${result.title}</h2>
        <p>${result.desc}</p>
        <div style="margin-top:20px; text-align:left">
          <h4 style="margin-bottom:12px; color:var(--primary-dark)">💡 Mẹo cho bạn:</h4>
          <ul style="list-style:none; padding:0">
            ${result.tips.map(tip => `
              <li style="padding:8px 0; display:flex; align-items:center; gap:8px; color:var(--text-light)">
                <span style="color:var(--primary)">✓</span> ${tip}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <div class="recommended-products">
        <h3>🌿 Sản phẩm gợi ý cho bạn</h3>
        <div class="products-grid" style="grid-template-columns: repeat(2, 1fr); max-width:600px; margin:0 auto">
          ${recommendedProducts.map(p => createProductCard(p)).join('')}
        </div>
      </div>
      
      <div style="margin-top:40px; display:flex; gap:16px; justify-content:center; flex-wrap:wrap">
        <button class="btn btn-primary" onclick="location.href='shop.html'">🛒 Mua ngay</button>
        <button class="btn btn-secondary" onclick="restartQuiz()">🔄 Làm lại</button>
        <button class="btn btn-accent" onclick="shareResult('${resultKey}')">📤 Chia sẻ</button>
      </div>
    </div>
  `;
}

function restartQuiz() {
  currentStep = 0;
  answers = {};
  renderQuizStep(0);
  updateProgress();
}

function shareResult(resultKey) {
  const result = QUIZ_RESULTS[resultKey];
  const text = `${result.emoji} ${result.title}\n${result.desc}\n\nLàm quiz tại MocAndChill.com!`;
  
  if (navigator.share) {
    navigator.share({
      title: 'MocAndChill - Kết quả Quiz',
      text: text,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      showToast('📋 Đã copy kết quả! Paste và chia sẻ với bạn bè nhé.');
    });
  }
}

document.addEventListener('DOMContentLoaded', initQuiz);
