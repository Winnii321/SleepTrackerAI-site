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
    description: 'Sleep Tracker AI records your night, catches snoring and noise, and shows what happened before you woke up tired.',
    image: 'assets/app-screen-en.jpg',
    navFeatures: 'Features',
    navReports: 'Reports',
    navPrivacyBlock: 'Data',
    navPricing: 'Pricing',
    navDownload: 'Download',
    navPrivacy: 'Legal',
    heroEyebrow: 'ANDROID BETA APK AVAILABLE',
    heroLead: 'Record the night. Hear the loud moments. See what broke your sleep.',
    androidButton: 'Download Android APK',
    iosButton: 'App Store soon',
    heroPointOne: 'Snoring and night noise',
    heroPointTwo: 'Alarm with night context',
    heroPointThree: 'Weekly sleep report',
    scroll: 'Scroll',
    stripApk: 'Android beta APK',
    stripCrypto: 'RUB checkout via Robokassa',
    stripAi: 'night history',
    stripAndroid: 'from 990 RUB/month',
    featuresEyebrow: 'WHAT IT DOES',
    featuresTitle: 'A sleep app that proves itself in the morning.',
    cardOneTitle: 'Records nights',
    cardOneText: 'Starts a night recording, catches loud moments, and keeps them in a timeline you can check in the morning.',
    cardTwoTitle: 'Wakes with context',
    cardTwoText: 'The alarm sits next to the sleep record, so the morning starts with what actually happened.',
    cardThreeTitle: 'Shows the repeaters',
    cardThreeText: 'Premium keeps longer history and shows which problems keep coming back.',
    reportEyebrow: 'NIGHT REPORT',
    reportTitle: 'See the night, not just a score.',
    reportText: 'Sleep Tracker AI shows when the night got loud, what repeated, and what is worth changing tonight.',
    boardTitle: 'Night report',
    reportOneTitle: 'Noise after 04:10',
    reportOneText: 'The loudest moments came near the end of the night.',
    reportTwoTitle: 'Better wake window',
    reportTwoText: 'The alarm is easier when it follows a calmer stretch.',
    reportThreeTitle: "Tonight's job",
    reportThreeText: 'Keep bedtime steady and cut the late noise.',
    flowEyebrow: 'HOW IT WORKS',
    flowTitle: 'Record. Hear. Fix.',
    flowOneTitle: 'Start a night',
    flowOneText: 'Start the recording and put the phone down. The app stays out of the way.',
    flowTwoTitle: 'Catch events',
    flowTwoText: 'Snoring, talking, knocks, and wake-ups become a timeline, not a vague score.',
    flowThreeTitle: 'Spot the repeaters',
    flowThreeText: 'Reports show what keeps coming back across nights.',
    flowFourTitle: 'Wake better',
    flowFourText: 'The alarm and report live together, so mornings feel less random.',
    premiumMockTitle: '7-night report',
    premiumMockText: 'Your last 7 nights show late noise and shorter deep rest.',
    premiumMockOne: 'Put the phone away earlier',
    premiumMockTwo: 'Morning breakdown',
    premiumMockThree: 'Alarm after calmer sleep',
    premiumEyebrow: 'PREMIUM',
    premiumTitle: 'More history. More audio. Better answers.',
    premiumText: 'Premium opens weekly reports, longer audio history, and the sleep details that are easy to miss after one night.',
    premiumPillOne: 'Weekly reports',
    premiumPillTwo: 'Repeated problems',
    premiumPillThree: 'Robokassa checkout',
    pricingEyebrow: 'PREMIUM ACCESS',
    pricingTitle: 'Digital subscription for sleep reports.',
    pricingText: 'Premium unlocks weekly reports, extended audio event history, repeated problem summaries, and extra sleep sounds inside the Android app.',
    priceMonthlyLabel: 'Monthly',
    priceMonthlyText: '30 days of Premium access after payment confirmation.',
    priceYearlyLabel: 'Yearly',
    priceYearlyText: '366 days of Premium access after payment confirmation.',
    priceDeliveryLabel: 'Delivery',
    priceDeliveryValue: 'Digital',
    priceDeliveryText: 'No physical delivery. Premium is activated in the app after payment provider confirmation.',
    privacyEyebrow: 'DATA',
    privacyTitle: 'Night recordings need clear rules.',
    privacyOneTitle: 'Clear recording control',
    privacyOneText: 'The app tells you when recording is active and why each permission exists.',
    privacyTwoTitle: 'No ad machine',
    privacyTwoText: 'A sleep app should not feel like it was built to sell your night.',
    privacyThreeTitle: 'Not a doctor',
    privacyThreeText: 'Reports help you notice what happened. They do not diagnose or treat anything.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Answers before install.',
    faqOneQ: 'What do the reports show?',
    faqOneA: 'They show sleep sessions, loud moments, repeated issues, and one practical thing to test next.',
    faqTwoQ: 'Is this a medical app?',
    faqTwoA: 'No. It helps you notice sleep and noise patterns. It is not a diagnosis or treatment device.',
    faqThreeQ: 'How do I install the Android APK?',
    faqThreeA: 'Download the APK, open it on your Android device, and allow installation from this browser if Android asks. iOS remains App Store-only.',
    faqFourQ: 'What makes it different from a timer?',
    faqFourA: 'The app keeps the night context: recordings, events, wake-up behavior, and reports that connect them.',
    downloadEyebrow: 'GET THE APP',
    downloadTitle: 'Install the Android beta APK.',
    downloadText: 'Android APK distribution is direct from this site. iOS remains inside the App Store flow when available.',
    androidShort: 'Download APK',
    iosShort: 'iOS soon',
    footerSeller: '© 2026 Dmitrii Evseev. All rights reserved.',
    footerOffer: 'Offer',
    footerRefund: 'Refund',
    footerContacts: 'Contacts',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
  },
  ru: {
    title: 'Sleep Tracker AI',
    description: 'Sleep Tracker AI записывает ночь, ловит храп и шум, а утром показывает, что происходило.',
    image: 'assets/app-screen-ru.jpg',
    navFeatures: 'Функции',
    navReports: 'Отчеты',
    navPrivacyBlock: 'Данные',
    navPricing: 'Цены',
    navDownload: 'Скачать',
    navPrivacy: 'Документы',
    heroEyebrow: 'ANDROID BETA APK ДОСТУПЕН',
    heroLead: 'Запиши ночь. Услышь громкие моменты. Пойми, что ломало сон.',
    androidButton: 'Скачать Android APK',
    iosButton: 'App Store скоро',
    heroPointOne: 'Храп и ночной шум',
    heroPointTwo: 'Будильник с контекстом ночи',
    heroPointThree: 'Недельный отчет',
    scroll: 'Скролл',
    stripApk: 'Android beta APK',
    stripCrypto: 'RUB оплата через Robokassa',
    stripAi: 'история ночей',
    stripAndroid: 'от 990 ₽/мес',
    featuresEyebrow: 'ЧТО ВНУТРИ',
    featuresTitle: 'Приложение должно доказать пользу утром.',
    cardOneTitle: 'Записывает ночи',
    cardOneText: 'Запускает запись, ловит громкие моменты и складывает их в таймлайн, который можно проверить утром.',
    cardTwoTitle: 'Будит с контекстом',
    cardTwoText: 'Будильник стоит рядом с записью сна, поэтому утро начинается с фактов, а не с догадок.',
    cardThreeTitle: 'Показывает повторы',
    cardThreeText: 'Premium хранит больше истории и показывает, какие проблемы возвращаются снова.',
    reportEyebrow: 'ОТЧЕТ НОЧИ',
    reportTitle: 'Видишь ночь, а не только оценку.',
    reportText: 'Sleep Tracker AI показывает, когда ночью было громко, что повторялось и что стоит изменить сегодня.',
    boardTitle: 'Отчет ночи',
    reportOneTitle: 'Шум после 04:10',
    reportOneText: 'Самые громкие моменты пришлись на конец ночи.',
    reportTwoTitle: 'Лучшее окно подъема',
    reportTwoText: 'Будильник легче переносится после спокойного отрезка.',
    reportThreeTitle: 'Задача на сегодня',
    reportThreeText: 'Держать время сна и убрать поздний шум.',
    flowEyebrow: 'КАК РАБОТАЕТ',
    flowTitle: 'Записать. Услышать. Исправить.',
    flowOneTitle: 'Запустить ночь',
    flowOneText: 'Запускаешь запись и кладешь телефон рядом. Приложение не мешает.',
    flowTwoTitle: 'Поймать события',
    flowTwoText: 'Храп, разговоры, стуки и пробуждения попадают в таймлайн, а не теряются в общей оценке.',
    flowThreeTitle: 'Увидеть повторы',
    flowThreeText: 'Отчеты показывают, что возвращается из ночи в ночь.',
    flowFourTitle: 'Проснуться лучше',
    flowFourText: 'Будильник и отчет живут вместе, поэтому утро меньше похоже на случайность.',
    premiumMockTitle: 'Отчет за 7 ночей',
    premiumMockText: 'Последние 7 ночей показывают поздний шум и меньше глубокого отдыха.',
    premiumMockOne: 'Раньше отложить телефон',
    premiumMockTwo: 'Утренний разбор',
    premiumMockThree: 'Будильник после спокойного сна',
    premiumEyebrow: 'PREMIUM',
    premiumTitle: 'Больше истории. Больше аудио. Больше ответов.',
    premiumText: 'Premium открывает недельные отчеты, длинную историю звуков и детали сна, которые легко пропустить по одной ночи.',
    premiumPillOne: 'Недельные отчеты',
    premiumPillTwo: 'Повторяющиеся проблемы',
    premiumPillThree: 'Robokassa оплата',
    pricingEyebrow: 'PREMIUM-ДОСТУП',
    pricingTitle: 'Цифровая подписка для отчетов о сне.',
    pricingText: 'Premium открывает недельные отчеты, расширенную историю аудио-событий, сводки по повторяющимся проблемам и дополнительные звуки для сна внутри Android-приложения.',
    priceMonthlyLabel: 'Месячный',
    priceMonthlyText: '30 дней Premium-доступа после подтверждения оплаты.',
    priceYearlyLabel: 'Годовой',
    priceYearlyText: '366 дней Premium-доступа после подтверждения оплаты.',
    priceDeliveryLabel: 'Получение',
    priceDeliveryValue: 'Цифровое',
    priceDeliveryText: 'Физической доставки нет. Premium активируется в приложении после подтверждения платежным провайдером.',
    privacyEyebrow: 'ДАННЫЕ',
    privacyTitle: 'У ночных записей должны быть понятные правила.',
    privacyOneTitle: 'Понятный контроль записи',
    privacyOneText: 'Приложение показывает, когда идет запись и зачем нужно каждое разрешение.',
    privacyTwoTitle: 'Без рекламной машины',
    privacyTwoText: 'Приложение про сон не должно выглядеть так, будто его сделали для продажи твоей ночи.',
    privacyThreeTitle: 'Не врач',
    privacyThreeText: 'Отчеты помогают заметить, что происходило. Они не ставят диагноз и не лечат.',
    faqEyebrow: 'FAQ',
    faqTitle: 'Ответы до установки.',
    faqOneQ: 'Что показывают отчеты?',
    faqOneA: 'Сессии сна, громкие моменты, повторяющиеся проблемы и одну вещь, которую можно проверить следующей ночью.',
    faqTwoQ: 'Это медицинское приложение?',
    faqTwoA: 'Нет. Приложение помогает замечать сон и ночной шум. Это не диагностика и не лечение.',
    faqThreeQ: 'Как установить Android APK?',
    faqThreeA: 'Скачайте APK, откройте его на Android-устройстве и разрешите установку из браузера, если Android попросит. iOS остается только через App Store.',
    faqFourQ: 'Чем это отличается от таймера?',
    faqFourA: 'Приложение сохраняет контекст ночи: записи, события, пробуждение и отчеты, которые связывают все вместе.',
    downloadEyebrow: 'СКАЧАТЬ',
    downloadTitle: 'Установите Android beta APK.',
    downloadText: 'Android APK распространяется напрямую с сайта. iOS останется внутри App Store, когда будет доступен.',
    androidShort: 'Скачать APK',
    iosShort: 'iOS скоро',
    footerSeller: '© 2026 Dmitrii Evseev. All rights reserved.',
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
