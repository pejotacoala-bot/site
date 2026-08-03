(function () {
  'use strict';
  var initialized = false;

  var LETTERS = ['A', 'B', 'C', 'D'];

  var EMO_NAME = {
    joy: 'Alegria',
    sad: 'Tristeza',
    ang: 'Raiva',
    fear: 'Medo',
    dis: 'Nojinho',
    anx: 'Ansiedade',
    enu: 'Tédio'
  };

  var QUESTIONS = [
    {
      q: 'Qual é a principal diferença entre hormônios e neurotransmissores?',
      o: [
        'Os dois atuam apenas no cérebro.',
        'Hormônios viajam pelo sangue, enquanto neurotransmissores atuam entre neurônios.',
        'Hormônios são produzidos apenas no coração.',
        'Neurotransmissores são encontrados apenas nos músculos.'
      ],
      w: [
        'Os hormônios agem por todo o corpo — é isso que os torna mensageiros de longo alcance.',
        '',
        'O coração não produz hormônios; eles nascem nas glândulas.',
        'Os neurotransmissores surgem nos neurônios, não nos músculos.'
      ],
      a: 1, e: 'joy'
    },
    {
      q: 'O sistema endócrino e o sistema nervoso trabalham juntos para:',
      o: [
        'Produzir apenas células do sangue.',
        'Controlar e coordenar as funções do corpo.',
        'Formar os ossos.',
        'Produzir apenas energia.'
      ],
      w: [
        'Células do sangue nascem na medula óssea, não nesses dois sistemas.',
        '',
        'A formação dos ossos não é a função conjunta deles.',
        'Energia é só uma parte — a coordenação do corpo é o papel dos dois.'
      ],
      a: 1, e: 'joy'
    },
    {
      q: 'Qual hormônio é conhecido por ajudar a regular o sono?',
      o: ['Dopamina', 'Ocitocina', 'Melatonina', 'Adrenalina'],
      w: [
        'A dopamina motiva e recompensa, não comanda o sono.',
        'A ocitocina fortalece vínculos e ajuda no parto.',
        '',
        'A adrenalina prepara o corpo para situações de perigo.'
      ],
      a: 2, e: 'enu'
    },
    {
      q: 'A serotonina está mais relacionada com:',
      o: [
        'Digestão apenas.',
        'Humor e sensação de bem-estar.',
        'Crescimento dos ossos.',
        'Produção de sangue.'
      ],
      w: [
        'Ela até participa da digestão, mas não é só isso.',
        '',
        'Crescimento ósseo envolve outros hormônios.',
        'A produção de sangue acontece na medula.'
      ],
      a: 1, e: 'sad'
    },
    {
      q: 'A dopamina está ligada principalmente à:',
      o: ['Motivação e recompensa.', 'Respiração.', 'Digestão.', 'Visão.'],
      w: [
        '',
        'A respiração é controlada por centros do tronco cerebral.',
        'A digestão tem mais relação com a serotonina.',
        'A visão depende da luz entrando no olho, não da dopamina.'
      ],
      a: 0, e: 'joy'
    },
    {
      q: 'A ocitocina é conhecida como o hormônio:',
      o: ['Da fome.', 'Do crescimento.', 'Dos vínculos afetivos.', 'Da digestão.'],
      w: [
        'A fome é regulada por outros mensageiros.',
        'O crescimento é função de outros hormônios.',
        '',
        'A digestão é mais ligada a outros neurotransmissores.'
      ],
      a: 2, e: 'dis'
    },
    {
      q: 'Quando os hormônios estão equilibrados, eles podem contribuir para:',
      o: [
        'Melhor humor e qualidade do sono.',
        'Apenas aumento da altura.',
        'Perda da audição.',
        'Diminuição da memória.'
      ],
      w: [
        '',
        'A altura cresce na adolescência, mas equilíbrio hormonal é bem mais amplo.',
        'A audição não tem relação direta com isso.',
        'Equilíbrio hormonal protege a memória, não a diminui.'
      ],
      a: 0, e: 'joy'
    },
    {
      q: 'O estresse prolongado pode causar:',
      o: [
        'Melhora da memória em todos os casos.',
        'Problemas de ansiedade e saúde mental.',
        'Crescimento mais rápido.',
        'Fortalecimento dos dentes.'
      ],
      w: [
        'Na verdade, o estresse prolongado prejudica a memória.',
        '',
        'Crescimento rápido não é efeito do estresse crônico.',
        'Dentes não são o foco do estresse prolongado.'
      ],
      a: 1, e: 'anx'
    },
    {
      q: 'Qual hormônio aumenta em situações de estresse?',
      o: ['Cortisol', 'Melatonina', 'Insulina', 'Ocitocina'],
      w: [
        '',
        'A melatonina aparece à noite, para o sono.',
        'A insulina controla a glicose no sangue.',
        'A ocitocina é ligada aos vínculos afetivos.'
      ],
      a: 0, e: 'anx'
    },
    {
      q: 'Os chamados “hormônios da felicidade” incluem:',
      o: [
        'Melatonina, serotonina, dopamina e ocitocina.',
        'Insulina, glucagon e adrenalina.',
        'Testosterona e estrogênio apenas.',
        'Tiroxina e calcitonina.'
      ],
      w: [
        '',
        'Insulina e glucagon controlam a glicose, não a felicidade.',
        'Testosterona e estrogênio são hormônios sexuais.',
        'Tiroxina e calcitonina vêm da tireoide.'
      ],
      a: 0, e: 'joy'
    },
    {
      q: 'Qual sistema produz os hormônios?',
      o: [
        'Sistema digestório.',
        'Sistema respiratório.',
        'Sistema endócrino.',
        'Sistema muscular.'
      ],
      w: [
        'O digestório processa os alimentos.',
        'O respiratório faz as trocas gasosas.',
        '',
        'O muscular permite o movimento.'
      ],
      a: 2, e: 'fear'
    },
    {
      q: 'Qual alternativa apresenta uma função da melatonina?',
      o: [
        'Regular o ciclo do sono.',
        'Controlar a digestão.',
        'Produzir glóbulos vermelhos.',
        'Fortalecer os ossos.'
      ],
      w: [
        '',
        'A digestão é mais ligada a outros mensageiros.',
        'Glóbulos vermelhos nascem na medula óssea.',
        'Ossos fortes dependem de cálcio e outros hormônios.'
      ],
      a: 0, e: 'enu'
    }
  ];

  function faces() {
    return {
      joy: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M40 8l4.5 9.5 10.5 1-8 7.5 2.5 10L40 30l-9.5 6 2.5-10-8-7.5 10.5-1z" fill="#10b8c4"/><circle cx="40" cy="42" r="26" fill="#ffd93b"/><circle cx="31" cy="46" r="3" fill="#16395c"/><circle cx="32.4" cy="44.4" r="1" fill="#fff"/><circle cx="49" cy="46" r="3" fill="#16395c"/><circle cx="50.4" cy="44.4" r="1" fill="#fff"/><path d="M32 56 Q40 63 48 56" stroke="#16395c" stroke-width="2.6" fill="none" stroke-linecap="round"/></svg>',
      sad: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M18 42 Q18 16 40 15 Q62 16 62 42 L62 34 Q61 21 40 20 Q19 21 18 34 Z" fill="#2f4e8f"/><circle cx="40" cy="43" rx="25" ry="25" fill="#4e8fe8"/><rect x="22" y="36" width="15" height="11" rx="4" fill="rgba(255,255,255,.16)" stroke="#1c2f63" stroke-width="2"/><rect x="43" y="36" width="15" height="11" rx="4" fill="rgba(255,255,255,.16)" stroke="#1c2f63" stroke-width="2"/><circle cx="30" cy="42" r="2" fill="#1c2f63"/><circle cx="50" cy="42" r="2" fill="#1c2f63"/><path d="M31 62 Q40 56 49 62" stroke="#1c2f63" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
      ang: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M26 32 Q28 10 40 6 Q36 16 41 12 Q42 22 46 18 Q50 30 54 30 Z" fill="#f27c2e"/><path d="M30 30 Q31 18 38 13 Q36 21 40 19 Q40 25 45 27 Q42 29 40 29 Z" fill="#ffc73b"/><rect x="24" y="22" width="32" height="34" rx="8" fill="#f4643f"/><path d="M26 40 L40 46 M54 40 L40 46" stroke="#7e1b10" stroke-width="3.4" stroke-linecap="round"/><circle cx="34" cy="45" r="2" fill="#2a0f08"/><circle cx="46" cy="45" r="2" fill="#2a0f08"/><path d="M31 54 Q40 49 49 54" stroke="#7e1b10" stroke-width="2.4" fill="none"/></svg>',
      fear: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M22 44 Q20 24 40 23 Q60 24 58 44 L58 38 Q59 28 40 28 Q21 28 22 38 Z" fill="#5e48b8"/><circle cx="40" cy="45" rx="23" ry="26" fill="#8a6ae6"/><path d="M26 38 Q34 30 41 35 M54 38 Q46 30 39 35" stroke="#c9b8f5" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="33" cy="46" rx="4.5" ry="5" fill="#fff"/><circle cx="33" cy="48" r="1.7" fill="#2a1a5e"/><ellipse cx="47" cy="46" rx="4.5" ry="5" fill="#fff"/><circle cx="47" cy="48" r="1.7" fill="#2a1a5e"/><ellipse cx="40" cy="61" rx="2.6" ry="3" fill="#2a1a5e"/></svg>',
      dis: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M22 40 Q20 14 40 13 Q60 14 58 40 L56 34 Q58 19 40 18 Q22 19 24 34 Z" fill="#7b4e9b"/><circle cx="40" cy="42" rx="25" ry="24" fill="#87c76c"/><path d="M26 36 Q32 33 38 36" stroke="#3f6b2f" stroke-width="2.2" fill="none"/><path d="M50 30 Q57 26 62 30" stroke="#3f6b2f" stroke-width="2.2" fill="none"/><circle cx="33" cy="43" r="2.6" fill="#1f3d1a"/><circle cx="47" cy="43" r="2.6" fill="#1f3d1a"/><path d="M33 56 Q40 61 48 54" stroke="#1f3d1a" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',
      anx: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M22 40 Q20 20 32 14 Q26 6 40 8 Q34 0 48 8 Q44 -2 58 10 Q64 18 60 32 Q64 38 60 44 L54 38 Q56 28 48 20 Q40 12 32 20 Q24 28 26 40 Z" fill="#d06e2c"/><circle cx="40" cy="43" rx="24" ry="25" fill="#f49b4f"/><path d="M26 38 Q33 31 39 37 M54 38 Q47 31 41 37" stroke="#8a3e12" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="33" cy="45" rx="4.5" ry="5.5" fill="#fff"/><circle cx="33" cy="46" r="1.8" fill="#5e2a08"/><ellipse cx="47" cy="45" rx="4.5" ry="5.5" fill="#fff"/><circle cx="47" cy="46" r="1.8" fill="#5e2a08"/><path d="M33 60 Q37 57 40 60 Q43 63 47 60" stroke="#5e2a08" stroke-width="2.2" fill="none"/><path d="M60 30 Q63 37 61 41 Q59 37 60 30 Z" fill="#bfe8ff"/></svg>',
      enu: '<svg class="face-mini" viewBox="0 0 80 80"><path d="M20 42 Q18 14 40 13 Q62 14 60 42 L60 36 Q61 19 40 18 Q19 19 20 36 Z" fill="#8a7fc0"/><circle cx="40" cy="44" rx="24" ry="24" fill="#b7aee8"/><path d="M27 44 Q32 41 37 44" stroke="#4a3f8f" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="51" cy="43" r="2.4" fill="#4a3f8f"/><path d="M31 58 Q40 60 49 58" stroke="#4a3f8f" stroke-width="2.2" fill="none" stroke-linecap="round"/></svg>'
    };
  }

  var els = {
    intro: document.getElementById('quizIntro'),
    app: document.getElementById('quizApp'),
    end: document.getElementById('quizEnd'),
    card: document.getElementById('quizCard'),
    dots: document.getElementById('quizDots'),
    counter: document.getElementById('quizCounter'),
    emo: document.getElementById('quizEmo'),
    typing: document.getElementById('quizTyping'),
    paused: document.getElementById('quizPaused'),
    question: document.getElementById('quizQuestion'),
    controls: document.getElementById('quizControls'),
    pauseBtn: document.getElementById('pauseBtn'),
    pauseLabel: document.getElementById('pauseBtnLabel'),
    revealBtn: document.getElementById('revealBtn'),
    options: document.getElementById('quizOptions'),
    nextBtn: document.getElementById('nextBtn'),
    stageChar: document.querySelector('.stage-char'),
    endScore: document.getElementById('endScore'),
    endFace: document.getElementById('endFace'),
    endTitle: document.getElementById('endTitle'),
    endMsg: document.getElementById('endMsg'),
    endOrbs: document.getElementById('endOrbs'),
    startQuizBtn: document.getElementById('startQuizBtn'),
    muteBtn: document.getElementById('muteBtn'),
    quitQuizBtn: document.getElementById('quitQuizBtn'),
    restartBtn: document.getElementById('restartBtn'),
    soundOn: document.getElementById('soundOn'),
    soundOff: document.getElementById('soundOff')
  };

  var state = { idx: 0, score: 0, locked: false, typing: false, paused: false, muted: false, active: false, curEmo: '' };
  var tTimer = null;
  var tPhase = 'q';
  var tPos = 0;
  var oPos = 0;
  var oChar = 0;
  var history = [];
  var lastWrong = -1;
  var animTimer = null;
  var AC = null;

  var CHAR_KEYS = ['joy', 'sad', 'ang', 'fear', 'dis', 'anx', 'enu'];
  var CHAR_CACHE = {};

  CHAR_KEYS.forEach(function (k) {
    var src = document.getElementById('ch-' + k);
    if (!src) return;
    var clone = src.cloneNode(true);
    var defs = clone.querySelector('defs');
    if (defs) {
      defs.querySelectorAll('linearGradient, radialGradient').forEach(function (g) {
        var oldId = g.id;
        if (!oldId) return;
        var newId = oldId + '-st';
        g.id = newId;
        clone.querySelectorAll('[fill="url(#' + oldId + ')"]').forEach(function (el) {
          el.setAttribute('fill', 'url(#' + newId + ')');
        });
      });
    }
    CHAR_CACHE[k] = clone.innerHTML;
  });

  function freshHistory() {
    return QUESTIONS.map(function () { return { attempts: 0, solved: false }; });
  }

  function sound(kind) {
    if (state.muted) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var t = AC.currentTime;
      var notes;
      var type;
      if (kind === 'correct') { notes = [523.25, 659.25, 783.99]; type = 'triangle'; }
      else if (kind === 'wrong') { notes = [196, 155.56]; type = 'square'; }
      else if (kind === 'ugh') { notes = [220, 155.56, 116.54]; type = 'sawtooth'; }
      else { notes = [659.25]; type = 'sine'; }
      notes.forEach(function (f, i) {
        var o = AC.createOscillator();
        var g = AC.createGain();
        o.type = type;
        o.frequency.value = f;
        o.connect(g);
        g.connect(AC.destination);
        var vol = kind === 'wrong' ? 0.07 : kind === 'ugh' ? 0.06 : 0.14;
        g.gain.setValueAtTime(0.0001, t + i * 0.13);
        g.gain.exponentialRampToValueAtTime(vol, t + i * 0.13 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (i + 1) * 0.13 + 0.05);
        o.start(t + i * 0.13);
        o.stop(t + (i + 1) * 0.13 + 0.1);
      });
    } catch (e) {}
  }

  var EMO_SOUNDS = {
    joy: { wave: 'triangle', good: [523.25, 659.25, 783.99, 1046.5], bad: [392, 349.23, 261.63, 196] },
    sad: { wave: 'sine', good: [392, 392, 493.88, 392], bad: [220, 174.61, 146.83, 116.54] },
    ang: { wave: 'sawtooth', good: [220, 277.18, 329.63, 440], bad: [110, 98, 87.31, 98] },
    fear: { wave: 'sine', good: [261.63, 329.63, 392, 523.25], bad: [349.23, 311.13, 233.08, 174.61] },
    dis: { wave: 'triangle', good: [220, 220, 261.63], bad: [110, 110.22, 110] },
    anx: { wave: 'square', good: [587.33, 587.33, 880, 880], bad: [392, 415.3, 392, 415.3] },
    enu: { wave: 'sine', good: [293.66, 293.66, 164.81], bad: [164.81, 146.83, 130.81] }
  };
  function pulse(notes, wave, vol, step) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var t = AC.currentTime;
      notes.forEach(function (f, i) {
        var o = AC.createOscillator();
        var g = AC.createGain();
        o.type = wave;
        o.frequency.value = f;
        o.connect(g);
        g.connect(AC.destination);
        g.gain.setValueAtTime(0.0001, t + i * step);
        g.gain.exponentialRampToValueAtTime(vol, t + i * step + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + (i + 1) * step + 0.06);
        o.start(t + i * step);
        o.stop(t + (i + 1) * step + 0.1);
      });
    } catch (e) {}
  }
  /* som com personalidade: cada emoção toca e "reage" do seu jeito */
  function emoSound(e, good) {
    if (state.muted) return;
    var c = EMO_SOUNDS[e] || EMO_SOUNDS.joy;
    var notes = good ? c.good : c.bad;
    var step = (e === 'anx' && !good) ? 0.09 : 0.12;
    var vol = good ? 0.11 : 0.06;
    pulse(notes, c.wave, vol, step);
  }

  function renderDots() {
    els.dots.innerHTML = '';
    QUESTIONS.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Pergunta ' + (i + 1));
      b.title = 'Ir para a pergunta ' + (i + 1);
      var h = history[i];
      if (h && h.solved) b.className = 'done';
      if (i === state.idx) b.className = (b.className ? b.className + ' ' : '') + 'current';
      b.addEventListener('click', function () {
        b.blur();
        jumpTo(i);
      });
      els.dots.appendChild(b);
    });
  }

  function setEmoChip(e) {
    els.emo.textContent = 'Pergunta da ' + EMO_NAME[e] + ' — ' + (state.idx + 1) + ' de ' + QUESTIONS.length;
  }

  function setStageEmotion(e) {
    var html = CHAR_CACHE[e];
    if (!html) return;
    els.stageChar.innerHTML = html;
    els.stageChar.setAttribute('class', 'char stage-char char-' + e + ' c-' + e);
    state.curEmo = e;
    clearAnim();
    stageIdle();
  }

