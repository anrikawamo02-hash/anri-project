const rotationData = {
  single: {
    title: "単体 基本回し",
    steps: [
      ["カスケード", "L2＋□"],
      ["ファウンテン", "L2＋△"],
      ["光ったProcを優先", "L2＋○"],
      ["次のProcを確認", "L2＋×"],
      ["ゲージ技を使う", "R2＋□"],
      ["バフを合わせる", "R2＋△"],
      ["次のループへ", "R2＋○"]
    ],
    tip: "今は画面確認用の仮データ。最新パッチと杏里の実際の配置を確認して、正しい順番へ差し替えます♡"
  },
  aoe: {
    title: "範囲 基本回し",
    steps: [
      ["敵が複数いるか確認", "確認"],
      ["範囲コンボ開始", "L2＋□"],
      ["範囲コンボを継続", "L2＋△"],
      ["光った範囲Proc", "L2＋○"],
      ["ゲージ技を使う", "R2＋□"]
    ],
    tip: "複数敵の基本は大きく変わりにくいけれど、威力や優先順位が変わったらパッチごとに更新します♡"
  },
  opener: {
    title: "ボス戦 開幕回し",
    steps: [
      ["カウントを確認", "10秒前"],
      ["事前準備を開始", "開始前"],
      ["戦闘開始に合わせる", "0秒"],
      ["最初のGCD", "1手目"],
      ["バフを合わせる", "指定位置"],
      ["移動しながら継続", "ギミック"],
      ["バースト完了", "確認"]
    ],
    tip: "『何秒前に準備するか』『戦闘開始後の何手目で押すか』まで、実際のボス別タイムラインと重ねて表示します♡"
  },
  burst: {
    title: "バースト練習",
    steps: [
      ["バフの残り時間確認", "準備"],
      ["ゲージを確保", "準備"],
      ["バフ開始", "合図"],
      ["強い技を集中", "連続"],
      ["Procを処理", "光ったら"],
      ["通常回しへ戻す", "復帰"]
    ],
    tip: "順番だけでなく、一定のテンポで繰り返して指と感覚に覚えさせる練習モードへつなげます♡"
  }
};

const bossData = {
  mechanic: {
    title: "ドーナツ攻撃 ♡",
    lead: "ボスの周りにドーナツ型の攻撃が発生！",
    action: "安全な場所へ移動！",
    detail: "攻撃範囲を見て、安全地帯へ早めに移動する。"
  },
  movement: {
    title: "踊り子の立ち回り ♡",
    lead: "遠隔物理DPSは移動しながら攻撃できる！",
    action: "避けながら回しを継続",
    detail: "移動開始の合図と、その間に押すボタンを表示する。"
  },
  mistake: {
    title: "よくあるミス ♡",
    lead: "欲張って移動開始が遅れると床ペロしやすい！",
    action: "まず安全を確保",
    detail: "危険な場面は攻撃継続よりも回避を優先する表示に切り替える。"
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function renderRotation(key) {
  const data = rotationData[key];
  $("#rotationTitle").textContent = data.title;
  $("#rotationList").innerHTML = data.steps.map(([name, combo]) => `
    <li><span>${name}</span><span class="combo">${combo}</span><span class="skill-orb" aria-hidden="true"></span></li>
  `).join("");
  $("#rotationTip p").textContent = data.tip;
}

function renderBoss(key) {
  const data = bossData[key];
  $("#bossGuide").innerHTML = `
    <h4>${data.title}</h4>
    <p>${data.lead}</p>
    <div class="mechanic-visual">
      <div class="donut"><span>杏里</span></div>
      <div class="mechanic-copy">
        <b>${data.action}</b>
        <hr>
        <p>${data.detail}</p>
      </div>
    </div>`;
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function scrollToTarget(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

$$('[data-target]').forEach(button => {
  button.addEventListener('click', () => scrollToTarget(button.dataset.target));
});

$$('.main-nav .nav-pill').forEach(button => {
  button.addEventListener('click', () => {
    $$('.main-nav .nav-pill').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
});

$$('[data-toast]').forEach(button => {
  button.addEventListener('click', () => showToast(button.dataset.toast));
});

$$('[data-rotation]').forEach(button => {
  button.addEventListener('click', () => {
    $$('#rotation .tab').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderRotation(button.dataset.rotation);
  });
});

$$('[data-boss]').forEach(button => {
  button.addEventListener('click', () => {
    $$('#boss .tab').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    renderBoss(button.dataset.boss);
  });
});

$$('.job-card').forEach(button => {
  button.addEventListener('click', () => {
    $$('.job-card').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    showToast(button.dataset.job === 'dancer'
      ? '踊り子を選択しました♡'
      : 'リーパーは踊り子完成後に追加予定です♡');
  });
});

$$('[data-theme]').forEach(button => {
  button.addEventListener('click', () => {
    document.body.classList.remove('theme-purple', 'theme-black');
    if (button.dataset.theme !== 'pink') document.body.classList.add(`theme-${button.dataset.theme}`);
    $$('.theme-dot').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    localStorage.setItem('anriTheme', button.dataset.theme);
  });
});

$$('[data-font]').forEach(button => {
  button.addEventListener('click', () => {
    document.body.classList.remove('font-small', 'font-large');
    if (button.dataset.font !== 'medium') document.body.classList.add(`font-${button.dataset.font}`);
    $$('.font-buttons button').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    localStorage.setItem('anriFont', button.dataset.font);
  });
});

$('#sparkleToggle').addEventListener('change', event => {
  document.body.classList.toggle('no-sparkle', !event.target.checked);
  localStorage.setItem('anriSparkle', event.target.checked ? 'on' : 'off');
});

const dialog = $('#helpDialog');
$('#openHelp').addEventListener('click', () => dialog.showModal());
$('#closeHelp').addEventListener('click', () => dialog.close());
$('#startGuide').addEventListener('click', () => {
  dialog.close();
  scrollToTarget('jobs');
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

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
restoreSettings();
