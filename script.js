// ===== NAVIGATION =====
function showPage(pageId, linkEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  if (linkEl) linkEl.classList.add('active');
  document.getElementById('navLinks').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageId === 'home') drawHero();
  if (pageId === 'materi') { drawUnsur(); drawKedudukan(); }
  if (pageId === 'visual') { updateSim(); updateSudut(); updatePers(); }
  if (pageId === 'latihan') buildLatihan();
  if (pageId === 'kuis') { /* ready */ }
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// ===== TABS =====
function showTab(tabId, btnEl) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  const tab = document.getElementById('tab-' + tabId);
  if (tab) tab.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
  if (tabId === 'unsur') drawUnsur();
  if (tabId === 'dualingkaran') drawKedudukan();
  if (window.MathJax) MathJax.typesetPromise();
}

// ===== HERO CANVAS =====
function drawHero() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 150, cy = 150, r = 110;
  ctx.clearRect(0, 0, 300, 300);

  // Background
  ctx.fillStyle = '#eff6ff';
  ctx.beginPath(); ctx.arc(cx, cy, 148, 0, Math.PI * 2); ctx.fill();

  // Circle
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

  // Diameter
  ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();

  // Radius
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(-0.6), cy + r * Math.sin(-0.6)); ctx.stroke();

  // Center
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();

  // Labels
  ctx.fillStyle = '#1e40af'; ctx.font = 'bold 13px Poppins, sans-serif';
  ctx.fillText('O', cx + 8, cy - 8);
  ctx.fillStyle = '#f97316';
  ctx.fillText('r', cx + r * 0.5 * Math.cos(-0.6) + 6, cy + r * 0.5 * Math.sin(-0.6) - 4);
  ctx.fillStyle = '#22c55e';
  ctx.fillText('d = 2r', cx - 28, cy - 10);

  // Animated arc
  const t = (Date.now() / 1000) % (Math.PI * 2);
  ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + t); ctx.stroke();
}

let heroAnim;
function startHeroAnim() {
  heroAnim = setInterval(drawHero, 30);
}
function stopHeroAnim() { clearInterval(heroAnim); }

// ===== UNSUR CANVAS =====
function drawUnsur() {
  const canvas = document.getElementById('unsurCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = 190, cy = 190, r = 140;
  ctx.clearRect(0, 0, 380, 380);

  ctx.fillStyle = '#f0f9ff';
  ctx.fillRect(0, 0, 380, 380);

  // Circle
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

  // Diameter (green)
  ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
  ctx.fillStyle = '#22c55e'; ctx.font = 'bold 12px Poppins,sans-serif';
  ctx.fillText('d', cx + r + 6, cy + 4);

  // Radius (blue)
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r * Math.cos(-0.8), cy + r * Math.sin(-0.8)); ctx.stroke();
  ctx.fillStyle = '#3b82f6';
  ctx.fillText('r', cx + r * 0.5 * Math.cos(-0.8) + 4, cy + r * 0.5 * Math.sin(-0.8) - 4);

  // Chord / Tali busur (orange)
  const p1x = cx + r * Math.cos(2.2), p1y = cy + r * Math.sin(2.2);
  const p2x = cx + r * Math.cos(0.5), p2y = cy + r * Math.sin(0.5);
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(p1x, p1y); ctx.lineTo(p2x, p2y); ctx.stroke();
  ctx.fillStyle = '#f97316';
  ctx.fillText('Tali Busur', p1x - 50, p1y + 16);

  // Apotema (purple) - perpendicular from center to chord
  const mx = (p1x + p2x) / 2, my = (p1y + p2y) / 2;
  ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(mx, my); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#a855f7';
  ctx.fillText('Apotema', cx + (mx - cx) * 0.5 + 4, cy + (my - cy) * 0.5 - 4);

  // Center (red)
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.font = 'bold 13px Poppins,sans-serif';
  ctx.fillText('O', cx + 8, cy - 8);

  // Arc label
  ctx.fillStyle = '#1e40af'; ctx.font = '12px Poppins,sans-serif';
  ctx.fillText('Busur', cx + r * Math.cos(-1.4) + 6, cy + r * Math.sin(-1.4));

  // Juring shading
  ctx.fillStyle = 'rgba(59,130,246,0.1)';
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, -0.8, 0.3); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#1e40af'; ctx.font = '11px Poppins,sans-serif';
  ctx.fillText('Juring', cx + 60, cy - 30);
}

