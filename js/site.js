const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderPercent = document.getElementById('loaderPercent');
const nav = document.querySelector('.nav');
const appPreview = document.getElementById('appPreview');
const langButtons = document.querySelectorAll('[data-lang]');
let apkReleaseManifest = null;

const RELEASE_EVENTS_ENDPOINT = 'https://qliouorzmcmzahgzrepu.supabase.co/functions/v1/release-events';
const SUPABASE_PUBLIC_KEY = 'sb_publishable_oyQkQoBL4LjDD0g_X_-R-Q_JgmrhUqx';
const WEB_INSTALL_ID_KEY = 'sleeptracker-web-install-id';
const LAST_DOWNLOAD_CLICK_ID_KEY = 'sleeptracker-last-download-click-id';

function randomId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateWebInstallId() {
  const existing = window.localStorage.getItem(WEB_INSTALL_ID_KEY);
  if (existing) return existing;
  const next = randomId();
  window.localStorage.setItem(WEB_INSTALL_ID_KEY, next);
  return next;
}

function recordReleaseEvent(eventType, properties = {}) {
  try {
    const body = JSON.stringify({
      eventType,
      installId: getOrCreateWebInstallId(),
      platform: 'web',
      currentVersionCode: null,
      targetVersionCode: apkReleaseManifest?.versionCode || null,
      versionName: apkReleaseManifest?.versionName || null,
      apkName: apkReleaseManifest?.apkName || null,
      source: 'website',
      properties,
    });
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(RELEASE_EVENTS_ENDPOINT, blob);
      return;
    }
    fetch(RELEASE_EVENTS_ENDPOINT, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLIC_KEY,
        'Content-Type': 'application/json',
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Download must not depend on metrics.
  }
}

