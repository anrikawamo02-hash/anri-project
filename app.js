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
  50: {
    single: {
      title: "単体 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "2つのステップを正しい順で踏み、スタンダードフィニッシュまで完了。Lv50では最優先の強い攻撃で、自分の与ダメージ上昇も維持します。" },
        { name: "Procが光っているか確認", cue: "先に確認", icon: "Reverse_Cascade.png", reason: "光っている技を先に使うと、次の基本技で新しいProcを上書きして失う事故を防げます。" },
        { name: "カスケード", cue: "基本①", icon: "Cascade.png", reason: "単体コンボの開始。対称投擲Procが付いたら、次のカスケードより先にリバースカスケードを使います。" },
        { name: "リバースカスケード", cue: "光ったら", icon: "Reverse_Cascade.png", reason: "対称投擲Procを消費。幻扇が増える可能性があります。" },
        { name: "ファウンテン", cue: "基本②", icon: "Fountain.png", reason: "カスケードからつなぐ2段目。非対称投擲Procが付く可能性があります。" },
        { name: "ファウンテンフォール", cue: "光ったら", icon: "Fountainfall.png", reason: "非対称投擲Procを消費。幻扇が増える可能性があります。" },
        { name: "扇の舞い【序】", cue: "羽を消費", icon: "Fan_Dance.png", reason: "単体用の挟み込み技。幻扇が4枚なら、Proc技を使う前に1枚消費して溢れを防ぎます。" }
      ],
      tip: "覚え方は『スタンダードステップを30秒ごと → 光ったProcを先に消費 → カスケード → リバースProc → ファウンテン → ファウンテンProc』。基本は1→3→2→4の感覚です♡"
    },
    aoe: {
      title: "範囲 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "敵が2体以上いるか確認", cue: "切替条件", icon: "Windmill.png", reason: "Lv50踊り子は2体以上なら範囲コンボを使います。敵の近くで当てる5m円範囲です。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "範囲でも最優先。ステップを2つ踏んでスタンダードフィニッシュまで完了します。" },
        { name: "Procが光っているか確認", cue: "先に確認", icon: "Rising_Windmill.png", reason: "光った範囲Procを先に消費し、基本技による上書きを防ぎます。" },
        { name: "ウィンドミル", cue: "範囲①", icon: "Windmill.png", reason: "範囲コンボの開始。対称投擲Procが付く可能性があります。" },
        { name: "ライジングウィンドミル", cue: "光ったら", icon: "Rising_Windmill.png", reason: "対称投擲Procの範囲攻撃。幻扇が増える可能性があります。" },
        { name: "ブレードシャワー", cue: "範囲②", icon: "Bladeshower.png", reason: "ウィンドミルからつなぐ2段目。非対称投擲Procが付く可能性があります。" },
        { name: "ブラッドシャワー", cue: "光ったら", icon: "Bloodshower.png", reason: "非対称投擲Procの範囲攻撃。幻扇が増える可能性があります。" },
        { name: "扇の舞い【破】", cue: "羽を消費", icon: "Fan_Dance_II.png", reason: "2体以上に当たる範囲用の挟み込み技。幻扇4枚になる前に使います。" }
      ],
      tip: "2体以上は『ウィンドミル → 光ったらライジング → ブレードシャワー → 光ったらブラッド』。幻扇は扇の舞い【破】で使います♡"
    },
    opener: {
      title: "Lv50 ボス開幕",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "スタンダードステップ開始", cue: "約-15秒以内", icon: "Standard_Step.png", reason: "戦闘前にステップを始め、攻撃しない2つのステップを先に済ませます。開始から15秒以内にフィニッシュできるようにします。" },
        { name: "表示された1つ目のステップ", cue: "準備", icon: "Emboite.png", reason: "画面に表示された色・記号と同じステップを押します。固定順ではありません。" },
        { name: "表示された2つ目のステップ", cue: "準備", icon: "Entrechat.png", reason: "2つ目も表示どおりに押します。" },
        { name: "スタンダードフィニッシュ", cue: "戦闘開始", icon: "Standard_Finish.png", reason: "ボスを攻撃できる瞬間に合わせて完了。大きな初撃と自分の与ダメージ上昇を同時に得ます。" },
        { name: "Proc優先の単体基本回し", cue: "その後", icon: "Cascade.png", reason: "フィニッシュ後は、光ったProcを先に使いながら1→3→2→4の基本回しへ移ります。" },
        { name: "扇の舞い【序】", cue: "羽が4枚前", icon: "Fan_Dance.png", reason: "幻扇が最大になる前に挟み、以後はスタンダードステップを30秒ごとに使います。" }
      ],
      tip: "Lv50にはテクニカルステップや攻撃バフのまとまった2分開幕はまだありません。戦闘前にスタンダードステップの2手を済ませ、開始にフィニッシュを合わせるのが中心です♡"
    },
    burst: {
      title: "Lv50 火力を出すタイミング",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "スタンダードステップ", cue: "最優先", icon: "Standard_Step.png", reason: "Lv50で最も分かりやすい火力の山。30秒ごとに遅らせず使います。" },
        { name: "2ステップを正しく入力", cue: "表示どおり", icon: "Jete.png", reason: "間違えず2つ踏むことで最大のスタンダードフィニッシュになります。" },
        { name: "スタンダードフィニッシュ", cue: "強い一撃", icon: "Standard_Finish.png", reason: "強い攻撃と与ダメージ上昇を更新します。" },
        { name: "光ったProcを優先", cue: "上書き防止", icon: "Fountainfall.png", reason: "Procを残したまま対応する基本技を押さず、取りこぼしを防ぎます。" },
        { name: "扇の舞いを挟む", cue: "羽4枚前", icon: "Fan_Dance.png", reason: "Lv50では大きな2分バースト用に長く貯め込むより、4枚で溢れない管理を優先します。" },
        { name: "通常回しへ戻る", cue: "くり返し", icon: "Cascade.png", reason: "次の30秒スタンダードステップまで、単体または範囲の基本回しを続けます。" }
      ],
      tip: "Lv50には独立した大きなバーストボタンがまだ少ないため、『スタンダードステップを遅らせない・Procを失わない・羽を溢れさせない』の3つが火力の基本です♡"
    }
  }
};

