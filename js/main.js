// ===== MocAndChill - Main JavaScript =====

// Cart Management (shared across all pages)
const Cart = {
  KEY: 'mocandchill_cart',

  getItems() {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  },

  saveItems(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  addItem(product) {
    const items = this.getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += product.qty || 1;
    } else {
      items.push({ ...product, qty: product.qty || 1 });
    }
    this.saveItems(items);
    showToast(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
  },

  removeItem(id) {
    let items = this.getItems().filter(i => i.id !== id);
    this.saveItems(items);
  },

  updateQty(id, qty) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      this.saveItems(items);
    }
  },

  getTotal() {
    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  getCount() {
    return this.getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  clear() {
    localStorage.removeItem(this.KEY);
    this.updateBadge();
  },

  updateBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = this.getCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.setAttribute('data-count', count);
    });
  }
};

// Product Database
const PRODUCTS = [
  {
    id: 1,
    name: 'Trà Hoa Cúc Mật Ong',
    category: 'Trà thư giãn',
    price: 89000,
    oldPrice: 120000,
    emoji: '🌼',
    badge: 'hot',
    rating: 4.8,
    reviews: 156,
    desc: 'Hoa cúc vàng kết hợp mật ong nguyên chất, giúp thư giãn và cải thiện giấc ngủ.',
    fullDesc: 'Trà hoa cúc mật ong từ MocAndChill được chọn lọc từ những bông cúc vàng tươi nhất vùng Đà Lạt, kết hợp cùng mật ong rừng nguyên chất. Hương thơm nhẹ nhàng, vị ngọt thanh tao, giúp bạn thư giãn sau một ngày dài làm việc. Đặc biệt hiệu quả trong việc cải thiện chất lượng giấc ngủ.',
    tags: ['thư giãn', 'giấc ngủ', 'stress'],
    ingredients: 'Hoa cúc khô, mật ong rừng, cam thảo',
    weight: '100g (20 gói)',
    origin: 'Đà Lạt, Việt Nam'
  },
  {
    id: 2,
    name: 'Trà Gừng Nghệ Mật Ong',
    category: 'Trà tăng lực',
    price: 95000,
    emoji: '🫚',
    badge: 'new',
    rating: 4.7,
    reviews: 98,
    desc: 'Gừng tươi và nghệ vàng tự nhiên, tăng cường sức đề kháng và năng lượng.',
    fullDesc: 'Sự kết hợp hoàn hảo giữa gừng tươi và nghệ vàng nguyên chất, được thu hoạch từ vùng Tây Nguyên. Trà có tác dụng ấm bụng, hỗ trợ tiêu hóa, tăng cường sức đề kháng và cung cấp năng lượng cho cả ngày dài.',
    tags: ['năng lượng', 'miễn dịch', 'tiêu hóa'],
    ingredients: 'Gừng tươi, nghệ vàng, mật ong, quế',
    weight: '120g (20 gói)',
    origin: 'Tây Nguyên, Việt Nam'
  },
  {
    id: 3,
    name: 'Trà Atiso Đà Lạt',
    category: 'Trà thanh lọc',
    price: 75000,
    emoji: '🌿',
    badge: 'sale',
    rating: 4.9,
    reviews: 234,
    desc: 'Atiso Đà Lạt nguyên chất, thanh lọc cơ thể, mát gan giải độc hiệu quả.',
    fullDesc: 'Trà Atiso được làm từ 100% atiso tươi Đà Lạt, không chất bảo quản. Atiso là loại thảo mộc nổi tiếng với tác dụng thanh lọc cơ thể, mát gan, giải độc, hỗ trợ tiêu hóa. Thích hợp sử dụng hàng ngày để duy trì sức khỏe.',
    tags: ['detox', 'mát gan', 'thanh lọc'],
    ingredients: 'Hoa atiso, lá atiso, thân atiso',
    weight: '150g (25 gói)',
    origin: 'Đà Lạt, Việt Nam'
  },
  {
    id: 4,
    name: 'Trà Tâm Sen An Giấc',
    category: 'Trà thư giãn',
    price: 110000,
    emoji: '🪷',
    badge: 'new',
    rating: 4.6,
    reviews: 87,
    desc: 'Tâm sen kết hợp lá vông, táo nhân – bài thuốc an giấc cổ truyền.',
    fullDesc: 'Trà Tâm Sen An Giấc là sự kết hợp tinh tế của tâm sen, lá vông, và táo nhân – những vị thuốc quý trong y học cổ truyền Việt Nam. Giúp an thần, dễ ngủ, ngủ sâu giấc và không gây phụ thuộc.',
    tags: ['giấc ngủ', 'an thần', 'thư giãn'],
    ingredients: 'Tâm sen, lá vông, táo nhân, cam thảo',
    weight: '80g (20 gói)',
    origin: 'Đồng Tháp, Việt Nam'
  },
  {
    id: 5,
    name: 'Trà Bạc Hà Chanh Sả',
    category: 'Trà sảng khoái',
    price: 69000,
    emoji: '🍋',
    badge: 'hot',
    rating: 4.5,
    reviews: 178,
    desc: 'Bạc hà mát lạnh, chanh tươi và sả thơm – thức uống giải nhiệt hoàn hảo.',
    fullDesc: 'Sự hòa quyện tuyệt vời giữa bạc hà mát lạnh, chanh tươi chua thanh và sả thơm nồng. Trà Bạc Hà Chanh Sả là thức uống giải nhiệt lý tưởng cho mùa hè, đồng thời hỗ trợ tiêu hóa và sảng khoái tinh thần.',
    tags: ['giải nhiệt', 'sảng khoái', 'tiêu hóa'],
    ingredients: 'Bạc hà, vỏ chanh, sả, cỏ ngọt',
    weight: '100g (20 gói)',
    origin: 'Hà Nội, Việt Nam'
  },
  {
    id: 6,
    name: 'Set Trà Thảo Mộc Mùa Thu',
    category: 'Set quà tặng',
    price: 299000,
    oldPrice: 380000,
    emoji: '🍂',
    badge: 'sale',
    rating: 4.9,
    reviews: 67,
    desc: 'Bộ sưu tập 4 vị trà thảo mộc theo mùa, đóng hộp sang trọng.',
    fullDesc: 'Set Trà Thảo Mộc Mùa Thu bao gồm 4 loại trà đặc biệt: Trà Hoa Cúc, Trà Gừng Nghệ, Trà Atiso và Trà Tâm Sen, được đóng trong hộp gỗ sang trọng. Quà tặng ý nghĩa cho người thân yêu.',
    tags: ['quà tặng', 'combo', 'tiết kiệm'],
    ingredients: 'Hoa cúc, gừng nghệ, atiso, tâm sen',
    weight: '400g (4 hộp x 100g)',
    origin: 'Việt Nam'
  },
  {
    id: 7,
    name: 'Hồng Trà Quế Thơm',
    category: 'Trà tăng lực',
    price: 85000,
    emoji: '☕',
    badge: '',
    rating: 4.4,
    reviews: 112,
    desc: 'Hồng trà đậm đà kết hợp quế thơm nồng, ấm áp cho mỗi buổi sáng.',
    fullDesc: 'Hồng Trà Quế được pha chế từ lá trà đen cao cấp và quế Sri Lanka thượng hạng. Hương thơm nồng ấm, vị đậm đà, giàu chất chống oxy hóa. Thích hợp uống vào buổi sáng để khởi đầu ngày mới tràn đầy năng lượng.',
    tags: ['năng lượng', 'ấm áp', 'buổi sáng'],
    ingredients: 'Hồng trà, quế Ceylon, đinh hương',
    weight: '100g (20 gói)',
    origin: 'Lâm Đồng, Việt Nam'
  },
  {
    id: 8,
    name: 'Bộ Pha Chế Trà Tại Nhà',
    category: 'Dụng cụ',
    price: 450000,
    oldPrice: 550000,
    emoji: '🫖',
    badge: 'hot',
    rating: 4.8,
    reviews: 45,
    desc: 'Bộ dụng cụ pha trà thảo mộc tại nhà gồm ấm, lọc, muỗng đo lường.',
    fullDesc: 'Bộ Pha Chế Trà Tại Nhà bao gồm: 1 ấm thủy tinh chịu nhiệt 600ml, 1 bộ lọc trà inox, 2 cốc thủy tinh, 1 muỗng đo lường gỗ, và sách hướng dẫn pha chế 20 công thức trà thảo mộc tại nhà.',
    tags: ['dụng cụ', 'pha chế', 'tại nhà'],
    ingredients: 'Ấm thủy tinh, lọc trà, cốc, muỗng gỗ',
    weight: 'Bộ 5 món',
    origin: 'Handmade Việt Nam'
  }
];

