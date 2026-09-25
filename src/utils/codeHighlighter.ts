import Prism from 'prismjs';
import 'prismjs/components/prism-markup.js';
import 'prismjs/components/prism-css.js';
import 'prismjs/components/prism-javascript.js';

/**
 * Highlights HTML / XML markup with Prism.js using VS Code-compatible token classes.
 */
export function highlightHtml(code: string): string {
  if (!code) return '';
  try {
    return Prism.highlight(code, Prism.languages.markup, 'markup');
  } catch (err) {
    console.error('Prism HTML highlight error:', err);
    return escapeHtml(code);
  }
}

/**
 * Highlights CSS with Prism.js.
 */
export function highlightCss(code: string): string {
  if (!code) return '';
  try {
    return Prism.highlight(code, Prism.languages.css, 'css');
  } catch (err) {
    console.error('Prism CSS highlight error:', err);
    return escapeHtml(code);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
