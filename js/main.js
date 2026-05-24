/* ===== 日系极简 建筑作品集 — 交互 ===== */

(function () {
  'use strict';

  /* ---- 导航栏滚动效果 ---- */
  var nav = document.getElementById('nav');
  var heroScroll = document.getElementById('heroScroll');

  function onScroll() {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- 滚动指示器点击 ---- */
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var projects = document.getElementById('projects');
      if (projects) {
        projects.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* ---- 渐入动画 (Intersection Observer) ---- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* 降级：直接显示 */
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---- 首屏大图预加载后淡入 ---- */
  var heroImg = document.getElementById('heroImg');
  if (heroImg) {
    if (heroImg.complete) {
      heroImg.style.opacity = '1';
    } else {
      heroImg.style.opacity = '0';
      heroImg.style.transition = 'opacity 0.6s ease';
      heroImg.addEventListener('load', function () {
        heroImg.style.opacity = '1';
      });
    }
  }
})();
