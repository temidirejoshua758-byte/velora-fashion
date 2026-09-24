const WHATSAPP_NUMBER = "2348000000000"; // Replace with your real WhatsApp number, e.g. 2348012345678.

let cart = JSON.parse(localStorage.getItem("veloraCart") || "[]");

function saveCart() {
  localStorage.setItem("veloraCart", JSON.stringify(cart));
  renderCart();
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function addToCart(id, size = "One Size", quantity = 1) {
  const existing = cart.find(item => item.id === Number(id) && item.size === size);
  if (existing) existing.quantity += quantity;
  else cart.push({ id: Number(id), size, quantity });
  saveCart();
  openCart();
}

function removeFromCart(id, size) {
  cart = cart.filter(item => !(item.id === Number(id) && item.size === size));
  saveCart();
}

function changeQty(id, size, delta) {
  const item = cart.find(i => i.id === Number(id) && i.size === size);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) removeFromCart(id, size);
  else saveCart();
}

function renderCart() {
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = count;

  const itemsEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!itemsEl || !totalEl) return;

  if (!cart.length) {
    itemsEl.innerHTML = '<div class="empty-cart"><p>Your bag is empty.</p><a href="shop.html" class="text-link">Discover the collection →</a></div>';
    totalEl.textContent = formatNaira(0);
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(item => {
    const p = getProduct(item.id);
    const line = p.price * item.quantity;
    total += line;
    return `<div class="cart-item">
      <img src="${p.image}" alt="${p.name}">
      <div><strong>${p.name}</strong><small>${item.size} · ${formatNaira(p.price)}</small>
      <div class="qty"><button onclick="changeQty(${p.id}, '${item.size}', -1)">−</button><span>${item.quantity}</span><button onclick="changeQty(${p.id}, '${item.size}', 1)">+</button></div>
      <button class="remove" onclick="removeFromCart(${p.id}, '${item.size}')">Remove</button></div>
    </div>`;
  }).join("");
  totalEl.textContent = formatNaira(total);
}

function openCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); }
  if (backdrop) backdrop.classList.add("show");
}
function closeCart() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("drawerBackdrop");
  if (drawer) { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); }
  if (backdrop) backdrop.classList.remove("show");
}

function productCard(p) {
  return `<article class="product-card">
    <a href="product.html?id=${p.id}" class="product-image">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
    </a>
    <div class="product-info"><div><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><p>${p.category}</p></div><strong>${formatNaira(p.price)}</strong></div>
    <button class="quick-add" onclick="addToCart(${p.id}, '${p.sizes[0]}', 1)">Add to bag</button>
  </article>`;
}

function renderProducts(targetId, list) {
  const el = document.getElementById(targetId);
  if (el) el.innerHTML = list.map(productCard).join("");
}

function setupSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const panel = document.getElementById("searchPanel");
  const input = document.getElementById("globalSearch");
  if (!searchBtn || !panel || !input) return;
  searchBtn.addEventListener("click", () => { panel.classList.toggle("open"); if (panel.classList.contains("open")) input.focus(); });
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && input.value.trim()) window.location.href = `shop.html?search=${encodeURIComponent(input.value.trim())}`;
  });
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function setupCart() {
  document.getElementById("cartBtn")?.addEventListener("click", openCart);
  document.getElementById("closeCart")?.addEventListener("click", closeCart);
  document.getElementById("drawerBackdrop")?.addEventListener("click", closeCart);
  document.getElementById("whatsappCheckout")?.addEventListener("click", () => {
    if (!cart.length) return alert("Your bag is empty.");
    let total = 0;
    const lines = cart.map(item => {
      const p = getProduct(item.id); total += p.price * item.quantity;
      return `• ${p.name} — ${item.size} × ${item.quantity} — ${formatNaira(p.price * item.quantity)}`;
    });
    const message = `Hello VELORA, I would like to place an order:%0A%0A${encodeURIComponent(lines.join("\n"))}%0A%0A*Subtotal: ${formatNaira(total)}*%0A%0APlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  });
}

function setupNewsletter() {
  document.getElementById("newsletterForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const msg = document.getElementById("newsletterMessage");
    if (msg) msg.textContent = "Thank you — you're on the VELORA list.";
    e.target.reset();
  });
}

function setupContact() {
  document.getElementById("contactForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent("VELORA website enquiry");
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`);
    window.location.href = `mailto:hello@velora-fashion.com?subject=${subject}&body=${body}`;
    document.getElementById("contactMessage").textContent = "Your email app should open now.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupSearch(); setupMenu(); setupCart(); setupNewsletter(); setupContact();
  if (document.getElementById("featuredProducts")) renderProducts("featuredProducts", PRODUCTS.slice(0, 4));
});
