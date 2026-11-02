'use strict';
/* =========================================================
   Ledger — サブスク・買い物の記録 (PWA / データは端末内に保存)
   ========================================================= */

/* ---------- ピクトグラム（SVG） ---------- */
const ICONS = {
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  chevL: '<path d="m15 18-6-6 6-6"/>',
  chevR: '<path d="m9 18 6-6-6-6"/>',
  gauge: '<path d="M3 16a9 9 0 0 1 18 0"/><path d="M12 16l4.2-5"/><circle cx="12" cy="16" r="1.3"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M7.5 13.5h.01M12 13.5h.01M16.5 13.5h.01M7.5 17h.01M12 17h.01"/>',
  history: '<path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1L3.5 8.5"/><path d="M3.5 3.5v5h5"/><path d="M12 7.5V12l3 2"/>',
  sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  cart: '<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2.5 3.5h2.6l2.3 11.5h11.1l2-8H6.2"/>',
  repeat: '<path d="M17 2.5 20.5 6 17 9.5"/><path d="M3.5 11V9.5A3.5 3.5 0 0 1 7 6h13.5"/><path d="M7 21.5 3.5 18 7 14.5"/><path d="M20.5 13v1.5A3.5 3.5 0 0 1 17 18H3.5"/>',
  box: '<path d="M20.5 7.8 12 3.2 3.5 7.8v8.4l8.5 4.6 8.5-4.6z"/><path d="M3.5 7.8 12 12.4l8.5-4.6M12 12.4v8.4"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6.5 15h4"/>',
  cash: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 12h.01M18 12h.01"/>',
  bank: '<path d="M3 9.5 12 4l9 5.5"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
  trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  refresh: '<path d="M20 11a8 8 0 0 0-14.3-4.6L3.5 9"/><path d="M3.5 4v5h5"/><path d="M4 13a8 8 0 0 0 14.3 4.6l2.2-2.6"/><path d="M20.5 20v-5h-5"/>',
  download: '<path d="M12 3.5v12M7 11l5 5 5-5M4 20.5h16"/>',
  upload: '<path d="M12 16V4M7 8.5l5-5 5 5M4 20.5h16"/>',
  yen: '<path d="M6 3.5l6 8 6-8M12 11.5V21M7.5 13.5h9M7.5 17h9"/>',
  dollar: '<path d="M12 2.5v19"/><path d="M16.5 7c-.8-1.3-2.5-2-4.5-2-2.6 0-4.5 1.3-4.5 3.3 0 4.6 9.5 2.6 9.5 7.6 0 2-2 3.6-5 3.6-2.2 0-3.9-.8-4.8-2.2"/>',
  ban: '<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>',
  music: '<path d="M9 18V5.5l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/>',
  play: '<rect x="2.5" y="4.5" width="19" height="15" rx="3"/><path d="M10 9v6l5-3z"/>',
  cloud: '<path d="M7 18.5h10.5a4 4 0 0 0 .4-8A6 6 0 0 0 6.3 9.6 4.5 4.5 0 0 0 7 18.5z"/>',
  gamepad: '<rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><path d="M15.5 11.5h.01M18 13.5h.01"/>',
  book: '<path d="M4 19.5v-15A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5 1.5 1.5 0 0 0 5.5 21H20v-3"/>',
  phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  bolt: '<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
  home: '<path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v11.5h13V9"/><path d="M10 20.5v-6h4v6"/>',
  car: '<path d="M3.5 17.5v-4.5l2-5.5h13l2 5.5v4.5z"/><path d="M5.5 17.5v2M18.5 17.5v2M3.5 13h17"/><path d="M7.5 15.3h.01M16.5 15.3h.01"/>',
  cup: '<path d="M4 8.5h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5v3M12 2.5v3"/>',
  gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8.5h14V12M12 8v12.5"/><path d="M12 8C10.5 5 6.5 4 6.5 6.5S10 8 12 8zM12 8c1.5-3 5.5-4 5.5-1.5S14 8 12 8z"/>',
  heart: '<path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8 2.9C20 15.3 12 20 12 20z"/>',
  shirt: '<path d="M8.5 3.5 3 6.5l2 4 2-1v11h10v-11l2 1 2-4-5.5-3a3.5 3.5 0 0 1-7 0z"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v2M3 12.5h18"/>',
  dumbbell: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.7 5.4 3.7 8.5s-1.2 5.9-3.7 8.5c-2.5-2.6-3.7-5.4-3.7-8.5S9.5 6.1 12 3.5z"/>',
};
const icon = (name) => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.box}</svg>`;

/* ---------- 定数 ---------- */
const GENRES = {
  subscription: { label: 'サブスク', icon: 'repeat', hex: '#c8a96a' },
  shopping:     { label: '買い物',   icon: 'cart',   hex: '#7e98b8' },
  other:        { label: 'その他',   icon: 'box',    hex: '#8ba68f' },
};
const GENRE_ORDER = ['shopping', 'subscription', 'other'];
const METHODS = {
  cash:     { label: '現金', icon: 'cash', hex: '#8ba68f' },
  transfer: { label: '振込', icon: 'bank', hex: '#6fa3a6' },
  card:     { label: 'カード', icon: 'card', hex: '#a3a29d' },
};
const CYCLES = { once: '一回のみ', monthly: '毎月', yearly: '毎年' };
const PALETTE = ['#c8a96a', '#7e98b8', '#8ba68f', '#b88a92', '#9c8fc0', '#6fa3a6', '#c9b79c', '#a88a6a'];
const OTHER_GRAY = '#55565c';
const CARD_COLORS = ['#c8a96a', '#7e98b8', '#b88a92', '#8ba68f', '#9c8fc0', '#6fa3a6', '#cfcdc6', '#5d6372'];
const ITEM_ICONS = ['cart', 'repeat', 'box', 'music', 'play', 'cloud', 'gamepad', 'book', 'phone', 'globe',
  'bolt', 'home', 'car', 'cup', 'gift', 'heart', 'shirt', 'briefcase', 'dumbbell', 'spark'];
const WD = ['日', '月', '火', '水', '木', '金', '土'];
const FALLBACK_RATE = 150;

/* ---------- 日付ユーティリティ（'YYYY-MM-DD' 文字列で扱う） ---------- */
const pad = (n) => String(n).padStart(2, '0');
const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => toStr(new Date());
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return { y, m, d }; };
const dim = (y, m) => new Date(y, m, 0).getDate();
const monthIndex = (s) => { const { y, m } = parse(s); return y * 12 + m - 1; };
function addMonths(s, n) {
  const { y, m, d } = parse(s);
  const t = y * 12 + (m - 1) + n;
  const ny = Math.floor(t / 12), nm = (t % 12) + 1;
  return `${ny}-${pad(nm)}-${pad(Math.min(d, dim(ny, nm)))}`;
}
function addDays(s, n) { const { y, m, d } = parse(s); return toStr(new Date(y, m - 1, d + n)); }
const weekday = (s) => { const { y, m, d } = parse(s); return new Date(y, m - 1, d).getDay(); };
const monthRange = (ym) => { const [y, m] = ym.split('-').map(Number); return [`${ym}-01`, `${ym}-${pad(dim(y, m))}`]; };
const shiftYm = (ym, n) => addMonths(`${ym}-01`, n).slice(0, 7);
const fmtDate = (s) => s.replaceAll('-', '.');
const fmtMD = (s) => { const { m, d } = parse(s); return `${m}/${d}(${WD[weekday(s)]})`; };

/* ---------- 保存（localStorage：この端末の中だけ） ---------- */
const KEY = 'ledger:v1';
const defaultState = () => ({ items: [], cards: [], rate: { value: null, updatedAt: null, source: null }, manualRate: null });
function load() {
  try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(defaultState(), JSON.parse(raw)); } catch (e) { /* noop */ }
  return defaultState();
}
let S = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('保存に失敗しました'); }
}
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- 為替 ---------- */
const rate = () => S.manualRate || S.rate.value || FALLBACK_RATE;
const toJPY = (amount, cur) => (cur === 'USD' ? amount * rate() : amount);
async function fetchRate(force = false) {
  const fresh = S.rate.updatedAt && Date.now() - S.rate.updatedAt < 6 * 3600e3;
  if (!force && fresh) return;
  const sources = [
    ['https://api.frankfurter.dev/v1/latest?base=USD&symbols=JPY', 'Frankfurter (ECB)'],
    ['https://api.frankfurter.app/latest?from=USD&to=JPY', 'Frankfurter (ECB)'],
    ['https://open.er-api.com/v6/latest/USD', 'ExchangeRate-API'],
  ];
  for (const [url, name] of sources) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) continue;
      const json = await res.json();
      const v = json && json.rates && Number(json.rates.JPY);
      if (v > 0) {
        S.rate = { value: v, updatedAt: Date.now(), source: name };
        save(); renderAll();
        if (force) toast(`$1 = ¥${v.toFixed(2)} に更新しました`);
        return;
      }
    } catch (e) { /* 次のソースへ */ }
  }
  if (force) toast('レートを取得できませんでした');
}

/* ---------- 金額表示 ---------- */
const fmtJPY = (n) => '¥' + Math.round(n).toLocaleString('ja-JP');
const fmtUSD = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtAmt = (n, cur) => (cur === 'USD' ? fmtUSD(n) : fmtJPY(n));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- 発生（支払い）計算 ---------- */
function splitAmount(total, n, cur) {
  if (n <= 1) return [total];
  const unit = cur === 'USD' ? 100 : 1;
  const t = Math.round(total * unit);
  const base = Math.floor(t / n);
  const parts = Array(n).fill(base / unit);
  parts[0] = (t - base * (n - 1)) / unit; // 端数は初回に含める
  return parts;
}
function occurrences(item, from, to) {
  const out = [];
  const mk = (date, amount, idx, total) => ({ item, date, amount, cur: item.currency, idx, total, jpy: toJPY(amount, item.currency) });
  if (item.cycle === 'once') {
    const n = Math.max(1, item.installments || 1);
    const parts = splitAmount(item.amount, n, item.currency);
    for (let i = 0; i < n; i++) {
      const date = addMonths(item.date, i);
      if (date >= from && date <= to) out.push(mk(date, parts[i], i + 1, n));
    }
    return out;
  }
  const step = item.cycle === 'yearly' ? 12 : 1;
  const limit = item.count > 0 ? item.count : Infinity;
  let i = 0;
  const gap = monthIndex(from) - monthIndex(item.date);
  if (gap > step) i = Math.floor(gap / step) - 1;
  for (; i < limit; i++) {
    const date = addMonths(item.date, i * step);
    if (date > to) break;
    if (item.endDate && date > item.endDate) break;
    if (date >= from) out.push(mk(date, item.amount, i + 1, Number.isFinite(limit) ? limit : 0));
  }
  return out;
}
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : (b.item.createdAt || 0) - (a.item.createdAt || 0));
const allOcc = (from, to) => S.items.flatMap((it) => occurrences(it, from, to)).sort(byDateDesc);
const sumJPY = (list) => list.reduce((s, o) => s + o.jpy, 0);

/* ---------- 項目の見た目 ---------- */
const cardOf = (item) => S.cards.find((c) => c.id === item.cardId);
const payColor = (item) => (item.method === 'card' ? (cardOf(item)?.color || METHODS.card.hex) : METHODS[item.method].hex);
const payLabel = (item) => (item.method === 'card' ? (cardOf(item)?.name || 'カード') : METHODS[item.method].label);
const itemIcon = (item) => item.icon || GENRES[item.genre].icon;
const tintOf = (item) => GENRES[item.genre].hex;

/* ---------- UI 状態 ---------- */
const UI = { view: 'summary', month: today().slice(0, 7), page: 0, calSel: today(), histFilter: 'all', histQ: '' };
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- 半円ゲージ ---------- */
function gauge(segments, total, label, sub) {
  const cx = 110, cy = 108, r = 92, sw = 14;
  const pt = (deg) => { const a = (deg * Math.PI) / 180; return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; };
  const arc = (a1, a2) => { const [x1, y1] = pt(a1), [x2, y2] = pt(a2); return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`; };
  const sum = segments.reduce((s, x) => s + x.value, 0);
  let paths = '';
  if (sum > 0) {
    const gap = segments.length > 1 ? 1.4 : 0;
    let a = 180;
    segments.forEach((sg, i) => {
      const deg = (sg.value / sum) * 180;
      const s1 = a - (i === 0 ? 0 : gap / 2), s2 = a - deg + (i === segments.length - 1 ? 0 : gap / 2);
      a -= deg;
      if (s1 - s2 <= 0.2) return;
      const len = (r * (s1 - s2) * Math.PI) / 180;
      paths += `<path class="gauge-seg" d="${arc(s1, s2)}" stroke="${sg.color}" style="--len:${len.toFixed(1)};stroke-dasharray:${len.toFixed(1)} ${len.toFixed(1)};animation-delay:${i * 70}ms"/>`;
    });
  }
  return `
  <div class="gauge-wrap">
    <svg viewBox="0 0 220 ${cy + sw / 2 + 1}">
      <path class="gauge-track" d="${arc(180, 0)}"/>${paths}
    </svg>
    <div class="gauge-center">
      <div class="label">${esc(label)}</div>
      <div class="total num"><span class="yen">¥</span>${Math.round(total).toLocaleString('ja-JP')}</div>
      ${sub ? `<div class="sub">${sub}</div>` : ''}
    </div>
  </div>`;
}
function legend(segments) {
  const sum = segments.reduce((s, x) => s + x.value, 0);
  if (!sum) return '';
  return `<div class="legend">${segments.map((s) => `<span><i style="background:${s.color}"></i>${esc(s.label)}<b>${Math.round((s.value / sum) * 100)}%</b></span>`).join('')}</div>`;
}
function topN(map, n = 6) {
  const arr = [...map.values()].sort((a, b) => b.value - a.value);
  if (arr.length <= n) return arr;
  const head = arr.slice(0, n - 1);
  const rest = arr.slice(n - 1).reduce((s, x) => s + x.value, 0);
  return [...head, { label: 'その他', value: rest, color: OTHER_GRAY }];
}

