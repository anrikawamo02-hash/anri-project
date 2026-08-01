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


// Patch 7.5公式ジョブガイドを基準にした踊り子Lv60データ。
// Lv50の攻撃回しに、Lv52の癒やしのワルツ、Lv56の守りのサンバ、Lv60のクローズドポジションを追加。
jobData.dancer.levels[60] = {
  requiredSkillsVerified: true,
  sourcePatch: "7.5",
  requiredSkills: [
    ...jobData.dancer.levels[50].requiredSkills,
    { id: "curing-waltz", name: "癒やしのワルツ", level: 52, reason: "自分と周囲を回復し、ダンスパートナー側からも回復を発生させる" },
    { id: "shield-samba", name: "守りのサンバ", level: 56, reason: "全体攻撃に合わせてパーティの被ダメージを軽減する" },
    { id: "closed-position", name: "クローズドポジション", level: 60, reason: "ダンスパートナーを選び、スタンダードフィニッシュなどの効果を共有する" }
  ],
  recommendedSkills: [
    ...jobData.dancer.levels[50].recommendedSkills
  ],
  rotationSkillIds: {
    single: ["closed-position", "cascade", "fountain", "reverse-cascade", "fountainfall", "standard-step", "fan-dance"],
    aoe: ["closed-position", "windmill", "bladeshower", "rising-windmill", "bloodshower", "standard-step", "fan-dance-ii"],
    opener: ["closed-position", "standard-step", "cascade", "fountain", "reverse-cascade", "fountainfall", "fan-dance"],
    burst: ["closed-position", "standard-step", "fan-dance"]
  }
};


// Patch 7.5公式ジョブガイドを基準にした踊り子Lv70データ。
// Lv62の攻めのタンゴ、Lv66の扇の舞い【急】、Lv70のテクニカルステップを追加。
jobData.dancer.levels[70] = {
  requiredSkillsVerified: true,
  sourcePatch: "7.5",
  requiredSkills: [
    ...jobData.dancer.levels[60].requiredSkills,
    { id: "devilment", name: "攻めのタンゴ", level: 62, reason: "2分ごとに自分とダンスパートナーのクリティカル・ダイレクトヒット率を上げる" },
    { id: "fan-dance-iii", name: "扇の舞い【急】", level: 66, reason: "扇の舞い【序】【破】から発生するProcを消費する追撃アビリティ" },
    { id: "technical-step", name: "テクニカルステップ", level: 70, reason: "4ステップ後のテクニカルフィニッシュでパーティ全体の与ダメージを20秒間上げる2分バーストの中心" }
  ],
  recommendedSkills: [
    ...jobData.dancer.levels[60].recommendedSkills
  ],
  rotationSkillIds: {
    single: ["closed-position", "cascade", "fountain", "reverse-cascade", "fountainfall", "standard-step", "fan-dance", "fan-dance-iii", "technical-step", "devilment"],
    aoe: ["closed-position", "windmill", "bladeshower", "rising-windmill", "bloodshower", "standard-step", "fan-dance-ii", "fan-dance-iii", "technical-step", "devilment"],
    opener: ["closed-position", "standard-step", "technical-step", "devilment", "fan-dance", "fan-dance-iii", "cascade", "fountain", "reverse-cascade", "fountainfall"],
    burst: ["technical-step", "devilment", "fan-dance", "fan-dance-ii", "fan-dance-iii", "standard-step"]
  }
};


// Patch 7.5公式ジョブガイドを基準にした踊り子Lv80データ。
// Lv72のフラリッシュ、Lv76のエスプリ／剣の舞い、Lv80のインプロビゼーションを追加。
jobData.dancer.levels[80] = {
  requiredSkillsVerified: true,
  sourcePatch: "7.5",
  requiredSkills: [
    ...jobData.dancer.levels[70].requiredSkills,
    { id: "flourish", name: "フラリッシュ", level: 72, reason: "60秒ごとに単体・範囲のProcと扇の舞い【急】をまとめて発生させ、バースト中の手数を増やす" },
    { id: "saber-dance", name: "剣の舞い", level: 76, reason: "エスプリ50を消費する高威力攻撃。ゲージを溢れさせず、できるだけバースト中に使う" },
    { id: "improvisation", name: "インプロビゼーション", level: 80, reason: "攻撃できない時間や全体攻撃前に、継続回復とバリアでパーティを支援する" }
  ],
  recommendedSkills: [
    ...jobData.dancer.levels[70].recommendedSkills
  ],
  rotationSkillIds: {
    single: ["closed-position", "cascade", "fountain", "reverse-cascade", "fountainfall", "standard-step", "fan-dance", "fan-dance-iii", "technical-step", "devilment", "flourish", "saber-dance"],
    aoe: ["closed-position", "windmill", "bladeshower", "rising-windmill", "bloodshower", "standard-step", "fan-dance-ii", "fan-dance-iii", "technical-step", "devilment", "flourish", "saber-dance"],
    opener: ["closed-position", "standard-step", "technical-step", "devilment", "flourish", "saber-dance", "fan-dance", "fan-dance-iii"],
    burst: ["technical-step", "devilment", "flourish", "saber-dance", "fan-dance", "fan-dance-ii", "fan-dance-iii", "standard-step"]
  }
};


// Patch 7.5公式ジョブガイドを基準にした踊り子Lv90データ。
// Lv82のティラナ、Lv86の扇の舞い【終】、Lv90の流星の舞いを追加。
jobData.dancer.levels[90] = {
  requiredSkillsVerified: true,
  sourcePatch: "7.5",
  requiredSkills: [
    ...jobData.dancer.levels[80].requiredSkills,
    { id: "tillana", name: "ティラナ", level: 82, reason: "テクニカルフィニッシュ成功後に1回使える追撃。エスプリを50増やし、2分バースト中の剣の舞いへつなげる" },
    { id: "fan-dance-iv", name: "扇の舞い【終】", level: 86, reason: "フラリッシュ使用後に1回使える強い前方扇範囲アビリティ。2分バースト中に忘れず消費する" },
    { id: "starfall-dance", name: "流星の舞い", level: 90, reason: "攻めのタンゴ使用後に1回使える確定クリティカル・ダイレクトヒットの強力な直線範囲攻撃" }
  ],
  recommendedSkills: [
    ...jobData.dancer.levels[80].recommendedSkills
  ],
  rotationSkillIds: {
    single: ["closed-position", "cascade", "fountain", "reverse-cascade", "fountainfall", "standard-step", "fan-dance", "fan-dance-iii", "technical-step", "devilment", "flourish", "saber-dance", "tillana", "fan-dance-iv", "starfall-dance"],
    aoe: ["closed-position", "windmill", "bladeshower", "rising-windmill", "bloodshower", "standard-step", "fan-dance-ii", "fan-dance-iii", "technical-step", "devilment", "flourish", "saber-dance", "tillana", "fan-dance-iv", "starfall-dance"],
    opener: ["closed-position", "standard-step", "technical-step", "tillana", "devilment", "starfall-dance", "flourish", "fan-dance-iv", "saber-dance", "fan-dance", "fan-dance-iii"],
    burst: ["technical-step", "tillana", "devilment", "starfall-dance", "flourish", "fan-dance-iv", "saber-dance", "fan-dance", "fan-dance-ii", "fan-dance-iii", "standard-step"]
  }
};


