// Version 5 - Live Calculations + Fixes

function formatCurrency(num) {
  return "$" + Number(num).toLocaleString();
}

/* =========================
   COMMISSION
========================= */
function calcCommissionLive() {
  let price = parseFloat(document.getElementById('price')?.value) || 0;
  let commission = parseFloat(document.getElementById('commission')?.value) || 0;
  let split = parseFloat(document.getElementById('split')?.value) || 0;

  let gross = price * (commission / 100);
  let net = gross * (split / 100);

  if (document.getElementById('priceVal')) {
    document.getElementById('priceVal').innerText = formatCurrency(price);
    document.getElementById('commissionVal').innerText = commission + "%";
    document.getElementById('splitVal').innerText = split + "%";

    document.getElementById('gross').innerText = formatCurrency(gross);
    document.getElementById('net').innerText = formatCurrency(net);
  }
}

/* =========================
   MISSED CALLS (FIXED)
========================= */
function calcMissedCallsLive() {
  let calls = parseFloat(document.getElementById('calls')?.value) || 0;
  let missed = parseFloat(document.getElementById('missed')?.value) || 0;
  let close = parseFloat(document.getElementById('close')?.value) || 0;
  let avg = parseFloat(document.getElementById('avg')?.value) || 0;

  let missedCalls = calls * (missed / 100);
  let lostDeals = missedCalls * (close / 100);
  let lostRevenue = lostDeals * avg;

  if (document.getElementById('callsVal')) {
    document.getElementById('callsVal').innerText = calls;
    document.getElementById('missedVal').innerText = missed + "%";
    document.getElementById('closeVal').innerText = close + "%";
    document.getElementById('avgVal').innerText = formatCurrency(avg);

    document.getElementById('lost').innerText = formatCurrency(lostRevenue);
  }
}

/* =========================
   ROI
========================= */
function calcROILive() {
  let purchase = parseFloat(document.getElementById('purchase')?.value) || 0;
  let rehab = parseFloat(document.getElementById('rehab')?.value) || 0;
  let arv = parseFloat(document.getElementById('arv')?.value) || 0;
  let holding = parseFloat(document.getElementById('holding')?.value) || 0;
  let selling = parseFloat(document.getElementById('selling')?.value) || 0;

  let totalCost = purchase + rehab + holding + selling;
  let profit = arv - totalCost;
  let roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  if (document.getElementById('purchaseVal')) {
    document.getElementById('purchaseVal').innerText = formatCurrency(purchase);
    document.getElementById('rehabVal').innerText = formatCurrency(rehab);
    document.getElementById('arvVal').innerText = formatCurrency(arv);
    document.getElementById('holdingVal').innerText = formatCurrency(holding);
    document.getElementById('sellingVal').innerText = formatCurrency(selling);

    document.getElementById('profit').innerText = formatCurrency(profit);
    document.getElementById('roi').innerText = roi.toFixed(1) + "%";
  }
}

/* =========================
   GLOBAL FIX
========================= */
function runAllCalculations() {
  calcCommissionLive();
  calcMissedCallsLive();
  calcROILive();
}

/* 🔥 CRITICAL FIX */
document.addEventListener("input", runAllCalculations);
window.onload = runAllCalculations;