/* ---------- 行・タイル ---------- */
function occMeta(o) {
  if (o.total > 1 && o.item.cycle === 'once') return `<span class="badge">分割 ${o.idx}/${o.total}</span>`;
  if (o.total > 1) return `<span class="badge">${o.idx}/${o.total}回</span>`;
  return '';
}
function row(o, opt = {}) {
  const it = o.item;
  return `
  <button class="row" data-detail="${it.id}">
    <span class="tile" style="--tint:${tintOf(it)}">${icon(itemIcon(it))}</span>
    <span class="row-main">
      <span class="row-title">${esc(it.name)}</span>
      <span class="row-sub">${opt.noDate ? '' : `<span class="num">${fmtMD(o.date)}</span>`}
        <i class="dot" style="background:${payColor(it)}"></i>${esc(payLabel(it))}${occMeta(o)}</span>
    </span>
    <span class="row-amt">
      <div class="main num">${fmtAmt(o.amount, o.cur)}</div>
      ${o.cur === 'USD' ? `<div class="conv num">≈ ${fmtJPY(o.jpy)}</div>` : ''}
    </span>
  </button>`;
}
function emptyBox(text, ic = 'box') { return `<div class="empty">${icon(ic)}${text}</div>`; }
function listOf(occ, opt) { return occ.length ? `<div class="list">${occ.map((o) => row(o, opt)).join('')}</div>` : emptyBox('この月の記録はありません'); }

