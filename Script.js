let transactions = [];
let totalRevenue = 0;

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
};

document.getElementById('applyPromo').addEventListener('click', () => {
  const promo = document.getElementById('promo').value.trim();
  if (promo === 'ANNIVCAMERA') {
    alert("Promo diterapkan: Diskon 10%");
  } else {
    alert("Kode promo tidak valid.");
  }
});

document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const product = document.getElementById('product').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const method = document.querySelector('input[name="payment"]:checked').value;
  const promo = document.getElementById('promo').value.trim();

  if (!name || !email || quantity <= 0) {
    alert("Harap isi semua data dengan benar.");
    return;
  }

  let price = 0;
  switch (product) {
    case "Canon EOS R50": price = 9500000; break;
    case "Sony ZV-E10": price = 10500000; break;
    case "Fujifilm X-T30 II": price = 11200000; break;
    default: price = 1000000;
  }

  let total = price * quantity;
  if (promo === 'ANNIVCAMERA') total *= 0.9;

  transactions.push({ name, product, quantity, method, total });
  totalRevenue += total;

  updateTransactionDisplay();
  this.reset();
});

function updateTransactionDisplay() {
  const table = document.getElementById('transactionTable');
  table.innerHTML = '';

  transactions.forEach(t => {
    table.innerHTML += `
      <tr><td>${t.name}</td><td>${t.product}</td><td>${t.quantity}</td><td>${t.method}</td><td>Rp ${t.total.toLocaleString()}</td></tr>
    `;
  });

  document.getElementById('totalTransactions').innerText = transactions.length;
  document.getElementById('totalRevenue').innerText = totalRevenue.toLocaleString();
  document.getElementById('averageTransaction').innerText = (totalRevenue / transactions.length).toFixed(0).toLocaleString();
}