// Version 12 - Google Sheets + Email + Suggestions + Full UX

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwY2bIUxZEc4-OUs3NUEbqYtf0PaWoxzD4_WH0Xk4Fa8VnIeOei50ym4baDrlL-fs-4Sg/exec";

/* FORMAT */
function formatCurrency(num) {
  return "$" + Number(num).toLocaleString();
}

/* ANIMATION */
function animateValue(element, start, end, duration = 300) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = Math.min((timestamp - startTime) / duration, 1);
    let value = start + (end - start) * progress;
    element.innerText = formatCurrency(value);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* SLIDER TRACK */
function updateSliderBackground(slider) {
  let value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #007BFF ${value}%, #ddd ${value}%)`;
}

/* HEADLINE */
function updateLossHeadline(value) {
  const el = document.getElementById("lossHeadline");
  if (el) el.innerText = "You're losing " + formatCurrency(value) + "/month";
}

/* COMMISSION */
function calcCommissionLive() {
  let price = +document.getElementById('price')?.value || 0;
  let commission = +document.getElementById('commission')?.value || 0;
  let split = +document.getElementById('split')?.value || 0;

  let gross = price * (commission / 100);
  let net = gross * (split / 100);

  if (document.getElementById('priceVal')) {
    document.getElementById('priceVal').innerText = formatCurrency(price);
    document.getElementById('commissionVal').innerText = commission + "%";
    document.getElementById('splitVal').innerText = split + "%";

    animateValue(document.getElementById('gross'), 0, gross);
    animateValue(document.getElementById('net'), 0, net);

    document.getElementById('hiddenGross')?.setAttribute("value", gross);
    document.getElementById('hiddenNet')?.setAttribute("value", net);
  }
}

/* MISSED CALL */
function calcMissedCallsLive() {
  let calls = +document.getElementById('calls')?.value || 0;
  let missed = +document.getElementById('missed')?.value || 0;
  let close = +document.getElementById('close')?.value || 0;
  let avg = +document.getElementById('avg')?.value || 0;

  let lost = calls * (missed / 100) * (close / 100) * avg;

  if (document.getElementById('callsVal')) {
    document.getElementById('callsVal').innerText = calls;
    document.getElementById('missedVal').innerText = missed + "%";
    document.getElementById('closeVal').innerText = close + "%";
    document.getElementById('avgVal').innerText = formatCurrency(avg);

    animateValue(document.getElementById('lost'), 0, lost);
    updateLossHeadline(lost);

    document.getElementById('hiddenLost')?.setAttribute("value", lost);
  }
}

/* ROI */
function calcROILive() {
  let purchase = +document.getElementById('purchase')?.value || 0;
  let rehab = +document.getElementById('rehab')?.value || 0;
  let arv = +document.getElementById('arv')?.value || 0;
  let holding = +document.getElementById('holding')?.value || 0;
  let selling = +document.getElementById('selling')?.value || 0;

  let total = purchase + rehab + holding + selling;
  let profit = arv - total;
  let roi = total > 0 ? (profit / total) * 100 : 0;

  if (document.getElementById('purchaseVal')) {
    document.getElementById('purchaseVal').innerText = formatCurrency(purchase);
    document.getElementById('rehabVal').innerText = formatCurrency(rehab);
    document.getElementById('arvVal').innerText = formatCurrency(arv);
    document.getElementById('holdingVal').innerText = formatCurrency(holding);
    document.getElementById('sellingVal').innerText = formatCurrency(selling);

    animateValue(document.getElementById('profit'), 0, profit);
    document.getElementById('roi').innerText = roi.toFixed(1) + "%";

    document.getElementById('hiddenProfit')?.setAttribute("value", profit);
    document.getElementById('hiddenROI')?.setAttribute("value", roi.toFixed(1));
  }
}

/* GLOBAL */
function runAll() {
  calcCommissionLive();
  calcMissedCallsLive();
  calcROILive();
  document.querySelectorAll('input[type="range"]').forEach(updateSliderBackground);
}
document.addEventListener("input", runAll);
window.onload = runAll;

/* SUBMIT LEAD */
function submitLead(e) {
  e.preventDefault();

  const payload = {
    type: "lead",
    email: document.getElementById("email")?.value || "",
    lostRevenue: document.getElementById("hiddenLost")?.value || "",
    profit: document.getElementById("hiddenProfit")?.value || "",
    roi: document.getElementById("hiddenROI")?.value || ""
  };

  fetch(WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  }).then(() => alert("Results sent!"));
}

/* SUBMIT SUGGESTION */
function submitSuggestion() {
  const payload = {
    type: "suggestion",
    email: document.getElementById("suggestionEmail")?.value || "",
    suggestion: document.getElementById("suggestionText")?.value || ""
  };

  if (!payload.suggestion) return alert("Enter a suggestion");

  fetch(WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  }).then(() => {
    alert("Thanks for your feedback!");
    document.getElementById("suggestionText").value = "";
    document.getElementById("suggestionEmail").value = "";
  });
}