/* ---------- 出費（合計／サブスク／買い物） ---------- */
function renderSummary() {
  const [from, to] = monthRange(UI.month);
  const occ = allOcc(from, to);
  const hasUSD = occ.some((o) => o.cur === 'USD');
  const rateNote = hasUSD ? `$1 = ¥${rate().toFixed(2)}` : '';

  // 合計
  const gSeg = GENRE_ORDER.map((g) => ({ label: GENRES[g].label, value: sumJPY(occ.filter((o) => o.item.genre === g)), color: GENRES[g].hex })).filter((s) => s.value > 0);
  $('#page-all').innerHTML = `
    ${gauge(gSeg, sumJPY(occ), '今月の合計', rateNote || `${occ.length}件`)}
    ${legend(gSeg)}
    <div class="section-title"><span>明細</span><span class="num">${occ.length}件</span></div>
    ${listOf(occ)}`;

  // サブスク
  const subs = occ.filter((o) => o.item.genre === 'subscription');
  const sm = new Map();
  subs.forEach((o, i) => {
    const k = o.item.id;
    if (!sm.has(k)) sm.set(k, { label: o.item.name, value: 0, color: '' });
    sm.get(k).value += o.jpy;
  });
  const sSeg = topN(sm).map((s, i) => ({ ...s, color: s.color || PALETTE[i % PALETTE.length] }));
  const t = today();
  const active = S.items.filter((it) => it.genre === 'subscription' && it.cycle !== 'once' && occurrences(it, t, addMonths(t, 13)).length);
  const monthly = active.reduce((s, it) => s + toJPY(it.amount, it.currency) / (it.cycle === 'yearly' ? 12 : 1), 0);
  $('#page-sub').innerHTML = `
    ${gauge(sSeg, sumJPY(subs), 'サブスク', rateNote || `${subs.length}件`)}
    ${legend(sSeg)}
    <div class="stats">
      <div class="stat"><small>月額換算（契約中 ${active.length}件）</small><div class="num">${fmtJPY(monthly)}</div></div>
      <div class="stat"><small>年額換算</small><div class="num">${fmtJPY(monthly * 12)}</div></div>
    </div>
    <div class="section-title"><span>今月の支払い</span><span class="num">${subs.length}件</span></div>
    ${subs.length ? `<div class="grid">${subs.map(subTile).join('')}</div>` : emptyBox('この月のサブスクはありません', 'repeat')}`;

  // 買い物
  const shop = occ.filter((o) => o.item.genre === 'shopping');
  const mm = new Map();
  shop.forEach((o) => {
    const k = o.item.method === 'card' ? 'card:' + (o.item.cardId || '') : o.item.method;
    if (!mm.has(k)) mm.set(k, { label: payLabel(o.item), value: 0, color: payColor(o.item) });
    mm.get(k).value += o.jpy;
  });
  const pSeg = topN(mm);
  $('#page-shop').innerHTML = `
    ${gauge(pSeg, sumJPY(shop), '買い物', rateNote || `${shop.length}件`)}
    ${legend(pSeg)}
    <div class="section-title"><span>明細（グラフは支払い方法別）</span><span class="num">${shop.length}件</span></div>
    ${shop.length ? listOf(shop) : emptyBox('この月の買い物はありません', 'cart')}`;
}
function subTile(o) {
  const it = o.item;
  return `
  <button class="card-tile" data-detail="${it.id}" style="--tint:${tintOf(it)}">
    <div class="top">
      <span class="tile" style="--tint:${tintOf(it)}">${icon(itemIcon(it))}</span>
      <span class="badge">${CYCLES[it.cycle]}</span>
    </div>
    <div>
      <div class="name">${esc(it.name)}</div>
      <div class="amt num">${fmtAmt(o.amount, o.cur)}</div>
      <div class="meta"><span class="num">${fmtMD(o.date)}</span><i class="dot" style="background:${payColor(it)}"></i>${esc(payLabel(it))}</div>
    </div>
  </button>`;
}

