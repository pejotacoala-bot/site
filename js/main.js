(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canvas = document.getElementById('orbs');
  var ctx = canvas.getContext('2d');
  var PALETTE = ['#ffd93b', '#4e8fe8', '#f4643f', '#8a6ae6', '#87c76c', '#f49b4f'];
  var orbs = [];
  var mouse = { x: 0, y: 0 };
  var dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawnOrbs();
  }

  function spawnOrbs() {
    var count = window.innerWidth < 760 ? 18 : 34;
    orbs = [];
    for (var i = 0; i < count; i++) {
      orbs.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 1.5 + Math.random() * 4.5,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        a: 0.12 + Math.random() * 0.3,
        tw: Math.random() * Math.PI * 2,
        ts: 0.4 + Math.random() * 0.8
      });
    }
  }

  function frame(t) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    var mx = (mouse.x - w / 2) * 0.02;
    var my = (mouse.y - h / 2) * 0.02;
    for (var i = 0; i < orbs.length; i++) {
      var o = orbs[i];
      o.x += o.vx + mx * 0.03;
      o.y += o.vy + my * 0.03;
      o.tw += o.ts * 0.02;
      if (o.x < -20) o.x = w + 20;
      if (o.x > w + 20) o.x = -20;
      if (o.y < -20) o.y = h + 20;
      if (o.y > h + 20) o.y = -20;
      var alpha = o.a * (0.65 + 0.35 * Math.sin(o.tw));
      var g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 4);
      g.addColorStop(0, hexToRgba(o.c, alpha));
      g.addColorStop(1, hexToRgba(o.c, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  function hexToRgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a.toFixed(3) + ')';
  }

  if (!reduced) {
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    resize();
    requestAnimationFrame(frame);
  }

  var nav = document.getElementById('topNav');
  var fullscreenBtn = document.getElementById('fullscreenBtn');
  var fsOn = document.getElementById('fsOn');
  var fsOff = document.getElementById('fsOff');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  fullscreenBtn.addEventListener('click', function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(function () {});
    }
  });

  document.addEventListener('fullscreenchange', function () {
    var on = !!document.fullscreenElement;
    fsOn.style.display = on ? 'none' : '';
    fsOff.style.display = on ? '' : 'none';
  });

  var sections = [
    { id: 'inicio', label: 'Início' },
    { id: 'central', label: 'Central' },
    { id: 'sistemas', label: 'Sistemas' },
    { id: 'mensageiros', label: 'Mensageiros' },
    { id: 'equilibrio', label: 'Equilíbrio' },
    { id: 'quiz', label: 'Quiz' }
  ];

  var dotsWrap = document.getElementById('sideDots');
  var dots = [];

  sections.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-label', s.label);
    b.setAttribute('aria-label', 'Ir para ' + s.label);
    b.addEventListener('click', function () {
      document.getElementById(s.id).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
    dotsWrap.appendChild(b);
    dots.push(b);
  });

  var progressBar = document.getElementById('progressBar');

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
    });

    sections.forEach(function (s, i) {
      ScrollTrigger.create({
        trigger: '#' + s.id,
        start: 'top center',
        end: 'bottom center',
        onToggle: function (self) {
          if (self.isActive) {
            dots.forEach(function (d, di) {
              d.classList.toggle('active', di === i);
            });
          }
        }
      });
    });

    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
      );
    });

    gsap.utils.toArray('[data-reveal-group]').forEach(function (el) {
      gsap.fromTo(el.children,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
      );
    });

    gsap.utils.toArray('.c-fill').forEach(function (el) {
      gsap.fromTo(el,
        { width: 0 },
        {
          width: el.getAttribute('data-w') + '%',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: { trigger: el.closest('.compare'), start: 'top 80%', once: true }
        }
      );
    });

    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      gsap.to(el, {
        yPercent: Number(el.getAttribute('data-parallax')) || -8,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }

  var gsapLib = window.gsap;
  var heroEls = gsapLib ? gsapLib.utils.toArray('[data-hero]') : [];
  if (gsapLib && heroEls.length) {
    gsapLib.fromTo(heroEls,
      { autoAlpha: 0, y: 30 },
      {
        autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out',
        stagger: 0.14, delay: 0.25
      }
    );
  }
})();