/* ---------------- ANIMAÇÕES DO PALCO (GSAP, estilo Duolingo) ----------------
     Corpo inteiro: antecipação + squash & stretch + follow-through + overshoot.
     Pivôs reais do rig via svgOrigin (data-p nos grupos SVG). */

  var idleToken = 0;
  var REDUCED = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function stageParts() {
    var sc = els.stageChar;
    return {
      ch: sc,
      body: sc.querySelector('.c-body'),
      head: sc.querySelector('.c-head'),
      hair: sc.querySelector('.c-hair'),
      brows: sc.querySelector('.c-brows'),
      mouth: sc.querySelector('.c-mouth'),
      armL: sc.querySelector('.c-arm-l'),
      armR: sc.querySelector('.c-arm-r'),
      shadow: sc.querySelector('.c-shadow'),
      eyes: Array.prototype.slice.call(sc.querySelectorAll('.c-eye')),
      pupils: Array.prototype.slice.call(sc.querySelectorAll('.c-pupils'))
    };
  }

  function pivot(el, fb) {
    return el && el.getAttribute ? (el.getAttribute('data-p') || fb) : fb;
  }

  /* ---------- primitivas ---------- */
  function sq(tl, p, sx, sy, t, e, at) { tl.to(p.body, { scaleX: sx, scaleY: sy, duration: t, ease: e, svgOrigin: pivot(p.body, '70 188') }, at); }
  function bj(tl, p, y, t, e, at) { tl.to(p.body, { y: y, duration: t, ease: e, svgOrigin: pivot(p.body, '70 188') }, at); }
  function sw(tl, p, deg, t, e, at) { tl.to(p.body, { rotation: deg, duration: t, ease: e, svgOrigin: pivot(p.body, '70 188') }, at); }
  function hd(tl, p, deg, t, e, at) { tl.to(p.head, { rotation: deg, duration: t, ease: e, svgOrigin: pivot(p.head, '70 84') }, at); }
  function ar(tl, p, side, deg, t, e, at) { tl.to(side === 'L' ? p.armL : p.armR, { rotation: deg, duration: t, ease: e, svgOrigin: pivot(side === 'L' ? p.armL : p.armR, side === 'L' ? '46 90' : '94 90') }, at); }
  function ey(tl, p, sy, t, e, at) { p.eyes.forEach(function (el) { tl.to(el, { scaleY: sy, duration: t, ease: e, svgOrigin: pivot(el, '63 57') }, at); }); }
  function bw(tl, p, y, t, e, at) { tl.to(p.brows, { y: y, duration: t, ease: e }, at); }
  function mo(tl, p, sy, t, e, at) { tl.to(p.mouth, { scaleY: sy, duration: t, ease: e, svgOrigin: pivot(p.mouth, '70 72') }, at); }
  function hr(tl, p, deg, t, at) { tl.to(p.hair, { rotation: deg, duration: t, ease: 'power1.out', svgOrigin: pivot(p.hair, '70 84') }, at); }
  function sh(tl, p, sx, t, at) { tl.to(p.shadow, { scaleX: sx, duration: t, ease: 'power1.out', svgOrigin: '70 187' }, at); }
  function px(tl, p, x, t, e, at) { tl.to(p.body, { x: x, duration: t, ease: e, svgOrigin: pivot(p.body, '70 188') }, at); }

  function blink(tl, p, at) {
    ey(tl, p, 0.14, 0.09, 'power1.in', at);
    ey(tl, p, 1, 0.22, 'power2.out', at + 0.09);
  }
  function blink2(tl, p, at) { blink(tl, p, at); blink(tl, p, at + 0.42); }
  function eyesHappy(tl, p, at) { ey(tl, p, 0.42, 0.08, 'power1.in', at); ey(tl, p, 1, 0.24, 'power2.out', at + 0.09); }

  /* salto com antecipação, squash no ar, impacto e assentamento elástico */
  function hop(tl, p, h, at, t0) {
    var up = 0.11, air = 0.3, land = 0.13, rest = 0.42;
    sq(tl, p, 1.16, 0.84, up, 'power2.in', t0);
    bj(tl, p, -h, air, 'power2.out', t0 + up);
    sh(tl, p, 0.72, up + air, t0 + up * 0.6);
    sq(tl, p, 1.2, 0.78, land, 'power2.in', t0 + up + air);
    bj(tl, p, 0, rest, 'elastic.out(1, 0.45)', t0 + up + air);
    sq(tl, p, 1, 1, rest, 'power2.out', t0 + up + air);
    sh(tl, p, 1.28, land, t0 + up + air);
    sh(tl, p, 1, rest * 0.6, t0 + up + air + land);
  }

  function armsUp(tl, p, at) {
    ar(tl, p, 'L', -96, 0.34, 'back.out(1.7)', at);
    ar(tl, p, 'R', 96, 0.34, 'back.out(1.7)', at + 0.05);
    ar(tl, p, 'L', -70, 0.45, 'power1.out', at + 0.6);
    ar(tl, p, 'R', 70, 0.45, 'power1.out', at + 0.64);
  }
  function armsHug(tl, p, at) {
    ar(tl, p, 'L', -58, 0.5, 'back.out(1.6)', at);
    ar(tl, p, 'R', 58, 0.5, 'back.out(1.6)', at + 0.06);
  }
  function armsClap(tl, p, at, n) {
    for (var i = 0; i < n; i++) {
      ar(tl, p, 'L', -44, 0.16, 'back.out(1.8)', at + i * 0.34);
      ar(tl, p, 'R', 44, 0.16, 'back.out(1.8)', at + i * 0.34 + 0.03);
      ar(tl, p, 'L', -6, 0.14, 'power1.out', at + i * 0.34 + 0.17);
      ar(tl, p, 'R', 6, 0.14, 'power1.out', at + i * 0.34 + 0.2);
    }
  }
  function headNo(tl, p, amp, at) {
    hd(tl, p, amp, 0.09, 'power1.inOut', at);
    hd(tl, p, -amp, 0.09, 'power1.inOut', at + 0.09);
    hd(tl, p, amp * 0.8, 0.09, 'power1.inOut', at + 0.18);
    hd(tl, p, -amp * 0.6, 0.09, 'power1.inOut', at + 0.27);
    hd(tl, p, amp * 0.4, 0.09, 'power1.inOut', at + 0.36);
    hd(tl, p, 0, 0.2, 'power1.out', at + 0.45);
  }

  /* ---------- ALEGRIA ---------- */
  function cheerJump(p) {
    var t = gsap.timeline();
    hop(t, p, 46, 0, 0);
    armsUp(t, p, 0.16);
    hr(t, p, -9, 0.4, 0.22);
    hr(t, p, 0, 0.45, 0.75);
    hd(t, p, 7, 0.35, 'sine.out', 0.3);
    hd(t, p, -4, 0.35, 'sine.inOut', 0.68);
    hd(t, p, 0, 0.4, 'sine.inOut', 1.05);
    eyesHappy(t, p, 0.3);
    eyesHappy(t, p, 0.75);
    bw(t, p, 1.6, 0.3, 'power1.out', 0.3);
    bw(t, p, 0, 0.3, 'power1.out', 0.9);
    return t;
  }
  function cheerSpin(p) {
    var t = gsap.timeline();
    sq(t, p, 1.14, 0.86, 0.1, 'power2.in', 0);
    bj(t, p, -28, 0.32, 'power2.out', 0.1);
    sw(t, p, -7, 0.28, 'power2.in', 0.12);
    sw(t, p, 6, 0.28, 'power2.in', 0.42);
    sw(t, p, 0, 0.5, 'elastic.out(1, 0.6)', 0.72);
    sq(t, p, 1.18, 0.8, 0.12, 'power2.in', 0.42);
    bj(t, p, 0, 0.42, 'elastic.out(1, 0.5)', 0.42);
    sq(t, p, 1, 1, 0.4, 'power2.out', 0.84);
    sh(t, p, 0.75, 0.2, 0.15);
    sh(t, p, 1.3, 0.12, 0.44);
    sh(t, p, 1, 0.5, 0.6);
    armsUp(t, p, 0.18);
    hr(t, p, -10, 0.35, 0.24);
    hr(t, p, 0, 0.5, 0.8);
    hd(t, p, 8, 0.3, 'sine.out', 0.28);
    hd(t, p, 0, 0.5, 'sine.inOut', 0.7);
    blink(t, p, 0.5);
    return t;
  }

  /* ---------- TRISTEZA ---------- */
  function sadHopV(p) {
    var t = gsap.timeline();
    hop(t, p, 20, 0, 0);
    armsHug(t, p, 0.14);
    hr(t, p, -5, 0.4, 0.2);
    hr(t, p, 0, 0.5, 0.8);
    hd(t, p, 9, 0.4, 'sine.out', 0.25);
    hd(t, p, -5, 0.45, 'sine.inOut', 0.7);
    hd(t, p, 0, 0.45, 'sine.inOut', 1.15);
    bw(t, p, 1.4, 0.35, 'power1.out', 0.3);
    bw(t, p, 0, 0.35, 'power1.out', 0.9);
    blink(t, p, 0.45);
    return t;
  }
  function sadClapV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.1, 0.9, 0.09, 'power2.in', 0);
    bj(t, p, -14, 0.24, 'power2.out', 0.09);
    bj(t, p, 0, 0.3, 'elastic.out(1, 0.5)', 0.33);
    sq(t, p, 1, 1, 0.3, 'power2.out', 0.33);
    armsClap(t, p, 0.16, 2);
    hd(t, p, 6, 0.4, 'sine.inOut', 0.2);
    hd(t, p, -4, 0.4, 'sine.inOut', 0.6);
    hd(t, p, 0, 0.4, 'sine.inOut', 1);
    hr(t, p, 4, 0.35, 0.25);
    hr(t, p, 0, 0.45, 0.8);
    blink(t, p, 0.5);
    return t;
  }

  /* ---------- RAIVA ---------- */
  function fistPumpV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.14, 0.86, 0.1, 'power2.in', 0);
    bj(t, p, -6, 0.18, 'power2.out', 0.1);
    bj(t, p, 0, 0.2, 'power3.in', 0.28);
    sq(t, p, 1, 1, 0.25, 'power2.out', 0.28);
    ar(t, p, 'R', -14, 0.1, 'power1.out', 0.08);
    ar(t, p, 'R', 96, 0.18, 'power2.out', 0.18);
    ar(t, p, 'R', 72, 0.28, 'back.out(1.6)', 0.36);
    ar(t, p, 'R', -14, 0.09, 'power1.in', 0.66);
    ar(t, p, 'R', 92, 0.17, 'power2.out', 0.75);
    ar(t, p, 'R', 74, 0.3, 'back.out(1.6)', 0.92);
    bw(t, p, 2.4, 0.22, 'power1.out', 0.12);
    bw(t, p, 0, 0.3, 'power1.out', 1.1);
    hd(t, p, -6, 0.25, 'power1.out', 0.15);
    hd(t, p, 0, 0.3, 'power1.out', 0.55);
    hr(t, p, 8, 0.3, 0.2);
    hr(t, p, 0, 0.4, 0.85);
    return t;
  }
  function stompCelebrate(p) {
    var t = gsap.timeline();
    sq(t, p, 1.18, 0.82, 0.1, 'power2.in', 0);
    bj(t, p, 8, 0.14, 'power2.in', 0.1);
    bj(t, p, -4, 0.18, 'power2.out', 0.24);
    sq(t, p, 1, 1, 0.3, 'power2.out', 0.24);
    sw(t, p, 3, 0.16, 'power1.inOut', 0.1);
    sw(t, p, -3, 0.16, 'power1.inOut', 0.26);
    sw(t, p, 2, 0.16, 'power1.inOut', 0.42);
    sw(t, p, 0, 0.3, 'power1.out', 0.58);
    ar(t, p, 'R', 92, 0.35, 'back.out(1.7)', 0.2);
    ar(t, p, 'R', 70, 0.4, 'power1.out', 0.75);
    ar(t, p, 'L', -52, 0.35, 'back.out(1.6)', 0.25);
    ar(t, p, 'L', -38, 0.4, 'power1.out', 0.8);
    hd(t, p, -7, 0.3, 'power1.out', 0.2);
    hd(t, p, 0, 0.35, 'power1.out', 0.65);
    hr(t, p, 7, 0.3, 0.22);
    hr(t, p, 0, 0.4, 0.8);
    return t;
  }

  /* ---------- MEDO ---------- */
  function reliefV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.06, 0.94, 0.12, 'power1.in', 0);
    bj(t, p, 6, 0.3, 'power2.in', 0.12);
    bj(t, p, 0, 0.5, 'elastic.out(1, 0.5)', 0.42);
    sq(t, p, 1, 1, 0.45, 'power2.out', 0.42);
    armsHug(t, p, 0.1);
    ar(t, p, 'L', -42, 0.5, 'power1.out', 0.6);
    ar(t, p, 'R', 42, 0.5, 'power1.out', 0.66);
    hd(t, p, -7, 0.45, 'sine.out', 0.15);
    hd(t, p, 3, 0.4, 'sine.inOut', 0.6);
    hd(t, p, 0, 0.4, 'sine.inOut', 1);
    hr(t, p, -4, 0.35, 0.2);
    hr(t, p, 0, 0.5, 0.8);
    blink(t, p, 0.3);
    blink(t, p, 0.75);
    return t;
  }
  function cautiousClapV(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 4; i++) {
      px(t, p, (i % 2 ? 2 : -2), 0.07, 'power1.inOut', i * 0.12);
    }
    px(t, p, 0, 0.1, 'power1.out', 0.5);
    armsClap(t, p, 0.2, 2);
    hd(t, p, 5, 0.4, 'sine.inOut', 0.15);
    hd(t, p, -4, 0.4, 'sine.inOut', 0.55);
    hd(t, p, 0, 0.4, 'sine.inOut', 0.95);
    blink(t, p, 0.4);
    return t;
  }

  /* ---------- NOJINHO ---------- */
  function disApproveV(p) {
    var t = gsap.timeline();
    hd(t, p, -8, 0.5, 'power2.out', 0);
    hd(t, p, -2, 0.6, 'power1.inOut', 0.75);
    hd(t, p, 0, 0.6, 'power1.inOut', 1.45);
    bw(t, p, 1.8, 0.5, 'power1.out', 0.2);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.3);
    ey(t, p, 0.55, 0.5, 'power2.in', 0.6);
    ey(t, p, 1, 0.6, 'power2.out', 1.15);
    return t;
  }
  function disSmirkV(p) {
    var t = gsap.timeline();
    hd(t, p, 6, 0.5, 'sine.inOut', 0);
    hd(t, p, -3, 0.5, 'sine.inOut', 0.55);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.15);
    sw(t, p, -3, 0.5, 'sine.inOut', 0.05);
    sw(t, p, 0, 0.5, 'sine.inOut', 1.2);
    bw(t, p, -2, 0.5, 'power1.out', 0.15);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.1);
    ey(t, p, 0.45, 0.45, 'power1.in', 0.5);
    ey(t, p, 1, 0.5, 'power2.out', 0.95);
    return t;
  }
  function disBlehV(p) {
    var t = gsap.timeline();
    hd(t, p, -10, 0.5, 'power2.out', 0);
    hd(t, p, -3, 0.5, 'power1.inOut', 0.7);
    hd(t, p, 0, 0.6, 'power1.inOut', 1.3);
    sw(t, p, -3, 0.5, 'sine.inOut', 0.1);
    sw(t, p, 0, 0.6, 'sine.inOut', 1.2);
    bw(t, p, 2.2, 0.5, 'power1.out', 0.15);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.25);
    ey(t, p, 0.25, 0.45, 'power1.in', 0.4);
    ey(t, p, 1, 0.5, 'power2.out', 0.95);
    return t;
  }
  function disGrimaceV(p) {
    var t = gsap.timeline();
    bw(t, p, 2.6, 0.5, 'power1.out', 0);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.35);
    ey(t, p, 0.3, 0.45, 'power1.in', 0.3);
    ey(t, p, 1, 0.5, 'power2.out', 1.05);
    hd(t, p, -5, 0.35, 'sine.inOut', 0.2);
    hd(t, p, 4, 0.35, 'sine.inOut', 0.65);
    hd(t, p, 0, 0.4, 'sine.inOut', 1.05);
    return t;
  }
  function disMaxV(p) {
    var t = gsap.timeline();
    hd(t, p, -10, 0.55, 'power2.out', 0);
    hd(t, p, -3, 0.55, 'power1.inOut', 0.8);
    hd(t, p, 0, 0.6, 'power1.inOut', 1.5);
    sw(t, p, 3, 0.55, 'sine.inOut', 0.1);
    sw(t, p, 0, 0.6, 'sine.inOut', 1.4);
    bw(t, p, 2.6, 0.5, 'power1.out', 0.2);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.35);
    ey(t, p, 0.5, 0.55, 'power2.in', 0.5);
    ey(t, p, 1, 0.65, 'power2.out', 1.1);
    return t;
  }

  /* ---------- ANSIEDADE ---------- */
  function jitterJumpV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.14, 0.86, 0.09, 'power2.in', 0);
    bj(t, p, -24, 0.26, 'power2.out', 0.09);
    for (var i = 0; i < 5; i++) {
      px(t, p, (i % 2 ? 2 : -2), 0.06, 'power1.inOut', 0.36 + i * 0.12);
    }
    bj(t, p, 0, 0.4, 'elastic.out(1, 0.5)', 0.36);
    sq(t, p, 1, 1, 0.4, 'power2.out', 0.36);
    ar(t, p, 'L', -56, 0.3, 'back.out(1.6)', 0.14);
    ar(t, p, 'R', 56, 0.3, 'back.out(1.6)', 0.18);
    ar(t, p, 'L', -26, 0.3, 'power1.out', 0.7);
    ar(t, p, 'R', 26, 0.3, 'power1.out', 0.74);
    hd(t, p, -5, 0.25, 'sine.inOut', 0.15);
    hd(t, p, 5, 0.25, 'sine.inOut', 0.4);
    hd(t, p, 0, 0.3, 'sine.inOut', 0.65);
    blink(t, p, 0.25);
    blink(t, p, 0.6);
    hr(t, p, -6, 0.3, 0.2);
    hr(t, p, 0, 0.4, 0.8);
    return t;
  }
  function quickBounceV(p) {
    var t = gsap.timeline();
    hop(t, p, 16, 0, 0);
    hop(t, p, 12, 0, 0.8);
    armsUp(t, p, 0.18);
    armsClap(t, p, 0.9, 1);
    hd(t, p, 6, 0.3, 'sine.inOut', 0.2);
    hd(t, p, -5, 0.3, 'sine.inOut', 0.55);
    hd(t, p, 0, 0.35, 'sine.inOut', 0.9);
    blink2(t, p, 0.4);
    return t;
  }

  /* ---------- TÉDIO ---------- */
  function slowClapV(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 2; i++) {
      ar(t, p, 'L', -34, 0.42, 'sine.inOut', i * 0.9 + 0.05);
      ar(t, p, 'R', 34, 0.42, 'sine.inOut', i * 0.9 + 0.09);
      ar(t, p, 'L', -8, 0.38, 'sine.inOut', i * 0.9 + 0.5);
      ar(t, p, 'R', 8, 0.38, 'sine.inOut', i * 0.9 + 0.54);
    }
    hd(t, p, -7, 0.55, 'sine.inOut', 0.1);
    hd(t, p, 4, 0.5, 'sine.inOut', 0.7);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.3);
    blink(t, p, 0.35);
    blink(t, p, 0.95);
    return t;
  }
  function nodSighV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.05, 0.95, 0.4, 'sine.inOut', 0);
    sq(t, p, 1, 1, 0.5, 'sine.inOut', 0.5);
    hd(t, p, 5, 0.45, 'sine.inOut', 0.1);
    hd(t, p, 0, 0.55, 'sine.inOut', 0.7);
    ar(t, p, 'L', -14, 0.5, 'sine.inOut', 0.15);
    ar(t, p, 'R', 14, 0.5, 'sine.inOut', 0.2);
    ar(t, p, 'L', -6, 0.5, 'sine.inOut', 0.8);
    ar(t, p, 'R', 6, 0.5, 'sine.inOut', 0.85);
    blink(t, p, 0.4);
    return t;
  }

  /* ---------- ERROS ---------- */
  function denyJoy(p) {
    var t = gsap.timeline();
    headNo(t, p, 20, 0);
    sw(t, p, -2, 0.12, 'power1.inOut', 0.02);
    sw(t, p, 2, 0.12, 'power1.inOut', 0.14);
    sw(t, p, -2, 0.12, 'power1.inOut', 0.26);
    sw(t, p, 0, 0.2, 'power1.out', 0.4);
    ar(t, p, 'L', -20, 0.25, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 20, 0.25, 'back.out(1.5)', 0.14);
    ar(t, p, 'L', -8, 0.3, 'power1.out', 0.55);
    ar(t, p, 'R', 8, 0.3, 'power1.out', 0.6);
    bw(t, p, 1.8, 0.25, 'power1.out', 0.1);
    bw(t, p, 0, 0.3, 'power1.out', 0.8);
    hr(t, p, -8, 0.35, 0.15);
    hr(t, p, 0, 0.4, 0.7);
    return t;
  }
  function denySad(p) {
    var t = gsap.timeline();
    headNo(t, p, 12, 0);
    hd(t, p, -8, 0.5, 'sine.inOut', 0.5);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.1);
    ar(t, p, 'L', -30, 0.4, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 30, 0.4, 'back.out(1.5)', 0.15);
    bw(t, p, 1.5, 0.3, 'power1.out', 0.1);
    bw(t, p, 0, 0.3, 'power1.out', 0.9);
    hr(t, p, 4, 0.35, 0.2);
    hr(t, p, 0, 0.45, 0.85);
    blink(t, p, 0.6);
    return t;
  }
  function fistShakeV(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 5; i++) {
      ar(t, p, 'L', -38, 0.09, 'power1.inOut', i * 0.18);
      ar(t, p, 'R', 38, 0.09, 'power1.inOut', i * 0.18 + 0.03);
      ar(t, p, 'L', -20, 0.09, 'power1.inOut', i * 0.18 + 0.09);
      ar(t, p, 'R', 20, 0.09, 'power1.inOut', i * 0.18 + 0.12);
    }
    ar(t, p, 'L', -14, 0.3, 'power1.out', 0.95);
    ar(t, p, 'R', 14, 0.3, 'power1.out', 1);
    hd(t, p, -7, 0.1, 'power1.inOut', 0.05);
    hd(t, p, 7, 0.1, 'power1.inOut', 0.2);
    hd(t, p, -5, 0.1, 'power1.inOut', 0.35);
    hd(t, p, 0, 0.25, 'power1.out', 0.5);
    sw(t, p, 2, 0.1, 'power1.inOut', 0.05);
    sw(t, p, -2, 0.1, 'power1.inOut', 0.2);
    sw(t, p, 0, 0.25, 'power1.out', 0.4);
    bw(t, p, 2.2, 0.25, 'power1.out', 0.1);
    bw(t, p, 0, 0.3, 'power1.out', 1);
    hr(t, p, 6, 0.3, 0.15);
    hr(t, p, 0, 0.4, 0.8);
    return t;
  }
  function denyTremble(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 6; i++) {
      px(t, p, (i % 2 ? 2 : -2), 0.07, 'power1.inOut', i * 0.13);
    }
    px(t, p, 0, 0.15, 'power1.out', 0.8);
    headNo(t, p, 10, 0.05);
    armsHug(t, p, 0.1);
    ar(t, p, 'L', -36, 0.4, 'power1.out', 0.7);
    ar(t, p, 'R', 36, 0.4, 'power1.out', 0.76);
    bw(t, p, 1.8, 0.25, 'power1.out', 0.1);
    bw(t, p, 0, 0.3, 'power1.out', 0.9);
    hr(t, p, -5, 0.3, 0.15);
    hr(t, p, 0, 0.4, 0.8);
    return t;
  }
  function disNopeV(p) {
    var t = gsap.timeline();
    hd(t, p, 12, 0.32, 'sine.inOut', 0);
    hd(t, p, -10, 0.32, 'sine.inOut', 0.38);
    hd(t, p, 6, 0.32, 'sine.inOut', 0.76);
    hd(t, p, -4, 0.32, 'sine.inOut', 1.14);
    hd(t, p, 0, 0.4, 'sine.inOut', 1.5);
    sw(t, p, -2, 0.5, 'sine.inOut', 0.1);
    sw(t, p, 0, 0.6, 'sine.inOut', 1.4);
    bw(t, p, 2.2, 0.5, 'power1.out', 0.15);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.3);
    ey(t, p, 0.4, 0.45, 'power1.in', 0.5);
    ey(t, p, 1, 0.5, 'power2.out', 1);
    return t;
  }
  function nervousShake(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 8; i++) {
      px(t, p, (i % 2 ? 2.5 : -2.5), 0.07, 'power1.inOut', i * 0.12);
    }
    px(t, p, 0, 0.15, 'power1.out', 1);
    headNo(t, p, 7, 0.05);
    ar(t, p, 'L', -40, 0.3, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 40, 0.3, 'back.out(1.5)', 0.14);
    ar(t, p, 'L', -20, 0.35, 'power1.out', 0.8);
    ar(t, p, 'R', 20, 0.35, 'power1.out', 0.85);
    bw(t, p, 2, 0.25, 'power1.out', 0.1);
    bw(t, p, 0, 0.3, 'power1.out', 1);
    hr(t, p, -7, 0.3, 0.15);
    hr(t, p, 0, 0.4, 0.85);
    blink2(t, p, 0.3);
    return t;
  }
  function slowTilt(p) {
    var t = gsap.timeline();
    hd(t, p, -9, 0.55, 'sine.inOut', 0);
    hd(t, p, 5, 0.5, 'sine.inOut', 0.65);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.2);
    sw(t, p, 2, 0.55, 'sine.inOut', 0.05);
    sw(t, p, -1, 0.5, 'sine.inOut', 0.7);
    sw(t, p, 0, 0.5, 'sine.inOut', 1.25);
    bw(t, p, 1.2, 0.4, 'power1.out', 0.1);
    bw(t, p, 0, 0.4, 'power1.out', 1);
    blink(t, p, 0.4);
    return t;
  }

  function slumpCore(t, p, deep, at) {
    var d = deep ? 18 : 12;
    sq(t, p, 1.06, 0.94, 0.1, 'power1.in', at);
    bj(t, p, d, 0.4, 'power2.in', at + 0.1);
    sq(t, p, 0.94, 1.04, 0.35, 'power2.in', at + 0.14);
    sw(t, p, deep ? 5 : 3, 0.4, 'power2.out', at + 0.12);
    hd(t, p, -(deep ? 18 : 13), 0.45, 'power2.out', at + 0.2);
    hr(t, p, (deep ? 10 : 7), 0.4, at + 0.3);
    sh(t, p, 1.22, 0.35, at + 0.3);
  }
  function slumpJoy(p) {
    var t = gsap.timeline();
    slumpCore(t, p, false, 0);
    ar(t, p, 'L', -22, 0.5, 'power1.out', 0.4);
    ar(t, p, 'R', 22, 0.5, 'power1.out', 0.45);
    hd(t, p, -6, 0.4, 'power1.out', 0.75);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.2);
    bw(t, p, 1.6, 0.3, 'power1.out', 0.25);
    bw(t, p, 0, 0.35, 'power1.out', 1.2);
    blink(t, p, 0.5);
    return t;
  }
  function slumpDeep(p) {
    var t = gsap.timeline();
    slumpCore(t, p, true, 0);
    ar(t, p, 'L', -34, 0.5, 'back.out(1.4)', 0.4);
    ar(t, p, 'R', 34, 0.5, 'back.out(1.4)', 0.46);
    ar(t, p, 'L', -24, 0.4, 'power1.out', 0.95);
    ar(t, p, 'R', 24, 0.4, 'power1.out', 1);
    bw(t, p, 2, 0.3, 'power1.out', 0.25);
    bw(t, p, 0, 0.4, 'power1.out', 1.3);
    blink(t, p, 0.55);
    return t;
  }
  function stompAngry(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 2; i++) {
      sq(t, p, 1.2, 0.8, 0.1, 'power2.in', i * 0.55);
      bj(t, p, 10, 0.14, 'power2.in', i * 0.55 + 0.1);
      bj(t, p, 0, 0.24, 'power2.out', i * 0.55 + 0.24);
      sq(t, p, 1, 1, 0.3, 'power2.out', i * 0.55 + 0.24);
      sw(t, p, 4, 0.12, 'power1.inOut', i * 0.55 + 0.05);
      sw(t, p, -4, 0.12, 'power1.inOut', i * 0.55 + 0.17);
    }
    ar(t, p, 'L', -30, 0.16, 'power1.inOut', 0);
    ar(t, p, 'R', 30, 0.16, 'power1.inOut', 0.03);
    ar(t, p, 'L', -18, 0.3, 'power1.out', 1.2);
    ar(t, p, 'R', 18, 0.3, 'power1.out', 1.25);
    hd(t, p, -10, 0.2, 'power2.out', 0.15);
    hd(t, p, -4, 0.4, 'power1.out', 0.45);
    bw(t, p, 2.6, 0.25, 'power1.out', 0.1);
    bw(t, p, 0, 0.4, 'power1.out', 1.3);
    hr(t, p, 9, 0.3, 0.2);
    hr(t, p, 0, 0.5, 0.9);
    return t;
  }
  function sinkShrink(p) {
    var t = gsap.timeline();
    sq(t, p, 1.05, 0.95, 0.1, 'power1.in', 0);
    bj(t, p, 8, 0.35, 'power2.in', 0.1);
    sq(t, p, 0.94, 1.05, 0.35, 'power2.in', 0.14);
    hd(t, p, -10, 0.45, 'power2.out', 0.2);
    armsHug(t, p, 0.15);
    hr(t, p, -5, 0.4, 0.25);
    for (var i = 0; i < 4; i++) {
      px(t, p, (i % 2 ? 1.6 : -1.6), 0.08, 'power1.inOut', 0.55 + i * 0.14);
    }
    px(t, p, 0, 0.2, 'power1.out', 1.15);
    blink(t, p, 0.5);
    return t;
  }
  function disRejectV(p) {
    var t = gsap.timeline();
    hd(t, p, -15, 0.6, 'power2.out', 0);
    hd(t, p, -5, 0.5, 'power1.inOut', 0.8);
    hd(t, p, 0, 0.6, 'power1.inOut', 1.5);
    sw(t, p, 3, 0.5, 'sine.inOut', 0.1);
    sw(t, p, 0, 0.6, 'sine.inOut', 1.4);
    bw(t, p, -2.6, 0.5, 'power1.out', 0.2);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.3);
    ey(t, p, 0.3, 0.45, 'power1.in', 0.5);
    ey(t, p, 1, 0.5, 'power2.out', 1);
    return t;
  }
  function collapseV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.06, 0.94, 0.09, 'power1.in', 0);
    bj(t, p, 16, 0.4, 'power3.in', 0.09);
    sq(t, p, 0.9, 1.06, 0.35, 'power2.in', 0.14);
    sw(t, p, 4, 0.4, 'power2.out', 0.15);
    hd(t, p, -16, 0.5, 'power2.out', 0.2);
    ar(t, p, 'L', -26, 0.45, 'back.out(1.4)', 0.3);
    ar(t, p, 'R', 26, 0.45, 'back.out(1.4)', 0.36);
    hr(t, p, 8, 0.4, 0.3);
    hr(t, p, 0, 0.5, 1);
    sh(t, p, 1.25, 0.35, 0.3);
    bw(t, p, 2, 0.3, 'power1.out', 0.2);
    bw(t, p, 0, 0.4, 'power1.out', 1.2);
    blink(t, p, 0.5);
    return t;
  }
  function lollV(p) {
    var t = gsap.timeline();
    hd(t, p, -15, 0.55, 'sine.inOut', 0);
    hd(t, p, 10, 0.55, 'sine.inOut', 0.6);
    hd(t, p, -8, 0.55, 'sine.inOut', 1.2);
    hd(t, p, 0, 0.6, 'sine.inOut', 1.8);
    sw(t, p, 3, 0.55, 'sine.inOut', 0.05);
    sw(t, p, -2, 0.55, 'sine.inOut', 0.65);
    sw(t, p, 0, 0.6, 'sine.inOut', 1.85);
    ar(t, p, 'L', -20, 0.55, 'sine.inOut', 0.15);
    ar(t, p, 'R', 20, 0.55, 'sine.inOut', 0.2);
    hr(t, p, 6, 0.5, 0.25);
    hr(t, p, 0, 0.6, 1.3);
    blink(t, p, 0.4);
    return t;
  }
  function handsHeadBoth(p) {
    var t = gsap.timeline();
    ar(t, p, 'L', -162, 0.4, 'back.out(1.5)', 0.08);
    ar(t, p, 'R', 162, 0.4, 'back.out(1.5)', 0.14);
    bj(t, p, 8, 0.35, 'power2.in', 0.1);
    sw(t, p, -3, 0.35, 'power2.out', 0.12);
    hd(t, p, 12, 0.4, 'power2.out', 0.2);
    for (var i = 0; i < 4; i++) {
      px(t, p, (i % 2 ? 2 : -2), 0.08, 'power1.inOut', 0.45 + i * 0.14);
    }
    px(t, p, 0, 0.25, 'power1.out', 1.05);
    ar(t, p, 'L', -120, 0.4, 'power1.out', 1.1);
    ar(t, p, 'R', 120, 0.4, 'power1.out', 1.15);
    hr(t, p, 8, 0.4, 0.25);
    hr(t, p, 0, 0.5, 1);
    bw(t, p, 2.2, 0.3, 'power1.out', 0.2);
    bw(t, p, 0, 0.4, 'power1.out', 1.2);
    return t;
  }
  function coverFace(p) {
    var t = gsap.timeline();
    ar(t, p, 'L', -160, 0.45, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 160, 0.45, 'back.out(1.5)', 0.16);
    bj(t, p, 9, 0.35, 'power2.in', 0.15);
    sq(t, p, 0.95, 1.03, 0.35, 'power2.in', 0.2);
    hd(t, p, 9, 0.4, 'power2.out', 0.25);
    hd(t, p, 3, 0.4, 'power1.out', 0.75);
    hr(t, p, -6, 0.4, 0.3);
    hr(t, p, 0, 0.5, 1);
    bw(t, p, 1.8, 0.3, 'power1.out', 0.2);
    bw(t, p, 0, 0.4, 'power1.out', 1.1);
    blink(t, p, 0.5);
    return t;
  }
  function slapHead(p) {
    var t = gsap.timeline();
    ar(t, p, 'R', -24, 0.1, 'power1.out', 0.05);
    ar(t, p, 'R', 148, 0.16, 'power2.out', 0.15);
    ar(t, p, 'R', 120, 0.3, 'back.out(1.4)', 0.32);
    sq(t, p, 1.12, 0.88, 0.08, 'power2.in', 0.3);
    bj(t, p, 5, 0.18, 'power2.in', 0.3);
    bj(t, p, 0, 0.25, 'power2.out', 0.48);
    sq(t, p, 1, 1, 0.3, 'power2.out', 0.48);
    hd(t, p, -12, 0.18, 'power2.out', 0.3);
    hd(t, p, -4, 0.4, 'power1.out', 0.5);
    bw(t, p, 2.4, 0.2, 'power1.out', 0.1);
    bw(t, p, 0, 0.4, 'power1.out', 1);
    hr(t, p, 9, 0.3, 0.35);
    hr(t, p, 0, 0.5, 1);
    return t;
  }
  function handsOnHead(p) {
    var t = gsap.timeline();
    ar(t, p, 'L', -150, 0.4, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 150, 0.4, 'back.out(1.5)', 0.16);
    hd(t, p, -8, 0.3, 'power2.out', 0.2);
    hd(t, p, 8, 0.3, 'power2.in', 0.55);
    hd(t, p, -5, 0.3, 'power2.in', 0.9);
    hd(t, p, 0, 0.4, 'power1.out', 1.25);
    for (var i = 0; i < 7; i++) {
      px(t, p, (i % 2 ? 2 : -2), 0.07, 'power1.inOut', 0.3 + i * 0.13);
    }
    px(t, p, 0, 0.2, 'power1.out', 1.25);
    bw(t, p, 2, 0.3, 'power1.out', 0.15);
    bw(t, p, 0, 0.4, 'power1.out', 1.2);
    hr(t, p, 7, 0.35, 0.25);
    hr(t, p, 0, 0.5, 1);
    return t;
  }
  function disPfftV(p) {
    var t = gsap.timeline();
    hd(t, p, -12, 0.55, 'power2.out', 0);
    hd(t, p, -4, 0.5, 'power1.inOut', 0.8);
    hd(t, p, 0, 0.6, 'power1.inOut', 1.5);
    sw(t, p, 4, 0.55, 'sine.inOut', 0.1);
    sw(t, p, 0, 0.6, 'sine.inOut', 1.45);
    bw(t, p, 2.4, 0.5, 'power1.out', 0.2);
    bw(t, p, 0, 0.6, 'power1.inOut', 1.35);
    ey(t, p, 0.4, 0.5, 'power2.in', 0.55);
    ey(t, p, 1, 0.55, 'power2.out', 1.1);
    return t;
  }
  function handsHeadShake(p) {
    var t = gsap.timeline();
    ar(t, p, 'L', -155, 0.4, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 155, 0.4, 'back.out(1.5)', 0.16);
    for (var i = 0; i < 8; i++) {
      px(t, p, (i % 2 ? 2.5 : -2.5), 0.07, 'power1.inOut', 0.3 + i * 0.12);
    }
    px(t, p, 0, 0.18, 'power1.out', 1.3);
    hd(t, p, -6, 0.2, 'power2.out', 0.3);
    hd(t, p, 6, 0.2, 'power2.in', 0.5);
    hd(t, p, -4, 0.2, 'power2.in', 0.7);
    hd(t, p, 0, 0.3, 'power1.out', 0.9);
    bw(t, p, 2.2, 0.25, 'power1.out', 0.15);
    bw(t, p, 0, 0.4, 'power1.out', 1.3);
    hr(t, p, -8, 0.35, 0.25);
    hr(t, p, 0, 0.5, 1.05);
    blink2(t, p, 0.4);
    return t;
  }
  function bigSighV(p) {
    var t = gsap.timeline();
    sq(t, p, 1.07, 0.92, 0.45, 'sine.inOut', 0);
    sq(t, p, 1, 1, 0.5, 'sine.inOut', 0.6);
    hd(t, p, -11, 0.5, 'sine.inOut', 0.1);
    hd(t, p, -3, 0.5, 'sine.inOut', 0.8);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.4);
    ar(t, p, 'L', -16, 0.5, 'sine.inOut', 0.15);
    ar(t, p, 'R', 16, 0.5, 'sine.inOut', 0.2);
    ar(t, p, 'L', -6, 0.5, 'sine.inOut', 0.9);
    ar(t, p, 'R', 6, 0.5, 'sine.inOut', 0.95);
    bw(t, p, 1.4, 0.4, 'power1.out', 0.15);
    bw(t, p, 0, 0.4, 'power1.out', 1.2);
    blink(t, p, 0.5);
    return t;
  }

  /* ---------- variantes extras (mais humanas: hesitação, assimetria, antecipação) ---------- */

  function joyBoing(p) {
    var t = gsap.timeline();
    sq(t, p, 1.2, 0.8, 0.1, 'power2.in', 0);
    bj(t, p, -52, 0.28, 'power2.out', 0.1);
    sh(t, p, 0.7, 0.24, 0.14);
    sq(t, p, 1.22, 0.76, 0.12, 'power2.in', 0.38);
    bj(t, p, 0, 0.42, 'elastic.out(1, 0.45)', 0.38);
    sq(t, p, 1, 1, 0.4, 'power2.out', 0.8);
    sh(t, p, 1.3, 0.12, 0.4);
    sh(t, p, 1, 0.5, 0.55);
    sw(t, p, -9, 0.18, 'power1.inOut', 0.16);
    sw(t, p, 9, 0.18, 'power1.inOut', 0.34);
    sw(t, p, 0, 0.3, 'power1.out', 0.52);
    ar(t, p, 'L', -118, 0.26, 'back.out(1.7)', 0.12);
    ar(t, p, 'R', 118, 0.26, 'back.out(1.7)', 0.17);
    ar(t, p, 'L', -92, 0.35, 'power1.out', 0.62);
    ar(t, p, 'R', 92, 0.35, 'power1.out', 0.67);
    hd(t, p, -8, 0.3, 'sine.out', 0.2);
    hd(t, p, 6, 0.3, 'sine.inOut', 0.55);
    hd(t, p, 0, 0.35, 'sine.inOut', 0.9);
    hr(t, p, -11, 0.3, 0.2);
    hr(t, p, 0, 0.45, 0.85);
    eyesHappy(t, p, 0.2);
    eyesHappy(t, p, 0.6);
    return t;
  }
  function joyOops(p) {
    var t = gsap.timeline();
    bj(t, p, -6, 0.16, 'power2.out', 0.06);
    bj(t, p, 0, 0.3, 'power2.out', 0.24);
    sq(t, p, 1.1, 0.9, 0.16, 'power2.in', 0);
    sq(t, p, 1, 1, 0.35, 'power2.out', 0.2);
    ar(t, p, 'L', -150, 0.3, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 150, 0.3, 'back.out(1.5)', 0.14);
    ar(t, p, 'L', -108, 0.35, 'power1.out', 0.5);
    ar(t, p, 'R', 108, 0.35, 'power1.out', 0.55);
    hd(t, p, 7, 0.3, 'sine.out', 0.15);
    hd(t, p, -3, 0.3, 'sine.inOut', 0.6);
    hd(t, p, 0, 0.35, 'sine.inOut', 1.05);
    bw(t, p, 2, 0.3, 'power1.out', 0.15);
    bw(t, p, 0, 0.4, 'power1.out', 1.1);
    hr(t, p, -6, 0.35, 0.2);
    hr(t, p, 0, 0.45, 0.95);
    blink(t, p, 0.5);
    blink(t, p, 0.95);
    return t;
  }
  function sadNodV(p) {
    var t = gsap.timeline();
    hd(t, p, -8, 0.5, 'sine.inOut', 0);
    hd(t, p, -2, 0.45, 'sine.inOut', 0.65);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.3);
    armsHug(t, p, 0.1);
    bw(t, p, 1.2, 0.4, 'power1.out', 0.15);
    bw(t, p, 0, 0.45, 'power1.out', 1.15);
    blink(t, p, 0.5);
    return t;
  }
  function sadWipeTears(p) {
    var t = gsap.timeline();
    ar(t, p, 'R', 150, 0.35, 'back.out(1.5)', 0.12);
    ar(t, p, 'R', 128, 0.4, 'power1.out', 0.6);
    ar(t, p, 'R', 150, 0.35, 'power1.inOut', 1.0);
    ar(t, p, 'R', 40, 0.5, 'power1.out', 1.45);
    ar(t, p, 'L', -30, 0.4, 'back.out(1.5)', 0.15);
    ar(t, p, 'L', -10, 0.5, 'power1.out', 1.2);
    hd(t, p, -9, 0.4, 'sine.out', 0.15);
    hd(t, p, -3, 0.4, 'sine.inOut', 0.75);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.35);
    bw(t, p, 1.6, 0.3, 'power1.out', 0.2);
    bw(t, p, 0, 0.4, 'power1.out', 1.3);
    return t;
  }
  function angSteam(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 3; i++) {
      sw(t, p, 3, 0.1, 'power1.inOut', i * 0.16);
      sw(t, p, -3, 0.1, 'power1.inOut', i * 0.16 + 0.08);
    }
    sw(t, p, 0, 0.3, 'power1.out', 0.55);
    ar(t, p, 'L', -44, 0.25, 'power1.out', 0.1);
    ar(t, p, 'R', 44, 0.25, 'power1.out', 0.13);
    ar(t, p, 'L', -34, 0.3, 'power1.out', 0.7);
    ar(t, p, 'R', 34, 0.3, 'power1.out', 0.73);
    hd(t, p, -6, 0.25, 'power1.inOut', 0.15);
    hd(t, p, 4, 0.25, 'power1.inOut', 0.4);
    hd(t, p, 0, 0.3, 'power1.out', 0.65);
    bw(t, p, 2.4, 0.25, 'power1.out', 0.1);
    bw(t, p, 0, 0.4, 'power1.out', 1.0);
    hr(t, p, 7, 0.3, 0.2);
    hr(t, p, 0, 0.4, 0.9);
    return t;
  }
  function angRocket(p) {
    var t = gsap.timeline();
    sq(t, p, 1.24, 0.76, 0.12, 'power2.in', 0);
    bj(t, p, -44, 0.26, 'power2.out', 0.12);
    sq(t, p, 1.2, 0.8, 0.12, 'power2.in', 0.4);
    bj(t, p, 0, 0.4, 'elastic.out(1, 0.5)', 0.4);
    sq(t, p, 1, 1, 0.4, 'power2.out', 0.8);
    ar(t, p, 'L', -120, 0.26, 'back.out(1.7)', 0.12);
    ar(t, p, 'R', 120, 0.26, 'back.out(1.7)', 0.16);
    ar(t, p, 'L', -96, 0.4, 'power1.out', 0.7);
    ar(t, p, 'R', 96, 0.4, 'power1.out', 0.75);
    hd(t, p, -9, 0.3, 'sine.out', 0.2);
    hd(t, p, 5, 0.3, 'sine.inOut', 0.6);
    hd(t, p, 0, 0.35, 'sine.inOut', 1);
    hr(t, p, 9, 0.3, 0.22);
    hr(t, p, 0, 0.45, 0.9);
    blink(t, p, 0.5);
    return t;
  }
  function fearCower(p) {
    var t = gsap.timeline();
    sq(t, p, 0.9, 1.06, 0.3, 'power2.in', 0);
    bj(t, p, 10, 0.3, 'power2.in', 0.12);
    ar(t, p, 'L', -84, 0.3, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 84, 0.3, 'back.out(1.5)', 0.14);
    ar(t, p, 'L', -60, 0.35, 'power1.out', 0.7);
    ar(t, p, 'R', 60, 0.35, 'power1.out', 0.75);
    hd(t, p, 8, 0.35, 'power2.out', 0.15);
    for (var i = 0; i < 5; i++) {
      px(t, p, (i % 2 ? 2 : -2), 0.07, 'power1.inOut', 0.5 + i * 0.13);
    }
    px(t, p, 0, 0.2, 'power1.out', 1.2);
    bw(t, p, 2.2, 0.3, 'power1.out', 0.2);
    bw(t, p, 0, 0.4, 'power1.out', 1.3);
    blink2(t, p, 0.5);
    return t;
  }
  function fearPeek(p) {
    var t = gsap.timeline();
    ar(t, p, 'L', -150, 0.3, 'back.out(1.5)', 0.08);
    ar(t, p, 'R', 150, 0.3, 'back.out(1.5)', 0.12);
    ar(t, p, 'L', -112, 0.3, 'power1.out', 0.5);
    ar(t, p, 'R', 112, 0.3, 'power1.out', 0.55);
    ar(t, p, 'L', -150, 0.3, 'power1.inOut', 0.85);
    ar(t, p, 'R', 150, 0.3, 'power1.inOut', 0.9);
    ar(t, p, 'L', -100, 0.35, 'power1.out', 1.2);
    ar(t, p, 'R', 100, 0.35, 'power1.out', 1.25);
    hd(t, p, -7, 0.3, 'sine.out', 0.15);
    hd(t, p, 5, 0.3, 'sine.inOut', 0.55);
    hd(t, p, 0, 0.35, 'sine.inOut', 1.05);
    bw(t, p, 2, 0.3, 'power1.out', 0.15);
    bw(t, p, 0, 0.4, 'power1.out', 1.1);
    blink(t, p, 0.7);
    return t;
  }
  function disShrugV(p) {
    var t = gsap.timeline();
    hd(t, p, 5, 0.5, 'sine.inOut', 0);
    hd(t, p, -2, 0.45, 'sine.inOut', 0.6);
    hd(t, p, 0, 0.5, 'sine.inOut', 1.15);
    bw(t, p, -3, 0.5, 'power1.out', 0.1);
    bw(t, p, 0, 0.55, 'power1.inOut', 0.9);
    ar(t, p, 'L', -32, 0.5, 'back.out(1.5)', 0.12);
    ar(t, p, 'R', 32, 0.5, 'back.out(1.5)', 0.17);
    ar(t, p, 'L', -16, 0.4, 'power1.out', 0.7);
    ar(t, p, 'R', 16, 0.4, 'power1.out', 0.75);
    ey(t, p, 0.5, 0.5, 'power1.in', 0.4);
    ey(t, p, 1, 0.55, 'power2.out', 1);
    return t;
  }
  function anxPace(p) {
    var t = gsap.timeline();
    px(t, p, -11, 0.3, 'power1.inOut', 0);
    px(t, p, 9, 0.3, 'power1.inOut', 0.35);
    px(t, p, -6, 0.28, 'power1.inOut', 0.7);
    px(t, p, 0, 0.3, 'power1.out', 1.05);
    ar(t, p, 'L', -38, 0.3, 'power1.out', 0.1);
    ar(t, p, 'R', 38, 0.3, 'power1.out', 0.14);
    ar(t, p, 'L', -26, 0.3, 'power1.out', 0.75);
    ar(t, p, 'R', 26, 0.3, 'power1.out', 0.8);
    hd(t, p, -6, 0.3, 'sine.inOut', 0.1);
    hd(t, p, 5, 0.3, 'sine.inOut', 0.5);
    hd(t, p, 0, 0.35, 'sine.inOut', 0.9);
    blink2(t, p, 0.35);
    return t;
  }
  function anxSpin(p) {
    var t = gsap.timeline();
    sw(t, p, 11, 0.22, 'power1.in', 0.05);
    sw(t, p, -9, 0.22, 'power1.in', 0.27);
    sw(t, p, 0, 0.4, 'elastic.out(1, 0.6)', 0.49);
    sq(t, p, 1.12, 0.88, 0.1, 'power2.in', 0);
    bj(t, p, -16, 0.3, 'power2.out', 0.1);
    bj(t, p, 0, 0.35, 'elastic.out(1, 0.5)', 0.4);
    sq(t, p, 1, 1, 0.35, 'power2.out', 0.4);
    ar(t, p, 'L', -64, 0.28, 'back.out(1.6)', 0.1);
    ar(t, p, 'R', 64, 0.28, 'back.out(1.6)', 0.14);
    ar(t, p, 'L', -30, 0.3, 'power1.out', 0.7);
    ar(t, p, 'R', 30, 0.3, 'power1.out', 0.75);
    hd(t, p, -7, 0.25, 'sine.inOut', 0.15);
    hd(t, p, 6, 0.25, 'sine.inOut', 0.45);
    hd(t, p, 0, 0.3, 'sine.inOut', 0.75);
    blink(t, p, 0.5);
    return t;
  }
  function enuShrugV(p) {
    var t = gsap.timeline();
    bw(t, p, -3, 0.6, 'sine.inOut', 0);
    bw(t, p, 0, 0.6, 'sine.inOut', 0.9);
    hd(t, p, 6, 0.6, 'sine.inOut', 0.05);
    hd(t, p, 0, 0.6, 'sine.inOut', 0.85);
    ar(t, p, 'L', -36, 0.55, 'sine.inOut', 0.1);
    ar(t, p, 'R', 36, 0.55, 'sine.inOut', 0.15);
    ar(t, p, 'L', -18, 0.5, 'sine.inOut', 0.75);
    ar(t, p, 'R', 18, 0.5, 'sine.inOut', 0.8);
    blink(t, p, 0.5);
    return t;
  }
  function enuNodV(p) {
    var t = gsap.timeline();
    hd(t, p, 4, 0.55, 'sine.inOut', 0);
    hd(t, p, -2, 0.5, 'sine.inOut', 0.65);
    hd(t, p, 0, 0.55, 'sine.inOut', 1.3);
    sq(t, p, 1.03, 0.97, 0.55, 'sine.inOut', 0.1);
    sq(t, p, 1, 1, 0.55, 'sine.inOut', 0.75);
    blink(t, p, 0.6);
    return t;
  }

  /* ---------------- NOVAS REAÇÕES-ASSINATURA POR EMOÇÃO ---------------- */
  function joyScrunch(p) {
    var t = gsap.timeline();
    sq(t, p, 1.1, 0.9, 0.12, 'power2.in', 0);
    bj(t, p, -5, 0.2, 'power2.out', 0.12);
    bj(t, p, 0, 0.3, 'power2.out', 0.34);
    sq(t, p, 1, 1, 0.35, 'power2.out', 0.34);
    ar(t, p, 'L', -124, 0.35, 'back.out(1.5)', 0.1);
    ar(t, p, 'R', 124, 0.35, 'back.out(1.5)', 0.14);
    ar(t, p, 'L', -94, 0.4, 'power1.out', 0.62);
    ar(t, p, 'R', 94, 0.4, 'power1.out', 0.66);
    hd(t, p, 7, 0.35, 'sine.out', 0.15);
    hd(t, p, -2, 0.35, 'sine.inOut', 0.6);
    hd(t, p, 0, 0.4, 'sine.inOut', 1.05);
    ey(t, p, 0.5, 0.3, 'power1.in', 0.55);
    ey(t, p, 1, 0.4, 'power1.out', 1.0);
    bw(t, p, 1.5, 0.3, 'power1.out', 0.2);
    bw(t, p, 0, 0.4, 'power1.out', 1.1);
    hr(t, p, -4, 0.3, 0.25);
    hr(t, p, 0, 0.5, 1.0);
    return t;
  }
  function sadDust(p) {
    var t = gsap.timeline();
    sq(t, p, 0.92, 1.08, 0.4, 'power2.in', 0);
    bj(t, p, 9, 0.4, 'power2.in', 0.1);
    sq(t, p, 0.97, 1.03, 0.5, 'power1.inOut', 0.6);
    bj(t, p, 4, 0.5, 'power2.out', 1.2);
    bj(t, p, 8, 0.3, 'power1.in', 1.7);
    ar(t, p, 'L', -26, 0.5, 'power2.out', 0.1);
    ar(t, p, 'R', 26, 0.5, 'power2.out', 0.15);
    ar(t, p, 'L', -12, 0.5, 'power1.out', 0.9);
    ar(t, p, 'R', 12, 0.5, 'power1.out', 0.95);
    hd(t, p, 10, 0.5, 'power2.out', 0.15);
    hd(t, p, 6, 0.4, 'sine.inOut', 1.1);
    bw(t, p, 2, 0.4, 'power1.out', 0.25);
    bw(t, p, 0, 0.5, 'power1.out', 1.4);
    return t;
  }
  function angChestPunch(p) {
    var t = gsap.timeline();
    sw(t, p, 4, 0.12, 'power1.inOut', 0);
    sw(t, p, -4, 0.12, 'power1.inOut', 0.14);
    sw(t, p, 0, 0.25, 'power1.out', 0.4);
    ar(t, p, 'L', -112, 0.2, 'back.in(1.7)', 0.05);
    ar(t, p, 'L', -58, 0.25, 'back.out(2)', 0.25);
    ar(t, p, 'R', 112, 0.2, 'back.in(1.7)', 0.1);
    ar(t, p, 'R', 58, 0.25, 'back.out(2)', 0.3);
    ar(t, p, 'L', -112, 0.2, 'back.in(1.7)', 0.55);
    ar(t, p, 'L', -58, 0.25, 'back.out(2)', 0.75);
    ar(t, p, 'R', 112, 0.2, 'back.in(1.7)', 0.6);
    ar(t, p, 'R', 58, 0.25, 'back.out(2)', 0.8);
    ar(t, p, 'L', -40, 0.3, 'power1.out', 1.1);
    ar(t, p, 'R', 40, 0.3, 'power1.out', 1.15);
    hd(t, p, -6, 0.2, 'power1.in', 0.06);
    hd(t, p, 4, 0.2, 'power1.out', 0.26);
    hd(t, p, 0, 0.4, 'elastic.out(1, 0.6)', 0.9);
    bw(t, p, 2.6, 0.2, 'power1.out', 0.1);
    bw(t, p, 0, 0.4, 'power1.out', 1.1);
    hr(t, p, 6, 0.2, 0.15);
    hr(t, p, 0, 0.5, 1.0);
    return t;
  }
  function fearDive(p) {
    var t = gsap.timeline();
    px(t, p, -9, 0.2, 'power1.inOut', 0);
    px(t, p, 8, 0.2, 'power1.inOut', 0.22);
    px(t, p, -5, 0.2, 'power1.inOut', 0.44);
    px(t, p, 0, 0.3, 'power1.out', 0.9);
    sq(t, p, 0.86, 1.12, 0.4, 'power2.in', 0.08);
    bj(t, p, 8, 0.4, 'power2.in', 0.12);
    sq(t, p, 0.95, 1.04, 0.35, 'power1.out', 1.2);
    ar(t, p, 'L', -140, 0.22, 'power1.in', 0.1);
    ar(t, p, 'R', 140, 0.22, 'power1.in', 0.14);
    ar(t, p, 'L', -110, 0.3, 'power1.out', 0.85);
    ar(t, p, 'R', 110, 0.3, 'power1.out', 0.9);
    hd(t, p, 9, 0.3, 'power2.out', 0.15);
    hd(t, p, 2, 0.4, 'sine.inOut', 1.0);
    bw(t, p, 2.6, 0.35, 'power1.out', 0.2);
    bw(t, p, 0, 0.45, 'power1.out', 1.5);
    blink2(t, p, 0.5);
    return t;
  }
  function anxFootTap(p) {
    var t = gsap.timeline();
    for (var i = 0; i < 6; i++) { px(t, p, (i % 2 ? 2 : -2), 0.07, 'power1.inOut', i * 0.1); }
    for (i = 0; i < 6; i++) { sw(t, p, (i % 2 ? 2.5 : -2.5), 0.08, 'power1.inOut', i * 0.1 + 0.18); }
    px(t, p, 0, 0.25, 'power1.out', 0.75);
    sw(t, p, 0, 0.25, 'power1.out', 0.85);
    ar(t, p, 'L', -34, 0.3, 'power1.inOut', 0.2);
    ar(t, p, 'R', 34, 0.3, 'power1.inOut', 0.26);
    ar(t, p, 'L', -20, 0.3, 'power1.out', 0.8);
    ar(t, p, 'R', 20, 0.3, 'power1.out', 0.84);
    hd(t, p, -4, 0.4, 'sine.inOut', 0.2);
    hd(t, p, 0, 0.4, 'sine.inOut', 0.9);
    return t;
  }
  function enuHang(p) {
    var t = gsap.timeline();
    sq(t, p, 0.96, 1.04, 0.5, 'power1.inOut', 0);
    bj(t, p, 3, 0.5, 'power1.inOut', 0.1);
    hd(t, p, 12, 0.6, 'power1.in', 0.05);
    hd(t, p, 10, 0.4, 'sine.inOut', 1.2);
    ar(t, p, 'L', -18, 0.5, 'power1.in', 0.15);
    ar(t, p, 'R', 18, 0.5, 'power1.in', 0.2);
    bw(t, p, 1.2, 0.5, 'power1.in', 0.25);
    bw(t, p, 0, 0.5, 'power1.out', 1.3);
    blink(t, p, 0.8);
    return t;
  }

  var V = {
    joy: { correct: [cheerJump, cheerSpin, joyBoing], wrong1: [denyJoy, joyOops], wrong2: [slumpJoy, joyScrunch], wrong3: [handsHeadBoth, joyOops] },
    sad: { correct: [sadHopV, sadClapV, sadNodV], wrong1: [denySad, sadDust], wrong2: [slumpDeep, sadDust], wrong3: [coverFace, sadWipeTears] },
    ang: { correct: [fistPumpV, stompCelebrate, angRocket], wrong1: [fistShakeV, angSteam], wrong2: [stompAngry, angChestPunch], wrong3: [slapHead, angSteam, angChestPunch] },
    fear: { correct: [reliefV, cautiousClapV, fearPeek], wrong1: [denyTremble, fearCower], wrong2: [sinkShrink, fearDive], wrong3: [handsOnHead, fearPeek, fearDive] },
    dis: { correct: [disApproveV, disSmirkV, disShrugV], wrong1: [disBlehV, disGrimaceV], wrong2: [disNopeV, disRejectV], wrong3: [disPfftV, disMaxV] },
    anx: { correct: [jitterJumpV, quickBounceV, anxSpin], wrong1: [nervousShake, anxFootTap], wrong2: [collapseV, anxPace, anxFootTap], wrong3: [handsHeadShake, anxSpin] },
    enu: { correct: [slowClapV, nodSighV, enuNodV], wrong1: [slowTilt, enuShrugV], wrong2: [lollV, enuHang], wrong3: [bigSighV, enuNodV, enuHang] }
  };

  function stageIdle() {
    if (REDUCED || !window.gsap) return;
    var token = ++idleToken;
    var p = stageParts();
    if (!p.body || !p.eyes.length) return;
    gsap.to(p.body, { scaleY: 1.028, scaleX: 0.985, duration: 1.9, yoyo: true, repeat: -1, ease: 'sine.inOut', svgOrigin: pivot(p.body, '70 188') });
    p.pupils.forEach(function (pu) {
      if (!pu) return;
      gsap.to(pu, { x: 1.4, duration: 1.6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to(pu, { x: -1.4, duration: 1.8, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 });
    });
    (function blinkLoop() {
      if (token !== idleToken) return;
      var reacting = els.stageChar.classList.contains('correct') || els.stageChar.classList.contains('wrong1') ||
        els.stageChar.classList.contains('wrong2') || els.stageChar.classList.contains('wrong3');
      if (!reacting) blink(gsap.timeline(), p, 0);
      gsap.delayedCall(2.8 + Math.random() * 4.2, blinkLoop);
    })();
  }

  function clearAnim() {
    idleToken++;
    if (animTimer) clearTimeout(animTimer);
    animTimer = null;
    var sc = els.stageChar;
    if (!sc) return;
    sc.classList.remove('correct', 'wrong1', 'wrong2', 'wrong3');
    if (window.gsap) {
      gsap.killTweensOf(sc);
      sc.querySelectorAll('*').forEach(function (el) {
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: 'transform' });
      });
      gsap.set(sc, { clearProps: 'transform' });
    }
  }

  var WORDS = {
    joy: { good: ['Uhuul!', 'Isso aí!', 'Acertei!', 'Eu sabia!', 'Boa!'], bad: ['Eita!', 'Ah não!', 'Que isso?!', 'Eu achava que era!'] },
    sad: { good: ['Que bom...', 'Ufa, acertei.', 'Ainda bem.', 'Finalmente.', 'Hmm, certo.'], bad: ['Ah... errei.', 'Que triste...', 'Poxa.', 'Nossa...', 'Tanta coisa...'] },
    ang: { good: ['É ISSO!', 'CLARO!', 'EU SABIA!', 'Boa!', 'ÓTIMO.'], bad: ['NÃO!', 'AH, NUNCA!', 'Impim de mim!', 'CALMA QUE EU ACERTO!', 'NÃO ACREDITO!'] },
    fear: { good: ['Ufa...', 'Acertei...', 'Menos mal.', 'Certo? Certo!', 'Que susto...'], bad: ['Ah não, não!', 'Euer... errei.', 'Meu Deus...', 'Nunca vou acertar...', 'Meus temores!'] },
    dis: { good: ['Enfim.', 'Óbvio.', 'Claro.', 'Esperado.', 'Típico.', 'Ao menos acertou.'], bad: ['Bleh!', 'Eca!', 'Credo!', 'Repugnante saber.', 'Tsk.'] },
    anx: { good: ['Certo... certo?', 'Achei que errei!', 'Ufa, deu certo.', 'Felizmente...', 'Tava quase><!'], bad: ['EI TA ERREI?', 'EU SABIA!', 'E se eu... errei.', 'Pânico!', 'Calma, calma...'] },
    enu: { good: ['Ah, certo.', 'Tanto faz...', 'Ok, eu sabia.', 'Nem ligar.', 'Bom...'], bad: ['Kack...', 'Errei? Que pena.', 'Tanto faz mesmo.', 'Ah, queria dormir...', 'Hmm.'] }
  };
  var popTimer = null;
  function popWord(emo, good) {
    var el = document.querySelector('.quiz-stage');
    if (!el) return;
    var bank = WORDS[emo] || WORDS.joy;
    var list = good ? bank.good : bank.bad;
    var old = el.querySelector('.pop-word');
    if (old) old.remove();
    var w = document.createElement('div');
    w.className = 'pop-word' + (good ? ' good' : '');
    w.textContent = list[Math.floor(Math.random() * list.length)];
    el.appendChild(w);
    if (popTimer) clearTimeout(popTimer);
    popTimer = setTimeout(function () { if (w.parentNode) w.parentNode.removeChild(w); }, 1850);
  }

    var lastAnimKey = '';
  function playStageAnim(name) {
    clearAnim();
    els.stageChar.classList.add(name);
    popWord(state.curEmo, name === 'correct');
    if (window.gsap && !REDUCED) {
      var p = stageParts();
      var pool = V[state.curEmo] && V[state.curEmo][name];
      if (pool && pool.length) {
        var idx = Math.floor(Math.random() * pool.length);
        if (pool.length > 1) {
          var key = state.curEmo + ':' + name;
          if (key === lastAnimKey) idx = (idx + 1) % pool.length;
          lastAnimKey = key;
        }
        var tl = pool[idx](p);
        if (tl) {
          /* pequena reação humana: o corpo "acorda" depois de um instante */
          tl.progress(0).delay(name === 'correct' ? 0.08 : 0.18 + Math.random() * 0.14);
          tl.play();
        }
      }
    }
    animTimer = setTimeout(function () {
      clearAnim();
      stageIdle();
    }, 1950);
  }

  function startQuiz() {
    state.active = true;
    state.idx = 0;
    state.score = 0;
    history = freshHistory();
    els.intro.hidden = true;
    els.end.hidden = true;
    els.app.hidden = false;
    els.nextBtn.hidden = true;
    updateScore();
    renderDots();
    typeQuestion();
  }

  function quitQuiz() {
    stopTyping();
    clearAnim();
    state.active = false;
    state.idx = 0;
    state.score = 0;
    history = freshHistory();
    els.app.hidden = true;
    els.end.hidden = true;
    els.intro.hidden = false;
    updateScore();
  }

  function updateScore() {
    els.counter.textContent = (state.idx + 1) + ' / ' + QUESTIONS.length;
  }

  function stopTyping() {
    if (tTimer) clearTimeout(tTimer);
    tTimer = null;
    state.typing = false;
    state.paused = false;
  }

  function typeQuestion() {
    stopTyping();
    var q = QUESTIONS[state.idx];
    state.typing = true;
    state.locked = false;
    tPhase = 'q';
    tPos = 0;
    oPos = 0;
    oChar = 0;
    els.question.innerHTML = '<span class="q-text"></span><span class="caret"></span>';
    els.question.classList.remove('paused');
    els.options.innerHTML = '';
    els.nextBtn.hidden = true;
    els.typing.hidden = false;
    els.paused.hidden = true;
    els.controls.hidden = false;
    els.pauseLabel.textContent = 'Pausar';
    setEmoChip(q.e);
    setStageEmotion(q.e);
    updateScore();
    renderDots();
    sound('click');
    tTimer = setTimeout(tickQ, 420);
  }

  function tickQ() {
    if (!state.typing || state.paused) return;
    var q = QUESTIONS[state.idx];
    if (tPos < q.q.length) {
      els.question.querySelector('.q-text').textContent += q.q.charAt(tPos);
      tPos++;
      tTimer = setTimeout(tickQ, 52 + Math.random() * 44);
    } else {
      typeOptions();
    }
  }

  function typeOptions() {
    var q = QUESTIONS[state.idx];
    state.typing = true;
    state.paused = false;
    els.options.innerHTML = '';
    q.o.forEach(function (opt, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'quiz-option';
      b.innerHTML = '<span class="opt-letter">' + LETTERS[i] + '</span><span class="opt-text"></span><span class="opt-verdict"></span>';
      b.addEventListener('click', function () {
        choose(i, b);
      });
      els.options.appendChild(b);
    });
    tPhase = 'o';
    oPos = 0;
    oChar = 0;
    tTimer = setTimeout(tickO, 360);
  }

  function tickO() {
    if (!state.typing || state.paused) return;
    var q = QUESTIONS[state.idx];
    var btns = els.options.children;
    var btn = btns[oPos];
    if (!btn) { finishOptions(); return; }
    if (btn.classList.contains('locked') || btn.disabled) {
      oPos++;
      oChar = 0;
      if (oPos < q.o.length) {
        tTimer = setTimeout(tickO, 200);
      } else {
        finishOptions();
      }
      return;
    }
    btn.classList.add('show');
    var target = q.o[oPos];
    var txt = btn.querySelector('.opt-text');
    if (oChar < target.length) {
      txt.textContent += target.charAt(oChar);
      oChar++;
      tTimer = setTimeout(tickO, 48 + Math.random() * 40);
    } else {
      oPos++;
      oChar = 0;
      if (oPos < q.o.length) {
        tTimer = setTimeout(tickO, 340);
      } else {
        finishOptions();
      }
    }
  }

  function finishOptions() {
    stopTyping();
    els.typing.hidden = true;
    els.paused.hidden = true;
    els.controls.hidden = true;
    var caret = els.question.querySelector('.caret');
    if (caret) caret.style.display = 'none';
    renderDots();
  }

  function setPaused(p) {
    if (!state.typing || state.locked) return;
    state.paused = p;
    els.paused.hidden = !p;
    els.typing.hidden = p;
    els.question.classList.toggle('paused', p);
    els.pauseLabel.textContent = p ? 'Continuar' : 'Pausar';
    if (!p) {
      sound('click');
      tTimer = setTimeout(tPhase === 'q' ? tickQ : tickO, 120);
    }
  }

  function togglePause() { setPaused(!state.paused); }

  function revealAll() {
    if (!state.typing) return;
    var q = QUESTIONS[state.idx];
    if (tPhase === 'q') {
      stopTyping();
      els.question.querySelector('.q-text').textContent = q.q;
      typeOptions();
    } else {
      stopTyping();
      els.question.querySelector('.q-text').textContent = q.q;
      var btns = els.options.children;
      q.o.forEach(function (opt, i) {
        var btn = btns[i];
        btn.classList.add('show');
        btn.querySelector('.opt-text').textContent = opt;
      });
      finishOptions();
    }
  }

  function buildOptionButton(opt, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'quiz-option';
    b.innerHTML = '<span class="opt-letter">' + LETTERS[i] + '</span><span class="opt-text"></span><span class="opt-verdict"></span>';
    b.addEventListener('click', function () {
      choose(i, b);
    });
    return b;
  }


  function choose(i, btn) {
    if (state.locked) return;
    if (!btn.classList.contains('show')) return;
    var q = QUESTIONS[state.idx];
    var h = history[state.idx];
    if (!h) { h = { attempts: 0, solved: false }; history[state.idx] = h; }
    var wasTyping = state.typing;
    if (wasTyping) {
      btn.classList.add('show');
      btn.querySelector('.opt-text').textContent = q.o[i];
    }
    btn.blur();
    if (i === q.a) {
      if (wasTyping) {
        stopTyping();
        els.typing.hidden = true;
        els.paused.hidden = true;
        els.controls.hidden = true;
        var caret = els.question.querySelector('.caret');
        if (caret) caret.style.display = 'none';
      }
      h.solved = true;
      h.attempts++;
      state.locked = true;
      var firstTry = h.attempts === 1;
      if (firstTry) state.score++;
      var all = els.options.querySelectorAll('.quiz-option');
      all.forEach(function (b, j) {
        b.classList.add('locked', 'show');
        if (j !== i) b.classList.add('faded');
        b.querySelector('.opt-text').textContent = q.o[j];
      });
      btn.classList.add('correct');
      btn.querySelector('.opt-verdict').textContent = 'Correto';
      sound('correct');
      emoSound(state.curEmo, true);
      playStageAnim('correct');
      renderDots();
      els.nextBtn.hidden = false;
      els.nextBtn.textContent = state.idx === QUESTIONS.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
      els.nextBtn.blur();
    } else {
      h.attempts++;
      btn.classList.add('locked', 'tried');
      btn.disabled = true;
      btn.querySelector('.opt-verdict').textContent = 'Tentou';
      sound('wrong');
      emoSound(state.curEmo, false);
      var anims = ['wrong1', 'wrong2', 'wrong3'];
      var a = Math.floor(Math.random() * anims.length);
      if (a === lastWrong) a = (a + 1) % anims.length;
      lastWrong = a;
      playStageAnim(anims[a]);
    }
  }

  function renderSolved(i) {
    stopTyping();
    clearAnim();
    var q = QUESTIONS[i];
    var h = history[i];
    state.locked = true;
    els.question.innerHTML = '<span class="q-text"></span>';
    els.question.querySelector('.q-text').textContent = q.q;
    els.question.classList.remove('paused');
    els.typing.hidden = true;
    els.paused.hidden = true;
    els.controls.hidden = true;
    els.options.innerHTML = '';
    q.o.forEach(function (opt, j) {
      var b = buildOptionButton(opt, j);
      b.classList.add('show', 'locked');
      b.querySelector('.opt-text').textContent = opt;
      if (j === q.a) {
        b.classList.add('correct');
        b.querySelector('.opt-verdict').textContent = 'Resposta certa';
      } else {
        b.classList.add('faded');
      }
      els.options.appendChild(b);
    });
    setStageEmotion(q.e);
    els.nextBtn.hidden = false;
    els.nextBtn.textContent = i === QUESTIONS.length - 1 ? 'Ver resultado' : 'Próxima pergunta';
    updateScore();
    renderDots();
  }

  function jumpTo(i) {
    if (i === state.idx && state.typing) return;
    stopTyping();
    state.idx = i;
    var h = history[i];
    if (h && h.solved) {
      renderSolved(i);
    } else {
      typeQuestion();
    }
  }

  function nextStep() {
    if (!state.locked) return;
    els.nextBtn.blur();
    if (state.idx === QUESTIONS.length - 1) {
      endQuiz();
    } else {
      state.idx++;
      typeQuestion();
    }
  }

  function endQuiz() {
    stopTyping();
    els.card.hidden = true;
    els.end.hidden = false;
    var n = QUESTIONS.length;
    var pct = state.score / n;
    var face;
    var title;
    var msg;
    if (pct >= 0.83) {
      face = 'joy';
      title = 'Equipe em festa!';
      msg = 'Excelente! Você domina a ciência das emoções — a equipe inteira está celebrando na central de controle.';
    } else if (pct >= 0.58) {
      face = 'joy';
      title = 'Muito bem!';
      msg = 'Quase perfeito. A Alegria está orgulhosa de você — só revisa os detalhes finos da pesquisa.';
    } else if (pct >= 0.33) {
      face = 'sad';
      title = 'Quase lá!';
      msg = 'Não foi ruim, mas a Tristeza sugere uma revisada no material antes da apresentação.';
    } else {
      face = 'anx';
      title = 'Hmm… vamos revisar?';
      msg = 'Ufa! A Ansiedade quase entrou em pânico. Vale revisar a pesquisa do grupo e refazer o quiz.';
    }
    els.endScore.textContent = state.score + '/' + n;
    els.endFace.innerHTML = faces()[face];
    els.endTitle.textContent = title;
    els.endMsg.textContent = msg;
    burst();
  }

  function burst() {
    els.endOrbs.innerHTML = '';
    var colors = ['#ffd93b', '#4e8fe8', '#f4643f', '#8a6ae6', '#87c76c', '#f49b4f'];
    for (var i = 0; i < 34; i++) {
      var s = document.createElement('span');
      s.className = 'spark';
      var angle = Math.random() * Math.PI * 2;
      var dist = 90 + Math.random() * 210;
      s.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      s.style.background = colors[Math.floor(Math.random() * colors.length)];
      s.style.animationDelay = Math.random() * 0.25 + 's';
      els.endOrbs.appendChild(s);
      (function (el) {
        setTimeout(function () { el.remove(); }, 1800);
      })(s);
    }
  }

  els.startQuizBtn.addEventListener('click', function () {
    this.blur();
    startQuiz();
  });

  els.pauseBtn.addEventListener('click', function () {
    this.blur();
    togglePause();
  });

  els.revealBtn.addEventListener('click', function () {
    this.blur();
    revealAll();
  });

  els.nextBtn.addEventListener('click', function () {
    this.blur();
    nextStep();
  });

  els.quitQuizBtn.addEventListener('click', function () {
    this.blur();
    quitQuiz();
  });

  els.restartBtn.addEventListener('click', function () {
    this.blur();
    state.idx = 0;
    state.score = 0;
    history = freshHistory();
    lastWrong = -1;
    els.end.hidden = true;
    els.card.hidden = false;
    updateScore();
    typeQuestion();
  });

  els.question.addEventListener('click', function () {
    if (state.typing && !state.locked) togglePause();
  });

  els.muteBtn.addEventListener('click', function () {
    this.blur();
    state.muted = !state.muted;
    els.soundOn.style.display = state.muted ? 'none' : '';
    els.soundOff.style.display = state.muted ? '' : 'none';
  });

  document.addEventListener('keydown', function (e) {
    if (!state.active) return;
    var tag = e.target && e.target.tagName;
    if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.code === 'Space') {
      if (state.typing && !state.locked) {
        e.preventDefault();
        togglePause();
      }
      return;
    }
    if (!els.end.hidden) return;
    var k = e.key.toLowerCase();
    var idx = LETTERS.indexOf(k.toUpperCase());
    if (idx > -1 && !state.locked) {
      var btn = els.options.querySelectorAll('.quiz-option')[idx];
      if (btn && !btn.disabled) btn.click();
    } else if (k === 'enter' && state.locked) {
      e.preventDefault();
      nextStep();
    }
  });

  (function flyLoop() {
    var item = document.querySelector('.cast-item.c-dis');
    if (!item) return;
    setTimeout(function () {
      var el = document.querySelector('.cast-item.c-dis');
      if (el) {
        el.classList.add('fly-active');
        setTimeout(function () { if (el) el.classList.remove('fly-active'); }, 8200);
      }
      flyLoop();
    }, 9000 + Math.random() * 14000);
  })();

  initialized = true;
  window.__quizOk = true;
  window.__quizAnswers = QUESTIONS.map(function (q) { return q.a; });
  window.__quizAnims = { V: V, playStageAnim: playStageAnim, stageParts: stageParts, state: state, els: els };
})();