// Patch 7.5公式ジョブガイドを基準にした踊り子Lv100データ。
// Lv92のラストダンス、Lv96のフィニシングムーブ、Lv100の暁の舞いを追加。
jobData.dancer.levels[100] = {
  requiredSkillsVerified: true,
  sourcePatch: "7.5",
  requiredSkills: [
    ...jobData.dancer.levels[90].requiredSkills,
    { id: "last-dance", name: "ラストダンス", level: 92, reason: "スタンダードフィニッシュまたはフィニシングムーブ後に1回使える強力な追撃。30秒以内に忘れず使う" },
    { id: "finishing-move", name: "フィニシングムーブ", level: 96, reason: "フラリッシュ後にスタンダードステップが変化する即時フィニッシュ。2ステップを踏まずにスタンダードフィニッシュ効果を更新し、ラストダンスへつなげる" },
    { id: "dance-of-the-dawn", name: "暁の舞い", level: 100, reason: "テクニカルフィニッシュ後に剣の舞いが変化する最終追撃。エスプリ50を使うため、発動前にゲージを確保する" }
  ],
  recommendedSkills: [
    ...jobData.dancer.levels[90].recommendedSkills
  ],
  rotationSkillIds: {
    single: ["closed-position", "cascade", "fountain", "reverse-cascade", "fountainfall", "standard-step", "last-dance", "fan-dance", "fan-dance-iii", "technical-step", "devilment", "flourish", "finishing-move", "saber-dance", "dance-of-the-dawn", "tillana", "fan-dance-iv", "starfall-dance"],
    aoe: ["closed-position", "windmill", "bladeshower", "rising-windmill", "bloodshower", "standard-step", "last-dance", "fan-dance-ii", "fan-dance-iii", "technical-step", "devilment", "flourish", "finishing-move", "saber-dance", "dance-of-the-dawn", "tillana", "fan-dance-iv", "starfall-dance"],
    opener: ["closed-position", "standard-step", "last-dance", "technical-step", "tillana", "dance-of-the-dawn", "devilment", "starfall-dance", "flourish", "finishing-move", "last-dance", "fan-dance-iv", "saber-dance", "fan-dance", "fan-dance-iii"],
    burst: ["technical-step", "tillana", "dance-of-the-dawn", "devilment", "starfall-dance", "flourish", "finishing-move", "last-dance", "fan-dance-iv", "saber-dance", "fan-dance", "fan-dance-ii", "fan-dance-iii", "standard-step"]
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
  },
  60: {
    single: {
      title: "単体 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前に1回", icon: "Closed_Position.png", reason: "パーティ内の火力役ひとりをダンスパートナーにします。効果は永続なので、戦闘ごとに押し直す必要はありません。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "2つのステップを踏んでフィニッシュ。Lv60では自分だけでなく、ダンスパートナーにも与ダメージ上昇を共有します。" },
        { name: "Procが光っているか確認", cue: "先に確認", icon: "Reverse_Cascade.png", reason: "光っている技を先に使い、次の基本技でProcを上書きする事故を防ぎます。" },
        { name: "カスケード", cue: "基本①", icon: "Cascade.png", reason: "単体コンボの開始。対称投擲Procが付いたら次のカスケードより先に消費します。" },
        { name: "リバースカスケード", cue: "光ったら", icon: "Reverse_Cascade.png", reason: "対称投擲Procを消費し、幻扇が増える可能性があります。" },
        { name: "ファウンテン", cue: "基本②", icon: "Fountain.png", reason: "カスケードからつなぐ2段目。非対称投擲Procが付く可能性があります。" },
        { name: "ファウンテンフォール", cue: "光ったら", icon: "Fountainfall.png", reason: "非対称投擲Procを消費し、幻扇が増える可能性があります。" },
        { name: "扇の舞い【序】", cue: "羽4枚前", icon: "Fan_Dance.png", reason: "幻扇が溢れないように単体用の扇で消費します。" }
      ],
      tip: "Lv50の回しはそのまま。Lv60で一番大きく増えるのは『戦闘前にパートナーを選ぶ』ことです。あとはスタンダードステップを30秒ごとに続ければOKです♡"
    },
    aoe: {
      title: "範囲 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前に1回", icon: "Closed_Position.png", reason: "ダンスパートナーを選びます。範囲戦でもスタンダードフィニッシュの効果を共有できます。" },
        { name: "敵が2体以上いるか確認", cue: "切替条件", icon: "Windmill.png", reason: "Lv60でも2体以上なら範囲コンボへ切り替えます。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "範囲でも最優先。ダンスパートナーにも与ダメージ上昇を共有します。" },
        { name: "Procが光っているか確認", cue: "先に確認", icon: "Rising_Windmill.png", reason: "光った範囲Procを先に消費して上書きを防ぎます。" },
        { name: "ウィンドミル", cue: "範囲①", icon: "Windmill.png", reason: "範囲コンボの開始です。" },
        { name: "ライジングウィンドミル", cue: "光ったら", icon: "Rising_Windmill.png", reason: "対称投擲Procの範囲攻撃です。" },
        { name: "ブレードシャワー", cue: "範囲②", icon: "Bladeshower.png", reason: "ウィンドミルからつなぐ2段目です。" },
        { name: "ブラッドシャワー", cue: "光ったら", icon: "Bloodshower.png", reason: "非対称投擲Procの範囲攻撃です。" },
        { name: "扇の舞い【破】", cue: "羽4枚前", icon: "Fan_Dance_II.png", reason: "複数の敵に当てながら幻扇を消費します。" }
      ],
      tip: "Lv60でも範囲回しの順番はLv50と同じ。クローズドポジションを事前に付け、スタンダードステップを遅らせないことを追加で意識します♡"
    },
    opener: {
      title: "Lv60 ボス開幕",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前", icon: "Closed_Position.png", reason: "パーティの火力役ひとりをダンスパートナーにします。付与済みなら押し直し不要です。" },
        { name: "スタンダードステップ開始", cue: "約-15秒以内", icon: "Standard_Step.png", reason: "戦闘前にダンスを始め、攻撃しない2つのステップを先に済ませます。" },
        { name: "表示された1つ目のステップ", cue: "準備", icon: "Emboite.png", reason: "画面に表示された色・記号と同じステップを押します。" },
        { name: "表示された2つ目のステップ", cue: "準備", icon: "Entrechat.png", reason: "2つ目も表示どおりに押します。" },
        { name: "スタンダードフィニッシュ", cue: "戦闘開始", icon: "Standard_Finish.png", reason: "ボスを攻撃できる瞬間に合わせ、自分とパートナーの与ダメージ上昇を開始します。" },
        { name: "Proc優先の単体基本回し", cue: "その後", icon: "Cascade.png", reason: "光ったProcを先に使いながら1→3→2→4へ移ります。" },
        { name: "扇の舞い【序】", cue: "羽4枚前", icon: "Fan_Dance.png", reason: "幻扇を溢れさせないように挟みます。" }
      ],
      tip: "Lv60開幕の新しい一手は『最初にダンスパートナーを選ぶ』だけ。攻めのタンゴはLv62なので、Lv60ではまだ使いません♡"
    },
    burst: {
      title: "Lv60 火力と支援のタイミング",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション確認", cue: "常時", icon: "Closed_Position.png", reason: "パートナーが付いている状態を保ち、スタンダードフィニッシュの効果を共有します。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "Lv60でも火力の中心。遅らせず使います。" },
        { name: "スタンダードフィニッシュ", cue: "強い一撃", icon: "Standard_Finish.png", reason: "自分とパートナーの与ダメージ上昇を更新します。" },
        { name: "守りのサンバ", cue: "全体攻撃前", icon: "Shield_Samba.png", reason: "ボスの強い全体攻撃が来る前に使い、パーティの被ダメージを軽減します。火力技ではなく支援技です。" },
        { name: "癒やしのワルツ", cue: "被弾後", icon: "Curing_Waltz.png", reason: "自分と周囲を回復。パートナーと重なって使うと、パートナー側からも回復が発生して効果を活かしやすくなります。" },
        { name: "通常回しへ戻る", cue: "くり返し", icon: "Cascade.png", reason: "次のスタンダードステップまでProc優先の基本回しを続けます。" }
      ],
      tip: "Lv60では大きな攻撃バフはまだありません。火力はスタンダードステップ、支援は全体攻撃前のサンバと被弾後のワルツ、と役割を分けて覚えます♡"
    }

  },
  70: {
    single: {
      title: "単体 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前に確認", icon: "Closed_Position.png", reason: "火力役ひとりをダンスパートナーにします。付与済みなら押し直しません。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "Lv70でも通常時の最優先。自分とパートナーの与ダメージ上昇を維持します。" },
        { name: "光っているProcを先に確認", cue: "上書き防止", icon: "Reverse_Cascade.png", reason: "リバースカスケードやファウンテンフォールが光っていれば、対応する基本技より先に使います。" },
        { name: "カスケード → ファウンテン", cue: "基本①→②", icon: "Cascade.png", reason: "Procがないときの単体基本コンボです。" },
        { name: "リバース／ファウンテンフォール", cue: "光ったら", icon: "Fountainfall.png", reason: "発生したProcを消費し、幻扇獲得を狙います。" },
        { name: "扇の舞い【序】", cue: "羽を消費", icon: "Fan_Dance.png", reason: "単体用の幻扇消費技。羽が4枚になる前に使います。" },
        { name: "扇の舞い【急】", cue: "光ったらすぐ", icon: "Fan_Dance_III.png", reason: "扇の舞い【序】【破】から50％で発生する追撃です。Procを残したままにせず使います。" },
        { name: "テクニカルステップ＋攻めのタンゴ", cue: "2分ごと", icon: "Technical_Step.png", reason: "通常回しとは別に、2分ごとの大きな火力タイミングとしてまとめて使います。" }
      ],
      tip: "普段はLv60までと同じ『Proc優先の1→3→2→4』。Lv70からは、2分ごとにテクニカルステップと攻めのタンゴを合わせることが新しい柱です♡"
    },
    aoe: {
      title: "範囲 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "敵が2体以上いるか確認", cue: "切替条件", icon: "Windmill.png", reason: "2体以上なら範囲コンボを使います。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "敵が複数でも最優先。フィニッシュは周囲の敵へ当たります。" },
        { name: "光っている範囲Procを先に確認", cue: "上書き防止", icon: "Rising_Windmill.png", reason: "ライジングウィンドミルやブラッドシャワーを先に消費します。" },
        { name: "ウィンドミル → ブレードシャワー", cue: "範囲①→②", icon: "Bladeshower.png", reason: "Procがないときの範囲基本コンボです。" },
        { name: "ライジング／ブラッドシャワー", cue: "光ったら", icon: "Bloodshower.png", reason: "発生した範囲Procを使い、幻扇獲得を狙います。" },
        { name: "扇の舞い【破】", cue: "羽を消費", icon: "Fan_Dance_II.png", reason: "複数の敵に当てる幻扇消費技です。" },
        { name: "扇の舞い【急】", cue: "光ったら", icon: "Fan_Dance_III.png", reason: "対象とその周囲へ当たる追撃なので、単体・範囲のどちらでも使います。" },
        { name: "テクニカルステップ＋攻めのタンゴ", cue: "2分ごと", icon: "Technical_Step.png", reason: "敵が複数でも2分バーストをまとめ、テクニカルフィニッシュを全員に合わせます。" }
      ],
      tip: "範囲も基本はLv60と同じ。Lv70では『2分ごとのテクニカル＋タンゴ』と『扇の舞い【急】が光ったら押す』を追加で覚えます♡"
    },
    opener: {
      title: "Lv70 ボス開幕",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション確認", cue: "戦闘前", icon: "Closed_Position.png", reason: "ダンスパートナーが付いていることを確認します。" },
        { name: "スタンダードステップ開始", cue: "戦闘前", icon: "Standard_Step.png", reason: "2つのステップを先に踏み、戦闘開始にフィニッシュを合わせます。" },
        { name: "スタンダードフィニッシュ", cue: "戦闘開始", icon: "Standard_Finish.png", reason: "初撃を入れ、自分とパートナーの与ダメージ上昇を開始します。" },
        { name: "テクニカルステップ", cue: "すぐ開始", icon: "Technical_Step.png", reason: "4つの表示ステップを踏み、パーティ全体の2分バーストへ入ります。" },
        { name: "表示された4ステップ", cue: "順番どおり", icon: "Pirouette.png", reason: "固定順ではなく、画面に表示された色・記号を4つ順番に押します。" },
        { name: "テクニカルフィニッシュ", cue: "4手後", icon: "Technical_Finish.png", reason: "強い範囲攻撃と、パーティ全体への20秒間の与ダメージ上昇を付与します。" },
        { name: "攻めのタンゴ", cue: "フィニッシュ直後", icon: "Devilment.png", reason: "自分とパートナーのクリティカル・ダイレクトヒット率を上げ、テクニカル中に重ねます。" },
        { name: "Proc優先の基本回し", cue: "バフ中", icon: "Fountainfall.png", reason: "光ったProc、扇の舞い【序】、扇の舞い【急】を優先して使います。" }
      ],
      tip: "Lv70開幕の形は『スタンダードフィニッシュ → テクニカル4手 → テクニカルフィニッシュ → 攻めのタンゴ』。ここが初めての本格的な2分開幕です♡"
    },
    burst: {
      title: "Lv70 2分バースト",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "テクニカルステップ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "Lv70の2分バーストの開始ボタンです。" },
        { name: "表示された4ステップ", cue: "間違えずに", icon: "Emboite.png", reason: "4つ成功させるとテクニカルフィニッシュが最大威力・最大効果になります。" },
        { name: "テクニカルフィニッシュ", cue: "全員の火力時間", icon: "Technical_Finish.png", reason: "パーティ全体の与ダメージを20秒間上げます。" },
        { name: "攻めのタンゴ", cue: "すぐ重ねる", icon: "Devilment.png", reason: "自分とパートナーのクリティカル・ダイレクトヒット率を20秒間上げます。" },
        { name: "扇の舞い【序】／【破】", cue: "羽を使う", icon: "Fan_Dance.png", reason: "幻扇があればバフ中に挟みます。ただし4枚で溢れない管理を優先します。" },
        { name: "扇の舞い【急】", cue: "光ったら", icon: "Fan_Dance_III.png", reason: "扇の舞いから発生する追撃を、テクニカルとタンゴの効果中に使います。" },
        { name: "Proc優先の基本回し", cue: "20秒間", icon: "Reverse_Cascade.png", reason: "Lv70ではまだフラリッシュや剣の舞いがないため、通常Procと扇を丁寧に使います。" }
      ],
      tip: "覚える合図は『2分になったらテクニカル → 4手 → フィニッシュ → タンゴ』。その20秒に光ったProcと扇を入れればOKです♡"
    }
  }
  ,
  80: {
    single: {
      title: "単体 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前に確認", icon: "Closed_Position.png", reason: "火力役ひとりをダンスパートナーにします。付与済みなら押し直しません。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "自分とパートナーの与ダメージ上昇を維持するため、基本回しより優先します。" },
        { name: "光っているProcを先に使う", cue: "上書き防止", icon: "Fountainfall.png", reason: "リバースカスケードとファウンテンフォールを先に消費し、次の基本技でProcを失わないようにします。" },
        { name: "カスケード → ファウンテン", cue: "基本①→②", icon: "Cascade.png", reason: "Procがないときの単体基本コンボです。" },
        { name: "扇の舞い【序】→【急】", cue: "羽と光を消費", icon: "Fan_Dance_III.png", reason: "幻扇を4枚で溢れさせず、【急】が光ったら期限内に使います。" },
        { name: "剣の舞い", cue: "エスプリ50", icon: "Saber_Dance.png", reason: "エスプリを50消費する強い攻撃です。ゲージが100へ近づいたら、バースト外でも溢れる前に使います。" },
        { name: "フラリッシュ", cue: "60秒ごと", icon: "Flourish.png", reason: "戦闘中に使うと複数のProcをまとめて作ります。光った技を順番に使い、上書きしないようにします。" },
        { name: "テクニカル＋攻めのタンゴ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "2分ごとの大きな火力時間。フラリッシュ、剣の舞い、扇をこの時間へ集めます。" }
      ],
      tip: "Lv80の新しい柱は『60秒ごとのフラリッシュ』と『エスプリ50で剣の舞い』。普段のProc優先は変えず、2分ではテクニカル＋タンゴへ強い技をまとめます♡"
    },
    aoe: {
      title: "範囲 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "敵が2体以上いるか確認", cue: "切替条件", icon: "Windmill.png", reason: "2体以上なら範囲コンボへ切り替えます。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "複数相手でも優先。フィニッシュを周囲へ当てます。" },
        { name: "光っている範囲Procを先に使う", cue: "上書き防止", icon: "Bloodshower.png", reason: "ライジングウィンドミルとブラッドシャワーを先に消費します。" },
        { name: "ウィンドミル → ブレードシャワー", cue: "範囲①→②", icon: "Bladeshower.png", reason: "Procがないときの範囲基本コンボです。" },
        { name: "扇の舞い【破】→【急】", cue: "羽と光を消費", icon: "Fan_Dance_II.png", reason: "複数の敵へ当てながら幻扇を消費し、【急】が光ったら続けて使います。" },
        { name: "剣の舞い", cue: "エスプリ50", icon: "Saber_Dance.png", reason: "対象と周囲へ当たるため、単体・範囲のどちらでも使える強い攻撃です。" },
        { name: "フラリッシュ", cue: "60秒ごと", icon: "Flourish.png", reason: "範囲Procもまとめて得られます。敵の近くでライジング／ブラッドシャワーを当てます。" },
        { name: "テクニカル＋攻めのタンゴ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "複数相手でも2分バーストをまとめ、強い範囲攻撃を集中させます。" }
      ],
      tip: "Lv80範囲は『範囲Proc優先＋剣の舞い』。フラリッシュで光った単体Procではなく、敵が複数なら範囲Procを選んで当てる意識が大切です♡"
    },
    opener: {
      title: "Lv80 ボス開幕",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション確認", cue: "戦闘前", icon: "Closed_Position.png", reason: "ダンスパートナーが付いていることを確認します。" },
        { name: "スタンダードステップ開始", cue: "戦闘前", icon: "Standard_Step.png", reason: "2ステップを先に踏み、戦闘開始へフィニッシュを合わせます。" },
        { name: "スタンダードフィニッシュ", cue: "戦闘開始", icon: "Standard_Finish.png", reason: "初撃と同時に、自分とパートナーの与ダメージ上昇を開始します。" },
        { name: "テクニカルステップ → 4手", cue: "すぐ開始", icon: "Technical_Step.png", reason: "表示どおり4ステップを踏み、パーティ全体の火力時間へ入ります。" },
        { name: "テクニカルフィニッシュ", cue: "4手後", icon: "Technical_Finish.png", reason: "パーティ全体へ20秒間の与ダメージ上昇を付与します。" },
        { name: "攻めのタンゴ", cue: "フィニッシュ直後", icon: "Devilment.png", reason: "自分とパートナーのクリティカル・ダイレクトヒット率を上げます。" },
        { name: "フラリッシュ", cue: "バフ中", icon: "Flourish.png", reason: "Procをまとめて発生させ、テクニカルとタンゴの効果中に消費します。" },
        { name: "剣の舞い・Proc・扇", cue: "溢れない順", icon: "Saber_Dance.png", reason: "エスプリや幻扇を溢れさせないことを優先しながら、光った技をバフ中へ入れます。" }
      ],
      tip: "Lv80開幕は『スタンダード → テクニカル4手 → フィニッシュ → タンゴ → フラリッシュ』が目印。その後はエスプリ・羽・Procを溢れさせない順で使います♡"
    },
    burst: {
      title: "Lv80 2分バースト",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "事前にゲージを少し残す", cue: "直前準備", icon: "Saber_Dance.png", reason: "エスプリと幻扇を全部使い切らず、ただし上限で溢れない範囲に整えます。" },
        { name: "テクニカルステップ → 4手", cue: "120秒ごと", icon: "Technical_Step.png", reason: "パーティ全体の2分バーストを開始します。" },
        { name: "テクニカルフィニッシュ", cue: "最大成功", icon: "Technical_Finish.png", reason: "4手成功で最大威力と最大の与ダメージ上昇を得ます。" },
        { name: "攻めのタンゴ", cue: "すぐ重ねる", icon: "Devilment.png", reason: "自分とパートナーのクリティカル・ダイレクトヒット率を上げます。" },
        { name: "フラリッシュ", cue: "バフ中に1回", icon: "Flourish.png", reason: "単体Proc2種と扇の舞い【急】を作り、バフ中の攻撃回数を増やします。" },
        { name: "剣の舞い", cue: "エスプリ50ごと", icon: "Saber_Dance.png", reason: "エスプリを溢れさせないよう、強い攻撃をバフ中に使います。" },
        { name: "Procと扇を消費", cue: "光った順", icon: "Fan_Dance_III.png", reason: "フラリッシュで得たProc、幻扇、扇の舞い【急】を期限と上限に注意して使います。" },
        { name: "インプロビゼーション", cue: "火力回し外", icon: "Improvisation.png", reason: "火力バーストへ入れる技ではありません。攻撃できない時間や全体攻撃前に使い、フィニッシュでバリアを張ります。" }
      ],
      tip: "Lv80の2分は『テクニカル → タンゴ → フラリッシュ』へ、剣の舞い・Proc・扇を集める形。インプロは攻撃用ではなく支援用です♡"
    }
  }
  ,
  90: {
    single: {
      title: "単体 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前に確認", icon: "Closed_Position.png", reason: "火力役ひとりをダンスパートナーにします。付与済みなら押し直しません。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "自分とパートナーの与ダメージ上昇を維持するため、通常コンボより優先します。" },
        { name: "光っているProcを先に使う", cue: "上書き防止", icon: "Fountainfall.png", reason: "リバースカスケードとファウンテンフォールを先に消費し、基本技でProcを失わないようにします。" },
        { name: "カスケード → ファウンテン", cue: "基本①→②", icon: "Cascade.png", reason: "Procがないときの単体基本コンボです。" },
        { name: "扇の舞い【序】→【急】", cue: "羽と光を消費", icon: "Fan_Dance_III.png", reason: "幻扇を4枚で溢れさせず、【急】が光ったら期限内に使います。" },
        { name: "剣の舞い", cue: "エスプリ50", icon: "Saber_Dance.png", reason: "エスプリが上限へ近づいたら溢れる前に使い、できるだけ2分バーストへ残します。" },
        { name: "フラリッシュ", cue: "60秒ごと", icon: "Flourish.png", reason: "Procと扇の舞い【終】をまとめて発生させます。光った技を期限内に消費します。" },
        { name: "テクニカル＋タンゴ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "ティラナ、流星の舞い、扇の舞い【終】、剣の舞いをまとめるLv90の大きな火力時間です。" }
      ],
      tip: "Lv90では普段の回しはLv80と同じ。2分になったら『テクニカル後のティラナ』『タンゴ後の流星』『フラリッシュ後の扇の舞い【終】』を忘れないことが新しいポイントです♡"
    },
    aoe: {
      title: "範囲 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "敵が2体以上いるか確認", cue: "切替条件", icon: "Windmill.png", reason: "2体以上なら範囲コンボへ切り替えます。" },
        { name: "スタンダードステップ", cue: "30秒ごと", icon: "Standard_Step.png", reason: "複数相手でも優先し、フィニッシュを周囲へ当てます。" },
        { name: "範囲Procを先に使う", cue: "上書き防止", icon: "Bloodshower.png", reason: "ライジングウィンドミルとブラッドシャワーを先に消費します。" },
        { name: "ウィンドミル → ブレードシャワー", cue: "範囲①→②", icon: "Bladeshower.png", reason: "Procがないときの範囲基本コンボです。" },
        { name: "扇の舞い【破】→【急】", cue: "羽と光を消費", icon: "Fan_Dance_II.png", reason: "複数へ当てながら幻扇を消費し、【急】が光ったら続けて使います。" },
        { name: "剣の舞い", cue: "エスプリ50", icon: "Saber_Dance.png", reason: "対象と周囲へ当たるため、範囲戦でもゲージ消費の中心です。" },
        { name: "ティラナ・流星・扇の舞い【終】", cue: "発動可になったら", icon: "Tillana.png", reason: "3つとも複数へ当たる強い追撃です。2分バースト中は敵を巻き込める向きと位置を確認します。" },
        { name: "テクニカル＋タンゴ＋フラリッシュ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "Lv90の追加技をまとめて、複数の敵へ大きな範囲ダメージを入れます。" }
      ],
      tip: "Lv90範囲はLv80の範囲回しに、ティラナ・扇の舞い【終】・流星の舞いが追加。前方範囲技は敵の向きを見て全員へ当てます♡"
    },
    opener: {
      title: "Lv90 ボス開幕",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション確認", cue: "戦闘前", icon: "Closed_Position.png", reason: "ダンスパートナーが付いていることを確認します。" },
        { name: "スタンダードステップ開始", cue: "戦闘前", icon: "Standard_Step.png", reason: "2ステップを先に踏み、戦闘開始へフィニッシュを合わせます。" },
        { name: "スタンダードフィニッシュ", cue: "戦闘開始", icon: "Standard_Finish.png", reason: "初撃と同時に自分とパートナーの与ダメージ上昇を開始します。" },
        { name: "テクニカルステップ → 4手", cue: "すぐ開始", icon: "Technical_Step.png", reason: "表示どおり4ステップを踏み、パーティ全体の2分火力時間へ入ります。" },
        { name: "テクニカルフィニッシュ", cue: "4手後", icon: "Technical_Finish.png", reason: "強い範囲攻撃とパーティ全体への与ダメージ上昇を付与します。" },
        { name: "ティラナ", cue: "フィニッシュ後", icon: "Tillana.png", reason: "テクニカルフィニッシュ後だけ使える追撃。エスプリを50増やし、次の強い技へつなげます。" },
        { name: "攻めのタンゴ → 流星の舞い", cue: "バフ中", icon: "Starfall_Dance.png", reason: "タンゴで流星の舞いが使えるようになります。確定クリティカル・ダイレクトヒットをバフ中に入れます。" },
        { name: "フラリッシュ → 扇の舞い【終】", cue: "続けて", icon: "Fan_Dance_IV.png", reason: "フラリッシュで【終】が使えるようになります。Proc、剣の舞い、扇も溢れない順に続けます。" }
      ],
      tip: "Lv90開幕の目印は『テクニカル → ティラナ』『タンゴ → 流星』『フラリッシュ → 扇の舞い【終】』。3組をセットで覚えると迷いにくいです♡"
    },
    burst: {
      title: "Lv90 2分バースト",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "エスプリと幻扇を準備", cue: "直前", icon: "Saber_Dance.png", reason: "上限で溢れない範囲でゲージと羽を残し、2分バフへ強い技を集めます。" },
        { name: "テクニカルステップ → 4手", cue: "120秒ごと", icon: "Technical_Step.png", reason: "パーティ全体の2分バーストを開始します。" },
        { name: "テクニカルフィニッシュ → ティラナ", cue: "1組目", icon: "Tillana.png", reason: "フィニッシュ後のティラナで追撃し、エスプリを50増やします。" },
        { name: "攻めのタンゴ → 流星の舞い", cue: "2組目", icon: "Starfall_Dance.png", reason: "タンゴの効果中に、確定クリティカル・ダイレクトヒットの流星の舞いを使います。" },
        { name: "フラリッシュ → 扇の舞い【終】", cue: "3組目", icon: "Fan_Dance_IV.png", reason: "フラリッシュで得た【終】を使い、同時に発生したProcも期限内に消費します。" },
        { name: "剣の舞い", cue: "エスプリ50ごと", icon: "Saber_Dance.png", reason: "ティラナで増えた分を含め、エスプリを溢れさせずバフ中へ入れます。" },
        { name: "Procと扇を消費", cue: "残り時間", icon: "Fan_Dance_III.png", reason: "光ったProc、幻扇、扇の舞い【急】を期限と上限に注意して使います。" },
        { name: "通常回しへ戻る", cue: "20秒後", icon: "Cascade.png", reason: "次の30秒スタンダード、60秒フラリッシュ、120秒テクニカルへ向けて通常回しを続けます。" }
      ],
      tip: "Lv90の2分は3つのセットで覚えると簡単。『テクニカル→ティラナ』『タンゴ→流星』『フラリッシュ→終』の後に、剣・Proc・扇を溢れない順で入れます♡"
    }
  }
  ,
  100: {
    single: {
      title: "単体 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション", cue: "戦闘前に確認", icon: "Closed_Position.png", reason: "火力役ひとりをダンスパートナーにします。付与済みなら押し直しません。" },
        { name: "スタンダードステップ → ラストダンス", cue: "30秒ごと", icon: "Last_Dance.png", reason: "スタンダードフィニッシュ後にラストダンスが使えるようになります。30秒以内に使い、次のスタンダードまで持ち越さないようにします。" },
        { name: "光っているProcを先に使う", cue: "上書き防止", icon: "Fountainfall.png", reason: "リバースカスケードとファウンテンフォールを先に消費し、基本技でProcを失わないようにします。" },
        { name: "カスケード → ファウンテン", cue: "基本①→②", icon: "Cascade.png", reason: "Procがないときの単体基本コンボです。" },
        { name: "扇の舞い【序】→【急】", cue: "羽と光を消費", icon: "Fan_Dance_III.png", reason: "幻扇を4枚で溢れさせず、【急】が光ったら期限内に使います。" },
        { name: "剣の舞い", cue: "エスプリ50", icon: "Saber_Dance.png", reason: "通常時はエスプリ溢れ防止に使います。2分前は暁の舞い用の50を残します。" },
        { name: "フラリッシュ → フィニシングムーブ", cue: "60秒ごと", icon: "Finishing_Move.png", reason: "Lv96からフラリッシュ後にスタンダードステップがフィニシングムーブへ変化。ステップなしで強い攻撃とバフ更新を行い、ラストダンスへつなげます。" },
        { name: "テクニカル＋タンゴ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "暁の舞い、ティラナ、流星の舞い、フィニシングムーブ、扇の舞い【終】をまとめるLv100の最大火力時間です。" }
      ],
      tip: "Lv100の普段の軸は『スタンダード後にラストダンス』『フラリッシュ後にフィニシングムーブ→ラストダンス』。2分前は暁の舞い用にエスプリ50を確保します♡"
    },
    aoe: {
      title: "範囲 基本回し",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "敵が2体以上いるか確認", cue: "切替条件", icon: "Windmill.png", reason: "2体以上なら範囲コンボへ切り替えます。" },
        { name: "スタンダードステップ → ラストダンス", cue: "30秒ごと", icon: "Last_Dance.png", reason: "どちらも複数の敵へ当たるため、範囲戦でも優先します。" },
        { name: "範囲Procを先に使う", cue: "上書き防止", icon: "Bloodshower.png", reason: "ライジングウィンドミルとブラッドシャワーを先に消費します。" },
        { name: "ウィンドミル → ブレードシャワー", cue: "範囲①→②", icon: "Bladeshower.png", reason: "Procがないときの範囲基本コンボです。" },
        { name: "扇の舞い【破】→【急】", cue: "羽と光を消費", icon: "Fan_Dance_II.png", reason: "複数へ当てながら幻扇を消費し、【急】が光ったら続けて使います。" },
        { name: "フラリッシュ → フィニシングムーブ → ラストダンス", cue: "60秒ごと", icon: "Finishing_Move.png", reason: "3つとも複数へ当たります。敵のまとまりを確認してまとめて当てます。" },
        { name: "暁・ティラナ・流星・扇の舞い【終】", cue: "2分バースト", icon: "Dance_of_the_Dawn.png", reason: "Lv100の主力追撃はすべて範囲対応。直線・扇範囲は向きを合わせて全員へ当てます。" },
        { name: "テクニカル＋タンゴ＋フラリッシュ", cue: "120秒ごと", icon: "Technical_Step.png", reason: "Lv100の追加技をまとめ、複数の敵へ最大火力を入れます。" }
      ],
      tip: "Lv100範囲は『スタンダード→ラスト』『フラリッシュ→フィニシング→ラスト』を追加。2分は暁の舞い用のエスプリ50を忘れず残します♡"
    },
    opener: {
      title: "Lv100 ボス開幕",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "クローズドポジション確認", cue: "戦闘前", icon: "Closed_Position.png", reason: "ダンスパートナーが付いていることを確認します。" },
        { name: "スタンダードステップ開始", cue: "戦闘前", icon: "Standard_Step.png", reason: "2ステップを先に踏み、戦闘開始へフィニッシュを合わせます。" },
        { name: "スタンダードフィニッシュ → ラストダンス", cue: "戦闘開始", icon: "Last_Dance.png", reason: "初撃でバフを付け、追加されたラストダンスまで使います。" },
        { name: "テクニカルステップ → 4手", cue: "すぐ開始", icon: "Technical_Step.png", reason: "表示どおり4ステップを踏み、パーティ全体の2分火力時間へ入ります。" },
        { name: "テクニカルフィニッシュ → ティラナ", cue: "1組目", icon: "Tillana.png", reason: "テクニカル後の追撃でエスプリを増やします。" },
        { name: "暁の舞い", cue: "エスプリ50", icon: "Dance_of_the_Dawn.png", reason: "Lv100の最重要追撃。テクニカルフィニッシュ後に剣の舞いが変化するため、エスプリ50を確保して使います。" },
        { name: "攻めのタンゴ → 流星の舞い", cue: "2組目", icon: "Starfall_Dance.png", reason: "タンゴで流星の舞いが使えるようになります。" },
        { name: "フラリッシュ → フィニシングムーブ → ラストダンス", cue: "3組目", icon: "Finishing_Move.png", reason: "フラリッシュ後の新しい連携。続けて扇の舞い【終】、Proc、剣の舞い、扇を溢れない順に使います。" }
      ],
      tip: "Lv100開幕は『スタンダード→ラスト』『テクニカル→ティラナ→暁』『タンゴ→流星』『フラリッシュ→フィニシング→ラスト』の4組で覚えます♡"
    },
    burst: {
      title: "Lv100 2分バースト",
      patch: "7.5",
      verified: true,
      steps: [
        { name: "エスプリ50以上と幻扇を準備", cue: "直前", icon: "Saber_Dance.png", reason: "暁の舞いにエスプリ50が必要です。上限で溢れない範囲でゲージと羽を残します。" },
        { name: "テクニカルステップ → 4手", cue: "120秒ごと", icon: "Technical_Step.png", reason: "パーティ全体の2分バーストを開始します。" },
        { name: "テクニカルフィニッシュ → ティラナ", cue: "1組目", icon: "Tillana.png", reason: "追撃しながらエスプリを増やします。" },
        { name: "暁の舞い", cue: "最優先", icon: "Dance_of_the_Dawn.png", reason: "Lv100の強力な追撃。発動可能時間内かつエスプリ50以上で使います。" },
        { name: "攻めのタンゴ → 流星の舞い", cue: "2組目", icon: "Starfall_Dance.png", reason: "確定クリティカル・ダイレクトヒットの流星をバフ中へ入れます。" },
        { name: "フラリッシュ → フィニシングムーブ", cue: "3組目", icon: "Finishing_Move.png", reason: "ステップなしで強いフィニッシュを使い、スタンダードフィニッシュ効果を更新します。" },
        { name: "ラストダンス → 扇の舞い【終】", cue: "続けて", icon: "Last_Dance.png", reason: "フィニシングムーブ後のラストダンスと、フラリッシュ後の【終】を期限内に消費します。" },
        { name: "剣・Proc・扇を消費", cue: "残り時間", icon: "Fan_Dance_III.png", reason: "エスプリ、Proc、幻扇を溢れさせず、残りのバフ時間へ入れます。" }
      ],
      tip: "Lv100の2分は『テクニカル→ティラナ→暁』『タンゴ→流星』『フラリッシュ→フィニシング→ラスト→終』。暁用エスプリ50が最重要です♡"
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

function getEmptyHotbarSlots(sets) {
  return sets.flatMap(set => Object.entries(set.slots || {}).map(([slotKey, slot]) => ({
    setId: set.id,
    set: set.set,
    trigger: set.trigger,
    slotKey,
    button: slot?.button || "—",
    skillId: slot?.skillId || ""
  }))).filter(slot => !slot.skillId);
}

function formatHotbarLocation(slot) {
  const group = HOTBAR_GROUPS.find(item => item.sides.some(([, id]) => id === slot.setId));
  return `${group?.label || slot.set || "ホットバー"}・${slot.trigger}＋${slot.button}`;
}

function diagnoseHotbar(job, levelData, sets) {
  const registeredIds = getRegisteredSkillIds(sets);
  const registeredRequired = levelData.requiredSkills.filter(skill => registeredIds.has(skill.id));
  const missingRequired = levelData.requiredSkills.filter(skill => !registeredIds.has(skill.id));
  const requiredIds = new Set(levelData.requiredSkills.map(skill => skill.id));
  const allKnownSkills = [...levelData.requiredSkills, ...levelData.recommendedSkills];
  const skillById = new Map(allKnownSkills.map(skill => [skill.id, skill]));
  const rotationIds = new Set(Object.values(levelData.rotationSkillIds).flat());
  const missingFromRotations = [...rotationIds]
    .filter(skillId => !registeredIds.has(skillId) && !requiredIds.has(skillId))
    .map(skillId => skillById.get(skillId) || { id: skillId, name: skillId, reason: "スキル回しで使用するアクション" });
  const emptySlots = getEmptyHotbarSlots(sets);
  return { registeredIds, registeredRequired, missingRequired, missingFromRotations, emptySlots };
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

  if (!levelData.requiredSkillsVerified) {
    box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">
      <p class="diagnosis-item info">Lv${selectedLevel}の正式な診断データはまだ登録されていません。</p>
    </div>`;
    return;
  }

  if (!job.hotbarCurrentVerified && selectedHotbarView === "current") {
    box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">
      <p class="diagnosis-item good">✓ Lv${selectedLevel}の必須スキル ${levelData.requiredSkills.length}個を診断できます♡</p>
      <p class="diagnosis-item warning">⚠ 現在は見本配置です。「ホットバーを登録する」から杏里の配置を1つ保存すると診断を開始します。</p>
    </div>`;
    return;
  }

  if (selectedHotbarView === "recommended") {
    box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">
      <p class="diagnosis-item info">おすすめ配置の自動作成は次の作業で追加します。現在配置の不足診断は「現在の配置」で確認できます♡</p>
    </div>`;
    return;
  }

  const result = diagnoseHotbar(job, levelData, sets);
  const total = levelData.requiredSkills.length;
  const registered = result.registeredRequired.length;
  const firstEmpty = result.emptySlots[0];
  const summaryClass = result.missingRequired.length ? "warning" : "good";
  const items = [
    `<p class="diagnosis-item ${summaryClass}"><strong>必須スキル登録状況：${registered}／${total}</strong><br><small>表示レベル Lv${selectedLevel} と連動して診断しています。</small></p>`
  ];

  result.missingRequired.forEach((skill, index) => {
    const suggestion = result.emptySlots[index]
      ? `<br><small>空き候補：${formatHotbarLocation(result.emptySlots[index])}</small>`
      : `<br><small>空き枠がないため、入れ替え候補は次の診断段階で案内します。</small>`;
    items.push(`<p class="diagnosis-item warning">⚠ <strong>${skill.name}</strong> が未登録です<br><small>${skill.reason}</small>${suggestion}</p>`);
  });

  result.missingFromRotations.forEach(skill => {
    items.push(`<p class="diagnosis-item warning">⚠ <strong>${skill.name}</strong> がスキル回しで使われますが、現在のホットバーにありません<br><small>${skill.reason}</small></p>`);
  });

  if (!result.missingRequired.length && !result.missingFromRotations.length) {
    items.push(`<p class="diagnosis-item good">✓ Lv${selectedLevel}で必要なスキルに不足はありません♡</p>`);
  }

  if (result.emptySlots.length) {
    items.push(`<p class="diagnosis-item info">空き枠：${result.emptySlots.length}枠${firstEmpty ? `（最初の空き：${formatHotbarLocation(firstEmpty)}）` : ""}</p>`);
  } else {
    items.push(`<p class="diagnosis-item info">空き枠はありません。</p>`);
  }

  box.innerHTML = `<h3>診断結果</h3><div class="diagnosis-list">${items.join("")}</div>`;
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
  { id: "set1", label: "SET1（通常）", note: "普段いちばん使う通常クロスホットバー", sides: [["R2", "set1-r2"], ["L2", "set1-l2"]] },
  { id: "set2", label: "SET2（通常）", note: "SET切替で使う2枚目のクロスホットバー", sides: [["R2", "set2-r2"], ["L2", "set2-l2"]] },
  { id: "set3", label: "SET3（通常）", note: "SET切替で使う3枚目のクロスホットバー", sides: [["R2", "set3-r2"], ["L2", "set3-l2"]] },
  { id: "wxhb", label: "WXHB（2回押し）", note: "L2またはR2を素早く2回押して呼び出す下側のホットバー", sides: [["R2×2", "wxhb-r2"], ["L2×2", "wxhb-l2"]] },
  { id: "expanded", label: "拡張クロスホットバー", note: "L2とR2を順番に押して呼び出す追加ホットバー", sides: [["R2→L2", "expanded-r2l2"], ["L2→R2", "expanded-l2r2"]] }
];
let selectedRegistrationGroup = "set1";

const SKILL_ICON_BY_ID = {
  "cascade":"Cascade.png","fountain":"Fountain.png","reverse-cascade":"Reverse_Cascade.png","fountainfall":"Fountainfall.png",
  "windmill":"Windmill.png","bladeshower":"Bladeshower.png","rising-windmill":"Rising_Windmill.png","bloodshower":"Bloodshower.png",
  "standard-step":"Standard_Step.png","fan-dance":"Fan_Dance.png","fan-dance-ii":"Fan_Dance_II.png","en-avant":"En_Avant.png",
  "second-wind":"Second_Wind.png","peloton":"Peloton.png","head-graze":"Head_Graze.png","arms-length":"Arm's_Length.png",
  "leg-graze":"Leg_Graze.png","foot-graze":"Foot_Graze.png",
  "curing-waltz":"Curing_Waltz.png","shield-samba":"Shield_Samba.png","closed-position":"Closed_Position.png",
  "devilment":"Devilment.png","fan-dance-iii":"Fan_Dance_III.png","technical-step":"Technical_Step.png",
  "flourish":"Flourish.png","saber-dance":"Saber_Dance.png","improvisation":"Improvisation.png",
  "tillana":"Tillana.png","fan-dance-iv":"Fan_Dance_IV.png","starfall-dance":"Starfall_Dance.png",
  "last-dance":"Last_Dance.png","finishing-move":"Finishing_Move.png","dance-of-the-dawn":"Dance_of_the_Dawn.png"
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
  const skillMap = new Map(options.map(skill => [skill.id, skill]));
  const grid = $("#hotbarRegistrationGrid");

  function applyRegistrationSelection(select) {
    const side = select.closest('.controller-side');
    if (!side) return;
    const sideIndex = $$('.controller-side', grid).indexOf(side);
    const sideInfo = group.sides[sideIndex];
    if (!sideInfo) return;

    const [, setId] = sideInfo;
    const set = getSetById(setId);
    const key = select.dataset.slotKey;
    const meta = HOTBAR_SLOT_META.find(([slotKey]) => slotKey === key);
    if (!set || !meta) return;

    const skill = skillMap.get(select.value);
    set.slots[key] = skill?.id
      ? { button: meta[2], skillId: skill.id, name: skill.name }
      : { button: meta[2], skillId: "", name: "空き" };

    // iPhoneのネイティブ選択画面を閉じた直後でも、選択した枠だけをその場で更新する。
    // フォーム全体は描き直さないため、選択内容が元へ戻らない。
    const tile = select.closest('.cross-slot');
    if (tile) {
      const caption = $('.skill-caption', tile);
      if (caption) caption.textContent = skill?.name || '空き';

      const oldImage = $('img', tile);
      const oldFallback = $('.slot-fallback', tile);
      const icon = skillIcon(skill?.id || '');
      if (oldImage) oldImage.remove();
      if (oldFallback) oldFallback.remove();

      const media = document.createElement(icon ? 'img' : 'span');
      if (icon) {
        media.src = icon;
        media.alt = skill?.name || '';
        media.addEventListener('error', () => media.remove(), { once: true });
      } else {
        media.className = 'slot-fallback';
        media.textContent = '空き';
      }
      tile.insertBefore(media, tile.firstChild);
    }

    // 選択ごとに下書きを保存。最後の「保存」で正式診断を開始する。
    localStorage.setItem(`anriHotbar-${selectedJob}-all-v6`, JSON.stringify(getSelectedJob().hotbar.current));
  }

  $$('#hotbarRegistrationGrid select').forEach(select => {
    select.addEventListener('input', () => applyRegistrationSelection(select));
    select.addEventListener('change', () => applyRegistrationSelection(select));
  });
}
function openHotbarRegistration(){ if(selectedJob!=="dancer"){showToast("このジョブの登録画面はまだ準備前です♡");return;} renderRegistrationForm(); $("#hotbarDialog").showModal(); }
function saveHotbarRegistration(){
  const group=HOTBAR_GROUPS.find(g=>g.id===selectedRegistrationGroup)||HOTBAR_GROUPS[0]; const skillMap=new Map(getSkillOptions().map(s=>[s.id,s]));
  group.sides.forEach(([trigger,id],sideIndex)=>{ const set=getSetById(id); const side=$$('.visual-registration .controller-side')[sideIndex];
    $$('select',side).forEach(select=>{ const key=select.dataset.slotKey; const meta=HOTBAR_SLOT_META.find(([k])=>k===key); const sk=skillMap.get(select.value); set.slots[key]=sk?.id?{button:meta[2],skillId:sk.id,name:sk.name}:{button:meta[2],skillId:"",name:"空き"}; });
  });
  const job = getSelectedJob();
  job.hotbarCurrentVerified = true;
  localStorage.setItem(`anriHotbar-${selectedJob}-all-v6`,JSON.stringify(job.hotbar.current));
  localStorage.setItem(`anriHotbar-${selectedJob}-verified-v14`,"true");
  $("#hotbarDialog").close(); selectedHotbarView='current';
  $$('#hotbar .tab').forEach(i=>i.classList.toggle('active',i.dataset.hotbarView==='current')); renderHotbar(); showToast(`${group.label}を保存して診断しました♡`);
}
function restoreSavedHotbar(){
  try{
    const raw = localStorage.getItem('anriHotbar-dancer-all-v6') || localStorage.getItem('anriHotbar-dancer-set1');
    const saved = JSON.parse(raw);
    if(Array.isArray(saved)) {
      jobData.dancer.hotbar.current = saved;
      jobData.dancer.hotbarCurrentVerified = localStorage.getItem('anriHotbar-dancer-verified-v14') === 'true' || Boolean(raw);
    }
  }
  catch(e){console.warn('保存済みホットバーを読み込めませんでした',e);}
  ensureAllHotbarGroups();
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
$("#resetHotbarForm").addEventListener("click", () => { localStorage.removeItem(`anriHotbar-${selectedJob}-all-v6`); localStorage.removeItem(`anriHotbar-${selectedJob}-set1`); localStorage.removeItem(`anriHotbar-${selectedJob}-verified-v14`); location.reload(); });
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
