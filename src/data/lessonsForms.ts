import { Lesson } from '../types/curriculum';

export const LESSONS_FORMS: Lesson[] = [
  {
    id: 'forms-overview',
    categoryId: 'forms',
    title: 'Forms 表單總覽',
    officialName: 'Overview',
    level: '初階',
    summary: '表單是網站與使用者互動的心臟！認識 form-label、form-control 與 form-text 輔助文字。',
    teacherDialogue: '社團招募新社員、運動會報名、班級點歌，都要靠表單！Bootstrap 把原生看起來乾癟的輸入框，加上了細緻的邊框、圓角、與點選時漂亮的淡紫色光暈（focus ring）。記得：標籤要加 form-label，輸入框加 form-control，小字說明用 form-text！',
    keyClasses: [
      { name: 'form-label', desc: '輸入欄位的說明文字標籤' },
      { name: 'form-control', desc: '核心輸入框類別（套用滿版寬度、圓角與焦點光暈）' },
      { name: 'form-text', desc: '欄位下方灰色小字輔助說明' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 480px;">
  <div class="card p-3 shadow-sm border-0 bg-light">
    <h5 class="fw-bold text-primary mb-3">📝 班級聯絡資料更新</h5>
    <div class="mb-3">
      <label for="studentEmail" class="form-label fw-bold">大明高中學生信箱</label>
      <input type="email" class="form-control" id="studentEmail" placeholder="s112001@school.edu.tw">
      <div class="form-text">我們絕不會向任何校外第三方透露你的信箱。</div>
    </div>
    <button class="btn btn-primary w-100">提交資料</button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造吉他社社員報名表單卡片',
      scenario: '請在大明高中吉他社報名卡片中，建立真實姓名與學生信箱兩個標準表單欄位，包含 `form-label`、`form-control`、`form-text`，並在底部放置滿版送出按鈕！',
      instructions: [
        '步驟 1：外層建立卡片容器，設定 4 級內距 (padding 4)、輕量陰影 (shadow-sm)、去除邊框 (border-0) 與亮色背景 (bg-light)。',
        '步驟 2：欄位標籤設定為標準表單標籤樣式 (form-label) 與加粗字重 (fw-bold)。',
        '步驟 3：輸入框套用標準表單控制項樣式 (form-control) 並設定佔位提示文字 (placeholder)。',
        '步驟 4：學生信箱下方加上表單輔助說明小字 (form-text)。',
        '步驟 5：底部放置主要色彩 (btn-primary) 且佔滿寬度 (w-100) 的報名按鈕。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 480px;">
  <!-- 請建立卡片容器，內含標準表單與提交按鈕 -->
  <div>
    <h4>🎸 吉他社新社員報名</h4>
    <div>
      <label for="name">真實姓名</label>
      <input type="text" id="name" placeholder="例如：林書豪">
    </div>
    <div>
      <label for="email">學生信箱</label>
      <input type="email" id="email" placeholder="s113001@dms.edu.tw">
      <div>請填寫學校信箱以接收面試通知。</div>
    </div>
    <button>立即提交報名</button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 480px;">
  <div class="card p-4 shadow-sm border-0 bg-light">
    <h4 class="fw-bold text-primary mb-3">🎸 吉他社新社員報名</h4>
    <div class="mb-3">
      <label for="name" class="form-label fw-bold">真實姓名</label>
      <input type="text" class="form-control" id="name" placeholder="例如：林書豪">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label fw-bold">學生信箱</label>
      <input type="email" class="form-control" id="email" placeholder="s113001@dms.edu.tw">
      <div class="form-text">請填寫學校信箱以接收面試通知。</div>
    </div>
    <button class="btn btn-primary w-100 fw-bold">立即提交報名</button>
  </div>
</div>`,
      hints: [
        '外層包裹 <div class="card p-4 shadow-sm border-0 bg-light">！',
        '每個欄位外面包 class="mb-3"，label 加 form-label fw-bold，input 加 form-control！',
      ],
      rules: [
        {
          description: '外層必須包含 card 容器與 shadow-sm',
          test: (html) => html.includes('card') && html.includes('shadow-sm'),
        },
        {
          description: '必須包含 form-label 類別',
          test: (html) => html.includes('form-label'),
        },
        {
          description: '必須包含 form-control 類別',
          test: (html) => html.includes('form-control'),
        },
        {
          description: '必須包含 form-text 輔助文字說明',
          test: (html) => html.includes('form-text'),
        },
        {
          description: '底部必須包含 btn-primary 按鈕',
          test: (html) => html.includes('btn-primary'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-form-control',
    categoryId: 'forms',
    title: 'Form control 輸入框與多行文字',
    officialName: 'Form control',
    level: '初階',
    summary: '掌握單行文字框、密碼框、檔案上傳 (file) 以及多行留言板 (textarea)。',
    teacherDialogue: '當同學要在網站上寫長篇自我介紹時，單行 input 就裝不下了，這時候就要用 `<textarea class="form-control">`！另外如果想要超大醒目的搜尋列，還可以加上 form-control-lg；想要緊湊的表格輸入就用 form-control-sm。',
    keyClasses: [
      { name: 'form-control', desc: '適用於 text, email, password, file, textarea' },
      { name: 'form-control-lg / sm', desc: '加大尺寸或緊湊尺寸' },
      { name: 'form-control-color', desc: '取色器色彩選擇框' },
      { name: 'readonly / disabled', desc: '唯讀或禁用狀態' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 500px;">
  <div class="mb-3">
    <label class="form-label fw-bold">社團大尺寸搜尋</label>
    <input class="form-control form-control-lg" type="text" placeholder="輸入關鍵字找社團...">
  </div>
  <div class="mb-3">
    <label class="form-label fw-bold">入社自我介紹與期望 (多行)</label>
    <textarea class="form-control" rows="3" placeholder="談談你為什麼想加入天文社..."></textarea>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校刊徵稿專欄設計大尺寸標題與多行心得留言框',
      scenario: '請製作投稿專欄：標題輸入框採用大尺寸 `form-control-lg`，下方內文使用多行文字框 `<textarea class="form-control" rows="4">`，並附帶 `form-label fw-bold` 與 `form-text`！',
      instructions: [
        '步驟 1：投稿標題使用大尺寸表單輸入框 (form-control-lg)，增加視覺張力。',
        '步驟 2：心得內文使用標準多行文字輸入區 (textarea) 並套用表單控制樣式 (form-control)，高度設定為 4 行 (rows="4")。',
        '步驟 3：所有輸入欄位標籤皆需使用表單標籤 (form-label) 與加粗字重 (fw-bold)。',
        '步驟 4：文字區下方提供表單輔助提示說明 (form-text)，給予字數建議。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 500px;">
  <div class="mb-3">
    <label>📌 投稿標題</label>
    <input type="text" placeholder="例如：高二那年夏天">
  </div>
  <div class="mb-3">
    <label>📝 投稿內文</label>
    <!-- 請在此處建立 textarea 並套用 form-control 與 rows="4" -->
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 500px;">
  <div class="mb-3">
    <label class="form-label fw-bold">📌 投稿標題</label>
    <input class="form-control form-control-lg" type="text" placeholder="例如：高二那年夏天">
  </div>
  <div class="mb-3">
    <label class="form-label fw-bold">📝 投稿內文</label>
    <textarea class="form-control" rows="4" placeholder="請在此輸入你的散文或詩作..."></textarea>
    <div class="form-text">建議字數在 800 至 1500 字之間。</div>
  </div>
</div>`,
      hints: [
        '標題輸入框加上 class="form-control form-control-lg"！',
        '多行文字框寫 <textarea class="form-control" rows="4"></textarea>！',
      ],
      rules: [
        {
          description: '標題輸入框必須包含 form-control-lg 大尺寸類別',
          test: (html) => html.includes('form-control-lg'),
        },
        {
          description: '必須包含 textarea 標籤且設定 rows="4"',
          test: (html) => html.includes('<textarea') && html.includes('rows="4"'),
        },
        {
          description: '多行文字框必須套用 form-control 類別',
          test: (html) => html.includes('form-control'),
        },
        {
          description: '必須包含 form-label 類別',
          test: (html) => html.includes('form-label'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-select',
    categoryId: 'forms',
    title: 'Select 下拉選單',
    officialName: 'Select',
    level: '初階',
    summary: '告別原生簡陋的箭頭！form-select 打造具備自定義箭頭與流暢光暈的優雅下拉選單。',
    teacherDialogue: '選年級、選班級、選衣服尺寸時，一定會用到下拉選單！記得：原生 `<select>` 必須搭配 class="form-select"（注意不是 form-control 喔！），這樣右側就會出現 Bootstrap 特別客製的高質感向下箭頭圖示！',
    keyClasses: [
      { name: 'form-select', desc: '下拉選單基礎類別' },
      { name: 'form-select-lg / sm', desc: '加大或縮小尺寸' },
      { name: 'multiple', desc: '允許多選' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 450px;">
  <label class="form-label fw-bold">選擇志願社團</label>
  <select class="form-select mb-3">
    <option selected disabled>-- 請選擇你的第一志願 --</option>
    <option value="1">🎸 流行音樂熱音社</option>
    <option value="2">🔭 宇宙天文研習社</option>
    <option value="3">💻 青年程式駭客社</option>
    <option value="4">🏀 男子女子籃球社</option>
  </select>
</div>`,
    studentTask: {
      title: '挑戰：製作班級幹部選舉的職位選擇下拉單',
      scenario: '請使用 `<select class="form-select">` 製作幹部志願選單，包含預設 disabled 提示項目與至少 3 個可選職位，並搭配 `form-label fw-bold` 與確認按鈕！',
      instructions: [
        '步驟 1：在下拉選單標籤套用 Bootstrap 標準表單選擇器樣式 (form-select)。',
        '步驟 2：第一個 option 選項設定為預設選取 (selected) 且禁止選拔提交 (disabled) 的引導提示。',
        '步驟 3：下拉選單內至少包含 3 個可供選取的幹部職稱選項。',
        '步驟 4：加入主要色彩 (btn-primary) 的確認登記按鈕，並具備上方外距。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 450px;">
  <label>欲參選幹部職稱：</label>
  <select>
    <option>-- 請選擇職稱 --</option>
    <option>班長</option>
    <option>副班長</option>
    <option>學藝股長</option>
  </select>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 450px;">
  <div class="card p-3 shadow-sm border-0 bg-light">
    <label class="form-label fw-bold">欲參選幹部職稱：</label>
    <select class="form-select">
      <option selected disabled>-- 請選擇欲參選職務 --</option>
      <option value="1">班長</option>
      <option value="2">副班長</option>
      <option value="3">學藝股長</option>
    </select>
    <button class="btn btn-primary mt-3 fw-bold">確認登記</button>
  </div>
</div>`,
      hints: [
        '為 <select> 加上 class="form-select"！',
        '第一個選項寫 <option selected disabled>-- 請選擇欲參選職務 --</option>！',
      ],
      rules: [
        {
          description: '必須包含 form-select 類別',
          test: (html) => html.includes('form-select'),
        },
        {
          description: '第一個選項必須設定 selected 與 disabled',
          test: (html) => html.includes('selected') && html.includes('disabled'),
        },
        {
          description: '必須至少包含 4 個 option 選項（含預設提示）',
          test: (html) => (html.match(/<option/g) || []).length >= 4,
        },
        {
          description: '必須包含 form-label 標籤類別',
          test: (html) => html.includes('form-label'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-checks-radios',
    categoryId: 'forms',
    title: 'Checks & radios 核取與單選',
    officialName: 'Checks & radios',
    level: '初階',
    summary: '多選核取方塊 (checkbox)、單選圓鈕 (radio) 以及超酷炫的滑動開關 (form-switch)。',
    teacherDialogue: '做問卷調查或便當訂購必備！Checkbox 可以多選（例如「你想吃哪些配菜」）；Radio 只能單選（例如「你要吃雞腿還是排骨」）。Bootstrap 還附贈了一個超高人氣的功能：加上 form-switch，勾選框瞬間變成像 iPhone 設定裡的滑動開關！',
    keyClasses: [
      { name: 'form-check', desc: '選項的外層包裹容器' },
      { name: 'form-check-input', desc: '勾選方塊或圓鈕本體' },
      { name: 'form-check-label', desc: '點選文字也能觸發勾選' },
      { name: 'form-switch', desc: '開關滑動切換器效果' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 450px;">
  <h6 class="fw-bold text-primary mb-2">🍱 今日班級便當選擇 (單選 Radio)</h6>
  <div class="form-check mb-2">
    <input class="form-check-input" type="radio" name="lunch" id="lunch1" checked>
    <label class="form-check-label" for="lunch1">酥炸大雞腿便當 ($95)</label>
  </div>
  <div class="form-check mb-3">
    <input class="form-check-input" type="radio" name="lunch" id="lunch2">
    <label class="form-check-label" for="lunch2">香滷排骨便當 ($90)</label>
  </div>

  <h6 class="fw-bold text-success mb-2">⚙️ 偏好開關 (form-switch)</h6>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked>
    <label class="form-check-label" for="flexSwitchCheckDefault">即時接收班級 LINE 群重要通知</label>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造「同意社團規章」Checkbox 與「通知開關」form-switch',
      scenario: '請製作兩個選項：第一個為標準同意規章的 `checkbox`，第二個為 iPhone 風格的滑動開關 `form-switch`，預設為開啟狀態 `checked`！',
      instructions: [
        '步驟 1：第一個核取方塊使用標準選項包裹容器 (form-check)，內部包含核取控制項 (form-check-input) 與對應標籤 (form-check-label)。',
        '步驟 2：第二個開關切換器使用滑動開關容器 (form-check form-switch)，營造 iOS 質感的滑動切換。',
        '步驟 3：開關切換器需加入預設開啟狀態 (checked 屬性)。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 450px;">
  <!-- 請將下方改造為標準 form-check 與 form-switch -->
  <div>
    <input type="checkbox" id="agree">
    <label for="agree">我已詳閱並同意熱舞社入社守則與定期出席規定</label>
  </div>
  <div>
    <input type="checkbox" id="notify">
    <label for="notify">接收社團重要排練簡訊提醒</label>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 450px;">
  <div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" id="agree" required>
    <label class="form-check-label" for="agree">
      我已詳閱並同意熱舞社入社守則與定期出席規定
    </label>
  </div>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" id="notify" checked>
    <label class="form-check-label" for="notify">
      接收社團重要排練簡訊提醒
    </label>
  </div>
</div>`,
      hints: [
        '第一項包裹 <div class="form-check mb-3">！',
        '第二項包裹 <div class="form-check form-switch">，並在 input 加上 checked！',
      ],
      rules: [
        {
          description: '必須包含 form-check 類別',
          test: (html) => html.includes('form-check'),
        },
        {
          description: '必須包含 form-check-input 與 form-check-label',
          test: (html) =>
            html.includes('form-check-input') && html.includes('form-check-label'),
        },
        {
          description: '必須包含 form-switch 滑動開關類別',
          test: (html) => html.includes('form-switch'),
        },
        {
          description: '開關必須包含 checked 預設勾選屬性',
          test: (html) => html.includes('checked'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-range',
    categoryId: 'forms',
    title: 'Range 範圍滑桿',
    officialName: 'Range',
    level: '中階',
    summary: '直覺的數值調整器！form-range 完美支援音量調整、滿意度評分與預算範圍拉桿。',
    teacherDialogue: '給高中生活動評分時，用輸入框填數字太枯燥了！`<input type="range" class="form-range">` 可以讓使用者滑動手指給出 1 到 10 分的評價，配合 min、max、step 屬性，操作體驗超級順滑！',
    keyClasses: [
      { name: 'form-range', desc: '美化原生滑動條軌道與拖拉圓鈕' },
      { name: 'min / max', desc: '定義滑桿最小值與最大值' },
      { name: 'step', desc: '滑動跳躍刻度（預設為 1）' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 450px;">
  <label for="customRange1" class="form-label fw-bold">
    校慶園遊會籌辦滿意度 (1 ~ 10 分)
  </label>
  <input type="range" class="form-range" min="1" max="10" step="1" id="customRange1" value="8">
  <div class="d-flex justify-content-between text-muted small">
    <span>1分 (待加強)</span>
    <span>5分 (普通)</span>
    <span>10分 (超滿意!)</span>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作音樂祭舞台音量調節滑桿與刻度尺標',
      scenario: '請為舞台音控系統設計一個 `form-range` 滑桿，範圍設為 0 到 100，步長為 5，並在下方使用 `d-flex justify-content-between` 排列刻度說明！',
      instructions: [
        '步驟 1：數值滑動輸入條套用範圍滑桿樣式 (form-range)。',
        '步驟 2：設定滑桿數值範圍：最小值 min="0"、最大值 max="100" 與跳躍刻度 step="5"。',
        '步驟 3：滑桿上方標籤套用表單標籤 (form-label) 與加粗字重 (fw-bold)。',
        '步驟 4：下方刻度說明使用彈性盒 (d-flex) 與兩端分散對齊 (justify-content-between) 均勻排列。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 450px;">
  <label>🔊 主舞台監聽音量：</label>
  <!-- 請在此加入 form-range 滑桿與刻度標籤 -->
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 450px;">
  <label for="volumeRange" class="form-label fw-bold">🔊 主舞台監聽音量：</label>
  <input type="range" class="form-range" id="volumeRange" min="0" max="100" step="5" value="75">
  <div class="d-flex justify-content-between text-muted small mt-1">
    <span>0% (靜音)</span>
    <span>50% (適中)</span>
    <span>100% (極限震撼)</span>
  </div>
</div>`,
      hints: [
        '建立 <input type="range" class="form-range" min="0" max="100" step="5">！',
        '下方刻度加上 class="d-flex justify-content-between text-muted small"！',
      ],
      rules: [
        {
          description: '必須包含 form-range 類別',
          test: (html) => html.includes('form-range'),
        },
        {
          description: '必須設定 min="0" 與 max="100"',
          test: (html) => html.includes('min="0"') && html.includes('max="100"'),
        },
        {
          description: '必須設定 step 步長屬性',
          test: (html) => html.includes('step='),
        },
        {
          description: '必須包含 d-flex 與 justify-content-between 刻度排版',
          test: (html) =>
            html.includes('d-flex') && html.includes('justify-content-between'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-input-group',
    categoryId: 'forms',
    title: 'Input group 前綴後綴群組',
    officialName: 'Input group',
    level: '中階',
    summary: '將輸入框與前綴文字 (如 @, NT$, https://) 或按鈕無縫接合為一個體系的超實用元件。',
    teacherDialogue: '比如要輸入 IG 帳號時，左邊固定顯示一個「@」，右邊才是同學填寫的帳號；或是金額輸入框前面固定帶「NT$」，後面帶「元」。使用 input-group 與 input-group-text，就能把文字和輸入框無縫黏在一起！',
    keyClasses: [
      { name: 'input-group', desc: '群組外層容器' },
      { name: 'input-group-text', desc: '前綴或後綴固定標籤' },
      { name: 'btn inside input-group', desc: '可將搜尋按鈕直接黏在輸入框右側' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 500px;">
  <!-- 社群帳號前綴 -->
  <div class="input-group mb-3">
    <span class="input-group-text bg-light">@</span>
    <input type="text" class="form-control" placeholder="IG 官方帳號 (例如 cths_guitar)">
  </div>
  
  <!-- 搜尋框帶按鈕 -->
  <div class="input-group">
    <input type="text" class="form-control" placeholder="輸入同學學號搜尋...">
    <button class="btn btn-primary" type="button">🔍 查詢</button>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：為校慶義賣製作「NT$ 金額」與「確認按鈕」完整輸入群組',
      scenario: '義賣攤位定價系統需要一個前綴為「NT$」且右邊帶有「確認」按鈕的無縫輸入群組！',
      instructions: [
        '步驟 1：外層建立輸入群組容器 (input-group)，將內部文字與按鈕無縫接合為一體。',
        '步驟 2：左側加入加粗固定文字前綴標籤 (input-group-text)，內容顯示「NT$」。',
        '步驟 3：中間放置數值型態 (type="number") 的標準表單控制輸入框 (form-control)，並包含 placeholder。',
        '步驟 4：右側緊鄰成功綠色主題 (btn-success) 的加粗確認定價按鈕。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 450px;">
  <label class="form-label fw-bold">義賣定價：</label>
  <!-- 請在此建立 input-group 結構 -->
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 450px;">
  <label class="form-label fw-bold">義賣定價：</label>
  <div class="input-group shadow-sm">
    <span class="input-group-text fw-bold">NT$</span>
    <input type="number" class="form-control" placeholder="請輸入義賣價格">
    <button class="btn btn-success fw-bold" type="button">確認定價</button>
  </div>
</div>`,
      hints: [
        '外層 <div class="input-group shadow-sm">，裡面依序放 span.input-group-text、input.form-control 與 button.btn-success！',
      ],
      rules: [
        {
          description: '必須包含 input-group 類別',
          test: (html) => html.includes('input-group'),
        },
        {
          description: '必須包含 input-group-text 類別且包含 NT$',
          test: (html) => html.includes('input-group-text') && html.includes('NT$'),
        },
        {
          description: '必須包含 form-control 輸入框',
          test: (html) => html.includes('form-control'),
        },
        {
          description: '右側必須包含 btn-success 按鈕',
          test: (html) => html.includes('btn-success'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-floating-labels',
    categoryId: 'forms',
    title: 'Floating labels 浮動標籤',
    officialName: 'Floating labels',
    level: '中階',
    summary: '如同 Google 與頂級 App 的現代互動效果：點選輸入框時，提示文字優雅縮小並漂浮到頂部。',
    teacherDialogue: '同學們在登入 Google 或 Netflix 時，是不是看過輸入框裡的文字在點擊後會自動飄到左上角變成小標籤？這在 Bootstrap 裡叫做 form-floating！使用時非常簡單：外層包一個 form-floating，先寫 `<input>` 再寫 `<label>` 就大功告成了！',
    keyClasses: [
      { name: 'form-floating', desc: '浮動標籤外層容器' },
      { name: 'input must come before label', desc: 'HTML 結構規範：input 標籤必須寫在 label 標籤前面' },
      { name: 'placeholder required', desc: 'input 必須填寫 placeholder 屬性以觸發 CSS 偽類動畫' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 450px;">
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
    <label for="floatingInput">學生電子信箱</label>
  </div>
  <div class="form-floating">
    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
    <label for="floatingPassword">校園 Portal 登入密碼</label>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：製作大明高中圖書館與數位學生證雙重浮動標籤登入卡',
      scenario: '請使用 `form-floating` 為借書證號與密碼建立兩個浮動標籤輸入框，注意 input 必須在 label 前面且帶有 placeholder！',
      instructions: [
        '步驟 1：外層建立卡片容器，設定 4 級內距 (padding 4)、輕量陰影 (shadow-sm)、去除邊框 (border-0) 與亮色背景 (bg-light)。',
        '步驟 2：借書證號與密碼欄位分別使用浮動標籤容器 (form-floating)，並給予適當底部外距 (mb-3)。',
        '步驟 3：注意浮動標籤結構規範：input 必須置於 label 前方，且輸入框必須同時具備 form-control 與非空 placeholder。',
        '步驟 4：底部加入主要色彩 (btn-primary) 且佔滿寬度 (w-100) 的加粗登入按鈕。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 450px;">
  <!-- 請將下方改造為包含兩個 form-floating 的登入卡片 -->
  <div>
    <h4>📚 大明高中圖書館登入</h4>
    <div>
      <input type="text" id="libCard" placeholder="借書證號">
      <label for="libCard">借書證號</label>
    </div>
    <div>
      <input type="password" id="libPass" placeholder="登入密碼">
      <label for="libPass">登入密碼</label>
    </div>
    <button>登入</button>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 450px;">
  <div class="card p-4 shadow-sm border-0 bg-light">
    <h4 class="fw-bold text-primary mb-3">📚 大明高中圖書館登入</h4>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="libCard" placeholder="請輸入借書證號">
      <label for="libCard">借書證號 (學號)</label>
    </div>
    <div class="form-floating mb-3">
      <input type="password" class="form-control" id="libPass" placeholder="請輸入密碼">
      <label for="libPass">登入密碼</label>
    </div>
    <button class="btn btn-primary w-100 fw-bold">立即登入</button>
  </div>
</div>`,
      hints: [
        '外層使用 class="card p-4 shadow-sm border-0 bg-light"！',
        '兩個欄位皆包在 class="form-floating mb-3"，input 放上面帶 placeholder，label 放下面！',
      ],
      rules: [
        {
          description: '外層必須包含 card 容器與 shadow-sm',
          test: (html) => html.includes('card') && html.includes('shadow-sm'),
        },
        {
          description: '必須包含至少兩個 form-floating 浮動標籤容器',
          test: (html) => (html.match(/form-floating/g) || []).length >= 2,
        },
        {
          description: '輸入框必須包含 form-control 與 placeholder',
          test: (html) => html.includes('form-control') && html.includes('placeholder='),
        },
        {
          description: '底部必須包含 btn-primary 登入按鈕',
          test: (html) => html.includes('btn-primary'),
        },
      ],
      xp: 85,
    },
  },
  {
    id: 'forms-layout',
    categoryId: 'forms',
    title: 'Form Layout 表單排版',
    officialName: 'Layout',
    level: '高階',
    summary: '將 12 欄網格系統與表單深度融合，製作手機單欄、電腦雙欄的多欄位註冊表。',
    teacherDialogue: '大家做大型註冊表單時，如果每個欄位都單獨一行，整張表單會被拉得像萬里長城一樣長！透過在 form 裡面使用 `<div class="row g-3">` 與 `col-md-6`，電腦版上「姓氏」和「名字」就會並排，手機版則自動直向換行！',
    keyClasses: [
      { name: 'row g-3', desc: '表單專用的標準間距網格' },
      { name: 'col-md-6', desc: '電腦版雙欄並列，手機版單欄' },
      { name: 'col-md-4 / col-md-8', desc: '非對稱表單比例' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 600px;">
  <form class="row g-3 bg-light p-4 rounded shadow-sm">
    <div class="col-md-6">
      <label class="form-label fw-bold">姓氏</label>
      <input type="text" class="form-control" placeholder="陳">
    </div>
    <div class="col-md-6">
      <label class="form-label fw-bold">名字</label>
      <input type="text" class="form-control" placeholder="大明">
    </div>
    <div class="col-12">
      <label class="form-label fw-bold">通訊地址</label>
      <input type="text" class="form-control" placeholder="台北市中正區中山南路...">
    </div>
  </form>
</div>`,
    studentTask: {
      title: '挑戰：為社團聯席會議排版多欄複合響應式幹部報名表',
      scenario: '請製作「就讀年級 (col-md-4)」與「班級座號 (col-md-8)」的並排欄位，並加上第三欄「職務志願 (col-12)」與確認按鈕，外層使用 `row g-3`！',
      instructions: [
        '步驟 1：外層表單宣告為網格列 (row)，設定 3 級網格間距 (gutter 3)、亮色背景 (bg-light)、4 級內距 (padding 4)、圓角與陰影。',
        '步驟 2：就讀年級設定為手機滿版 (col-12)、桌機佔 4 欄 (col-md-4)。',
        '步驟 3：班級座號設定為手機滿版 (col-12)、桌機佔 8 欄 (col-md-8) 與年級並排。',
        '步驟 4：職務志願與送出按鈕皆設定為整行滿版 (col-12)。',
      ],
      starterHtml: `<div class="container py-3">
  <!-- 請在此加入 row g-3 並給予 col-md-4、col-md-8 與 col-12 -->
  <div>
    <div>
      <label>就讀年級</label>
      <input type="text" placeholder="例如：高二">
    </div>
    <div>
      <label>班級與座號</label>
      <input type="text" placeholder="例如：204班 18號">
    </div>
    <div>
      <label>擬角逐幹部職位</label>
      <input type="text" placeholder="例如：主席 / 活動長">
    </div>
    <div>
      <button>送出報名表</button>
    </div>
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 650px;">
  <form class="row g-3 bg-light p-4 rounded shadow-sm">
    <div class="col-12 col-md-4">
      <label class="form-label fw-bold">就讀年級</label>
      <input type="text" class="form-control" placeholder="例如：高二">
    </div>
    <div class="col-12 col-md-8">
      <label class="form-label fw-bold">班級與座號</label>
      <input type="text" class="form-control" placeholder="例如：204班 18號">
    </div>
    <div class="col-12">
      <label class="form-label fw-bold">擬角逐幹部職位</label>
      <input type="text" class="form-control" placeholder="例如：主席 / 活動長">
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary w-100 fw-bold">送出報名表</button>
    </div>
  </form>
</div>`,
      hints: [
        '外層使用 class="row g-3 bg-light p-4 rounded shadow-sm"！',
        '三個欄位分別是 col-12 col-md-4、col-12 col-md-8、col-12！',
      ],
      rules: [
        {
          description: '外層必須包含 row 類別與網格間距 g-3',
          test: (html) => html.includes('row') && /g-[234]/.test(html),
        },
        {
          description: '必須包含 col-md-4 欄位設定',
          test: (html) => html.includes('col-md-4'),
        },
        {
          description: '必須包含 col-md-8 欄位設定',
          test: (html) => html.includes('col-md-8'),
        },
        {
          description: '必須包含 col-12 欄位設定',
          test: (html) => html.includes('col-12'),
        },
        {
          description: '必須包含 form-label 與 form-control',
          test: (html) => html.includes('form-label') && html.includes('form-control'),
        },
      ],
      xp: 90,
    },
  },
  {
    id: 'forms-validation',
    categoryId: 'forms',
    title: 'Form Validation 表單驗證回饋',
    officialName: 'Validation',
    level: '高階',
    summary: '最專業的互動細節！is-valid 綠色勾勾、is-invalid 紅色驚嘆號與 invalid-feedback 錯誤提示。',
    teacherDialogue: '當同學填表單漏填了必填項目，如果只是跳出醜陋的瀏覽器 alert，使用者體驗很差！Bootstrap 提供了超好看的驗證提示：輸入正確時邊框變綠色並帶勾勾圖示（is-valid）；輸入錯誤或未填時邊框變紅色（is-invalid），下方還能用 invalid-feedback 顯示貼心的錯誤說明文字！',
    keyClasses: [
      { name: 'is-valid', desc: '驗證成功狀態（綠色邊框與綠勾標記）' },
      { name: 'is-invalid', desc: '驗證失敗狀態（紅色邊框與驚嘆號標記）' },
      { name: 'valid-feedback', desc: '輸入正確時顯示的綠色鼓勵文字' },
      { name: 'invalid-feedback', desc: '輸入有誤時顯示的紅色提示文字' },
    ],
    teacherHtml: `<div class="container py-3" style="max-width: 480px;">
  <!-- 成功範例 -->
  <div class="mb-3">
    <label class="form-label fw-bold">學生帳號</label>
    <input type="text" class="form-control is-valid" value="alex_guitar_hero">
    <div class="valid-feedback">太棒了！這個社群帳號可以使用！</div>
  </div>
  
  <!-- 失敗範例 -->
  <div class="mb-3">
    <label class="form-label fw-bold">緊急聯絡人電話</label>
    <input type="text" class="form-control is-invalid" value="0912">
    <div class="invalid-feedback">電話號碼長度不足，請輸入完整的 10 碼手機號碼！</div>
  </div>
</div>`,
    studentTask: {
      title: '挑戰：打造雙重即時表單驗證狀態 (is-valid 與 is-invalid)',
      scenario: '請製作兩個輸入欄位：第一個帳號欄位呈現驗證成功狀態 (`is-valid` + `valid-feedback`)；第二個學號欄位呈現驗證失敗狀態 (`is-invalid` + `invalid-feedback`)！',
      instructions: [
        '步驟 1：第一組帳號欄位輸入框標記為驗證通過狀態 (is-valid)，並在下方加入驗證成功綠色回饋提示 (valid-feedback)。',
        '步驟 2：第二組學號欄位輸入框標記為驗證不通過狀態 (is-invalid)，並在下方加入驗證失敗紅色警示提示 (invalid-feedback)。',
        '步驟 3：兩組欄位皆需包含標準表單標籤 (form-label fw-bold) 與表單控制項 (form-control)。',
      ],
      starterHtml: `<div class="container py-3" style="max-width: 480px;">
  <!-- 請完成成功與失敗兩組驗證反饋結構 -->
  <div>
    <label>學生帳號</label>
    <input type="text" value="daming_hero">
  </div>
  <div>
    <label>入學學號</label>
    <input type="text" value="123">
  </div>
</div>`,
      solutionHtml: `<div class="container py-3" style="max-width: 480px;">
  <div class="mb-3">
    <label class="form-label fw-bold">學生帳號</label>
    <input type="text" class="form-control is-valid" value="daming_hero">
    <div class="valid-feedback">恭喜！此學生帳號可以使用！</div>
  </div>
  <div class="mb-3">
    <label class="form-label fw-bold">入學學號</label>
    <input type="text" class="form-control is-invalid" value="123">
    <div class="invalid-feedback">學號格式不正確，應為 6 碼數字（如 113001）</div>
  </div>
</div>`,
      hints: [
        '成功欄位：<input class="form-control is-valid"> 搭配 <div class="valid-feedback">訊息</div>！',
        '失敗欄位：<input class="form-control is-invalid"> 搭配 <div class="invalid-feedback">訊息</div>！',
      ],
      rules: [
        {
          description: '必須包含 is-valid 與 valid-feedback 成功反饋',
          test: (html) => html.includes('is-valid') && html.includes('valid-feedback'),
        },
        {
          description: '必須包含 is-invalid 與 invalid-feedback 錯誤反饋',
          test: (html) => html.includes('is-invalid') && html.includes('invalid-feedback'),
        },
        {
          description: '輸入框必須包含 form-control 類別',
          test: (html) => html.includes('form-control'),
        },
        {
          description: '必須包含 form-label 類別',
          test: (html) => html.includes('form-label'),
        },
      ],
      xp: 90,
    },
  },
];
