const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderPercent = document.getElementById('loaderPercent');
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const nav = document.querySelector('.nav');
const appPreview = document.getElementById('appPreview');
const langButtons = document.querySelectorAll('[data-lang]');

const translations = {
  en: {
    title: 'Sleep Tracker AI',
    description: 'Sleep Tracker AI records your nights, wakes you smarter, and turns sleep data into simple coaching.',
    image: 'assets/app-screen-en.jpg',
    navFeatures: 'Features',
    navDownload: 'Download',
    navPrivacy: 'Privacy',
    heroEyebrow: 'ANDROID APK NOW / IOS APP STORE SOON',
    heroLead: 'Sleep recording, smart alarm, and AI coaching in one quiet app.',
    androidButton: 'Android APK soon',
    iosButton: 'App Store soon',
    scroll: 'Scroll',
    stripApk: 'website APK',
    stripCrypto: 'USDT networks',
    stripAi: 'sleep insights',
    stripAndroid: 'direct install',
    featuresEyebrow: 'WHAT IT DOES',
    featuresTitle: 'Short app. Useful every morning.',
    cardOneTitle: 'Records nights',
    cardOneText: 'Tracks sleep sessions, audio events, and wake-up context without turning the app into a dashboard maze.',
    cardTwoTitle: 'Wakes smarter',
    cardTwoText: 'Alarm and sleep tools are built around the actual night, not a generic timer.',
    cardThreeTitle: 'Explains patterns',
    cardThreeText: 'Premium adds AI reports that translate raw data into plain next steps.',
    downloadEyebrow: 'GET THE APP',
    downloadTitle: 'Install Android now.',
    downloadText: 'iOS stays in App Store flow and will be linked here after approval.',
    androidShort: 'Android APK soon',
    iosShort: 'iOS soon',
    footerTerms: 'Terms',
  },
  ru: {
    title: 'Sleep Tracker AI',
    description: 'Sleep Tracker AI записывает сон, будит умнее и превращает данные в простые советы.',
    image: 'assets/app-screen-ru.jpg',
    navFeatures: 'Функции',
    navDownload: 'Скачать',
    navPrivacy: 'Приватность',
    heroEyebrow: 'ANDROID APK УЖЕ ЕСТЬ / IOS СКОРО В APP STORE',
    heroLead: 'Запись сна, умный будильник и AI-коуч в одном спокойном приложении.',
    androidButton: 'Android APK скоро',
    iosButton: 'App Store скоро',
    scroll: 'Скролл',
    stripApk: 'APK с сайта',
    stripCrypto: 'USDT сети',
    stripAi: 'AI отчеты',
    stripAndroid: 'прямая установка',
    featuresEyebrow: 'ЧТО ВНУТРИ',
    featuresTitle: 'Короткое приложение. Полезно каждое утро.',
    cardOneTitle: 'Записывает ночи',
    cardOneText: 'Сохраняет сессии сна, аудио-события и контекст пробуждения без перегруженных экранов.',
    cardTwoTitle: 'Будит умнее',
    cardTwoText: 'Будильник и sleep-инструменты завязаны на реальную ночь, а не на обычный таймер.',
    cardThreeTitle: 'Объясняет паттерны',
    cardThreeText: 'Premium добавляет AI-отчеты, которые переводят сырые данные в понятные следующие шаги.',
    downloadEyebrow: 'СКАЧАТЬ',
    downloadTitle: 'Android можно ставить сейчас.',
    downloadText: 'iOS остается через App Store, ссылка появится здесь после апрува.',
    androidShort: 'Android APK скоро',
    iosShort: 'iOS скоро',
    footerTerms: 'Условия',
  },
};

function setLanguage(lang) {
  const nextLang = translations[lang] ? lang : 'en';
  const dict = translations[nextLang];
  document.documentElement.lang = nextLang;
  document.title = dict.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', dict.description);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', dict.description);
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const key = node.getAttribute('data-i18n');
    if (key && dict[key]) node.textContent = dict[key];
  });
  if (appPreview) {
    appPreview.src = dict.image;
    appPreview.alt = nextLang === 'ru'
      ? 'Экран приложения Sleep Tracker AI'
      : 'Sleep Tracker AI sleep screen';
  }
  langButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.lang === nextLang);
  });
  window.localStorage.setItem('sleeptracker-lang', nextLang);
}

const savedLang = window.localStorage.getItem('sleeptracker-lang');
const browserLang = navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en';
setLanguage(savedLang || browserLang);

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

let progress = 0;
const tick = window.setInterval(() => {
  progress = Math.min(100, progress + Math.ceil(Math.random() * 17));
  loaderFill.style.width = `${progress}%`;
  loaderPercent.textContent = String(progress);
  if (progress >= 100) {
    window.clearInterval(tick);
    window.setTimeout(() => loader.classList.add('is-done'), 180);
  }
}, 45);

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 16);
}, { passive: true });

if (window.matchMedia('(pointer:fine)').matches) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener('mousemove', (event) => {
    tx = event.clientX;
    ty = event.clientY;
    cursorDot.style.transform = `translate(${tx - 2}px, ${ty - 2}px)`;
  }, { passive: true });

  const animate = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    cursor.style.transform = `translate(${x - 16}px, ${y - 16}px)`;
    window.requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll('a, .magnetic').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
}
