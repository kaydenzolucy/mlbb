const roles = {
  tank: ["Tigreal","Franco","Khufra","Atlas","Fredrinn","Chip"],
  fighter: ["Ruby","Yu Zhong","Paquito","Yin","Arlott","Cici"],
  assassin: ["Fanny","Ling","Lancelot","Aamon","Nolan","Joy"],
  mage: ["Kagura","Lunox","Xavier","Valentina","Novaria","Zetian"],
  marksman: ["Claude","Granger","Beatrix","Natan","Melissa","Ixia","Sora"],
  support: ["Rafaela","Estes","Diggie","Angela","Faramis","Floryn"]
};

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.style.display = "none");
  document.getElementById(id).style.display = "block";
}

function hitungWR() {
  const wr = parseFloat(wrInput.value);
  const match = parseInt(matchInput.value);
  const menang = Math.round((wr / 100) * match);
  const kalah = match - menang;

  wrResult.innerText =
    `✔ Menang : ${menang}\n✖ Kalah : ${kalah}\n★ WR : ${wr}%`;
}

function targetWR() {
  const wrNow = parseFloat(wrNow.value);
  const matchNow = parseInt(matchNow.value);
  const wrTargetVal = parseFloat(wrTarget.value);

  const winNow = (wrNow / 100) * matchNow;

  if (wrTargetVal <= wrNow) {
    targetResult.innerText = "✔ Target sudah tercapai";
    return;
  }

  const need = Math.ceil(
    (wrTargetVal * matchNow - 100 * winNow) / (100 - wrTargetVal)
  );

  targetResult.innerText =
    `Menang sekarang : ${Math.round(winNow)}\nButuh win : ${need}\nTotal match : ${matchNow + need}`;
}

function randomHero() {
  const role = document.getElementById("role").value;
  const players = document.getElementById("players").value
    .split("\n").filter(p => p.trim());

  let pool = [];
  if (role === "all") {
    Object.values(roles).forEach(r => pool.push(...r));
  } else {
    pool = [...roles[role]];
  }

  if (players.length > pool.length) {
    heroResult.innerText = "❌ Pemain terlalu banyak";
    return;
  }

  pool.sort(() => Math.random() - 0.5);

  let out = "⚡ HASIL ACAK ⚡\n\n";
  players.forEach(p => {
    out += `${p} ➜ ${pool.pop()}\n`;
  });

  heroResult.innerText = out;
}