/* ---------- カレンダー ---------- */
function renderCalendar() {
  const [first, last] = monthRange(UI.month);
  const offset = weekday(first);
  const days = Number(last.slice(8));
  const weeks = Math.ceil((offset + days) / 7);
  const start = addDays(first, -offset);
  const end = addDays(start, weeks * 7 - 1);
  const occ = allOcc(start, end);
  const byDay = new Map();
  [...occ].reverse().forEach((o) => { if (!byDay.has(o.date)) byDay.set(o.date, []); byDay.get(o.date).push(o); });

  if (UI.calSel.slice(0, 7) !== UI.month) UI.calSel = today().slice(0, 7) === UI.month ? today() : first;
  const monthOcc = occ.filter((o) => o.date >= first && o.date <= last);
  $('#cal-total').innerHTML = `<span>${Number(UI.month.slice(5))}月の引き落とし予定</span><b class="num">${fmtJPY(sumJPY(monthOcc))}</b>`;
  $('#cal-week').innerHTML = WD.map((w) => `<span>${w}</span>`).join('');

  const maxEv = weeks >= 6 ? 2 : 3;
  const t = today();
  let html = '';
  for (let i = 0; i < weeks * 7; i++) {
    const d = addDays(start, i);
    const evs = byDay.get(d) || [];
    const cls = ['cal-cell', d.slice(0, 7) !== UI.month && 'out', i % 7 === 0 && 'sun', i % 7 === 6 && 'sat', d === t && 'today', d === UI.calSel && 'sel'].filter(Boolean).join(' ');
    const shown = evs.length > maxEv ? evs.slice(0, maxEv - 1) : evs;
    html += `<button class="${cls}" data-day="${d}"><span class="d">${Number(d.slice(8))}</span>
      ${shown.map((o) => `<span class="ev" style="--tint:${payColor(o.item)}">${esc(o.item.name)}</span>`).join('')}
      ${evs.length > shown.length ? `<span class="ev-more">+${evs.length - shown.length}</span>` : ''}</button>`;
  }
  $('#cal-grid').innerHTML = html;

  const dayOcc = byDay.get(UI.calSel) || [];
  $('#cal-day').innerHTML = `
    <h3><span>${fmtDate(UI.calSel)}（${WD[weekday(UI.calSel)]}）</span><span>${fmtJPY(sumJPY(dayOcc))}</span></h3>
    ${dayOcc.length ? `<div class="list">${dayOcc.map((o) => row(o, { noDate: true })).join('')}</div>` : emptyBox('引き落とし予定はありません', 'calendar')}`;
}

/* ---------- 履歴 ---------- */
function renderHistory() {
  $('#history-filter').innerHTML = [['all', 'すべて', 'history'], ...GENRE_ORDER.map((g) => [g, GENRES[g].label, GENRES[g].icon])]
    .map(([k, l, ic]) => `<button class="chip ${UI.histFilter === k ? 'on' : ''}" data-hf="${k}">${icon(ic)}${l}</button>`).join('');
  const t = today();
  const min = S.items.reduce((m, it) => (it.date < m ? it.date : m), t);
  const q = UI.histQ.trim().toLowerCase();
  const occ = allOcc(min, t).filter((o) =>
    (UI.histFilter === 'all' || o.item.genre === UI.histFilter) &&
    (!q || `${o.item.name} ${o.item.memo || ''} ${payLabel(o.item)}`.toLowerCase().includes(q)));
  if (!occ.length) { $('#history-list').innerHTML = emptyBox(q ? '該当する記録はありません' : 'まだ記録がありません', 'history'); return; }
  const groups = new Map();
  occ.forEach((o) => { const k = o.date.slice(0, 7); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(o); });
  $('#history-list').innerHTML = `
    <div class="stats" style="margin-top:0">
      <div class="stat"><small>累計</small><div class="num">${fmtJPY(sumJPY(occ))}</div></div>
      <div class="stat"><small>件数</small><div class="num">${occ.length}件</div></div>
    </div>
    ${[...groups].map(([ym, list]) => `
      <div class="month-head"><h4 class="num">${ym.replace('-', '.')}</h4><span class="num">${fmtJPY(sumJPY(list))}</span></div>
      <div class="list">${list.map((o) => row(o)).join('')}</div>`).join('')}`;
}

