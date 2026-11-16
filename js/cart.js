// ===== MocAndChill - Cart Page JavaScript =====

function initCartPage() {
  renderCart();
}

function renderCart() {
  const items = Cart.getItems();
  const cartContainer = document.getElementById('cartItems');
  const summaryContainer = document.getElementById('cartSummary');

  if (!cartContainer || !summaryContainer) return;

  if (items.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🛒</div>
        <h2>Giỏ hàng trống</h2>
        <p>Hãy khám phá các sản phẩm thảo mộc tuyệt vời của chúng mình!</p>
        <a href="shop.html" class="btn btn-primary">🛍 Khám phá ngay</a>
      </div>
    `;
    summaryContainer.style.display = 'none';
    return;
  }

  summaryContainer.style.display = 'block';

  // Render cart items
  cartContainer.innerHTML = `
    <div class="cart-header">
      <span>Sản phẩm</span>
      <span>Đơn giá</span>
      <span>Số lượng</span>
      <span>Thành tiền</span>
      <span></span>
    </div>
    ${items.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-thumb">${item.emoji || (product ? product.emoji : '🍵')}</div>
            <div>
              <h4>${item.name}</h4>
              <p>${product ? product.category : ''}</p>
            </div>
          </div>
          <div class="item-price">${formatPrice(item.price)}</div>
          <div class="item-qty">
            <button onclick="updateCartQty(${item.id}, ${item.qty - 1})">−</button>
            <input type="number" value="${item.qty}" min="1" onchange="updateCartQty(${item.id}, parseInt(this.value))" readonly>
            <button onclick="updateCartQty(${item.id}, ${item.qty + 1})">+</button>
          </div>
          <div class="item-total">${formatPrice(item.price * item.qty)}</div>
          <button class="remove-item" onclick="removeCartItem(${item.id})" title="Xóa">✕</button>
        </div>
      `;
    }).join('')}
  `;

  // Render summary
  const subtotal = Cart.getTotal();
  const shipping = subtotal >= 300000 ? 0 : 30000;
  const total = subtotal + shipping;

  summaryContainer.innerHTML = `
    <h3>Tóm tắt đơn hàng</h3>
    <div class="summary-row">
      <span>Tạm tính (${Cart.getCount()} sản phẩm)</span>
      <span>${formatPrice(subtotal)}</span>
    </div>
    <div class="summary-row">
      <span>Phí vận chuyển</span>
      <span>${shipping === 0 ? '<span style="color:var(--primary);font-weight:600">Miễn phí</span>' : formatPrice(shipping)}</span>
    </div>
    ${shipping > 0 ? `
      <p style="font-size:0.8rem; color:var(--accent); margin:8px 0">
        🚚 Miễn phí ship cho đơn từ ${formatPrice(300000)}. Mua thêm ${formatPrice(300000 - subtotal)} nữa nhé!
      </p>
    ` : ''}
    <div class="promo-code">
      <input type="text" placeholder="Mã giảm giá" id="promoInput">
      <button class="btn btn-sm btn-secondary" onclick="applyPromo()">Áp dụng</button>
    </div>
    <div class="summary-row total">
      <span>Tổng cộng</span>
      <span>${formatPrice(total)}</span>
    </div>
    <button class="btn btn-primary" onclick="checkout()">
      🛍 Thanh toán
    </button>
    <a href="shop.html" style="display:block; text-align:center; margin-top:12px; font-size:0.9rem; color:var(--primary)">
      ← Tiếp tục mua sắm
    </a>
  `;
}

function updateCartQty(id, qty) {
  if (qty <= 0) {
    removeCartItem(id);
    return;
  }
  Cart.updateQty(id, qty);
  renderCart();
}

function removeCartItem(id) {
  Cart.removeItem(id);
  renderCart();
  showToast('🗑 Đã xóa sản phẩm khỏi giỏ hàng');
}

function applyPromo() {
  const input = document.getElementById('promoInput');
  if (!input) return;
  
  const code = input.value.trim().toUpperCase();
  if (code === 'MOCANDCHILL' || code === 'HERBAL10') {
    showToast('🎉 Áp dụng mã giảm giá thành công! Giảm 10%');
  } else if (code === '') {
    showToast('⚠️ Vui lòng nhập mã giảm giá');
  } else {
    showToast('❌ Mã giảm giá không hợp lệ');
  }
}

function checkout() {
  const items = Cart.getItems();
  if (items.length === 0) {
    showToast('⚠️ Giỏ hàng trống!');
    return;
  }
  
  // Show checkout modal
  showCheckoutModal();
}

function showCheckoutModal() {
  const modal = document.createElement('div');
  modal.id = 'checkoutModal';
  modal.style.cssText = `
    position:fixed; top:0; left:0; right:0; bottom:0;
    background:rgba(0,0,0,0.5); z-index:10000;
    display:flex; align-items:center; justify-content:center;
    padding:24px; backdrop-filter:blur(4px);
  `;

  const total = Cart.getTotal();
  const shipping = total >= 300000 ? 0 : 30000;

  modal.innerHTML = `
    <div style="background:white; border-radius:var(--radius); max-width:500px; width:100%; max-height:90vh; overflow-y:auto; padding:40px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px">
        <h2 style="font-family:var(--font-heading); color:var(--primary-dark)">Thông tin đặt hàng</h2>
        <button onclick="document.getElementById('checkoutModal').remove()" style="border:none; background:none; font-size:1.5rem; cursor:pointer">✕</button>
      </div>
      
      <form onsubmit="handleCheckout(event)">
        <div style="margin-bottom:16px">
          <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.9rem">Họ và tên *</label>
          <input type="text" required placeholder="Nguyễn Văn A" style="width:100%; padding:12px 16px; border:2px solid var(--border); border-radius:var(--radius-sm); font-family:var(--font-body); outline:none; font-size:0.95rem" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        
        <div style="margin-bottom:16px">
          <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.9rem">Số điện thoại *</label>
          <input type="tel" required placeholder="0912 345 678" style="width:100%; padding:12px 16px; border:2px solid var(--border); border-radius:var(--radius-sm); font-family:var(--font-body); outline:none; font-size:0.95rem" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        
        <div style="margin-bottom:16px">
          <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.9rem">Email</label>
          <input type="email" placeholder="email@example.com" style="width:100%; padding:12px 16px; border:2px solid var(--border); border-radius:var(--radius-sm); font-family:var(--font-body); outline:none; font-size:0.95rem" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        
        <div style="margin-bottom:16px">
          <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.9rem">Địa chỉ giao hàng *</label>
          <textarea required placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" rows="3" style="width:100%; padding:12px 16px; border:2px solid var(--border); border-radius:var(--radius-sm); font-family:var(--font-body); outline:none; resize:vertical; font-size:0.95rem" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'"></textarea>
        </div>
        
        <div style="margin-bottom:16px">
          <label style="display:block; font-weight:600; margin-bottom:6px; font-size:0.9rem">Ghi chú</label>
          <textarea placeholder="Lưu ý giao hàng, dị ứng..." rows="2" style="width:100%; padding:12px 16px; border:2px solid var(--border); border-radius:var(--radius-sm); font-family:var(--font-body); outline:none; resize:vertical; font-size:0.95rem" onfocus="this.style.borderColor='var(--primary)'" onblur="this.style.borderColor='var(--border)'"></textarea>
        </div>
        
        <div style="background:var(--bg); border-radius:var(--radius-sm); padding:16px; margin-bottom:20px">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem">
            <span>Tạm tính</span>
            <span>${formatPrice(total)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.9rem">
            <span>Vận chuyển</span>
            <span>${shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-weight:700; font-size:1.1rem; padding-top:8px; border-top:1px solid var(--border)">
            <span>Tổng</span>
            <span style="color:var(--accent)">${formatPrice(total + shipping)}</span>
          </div>
        </div>
        
        <div style="margin-bottom:20px">
          <label style="display:block; font-weight:600; margin-bottom:10px; font-size:0.9rem">Phương thức thanh toán</label>
          <label style="display:flex; align-items:center; gap:8px; padding:10px; border:2px solid var(--primary); border-radius:var(--radius-sm); margin-bottom:8px; cursor:pointer; background:#E8F5E9">
            <input type="radio" name="payment" value="cod" checked style="accent-color:var(--primary)"> 💵 Thanh toán khi nhận hàng (COD)
          </label>
          <label style="display:flex; align-items:center; gap:8px; padding:10px; border:2px solid var(--border); border-radius:var(--radius-sm); margin-bottom:8px; cursor:pointer">
            <input type="radio" name="payment" value="bank" style="accent-color:var(--primary)"> 🏦 Chuyển khoản ngân hàng
          </label>
          <label style="display:flex; align-items:center; gap:8px; padding:10px; border:2px solid var(--border); border-radius:var(--radius-sm); cursor:pointer">
            <input type="radio" name="payment" value="momo" style="accent-color:var(--primary)"> 📱 Ví MoMo / ZaloPay
          </label>
        </div>
        
        <button type="submit" class="btn btn-accent" style="width:100%; justify-content:center; font-size:1rem">
          ✅ Đặt hàng
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function handleCheckout(e) {
  e.preventDefault();
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.remove();

  Cart.clear();
  renderCart();
  
  showToast('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm tại MocAndChill!');

  // Show success message
  const cartContainer = document.getElementById('cartItems');
  if (cartContainer) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🎉</div>
        <h2>Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã tin tưởng MocAndChill. Chúng mình sẽ liên hệ xác nhận đơn hàng sớm nhé!</p>
        <a href="shop.html" class="btn btn-primary">🛍 Tiếp tục mua sắm</a>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', initCartPage);
