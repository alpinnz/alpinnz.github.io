import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'id',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        ns: ['overview', 'timeline', 'about_me', 'skills', 'portfolio', 'navbar', 'footer'],
        defaultNS: 'overview',
        interpolation: {escapeValue: false}
    }).then(r => {
    console.log(r);
});

export default i18n;