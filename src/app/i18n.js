import i18n from 'i18next';

i18n
  .init({
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "Egypt": "Egypt",
          "Minimum": "Min",
          "Maximum": "Max",
          "English": "English",
          "Arabic": "Arabic",
          "clear sky": "Clear Sky",
          "Sun": "Sun",
          "Rain": "Rain",
        }
      },
      ar: {
        translation: {
          "Egypt": "مصر",
          "Minimum": "الصغرى",
          "Maximum": "الكبرى",
          "English": "انجليزية",
          "Arabic": "عربية",
          "clear sky": "سماء صافية",
          "Sun": "شمس",
          "Rain": "مطر",
        }
      }
    }
  });

export default i18n;
