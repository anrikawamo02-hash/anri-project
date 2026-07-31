const jobData = {
  dancer: {
    name: "踊り子",
    english: "DANCER",
    available: true,
    patch: "正式確認前",
    hotbar: {
      current: [
        { trigger: "L2", slots: { up: ["△", "ファウンテン"], left: ["□", "カスケード"], right: ["○", "リバース"], down: ["×", "フォール"] } },
        { trigger: "R2", slots: { up: ["△", "サベッジ"], left: ["□", "シャワー"], right: ["○", "フラリッシュ"], down: ["×", "テクニカル"] } }
      ],
      recommended: []
    },
    requiredSkills: [],
    requiredSkillsVerified: false
  },
  reaper: {
    name: "リーパー",
    english: "REAPER",
    available: false,
    patch: "未登録",
    hotbar: { current: [], recommended: [] },
    requiredSkills: [],
    requiredSkillsVerified: false
  }
};

const rotationData = {
  single: { title: "単体 基本回し", patch: "正式確認前", steps: [["カスケード","基本①","assets/icons/jobs/dancer/skills/Cascade.png"],["ファウンテン","基本②","assets/icons/jobs/dancer/skills/Fountain.png"],["リバースカスケード","光ったら優先","assets/icons/jobs/dancer/skills/Reverse_Cascade.png"],["ファウンテンフォール","光ったら優先","assets/icons/jobs/dancer/skills/Fountainfall.png"],["扇の舞い","羽がある時","assets/icons/jobs/dancer/skills/Fan_Dance.png"],["剣の舞い","エスプリ50以上","assets/icons/jobs/dancer/skills/Saber_Dance.png"],["基本コンボへ戻る","くり返し","assets/icons/jobs/dancer/skills/Cascade.png"]], tip: "現在は表示確認用の仮データです。正式なレベル別回しは最新パッチ確認後に登録します♡" },
  aoe: { title: "範囲 基本回し", steps: [["敵が複数いるか確認","確認"],["範囲コンボ開始","仮"],["範囲コンボを継続","仮"],["光った範囲Proc","仮"],["ゲージ技を使う","仮"]], tip: "正式データは最新パッチ確認後に登録します♡" },
  opener: { title: "ボス戦 開幕回し", steps: [["カウントを確認","準備"],["事前準備を開始","開始前"],["戦闘開始に合わせる","0秒"],["最初のGCD","1手目"],["バフを合わせる","指定位置"]], tip: "正式な開幕回しは最新パッチ確認後に登録します♡" },
  burst: { title: "バースト練習", steps: [["バフの残り時間確認","準備"],["ゲージを確保","準備"],["バフ開始","合図"],["強い技を集中","連続"],["通常回しへ戻す","復帰"]], tip: "正式なバースト順は最新パッチ確認後に登録します♡" }
};