// ===== KEDUDUKAN DUA LINGKARAN =====
function drawKedudukan() {
  drawKD('kd1', 'berpotongan');
  drawKD('kd2', 'luar');
  drawKD('kd3', 'dalam');
  drawKD('kd4', 'terpisah');
  drawKD('kd5', 'konsentris');
}

function drawKD(id, type) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 160, 160);
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 160, 160);
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2.5;

  if (type === 'berpotongan') {
    ctx.beginPath(); ctx.arc(65, 80, 45, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.beginPath(); ctx.arc(95, 80, 45, 0, Math.PI * 2); ctx.stroke();
  } else if (type === 'luar') {
    ctx.beginPath(); ctx.arc(50, 80, 38, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.beginPath(); ctx.arc(112, 80, 24, 0, Math.PI * 2); ctx.stroke();
  } else if (type === 'dalam') {
    ctx.beginPath(); ctx.arc(80, 80, 60, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.beginPath(); ctx.arc(100, 80, 22, 0, Math.PI * 2); ctx.stroke();
  } else if (type === 'terpisah') {
    ctx.beginPath(); ctx.arc(42, 80, 30, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.beginPath(); ctx.arc(118, 80, 28, 0, Math.PI * 2); ctx.stroke();
  } else if (type === 'konsentris') {
    ctx.beginPath(); ctx.arc(80, 80, 55, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = '#f97316';
    ctx.beginPath(); ctx.arc(80, 80, 28, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(80, 80, 4, 0, Math.PI * 2); ctx.fill();
  }
}

// ===== KALKULATORS =====
function hitungKeliling() {
  const r = parseFloat(document.getElementById('inputR').value);
  if (isNaN(r) || r <= 0) { clearResult(['hasilK','hasilL','hasilD']); return; }
  document.getElementById('hasilK').textContent = (2 * Math.PI * r).toFixed(2) + ' satuan';
  document.getElementById('hasilL').textContent = (Math.PI * r * r).toFixed(2) + ' satuan²';
  document.getElementById('hasilD').textContent = (2 * r).toFixed(2) + ' satuan';
}

function hitungBusur() {
  const r = parseFloat(document.getElementById('inputR2').value);
  const t = parseFloat(document.getElementById('inputTheta').value);
  if (isNaN(r) || isNaN(t) || r <= 0 || t <= 0) { clearResult(['hasilBusur','hasilJuring']); return; }
  document.getElementById('hasilBusur').textContent = ((t / 360) * 2 * Math.PI * r).toFixed(2) + ' satuan';
  document.getElementById('hasilJuring').textContent = ((t / 360) * Math.PI * r * r).toFixed(2) + ' satuan²';
}

function hitungTali() {
  const r = parseFloat(document.getElementById('inputR3').value);
  const t = parseFloat(document.getElementById('inputTheta2').value);
  if (isNaN(r) || isNaN(t) || r <= 0 || t <= 0) { clearResult(['hasilTali','hasilSegitiga']); return; }
  const tRad = (t * Math.PI) / 180;
  document.getElementById('hasilTali').textContent = (2 * r * Math.sin(tRad / 2)).toFixed(2) + ' satuan';
  document.getElementById('hasilSegitiga').textContent = (0.5 * r * r * Math.sin(tRad)).toFixed(2) + ' satuan²';
}

function hitungGS() {
  const p = parseFloat(document.getElementById('gsP').value);
  const R = parseFloat(document.getElementById('gsR').value);
  const r = parseFloat(document.getElementById('gsr').value);
  if (isNaN(p) || isNaN(R) || isNaN(r)) { clearResult(['hasilGSPL','hasilGSPD']); return; }
  const gspl = p * p - (R - r) * (R - r);
  const gspd = p * p - (R + r) * (R + r);
  document.getElementById('hasilGSPL').textContent = gspl >= 0 ? Math.sqrt(gspl).toFixed(2) + ' satuan' : 'Tidak valid';
  document.getElementById('hasilGSPD').textContent = gspd >= 0 ? Math.sqrt(gspd).toFixed(2) + ' satuan' : 'Tidak valid';
}

function clearResult(ids) {
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '—'; });
}

// ===== VISUAL: SIMULASI LINGKARAN =====
function updateSim() {
  const canvas = document.getElementById('simCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const r = parseInt(document.getElementById('rSlider').value);
  const color = document.getElementById('colorPicker').value;
  document.getElementById('rVal').textContent = r;
  const cx = 150, cy = 150;
  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 300, 300);

  // Grid
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  for (let i = 0; i <= 300; i += 30) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 300); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(300, i); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(300, cy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, 300); ctx.stroke();

  // Circle fill
  ctx.fillStyle = color + '22';
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

  // Circle stroke
  ctx.strokeStyle = color; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

  // Radius line
  ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy); ctx.stroke();

  // Center
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();

  // Labels
  ctx.fillStyle = '#1e293b'; ctx.font = 'bold 12px Poppins,sans-serif';
  ctx.fillText('O', cx + 6, cy - 6);
  ctx.fillStyle = '#ef4444';
  ctx.fillText('r = ' + r, cx + r / 2 - 10, cy - 8);

  // Info
  ctx.fillStyle = '#1e40af'; ctx.font = '11px Poppins,sans-serif';
  ctx.fillText('K = ' + (2 * Math.PI * r).toFixed(1), 8, 20);
  ctx.fillText('L = ' + (Math.PI * r * r).toFixed(1), 8, 36);
}

// ===== VISUAL: SIMULASI SUDUT =====
function updateSudut() {
  const canvas = document.getElementById('sudutCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const sudut = parseInt(document.getElementById('sudutSlider').value);
  document.getElementById('sudutVal').textContent = sudut;
  const cx = 150, cy = 150, r = 110;
  const tRad = (sudut * Math.PI) / 180;

  ctx.clearRect(0, 0, 300, 300);
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, 300, 300);

  // Juring fill
  ctx.fillStyle = 'rgba(59,130,246,0.15)';
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + tRad); ctx.closePath(); ctx.fill();

  // Circle
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();

  // Radii
  ctx.strokeStyle = '#1e40af'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(cx, cy);
  ctx.lineTo(cx + r * Math.sin(tRad), cy - r * Math.cos(tRad)); ctx.stroke();

  // Arc (busur)
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + tRad); ctx.stroke();

  // Angle arc
  ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, 28, -Math.PI / 2, -Math.PI / 2 + tRad); ctx.stroke();

  // Center
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();

  // Labels
  ctx.fillStyle = '#1e40af'; ctx.font = 'bold 13px Poppins,sans-serif';
  ctx.fillText('θ = ' + sudut + '°', cx + 32, cy - 8);

  // Info
  const busur = ((sudut / 360) * 2 * Math.PI * r).toFixed(1);
  const juring = ((sudut / 360) * Math.PI * r * r).toFixed(1);
  const keliling = (sudut / 2).toFixed(0);
  const infoEl = document.getElementById('sudutInfo');
  if (infoEl) {
    infoEl.innerHTML = `Panjang busur ≈ <b>${busur}</b> satuan<br>Luas juring ≈ <b>${juring}</b> satuan²<br>Sudut keliling = <b>${keliling}°</b>`;
  }
}