// Blog Database
const BLOG_POSTS = [
  {
    id: 1,
    title: '5 Loại Trà Thảo Mộc Tốt Nhất Cho Giấc Ngủ Ngon',
    category: 'Sức khỏe',
    date: '15/11/2026',
    readTime: '5 phút',
    emoji: '😴',
    excerpt: 'Khám phá những loại trà thảo mộc được khoa học chứng minh giúp cải thiện giấc ngủ, từ trà hoa cúc đến trà tâm sen...',
    content: 'Giấc ngủ là yếu tố quan trọng nhất quyết định chất lượng cuộc sống. Tuy nhiên, với nhịp sống bận rộn hiện đại, nhiều bạn trẻ gặp khó khăn trong việc có một giấc ngủ ngon...'
  },
  {
    id: 2,
    title: 'Hướng Dẫn Pha Trà Atiso Đúng Cách Tại Nhà',
    category: 'Hướng dẫn',
    date: '10/11/2026',
    readTime: '3 phút',
    emoji: '🌿',
    excerpt: 'Từng bước pha trà atiso ngon đúng chuẩn, giữ nguyên dưỡng chất và hương vị tự nhiên...',
    content: 'Atiso là loại thảo mộc quý với nhiều lợi ích sức khỏe. Tuy nhiên, không phải ai cũng biết cách pha trà atiso đúng cách để phát huy tối đa công dụng...'
  },
  {
    id: 3,
    title: 'Thảo Mộc Giúp Giảm Stress Cho Dân Văn Phòng',
    category: 'Lối sống',
    date: '05/11/2026',
    readTime: '7 phút',
    emoji: '💆',
    excerpt: 'Những loại thảo mộc và cách sử dụng đơn giản giúp giảm căng thẳng ngay tại bàn làm việc...',
    content: 'Stress là vấn đề phổ biến của giới trẻ hiện đại, đặc biệt là dân văn phòng. Thay vì phụ thuộc vào cà phê, hãy thử những giải pháp tự nhiên từ thảo mộc...'
  },
  {
    id: 4,
    title: 'Bí Quyết Làm Đẹp Da Từ Thiên Nhiên',
    category: 'Làm đẹp',
    date: '01/11/2026',
    readTime: '6 phút',
    emoji: '✨',
    excerpt: 'Khám phá các công thức làm đẹp da từ thảo mộc tự nhiên mà các cô gái Việt xưa đã sử dụng...',
    content: 'Từ xưa, phụ nữ Việt Nam đã biết tận dụng các loại thảo mộc thiên nhiên để chăm sóc da. Những bí quyết này vẫn còn hiệu quả trong thời đại ngày nay...'
  },
  {
    id: 5,
    title: 'Review: Trải Nghiệm 30 Ngày Uống Trà Thảo Mộc',
    category: 'Review',
    date: '28/10/2026',
    readTime: '8 phút',
    emoji: '📝',
    excerpt: 'Nhật ký 30 ngày thay thế cà phê bằng trà thảo mộc – những thay đổi bất ngờ về sức khỏe và tinh thần...',
    content: 'Tôi quyết định thử thách bản thân bằng 30 ngày không cà phê, thay bằng trà thảo mộc. Và kết quả thật sự đáng kinh ngạc...'
  },
  {
    id: 6,
    title: 'Top 10 Nguyên Liệu Thảo Mộc Nên Có Trong Bếp',
    category: 'Hướng dẫn',
    date: '20/10/2026',
    readTime: '4 phút',
    emoji: '🫙',
    excerpt: 'Những nguyên liệu thảo mộc đa năng mà bạn nên trữ sẵn trong bếp để pha trà, nấu ăn và chăm sóc sức khỏe...',
    content: 'Một gian bếp thông minh không chỉ có gia vị thông thường mà còn cần những nguyên liệu thảo mộc đa năng...'
  }
];