const bossData = {
  mechanic: { title: "ドーナツ攻撃 ♡", lead: "ボスの周りにドーナツ型の攻撃が発生！", action: "安全な場所へ移動！", detail: "攻撃範囲を見て、安全地帯へ早めに移動する。" },
  movement: { title: "踊り子の立ち回り ♡", lead: "遠隔物理DPSは移動しながら攻撃できる！", action: "避けながら回しを継続", detail: "移動開始の合図と、その間に押すボタンを表示する。" },
  mistake: { title: "よくあるミス ♡", lead: "欲張って移動開始が遅れると床ペロしやすい！", action: "まず安全を確保", detail: "危険な場面は攻撃継続よりも回避を優先する表示に切り替える。" }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let selectedJob = "dancer";
let selectedHotbarView = "current";

function renderRotation(key) {
  const data = rotationData[key];
  $("#rotationTitle").textContent = data.title;
  const patchLabel = $("#rotation .patch-row span");
  if (patchLabel) patchLabel.textContent = `対応パッチ：${data.patch || "正式確認前"}`;
  $("#rotationList").innerHTML = data.steps.map(([name, combo, icon]) => `<li><span>${name}</span><span class="combo">${combo}</span>${icon ? `<img class="skill-icon" src="${icon}" alt="" aria-hidden="true">` : `<span class="skill-orb" aria-hidden="true"></span>`}</li>`).join("");
  $("#rotationTip p").textContent = data.tip;
}

function renderBoss(key) {
  const data = bossData[key];
  $("#bossGuide").innerHTML = `<h4>${data.title}</h4><p>${data.lead}</p><div class="mechanic-visual"><div class="donut"><span>杏里</span></div><div class="mechanic-copy"><b>${data.action}</b><hr><p>${data.detail}</p></div></div>`;
}

function getRegisteredSkillNames(sets) {
  return sets.flatMap(set => Object.values(set.slots || {}).map(slot => slot?.[1]).filter(Boolean));
}

function renderHotbarSet(set) {
  const positions = ["up", "left", "right", "down"];
  const buttons = positions.map(position => {
    const slot = set.slots?.[position];
    return slot
      ? `<button class="skill ${position}">${slot[0]}<small>${slot[1]}</small></button>`
      : `<button class="skill ${position} is-empty" disabled>—<small>空き</small></button>`;
  }).join("");
  return `<div class="hotbar-set"><div class="trigger-label">${set.trigger}</div><div class="cross-pad" aria-label="${set.trigger}側ホットバー">${buttons}</div></div>`;
}

function renderDiagnosis(job, sets) {
  const box = $("#hotbarDiagnosis");
  const registered = new Set(getRegisteredSkillNames(sets));
  const missing = job.requiredSkills.filter(skill => !registered.has(skill.name));

  if (!job.requiredSkillsVerified) {
    box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list"><p class="diagnosis-item good">✓ ジョブ別に配置を読み込める構造へ変更済み♡</p><p class="diagnosis-item good">✓ 必須スキル一覧と現在配置を照合する診断エンジンを準備済み♡</p><p class="diagnosis-item info">正式な不足判定は、最新パッチの必須スキル一覧と杏里の実際の全ホットバーを登録してから開始します。</p></div>`;
    return;
  }

  box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">${missing.length === 0
    ? `<p class="diagnosis-item good">✓ 必須スキルはすべて登録されています♡</p>`
    : missing.map(skill => `<p class="diagnosis-item warning">⚠ <strong>${skill.name}</strong> が未登録です<br><small>${skill.reason}</small></p>`).join("")}</div>`;
}

function renderHotbar() {
  const job = jobData[selectedJob];
  $("#hotbarJobName").textContent = job.name;
  $("#profileJobName").textContent = job.name;
  $("#hotbarDataStatus").textContent = `パッチ：${job.patch}`;
  const sets = job.hotbar[selectedHotbarView] || [];
  $("#hotbarSets").innerHTML = sets.length ? sets.map(renderHotbarSet).join("") : `<div class="hotbar-empty">${selectedHotbarView === "recommended" ? "おすすめ配置は、杏里の実際の配置と最新パッチの必須スキルを確認後に作成します♡" : `${job.name}のホットバーデータはまだ登録されていません。`}</div>`;
  renderDiagnosis(job, sets);
}

let toastTimer;
function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2400); }
function scrollToTarget(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

$$('[data-target]').forEach(button => button.addEventListener('click', () => scrollToTarget(button.dataset.target)));
$$('.main-nav .nav-pill').forEach(button => button.addEventListener('click', () => { $$('.main-nav .nav-pill').forEach(item => item.classList.remove('active')); button.classList.add('active'); }));
$$('[data-toast]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
$$('[data-rotation]').forEach(button => button.addEventListener('click', () => { $$('#rotation .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderRotation(button.dataset.rotation); }));
$$('[data-boss]').forEach(button => button.addEventListener('click', () => { $$('#boss .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderBoss(button.dataset.boss); }));
$$('[data-hotbar-view]').forEach(button => button.addEventListener('click', () => { $$('#hotbar .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); selectedHotbarView = button.dataset.hotbarView; renderHotbar(); }));
$$('.job-card').forEach(button => button.addEventListener('click', () => {
  const nextJob = jobData[button.dataset.job];
  if (!nextJob?.available) { showToast(`${nextJob?.name || "このジョブ"}はデータ追加前です♡`); return; }
  selectedJob = button.dataset.job;
  $$('.job-card').forEach(item => item.classList.remove('selected'));
  button.classList.add('selected');
  renderHotbar();
  showToast(`${nextJob.name}を選択しました♡`);
}));

$("#registerHotbar").addEventListener("click", () => showToast("次の作業で、杏里の実際の全ホットバーを登録できる入力画面につなげます♡"));

$$('[data-theme]').forEach(button => button.addEventListener('click', () => { document.body.classList.remove('theme-purple','theme-black'); if (button.dataset.theme !== 'pink') document.body.classList.add(`theme-${button.dataset.theme}`); $$('.theme-dot').forEach(item => item.classList.remove('active')); button.classList.add('active'); localStorage.setItem('anriTheme', button.dataset.theme); }));
$$('[data-font]').forEach(button => button.addEventListener('click', () => { document.body.classList.remove('font-small','font-large'); if (button.dataset.font !== 'medium') document.body.classList.add(`font-${button.dataset.font}`); $$('.font-buttons button').forEach(item => item.classList.remove('active')); button.classList.add('active'); localStorage.setItem('anriFont', button.dataset.font); }));
$('#sparkleToggle').addEventListener('change', event => { document.body.classList.toggle('no-sparkle', !event.target.checked); localStorage.setItem('anriSparkle', event.target.checked ? 'on' : 'off'); });
const dialog = $('#helpDialog');
$('#openHelp').addEventListener('click', () => dialog.showModal());
$('#closeHelp').addEventListener('click', () => dialog.close());
$('#startGuide').addEventListener('click', () => { dialog.close(); scrollToTarget('jobs'); });
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

function restoreSettings() {
  const theme = localStorage.getItem('anriTheme') || 'pink';
  const font = localStorage.getItem('anriFont') || 'medium';
  const sparkle = localStorage.getItem('anriSparkle') !== 'off';
  document.querySelector(`[data-theme="${theme}"]`)?.click();
  document.querySelector(`[data-font="${font}"]`)?.click();
  $('#sparkleToggle').checked = sparkle;
  document.body.classList.toggle('no-sparkle', !sparkle);
}

renderRotation('single');
renderBoss('mechanic');
renderHotbar();
restoreSettings();