// ===== VISUAL: PERSAMAAN LINGKARAN =====
function updatePers() {
  const canvas = document.getElementById('persCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const a = parseFloat(document.getElementById('persA').value) || 0;
  const b = parseFloat(document.getElementById('persB').value) || 0;
  const r = parseFloat(document.getElementById('persR').value) || 3;
  const W = 340, H = 340;
  const scale = 28; // pixels per unit
  const ox = W / 2, oy = H / 2;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H);

  // Grid
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  for (let i = -6; i <= 6; i++) {
    ctx.beginPath(); ctx.moveTo(ox + i * scale, 0); ctx.lineTo(ox + i * scale, H); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, oy + i * scale); ctx.lineTo(W, oy + i * scale); ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(W, oy); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, H); ctx.stroke();

  // Axis labels
  ctx.fillStyle = '#94a3b8'; ctx.font = '10px Poppins,sans-serif';
  for (let i = -5; i <= 5; i++) {
    if (i !== 0) {
      ctx.fillText(i, ox + i * scale - 4, oy + 14);
      ctx.fillText(-i, ox + 4, oy + i * scale + 4);
    }
  }
  ctx.fillStyle = '#64748b'; ctx.font = 'bold 11px Poppins,sans-serif';
  ctx.fillText('x', W - 14, oy - 6);
  ctx.fillText('y', ox + 6, 14);

  // Circle fill
  ctx.fillStyle = 'rgba(59,130,246,0.12)';
  ctx.beginPath(); ctx.arc(ox + a * scale, oy - b * scale, r * scale, 0, Math.PI * 2); ctx.fill();

  // Circle
  ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(ox + a * scale, oy - b * scale, r * scale, 0, Math.PI * 2); ctx.stroke();

  // Center
  ctx.fillStyle = '#ef4444';
  ctx.beginPath(); ctx.arc(ox + a * scale, oy - b * scale, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ef4444'; ctx.font = 'bold 11px Poppins,sans-serif';
  ctx.fillText(`(${a},${b})`, ox + a * scale + 8, oy - b * scale - 6);

  // Radius line
  ctx.strokeStyle = '#f97316'; ctx.lineWidth = 2; ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(ox + a * scale, oy - b * scale);
  ctx.lineTo(ox + a * scale + r * scale, oy - b * scale); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#f97316'; ctx.font = '11px Poppins,sans-serif';
  ctx.fillText('r=' + r, ox + a * scale + r * scale / 2 - 8, oy - b * scale - 6);

  // Equation display
  const resultEl = document.getElementById('persResult');
  if (resultEl) {
    let eq = '';
    if (a === 0 && b === 0) {
      eq = `x² + y² = ${r}²`;
    } else {
      const aStr = a >= 0 ? `(x − ${a})` : `(x + ${Math.abs(a)})`;
      const bStr = b >= 0 ? `(y − ${b})` : `(y + ${Math.abs(b)})`;
      eq = `${aStr}² + ${bStr}² = ${r}²`;
    }
    resultEl.innerHTML = `<strong>Persamaan:</strong><br>${eq}<br><br><strong>Pusat:</strong> (${a}, ${b})<br><strong>Jari-jari:</strong> ${r}`;
  }
}