// Format price to VND
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

// Toast notification
function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-icon">🍵</span><span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Generate product card HTML
function createProductCard(product) {
  return `
    <div class="product-card fade-in" data-id="${product.id}">
      <div class="product-image" style="background: linear-gradient(135deg, ${getGradient(product.id)})">
        ${product.badge ? `<span class="product-badge ${product.badge}">${getBadgeText(product.badge)}</span>` : ''}
        <div class="quick-actions">
          <button onclick="event.stopPropagation(); Cart.addItem({id:${product.id}, name:'${product.name.replace(/'/g, "\\'")}', price:${product.price}, emoji:'${product.emoji}'})" title="Thêm vào giỏ">🛒</button>
          <button title="Yêu thích">♡</button>
        </div>
        <span style="font-size:5rem">${product.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>
        <p class="product-desc">${product.desc}</p>
        <div class="product-rating">
          ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '☆' : ''}
          <span>(${product.reviews})</span>
        </div>
        <div class="product-bottom" style="margin-top:8px">
          <div class="product-price">
            ${formatPrice(product.price)}
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); Cart.addItem({id:${product.id}, name:'${product.name.replace(/'/g, "\\'")}', price:${product.price}, emoji:'${product.emoji}'})" title="Thêm vào giỏ">+</button>
        </div>
      </div>
    </div>
  `;
}