function getRotationData(level, key) {
  const exact = rotationData[level]?.[key];
  if (exact) return exact;
  return {
    title: `${key === "single" ? "単体" : key === "aoe" ? "範囲" : key === "opener" ? "開幕" : "バースト"} 回し`,
    patch: "未登録",
    verified: false,
    steps: [],
    tip: `Lv${level}の正式な回しはまだ登録していません。Lv50から順番に追加します♡`
  };
}

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
let selectedRotation = "single";

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

function renderRotation(key = selectedRotation) {
  selectedRotation = key;
  const data = getRotationData(selectedLevel, key);
  $("#rotationTitle").textContent = `Lv${selectedLevel}・${data.title}`;
  const patchLabel = $("#rotation .patch-row span");
  if (patchLabel) patchLabel.textContent = `対応パッチ：${data.patch}`;
  $("#rotationList").classList.toggle("rotation-empty", !data.steps.length);
  $("#rotationList").innerHTML = data.steps.length
    ? data.steps.map(step => {
        const icon = step.icon ? `assets/icons/jobs/dancer/skills/${step.icon}` : "";
        return `<li>
          <span class="rotation-step-main"><b>${step.name}</b><small>${step.reason}</small></span>
          <span class="combo">${step.cue}</span>
          ${icon ? `<img class="skill-icon" src="${icon}" alt="" aria-hidden="true">` : `<span class="skill-orb" aria-hidden="true"></span>`}
        </li>`;
      }).join("")
    : `<li class="empty-rotation-message"><span>Lv${selectedLevel}の正式データは次の作業で追加します♡</span></li>`;
  $("#rotationTip b").textContent = data.verified ? "杏里の覚え方♡" : "登録状況";
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
  const options = validLevels.map(level => `<option value="${level}"${level === selectedLevel ? " selected" : ""}>Lv${level}</option>`).join("");
  $("#hotbarLevel").innerHTML = options;
  $("#rotationLevel").innerHTML = options;
}