const translations = {
  en: {
    title: 'Sleep Tracker AI',
    description: 'Sleep Tracker AI records your night, catches snoring and noise, and shows what happened before you woke up tired.',
    image: 'assets/app-screen-en.jpg',
    navFeatures: 'Features',
    navCoach: 'Sleep coach',
    navReports: 'Reports',
    navPrivacyBlock: 'Data',
    navPricing: 'Pricing',
    navDocuments: 'Docs',
    navDownload: 'Download',
    navPrivacy: 'Legal',
    navContacts: 'Contacts',
    navOffer: 'Offer',
    heroEyebrow: 'ANDROID BETA APK AVAILABLE',
    heroLead: 'Record the night. Hear the loud moments. See what broke your sleep.',
    androidButton: 'Download APK',
    iosButton: 'App Store soon',
    bugReportButton: 'Report a bug',
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
    coachEyebrow: 'SLEEP COACH',
    coachTitle: 'Your night, clearly understood.',
    coachText: 'Sleep Tracker AI turns recordings, wake-up time, and repeated patterns into a calm morning readout with practical next steps.',
    reportEyebrow: 'NIGHT REPORT',
    reportTitle: 'See the night, not just a score.',
    reportText: 'Sleep Tracker AI shows when the night got loud, what repeated, and what is worth changing tonight.',
    boardTitle: 'Night report',
    insightOneTitle: 'Noise after 04:10',
    insightOneText: 'The loudest moments came near the end of the night.',
    insightTwoTitle: 'Better wake window',
    insightTwoText: 'The alarm is easier when it follows a calmer stretch.',
    insightThreeTitle: "Tonight's job",
    insightThreeText: 'Keep bedtime steady and cut the late noise.',
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
    documentsEyebrow: 'DOCUMENTS AND PAYMENT',
    documentsTitle: 'Contacts, prices, terms, and refunds are public.',
    documentsText: 'Before payment, buyers can check who sells the service, what Premium includes, how much it costs, how access is provided, and how cancellation or refund requests work.',
    documentsContactsLabel: 'Contacts',
    documentsContactsTitle: 'Seller and support details',
    documentsContactsText: 'E-mail, store information, support rules, and seller requisites.',
    documentsOfferLabel: 'Offer',
    documentsOfferTitle: 'Service terms and prices',
    documentsOfferText: 'Premium description, monthly and yearly prices, activation rules, and buyer terms.',
    documentsRefundLabel: 'Refund',
    documentsRefundTitle: 'Cancellation and refund',
    documentsRefundText: 'How to request cancellation, what data to include, and how refunds are handled.',
    documentsPrivacyLabel: 'Privacy',
    documentsPrivacyTitle: 'Data rules',
    documentsPrivacyText: 'What data the app uses and how sleep recordings are treated.',
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
    faqThreeA: 'Download the APK, open it on your Android device, and follow the Android system prompts.',
    faqFourQ: 'What makes it different from a timer?',
    faqFourA: 'The app keeps the night context: recordings, events, wake-up behavior, and reports that connect them.',
    downloadEyebrow: 'GET THE APP',
    downloadTitle: 'Download Android APK.',
    downloadText: 'The latest Sleep Tracker AI Android build is here with version details, release notes, and file verification.',
    downloadVersionLabel: 'Version',
    downloadUpdatedLabel: 'Updated',
    downloadUpdatedValue: 'June 20, 2026',
    downloadSizeLabel: 'Size',
    downloadInstallNote: 'After download, open the APK on Android and follow the system prompts.',
    releaseHistoryTitle: 'Release history',
    releaseHistoryHint: 'Latest first',
    releaseHistoryLatest: 'Latest',
    releaseHistoryEmpty: 'Release notes are being prepared',
    releaseNotesTitle: "What's new",
    verifyFileTitle: 'Verify file',
    androidShort: 'Download APK',
    androidUnavailable: 'APK link pending',
    iosShort: 'iOS soon',
    bugReportShort: 'Report bug',
    bugReportTitle: 'Found a bug?',
    bugReportText: 'Before messaging, open Settings in the app, go to log diagnostics, export the log file, and send it with a short description. It helps move the beta faster.',
    bugReportTelegram: 'Message @DMITRIIWAY',
    footerSeller: '© 2026 Sleep Tracker AI. Seller: Bogdanova Anastasia Vasilievna.',
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
    navCoach: 'Куратор сна',
    navReports: 'Отчеты',
    navPrivacyBlock: 'Данные',
    navPricing: 'Цены',
    navDocuments: 'Документы',
    navDownload: 'Скачать',
    navPrivacy: 'Документы',
    navContacts: 'Контакты',
    navOffer: 'Оферта',
    heroEyebrow: 'ANDROID BETA APK ДОСТУПЕН',
    heroLead: 'Запиши ночь. Услышь громкие моменты. Пойми, что ломало сон.',
    androidButton: 'Скачать APK',
    iosButton: 'App Store скоро',
    bugReportButton: 'Сообщить о баге',
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
    coachEyebrow: 'КУРАТОР СНА',
    coachTitle: 'Ночь становится понятной.',
    coachText: 'Sleep Tracker AI связывает записи, время пробуждения и повторяющиеся события в спокойный утренний разбор с конкретными шагами.',
    reportEyebrow: 'ОТЧЕТ НОЧИ',
    reportTitle: 'Видишь ночь, а не только оценку.',
    reportText: 'Sleep Tracker AI показывает, когда ночью было громко, что повторялось и что стоит изменить сегодня.',
    boardTitle: 'Отчет ночи',
    insightOneTitle: 'Шум после 04:10',
    insightOneText: 'Самые громкие моменты пришлись на конец ночи.',
    insightTwoTitle: 'Лучшее окно подъема',
    insightTwoText: 'Будильник легче переносится после спокойного отрезка.',
    insightThreeTitle: 'Задача на сегодня',
    insightThreeText: 'Держать время сна и убрать поздний шум.',
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
    documentsEyebrow: 'ДОКУМЕНТЫ И ОПЛАТА',
    documentsTitle: 'Контакты, цены, условия и возврат открыты на сайте.',
    documentsText: 'До оплаты покупатель может проверить, кто продает услугу, что входит в Premium, сколько это стоит, как выдается доступ и как работает отказ от покупки или возврат.',
    documentsContactsLabel: 'Контакты',
    documentsContactsTitle: 'Продавец и поддержка',
    documentsContactsText: 'E-mail, данные магазина, правила поддержки и реквизиты продавца.',
    documentsOfferLabel: 'Оферта',
    documentsOfferTitle: 'Условия услуги и цены',
    documentsOfferText: 'Описание Premium, цены на месяц и год, правила активации и условия покупки.',
    documentsRefundLabel: 'Возврат',
    documentsRefundTitle: 'Отказ от покупки и возврат',
    documentsRefundText: 'Как запросить отмену, что указать в письме и как обрабатывается возврат.',
    documentsPrivacyLabel: 'Данные',
    documentsPrivacyTitle: 'Правила по данным',
    documentsPrivacyText: 'Какие данные использует приложение и как обрабатываются записи сна.',
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
    faqThreeA: 'Скачайте APK, откройте его на Android-устройстве и следуйте подсказкам Android.',
    faqFourQ: 'Чем это отличается от таймера?',
    faqFourA: 'Приложение сохраняет контекст ночи: записи, события, пробуждение и отчеты, которые связывают все вместе.',
    downloadEyebrow: 'СКАЧАТЬ',
    downloadTitle: 'Скачать Android APK.',
    downloadText: 'Здесь лежит свежая Android-сборка Sleep Tracker AI: версия, дата, что изменилось и проверка файла.',
    downloadVersionLabel: 'Версия',
    downloadUpdatedLabel: 'Обновлено',
    downloadUpdatedValue: '20 июня 2026 г.',
    downloadSizeLabel: 'Размер',
    downloadInstallNote: 'После скачивания откройте APK на Android и следуйте подсказкам системы.',
    releaseHistoryTitle: 'История версий',
    releaseHistoryHint: 'Сначала новая',
    releaseHistoryLatest: 'Последняя',
    releaseHistoryEmpty: 'Описание версии готовится',
    releaseNotesTitle: 'Что нового',
    verifyFileTitle: 'Проверить файл',
    androidShort: 'Скачать APK',
    androidUnavailable: 'APK-ссылка готовится',
    iosShort: 'iOS скоро',
    bugReportShort: 'Сообщить о баге',
    bugReportTitle: 'Нашли баг?',
    bugReportText: 'Перед сообщением откройте настройки приложения, зайдите в диагностику логов, экспортируйте файл и отправьте его вместе с коротким описанием. Это очень помогает быстрее довести beta-тест.',
    bugReportTelegram: 'Написать @DMITRIIWAY',
    footerSeller: '© 2026 Sleep Tracker AI. Продавец: Богданова Анастасия Васильевна.',
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
  if (apkReleaseManifest) applyApkRelease(apkReleaseManifest);
}

const savedLang = window.localStorage.getItem('sleeptracker-lang');
const browserLang = navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en';
setLanguage(savedLang || browserLang);

langButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

function formatReleaseDate(value) {
  if (!value) return '';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value))
    ? new Date(Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, Number(value.slice(8, 10)))
    : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const lang = document.documentElement.lang === 'ru' ? 'ru-RU' : 'en-US';
  return new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function changelogItems(manifest, limit = 3) {
  const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const localized = lang === 'ru' ? manifest.changelogRu : manifest.changelogEn;
  const fallback = manifest.changelog;
  return (Array.isArray(localized) ? localized : Array.isArray(fallback) ? fallback : [])
    .filter(Boolean)
    .slice(0, limit);
}

