const LEVELS = [50, 60, 70, 80, 90, 100];

const createLevelRecord = () => ({
  requiredSkills: [],
  recommendedSkills: [],
  requiredSkillsVerified: false,
  sourcePatch: null,
  rotationSkillIds: {
    single: [],
    aoe: [],
    opener: [],
    burst: []
  }
});

const createLevelMap = () => Object.fromEntries(
  LEVELS.map(level => [level, createLevelRecord()])
);

const jobData = {
  dancer: {
    id: "dancer",
    name: "踊り子",
    english: "DANCER",
    available: true,
    dataStatus: "Patch 7.5対応",
    supportedLevels: [...LEVELS],
    levels: createLevelMap(),
    hotbarCurrentVerified: false,
    hotbar: {
      current: [
        {
          id: "set1-l2",
          set: "SET1",
          trigger: "L2",
          slots: {
            dpadUp: { button: "↑", skillId: "standard-step", name: "スタンダードステップ" },
            dpadLeft: { button: "←", skillId: "fan-dance", name: "扇の舞い【序】" },
            dpadRight: { button: "→", skillId: "en-avant", name: "アン・アヴァン" },
            dpadDown: { button: "↓", skillId: "second-wind", name: "内丹" },
            faceUp: { button: "△", skillId: "fountain", name: "ファウンテン" },
            faceLeft: { button: "□", skillId: "cascade", name: "カスケード" },
            faceRight: { button: "○", skillId: "reverse-cascade", name: "リバースカスケード" },
            faceDown: { button: "×", skillId: "fountainfall", name: "ファウンテンフォール" }
          }
        },
        {
          id: "set1-r2",
          set: "SET1",
          trigger: "R2",
          slots: {
            dpadUp: { button: "↑", skillId: "peloton", name: "プロトン" },
            dpadLeft: { button: "←", skillId: "head-graze", name: "ヘッドグレイズ" },
            dpadRight: { button: "→", skillId: "arms-length", name: "アームズレングス" },
            dpadDown: { button: "↓", skillId: "fan-dance-ii", name: "扇の舞い【破】" },
            faceUp: { button: "△", skillId: "bladeshower", name: "ブレードシャワー" },
            faceLeft: { button: "□", skillId: "windmill", name: "ウィンドミル" },
            faceRight: { button: "○", skillId: "rising-windmill", name: "ライジングウィンドミル" },
            faceDown: { button: "×", skillId: "bloodshower", name: "ブラッドシャワー" }
          }
        }
      ],
      recommended: []
    }
  },
  reaper: {
    id: "reaper",
    name: "リーパー",
    english: "REAPER",
    available: false,
    dataStatus: "未登録",
    supportedLevels: [70, 80, 90, 100],
    levels: createLevelMap(),
    hotbarCurrentVerified: false,
    hotbar: { current: [], recommended: [] }
  }
};


