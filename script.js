// Version 10 - Capture Calculation Data with Leads

function formatCurrency(num) {
  return "$" + Number(num).toLocaleString();
}

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

function updateSliderBackground(slider) {
  let value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(to right, #007BFF ${value}%, #ddd ${value}%)`;
}

function updateLossHeadline(value) {
  const headline = document.getElementById("lossHeadline");
  if (!headline) return;
  headline.innerText = "You're losing " + formatCurrency(value) + "/month";
}

/* COMMISSION */
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

    animateValue(document.getElementById('gross'), 0, gross);
    animateValue(document.getElementById('net'), 0, net);

    // 🔥 STORE VALUES
    document.getElementById('hiddenGross')?.setAttribute("value", gross);
    document.getElementById('hiddenNet')?.setAttribute("value", net);
  }
}

/* MISSED CALL */
function calcMissedCallsLive() {
  let calls = parseFloat(document.getElementById('calls')?.value) || 0;
  let missed = parseFloat(document.getElementById('missed')?.value) || 0;
  let close = parseFloat(document.getElementById('close')?.value) || 0;
  let avg = parseFloat(document.getElementById('avg')?.value) || 0;

  let lost = calls * (missed / 100) * (close / 100) * avg;

  if (document.getElementById('callsVal')) {
    document.getElementById('callsVal').innerText = calls;
    document.getElementById('missedVal').innerText = missed + "%";
    document.getElementById('closeVal').innerText = close + "%";
    document.getElementById('avgVal').innerText = formatCurrency(avg);

    animateValue(document.getElementById('lost'), 0, lost);
    updateLossHeadline(lost);

    // 🔥 STORE VALUE
    document.getElementById('hiddenLost')?.setAttribute("value", lost);
  }
}

/* ROI */
function calcROILive() {
  let purchase = parseFloat(document.getElementById('purchase')?.value) || 0;
  let rehab = parseFloat(document.getElementById('rehab')?.value) || 0;
  let arv = parseFloat(document.getElementById('arv')?.value) || 0;
  let holding = parseFloat(document.getElementById('holding')?.value) || 0;
  let selling = parseFloat(document.getElementById('selling')?.value) || 0;

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

    // 🔥 STORE VALUES
    document.getElementById('hiddenProfit')?.setAttribute("value", profit);
    document.getElementById('hiddenROI')?.setAttribute("value", roi.toFixed(1));
  }
}

function runAll() {
  calcCommissionLive();
  calcMissedCallsLive();
  calcROILive();

  document.querySelectorAll('input[type="range"]').forEach(updateSliderBackground);
}

document.addEventListener("input", runAll);
window.onload = runAll;