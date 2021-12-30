
import Cookies from '../node_modules/js-cookie/dist/js.cookie';
import { setDemoCookies, showDemoCookies, removeDemoCookies } from './demo';
import './scss/styles.scss';


setDemoCookies();



const cookieConsenti18n = {};
const cookieConsentOptions = {
    mainElement: "gdpr-banner",
    accept: 'gdpr-banner-accept',
    decline: 'gdpr-banner-decline',
    edit: 'gdpr-banner-edit',
    cookies: ['_gat_gtag_UA_338528_1', '_ga', '_gid', 'testscript'],
    scripts: {
        head: ['https://www.googletagmanager.com/gtag/js?id=UA-338528-1', 
        'https://www.googletagservices.com/tag/js/gpt.js',
        'https://www.google-analytics.com/analytics.js', 
        'https://securepubads.g.doubleclick.net/gpt/pubads_impl_2021120601.js',
        'https://dev.restposten24.de/tmp/cookieconsent2/src/testcookie.js'], body: []
    }
};

/* bindings */
const bannerAcceptButton = document.getElementById(cookieConsentOptions.accept);
const bannerDeclineButton = document.getElementById(cookieConsentOptions.decline);
const bannerEditButton = document.getElementById(cookieConsentOptions.edit);
const bannerMainElement = document.getElementById(cookieConsentOptions.mainElement);

const openCookieConsent = () => {
    bannerMainElement.classList.remove("gdpr-cookieconsent-hidden");
    bannerMainElement.classList.add("gdpr-cookieconsent-show");
}

const closeCookieConsent = () => {
    bannerMainElement.classList.remove("gdpr-cookieconsent-show");
    bannerMainElement.classList.add("gdpr-cookieconsent-hidden");
}

bannerAcceptButton.addEventListener('click', e => {
    e.preventDefault();
    closeCookieConsent();
    console.log('klicked accept ', e);
});

bannerDeclineButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('klicked ', e);
});

bannerEditButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('klicked ', e);
});

const showAllCookies = () => {
    const Cookies = document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        return { ...cookies, [name]: value };
    }, {});

    return JSON.stringify(Cookies);
}

const deleteAllCookies = () => {
    const allCookies = JSON.parse(showAllCookies());
    Object.entries(allCookies).forEach(([key, value]) => {
        Cookies.remove(key, { path: '/', domain: '.restposten24.de' });
        console.log(window.location.pathname);
        Cookies.remove(key, {
            path: window.location.pathname, domain: window.location.hostname });
    });
}

const removeScripts = () => {

    const allLoadedScripts = document.querySelectorAll("script");
    const head = document.getElementsByTagName('head');
    const body = document.getElementsByTagName('body');

    allLoadedScripts.forEach((val, key) => {
        if (val.src !== '') {
            if (cookieConsentOptions.scripts.body.includes(val.src)) {
                body[0].removeChild(allLoadedScripts[key]);
            }
            if (cookieConsentOptions.scripts.head.includes(val.src)) {
                head[0].removeChild(allLoadedScripts[key]);
            }
        }
    });
    // console.log(getScripts());
}
const getScripts = () => {
    return JSON.stringify(cookieConsentOptions.scripts);
}

const removeCookiesAndScripts = () => {
    removeScripts();
    deleteAllCookies()
}

export {
    showDemoCookies,
    removeDemoCookies,
    showAllCookies,
    deleteAllCookies,
    removeScripts,
    getScripts,
    removeCookiesAndScripts 
};