function getGradient(id) {
  const gradients = [
    '#FFF8E1, #FFECB3', '#E8F5E9, #C8E6C9', '#E3F2FD, #BBDEFB',
    '#FCE4EC, #F8BBD0', '#FFF3E0, #FFE0B2', '#F3E5F5, #E1BEE7',
    '#EFEBE9, #D7CCC8', '#E0F7FA, #B2EBF2'
  ];
  return gradients[(id - 1) % gradients.length];
}

function getBadgeText(badge) {
  const texts = { new: 'Mới', hot: 'Hot', sale: 'Sale' };
  return texts[badge] || '';
}

// Generate blog card HTML
function createBlogCard(post) {
  const bgColors = ['#E8F5E9, #A5D6A7', '#FFF3E0, #FFCC80', '#E3F2FD, #90CAF9', '#FCE4EC, #F48FB1', '#F3E5F5, #CE93D8', '#EFEBE9, #BCAAA4'];
  const gradient = bgColors[(post.id - 1) % bgColors.length];
  return `
    <div class="blog-card fade-in">
      <a href="blog.html#post-${post.id}">
        <div class="blog-card-image" style="background: linear-gradient(135deg, ${gradient})">
          <span>${post.emoji}</span>
          <span class="blog-tag">${post.category}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-meta">
            <span>📅 ${post.date}</span>
            <span>⏱ ${post.readTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <span class="read-more">Đọc thêm →</span>
        </div>
      </a>
    </div>
  `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  initNavbar();
  initScrollAnimations();
});