/* ---------- 設定 ---------- */
function renderSettings() {
  const r = S.rate;
  const updated = r.updatedAt ? new Date(r.updatedAt).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '未取得';
  $('#settings-body').innerHTML = `
    <div class="group">
      <h5>カード</h5>
      <div class="list">
        ${S.cards.map((c) => `
          <button class="set-row" data-card="${c.id}">
            <span class="cardchip" style="--tint:${c.color}"></span>
            <span class="grow">${esc(c.name)}</span>
            <span class="val num">${c.last4 ? '•••• ' + esc(c.last4) : ''}</span>${icon('chevR')}
          </button>`).join('')}
        <button class="set-row" data-card="new"><span class="tile" style="--tint:var(--accent);width:34px;height:26px;border-radius:7px">${icon('plus')}</span><span class="grow">カードを追加</span></button>
      </div>
    </div>
    <div class="group">
      <h5>為替レート（USD → JPY）</h5>
      <div class="list">
        <div class="set-row"><span class="tile" style="--tint:var(--accent)">${icon('dollar')}</span>
          <span class="grow">$1 = <b class="num">¥${rate().toFixed(2)}</b><br><small style="color:var(--text-3)">${S.manualRate ? '手動で固定中' : `${esc(r.source || '')} ・ ${updated}`}</small></span></div>
        <button class="set-row" data-act="rate-refresh">${icon('refresh')}<span class="grow">今すぐ更新</span></button>
        <button class="set-row" data-act="rate-manual">${icon('edit')}<span class="grow">${S.manualRate ? '手動レートを解除' : 'レートを手動で固定'}</span></button>
      </div>
      <p class="note">起動時に自動で取得します（6時間ごと）。オフラインのときは最後に取得したレートで計算します。${r.value ? '' : '未取得の間は仮に ¥150 で計算します。'}</p>
    </div>
    <div class="group">
      <h5>データ</h5>
      <div class="list">
        <button class="set-row" data-act="export">${icon('download')}<span class="grow">バックアップを書き出す</span></button>
        <button class="set-row" data-act="import">${icon('upload')}<span class="grow">バックアップから復元</span></button>
        <button class="set-row danger" data-act="wipe">${icon('trash')}<span class="grow">すべてのデータを削除</span></button>
      </div>
      <p class="note">データはこのiPhoneの中だけに保存されます。ホーム画面のアイコンを削除するとデータも消えるため、機種変更の前などにバックアップを書き出して「ファイル」アプリに保存してください。</p>
    </div>
    <p class="note" style="text-align:center;color:var(--text-3);font-size:11px">Ledger v1.0 ・ 項目 ${S.items.length}件</p>
    <input type="file" id="import-file" accept="application/json,.json" hidden>`;
}

/* ---------- まとめて再描画 ---------- */
function renderMonthLabels() {
  const [y, m] = UI.month.split('-');
  $$('[data-month-today]').forEach((b) => (b.innerHTML = `<small class="num">${y}</small>${Number(m)}月`));
}
function renderAll() { renderMonthLabels(); renderSummary(); renderCalendar(); renderHistory(); renderSettings(); }

/* ---------- シート（下から出るパネル） ---------- */
const layer = $('#sheet-layer');
const sheetBody = $('#sheet-body');
const stack = [];
function pushSheet(render) { stack.push(render); render(); layer.classList.add('open'); sheetBody.scrollTop = 0; }
function popSheet() {
  stack.pop();
  if (stack.length) { stack[stack.length - 1](); return; }
  layer.classList.remove('open');
  setTimeout(() => { if (!stack.length) sheetBody.innerHTML = ''; }, 320);
}
function closeAll() { stack.length = 0; popSheet(); }
$('.sheet-backdrop').addEventListener('click', closeAll);
(function sheetDrag() {
  const sheet = $('.sheet'); let y0 = null, dy = 0;
  sheet.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.sheet-handle, .sheet-head') || e.target.closest('button')) return;
    y0 = e.touches[0].clientY; dy = 0; sheet.style.transition = 'none';
  }, { passive: true });
  sheet.addEventListener('touchmove', (e) => {
    if (y0 === null) return;
    dy = Math.max(0, e.touches[0].clientY - y0);
    sheet.style.transform = `translateY(${dy}px)`;
  }, { passive: true });
  sheet.addEventListener('touchend', () => {
    if (y0 === null) return;
    sheet.style.transition = ''; sheet.style.transform = '';
    if (dy > 90) closeAll();
    y0 = null;
  });
})();
const sheetHead = (title) => `<div class="sheet-head"><h2>${title}</h2><button class="icon-btn" data-close aria-label="閉じる">${icon('x')}</button></div>`;

