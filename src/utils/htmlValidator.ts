/**
 * HTML Syntax & Bootstrap CSS Class Validator
 * 
 * Provides strict parsing, syntax error detection (e.g. missing <, unclosed tags),
 * and exact token-level class matching so typos like "focus-ringd" or missing "<"
 * will never falsely pass.
 */

export interface SyntaxCheckResult {
  isValid: boolean;
  errors: string[];
}

export interface RuleValidationResult {
  description: string;
  passed: boolean;
  failReason?: string;
}

export interface TaskValidationReport {
  syntaxValid: boolean;
  syntaxErrors: string[];
  ruleResults: RuleValidationResult[];
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
  isMasterBonusEligible: boolean;
}

/**
 * Validates HTML syntax rigorously.
 * Detects missing brackets (e.g., "div class=...>" or "/div>"), unclosed quotes,
 * unclosed tags, and DOM parser abnormalities.
 */
export function validateHtmlSyntax(html: string): SyntaxCheckResult {
  const errors: string[] = [];
  const clean = html.replace(/<!--[\s\S]*?-->/g, '').trim();

  if (!clean) {
    return { isValid: false, errors: ['程式碼為空，請輸入 HTML 程式碼！'] };
  }

  // 1. Detect tags starting without '<' (e.g., 'div class="..." >' or 'button class=...')
  const missingOpenBracketRegex = /(?:^|\n)\s*([a-zA-Z][a-zA-Z0-9-]*)\s+(?:class|id|style|type|name|href|src|role|data-[a-zA-Z0-9-]+)\s*=/i;
  const missingOpenMatch = clean.match(missingOpenBracketRegex);
  if (missingOpenMatch) {
    errors.push(
      `標籤語法錯誤：發現「${missingOpenMatch[1]}」開頭遺漏了「<」（例如應寫為「<${missingOpenMatch[1]} ...>」）`
    );
  }

  // 2. Detect closing tags without '<' (e.g., '/div>', '/button>', '/span>')
  const missingCloseBracketRegex = /(?:^|\n)\s*\/([a-zA-Z][a-zA-Z0-9-]*)>/i;
  const missingCloseMatch = clean.match(missingCloseBracketRegex);
  if (missingCloseMatch) {
    errors.push(
      `結束標籤語法錯誤：發現「/${missingCloseMatch[1]}>」開頭遺漏了「<」（正確寫法應為「</${missingCloseMatch[1]}>」）`
    );
  }

  // 3. Detect unclosed attribute quotes (e.g., class="container ...)
  let inDoubleQuote = false;
  let inSingleQuote = false;
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (char === '"' && !inSingleQuote) {
      inDoubleQuote = !inDoubleQuote;
    } else if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    }
  }
  if (inDoubleQuote || inSingleQuote) {
    errors.push('屬性引號未閉合：發現有未封閉的引號（" 或 \'），請檢查 class 或屬性值');
  }

  // 4. Tag balance check for common non-void HTML elements
  const nonVoidTags = [
    'div', 'button', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'form', 'label', 'a', 'ul', 'ol', 'li', 'table', 'thead', 'tbody',
    'tr', 'td', 'th', 'figure', 'figcaption', 'blockquote', 'nav',
    'textarea', 'select'
  ];

  for (const tag of nonVoidTags) {
    // Match opening tags like <tag> or <tag class="..."> but not <tagNameOther...>
    const openTagRegex = new RegExp(`<${tag}(?:\\s+[^>]*)?>`, 'gi');
    // Match closing tags </tag>
    const closeTagRegex = new RegExp(`</${tag}\\s*>`, 'gi');

    const openCount = (clean.match(openTagRegex) || []).length;
    const closeCount = (clean.match(closeTagRegex) || []).length;

    if (openCount !== closeCount) {
      errors.push(
        `標籤未配對閉合：<${tag}> 出現 ${openCount} 次，但 </${tag}> 出現 ${closeCount} 次，請確認標籤閉合完整！`
      );
    }
  }

  // 5. DOMParser sanity check
  if (typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(clean, 'text/html');
      
      // Look for text nodes directly in body that look like malformed tags
      const childNodes = Array.from(doc.body.childNodes);
      for (const node of childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = (node.textContent || '').trim();
          if (
            (text.startsWith('div ') || text.startsWith('button ') || text.startsWith('span ') || text.startsWith('/div')) &&
            text.includes('>')
          ) {
            errors.push(`HTML 解析器警示：檢測到散落的未完整標籤文字「${text.slice(0, 35)}...」`);
          }
        }
      }
    } catch {
      // Ignore parser instantiation issues in non-standard environments
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Extracts all exact CSS class tokens used anywhere in the HTML.
 * Splits class attributes by whitespace into exact tokens.
 */
export function extractClassesFromHtml(html: string): Set<string> {
  const classes = new Set<string>();
  const classAttrRegex = /class=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let match;

  while ((match = classAttrRegex.exec(html)) !== null) {
    const classStr = match[1] || match[2] || match[3] || '';
    const tokens = classStr.trim().split(/\s+/);
    for (const t of tokens) {
      if (t) classes.add(t);
    }
  }

  return classes;
}

/**
 * Checks if a specific exact class token exists in the HTML.
 * NEVER does substring matching!
 * "focus-ringd" will NEVER match "focus-ring"!
 */
export function hasExactClass(html: string, className: string, tagName?: string): boolean {
  if (!tagName) {
    const classes = extractClassesFromHtml(html);
    return classes.has(className);
  }

  // If tagName is provided, check if that specific element contains the class
  if (typeof DOMParser !== 'undefined') {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const elements = doc.querySelectorAll(tagName);
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains(className)) {
          return true;
        }
      }
      return false;
    } catch {
      // Fallback to regex
    }
  }

  // Regex fallback: check if <tagName ... class="... className ...">
  const tagRegex = new RegExp(`<${tagName}\\b[^>]*class=(?:"([^"]*)"|'([^']*)')`, 'gi');
  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    const classStr = match[1] || match[2] || '';
    const tokens = classStr.trim().split(/\s+/);
    if (tokens.includes(className)) return true;
  }
  return false;
}

/**
 * Checks if all of the specified exact classes exist.
 */
export function hasExactClasses(html: string, classNames: string[]): boolean {
  const classes = extractClassesFromHtml(html);
  return classNames.every((c) => classes.has(c));
}

/**
 * Detects common near-miss typos in class names.
 * For example, if user wrote "focus-ringd" instead of "focus-ring".
 */
export function findSimilarClassTypo(html: string, targetClass: string): string | null {
  const actualClasses = extractClassesFromHtml(html);
  if (actualClasses.has(targetClass)) return null;

  for (const c of actualClasses) {
    // If exact class was typed with trailing or leading character (like focus-ringd or myfocus-ring)
    if (c !== targetClass && (c.startsWith(targetClass) || c.endsWith(targetClass))) {
      return c;
    }
  }
  return null;
}

/**
 * Helper to check attributes exactly.
 */
export function hasExactAttribute(html: string, attrName: string, expectedVal?: string): boolean {
  if (expectedVal !== undefined) {
    const exactAttr = new RegExp(`${attrName}=(?:"${expectedVal}"|'${expectedVal}')`, 'i');
    return exactAttr.test(html);
  }
  const attrOnly = new RegExp(`\\b${attrName}(?:=|[\\s>])`, 'i');
  return attrOnly.test(html);
}
