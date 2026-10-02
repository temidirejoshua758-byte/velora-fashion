document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id") || "1";
  const p = getProduct(id);
  const target = document.getElementById("productDetail");
  if (!p || !target) return;

  target.innerHTML = `
    <div class="product-gallery"><img src="${p.image}" alt="${p.name}"></div>
    <div class="product-copy">
      <p class="eyebrow">${p.category} / VELORA</p>
      <h1>${p.name}</h1>
      <div class="product-price">${formatNaira(p.price)}</div>
      <p class="description">${p.description}</p>
      <label class="field-label">Size</label>
      <div class="size-options">${p.sizes.map((s,i)=>`<button class="size-option ${i===0?"selected":""}" data-size="${s}">${s}</button>`).join("")}</div>
      <label class="field-label">Quantity</label>
      <div class="quantity-control"><button id="minus">−</button><span id="qty">1</span><button id="plus">+</button></div>
      <button class="btn btn-dark full" id="addProduct">Add to bag</button>
      <div class="details-list"><details open><summary>Product details</summary><p>Designed for easy styling and repeat wear. Please allow for slight differences in colour due to screen settings.</p></details><details><summary>Delivery & returns</summary><p>Delivery times and return eligibility are confirmed after your order is received.</p></details></div>
    </div>`;

  let selectedSize = p.sizes[0], qty = 1;
  document.querySelectorAll(".size-option").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".size-option").forEach(b=>b.classList.remove("selected"));
    btn.classList.add("selected"); selectedSize = btn.dataset.size;
  }));
  document.getElementById("minus").onclick = () => { qty = Math.max(1, qty-1); document.getElementById("qty").textContent = qty; };
  document.getElementById("plus").onclick = () => { qty++; document.getElementById("qty").textContent = qty; };
  document.getElementById("addProduct").onclick = () => addToCart(p.id, selectedSize, qty);

  renderProducts("relatedProducts", PRODUCTS.filter(x => x.id !== p.id).slice(0, 4));
  document.title = `${p.name} — VELORA`;
});