/* ---------- 項目追加・編集フォーム ---------- */
let F = null;
function newForm(date) {
  return { id: null, genre: 'shopping', name: '', amount: '', currency: 'JPY', method: 'card', cardId: S.cards[0]?.id || null,
    date: date || today(), cycle: 'once', installments: 1, countMode: 'inf', count: 12, icon: null, memo: '', cycleTouched: false };
}
function openForm(item) {
  F = item
    ? { ...item, amount: String(item.amount), countMode: item.count > 0 ? 'n' : 'inf', count: item.count || 12, installments: item.installments || 1, cycleTouched: true }
    : newForm(UI.view === 'calendar' ? UI.calSel : today());
  pushSheet(renderForm);
}
function renderForm() {
  const f = F;
  const opt = (key, val, label, ic) => `<button class="opt ${f[key] === val ? 'on' : ''}" data-set="${key}" data-val="${val}">${ic ? icon(ic) : ''}<span>${label}</span></button>`;
  const amountNum = parseFloat(f.amount) || 0;
  let cycleExtra = '';
  if (f.cycle === 'once') {
    const per = splitAmount(amountNum, f.installments, f.currency);
    cycleExtra = `
      <div class="stepper">
        <button data-step="installments" data-d="-1">−</button>
        <span class="v">${f.installments <= 1 ? '一括払い' : `<span class="num">${f.installments}</span>回払い`}<small>${f.installments > 1 && amountNum ? `月々 ${fmtAmt(per[per.length - 1], f.currency)}` : ''}</small></span>
        <button data-step="installments" data-d="1">＋</button>
      </div>
      ${f.installments > 1 ? `<p class="hint">支払日から毎月 ${f.installments} 回に分けて自動で追加されます（端数は初回に含めます）。</p>` : ''}`;
  } else {
    cycleExtra = `
      <div class="opts compact" style="margin-top:10px">
        ${opt('countMode', 'inf', '無期限')}${opt('countMode', 'n', '回数を指定')}
      </div>
      ${f.countMode === 'n' ? `<div class="stepper"><button data-step="count" data-d="-1">−</button><span class="v"><span class="num">${f.count}</span>回</span><button data-step="count" data-d="1">＋</button></div>` : ''}
      <p class="hint">${f.cycle === 'monthly' ? `毎月 ${Number(f.date.slice(8))} 日` : `毎年 ${Number(f.date.slice(5, 7))}月${Number(f.date.slice(8))}日`}の支払いが自動で翌月以降に追加されます。${Number(f.date.slice(8)) > 28 ? '月末がない月はその月の最終日になります。' : ''}</p>`;
  }
  sheetBody.innerHTML = `
    ${sheetHead(f.id ? '項目を編集' : '項目を追加')}
    <div class="field"><span class="lbl">ジャンル</span>
      <div class="opts">${GENRE_ORDER.map((g) => opt('genre', g, GENRES[g].label, GENRES[g].icon)).join('')}</div></div>
    <div class="field"><label for="f-name">名前</label>
      <input class="input" id="f-name" value="${esc(f.name)}" placeholder="${f.genre === 'subscription' ? '例：Netflix' : f.genre === 'shopping' ? '例：イヤホン' : '例：家賃'}" autocomplete="off" enterkeyhint="next"></div>
    <div class="field"><label for="f-amount">金額</label>
      <div class="amount">
        <div class="cur"><button class="${f.currency === 'JPY' ? 'on' : ''}" data-set="currency" data-val="JPY">${icon('yen')}</button><button class="${f.currency === 'USD' ? 'on' : ''}" data-set="currency" data-val="USD">${icon('dollar')}</button></div>
        <input class="input" id="f-amount" value="${esc(f.amount)}" inputmode="decimal" placeholder="0" autocomplete="off">
      </div>
      <p class="hint" id="f-conv">${f.currency === 'USD' && amountNum ? `≈ ${fmtJPY(amountNum * rate())}（$1 = ¥${rate().toFixed(2)}）` : ''}</p></div>
    <div class="field"><span class="lbl">支払い方法</span>
      <div class="opts">${Object.entries(METHODS).map(([k, m]) => opt('method', k, m.label, m.icon)).join('')}</div>
      ${f.method === 'card' ? `<div class="cards-pick">
        ${S.cards.map((c) => `<button class="chip ${f.cardId === c.id ? 'on' : ''}" data-set="cardId" data-val="${c.id}"><span class="cardchip" style="--tint:${c.color}"></span>${esc(c.name)}</button>`).join('')}
        <button class="chip" data-act="add-card">${icon('plus')}カードを追加</button></div>` : ''}</div>
    <div class="field"><label for="f-date">支払日</label>
      <input class="input num" type="date" id="f-date" value="${f.date}"></div>
    <div class="field"><span class="lbl">支払いサイクル</span>
      <div class="opts compact">${Object.entries(CYCLES).map(([k, l]) => opt('cycle', k, l)).join('')}</div>
      ${cycleExtra}</div>
    <div class="field"><span class="lbl">アイコン</span>
      <div class="icon-pick">${ITEM_ICONS.map((n) => `<button class="${(f.icon || GENRES[f.genre].icon) === n ? 'on' : ''}" data-set="icon" data-val="${n}">${icon(n)}</button>`).join('')}</div></div>
    <div class="field"><label for="f-memo">メモ</label>
      <textarea class="input" id="f-memo" placeholder="任意">${esc(f.memo)}</textarea></div>
    <button class="btn primary" data-act="save">${icon('check')}${f.id ? '変更を保存' : '追加する'}</button>`;

  $('#f-name').oninput = (e) => (f.name = e.target.value);
  $('#f-memo').oninput = (e) => (f.memo = e.target.value);
  $('#f-date').onchange = (e) => { if (e.target.value) { f.date = e.target.value; renderForm(); } };
  $('#f-amount').oninput = (e) => {
    f.amount = e.target.value.replace(/[^\d.]/g, '');
    const n = parseFloat(f.amount) || 0;
    $('#f-conv').textContent = f.currency === 'USD' && n ? `≈ ${fmtJPY(n * rate())}（$1 = ¥${rate().toFixed(2)}）` : '';
  };
  sheetBody.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-close')) return closeAll();
    if (b.dataset.set) {
      const k = b.dataset.set, v = b.dataset.val;
      f[k] = v;
      if (k === 'genre' && !f.cycleTouched) f.cycle = v === 'subscription' ? 'monthly' : 'once';
      if (k === 'cycle') f.cycleTouched = true;
      if (k === 'method' && v === 'card' && !f.cardId) f.cardId = S.cards[0]?.id || null;
      return renderForm();
    }
    if (b.dataset.step) {
      const k = b.dataset.step, d = Number(b.dataset.d);
      const presets = k === 'installments' ? [1, 2, 3, 5, 6, 10, 12, 15, 18, 20, 24, 36, 48, 60] : null;
      if (presets) {
        const i = Math.max(0, presets.findLastIndex((x) => x <= f[k]));
        f[k] = presets[Math.min(presets.length - 1, Math.max(0, i + d))];
      } else f[k] = Math.min(120, Math.max(1, f[k] + d));
      return renderForm();
    }
    if (b.dataset.act === 'add-card') return openCardEditor(null, (card) => { f.cardId = card.id; });
    if (b.dataset.act === 'save') return saveForm();
  };
}
function saveForm() {
  const f = F;
  const amount = parseFloat(f.amount);
  if (!(amount > 0)) { toast('金額を入力してください'); $('#f-amount')?.focus(); return; }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date)) { toast('支払日を入力してください'); return; }
  const item = {
    id: f.id || uid(),
    name: f.name.trim() || GENRES[f.genre].label,
    genre: f.genre, amount: f.currency === 'USD' ? Math.round(amount * 100) / 100 : Math.round(amount),
    currency: f.currency, method: f.method, cardId: f.method === 'card' ? f.cardId : null,
    date: f.date, cycle: f.cycle,
    installments: f.cycle === 'once' ? f.installments : 1,
    count: f.cycle !== 'once' && f.countMode === 'n' ? f.count : 0,
    icon: f.icon && f.icon !== GENRES[f.genre].icon ? f.icon : null,
    memo: f.memo.trim(),
    endDate: f.endDate || null,
    createdAt: f.createdAt || Date.now(),
  };
  const i = S.items.findIndex((x) => x.id === item.id);
  if (i >= 0) S.items[i] = item; else S.items.push(item);
  save();
  UI.month = item.date.slice(0, 7);
  renderAll();
  closeAll();
  toast(i >= 0 ? '変更を保存しました' : `${item.name} を追加しました`);
}

