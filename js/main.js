/* ===== 建筑作品集 — 交互 ===== */

(function () {
  'use strict';

  /* ---- 导航栏滚动效果 ---- */
  var nav = document.getElementById('nav');
  var heroScroll = document.getElementById('heroScroll');

  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 50);

    /* 回到顶部按钮 */
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);

    /* 进度条 */
    if (progressBar) {
      var h = document.documentElement;
      var total = h.scrollHeight - h.clientHeight;
      progressBar.style.width = total > 0 ? (y / total * 100) + '%' : '0%';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- 滚动指示器点击 ---- */
  if (heroScroll) {
    heroScroll.addEventListener('click', function () {
      var el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- 渐入动画 ---- */
  var fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- 首屏大图淡入 ---- */
  var heroImg = document.getElementById('heroImg');
  if (heroImg) {
    if (heroImg.complete) { heroImg.style.opacity = '1'; }
    else {
      heroImg.style.opacity = '0';
      heroImg.style.transition = 'opacity 0.6s ease';
      heroImg.addEventListener('load', function () { heroImg.style.opacity = '1'; });
    }
  }

  /* ---- 滚动进度条 ---- */
  var progressBar = document.querySelector('.progress-bar');

  /* ---- 回到顶部按钮 ---- */
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- 灯箱 ---- */
  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbClose = lightbox.querySelector('.lightbox-close');

    /* 为详情页画廊图片绑定点击 */
    var galleryImgs = document.querySelectorAll('.detail-gallery img');
    galleryImgs.forEach(function (img) {
      img.addEventListener('click', function () {
        if (lbImg) {
          lbImg.src = this.src;
          lbImg.alt = this.alt;
        }
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    /* 关闭灯箱 */
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lbClose) closeLightbox();
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---- 图片懒加载 ---- */
  var lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  lazyImgs.forEach(function (img) {
    if (img.complete) { img.classList.add('loaded'); }
    else { img.addEventListener('load', function () { img.classList.add('loaded'); }); }
    img.addEventListener('error', function () { img.classList.add('loaded'); });
  });

  /* 初始触发一次滚动状态 */
  onScroll();
})();
