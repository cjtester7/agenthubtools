function formatCurrency(num) {
  return "$" + Number(num).toLocaleString();
}

function calcCommissionLive() {
  let price = parseFloat(document.getElementById('price').value) || 0;
  let commission = parseFloat(document.getElementById('commission').value) || 0;
  let split = parseFloat(document.getElementById('split').value) || 0;

  let gross = price * (commission / 100);
  let net = gross * (split / 100);

  // Update slider display values
  document.getElementById('priceVal').innerText = formatCurrency(price);
  document.getElementById('commissionVal').innerText = commission + "%";
  document.getElementById('splitVal').innerText = split + "%";

  // Update results
  document.getElementById('gross').innerText = formatCurrency(gross);
  document.getElementById('net').innerText = formatCurrency(net);
}

// 🔥 THIS IS THE IMPORTANT PART
// Run once when page loads
window.onload = function() {
  calcCommissionLive();
};