// Patch 7.5公式ジョブガイドを基準にした踊り子Lv50データ。
// 「requiredSkills」は通常のPvE戦闘で常時使える状態にしておきたい中核アクション、
// 「recommendedSkills」は場面依存だが登録を推奨する補助アクション。
jobData.dancer.levels[50] = {
  requiredSkillsVerified: true,
  sourcePatch: "7.5",
  requiredSkills: [
    { id: "cascade", name: "カスケード", level: 1, reason: "単体基本コンボの1段目" },
    { id: "fountain", name: "ファウンテン", level: 2, reason: "単体基本コンボの2段目" },
    { id: "windmill", name: "ウィンドミル", level: 15, reason: "範囲基本コンボの1段目" },
    { id: "standard-step", name: "スタンダードステップ", level: 15, reason: "自身の与ダメージ上昇を維持する中核アクション" },
    { id: "reverse-cascade", name: "リバースカスケード", level: 20, reason: "対称投擲Procの単体攻撃" },
    { id: "bladeshower", name: "ブレードシャワー", level: 25, reason: "範囲基本コンボの2段目" },
    { id: "fan-dance", name: "扇の舞い【序】", level: 30, reason: "幻扇を消費する単体アビリティ" },
    { id: "rising-windmill", name: "ライジングウィンドミル", level: 35, reason: "対称投擲Procの範囲攻撃" },
    { id: "fountainfall", name: "ファウンテンフォール", level: 40, reason: "非対称投擲Procの単体攻撃" },
    { id: "bloodshower", name: "ブラッドシャワー", level: 45, reason: "非対称投擲Procの範囲攻撃" },
    { id: "fan-dance-ii", name: "扇の舞い【破】", level: 50, reason: "幻扇を消費する範囲アビリティ" },
    { id: "en-avant", name: "アン・アヴァン", level: 50, reason: "回避と位置調整に使う移動アクション" },
    { id: "second-wind", name: "内丹", level: 8, reason: "自身を回復する生存用ロールアクション" },
    { id: "peloton", name: "プロトン", level: 20, reason: "非戦闘時のパーティ移動を補助" },
    { id: "head-graze", name: "ヘッドグレイズ", level: 24, reason: "中断可能な敵の詠唱を止める" },
    { id: "arms-length", name: "アームズレングス", level: 32, reason: "ノックバック・引き寄せ対策" }
  ],
  recommendedSkills: [
    { id: "leg-graze", name: "レッググレイズ", level: 6, reason: "ヘヴィが有効な特殊場面用" },
    { id: "foot-graze", name: "フットグレイズ", level: 10, reason: "バインドが有効な特殊場面用" }
  ],
  rotationSkillIds: {
    single: ["cascade", "fountain", "reverse-cascade", "fountainfall", "standard-step", "fan-dance"],
    aoe: ["windmill", "bladeshower", "rising-windmill", "bloodshower", "standard-step", "fan-dance-ii"],
    opener: [],
    burst: []
  }
};

const rotationData = {
  single: {
    title: "単体 基本回し",
    patch: "正式確認前",
    steps: [
      ["カスケード", "基本①", "assets/icons/jobs/dancer/skills/Cascade.png"],
      ["ファウンテン", "基本②", "assets/icons/jobs/dancer/skills/Fountain.png"],
      ["リバースカスケード", "光ったら優先", "assets/icons/jobs/dancer/skills/Reverse_Cascade.png"],
      ["ファウンテンフォール", "光ったら優先", "assets/icons/jobs/dancer/skills/Fountainfall.png"],
      ["扇の舞い", "羽がある時", "assets/icons/jobs/dancer/skills/Fan_Dance.png"],
      ["剣の舞い", "エスプリ50以上", "assets/icons/jobs/dancer/skills/Saber_Dance.png"],
      ["基本コンボへ戻る", "くり返し", "assets/icons/jobs/dancer/skills/Cascade.png"]
    ],
    tip: "現在は表示確認用の仮データです。正式なレベル別回しは最新パッチ確認後に登録します♡"
  },
  aoe: {
    title: "範囲 基本回し",
    steps: [["敵が複数いるか確認", "確認"], ["範囲コンボ開始", "仮"], ["範囲コンボを継続", "仮"], ["光った範囲Proc", "仮"], ["ゲージ技を使う", "仮"]],
    tip: "正式データは最新パッチ確認後に登録します♡"
  },
  opener: {
    title: "ボス戦 開幕回し",
    steps: [["カウントを確認", "準備"], ["事前準備を開始", "開始前"], ["戦闘開始に合わせる", "0秒"], ["最初のGCD", "1手目"], ["バフを合わせる", "指定位置"]],
    tip: "正式な開幕回しは最新パッチ確認後に登録します♡"
  },
  burst: {
    title: "バースト練習",
    steps: [["バフの残り時間確認", "準備"], ["ゲージを確保", "準備"], ["バフ開始", "合図"], ["強い技を集中", "連続"], ["通常回しへ戻す", "復帰"]],
    tip: "正式なバースト順は最新パッチ確認後に登録します♡"
  }
};