function releaseSummary(release) {
  const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
  const summary = release.summary;
  if (summary && typeof summary === 'object' && summary[lang]) return summary[lang];
  const localized = lang === 'ru' ? release.summaryRu : release.summaryEn;
  if (localized) return localized;
  const items = changelogItems(release);
  return items[0] || '';
}

function displayVersionName(release) {
  return release?.publicVersionName || release?.displayVersionName || release?.versionName || '';
}

function mergeTextArray(primary, secondary) {
  const merged = [];
  [...(Array.isArray(primary) ? primary : []), ...(Array.isArray(secondary) ? secondary : [])]
    .filter(Boolean)
    .forEach((item) => {
      if (!merged.includes(item)) merged.push(item);
    });
  return merged;
}

function releaseHistoryItems(manifest) {
  const releases = Array.isArray(manifest.releases)
    ? manifest.releases.filter((item) => item && item.versionCode)
    : [];
  const current = {
    ...manifest,
    id: `${manifest.versionName || 'latest'}-${manifest.versionCode || '0'}`,
    lifecycle: 'latest',
  };
  const byCode = new Map();
  releases.forEach((item) => byCode.set(String(item.versionCode), item));
  if (manifest.versionCode) byCode.set(String(manifest.versionCode), { ...byCode.get(String(manifest.versionCode)), ...current });
  const byVersion = new Map();
  [...byCode.values()]
    .sort((a, b) => numSafe(b.versionCode) - numSafe(a.versionCode))
    .forEach((item) => {
      const publicName = displayVersionName(item);
      const key = publicName || String(item.versionCode);
      const existing = byVersion.get(key);
      if (!existing) {
        byVersion.set(key, {
          ...item,
          versionName: publicName || item.versionName,
          technicalVersionName: item.versionName,
          versionCodes: [item.versionCode].filter(Boolean),
        });
        return;
      }
      existing.versionCodes = mergeTextArray(existing.versionCodes, [item.versionCode]);
      existing.changelog = mergeTextArray(existing.changelog, item.changelog);
      existing.changelogEn = mergeTextArray(existing.changelogEn, item.changelogEn);
      existing.changelogRu = mergeTextArray(existing.changelogRu, item.changelogRu);
      existing.fullChangelogEn = mergeTextArray(existing.fullChangelogEn, item.fullChangelogEn);
      existing.fullChangelogRu = mergeTextArray(existing.fullChangelogRu, item.fullChangelogRu);
    });
  return [...byVersion.values()].sort((a, b) => numSafe(b.versionCode) - numSafe(a.versionCode)).slice(0, 6);
}