/* ---------- 詳細 ---------- */
function openDetail(id) { pushSheet(() => renderDetail(id)); }
function renderDetail(id) {
  const it = S.items.find((x) => x.id === id);
  if (!it) return closeAll();
  const t = today();
  const recurring = it.cycle !== 'once';
  const n = it.installments || 1;
  const parts = splitAmount(it.amount, n, it.currency);
  let countText = '一括';
  if (!recurring && n > 1) countText = `${n}回払い（月々 ${fmtAmt(parts[n - 1], it.currency)}）`;
  if (recurring) countText = it.count > 0 ? `${it.count}回` : '無期限';
  const horizon = addMonths(t, recurring ? (it.cycle === 'yearly' ? 60 : 12) : 120);
  const all = occurrences(it, it.date, horizon);
  const past = all.filter((o) => o.date < t);
  const next = all.filter((o) => o.date >= t).slice(0, 6);
  const chips = [...past.slice(-2), ...next].map((o) => `<span class="num ${o.date < t ? 'past' : ''}">${fmtDate(o.date)}</span>`).join('');
  const card = cardOf(it);
  sheetBody.innerHTML = `
    ${sheetHead('')}
    <div class="detail-hero">
      <span class="tile" style="--tint:${tintOf(it)}">${icon(itemIcon(it))}</span>
      <h2>${esc(it.name)}</h2>
      <div class="amt num">${fmtAmt(it.amount, it.currency)}</div>
      ${it.currency === 'USD' ? `<div class="conv num">≈ ${fmtJPY(toJPY(it.amount, 'USD'))}</div>` : ''}
    </div>
    <dl class="kv">
      <div><dt>ジャンル</dt><dd>${GENRES[it.genre].label}</dd></div>
      <div><dt>支払い方法</dt><dd><i class="dot" style="background:${payColor(it)}"></i>${esc(payLabel(it))}${card?.last4 ? ` <span class="num" style="color:var(--text-3)">•••• ${esc(card.last4)}</span>` : ''}</dd></div>
      <div><dt>${recurring || n > 1 ? '初回支払日' : '支払日'}</dt><dd class="num">${fmtDate(it.date)}</dd></div>
      <div><dt>サイクル</dt><dd>${CYCLES[it.cycle]}</dd></div>
      <div><dt>回数</dt><dd>${countText}</dd></div>
      ${it.endDate ? `<div><dt>解約日</dt><dd class="num">${fmtDate(it.endDate)}</dd></div>` : ''}
      ${it.memo ? `<div><dt>メモ</dt><dd style="white-space:pre-wrap;text-align:right">${esc(it.memo)}</dd></div>` : ''}
    </dl>
    ${all.length > 1 ? `<div class="field"><span class="lbl">${next.length ? '支払いスケジュール' : '支払い履歴'}</span><div class="upcoming">${chips}</div></div>` : ''}
    <button class="btn ghost" data-act="edit">${icon('edit')}編集</button>
    <div class="btn-row">
      ${recurring ? (it.endDate
        ? `<button class="btn ghost" data-act="resume">${icon('refresh')}解約を取り消す</button>`
        : `<button class="btn ghost" data-act="cancel">${icon('ban')}今日で解約</button>`) : ''}
      <button class="btn danger" data-act="delete" style="${recurring ? '' : 'grid-column:1/-1'}">${icon('trash')}削除</button>
    </div>`;
  sheetBody.onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-close')) return closeAll();
    const act = b.dataset.act;
    if (act === 'edit') { stack.pop(); return openForm(it); }
    if (act === 'cancel') { it.endDate = t; save(); renderAll(); renderDetail(id); return toast('解約しました（今後の支払いは表示されません）'); }
    if (act === 'resume') { it.endDate = null; save(); renderAll(); renderDetail(id); return toast('解約を取り消しました'); }
    if (act === 'delete') {
      const msg = recurring || n > 1 ? `「${it.name}」を削除しますか？\n過去を含むすべての支払い記録が消えます。` : `「${it.name}」を削除しますか？`;
      if (!confirm(msg)) return;
      S.items = S.items.filter((x) => x.id !== id); save(); renderAll(); closeAll(); toast('削除しました');
    }
  };
}

/* ---------- カード編集 ---------- */
function openCardEditor(id, onSaved) {
  const src = id ? S.cards.find((c) => c.id === id) : null;
  const C = src ? { ...src } : { id: null, name: '', last4: '', color: CARD_COLORS[S.cards.length % CARD_COLORS.length] };
  const render = () => {
    sheetBody.innerHTML = `
      ${sheetHead(C.id ? 'カードを編集' : 'カードを追加')}
      <div class="field"><label for="c-name">カード名</label><input class="input" id="c-name" value="${esc(C.name)}" placeholder="例：楽天カード" autocomplete="off"></div>
      <div class="field"><label for="c-last4">下4桁（任意・見分ける用）</label><input class="input num" id="c-last4" value="${esc(C.last4)}" inputmode="numeric" maxlength="4" placeholder="1234" autocomplete="off"></div>
      <div class="field"><span class="lbl">カラー</span>
        <div class="swatches">${CARD_COLORS.map((c) => `<button class="${C.color === c ? 'on' : ''}" style="--tint:${c}" data-color="${c}" aria-label="${c}"></button>`).join('')}</div>
        <p class="hint">カレンダーの帯やグラフの色に使われます。</p></div>
      <button class="btn primary" data-act="save">${icon('check')}保存</button>
      ${C.id ? `<div style="height:10px"></div><button class="btn danger" data-act="delete">${icon('trash')}このカードを削除</button>` : ''}`;
    $('#c-name').oninput = (e) => (C.name = e.target.value);
    $('#c-last4').oninput = (e) => (C.last4 = e.target.value.replace(/\D/g, '').slice(0, 4));
    sheetBody.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-close')) return popSheet();
      if (b.dataset.color) { C.color = b.dataset.color; return render(); }
      if (b.dataset.act === 'save') {
        if (!C.name.trim()) { toast('カード名を入力してください'); return; }
        const card = { id: C.id || uid(), name: C.name.trim(), last4: C.last4, color: C.color };
        const i = S.cards.findIndex((x) => x.id === card.id);
        if (i >= 0) S.cards[i] = card; else S.cards.push(card);
        save(); renderAll(); onSaved && onSaved(card); popSheet(); toast('カードを保存しました');
      }
      if (b.dataset.act === 'delete') {
        const used = S.items.filter((x) => x.cardId === C.id).length;
        if (!confirm(used ? `このカードは ${used} 件の項目で使われています。削除すると支払い方法は「カード」とだけ表示されます。削除しますか？` : 'このカードを削除しますか？')) return;
        S.cards = S.cards.filter((x) => x.id !== C.id);
        S.items.forEach((x) => { if (x.cardId === C.id) x.cardId = null; });
        save(); renderAll(); popSheet(); toast('カードを削除しました');
      }
    };
  };
  pushSheet(render);
}

