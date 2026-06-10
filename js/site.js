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
    navCoach: 'AI Coach',
    navPrivacyBlock: 'Trust',
    navPricing: 'Pricing',
    navDownload: 'Download',
    navPrivacy: 'Legal',
    heroEyebrow: 'ANDROID BETA APK AVAILABLE',
    heroLead: 'Sleep recording, smart alarm, and AI coaching in one quiet app.',
    androidButton: 'Download Android APK',
    iosButton: 'App Store soon',
    heroPointOne: 'Audio events, not guesswork',
    heroPointTwo: 'Smart alarm context',
    heroPointThree: 'AI next steps',
    scroll: 'Scroll',
    stripApk: 'Android beta APK',
    stripCrypto: 'RUB checkout via Robokassa',
    stripAi: 'sleep insights',
    stripAndroid: 'from 990 RUB/month',
    featuresEyebrow: 'WHAT IT DOES',
    featuresTitle: 'Short app. Useful every morning.',
    cardOneTitle: 'Records nights',
    cardOneText: 'Tracks sleep sessions, audio events, and wake-up context without turning the app into a dashboard maze.',
    cardTwoTitle: 'Wakes smarter',
    cardTwoText: 'Alarm and sleep tools are built around the actual night, not a generic timer.',
    cardThreeTitle: 'Explains patterns',
    cardThreeText: 'Premium adds AI reports that translate raw data into plain next steps.',
    coachEyebrow: 'AI SLEEP MIRROR',
    coachTitle: 'Your night, clearly understood.',
    coachText: 'Sleep Tracker AI turns recordings, wake-up time, and repeated patterns into a calm morning readout with practical next steps.',
    boardTitle: 'Morning report',
    insightOneTitle: 'Fragmented after 04:10',
    insightOneText: 'Audio spikes clustered near the end of the night.',
    insightTwoTitle: 'Best wake window',
    insightTwoText: 'Alarm feels lighter when it follows a calmer interval.',
    insightThreeTitle: "Tonight's focus",
    insightThreeText: 'Keep the same bedtime and reduce late noise.',
    flowEyebrow: 'HOW IT WORKS',
    flowTitle: 'Record. Detect. Explain. Improve.',
    flowOneTitle: 'Start a night',
    flowOneText: 'The app records the sleep session and keeps the interface quiet when you are already in bed.',
    flowTwoTitle: 'Catch events',
    flowTwoText: 'Snoring, noise, and wake-up context become a timeline instead of a vague score.',
    flowThreeTitle: 'Read the pattern',
    flowThreeText: 'AI reports summarize what changed and which habit is worth testing next.',
    flowFourTitle: 'Wake better',
    flowFourText: 'Alarm tools are tied to the real night, so mornings feel less random.',
    premiumMockTitle: 'Premium insight',
    premiumMockText: 'Your last 7 nights show later noise and shorter deep rest.',
    premiumMockOne: 'Earlier wind-down target',
    premiumMockTwo: 'AI morning explanation',
    premiumMockThree: 'Trend-based alarm context',
    premiumEyebrow: 'PREMIUM THAT EARNS ITS PLACE',
    premiumTitle: 'Not more dashboards. Better decisions.',
    premiumText: 'Premium should feel like a sleep analyst beside the app: plain-language reports, pattern changes, and habit suggestions that are specific enough to try tonight.',
    premiumPillOne: 'AI reports',
    premiumPillTwo: 'Trend summaries',
    premiumPillThree: 'Robokassa checkout',
    pricingEyebrow: 'PREMIUM ACCESS',
    pricingTitle: 'Digital subscription for sleep reports.',
    pricingText: 'Premium unlocks AI weekly reports, extended audio event history, sleep trend summaries, and premium sleep sounds inside the Android app.',
    priceMonthlyLabel: 'Monthly',
    priceMonthlyText: '30 days of Premium access after payment confirmation.',
    priceYearlyLabel: 'Yearly',
    priceYearlyText: '366 days of Premium access after payment confirmation.',
    priceDeliveryLabel: 'Delivery',
    priceDeliveryValue: 'Digital',
    priceDeliveryText: 'No physical delivery. Premium is activated in the app after payment provider confirmation.',
    privacyEyebrow: 'PRIVACY FIRST',
    privacyTitle: 'Sleep data is intimate. Treat it that way.',
    privacyOneTitle: 'Clear recording control',
    privacyOneText: 'The product language tells users when recording is active and why each permission exists.',
    privacyTwoTitle: 'No ad-tech story',
    privacyTwoText: 'A sleep app should not feel like a data broker. The site makes that trust promise visible.',
    privacyThreeTitle: 'AI with boundaries',
    privacyThreeText: 'Reports are framed as guidance, not medical diagnosis, with legal pages one tap away.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Answers before install.',
    faqOneQ: 'What does the AI coach actually do?',
    faqOneA: 'It summarizes sleep sessions, highlights repeated patterns, and suggests one practical change instead of dumping raw charts on you.',
    faqTwoQ: 'Is this a medical app?',
    faqTwoA: 'No. Sleep Tracker AI is a wellness and productivity tool. It can help you notice patterns, but it is not a diagnosis or treatment device.',
    faqThreeQ: 'How do I install the Android APK?',
    faqThreeA: 'Download the APK, open it on your Android device, and allow installation from this browser if Android asks. iOS remains App Store-only.',
    faqFourQ: 'What makes it different from a timer?',
    faqFourA: 'The app keeps the night context: recordings, events, wake-up behavior, and AI explanations that connect them.',
    downloadEyebrow: 'GET THE APP',
    downloadTitle: 'Install the Android beta APK.',
    downloadText: 'Android APK distribution is direct from this site. iOS remains inside the App Store flow when available.',
    androidShort: 'Download APK',
    iosShort: 'iOS soon',
    footerSeller: 'Sleep Tracker AI · Contacts and seller requisites',
    footerOffer: 'Offer',
    footerRefund: 'Refund',
    footerContacts: 'Contacts',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
  },
  ru: {
    title: 'Sleep Tracker AI',
    description: 'Sleep Tracker AI записывает сон, будит умнее и превращает данные в простые советы.',
    image: 'assets/app-screen-ru.jpg',
    navFeatures: 'Функции',
    navCoach: 'AI-коуч',
    navPrivacyBlock: 'Доверие',
    navPricing: 'Цены',
    navDownload: 'Скачать',
    navPrivacy: 'Документы',
    heroEyebrow: 'ANDROID BETA APK ДОСТУПЕН',
    heroLead: 'Запись сна, умный будильник и AI-коуч в одном спокойном приложении.',
    androidButton: 'Скачать Android APK',
    iosButton: 'App Store скоро',
    heroPointOne: 'Аудио-события вместо догадок',
    heroPointTwo: 'Контекст для будильника',
    heroPointThree: 'AI следующие шаги',
    scroll: 'Скролл',
    stripApk: 'Android beta APK',
    stripCrypto: 'RUB оплата через Robokassa',
    stripAi: 'AI отчеты',
    stripAndroid: 'от 990 ₽/мес',
    featuresEyebrow: 'ЧТО ВНУТРИ',
    featuresTitle: 'Короткое приложение. Полезно каждое утро.',
    cardOneTitle: 'Записывает ночи',
    cardOneText: 'Сохраняет сессии сна, аудио-события и контекст пробуждения без перегруженных экранов.',
    cardTwoTitle: 'Будит умнее',
    cardTwoText: 'Будильник и sleep-инструменты завязаны на реальную ночь, а не на обычный таймер.',
    cardThreeTitle: 'Объясняет паттерны',
    cardThreeText: 'Premium добавляет AI-отчеты, которые переводят сырые данные в понятные следующие шаги.',
    coachEyebrow: 'AI ЗЕРКАЛО СНА',
    coachTitle: 'Ночь становится понятной.',
    coachText: 'Sleep Tracker AI превращает записи, время пробуждения и повторяющиеся паттерны в спокойный утренний отчет с практичными шагами.',
    boardTitle: 'Утренний отчет',
    insightOneTitle: 'Сон рвался после 04:10',
    insightOneText: 'Аудио-всплески собрались ближе к концу ночи.',
    insightTwoTitle: 'Лучшее окно подъема',
    insightTwoText: 'Будильник ощущается мягче после спокойного интервала.',
    insightThreeTitle: 'Фокус на сегодня',
    insightThreeText: 'Сохранить время сна и уменьшить поздний шум.',
    flowEyebrow: 'КАК РАБОТАЕТ',
    flowTitle: 'Записать. Найти. Объяснить. Улучшить.',
    flowOneTitle: 'Запустить ночь',
    flowOneText: 'Приложение записывает сессию сна и не перегружает интерфейс, когда вы уже в кровати.',
    flowTwoTitle: 'Поймать события',
    flowTwoText: 'Храп, шум и контекст пробуждения превращаются в таймлайн, а не в расплывчатую оценку.',
    flowThreeTitle: 'Прочитать паттерн',
    flowThreeText: 'AI-отчеты показывают, что изменилось и какую привычку стоит проверить следующей.',
    flowFourTitle: 'Проснуться лучше',
    flowFourText: 'Инструменты будильника завязаны на реальную ночь, поэтому утро меньше похоже на случайность.',
    premiumMockTitle: 'Premium инсайт',
    premiumMockText: 'Последние 7 ночей показывают поздний шум и меньше глубокого отдыха.',
    premiumMockOne: 'Ранний wind-down ориентир',
    premiumMockTwo: 'AI объяснение утром',
    premiumMockThree: 'Контекст будильника по трендам',
    premiumEyebrow: 'PREMIUM С ПОНЯТНОЙ ЦЕННОСТЬЮ',
    premiumTitle: 'Не больше дашбордов. Лучше решения.',
    premiumText: 'Premium должен ощущаться как sleep-аналитик рядом с приложением: простые отчеты, изменения паттернов и советы по привычкам, которые можно проверить уже сегодня.',
    premiumPillOne: 'AI отчеты',
    premiumPillTwo: 'Сводки по трендам',
    premiumPillThree: 'Robokassa оплата',
    pricingEyebrow: 'PREMIUM-ДОСТУП',
    pricingTitle: 'Цифровая подписка для отчетов о сне.',
    pricingText: 'Premium открывает недельные AI-отчеты, расширенную историю аудио-событий, сводки по трендам сна и premium-звуки внутри Android-приложения.',
    priceMonthlyLabel: 'Месячный',
    priceMonthlyText: '30 дней Premium-доступа после подтверждения оплаты.',
    priceYearlyLabel: 'Годовой',
    priceYearlyText: '366 дней Premium-доступа после подтверждения оплаты.',
    priceDeliveryLabel: 'Получение',
    priceDeliveryValue: 'Цифровое',
    priceDeliveryText: 'Физической доставки нет. Premium активируется в приложении после подтверждения платежным провайдером.',
    privacyEyebrow: 'PRIVACY FIRST',
    privacyTitle: 'Данные сна интимны. Так к ним и относимся.',
    privacyOneTitle: 'Понятный контроль записи',
    privacyOneText: 'Текст продукта объясняет, когда запись активна и зачем нужно каждое разрешение.',
    privacyTwoTitle: 'Без ad-tech ощущения',
    privacyTwoText: 'Sleep-приложение не должно выглядеть как брокер данных. Сайт делает это обещание видимым.',
    privacyThreeTitle: 'AI с границами',
    privacyThreeText: 'Отчеты подаются как рекомендации, а не медицинский диагноз; юридические страницы рядом.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Ответы до установки.',
    faqOneQ: 'Что реально делает AI-коуч?',
    faqOneA: 'Он суммирует сессии сна, подсвечивает повторяющиеся паттерны и предлагает одно практичное изменение вместо потока сырых графиков.',
    faqTwoQ: 'Это медицинское приложение?',
    faqTwoA: 'Нет. Sleep Tracker AI - wellness и productivity инструмент. Он помогает замечать паттерны, но не ставит диагноз и не лечит.',
    faqThreeQ: 'Как установить Android APK?',
    faqThreeA: 'Скачайте APK, откройте его на Android-устройстве и разрешите установку из браузера, если Android попросит. iOS остается только через App Store.',
    faqFourQ: 'Чем это отличается от таймера?',
    faqFourA: 'Приложение сохраняет контекст ночи: записи, события, поведение пробуждения и AI-объяснения, которые связывают все вместе.',
    downloadEyebrow: 'СКАЧАТЬ',
    downloadTitle: 'Установите Android beta APK.',
    downloadText: 'Android APK распространяется напрямую с сайта. iOS останется внутри App Store, когда будет доступен.',
    androidShort: 'Скачать APK',
    iosShort: 'iOS скоро',
    footerSeller: 'Sleep Tracker AI · Контакты и реквизиты продавца',
    footerOffer: 'Оферта',
    footerRefund: 'Возврат',
    footerContacts: 'Контакты',
    footerPrivacy: 'Privacy',
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