// ===== LATIHAN SOAL =====
const latihanData = [
  {
    num: 1, topik: 'Keliling & Luas',
    soal: 'Sebuah lingkaran memiliki jari-jari 14 cm. Hitunglah kelilingnya! (π = 22/7)',
    jawaban: '88', satuan: 'cm',
    pembahasan: 'K = 2πr = 2 × (22/7) × 14 = 2 × 44 = 88 cm'
  },
  {
    num: 2, topik: 'Keliling & Luas',
    soal: 'Hitunglah luas lingkaran dengan jari-jari 7 cm! (π = 22/7)',
    jawaban: '154', satuan: 'cm²',
    pembahasan: 'L = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²'
  },
  {
    num: 3, topik: 'Panjang Busur',
    soal: 'Lingkaran berjari-jari 10 cm dengan sudut pusat 72°. Hitunglah panjang busurnya! (π = 3,14)',
    jawaban: '12.56', satuan: 'cm',
    pembahasan: 's = (72/360) × 2 × 3,14 × 10 = (1/5) × 62,8 = 12,56 cm'
  },
  {
    num: 4, topik: 'Luas Juring',
    soal: 'Lingkaran berjari-jari 6 cm dengan sudut pusat 60°. Hitunglah luas juringnya! (π = 3,14)',
    jawaban: '18.84', satuan: 'cm²',
    pembahasan: 'L = (60/360) × 3,14 × 6² = (1/6) × 113,04 = 18,84 cm²'
  },
  {
    num: 5, topik: 'Sudut Keliling',
    soal: 'Sudut pusat AOB = 80°. Berapakah sudut keliling ACB yang menghadap busur AB?',
    jawaban: '40', satuan: '°',
    pembahasan: 'Sudut keliling = ½ × sudut pusat = ½ × 80° = 40°'
  },
  {
    num: 6, topik: 'Diameter',
    soal: 'Sebuah lingkaran memiliki diameter 28 cm. Berapakah jari-jarinya?',
    jawaban: '14', satuan: 'cm',
    pembahasan: 'r = d/2 = 28/2 = 14 cm'
  },
  {
    num: 7, topik: 'Persamaan Lingkaran',
    soal: 'Tentukan jari-jari lingkaran: x² + y² = 49',
    jawaban: '7', satuan: 'satuan',
    pembahasan: 'r² = 49, maka r = √49 = 7 satuan'
  },
  {
    num: 8, topik: 'Tali Busur',
    soal: 'Lingkaran berjari-jari 10 cm dengan sudut pusat 60°. Hitunglah panjang tali busurnya! (sin 30° = 0,5)',
    jawaban: '10', satuan: 'cm',
    pembahasan: 'AB = 2r sin(θ/2) = 2 × 10 × sin(30°) = 20 × 0,5 = 10 cm'
  }
];