function changeSharedLevel(nextLevel) {
  const job = getSelectedJob();
  const level = Number(nextLevel);
  if (!job.supportedLevels.includes(level)) return;
  selectedLevel = level;
  localStorage.setItem(`anriDisplayLevel-${selectedJob}`, String(level));
  renderLevelOptions();
  renderRotation(selectedRotation);
  renderHotbar();
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
  const savedLevel = Number(localStorage.getItem(`anriDisplayLevel-${jobId}`));
  selectedLevel = nextJob.supportedLevels.includes(savedLevel) ? savedLevel : (nextJob.supportedLevels.at(-1) || 100);
  $$('.job-card').forEach(item => item.classList.toggle('selected', item.dataset.job === jobId));
  renderLevelOptions();
  renderRotation(selectedRotation);
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



// v6: SET1〜SET3・WXHB・拡張XHBをコントローラー型で管理
const HOTBAR_GROUPS = [
  { id: "set1", label: "SET1（通常）", note: "普段いちばん使う通常クロスホットバー", sides: [["L2", "set1-l2"], ["R2", "set1-r2"]] },
  { id: "set2", label: "SET2（通常）", note: "SET切替で使う2枚目のクロスホットバー", sides: [["L2", "set2-l2"], ["R2", "set2-r2"]] },
  { id: "set3", label: "SET3（通常）", note: "SET切替で使う3枚目のクロスホットバー", sides: [["L2", "set3-l2"], ["R2", "set3-r2"]] },
  { id: "wxhb", label: "WXHB（2回押し）", note: "L2またはR2を素早く2回押して呼び出す下側のホットバー", sides: [["L2×2", "wxhb-l2"], ["R2×2", "wxhb-r2"]] },
  { id: "expanded", label: "拡張クロスホットバー", note: "L2とR2を順番に押して呼び出す追加ホットバー", sides: [["L2→R2", "expanded-l2r2"], ["R2→L2", "expanded-r2l2"]] }
];
let selectedRegistrationGroup = "set1";

const SKILL_ICON_BY_ID = {
  "cascade":"Cascade.png","fountain":"Fountain.png","reverse-cascade":"Reverse_Cascade.png","fountainfall":"Fountainfall.png",
  "windmill":"Windmill.png","bladeshower":"Bladeshower.png","rising-windmill":"Rising_Windmill.png","bloodshower":"Bloodshower.png",
  "standard-step":"Standard_Step.png","fan-dance":"Fan_Dance.png","fan-dance-ii":"Fan_Dance_II.png","en-avant":"En_Avant.png",
  "second-wind":"Second_Wind.png","peloton":"Peloton.png","head-graze":"Head_Graze.png","arms-length":"Arm's_Length.png",
  "leg-graze":"Leg_Graze.png","foot-graze":"Foot_Graze.png"
};
function skillIcon(skillId){ const f=SKILL_ICON_BY_ID[skillId]; return f ? `assets/icons/jobs/dancer/skills/${f}` : ""; }
function emptySlots(){ return Object.fromEntries(HOTBAR_SLOT_META.map(([k,,b])=>[k,{button:b,skillId:"",name:"空き"}])); }
function ensureAllHotbarGroups(){
  const job=getSelectedJob(); if(!job?.hotbar) return;
  HOTBAR_GROUPS.flatMap(g=>g.sides).forEach(([trigger,id])=>{
    if(!job.hotbar.current.some(set=>set.id===id)) job.hotbar.current.push({id,set:id.split('-')[0].toUpperCase(),trigger,slots:emptySlots()});
  });
}
function getSetById(id){ ensureAllHotbarGroups(); return getSelectedJob().hotbar.current.find(set=>set.id===id); }
function findCurrentSet(trigger){
  const group=HOTBAR_GROUPS.find(g=>g.id===selectedRegistrationGroup) || HOTBAR_GROUPS[0];
  const side=group.sides.find(([label])=>label===trigger);
  return side ? getSetById(side[1]) : null;
}
function renderSlotTile(slot,key,editable=false,options=[]){
  const pos=key.endsWith('Up')?'up':key.endsWith('Left')?'left':key.endsWith('Right')?'right':'down';
  const icon=skillIcon(slot?.skillId); const name=slot?.name||'空き'; const button=slot?.button||'—';
  const media=icon ? `<img src="${icon}" alt="${name}" onerror="this.remove()">` : `<span class="slot-fallback">${name==='空き'?'空き':name}</span>`;
  const select=editable ? `<select data-slot-key="${key}" aria-label="${button}に登録するスキル">${options.map(sk=>`<option value="${sk.id}"${sk.id===(slot?.skillId||'')?' selected':''}>${sk.name}</option>`).join('')}</select>` : '';
  return `<div class="cross-slot pos-${pos}${editable?' editable-slot':''}">${media}<span class="skill-caption">${name}</span><span class="button-mark">${button}</span>${select}</div>`;
}
function renderControllerSide(set,trigger,editable=false,options=[]){
  const d=['dpadUp','dpadLeft','dpadRight','dpadDown']; const f=['faceUp','faceLeft','faceRight','faceDown'];
  return `<section class="controller-side"><span class="trigger-badge">${trigger}</span><div class="controller-clusters"><div class="cross-pad">${d.map(k=>renderSlotTile(set?.slots?.[k],k,editable,options)).join('')}</div><div class="cross-pad">${f.map(k=>renderSlotTile(set?.slots?.[k],k,editable,options)).join('')}</div></div></section>`;
}
function renderHotbarSet(group){
  const sides=group.sides.map(([trigger,id])=>renderControllerSide(getSetById(id),trigger)).join('');
  return `<section class="hotbar-group"><div class="hotbar-group-head"><h4>${group.label}</h4><small>${group.note}</small></div><div class="controller-pair">${sides}</div></section>`;
}
function renderHotbar(){
  const job=getSelectedJob(); const levelData=getSelectedLevelData(); ensureAllHotbarGroups();
  $("#hotbarJobName").textContent=job.name; $("#profileJobName").textContent=job.name; $("#hotbarDataStatus").textContent=`Lv${selectedLevel}・${job.dataStatus}`;
  if(selectedHotbarView==='recommended'){
    $("#hotbarSets").innerHTML=`<div class="hotbar-empty">おすすめ配置は、杏里の全ホットバー登録後に同じボタン配置で比較表示します♡</div>`;
    renderDiagnosis(job,levelData,[]); return;
  }
  $("#hotbarSets").innerHTML=HOTBAR_GROUPS.map(renderHotbarSet).join('');
  renderDiagnosis(job,levelData,job.hotbar.current);
}
function renderRegistrationForm(){
  ensureAllHotbarGroups(); const picker=$("#registrationGroup");
  picker.innerHTML=HOTBAR_GROUPS.map(g=>`<option value="${g.id}"${g.id===selectedRegistrationGroup?' selected':''}>${g.label}</option>`).join('');
  const group=HOTBAR_GROUPS.find(g=>g.id===selectedRegistrationGroup)||HOTBAR_GROUPS[0];
  $("#registrationNote").innerHTML=`<b>${group.label}</b><span>${group.note}</span><span>左右それぞれ「方向キー4枠＋△□○×4枠」です。</span>`;
  const options=getSkillOptions();
  $("#hotbarRegistrationGrid").className='visual-registration';
  $("#hotbarRegistrationGrid").innerHTML=group.sides.map(([trigger,id])=>renderControllerSide(getSetById(id),trigger,true,options)).join('');
  $$('#hotbarRegistrationGrid select').forEach(sel=>sel.addEventListener('change',()=>renderRegistrationForm()));
}
function openHotbarRegistration(){ if(selectedJob!=="dancer"){showToast("このジョブの登録画面はまだ準備前です♡");return;} renderRegistrationForm(); $("#hotbarDialog").showModal(); }
function saveHotbarRegistration(){
  const group=HOTBAR_GROUPS.find(g=>g.id===selectedRegistrationGroup)||HOTBAR_GROUPS[0]; const skillMap=new Map(getSkillOptions().map(s=>[s.id,s]));
  group.sides.forEach(([trigger,id],sideIndex)=>{ const set=getSetById(id); const side=$$('.visual-registration .controller-side')[sideIndex];
    $$('select',side).forEach(select=>{ const key=select.dataset.slotKey; const meta=HOTBAR_SLOT_META.find(([k])=>k===key); const sk=skillMap.get(select.value); set.slots[key]=sk?.id?{button:meta[2],skillId:sk.id,name:sk.name}:{button:meta[2],skillId:"",name:"空き"}; });
  });
  localStorage.setItem(`anriHotbar-${selectedJob}-all-v6`,JSON.stringify(getSelectedJob().hotbar.current)); $("#hotbarDialog").close(); selectedHotbarView='current';
  $$('#hotbar .tab').forEach(i=>i.classList.toggle('active',i.dataset.hotbarView==='current')); renderHotbar(); showToast(`${group.label}を保存しました♡`);
}
function restoreSavedHotbar(){
  try{ const saved=JSON.parse(localStorage.getItem('anriHotbar-dancer-all-v6')||localStorage.getItem('anriHotbar-dancer-set1')); if(Array.isArray(saved)) jobData.dancer.hotbar.current=saved; }
  catch(e){console.warn('保存済みホットバーを読み込めませんでした',e);} ensureAllHotbarGroups();
}

$$('[data-target]').forEach(button => button.addEventListener('click', () => scrollToTarget(button.dataset.target)));
$$('.main-nav .nav-pill').forEach(button => button.addEventListener('click', () => { $$('.main-nav .nav-pill').forEach(item => item.classList.remove('active')); button.classList.add('active'); }));
$$('[data-toast]').forEach(button => button.addEventListener('click', () => showToast(button.dataset.toast)));
$$('[data-rotation]').forEach(button => button.addEventListener('click', () => { $$('#rotation .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); selectedRotation = button.dataset.rotation; renderRotation(selectedRotation); }));
$$('[data-boss]').forEach(button => button.addEventListener('click', () => { $$('#boss .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderBoss(button.dataset.boss); }));
$$('[data-hotbar-view]').forEach(button => button.addEventListener('click', () => { $$('#hotbar .tab').forEach(item => item.classList.remove('active')); button.classList.add('active'); selectedHotbarView = button.dataset.hotbarView; renderHotbar(); }));
$$('.job-card').forEach(button => button.addEventListener('click', () => selectJob(button.dataset.job)));
$("#hotbarLevel").addEventListener("change", event => changeSharedLevel(event.target.value));
$("#rotationLevel").addEventListener("change", event => changeSharedLevel(event.target.value));
$("#registerHotbar").addEventListener("click", openHotbarRegistration);

$("#registrationGroup").addEventListener("change", event => { selectedRegistrationGroup = event.target.value; renderRegistrationForm(); });
$("#closeHotbarDialog").addEventListener("click", () => $("#hotbarDialog").close());
$("#hotbarForm").addEventListener("submit", event => { event.preventDefault(); saveHotbarRegistration(); });
$("#resetHotbarForm").addEventListener("click", () => { localStorage.removeItem(`anriHotbar-${selectedJob}-all-v6`); localStorage.removeItem(`anriHotbar-${selectedJob}-set1`); location.reload(); });
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
const initialSavedLevel = Number(localStorage.getItem(`anriDisplayLevel-${selectedJob}`));
if (getSelectedJob().supportedLevels.includes(initialSavedLevel)) selectedLevel = initialSavedLevel;
renderRotation('single');
renderBoss('mechanic');
renderLevelOptions();
renderHotbar();
restoreSettings();
