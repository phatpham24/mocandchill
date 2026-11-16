// ===== MocAndChill - Shop Page JavaScript =====

let currentFilter = 'all';
let currentSort = 'default';

function initShop() {
  renderProducts();
  initFilters();
  initSort();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  let products = [...PRODUCTS];

  // Apply category filter
  if (currentFilter !== 'all') {
    products = products.filter(p => p.category === currentFilter);
  }

  // Apply sort
  switch (currentSort) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      products.sort((a, b) => b.reviews - a.reviews);
      break;
  }

  // Update results count
  const countEl = document.querySelector('.results-count');
  if (countEl) {
    countEl.textContent = `Hiển thị ${products.length} sản phẩm`;
  }

  // Render products
  grid.innerHTML = products.map(p => createProductCard(p)).join('');

  // Add click event for product detail
  grid.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.quick-actions') || e.target.closest('.add-to-cart-btn')) return;
      const id = card.dataset.id;
      window.location.href = `product-detail.html?id=${id}`;
    });
  });

  // Re-init scroll animations
  initScrollAnimations();
}

function initFilters() {
  const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
      // Uncheck others in same group
      if (this.checked) {
        this.closest('.filter-group').querySelectorAll('input[type="checkbox"]').forEach(other => {
          if (other !== this) other.checked = false;
        });
        currentFilter = this.value;
      } else {
        currentFilter = 'all';
      }
      renderProducts();
    });
  });

  // Filter buttons (mobile-friendly)
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter;
      renderProducts();
    });
  });
}

function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      currentSort = this.value;
      renderProducts();
    });
  }
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('shopSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      const grid = document.getElementById('productsGrid');
      if (!grid) return;

      let products = [...PRODUCTS];

      if (query) {
        products = products.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query) ||
          p.tags.some(t => t.includes(query))
        );
      }

      if (currentFilter !== 'all') {
        products = products.filter(p => p.category === currentFilter);
      }

      grid.innerHTML = products.length
        ? products.map(p => createProductCard(p)).join('')
        : '<p style="text-align:center; grid-column:1/-1; padding:60px; color:var(--text-light)">Không tìm thấy sản phẩm nào 🔍</p>';

      const countEl = document.querySelector('.results-count');
      if (countEl) countEl.textContent = `Hiển thị ${products.length} sản phẩm`;

      initScrollAnimations();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initShop();
  initSearch();
});