/* ---------- 手動レート ---------- */
function openManualRate() {
  let v = String(rate().toFixed(2));
  pushSheet(() => {
    sheetBody.innerHTML = `
      ${sheetHead('レートを手動で固定')}
      <div class="field"><label for="r-v">$1 あたりの円</label><input class="input num" id="r-v" value="${v}" inputmode="decimal"></div>
      <button class="btn primary" data-act="save">${icon('check')}固定する</button>`;
    $('#r-v').oninput = (e) => (v = e.target.value);
    sheetBody.onclick = (e) => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-close')) return closeAll();
      if (b.dataset.act === 'save') {
        const n = parseFloat(v);
        if (!(n > 0)) return toast('数値を入力してください');
        S.manualRate = n; save(); renderAll(); closeAll(); toast('レートを固定しました');
      }
    };
  });
}

/* ---------- バックアップ ---------- */
async function exportData() {
  const json = JSON.stringify({ app: 'ledger', version: 1, exportedAt: new Date().toISOString(), data: S }, null, 2);
  const name = `ledger-backup-${today().replaceAll('-', '')}.json`;
  const file = new File([json], name, { type: 'application/json' });
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      const data = json.data || json;
      if (!Array.isArray(data.items)) throw new Error('format');
      if (!confirm(`項目 ${data.items.length} 件・カード ${(data.cards || []).length} 枚を復元します。\n今のデータは上書きされます。よろしいですか？`)) return;
      S = Object.assign(defaultState(), data); save(); renderAll(); toast('復元しました');
    } catch (e) { toast('バックアップファイルを読み込めませんでした'); }
  };
  reader.readAsText(file);
}

/* ---------- トースト ---------- */
let toastTimer;
function toast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- 画面切り替え・イベント ---------- */
function showView(v) {
  UI.view = v;
  $$('.view').forEach((el) => el.classList.toggle('active', el.id === 'view-' + v));
  $$('.tab').forEach((el) => el.classList.toggle('active', el.dataset.view === v));
  if (v === 'summary') requestAnimationFrame(() => { pager.scrollLeft = UI.page * pager.clientWidth; syncSeg(); });
}
const pager = $('#pager');
const segInd = $('#summary-seg .seg-indicator');
function syncSeg() {
  const p = pager.clientWidth ? pager.scrollLeft / pager.clientWidth : UI.page;
  segInd.style.transform = `translateX(${p * 100}%)`;
  const idx = Math.round(p);
  UI.page = idx;
  $$('#summary-seg button').forEach((b, i) => b.classList.toggle('on', i === idx));
}
pager.addEventListener('scroll', syncSeg, { passive: true });
window.addEventListener('resize', () => { pager.scrollLeft = UI.page * pager.clientWidth; syncSeg(); });
$$('#summary-seg button').forEach((b) => b.addEventListener('click', () => pager.scrollTo({ left: Number(b.dataset.page) * pager.clientWidth, behavior: 'smooth' })));

document.addEventListener('click', (e) => {
  const t = e.target;
  if (t.closest('#sheet-layer')) return;
  const tab = t.closest('.tab'); if (tab) return showView(tab.dataset.view);
  if (t.closest('#fab')) return openForm(null);
  const step = t.closest('[data-month-step]');
  if (step) { UI.month = shiftYm(UI.month, Number(step.dataset.monthStep)); return renderAll(); }
  if (t.closest('[data-month-today]')) { UI.month = today().slice(0, 7); UI.calSel = today(); return renderAll(); }
  const det = t.closest('[data-detail]'); if (det) return openDetail(det.dataset.detail);
  const day = t.closest('[data-day]');
  if (day) {
    const d = day.dataset.day; UI.calSel = d;
    if (d.slice(0, 7) !== UI.month) { UI.month = d.slice(0, 7); return renderAll(); }
    return renderCalendar();
  }
  const hf = t.closest('[data-hf]'); if (hf) { UI.histFilter = hf.dataset.hf; return renderHistory(); }
  const card = t.closest('[data-card]'); if (card) return openCardEditor(card.dataset.card === 'new' ? null : card.dataset.card);
  const act = t.closest('[data-act]')?.dataset.act;
  if (act === 'rate-refresh') { toast('取得中…'); return fetchRate(true); }
  if (act === 'rate-manual') { if (S.manualRate) { S.manualRate = null; save(); renderAll(); toast('自動取得に戻しました'); fetchRate(true); } else openManualRate(); return; }
  if (act === 'export') return exportData();
  if (act === 'import') return $('#import-file').click();
  if (act === 'wipe') {
    if (confirm('すべての項目とカードを削除します。元に戻せません。\n（先にバックアップの書き出しをおすすめします）') && confirm('本当に削除しますか？')) {
      S = defaultState(); save(); renderAll(); toast('削除しました');
    }
  }
});
document.addEventListener('change', (e) => { if (e.target.id === 'import-file' && e.target.files[0]) { importData(e.target.files[0]); e.target.value = ''; } });
$('#history-q').addEventListener('input', (e) => { UI.histQ = e.target.value; renderHistory(); });

// カレンダーは左右スワイプで月を切り替え
(function calSwipe() {
  const grid = $('#cal-grid'); let x0 = null, y0 = null;
  grid.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  grid.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      UI.month = shiftYm(UI.month, dx < 0 ? 1 : -1);
      grid.animate([{ opacity: 0.3, transform: `translateX(${dx < 0 ? 24 : -24}px)` }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
      renderAll();
    }
  });
})();

/* ---------- 起動 ---------- */
$$('[data-icon]').forEach((el) => (el.innerHTML = icon(el.dataset.icon)));
$$('[data-month-step="-1"]').forEach((el) => (el.innerHTML = icon('chevL')));
$$('[data-month-step="1"]').forEach((el) => (el.innerHTML = icon('chevR')));
renderAll();
showView('summary');
fetchRate();
document.addEventListener('visibilitychange', () => { if (!document.hidden) { fetchRate(); renderAll(); } });
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