function buildLatihan() {
  const container = document.getElementById('latihan-container');
  if (!container || container.dataset.built) return;
  container.dataset.built = '1';
  container.innerHTML = latihanData.map((item, i) => `
    <div class="latihan-item">
      <div class="soal-num">Soal ${item.num} — ${item.topik}</div>
      <div class="soal-text">${item.soal}</div>
      <div class="latihan-input">
        <input type="text" id="lat-input-${i}" placeholder="Jawaban..." onkeydown="if(event.key==='Enter')cekLatihan(${i})"/>
        <span>${item.satuan}</span>
        <button class="btn-check" onclick="cekLatihan(${i})">Cek Jawaban</button>
      </div>
      <div class="feedback" id="lat-fb-${i}"></div>
      <div class="pembahasan" id="lat-pb-${i}">💡 <strong>Pembahasan:</strong> ${item.pembahasan}</div>
    </div>
  `).join('');
}

function cekLatihan(i) {
  const input = document.getElementById('lat-input-' + i);
  const fb = document.getElementById('lat-fb-' + i);
  const pb = document.getElementById('lat-pb-' + i);
  const val = input.value.trim().replace(',', '.');
  const correct = latihanData[i].jawaban;
  fb.style.display = 'block';
  pb.style.display = 'block';
  if (Math.abs(parseFloat(val) - parseFloat(correct)) < 0.05) {
    fb.className = 'feedback correct';
    fb.textContent = '✅ Benar! Jawaban kamu tepat.';
  } else {
    fb.className = 'feedback wrong';
    fb.textContent = `❌ Kurang tepat. Jawaban yang benar: ${correct} ${latihanData[i].satuan}`;
  }
}