const bossData = {
  mechanic: { title: "ドーナツ攻撃 ♡", lead: "ボスの周りにドーナツ型の攻撃が発生！", action: "安全な場所へ移動！", detail: "攻撃範囲を見て、安全地帯へ早めに移動する。" },
  movement: { title: "踊り子の立ち回り ♡", lead: "遠隔物理DPSは移動しながら攻撃できる！", action: "避けながら回しを継続", detail: "移動開始の合図と、その間に押すボタンを表示する。" },
  mistake: { title: "よくあるミス ♡", lead: "欲張って移動開始が遅れると床ペロしやすい！", action: "まず安全を確保", detail: "危険な場面は攻撃継続よりも回避を優先する表示に切り替える。" }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let selectedJob = "dancer";
let selectedLevel = 100;
let selectedHotbarView = "current";

function getSelectedJob() {
  return jobData[selectedJob];
}

function getSelectedLevelData() {
  return getSelectedJob().levels[selectedLevel] || createLevelRecord();
}

function getRegisteredSkillIds(sets) {
  return new Set(
    sets.flatMap(set => Object.values(set.slots || {}))
      .map(slot => slot?.skillId)
      .filter(Boolean)
  );
}

function diagnoseHotbar(job, levelData, sets) {
  const registeredIds = getRegisteredSkillIds(sets);
  const missingRequired = levelData.requiredSkills.filter(skill => !registeredIds.has(skill.id));
  const rotationIds = new Set(Object.values(levelData.rotationSkillIds).flat());
  const missingFromRotations = [...rotationIds].filter(skillId => !registeredIds.has(skillId));
  return { missingRequired, missingFromRotations };
}

function renderRotation(key) {
  const data = rotationData[key];
  $("#rotationTitle").textContent = data.title;
  const patchLabel = $("#rotation .patch-row span");
  if (patchLabel) patchLabel.textContent = `対応パッチ：${data.patch || "正式確認前"}`;
  $("#rotationList").innerHTML = data.steps.map(([name, combo, icon]) => `
    <li><span>${name}</span><span class="combo">${combo}</span>${icon
      ? `<img class="skill-icon" src="${icon}" alt="" aria-hidden="true">`
      : `<span class="skill-orb" aria-hidden="true"></span>`}</li>`).join("");
  $("#rotationTip p").textContent = data.tip;
}

function renderBoss(key) {
  const data = bossData[key];
  $("#bossGuide").innerHTML = `<h4>${data.title}</h4><p>${data.lead}</p><div class="mechanic-visual"><div class="donut"><span>杏里</span></div><div class="mechanic-copy"><b>${data.action}</b><hr><p>${data.detail}</p></div></div>`;
}

function renderLevelOptions() {
  const job = getSelectedJob();
  const validLevels = job.supportedLevels.filter(level => job.levels[level]);
  if (!validLevels.includes(selectedLevel)) selectedLevel = validLevels.at(-1) || 100;
  $("#hotbarLevel").innerHTML = validLevels.map(level => `<option value="${level}"${level === selectedLevel ? " selected" : ""}>Lv${level}</option>`).join("");
}

function renderHotbarSet(set) {
  const directionSlots = ["dpadUp", "dpadLeft", "dpadRight", "dpadDown"];
  const faceSlots = ["faceUp", "faceLeft", "faceRight", "faceDown"];
  const renderRows = keys => keys.map(key => {
    const slot = set.slots?.[key];
    return `<div class="hotbar-slot-row">
      <span class="hotbar-slot-key">${slot?.button || "—"}</span>
      <span class="hotbar-slot-name">${slot?.name || "空き"}</span>
    </div>`;
  }).join("");

  return `<div class="hotbar-set">
    <div class="hotbar-set-title"><span>${set.set || "SET1"}・${set.trigger}</span><small>8枠</small></div>
    <div class="hotbar-side-grid">
      <div class="hotbar-half"><h4>方向キー側</h4><div class="hotbar-slot-list">${renderRows(directionSlots)}</div></div>
      <div class="hotbar-half"><h4>△□○×側</h4><div class="hotbar-slot-list">${renderRows(faceSlots)}</div></div>
    </div>
  </div>`;
}

function renderDiagnosis(job, levelData, sets) {
  const box = $("#hotbarDiagnosis");
  const result = diagnoseHotbar(job, levelData, sets);

  if (!levelData.requiredSkillsVerified) {
    box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">
      <p class="diagnosis-item good">✓ ジョブとレベルを切り替えて読み込める構造に対応済み♡</p>
      <p class="diagnosis-item good">✓ 必須スキルと回し使用スキルを別々に照合できる診断構造に対応済み♡</p>
      <p class="diagnosis-item info">Lv${selectedLevel}の正式データはまだ登録されていません。</p>
    </div>`;
    return;
  }

  if (!job.hotbarCurrentVerified && selectedHotbarView === "current") {
    const requiredNames = levelData.requiredSkills.map(skill => skill.name).join("・");
    const recommendedNames = levelData.recommendedSkills.map(skill => skill.name).join("・");
    box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">
      <p class="diagnosis-item good">✓ Lv${selectedLevel}の必須スキルデータをPatch ${levelData.sourcePatch}基準で登録済み♡</p>
      <p class="diagnosis-item info"><strong>必須 ${levelData.requiredSkills.length}個：</strong>${requiredNames}</p>
      ${recommendedNames ? `<p class="diagnosis-item info"><strong>場面別推奨 ${levelData.recommendedSkills.length}個：</strong>${recommendedNames}</p>` : ""}
      <p class="diagnosis-item warning">⚠ 現在表示中の配置は見本データです。杏里の実際の全ホットバーを登録するまで、不足判定は開始しません。</p>
    </div>`;
    return;
  }

  const warnings = [
    ...result.missingRequired.map(skill => `<p class="diagnosis-item warning">⚠ <strong>${skill.name}</strong> が未登録です<br><small>${skill.reason}</small></p>`),
    ...result.missingFromRotations.map(skillId => `<p class="diagnosis-item warning">⚠ 回しで使うスキル（ID: ${skillId}）がホットバーにありません</p>`)
  ];

  box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">${warnings.length
    ? warnings.join("")
    : `<p class="diagnosis-item good">✓ Lv${selectedLevel}で必要な登録済みスキルに不足はありません♡</p>`}</div>`;
}

function renderHotbar() {
  const job = getSelectedJob();
  const levelData = getSelectedLevelData();
  $("#hotbarJobName").textContent = job.name;
  $("#profileJobName").textContent = job.name;
  $("#hotbarDataStatus").textContent = `Lv${selectedLevel}・${job.dataStatus}`;
  const sets = job.hotbar[selectedHotbarView] || [];
  $("#hotbarSets").innerHTML = sets.length
    ? sets.map(renderHotbarSet).join("")
    : `<div class="hotbar-empty">${selectedHotbarView === "recommended"
      ? "おすすめ配置は、杏里の実際の配置と最新パッチの必須スキルを確認後に作成します♡"
      : `${job.name}のホットバーデータはまだ登録されていません。`}</div>`;
  renderDiagnosis(job, levelData, sets);
}

function selectJob(jobId) {
  const nextJob = jobData[jobId];
  if (!nextJob?.available) {
    showToast(`${nextJob?.name || "このジョブ"}はデータ追加前です♡`);
    return;
  }
  selectedJob = jobId;
  selectedLevel = nextJob.supportedLevels.at(-1) || 100;
  $$('.job-card').forEach(item => item.classList.toggle('selected', item.dataset.job === jobId));
  renderLevelOptions();
  renderHotbar();
  showToast(`${nextJob.name}を選択しました♡`);
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function scrollToTarget(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }


const HOTBAR_SLOT_META = [
  ["dpadUp", "方向キー ↑", "↑"], ["dpadLeft", "方向キー ←", "←"],
  ["dpadRight", "方向キー →", "→"], ["dpadDown", "方向キー ↓", "↓"],
  ["faceUp", "ボタン △", "△"], ["faceLeft", "ボタン □", "□"],
  ["faceRight", "ボタン ○", "○"], ["faceDown", "ボタン ×", "×"]
];

function getSkillOptions() {
  const levelData = getSelectedLevelData();
  const skills = [...levelData.requiredSkills, ...levelData.recommendedSkills];
  const unique = [...new Map(skills.map(skill => [skill.id, skill])).values()];
  return [{ id: "", name: "未設定" }, ...unique];
}

function findCurrentSet(trigger) {
  return getSelectedJob().hotbar.current.find(set => set.id === `set1-${trigger.toLowerCase()}`);
}

function renderRegistrationForm() {
  const options = getSkillOptions();
  const renderSide = trigger => {
    const set = findCurrentSet(trigger);
    const editors = HOTBAR_SLOT_META.map(([key, label]) => {
      const selectedId = set?.slots?.[key]?.skillId || "";
      const optionHtml = options.map(skill => `<option value="${skill.id}"${skill.id === selectedId ? " selected" : ""}>${skill.name}</option>`).join("");
      return `<div class="slot-editor"><label for="slot-${trigger}-${key}">${label}</label><select id="slot-${trigger}-${key}" data-trigger="${trigger}" data-slot-key="${key}">${optionHtml}</select></div>`;
    }).join("");
    return `<section class="registration-side"><h3>${trigger}側・8枠</h3><div class="slot-editor-grid">${editors}</div></section>`;
  };
  $("#hotbarRegistrationGrid").innerHTML = renderSide("L2") + renderSide("R2");
}

function openHotbarRegistration() {
  if (selectedJob !== "dancer") {
    showToast("このジョブの登録画面はまだ準備前です♡");
    return;
  }
  renderRegistrationForm();
  $("#hotbarDialog").showModal();
}

function saveHotbarRegistration() {
  const options = getSkillOptions();
  const skillMap = new Map(options.map(skill => [skill.id, skill]));
  ["L2", "R2"].forEach(trigger => {
    const set = findCurrentSet(trigger);
    HOTBAR_SLOT_META.forEach(([key, , button]) => {
      const select = $(`#slot-${trigger}-${key}`);
      const skill = skillMap.get(select.value);
      set.slots[key] = skill?.id ? { button, skillId: skill.id, name: skill.name } : { button, skillId: "", name: "空き" };
    });
  });
  localStorage.setItem(`anriHotbar-${selectedJob}-set1`, JSON.stringify(getSelectedJob().hotbar.current));
  $("#hotbarDialog").close();
  selectedHotbarView = "current";
  $$('#hotbar .tab').forEach(item => item.classList.toggle('active', item.dataset.hotbarView === 'current'));
  renderHotbar();
  showToast("SET1の16枠を保存しました♡");
}

