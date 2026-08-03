/* chars.js â€” personagens gerados a partir de DADOS (configuraÃ§Ã£o)
   Editar um personagem = editar CHAR_DEFS. Nunca editar SVG Ã  mÃ£o.
   O gerador preserva o sistema de classes (c-head, c-mouth-alt, data-p...)
   usado pelo CSS e pelo quiz.js. */

window.CharBuilder = (function () {
  'use strict';

  /* ---------- helpers de marcaÃ§Ã£o ---------- */

  function attr(k, v) {
    if (v === null || v === undefined || v === '') return '';
    return ' ' + k + '="' + String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;') + '"';
  }

  function el(tag, a, inner) {
    var out = '<' + tag;
    Object.keys(a || {}).forEach(function (k) { out += attr(k, a[k]); });
    return inner === undefined ? out + '/>' : out + '>' + inner + '</' + tag + '>';
  }

  /* descritores de forma: { t:'path'|'ellipse'|'circle'|'rect'|'g', <atributos>, i:[filhos] } */
  function shapes(list) {
    if (!list) return '';
    var out = '';
    list.forEach(function (s) {
      var a = {};
      Object.keys(s).forEach(function (k) { if (k !== 't' && k !== 'i') a[k] = s[k]; });
      out += el(s.t, a, s.i ? shapes(s.i) : undefined) + '\n';
    });
    return out;
  }

  function g(cls, inner) { return el('g', { class: cls }, '\n' + inner); }

  /* ---------- construtores do rig ---------- */

  function buildShadow(d) {
    return el('ellipse', { class: 'c-shadow', cx: 70, cy: 187, rx: d.shadow[0], ry: d.shadow[1], fill: 'rgba(0,0,0,.38)' });
  }

  function buildLegs(d) {
    var l = d.legs;
    return g('c-legs',
      el('rect', { x: 56, y: 132, width: 13, height: 42, rx: 6.5, fill: l.fill }) + '\n' +
      el('rect', { x: 71, y: 132, width: 13, height: 42, rx: 6.5, fill: l.fill }) + '\n' +
      el('ellipse', { cx: 62.5, cy: 178, rx: 11.5, ry: 5, fill: l.shoe[0] }) + '\n' +
      el('ellipse', { cx: 77.5, cy: 178, rx: 11.5, ry: 5, fill: l.shoe[1] }));
  }

  function buildTorso(d, key) {
    var t = d.torso;
    var inner = el('path', { d: t.d, fill: t.g ? 'url(#' + key + 'Torso)' : t.fill });
    if (t.shadow) inner += '\n' + el('path', { d: t.shadowD, fill: 'rgba(0,0,0,.22)', opacity: 0.45 });
    if (t.belly) inner += '\n' + el('ellipse', { cx: 70, cy: 106, rx: 15, ry: 10, fill: t.belly });
    if (t.extra) inner += '\n' + shapes(t.extra);
    return g('c-torso', inner);
  }

  function buildHair(d) { return g('c-hair', shapes(d.hair)); }
  function buildBow(d) { return d.bow ? g('c-bow', shapes(d.bow)) : ''; }
  function buildHood(d) { return d.hood ? g('c-hood', shapes(d.hood)) : ''; }
  function buildHairFront(d) { return d.hairFront ? g('c-hair-front', shapes(d.hairFront)) : ''; }

  function eyeGroup(x, y, e) {
    var pupils = '';
    e.pupils.forEach(function (p) {
      pupils += '\n' + el('circle', { cx: x + p[2], cy: y + p[3], r: p[0], fill: p[1] });
    });
    return el('g', { class: 'c-eye', 'data-p': x + ' ' + y }, '\n' +
      el('ellipse', { cx: x, cy: y, rx: e.white[0], ry: e.white[1], fill: '#fff' }) + '\n' +
      el('g', { class: 'c-pupils' }, pupils) + '\n' +
      shapes(e.post));
  }

  function buildEyes(d) {
    var e = d.eyes;
    return el('g', { class: 'c-eyes' }, '\n' +
      shapes(e.pre) +
      eyeGroup(e.l, e.y, e) + '\n' +
      eyeGroup(e.r, e.y, e) + '\n');
  }

  function buildCheeks(d) {
    if (!d.cheeks) return '';
    return el('ellipse', { cx: 50, cy: 71, rx: 5, ry: 3, fill: d.cheeks }) + '\n' +
      el('ellipse', { cx: 90, cy: 71, rx: 5, ry: 3, fill: d.cheeks });
  }

  function buildBrows(d) {
    var out = '';
    d.brows.forEach(function (b) {
      out += el('path', { d: b[0], stroke: b[1], 'stroke-width': b[2], fill: 'none', 'stroke-linecap': 'round' }) + '\n';
    });
    return g('c-brows', out);
  }

  /* sobrancelhas alternativas (estado de erro) */
  function buildBrowAlt(d) {
    if (!d.browAlt) return '';
    var out = '';
    d.browAlt.forEach(function (b) {
      out += el('path', { d: b[0], stroke: b[1], 'stroke-width': b[2], fill: 'none', 'stroke-linecap': 'round' }) + '\n';
    });
    return g('c-brow-alt', out);
  }

  /* acessórios de reação no estado de erro (lágrimas, suor, vapor, marcas) */
  function buildWrongFace(d) {
    if (!d.wrongFace) return '';
    return g('c-wrong', shapes(d.wrongFace));
  }

  function buildMouth(d) {
    var m = d.mouth;
    var inner = shapes(m.neutro);
    m.alt.forEach(function (s) {
      var a = {}; Object.keys(s).forEach(function (k) { if (k !== 't') a[k] = s[k]; });
      a.class = 'c-mouth-alt';
      inner += '\n' + el(s.t, a);
    });
    m.pout.forEach(function (s) {
      var a = {}; Object.keys(s).forEach(function (k) { if (k !== 't') a[k] = s[k]; });
      a.class = 'c-mouth-pout';
      inner += '\n' + el(s.t, a);
    });
    /* boca desenhada menor e centrada no próprio ponto de pivô (fio da mandíbula)
       fica de fora para não interferir no pivô do GSAP */
    var p = String(m.p).split(/\s+/);
    var cx = p.length > 1 ? +p[0] : 70, cy = p.length > 1 ? +p[1] : 70;
    var guts = el('g', { class: 'c-mouth-guts', transform: 'translate(' + cx + ' ' + cy + ') scale(0.82) translate(' + (-cx) + ' ' + (-cy) + ')' }, '\n' + inner + '\n');
    return el('g', { class: 'c-mouth', 'data-p': m.p }, '\n' + guts + '\n');
  }

  function buildEyeAlt(d) {
    var out = '';
    d.eyeAlt.forEach(function (e) {
      out += el('path', { d: e[0], stroke: e[1], 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }) + '\n';
    });
    return g('c-eye-alt', out);
  }

  function buildHead(d, skinId) {
    var inner = shapes(d.headPre);
    if (d.face === 'rect') {
      inner += el('rect', { x: d.faceRect[0], y: d.faceRect[1], width: d.faceRect[2], height: d.faceRect[3], rx: d.faceRect[4], fill: 'url(#' + skinId + ')' });
    } else {
      inner += el('ellipse', { cx: 70, cy: 56, rx: 30, ry: 30, fill: 'url(#' + skinId + ')' });
    }
    if (d.ears) {
      inner += '\n' + el('ellipse', { cx: 47, cy: 64, rx: 6.5, ry: 4.2, fill: d.ears }) + '\n' +
        el('ellipse', { cx: 93, cy: 64, rx: 6.5, ry: 4.2, fill: d.ears });
    }
    inner += '\n' + buildHair(d);
    inner += '\n' + buildBow(d);
    inner += '\n' + buildEyes(d);
    inner += '\n' + buildFacePost(d);
    inner += '\n' + buildCheeks(d);
    inner += '\n' + buildBrows(d);
    inner += '\n' + buildMouth(d);
    inner += '\n' + buildEyeAlt(d);
    inner += '\n' + buildBrowAlt(d);
    inner += '\n' + buildWrongFace(d);
    inner += '\n' + buildHairFront(d);
    inner += '\n' + buildNose(d);
    return el('g', { class: 'c-head', 'data-p': '70 84' }, '\n' + inner);
  }

  function buildFacePost(d) {
    return d.facePost ? g('c-face-post', shapes(d.facePost)) : '';
  }

  function buildNose(d) {
    if (!d.nose) return '';
    return el('path', { d: 'M67.5 61 Q70 64.8 72.5 61', stroke: 'rgba(0,0,0,.16)', 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' });
  }

  function buildArms(d) {
    var a = d.arms;
    var armL = el('g', { class: 'c-arm-l', 'data-p': '46 90' }, '\n' +
      el('path', { d: 'M46 90 Q39 110 45 131', stroke: a.stroke, 'stroke-width': 10, 'stroke-linecap': 'round', fill: 'none' }) + '\n' +
      el('circle', { cx: 45, cy: 133, r: 6, fill: a.hand }) + '\n' +
      (a.extraL ? shapes(a.extraL) : ''));
    var armR = el('g', { class: 'c-arm-r', 'data-p': '94 90' }, '\n' +
      el('path', { d: 'M94 90 Q101 110 95 131', stroke: a.stroke, 'stroke-width': 10, 'stroke-linecap': 'round', fill: 'none' }) + '\n' +
      el('circle', { cx: 95, cy: 133, r: 6, fill: a.hand }) + '\n' +
      (a.extraR ? shapes(a.extraR) : ''));
    return armL + '\n' + armR;
  }

  function build(key) {
    var d = CHAR_DEFS[key];
    var skinId = key + 'Skin';
    var defs = el('linearGradient', { id: skinId, x1: 0, y1: 0, x2: 0, y2: 1 },
      el('stop', { offset: 0, 'stop-color': d.skin[0] }) + el('stop', { offset: 1, 'stop-color': d.skin[1] }));
    if (d.torso.g) {
      defs += '\n' + el('linearGradient', { id: key + 'Torso', x1: 0, y1: 0, x2: 0, y2: 1 },
        el('stop', { offset: 0, 'stop-color': d.torso.g[0] }) + el('stop', { offset: 1, 'stop-color': d.torso.g[1] }));
    }
    return el('defs', undefined, defs) + '\n' +
      buildShadow(d) + '\n' +
      g('c-body',
        '\n' + buildLegs(d) + '\n' +
        buildTorso(d, key) + '\n' +
        buildHood(d) + '\n' +
        buildHead(d, skinId) + '\n' +
        buildArms(d) + '\n');
  }

  function mount() {
    document.querySelectorAll('svg[data-char]').forEach(function (svg) {
      svg.innerHTML = build(svg.getAttribute('data-char'));
    });
  }

  /* ---------- CONFIGURAÃ‡ÃƒO DOS 7 PERSONAGENS ---------- */

  var TORSO_STD = 'M48 84 C48 76 92 76 92 84 L97 124 C97 136 43 136 43 124 Z';
  var TORSO_SHADOW = 'M43 124 C43 136 97 136 97 124 L97 121 C97 133 43 133 43 121 Z';
  var CAP_BLACK = 'M42 48 C40 24 52 18 70 20 C88 18 100 24 98 48 C98 36 90 30 80 32 C72 29 62 29 54 32 C46 30 42 38 42 48 Z';

  /* sorrisos por personagem: cavidade, faixa de dentes, língua */
  var SMILE_C = 'M61 65 Q63.5 62 70 62 Q76.5 62 79 65 Q79.5 70.5 76.5 74.5 Q70 78.5 63.5 74.5 Q60.5 70.5 61 65 Z';
  var SMILE_T = 'M62 65.8 Q66 63.6 70 64.2 Q74 63.6 78 65.8 Q78 68.4 74 69.2 Q70 68.8 66 69.2 Q62 68.4 62 65.8 Z';
  var SMILE_L = 'M64.5 71.5 Q70 77 75.5 71.5 Q70 79 64.5 71.5 Z';

  /* Tristeza: sorriso tímido, pequeno, quase fechado */
  var SMILE_SAD_C = 'M63 66.5 Q66 64.5 70 64.5 Q74 64.5 77 66.5 Q77.5 70 75.5 73.8 Q70 76.8 64.5 73.8 Q62.5 70 63 66.5 Z';
  var SMILE_SAD_T = 'M64 67.2 Q67 66 70 66.2 Q73 66 76 67.2 Q76 69.6 73 70.2 Q70 69.9 67 70.2 Q64 69.6 64 67.2 Z';
  var SMILE_SAD_L = 'M66 72 Q70 75.2 74 72 Q70 76.4 66 72 Z';

  /* Medo: sorriso travado, retraído, raso e nervoso */
  var SMILE_FEAR_C = 'M62 66 Q65 64.8 70 64.8 Q75 64.8 78 66 Q78.6 70.8 75.8 74.8 Q70 78.2 64.2 74.8 Q61.4 70.8 62 66 Z';
  var SMILE_FEAR_T = 'M63 66.7 Q66 65.3 70 65.5 Q74 65.3 77 66.7 Q77 69.4 74 70 Q70 69.7 66 70 Q63 69.4 63 66.7 Z';
  var SMILE_FEAR_L = 'M65 72 Q70 75.8 75 72 Q70 77.2 65 72 Z';

  /* Nojinho: sorriso de canto, debochado, inclinado, dentes só de um lado */
  var SMILE_DIS_C = 'M61 66 Q64 64.2 70 64.6 Q75.5 65 77.5 67.6 Q79 69.8 78 72.8 Q76 75.8 72 74.8 Q64.6 73.4 62.6 71.6 Q60.6 69.6 61 66 Z';
  var SMILE_DIS_T = 'M62 67 Q65.5 65.4 70 65.8 Q74.5 66.2 77 68.2 Q76.8 70.6 74 71.4 Q70 70.6 66.5 70.8 Q62 70.2 62 67 Z';
  var SMILE_DIS_L = 'M64.5 72 Q70 75.8 76 72 Q70 78 64.5 72 Z';

  /* Ansiedade: sorriso largo, tremido, apertado */
  var SMILE_ANX_C = 'M61 66 Q65 63.8 70 64 Q75 63.8 79 66 Q79.6 71 76.6 75.4 Q70 79.2 63.4 75.4 Q60.4 71 61 66 Z';
  var SMILE_ANX_T = 'M62 66.6 Q66 64.9 70 65.1 Q74 64.9 78 66.6 Q77.8 70.8 74 71.4 Q70 71.1 66 71.4 Q62 70.8 62 66.6 Z';
  var SMILE_ANX_L = 'M63 72 Q70 76 77 72 Q70 78 63 72 Z';

  /* Tédio: sorriso mínimo, plano, sem emoção */
  var SMILE_ENU_C = 'M61 67 Q66 65.4 70 65.4 Q74 65.4 79 67 Q79.6 73 76 75.6 Q70 78.6 64 75.6 Q60.4 73 61 67 Z';
  var SMILE_ENU_T = 'M62 67.4 Q65 66 70 66.2 Q75 66 78 67.4 Q78 69.4 75 70 Q70 69.7 65 70 Q62 69.4 62 67.4 Z';
  var SMILE_ENU_L = 'M64 73 Q70 77.2 76 73 Q70 79.2 64 73 Z';

  var CHAR_DEFS = {
    joy: {
      name: 'Alegria',
      skin: ['#ffe97a', '#ffd93b'],
      ears: '#ffd93b',
      nose: true,
      shadow: [30, 4],
      hair: [
        { t: 'path', d: CAP_BLACK, fill: '#000' },
        { t: 'path', d: 'M44 48 C36 44 36 30 48 24 L58 28 C48 32 46 40 47 48 Z', fill: '#10b8c4' },
        { t: 'path', d: 'M96 48 C104 44 104 30 92 24 L82 28 C92 32 94 40 93 48 Z', fill: '#10b8c4' },
        { t: 'path', d: 'M56 23 Q62 20.5 68 21.5', stroke: 'rgba(255,255,255,.3)', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }
      ],
      eyes: {
        l: 59, r: 81, y: 57, white: [7.6, 9.6],
        pupils: [[6.2, '#0e8fa3', 0, 0], [3.4, '#16395c', 0, 0], [1.8, '#fff', 1.6, -1.6], [0.9, 'rgba(255,255,255,.75)', -1.2, 1.8]]
      },
      cheeks: 'rgba(255,140,90,.55)',
      brows: [
        ['M52 44 Q59 41 66 43', '#0e8fa3', 3],
        ['M74 43 Q81 41 88 44', '#0e8fa3', 3]
      ],
      mouth: {
        p: '70 74',
        neutro: [{ t: 'path', d: 'M60 69 Q70 79 80 69', stroke: '#16395c', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }],
alt: [
          { t: 'path', d: SMILE_C, fill: '#8c2f2f', stroke: '#5e1515', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_T, fill: '#fff' },
          { t: 'path', d: SMILE_L, fill: '#ffb3c0' }
        ],
        pout: [{ t: 'path', d: 'M58 67 Q70 76 82 67 Q70 84 58 67 Z', fill: '#8c2f2f', stroke: '#5e1515', 'stroke-width': 2, 'stroke-linejoin': 'round' }]
      },
      eyeAlt: [
        ['M55.2 57 Q59 52.4 62.8 57', '#16395c'],
        ['M77.2 57 Q81 52.4 84.8 57', '#16395c']
      ],
      browAlt: [
        ['M52 41 Q59 37.5 66 40', '#0e8fa3', 3],
        ['M74 40 Q81 37.5 88 41', '#0e8fa3', 3]
      ],
      wrongFace: [
        { t: 'path', d: 'M88 30 Q93 38 90 45 Q87 38 88 30 Z', fill: '#bfe8ff' }
      ],
      torso: { d: TORSO_STD, fill: '#10b8c4', g: ['#19ccd9', '#0a9fae'], shadow: true, shadowD: TORSO_SHADOW, belly: 'rgba(255,233,122,.45)' },
      legs: { fill: '#ffd93b', shoe: ['#0e8fa3', '#0b7a8c'] },
      arms: { stroke: '#10b8c4', hand: '#ffe97a' }
    },

    sad: {
      name: 'Tristeza',
      skin: ['#7db4f7', '#4e8fe8'],
      ears: '#4e8fe8',
      nose: true,
      shadow: [30, 4],
      hair: [
        { t: 'path', d: CAP_BLACK, fill: '#000' },
        { t: 'path', d: 'M42 46 L34 40 Q32 32 38 30 L46 34 Z', fill: '#2f4e8f' },
        { t: 'path', d: 'M58 24 Q64 21.5 70 22.5', stroke: 'rgba(255,255,255,.28)', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }
      ],
      eyes: {
        l: 57, r: 83, y: 53, white: [7.6, 9.6],
        pupils: [[3.8, '#2f4e8f', 0, 0], [2.1, '#1c2f63', 0, 0], [1.2, '#fff', 1.2, -1.2]],
        pre: [
          { t: 'path', class: 'tear', d: 'M92 46 Q97 56 93 63 Q89 56 92 46 Z', fill: '#a7dcff' },
          { t: 'path', class: 'tear', d: 'M48 46 Q43 56 47 63 Q51 56 48 46 Z', fill: '#a7dcff' }
        ]
      },
      facePost: [
        { t: 'g', class: 'c-glasses', i: [
          { t: 'rect', x: 45, y: 45, width: 22, height: 16, rx: 7, fill: 'rgba(255,255,255,.14)', stroke: '#1c2f63', 'stroke-width': 2.5 },
          { t: 'rect', x: 73, y: 45, width: 22, height: 16, rx: 7, fill: 'rgba(255,255,255,.14)', stroke: '#1c2f63', 'stroke-width': 2.5 },
          { t: 'path', d: 'M67 52 L73 52', stroke: '#1c2f63', 'stroke-width': 2.5 }
        ] }
      ],
      cheeks: 'rgba(140,180,255,.4)',
      brows: [
        ['M51 38 Q57 35.5 63 38', '#24406f', 3],
        ['M77 38 Q83 35.5 89 38', '#24406f', 3]
      ],
      mouth: {
        p: '70 73',
        neutro: [{ t: 'path', d: 'M61 75 Q70 68 79 75', stroke: '#24406f', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }],
        alt: [
          { t: 'path', d: SMILE_SAD_C, fill: '#27416e', stroke: '#16264f', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_SAD_T, fill: '#fff' },
          { t: 'path', d: SMILE_SAD_L, fill: '#a7dcff' }
        ],
        pout: [{ t: 'path', d: 'M58 69 Q70 79 82 69 Q70 85 58 69 Z', fill: '#27416e', stroke: '#16264f', 'stroke-width': 2, 'stroke-linejoin': 'round' }]
      },
      eyeAlt: [
        ['M53.2 52.8 Q57 48.2 60.8 52.8', '#1c2f63'],
        ['M79.2 52.8 Q83 48.2 86.8 52.8', '#1c2f63']
      ],
      browAlt: [
        ['M52 43 Q58 37.5 64 40', '#24406f', 3],
        ['M76 40 Q82 37.5 88 43', '#24406f', 3]
      ],
      wrongFace: [
        { t: 'path', d: 'M92 50 Q97 58 94 66 Q90 58 92 50 Z', fill: '#a7dcff' },
        { t: 'path', d: 'M48 50 Q43 58 46 66 Q50 58 48 50 Z', fill: '#a7dcff' },
        { t: 'path', d: 'M95 68 Q99 73 97.5 78 Q94 73 95 68 Z', fill: '#a7dcff' }
      ],
      torso: { d: TORSO_STD, fill: '#3c5a8f', g: ['#4a6ea8', '#314d7c'], shadow: true, shadowD: TORSO_SHADOW, belly: 'rgba(125,180,247,.35)' },
      legs: { fill: '#7db4f7', shoe: ['#2f4e8f', '#22386b'] },
      arms: { stroke: '#3c5a8f', hand: '#7db4f7' }
    },

    ang: {
      name: 'Raiva',
      skin: ['#f4643f', '#d93a28'],
      face: 'rect',
      faceRect: [49, 30, 42, 48, 16],
      nose: true,
      shadow: [33, 4.2],
      headPre: [
        { t: 'path', class: 'fire', d: 'M50 30 Q46 12 56 4 Q54 16 60 10 Q58 22 64 16 Q66 26 72 24 Q78 26 78 16 Q86 20 84 10 Q92 14 90 30 Z', fill: '#f27c2e' },
        { t: 'path', class: 'fire fire-inner', d: 'M58 26 Q58 18 64 13 Q62 21 67 19 Q67 25 72 27 Q68 28 66 28 Z', fill: '#ffc73b' }
      ],
      hair: [
        { t: 'path', d: 'M52 26 Q50 14 58 6 Q56 18 62 12 Q60 24 66 18 Q68 28 74 26 Q80 28 80 18 Q88 22 86 12 Q94 16 92 26 Z', fill: '#f27c2e' },
        { t: 'path', d: 'M62 24 Q62 17 67 13 Q65 20 69 19 Q69 24 73 26 Q69 27 67 27 Z', fill: '#ffc73b' },
        { t: 'path', d: 'M45 9 Q43 5 46 2 Q49 1 51 3 Q54 2 54 6 Q54 9 51 10 Q47 10 45 9 Z', fill: 'rgba(255,255,255,.6)' },
        { t: 'path', d: 'M86 7 Q84 2 87 -1 Q90 0 92 2 Q95 1 96 5 Q96 9 92 9 Q88 9 86 7 Z', fill: 'rgba(255,255,255,.6)' }
      ],
      eyes: {
        l: 61, r: 79, y: 57, white: [7.6, 9.6],
        pupils: [[4.8, '#4a2f18', 0, 0], [2.8, '#2a0f08', 0, 0], [1.5, '#fff', 1.3, -1.5]]
      },
      brows: [
        ['M52 40 L65 45', '#7e1b10', 5],
        ['M88 40 L75 45', '#7e1b10', 5]
      ],
      mouth: {
        p: '70 65',
        neutro: [{ t: 'path', d: 'M59 65 Q70 59 81 65', stroke: '#7e1b10', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }],
        alt: [
          { t: 'path', d: SMILE_C, fill: '#5e1410', stroke: '#3a0a06', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_T, fill: '#f7f4ff' },
          { t: 'path', d: SMILE_L, fill: '#f4643f' }
        ],
        pout: [{ t: 'path', d: 'M58 60 Q70 70 82 60 Q70 76 58 60 Z', fill: '#5e1410', stroke: '#3a0a06', 'stroke-width': 2, 'stroke-linejoin': 'round' }]
      },
      eyeAlt: [
        ['M56.8 57 Q61 51.6 65.2 57', '#2a0f08'],
        ['M74.8 57 Q79 51.6 83.2 57', '#2a0f08']
      ],
      browAlt: [
        ['M51 40 L70 45', '#5e1410', 6],
        ['M89 40 L70 45', '#5e1410', 6]
      ],
      wrongFace: [
        { t: 'ellipse', cx: 58, cy: 8, rx: 7, ry: 4.5, fill: 'rgba(255,255,255,.85)' },
        { t: 'ellipse', cx: 72, cy: 5, rx: 6, ry: 4, fill: 'rgba(255,255,255,.75)' },
        { t: 'ellipse', cx: 66, cy: 11, rx: 4, ry: 2.8, fill: 'rgba(255,255,255,.6)' }
      ],
      torso: {
        d: 'M46 84 C46 76 94 76 94 84 L99 124 C99 138 41 138 41 124 Z', fill: '#f7f4ff',
        g: ['#ffffff', '#e8e2f5'],
        shadow: true, shadowD: 'M41 124 C41 138 99 138 99 124 L99 120 C99 134 41 134 41 120 Z',
        extra: [
          { t: 'path', d: 'M50 88 L90 88 L86 98 L54 98 Z', fill: '#c2382b' },
          { t: 'path', d: 'M55 92 L85 92 L82 96 L58 96 Z', fill: '#d94a3a' }
        ]
      },
      legs: { fill: '#8a5a33', shoe: ['#5e3c1f', '#4a2f18'] },
      arms: { stroke: '#c2382b', hand: '#f4643f' }
    },

    fear: {
      name: 'Medo',
      skin: ['#8a6ae6', '#7558cf'],
      ears: '#7558cf',
      nose: true,
      shadow: [30, 4],
      hair: [
        { t: 'path', d: 'M42 44 C40 22 54 16 70 18 C86 16 100 22 98 44 C98 32 90 26 80 28 C72 25 62 25 54 28 C46 26 42 34 42 44 Z', fill: '#000' },
        { t: 'path', d: 'M48 46 Q42 34 52 26 L60 30 C52 34 50 42 51 46 Z', fill: '#4a3670' },
        { t: 'path', d: 'M53 44 Q51 36 57 30 L62 32 C56 36 55 42 55.5 46 Z', fill: '#c9b8f5' },
        { t: 'path', d: 'M58 22 Q64 19.5 70 20.5', stroke: 'rgba(255,255,255,.28)', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }
      ],
      eyes: {
        l: 61, r: 79, y: 55, white: [7.6, 9.6],
        pupils: [[3.6, '#3d2a75', 0, 0], [2.1, '#2a1a5e', 0, 0], [1.2, '#fff', 1.4, -1.4]]
      },
      cheeks: 'rgba(255,140,180,.4)',
      brows: [
        ['M52 42 Q59 35.3 67 38.5', '#c9b8f5', 3.5],
        ['M73 38.5 Q81 35.3 88 42', '#c9b8f5', 3.5]
      ],
      mouth: {
        p: '70 70',
        neutro: [{ t: 'path', d: 'M65 70 Q70 73 75 70', stroke: '#3a2a6e', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }],
        alt: [
          { t: 'path', d: SMILE_FEAR_C, fill: '#3a2a6e', stroke: '#241a50', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_FEAR_T, fill: '#fff' },
          { t: 'path', d: SMILE_FEAR_L, fill: '#ffd1cc' }
        ],
        pout: [{ t: 'path', d: 'M61 74 Q70 66 79 74', fill: 'none', stroke: '#3a2a6e', 'stroke-width': 2, 'stroke-linejoin': 'round' }]
      },
      eyeAlt: [
        ['M56.8 55 Q61 49.6 65.2 55', '#2a1a5e'],
        ['M74.8 55 Q79 49.6 83.2 55', '#2a1a5e']
      ],
      browAlt: [
        ['M52 38.5 Q59 34.5 66 38.5', '#c9b8f5', 3.5],
        ['M74 38.5 Q81 34.5 88 38.5', '#c9b8f5', 3.5]
      ],
      wrongFace: [
        { t: 'path', d: 'M47 30 Q43 38 46 44 Q49 38 47 30 Z', fill: '#bfe8ff' },
        { t: 'path', d: 'M93 30 Q89 38 92 44 Q95 38 93 30 Z', fill: '#bfe8ff' },
        { t: 'path', d: 'M95 48 Q98 52 96.5 56 Q93 52 95 48 Z', fill: '#bfe8ff' }
      ],
      torso: { d: TORSO_STD, fill: '#3f2d66', g: ['#4d3a7c', '#35265a'], shadow: true, shadowD: TORSO_SHADOW, belly: 'rgba(160,130,255,.25)' },
      legs: { fill: '#7558cf', shoe: ['#2f2150', '#241a40'] },
      arms: { stroke: '#3f2d66', hand: '#8a6ae6' }
    },

    dis: {
      name: 'Nojinho',
      skin: ['#87c76c', '#6faf55'],
      ears: '#6faf55',
      nose: true,
      shadow: [30, 4],
      hair: [
        { t: 'path', d: 'M41 48 C38 30 50 23 70 23 C90 23 102 30 99 48 C98 38 92 33 83 33 C74 30 66 30 57 33 C48 34 42 39 41 48 Z', fill: '#513a26' },
        { t: 'path', d: 'M41 48 Q42 61 45.5 66 Q42.5 63 41 48 Z', fill: '#513a26' },
        { t: 'path', d: 'M99 48 Q98 61 94.5 66 Q97.5 63 99 48 Z', fill: '#513a26' },
        { t: 'circle', cx: 70, cy: 14, r: 8.5, fill: '#513a26' },
        { t: 'path', d: 'M63.5 10.5 Q70 6.5 76.5 10.5', stroke: '#7f5c3b', 'stroke-width': 2.2, fill: 'none', 'stroke-linecap': 'round' }
      ],
      bow: [
        { t: 'ellipse', cx: 61, cy: 22, rx: 6.5, ry: 4, transform: 'rotate(-28 61 22)', fill: '#e88aa0' },
        { t: 'ellipse', cx: 79, cy: 22, rx: 6.5, ry: 4, transform: 'rotate(28 79 22)', fill: '#e88aa0' },
        { t: 'circle', cx: 70, cy: 22, r: 3.2, fill: '#d56b85' }
      ],
      eyes: {
        l: 61, r: 79, y: 56, white: [7.2, 8],
        pupils: [[3.6, '#3f6b2f', 0, 0], [2, '#1f3d1a', 0, 0], [1.2, '#fff', 1.3, -1.4]]
      },
      cheeks: 'rgba(255,120,140,.35)',
      brows: [
        ['M53 38.5 Q60 36.2 66.5 39', '#3f6b2f', 3],
        ['M73.5 41.6 Q80 42 86.5 40.4', '#3f6b2f', 3],
        ['M65.5 44 Q67.5 46.5 70 44 Q72.5 46.5 74.5 44', '#3f6b2f', 2.2]
      ],
      mouth: {
        p: '70 70',
        neutro: [
          { t: 'path', d: 'M57.8 71 Q64 69.2 70 69.9 Q76 70.5 82.2 72.3 Q76 74.1 70 73.2 Q64 72.3 57.8 71 Z', fill: '#e08a7d' },
          { t: 'path', d: 'M58 71 Q64 69.4 70 70 Q76 70.6 82 72.6', stroke: '#1f3d1a', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }
        ],
        alt: [
          { t: 'path', d: SMILE_DIS_C, fill: '#33501f', stroke: '#223815', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_DIS_T, fill: '#fff' },
          { t: 'path', d: SMILE_DIS_L, fill: '#e88aa0' }
        ],
        pout: [
          { t: 'path', d: 'M57 66 Q70 78 83 66 Q70 83.5 57 66 Z', fill: '#33501f', stroke: '#223815', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: 'M60.5 67.5 Q70 70.2 79.5 67.5 Q76 69.5 70 69.7 Q64 69.5 60.5 67.5 Z', fill: '#fff' },
          { t: 'path', d: 'M63 70.5 Q70 82 77 70.5 Q70 76.5 63 70.5 Z', fill: '#e85d75' }
        ]
      },
      eyeAlt: [
        ['M53.2 54.5 Q61 49.5 68.8 54.5', '#1f3d1a'],
        ['M71.2 54.5 Q79 49.5 86.8 54.5', '#1f3d1a']
      ],
      browAlt: [
        ['M52 37.5 Q59 34 66 38', '#3f6b2f', 3],
        ['M74 44 Q80 45.5 86 43', '#3f6b2f', 3],
        ['M66 46 Q67.8 48.5 70 46 Q72.2 48.5 74 46', '#2f5222', 2.2]
      ],
      wrongFace: [
        { t: 'path', d: 'M67.5 58 Q70 55.8 72.5 58', stroke: '#2f5222', 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' },
        { t: 'path', d: 'M90 56 Q95 58 93 64 Q91 58 90 56 Z', fill: '#7ac06a' }
      ],
      torso: {
        d: 'M48 84 C48 76 92 76 92 84 L90 114 C90 118 50 118 50 114 Z', fill: '#5e8a3f',
        g: ['#6d9d4c', '#527c37'],
        shadow: false,
        belly: 'rgba(180,230,150,.25)',
        extra: [
          { t: 'path', d: 'M48.5 114.5 Q70 119.5 91.5 114.5', stroke: '#3f5c2a', 'stroke-width': 2.5, fill: 'none', opacity: 0.55 },
          { t: 'path', d: 'M47 116 C47 110 93 110 93 116 L100 154 Q70 162 40 154 Z', fill: '#47702f' },
          { t: 'path', d: 'M40 154 Q70 162 100 154 L98 149 Q70 157 42 149 Z', fill: 'rgba(0,0,0,.22)', opacity: 0.5 }
        ]
      },
      legs: { fill: '#6faf55', shoe: ['#3f5c2a', '#334a22'] },
      arms: { stroke: '#5e8a3f', hand: '#87c76c' }
    },

    anx: {
      name: 'Ansiedade',
      skin: ['#f49b4f', '#e07b2f'],
      ears: '#e07b2f',
      nose: true,
      shadow: [30, 4],
      hair: [
        { t: 'path', d: 'M42 46 C40 24 52 18 70 20 C88 18 100 24 98 46 C98 36 90 30 80 32 C72 29 62 29 54 32 C46 30 42 38 42 46 Z', fill: '#000' },
        { t: 'path', d: 'M48 46 Q42 34 54 26 L64 30 C54 34 50 42 51 48 Z', fill: '#8a3e12' },
        { t: 'path', d: 'M90 42 Q96 32 92 26 Q88 34 84 28 Q80 36 82 44 Z', fill: '#8a3e12' },
        { t: 'path', d: 'M58 24 Q64 21.5 70 22.5', stroke: 'rgba(255,255,255,.28)', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }
      ],
      eyes: {
        l: 61, r: 79, y: 55, white: [7.6, 9.6],
        pupils: [[3.8, '#a0501c', 0, 0], [2.2, '#5e2a08', 0, 0], [1.2, '#fff', 1.4, -1.4]],
        pre: [
          { t: 'path', class: 'sweat', d: 'M97 34 Q101 42 98 48 Q95 42 97 34 Z', fill: '#bfe8ff' },
          { t: 'path', class: 'sweat', d: 'M43 34 Q39 42 42 48 Q45 42 43 34 Z', fill: '#bfe8ff' },
          { t: 'ellipse', cx: 61, cy: 64.5, rx: 5.5, ry: 2.2, fill: 'rgba(94,42,8,.3)' },
          { t: 'ellipse', cx: 79, cy: 64.5, rx: 5.5, ry: 2.2, fill: 'rgba(94,42,8,.3)' }
        ]
      },
      cheeks: 'rgba(255,200,140,.25)',
      brows: [
        ['M53 43 Q60 39.5 67 43', '#8a3e12', 3.2],
        ['M73 43 Q80 39.5 87 43', '#8a3e12', 3.2]
      ],
      mouth: {
        p: '70 70',
        neutro: [{ t: 'path', d: 'M61 70 Q70 75 79 70', stroke: '#5e2a08', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }],
        alt: [
          { t: 'path', d: SMILE_ANX_C, fill: '#7a2f0c', stroke: '#4a2006', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_ANX_T, fill: '#fff' },
          { t: 'path', d: SMILE_ANX_L, fill: '#ffb3a0' }
        ],
        pout: [{ t: 'path', d: 'M58 67 Q70 76 82 67 Q70 82 58 67 Z', fill: '#7a2f0c', stroke: '#4a2006', 'stroke-width': 2, 'stroke-linejoin': 'round' }]
      },
      eyeAlt: [
        ['M56.8 55 Q61 48.6 65.2 55', '#5e2a08'],
        ['M74.8 55 Q79 48.6 83.2 55', '#5e2a08']
      ],
      browAlt: [
        ['M52 39 Q58 35.5 65 39', '#8a3e12', 3.2],
        ['M75 39 Q82 35.5 88 39', '#8a3e12', 3.2],
        ['M53 44 Q58 47 63 44', '#8a3e12', 2.2],
        ['M77 44 Q82 47 87 44', '#8a3e12', 2.2]
      ],
      wrongFace: [
        { t: 'path', d: 'M42 24 Q37 33 40 40 Q44 33 42 24 Z', fill: '#bfe8ff' },
        { t: 'path', d: 'M98 24 Q93 33 96 40 Q100 33 98 24 Z', fill: '#bfe8ff' },
        { t: 'path', d: 'M34 48 Q31 51 33 55 Q37 51 34 48 Z', fill: '#bfe8ff' },
        { t: 'path', d: 'M106 44 Q103 47 105 51 Q109 47 106 44 Z', fill: '#bfe8ff' }
      ],
      torso: { d: TORSO_STD, fill: '#d06e2c', g: ['#e07f3a', '#c06125'], shadow: true, shadowD: TORSO_SHADOW, belly: 'rgba(255,200,140,.25)' },
      legs: { fill: '#e07b2f', shoe: ['#5e2a08', '#4a2006'] },
      arms: { stroke: '#d06e2c', hand: '#f49b4f' }
    },

    enu: {
      name: 'TÃ©dio',
      skin: ['#cfc8f5', '#b7aee8'],
      ears: '#b7aee8',
      nose: true,
      shadow: [30, 4],
      hood: [
        { t: 'path', d: 'M46 88 C46 60 94 60 94 88 C94 78 86 72 70 72 C54 72 46 78 46 88 Z', fill: '#7d6fbd' },
        { t: 'path', d: 'M50 86 C50 66 90 66 90 86 C90 78 82 73 70 73 C58 73 50 78 50 86 Z', fill: '#6e62b8', opacity: 0.4 }
      ],
      hair: [
        { t: 'path', d: 'M44 42 C44 24 54 16 70 18 C86 16 96 24 96 42 C96 28 90 22 70 22 C50 22 44 28 44 42 Z', fill: '#000' },
        { t: 'path', d: 'M98 40 C100 22 88 12 72 12 C56 12 46 22 44 38 C43 48 46 58 51 62 C44 52 42 42 46 32 C50 20 62 12 78 14 C90 15 97 24 98 40 Z', fill: '#8a7fc0' }
      ],
      eyes: {
        l: 63, r: 77, y: 58, white: [7.6, 9.6],
        pupils: [[3.4, '#6e62b8', 0, 2], [1.9, '#4a3f8f', 0, 2], [1, '#fff', 1, 0.8]],
        post: [
          { t: 'path', d: 'M56.5 54.5 Q63 49.5 69.5 54.5', stroke: '#6e62b8', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' },
          { t: 'path', d: 'M70.5 54.5 Q77 49.5 83.5 54.5', stroke: '#6e62b8', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }
        ]
      },
      cheeks: 'rgba(220,200,255,.55)',
      brows: [
        ['M55 40 Q61 37.5 67 40', '#4a3f8f', 3],
        ['M73 40 Q79 37.5 85 40', '#4a3f8f', 3]
      ],
      mouth: {
        p: '70 71',
        neutro: [{ t: 'path', d: 'M63 72.5 Q70 70 77 72.5', stroke: '#4a3f8f', 'stroke-width': 3.2, fill: 'none', 'stroke-linecap': 'round' }],
        alt: [
          { t: 'path', d: SMILE_ENU_C, fill: '#4a3f8f', stroke: '#3a2f80', 'stroke-width': 2, 'stroke-linejoin': 'round' },
          { t: 'path', d: SMILE_ENU_T, fill: '#f0ecff' },
          { t: 'path', d: SMILE_ENU_L, fill: '#ffcfcf' }
        ],
        pout: [{ t: 'path', d: 'M60 70 Q70 78 80 70 Q70 82 60 70 Z', fill: '#4a3f8f', stroke: '#3a2f80', 'stroke-width': 2, 'stroke-linejoin': 'round' }]
      },
      eyeAlt: [
        ['M58.5 58 Q63 53.5 67.5 58', '#4a3f8f'],
        ['M72.5 58 Q77 53.5 81.5 58', '#4a3f8f']
      ],
      browAlt: [
        ['M55 43 Q61 41 67 43', '#4a3f8f', 3],
        ['M73 43 Q79 41 85 43', '#4a3f8f', 3]
      ],
      wrongFace: [
        { t: 'ellipse', cx: 92, cy: 38, rx: 7, ry: 5.5, fill: 'rgba(190,180,240,.5)' },
        { t: 'path', d: 'M92 33 Q93 31 95 31 Q97 31 98 33 Q98 35 97 36 L98 38 Q98 40 96 40 Q94 40 94 38 Q92 38 92 36 Q92 34 92 33 Z', fill: '#8a7fc0' }
      ],
      hairFront: [{ t: 'path', d: 'M51 52 Q48 60 50 66 Q54 60 54 54 Z', fill: '#8a7fc0' }],
      torso: {
        d: 'M48 84 C48 74 58 68 70 68 C82 68 92 74 92 84 L97 124 C97 136 43 136 43 124 Z', fill: '#8a7fc0',
        g: ['#9a90cd', '#7d70b4'],
        shadow: true, shadowD: TORSO_SHADOW,
        belly: 'rgba(255,255,255,.16)',
        extra: [{ t: 'path', d: 'M61 96 L62.5 111 M79 96 L77.5 111', stroke: '#6e62b8', 'stroke-width': 3, 'stroke-linecap': 'round' }]
      },
      legs: { fill: '#b9aee6', shoe: ['#6e62b8', '#4a3f8f'] },
      arms: {
        stroke: '#7d6fbd', hand: '#cfc8f5',
        extraR: [
          { t: 'rect', x: 87, y: 120, width: 16, height: 24, rx: 2.5, fill: '#2a2f52' },
          { t: 'rect', x: 89, y: 122.5, width: 12, height: 17, rx: 1.2, fill: '#7e8ff0' },
          { t: 'rect', x: 91, y: 136.5, width: 8, height: 3, rx: 1.5, fill: '#4a50a0' }
        ]
      }
    }
  };

  return {
    CHAR_DEFS: CHAR_DEFS,
    CHAR_KEYS: Object.keys(CHAR_DEFS),
    build: build,
    mount: mount
  };
})();