// ===== KUIS =====
const kuisData = [
  {
    soal: 'Sebuah lingkaran memiliki jari-jari 7 cm. Berapakah kelilingnya? (π = 22/7)',
    opsi: ['44 cm', '154 cm', '22 cm', '88 cm'],
    jawaban: 0,
    pembahasan: 'K = 2πr = 2 × (22/7) × 7 = 44 cm'
  },
  {
    soal: 'Luas lingkaran dengan diameter 14 cm adalah... (π = 22/7)',
    opsi: ['44 cm²', '154 cm²', '308 cm²', '616 cm²'],
    jawaban: 1,
    pembahasan: 'r = 7 cm, L = πr² = (22/7) × 49 = 154 cm²'
  },
  {
    soal: 'Sudut pusat AOB = 120°. Berapakah sudut keliling ACB yang menghadap busur yang sama?',
    opsi: ['120°', '240°', '60°', '30°'],
    jawaban: 2,
    pembahasan: 'Sudut keliling = ½ × sudut pusat = ½ × 120° = 60°'
  },
  {
    soal: 'Sudut keliling yang menghadap diameter lingkaran selalu bernilai...',
    opsi: ['45°', '180°', '60°', '90°'],
    jawaban: 3,
    pembahasan: 'Sudut keliling yang menghadap diameter selalu 90° (teorema Thales)'
  },
  {
    soal: 'Persamaan lingkaran berpusat di O(0,0) dengan jari-jari 5 adalah...',
    opsi: ['x + y = 5', 'x² + y² = 5', 'x² + y² = 25', '(x-5)² + (y-5)² = 25'],
    jawaban: 2,
    pembahasan: 'Persamaan lingkaran berpusat di O(0,0): x² + y² = r² = 5² = 25'
  },
  {
    soal: 'Titik P(3, 4) terhadap lingkaran x² + y² = 20 berada di...',
    opsi: ['Dalam lingkaran', 'Pada lingkaran', 'Luar lingkaran', 'Pusat lingkaran'],
    jawaban: 2,
    pembahasan: '3² + 4² = 9 + 16 = 25 > 20 = r², maka titik P berada di luar lingkaran'
  },
  {
    soal: 'Panjang busur lingkaran berjari-jari 10 cm dengan sudut pusat 90° adalah... (π = 3,14)',
    opsi: ['31,4 cm', '15,7 cm', '7,85 cm', '62,8 cm'],
    jawaban: 1,
    pembahasan: 's = (90/360) × 2 × 3,14 × 10 = ¼ × 62,8 = 15,7 cm'
  },
  {
    soal: 'Sifat garis singgung lingkaran adalah...',
    opsi: ['Sejajar dengan jari-jari', 'Tegak lurus dengan jari-jari di titik singgung', 'Melalui pusat lingkaran', 'Sama panjang dengan diameter'],
    jawaban: 1,
    pembahasan: 'Garis singgung selalu tegak lurus terhadap jari-jari pada titik singgung'
  },
  {
    soal: 'Dari persamaan x² + y² + 4x − 6y − 3 = 0, pusat lingkarannya adalah...',
    opsi: ['(4, -6)', '(-2, 3)', '(2, -3)', '(-4, 6)'],
    jawaban: 1,
    pembahasan: 'A = 4, B = -6. Pusat = (-A/2, -B/2) = (-4/2, 6/2) = (-2, 3)'
  },
  {
    soal: 'Dua lingkaran memiliki pusat yang sama disebut...',
    opsi: ['Berpotongan', 'Bersinggungan', 'Konsentris', 'Tidak berpotongan'],
    jawaban: 2,
    pembahasan: 'Dua lingkaran yang memiliki pusat yang sama disebut lingkaran konsentris'
  }
];

let kuisState = { current: 0, answers: [], started: false };

function startKuis() {
  kuisState = { current: 0, answers: new Array(kuisData.length).fill(null), started: true };
  document.getElementById('kuis-start').style.display = 'none';
  document.getElementById('kuis-result').style.display = 'none';
  document.getElementById('kuis-soal').style.display = 'block';
  renderKuisSoal();
}

