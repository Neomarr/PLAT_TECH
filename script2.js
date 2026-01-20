let cart = [];

let currentCategory = 'All Categories';
let currentSearch = '';

document.querySelectorAll('.btn-success').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    const name = this.getAttribute('data-name');
    const price = this.getAttribute('data-price');
    const img = this.getAttribute('data-img');
    cart.push({name, price, img});
    updateCart();
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  });
});

function updateCart() {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = '';
  if (cart.length === 0) {
    modalBody.innerHTML = 'Your cart is empty.';
  } else {
    let total = 0;
    cart.forEach(item => {
      modalBody.innerHTML += `<div class="d-flex align-items-center mb-2">
        <img src="${item.img}" width="50" class="me-2">
        <span>${item.name} - $${item.price}</span>
      </div>`;
      total += parseFloat(item.price);
    });
    modalBody.innerHTML += `<hr><strong>Total: $${total.toFixed(2)}</strong>`;
  }
}

document.querySelectorAll('.dropdown-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    currentCategory = this.textContent.trim();
    filterItems();
  });
});

const searchForm = document.querySelector('form[role="search"]');
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  currentSearch = document.querySelector('input[type="search"]').value.trim().toLowerCase();
  filterItems();
});

function filterItems() {
  const cards = document.querySelectorAll('#col .col');
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    const matchesCategory = currentCategory === 'All Categories' || card.getAttribute('data-category') === currentCategory;
    const matchesSearch = currentSearch === '' || title.includes(currentSearch);
    card.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
  });
}