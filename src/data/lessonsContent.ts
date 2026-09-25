import { Lesson } from '../types/curriculum';

export const LESSONS_CONTENT: Lesson[] = [
  {
    id: 'content-reboot',
    categoryId: 'content',
    title: 'Reboot 樣式重設標準',
    officialName: 'Reboot',
    level: '初階',
    summary: 'Bootstrap 的基底重設樣式，統一跨瀏覽器的字體渲染、邊距歸零與 box-sizing 設定。',
    teacherDialogue: '同學們在學原生 CSS 時，是不是常常被不同瀏覽器（Chrome, Safari, Edge）預設的外距搞瘋？Bootstrap 的 Reboot 幫大家把所有預設邊距統一起來，並且把所有元素自動設定為 box-sizing: border-box。這意味著你加上 padding 和 border 時，盒子絕對不會被撐大爆開！',
    keyClasses: [
      { name: 'box-sizing: border-box', desc: 'Reboot 全域設定：寬度計算自動包含內距與邊框' },
      { name: 'margin-top: 0', desc: '所有段落與標題上方預設不帶多餘外距' },
      { name: 'Native font stack', desc: '採用作業系統最高畫質原生無襯線字型' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="card p-3 border-0 bg-light">
    <h3 class="mb-2">🏆 Reboot 重設的優雅之處</h3>
    <p class="text-muted mb-0">
      標題與段落之間有經過人體工學計算的呼吸留白，預設行高為 1.5，即使長時間閱讀校刊文章也不會視覺疲倦！
    </p>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：體驗 Reboot 優美的段落與邊框盒排版',
      scenario: '排版大明高中自主學習計畫公告，要求使用卡片容器包裹，包含 primary 主題標題、導言段落 lead、以及副文字，感受無外距溢出的整潔結構！',
      instructions: [
        '步驟 1：外層建立卡片容器，設定 4 級內距 (padding 4)、去除邊框 (border 0)、加上 sm 輕量陰影並套用亮色背景 (bg-light)。',
        '步驟 2：主題標題設定為主題主要色 (text-primary) 與加粗字重 (fw-bold)。',
        '步驟 3：第一段文章套用導言段落 (lead)，使字級加大且行距舒緩。',
        '步驟 4：附註說明設定為次要灰字 (text-secondary)、小字號 (small)，並消除下外距 (mb-0)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請建立卡片容器，內含 h3, p.lead 與 p.text-secondary -->
  <div>
    <h3>🚀 114 學年度 高中自主學習計畫</h3>
    <p>本學期目標：掌握網頁前端基礎，透過 Bootstrap 打造大明高中班級官網！</p>
    <p>指導老師：資訊科技科 教師團隊</p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="card p-4 border-0 shadow-sm bg-light">
    <h3 class="text-primary fw-bold">🚀 114 學年度 高中自主學習計畫</h3>
    <p class="lead">本學期目標：掌握網頁前端基礎，透過 Bootstrap 打造大明高中班級官網！</p>
    <p class="text-secondary small mb-0">指導老師：資訊科技科 教師團隊</p>
  </div>
</div>`,
      hints: [
        '外層卡片加上 class="card p-4 border-0 shadow-sm bg-light"！',
        '標題加上 class="text-primary fw-bold"，第一段加上 class="lead"！',
      ],
      rules: [
        {
          description: '必須包含 card 容器與 shadow-sm',
          test: (html) => html.includes('card') && html.includes('shadow-sm'),
        },
        {
          description: '標題必須包含 h3 且帶有 text-primary 與 fw-bold',
          test: (html) =>
            html.includes('<h3') &&
            html.includes('text-primary') &&
            html.includes('fw-bold'),
        },
        {
          description: '導言段落必須包含 lead 類別',
          test: (html) => html.includes('lead'),
        },
        {
          description: '附註段落必須包含 text-secondary 或 text-muted',
          test: (html) => html.includes('text-secondary') || html.includes('text-muted'),
        },
      ],
      xp: 80,
    },
  },
  {
    id: 'content-typography',
    categoryId: 'content',
    title: 'Typography 排版美學',
    officialName: 'Typography',
    level: '初階',
    summary: '醒目的大標題 Display 1~6、強調內文 lead、引用塊 blockquote 與文字色彩層次。',
    teacherDialogue: '做好看的網頁，「字體排版」決定了 80% 的質感！想要做校刊封面那種超大震撼標題？用 display-1 到 display-6！想要讓文章第一段特別引人注目？加上 lead 類別，文字會自動變大變優雅！',
    keyClasses: [
      { name: 'display-1 ~ display-6', desc: '巨幅海報風格大標題（比一般 h1 更醒目霸氣）' },
      { name: 'lead', desc: '導言段落（字級加大、行距舒緩，適合文章前言）' },
      { name: 'blockquote', desc: '名人名言引言樣式' },
      { name: 'text-muted', desc: '淡化次要文字色彩' },
    ],
    teacherHtml: `<div class="container py-3">
  <h1 class="display-5 fw-bold text-primary">青春不留白！</h1>
  <p class="lead text-dark">
    高中三年只有一次，無論是社團成發還是學科競賽，勇敢邁出你的第一步。
  </p>
  <figure class="border-start border-4 border-primary ps-3 my-3">
    <blockquote class="blockquote">
      <p class="mb-1">「所謂熱情，就是當世界都在睡覺時，你依然醒著實踐夢想。」</p>
    </blockquote>
    <figcaption class="blockquote-footer">校長開學致詞</figcaption>
  </figure>
</div>`,
    studentTask: {
      title: '挑戰：為校慶熱舞大賽製作震撼標題與引言區塊',
      scenario: '使用 `display-4` 與加粗紅色打造主標題，第一段使用 `lead`，下方加入帶有左側色條的引用名言 `<figure>`、`<blockquote>` 與 `<figcaption class="blockquote-footer">`！',
      instructions: [
        '步驟 1：將主標題升級為巨幅 Display 4 級別，套用加粗字重與紅色危險/熱情語意色 (text-danger)。',
        '步驟 2：前言內文段落套用導言 (lead) 樣式與深色文字 (text-dark)。',
        '步驟 3：建立 figure 引用區塊，左側加上 4 級紅色強調邊線、左側內距與上下外距。',
        '步驟 4：內部使用語意化 blockquote 搭配 blockquote-footer 署名標籤。',
      ],
      starterHtml: `<div class="container py-3">
  <h1>🔥 全國高中熱舞大賽 熱烈報名中</h1>
  <p>總獎金十萬元！全台超過 50 所高中舞團強勢集結，決戰新北市民廣場！</p>
  <!-- 請在下方加入 figure 引用塊 -->
</div>`,
      solutionHtml: `<div class="container py-3">
  <h1 class="display-4 fw-bold text-danger">🔥 全國高中熱舞大賽 熱烈報名中</h1>
  <p class="lead text-dark">總獎金十萬元！全台超過 50 所高中舞團強勢集結，決戰新北市民廣場！</p>
  <figure class="border-start border-4 border-danger ps-3 my-3">
    <blockquote class="blockquote">
      <p class="mb-1">「跳舞不只是動作，而是靈魂在節拍上的綻放。」</p>
    </blockquote>
    <figcaption class="blockquote-footer">評審團主席 寄語</figcaption>
  </figure>
</div>`,
      hints: [
        '在 <h1> 加上 class="display-4 fw-bold text-danger"！',
        '加入 <figure class="border-start border-4 border-danger ps-3 my-3">，內含 blockquote 與 blockquote-footer！',
      ],
      rules: [
        {
          description: '標題必須包含 display-4 與 fw-bold',
          test: (html) => html.includes('display-4') && html.includes('fw-bold'),
        },
        {
          description: '內文段落必須包含 lead',
          test: (html) => html.includes('lead'),
        },
        {
          description: '必須包含 blockquote 引用區塊',
          test: (html) => html.includes('blockquote'),
        },
        {
          description: '必須包含 blockquote-footer 引用來源註記',
          test: (html) => html.includes('blockquote-footer'),
        },
        {
          description: '必須包含左側裝飾邊框 border-start',
          test: (html) => html.includes('border-start'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'content-images',
    categoryId: 'content',
    title: 'Images 圖片響應與修飾',
    officialName: 'Images',
    level: '初階',
    summary: '超重要必學！使用 img-fluid 讓照片永遠不爆版破框，配合 rounded-circle 與 img-thumbnail 呈現精緻頭像。',
    teacherDialogue: '請大家牢記：只要網頁有放照片，99% 都要加上 img-fluid！為什麼？因為手機螢幕只有 375px 寬，如果你放一張 1920px 的大合照，整頁就會被橫向撐爆破圖！加上 img-fluid 後，照片最大寬度就會被限制在 100%，並依比例自適應縮放！',
    keyClasses: [
      { name: 'img-fluid', desc: '響應式圖片（max-width: 100%; height: auto; 絕不爆版）' },
      { name: 'img-thumbnail', desc: '精美縮圖效果（帶 1px 邊框與白邊內距）' },
      { name: 'rounded-circle', desc: '將正方形圖片裁切為正圓形（超適合個人大頭照）' },
    ],
    teacherHtml: `<div class="container py-3">
  <div class="row align-items-center g-3 text-center">
    <div class="col-6">
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400" 
           class="img-fluid rounded shadow-sm" alt="讀書會同學">
      <p class="small text-muted mt-2">.img-fluid 自適應隨視窗縮放</p>
    </div>
    <div class="col-6">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" 
           class="rounded-circle img-thumbnail" style="width: 110px; height: 110px; object-fit: cover;" alt="社長">
      <p class="small text-muted mt-2">.rounded-circle + .img-thumbnail</p>
    </div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：幫社長大頭照打造防爆版正圓形拍立得微縮圖',
      scenario: '個人檔案頁面中，請幫社員大頭貼加上 `img-fluid`、`rounded-circle`、`img-thumbnail` 與 `shadow`，下方標題加上加粗居中，並加入徽章說明！',
      instructions: [
        '步驟 1：為大頭照圖片同時套用防破版自適應縮放 (img-fluid)、正圓形剪裁 (rounded-circle) 與相片微縮白框 (img-thumbnail)。',
        '步驟 2：為圖片加上標準外框陰影 (shadow) 與底部外距，營造拍立得立體層次。',
        '步驟 3：下方標題設定為加粗粗細 (fw-bold) 與主要品牌色 (text-primary)。',
        '步驟 4：加入身分徽章標記 (badge)，套用主要色彩 (bg-primary) 標明「吉他社社長」。',
      ],
      starterHtml: `<div class="container py-3 text-center">
  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200" 
       alt="吉他社長" style="width: 130px; height: 130px; object-fit: cover;">
  <h5>林冠宇 同學</h5>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200" 
       class="img-fluid rounded-circle img-thumbnail shadow mb-3" 
       alt="吉他社長" style="width: 130px; height: 130px; object-fit: cover;">
  <h5 class="fw-bold text-primary mb-1">林冠宇 同學</h5>
  <span class="badge bg-primary">吉他社社長</span>
</div>`,
      hints: [
        '為 <img> 加入 class="img-fluid rounded-circle img-thumbnail shadow mb-3"！',
        '標題下方加上 <span class="badge bg-primary">吉他社社長</span>！',
      ],
      rules: [
        {
          description: '必須包含 img-fluid 類別（響應式防破版）',
          test: (html) => html.includes('img-fluid'),
        },
        {
          description: '必須包含 rounded-circle 類別（正圓形剪裁）',
          test: (html) => html.includes('rounded-circle'),
        },
        {
          description: '必須包含 img-thumbnail 類別（白邊縮圖邊框）',
          test: (html) => html.includes('img-thumbnail'),
        },
        {
          description: '圖片必須包含 shadow 陰影',
          test: (html) => html.includes('shadow'),
        },
        {
          description: '標題必須包含 fw-bold 與 text-primary',
          test: (html) => html.includes('fw-bold') && html.includes('text-primary'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'content-tables',
    categoryId: 'content',
    title: 'Tables 響應式表格',
    officialName: 'Tables',
    level: '初階',
    summary: '班級課表、期中考成績單！table-striped 斑馬紋、table-hover 滑鼠懸停與 table-responsive 水平滾動保護。',
    teacherDialogue: '大家做網頁最怕做表格，因為原生 table 奇醜無比！在 Bootstrap 裡只要加上 class="table"，瞬間變成設計師等級的高級表格。加上 table-striped 就會有深淺交替的斑馬紋，再包一層 table-responsive，手機上看課表就可以左右流暢滑動，不會壓壞版面！',
    keyClasses: [
      { name: 'table', desc: '套用 Bootstrap 基礎乾淨表格樣式' },
      { name: 'table-striped', desc: '隔行不同底色（斑馬紋），大大增加可讀性' },
      { name: 'table-hover', desc: '滑鼠懸停時該列高亮突顯' },
      { name: 'table-responsive', desc: '在小螢幕自動產生水平滾動軸，防止破版' },
      { name: 'table-primary / dark', desc: '表格色彩主題' },
    ],
    teacherHtml: `<div class="container py-3">
  <h6 class="fw-bold text-primary mb-2">📅 高二自然組 週三課表</h6>
  <div class="table-responsive">
    <table class="table table-striped table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>節次</th>
          <th>時間</th>
          <th>科目</th>
          <th>授課老師</th>
          <th>教室</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>第 1 節</td>
          <td>08:10 - 09:00</td>
          <td><span class="badge bg-primary">微積分導論</span></td>
          <td>張老師</td>
          <td>302 教室</td>
        </tr>
        <tr>
          <td>第 2 節</td>
          <td>09:10 - 10:00</td>
          <td><span class="badge bg-success">物理實驗</span></td>
          <td>李老師</td>
          <td>科教館 B1</td>
        </tr>
        <tr>
          <td>第 3 節</td>
          <td>10:10 - 11:00</td>
          <td><span class="badge bg-warning text-dark">英文會話</span></td>
          <td>Sarah</td>
          <td>語言視聽室</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：將簡陋的班級幹部名冊升級為斑馬紋互動表格',
      scenario: '請在外層包裹響應式滾動容器 `table-responsive`，表格套用 `table table-striped table-hover align-middle`，且表頭採用深色主題 `table-dark`！',
      instructions: [
        '步驟 1：外層建立自適應表格保護容器 (table-responsive)，防止手機或窄螢幕閱覽時破版。',
        '步驟 2：表格套用 Bootstrap 標準表格樣式，並同時具備斑馬紋交替底色 (table-striped)、滑鼠懸停高亮 (table-hover) 與內容垂直置中 (align-middle)。',
        '步驟 3：表頭 thead 套用高對比深色主題 (table-dark)，建立醒目的名冊視覺錨點。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方 table 包入 table-responsive 並套用多重類別 -->
  <table>
    <thead>
      <tr>
        <th>職稱</th>
        <th>姓名</th>
        <th>主要職責</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>班長</td>
        <td>王小明</td>
        <td>統籌班務與早自習點名</td>
      </tr>
      <tr>
        <td>風紀股長</td>
        <td>林佩佩</td>
        <td>維護自習秩序與出缺席</td>
      </tr>
      <tr>
        <td>學藝股長</td>
        <td>陳大華</td>
        <td>教室後方黑板報與作業收發</td>
      </tr>
    </tbody>
  </table>
</div>`,
      solutionHtml: `<div class="container py-3">
  <div class="table-responsive">
    <table class="table table-striped table-hover align-middle shadow-sm rounded">
      <thead class="table-dark">
        <tr>
          <th>職稱</th>
          <th>姓名</th>
          <th>主要職責</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge bg-primary">班長</span></td>
          <td>王小明</td>
          <td>統籌班務與早自習點名</td>
        </tr>
        <tr>
          <td><span class="badge bg-warning text-dark">風紀股長</span></td>
          <td>林佩佩</td>
          <td>維護自習秩序與出缺席</td>
        </tr>
        <tr>
          <td><span class="badge bg-info text-dark">學藝股長</span></td>
          <td>陳大華</td>
          <td>教室後方黑板報與作業收發</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
      hints: [
        '外層使用 <div class="table-responsive">！',
        '表格設定 class="table table-striped table-hover align-middle"！',
        '表頭 thead 加上 class="table-dark"！',
      ],
      rules: [
        {
          description: '必須包裹在 table-responsive 水平滾動保護容器中',
          test: (html) => html.includes('table-responsive'),
        },
        {
          description: '表格必須包含 table 與 table-striped 斑馬紋',
          test: (html) => html.includes('table') && html.includes('table-striped'),
        },
        {
          description: '表格必須包含 table-hover 懸停高亮',
          test: (html) => html.includes('table-hover'),
        },
        {
          description: '表格必須包含 align-middle 垂直置中',
          test: (html) => html.includes('align-middle'),
        },
        {
          description: '表頭 thead 必須包含 table-dark 或 table-primary',
          test: (html) => html.includes('table-dark') || html.includes('table-primary'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'content-figures',
    categoryId: 'content',
    title: 'Figures 圖說元件',
    officialName: 'Figures',
    level: '中階',
    summary: '專門用來處理帶有下方說明文字的照片與圖表 (figure, figure-img, figure-caption)。',
    teacherDialogue: '在做科展報告或校刊時，每張實驗照片下面都要寫「圖 1.1：反應前後對比」。HTML 原生有 `<figure>` 與 `<figcaption>`，搭配 Bootstrap 的 figure-img 和 figure-caption，排版瞬間就像科學雜誌一樣專業！',
    keyClasses: [
      { name: 'figure', desc: '圖說主容器' },
      { name: 'figure-img', desc: '圖說專用圖片（自動重設邊距）' },
      { name: 'figure-caption', desc: '圖片下方小字說明文字' },
      { name: 'text-end / text-center', desc: '圖說文字置右或置中' },
    ],
    teacherHtml: `<div class="container py-3 text-center">
  <figure class="figure border p-2 rounded bg-light">
    <img src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=500" 
         class="figure-img img-fluid rounded" alt="科展實驗">
    <figcaption class="figure-caption text-end fst-italic">
      圖 2-3：114 學年度全國高中科展第一名「奈米材料光電轉化率研究」
    </figcaption>
  </figure>
</div>`,
    studentTask: {
      title: '挑戰：為校慶運動會百米破紀錄照片加上專業圖說',
      scenario: '請使用語意化 `<figure class="figure">`，內部圖片套用 `figure-img img-fluid rounded`，下方圖說使用 `<figcaption class="figure-caption">` 並套用斜體與右對齊或置中！',
      instructions: [
        '步驟 1：外層建立語意化圖說容器 (figure)，並加上細邊框、2 級內距 (padding 2)、圓角與亮色背景 (bg-light)。',
        '步驟 2：圖片需同時具備圖說專用圖檔樣式 (figure-img)、自適應縮放防破版 (img-fluid) 與圓角邊緣。',
        '步驟 3：下方說明文字使用專屬圖說註解標籤 (figcaption) 與類別 (figure-caption)，並設定靠右對齊 (text-end) 與斜體樣式。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請將下方結構包裝為 Bootstrap Figure -->
  <div>
    <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500" 
         alt="田徑賽跑">
    <p>高二 1 班 林同學 破大會 100 公尺短跑紀錄 (10秒82)</p>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3 text-center">
  <figure class="figure border p-2 rounded bg-light">
    <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500" 
         class="figure-img img-fluid rounded" alt="田徑賽跑">
    <figcaption class="figure-caption text-end fst-italic">
      高二 1 班 林同學 破大會 100 公尺短跑紀錄 (10秒82)
    </figcaption>
  </figure>
</div>`,
      hints: [
        '使用 <figure class="figure border p-2 rounded bg-light"> 包覆！',
        '圖片放 class="figure-img img-fluid rounded"，文字放 <figcaption class="figure-caption text-end fst-italic">！',
      ],
      rules: [
        {
          description: '外層必須包含 figure 標籤與 figure 類別',
          test: (html) => html.includes('<figure') && html.includes('figure'),
        },
        {
          description: '圖片必須包含 figure-img 與 img-fluid 類別',
          test: (html) => html.includes('figure-img') && html.includes('img-fluid'),
        },
        {
          description: '說明文字必須包含 figcaption 標籤與 figure-caption 類別',
          test: (html) => html.includes('<figcaption') && html.includes('figure-caption'),
        },
        {
          description: '圖說文字必須包含對齊設定 (text-end 或 text-center)',
          test: (html) => html.includes('text-end') || html.includes('text-center'),
        },
      ],
      xp: 85,
    },
  },
];