function renderKuisSoal() {
  const i = kuisState.current;
  const soal = kuisData[i];
  const container = document.getElementById('kuis-soal');
  const pct = ((i) / kuisData.length) * 100;

  container.innerHTML = `
    <div class="kuis-progress">
      <div class="kuis-progress-bar"><div class="kuis-progress-fill" style="width:${pct}%"></div></div>
      <span>Soal ${i + 1} / ${kuisData.length}</span>
    </div>
    <div class="kuis-soal-card">
      <div class="soal-text">${i + 1}. ${soal.soal}</div>
      <div class="kuis-options">
        ${soal.opsi.map((op, j) => `
          <button class="kuis-option" id="opt-${j}" onclick="pilihOpsi(${j})">${String.fromCharCode(65 + j)}. ${op}</button>
        `).join('')}
      </div>
      <div class="kuis-nav">
        <button class="btn-next" id="btnNext" onclick="nextSoal()" disabled>
          ${i < kuisData.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil 🏆'}
        </button>
      </div>
    </div>
  `;
}

function pilihOpsi(j) {
  const i = kuisState.current;
  kuisState.answers[i] = j;
  document.querySelectorAll('.kuis-option').forEach((btn, idx) => {
    btn.classList.toggle('selected', idx === j);
  });
  document.getElementById('btnNext').disabled = false;
}

function nextSoal() {
  const i = kuisState.current;
  if (kuisState.answers[i] === null) return;
  if (i < kuisData.length - 1) {
    kuisState.current++;
    renderKuisSoal();
  } else {
    showKuisResult();
  }
}

function showKuisResult() {
  document.getElementById('kuis-soal').style.display = 'none';
  const resultEl = document.getElementById('kuis-result');
  resultEl.style.display = 'block';

  let benar = 0;
  kuisState.answers.forEach((ans, i) => { if (ans === kuisData[i].jawaban) benar++; });
  const skor = Math.round((benar / kuisData.length) * 100);
  let emoji = skor >= 80 ? '🏆' : skor >= 60 ? '👍' : '📚';
  let pesan = skor >= 80 ? 'Luar biasa! Kamu menguasai materi lingkaran!' : skor >= 60 ? 'Bagus! Terus belajar ya!' : 'Jangan menyerah, pelajari lagi materinya!';

  const detail = kuisData.map((soal, i) => {
    const isCorrect = kuisState.answers[i] === soal.jawaban;
    const userAns = kuisState.answers[i] !== null ? soal.opsi[kuisState.answers[i]] : 'Tidak dijawab';
    return `
      <div class="result-item-detail ${isCorrect ? 'correct' : 'wrong'}">
        <div class="q">${i + 1}. ${soal.soal}</div>
        <div class="ans">
          Jawabanmu: <strong>${userAns}</strong> ${isCorrect ? '✅' : '❌'}<br>
          ${!isCorrect ? `Jawaban benar: <strong>${soal.opsi[soal.jawaban]}</strong><br>` : ''}
          💡 ${soal.pembahasan}
        </div>
      </div>
    `;
  }).join('');

  resultEl.innerHTML = `
    <div class="result-card">
      <div style="font-size:3rem">${emoji}</div>
      <div class="result-score">${skor}</div>
      <div class="result-label">${pesan}</div>
      <div class="result-detail">
        <div class="result-stat"><div class="num green">${benar}</div><p>Benar</p></div>
        <div class="result-stat"><div class="num red">${kuisData.length - benar}</div><p>Salah</p></div>
        <div class="result-stat"><div class="num" style="color:#3b82f6">${kuisData.length}</div><p>Total Soal</p></div>
      </div>
      <button class="btn-primary" onclick="startKuis()" style="margin-bottom:24px">🔄 Ulangi Kuis</button>
      <div class="result-pembahasan">
        <h3>📋 Pembahasan Lengkap</h3>
        ${detail}
      </div>
    </div>
  `;
}

// ===== PARTICLE / BLINK-BLINK SYSTEM =====
const particles = [];
let pCanvas, pCtx;

