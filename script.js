const roles = {
  tank: [
    "Akai","Atlas","Baxia","Belerick","Chip","Edith","Franco","Gatotkaca",
    "Gloo","Hilda","Hylos","Johnson","Khufra","Lolita","Minotaur",
    "Tigreal","Uranus","Fredrinn","Barats","Grock"
  ],

  fighter: [
    "Aldous","Alucard","Alpha","Argus","Arlott","Badang","Balmond",
    "Benedetta","Chou","Cici","Dyrroth","Freya","Guinevere","Jawhead",
    "Kaja","Khaleed","Lapu-Lapu","Leomord","Martis","Masha","Minotaur",
    "Paquito","Phoveus","Roger","Ruby","Silvanna","Sun","Terizla",
    "Thamuz","X.Borg","Yu Zhong","Yin","Zilong","Aulus","Julian"
  ],

  assassin: [
    "Aamon","Benedetta","Fanny","Gusion","Hanzo","Harley","Hayabusa",
    "Helcurt","Joy","Karina","Lancelot","Ling","Mathilda",
    "Natalia","Nolan","Saber","Selena","Yi Sun-shin","Arlott"
  ],

  mage: [
    "Alice","Aurora","Cecilion","Chang'e","Cyclops","Eudora","Faramis",
    "Gord","Harith","Harley","Kadita","Kagura","Lunox","Lylia",
    "Luo Yi","Nana","Novaria","Odette","Pharsa","Valentina",
    "Vale","Valir","Vexana","Xavier","Yve","Zhask","Zetian"
  ],

  marksman: [
    "Beatrix","Bruno","Brody","Claude","Clint","Granger","Hanabi",
    "Irithel","Ixia","Karrie","Kimmy","Layla","Lesley","Melissa",
    "Moskov","Natan","Popol and Kupa","Roger","Wanwan","Yi Sun-shin"
  ],

  support: [
    "Angela","Carmilla","Diggie","Estes","Floryn","Kaja",
    "Mathilda","Rafaela","Minotaur","Faramis"
  ]
};

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

/* ================= WR ================= */
function hitungWR() {
  const wr = parseFloat(document.getElementById("wrInput").value);
  const match = parseInt(document.getElementById("matchInput").value);

  if (isNaN(wr) || isNaN(match)) {
    wrResult.innerText = "❌ Data belum lengkap";
    return;
  }

  const menang = Math.round((wr / 100) * match);
  const kalah = match - menang;

  wrResult.innerText =
    `📊 HASIL ANALISIS\n
✔ Menang : ${menang}
✖ Kalah : ${kalah}
★ WR    : ${wr}%`;
}

/* ================= TARGET WR ================= */
function targetWR() {
  const wrNowVal = parseFloat(document.getElementById("wrNow").value);
  const matchNowVal = parseInt(document.getElementById("matchNow").value);
  const wrTargetVal = parseFloat(document.getElementById("wrTarget").value);

  if (isNaN(wrNowVal) || isNaN(matchNowVal) || isNaN(wrTargetVal)) {
    targetResult.innerText = "❌ Data belum lengkap";
    return;
  }

  const winNow = (wrNowVal / 100) * matchNowVal;

  if (wrTargetVal <= wrNowVal) {
    targetResult.innerText = "✔ TARGET SUDAH TERCAPAI";
    return;
  }

  const need = Math.ceil(
    (wrTargetVal * matchNowVal - 100 * winNow) / (100 - wrTargetVal)
  );

  targetResult.innerText =
    `📈 PROYEKSI PUSH RANK\n
✔ Menang sekarang : ${Math.round(winNow)}
🔥 Butuh win lagi  : ${need}
⚔ Total match     : ${matchNowVal + need}`;
}

/* ================= RANDOM HERO SPIN ================= */
function randomHero() {
  const role = document.getElementById("role").value;
  const players = document.getElementById("players").value
    .split("\n")
    .map(p => p.trim())
    .filter(Boolean);

  const result = document.getElementById("heroResult");

  let pool = [];
  if (role === "all") {
    Object.values(roles).forEach(r => pool.push(...r));
  } else {
    pool = [...roles[role]];
  }

  if (players.length === 0) {
    result.innerText = "❌ Masukkan nama pemain";
    return;
  }

  if (players.length > pool.length) {
    result.innerText = "❌ Pemain terlalu banyak";
    return;
  }

  pool.sort(() => Math.random() - 0.5);

  result.innerText = "⚙ GENERATING HERO...\n\n";

  let index = 0;
  let progress = 0;
  const assigned = [];

  function typeLine(text, cb) {
    let i = 0;
    function typing() {
      if (i < text.length) {
        result.innerText += text.charAt(i);
        i++;
        setTimeout(typing, 18);
      } else {
        result.innerText += "\n";
        if (cb) cb();
      }
    }
    typing();
  }

  function progressBar() {
    let bar = "█".repeat(progress / 10) + "▓".repeat(10 - progress / 10);
    return `${bar} ${progress}%`;
  }

  function generateNext() {
    if (index >= players.length) {
      result.innerText += "\n" + progressBar() + "\n\n🎯 GENERATION COMPLETE";
      return;
    }

    const hero = pool.pop();
    assigned.push(hero);
    progress += Math.floor(100 / players.length);

    typeLine(`✔ ${players[index].padEnd(10," ")} → ${hero}`, () => {
      index++;
      setTimeout(generateNext, 160);
    });
  }

  setTimeout(generateNext, 500);
}