function restoreSavedHotbar() {
  try {
    const saved = JSON.parse(localStorage.getItem(`anriHotbar-dancer-set1`));
    if (Array.isArray(saved) && saved.length === 2) jobData.dancer.hotbar.current = saved;
  } catch (error) {
    console.warn("保存済みホットバーを読み込めませんでした", error);
  }
}

$$('[data-target]').forEach(button => button.addEventListener('click', () => scrollToTarget(button.dataset.target)));
$$('.main-nav .nav-pill').forEach(button => button.addEventListener('click', () => { $$('.main-nav .nav-pill').forEach(item => item.classList.remove('active')); button.classList.add('active'); }));
$$('[data-toast]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
$$('[data-rotation]').forEach(button => button.addEventListener('click', () => { $$('#rotation .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderRotation(button.dataset.rotation); }));
$$('[data-boss]').forEach(button => button.addEventListener('click', () => { $$('#boss .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderBoss(button.dataset.boss); }));
$$('[data-hotbar-view]').forEach(button => button.addEventListener('click', () => { $$('#hotbar .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); selectedHotbarView = button.dataset.hotbarView; renderHotbar(); }));
$$('.job-card').forEach(button => button.addEventListener('click', () => selectJob(button.dataset.job)));
$("#hotbarLevel").addEventListener("change", event => { selectedLevel = Number(event.target.value); renderHotbar(); });
$("#registerHotbar").addEventListener("click", openHotbarRegistration);

$("#closeHotbarDialog").addEventListener("click", () => $("#hotbarDialog").close());
$("#hotbarForm").addEventListener("submit", event => { event.preventDefault(); saveHotbarRegistration(); });
$("#resetHotbarForm").addEventListener("click", () => { localStorage.removeItem(`anriHotbar-${selectedJob}-set1`); location.reload(); });
$("#hotbarDialog").addEventListener("click", event => { if (event.target === $("#hotbarDialog")) $("#hotbarDialog").close(); });

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

restoreSavedHotbar();
renderRotation('single');
renderBoss('mechanic');
renderLevelOptions();
renderHotbar();
restoreSettings();