function initParticles() {
  pCanvas = document.getElementById('particleCanvas');
  if (!pCanvas) return;
  pCtx = pCanvas.getContext('2d');
  resizeParticleCanvas();
  window.addEventListener('resize', resizeParticleCanvas);

  // Create stars
  for (let i = 0; i < 160; i++) {
    particles.push(createParticle());
  }
  animateParticles();
}

function resizeParticleCanvas() {
  if (!pCanvas) return;
  pCanvas.width  = window.innerWidth;
  pCanvas.height = window.innerHeight;
}

function createParticle(x, y) {
  const colors = [
    'rgba(147,197,253,',   // blue-300
    'rgba(196,181,253,',   // violet-300
    'rgba(249,168,212,',   // pink-300
    'rgba(255,255,255,',   // white
    'rgba(103,232,249,',   // cyan-300
    'rgba(167,243,208,',   // green-200
  ];
  return {
    x: x !== undefined ? x : Math.random() * window.innerWidth,
    y: y !== undefined ? y : Math.random() * window.innerHeight,
    r: Math.random() * 2.2 + 0.4,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random(),
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    alphaSpeed: Math.random() * 0.018 + 0.005,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    // occasional "shooting" twinkle
    twinkle: Math.random() > 0.85,
    twinklePhase: Math.random() * Math.PI * 2,
  };
}

function animateParticles() {
  if (!pCtx) return;
  pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);

  const t = Date.now() / 1000;

  particles.forEach((p, i) => {
    // Drift
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < -5) p.x = pCanvas.width + 5;
    if (p.x > pCanvas.width + 5) p.x = -5;
    if (p.y < -5) p.y = pCanvas.height + 5;
    if (p.y > pCanvas.height + 5) p.y = -5;

    // Blink
    p.alpha += p.alphaDir * p.alphaSpeed;
    if (p.alpha >= 1) { p.alpha = 1; p.alphaDir = -1; }
    if (p.alpha <= 0) { p.alpha = 0; p.alphaDir = 1; }

    let finalAlpha = p.alpha;
    let finalR = p.r;

    // Twinkle burst effect
    if (p.twinkle) {
      const pulse = Math.sin(t * 3 + p.twinklePhase);
      finalAlpha = Math.max(0, Math.min(1, p.alpha + pulse * 0.4));
      finalR = p.r * (1 + Math.max(0, pulse) * 0.8);
    }

    // Draw star (4-point cross for bigger ones, circle for small)
    pCtx.save();
    if (finalR > 1.8) {
      // 4-point sparkle
      pCtx.translate(p.x, p.y);
      pCtx.rotate(t * 0.5 + i);
      const len = finalR * 3;
      const grad = pCtx.createRadialGradient(0, 0, 0, 0, 0, len);
      grad.addColorStop(0, p.color + finalAlpha + ')');
      grad.addColorStop(1, p.color + '0)');
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.moveTo(0, -len); pCtx.lineTo(finalR * 0.3, -finalR * 0.3);
      pCtx.lineTo(len, 0);  pCtx.lineTo(finalR * 0.3, finalR * 0.3);
      pCtx.lineTo(0, len);  pCtx.lineTo(-finalR * 0.3, finalR * 0.3);
      pCtx.lineTo(-len, 0); pCtx.lineTo(-finalR * 0.3, -finalR * 0.3);
      pCtx.closePath();
      pCtx.fill();
    } else {
      // Simple glowing dot
      const grad = pCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, finalR * 2.5);
      grad.addColorStop(0, p.color + finalAlpha + ')');
      grad.addColorStop(1, p.color + '0)');
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, finalR * 2.5, 0, Math.PI * 2);
      pCtx.fill();
    }
    pCtx.restore();
  });

  requestAnimationFrame(animateParticles);
}

// ===== INIT =====
window.addEventListener('load', () => {
  initParticles();
  drawHero();
  startHeroAnim();
  if (window.MathJax) MathJax.typesetPromise();
});