function numSafe(value) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function renderReleaseHistory(manifest) {
  const notes = document.querySelector('[data-release-notes]');
  const list = document.querySelector('[data-release-history-list]');
  if (!notes || !list) return;
  list.replaceChildren();
  const dict = translations[document.documentElement.lang] || translations.en;
  const releases = releaseHistoryItems(manifest);
  releases.forEach((release, index) => {
    const li = document.createElement('li');
    li.className = index === 0 ? 'release-entry is-latest' : 'release-entry';

    const top = document.createElement('div');
    top.className = 'release-entry-top';

    const version = document.createElement('strong');
    version.className = 'release-version';
    version.textContent = displayVersionName(release) || '—';
    top.appendChild(version);

    if (index === 0) {
      const badge = document.createElement('span');
      badge.className = 'release-badge';
      badge.textContent = dict.releaseHistoryLatest;
      top.appendChild(badge);
    }

    const formattedDate = formatReleaseDate(release.releaseDate || release.updatedAt || release.createdAt);
    if (formattedDate) {
      const date = document.createElement('span');
      date.className = 'release-date';
      date.textContent = formattedDate;
      top.appendChild(date);
    }

    li.appendChild(top);

    const bullets = changelogItems(release, index === 0 ? 3 : 2);
    const ul = document.createElement('ul');
    (bullets.length ? bullets : [releaseSummary(release) || dict.releaseHistoryEmpty]).forEach((item) => {
      const bullet = document.createElement('li');
      bullet.textContent = item;
      ul.appendChild(bullet);
    });
    li.appendChild(ul);

    list.appendChild(li);
  });
}

function applyApkRelease(manifest) {
  const download = document.getElementById('androidDownload');
  const dict = translations[document.documentElement.lang] || translations.en;
  if (download) {
    const publicVersion = displayVersionName(manifest);
    if (manifest.apkUrl) {
      download.href = manifest.apkUrl;
      download.removeAttribute('rel');
      download.removeAttribute('aria-disabled');
      download.setAttribute('download', publicVersion ? `sleeptrackerai-${publicVersion}.apk` : 'sleeptrackerai.apk');
      download.textContent = dict.androidShort;
      download.onclick = () => {
        const downloadClickId = randomId();
        window.localStorage.setItem(LAST_DOWNLOAD_CLICK_ID_KEY, downloadClickId);
        recordReleaseEvent('download_clicked', {
          downloadClickId,
          apkUrl: manifest.apkUrl,
          versionCode: manifest.versionCode || null,
          versionName: manifest.versionName || null,
          publicVersionName: publicVersion || null,
          apkName: manifest.apkName || null,
        });
      };
    } else {
      download.href = 'https://t.me/DMITRIIWAY';
      download.rel = 'noopener noreferrer';
      download.setAttribute('aria-disabled', 'true');
      download.removeAttribute('download');
      download.textContent = dict.androidUnavailable;
      download.onclick = null;
    }
  }
  const publicVersion = displayVersionName(manifest);
  if (publicVersion) {
    const versionNode = document.querySelector('[data-apk-version]');
    if (versionNode) versionNode.textContent = publicVersion;
    const stripVersionNode = document.querySelector('[data-strip-version]');
    if (stripVersionNode) stripVersionNode.textContent = publicVersion;
  }
  if (manifest.sizeLabel) {
      const sizeNode = document.querySelector('[data-apk-size]');
      if (sizeNode) sizeNode.textContent = manifest.sizeLabel;
  }
  if (manifest.releaseDate || manifest.updatedAt) {
    const updatedNode = document.querySelector('[data-i18n="downloadUpdatedValue"]');
    const formatted = formatReleaseDate(manifest.releaseDate || manifest.updatedAt);
    if (updatedNode && formatted) updatedNode.textContent = formatted;
  }
  if (manifest.package) {
    const packageNode = document.querySelector('[data-apk-package]');
    if (packageNode) packageNode.textContent = manifest.package;
  }
  if (manifest.sha256) {
    const shaNode = document.querySelector('[data-apk-sha]');
    if (shaNode) shaNode.textContent = manifest.sha256;
  }
  if (manifest.signerSha256) {
      const signerNode = document.querySelector('[data-apk-signer]');
      if (signerNode) signerNode.textContent = manifest.signerSha256;
  }
  renderReleaseHistory(manifest);
}

async function hydrateApkRelease() {
  try {
    const response = await fetch('apk-release.json', { cache: 'no-store' });
    if (!response.ok) return;
    const manifest = await response.json();
    apkReleaseManifest = manifest;
    applyApkRelease(manifest);
  } catch {
    // Keep Telegram fallback when metadata cannot be loaded.
  }
}

hydrateApkRelease();

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
