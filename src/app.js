
import Cookies from '../node_modules/js-cookie/dist/js.cookie';
//import Cookies from 'js-cookie';
import { showDemoCookies, removeDemoCookies } from './demo';
import './scss/templates/basic/styles.scss';


//setDemoCookies();
//const config = {template:'basic'};
//const cookieConsenti18n = {};


const cookieConsentOptions = {
    mainElement: "gdpr-banner",
    accept: 'gdpr-banner-accept',
    decline: 'gdpr-banner-decline',
    additional: 'gdpr-banner_additional',
    edit: 'gdpr-banner-edit',
    switchStatistics: 'gdpr-banner-switch-statistics',
    switchMarketing: 'gdpr-banner-switch-marketing',
    cookies: ['_gat_gtag_UA_338528_1', '_ga', '_gid', 'testscript'],
    scripts:
        ['https://www.googletagmanager.com/gtag/js?id=UA-338528-1',
            'https://www.googletagservices.com/tag/js/gpt.js',
            'https://www.google-analytics.com/analytics.js',
            'https://securepubads.g.doubleclick.net/gpt/pubads_impl_2021120601.js',
            'https://dev.restposten24.de/tmp/cookieconsent2/src/testcookie.js',
            'https://t.adcell.com/js/trad.js']

    ,
    gdprOptions: {
        consentCookie: { name: 'gdprConsent', default: false },
        consentState: { name: 'gdprConsentState', default: true },
    },
    i18n: {},
    cookieCategories: [{ category: 'neccesary', accepted: true }, 
                        { category: 'targeting', accepted: false },
                        { category: 'marketing', accepted: false }]
};


let targetOptions = {};

/* bindings */
const bannerAcceptButton = document.getElementById(cookieConsentOptions.accept);
const bannerDeclineButton = document.getElementById(cookieConsentOptions.decline);
const bannerEditButton = document.getElementById(cookieConsentOptions.edit);
const bannerMainElement = document.getElementById(cookieConsentOptions.mainElement);
const bannerAdditional = document.getElementById(cookieConsentOptions.additional);
const switchStatistics = document.getElementById(cookieConsentOptions.switchStatistics);
const switchMarketing = document.getElementById(cookieConsentOptions.switchMarketing);


switchStatistics.addEventListener('click', e => {
    // e.preventDefault();
    console.log('switchstatistics');
});

switchMarketing.addEventListener('click', e => {
    // e.preventDefault();
    console.log('switchMarketing');
});

const openCookieConsent = () => {
    bannerMainElement.classList.remove("gdpr-cookieconsent-hidden");
    bannerMainElement.classList.add("gdpr-cookieconsent-show");
}

const closeCookieConsent = () => {
    bannerMainElement.classList.remove("gdpr-cookieconsent-show");
    bannerMainElement.classList.add("gdpr-cookieconsent-hidden");
}

const openAdditional = () => {
    if (editModus == 'closed') {
        bannerAdditional.classList.remove("gdpr-cookieconsent-additional-hidden");
        bannerAdditional.classList.add("gdpr-cookieconsent-additional-show");
        editModus = 'open';
    } else {
        bannerAdditional.classList.remove("gdpr-cookieconsent-additional-show");
        bannerAdditional.classList.add("gdpr-cookieconsent-additional-hidden");
        editModus = 'closed';
    }

}

bannerAcceptButton.addEventListener('click', e => {
    e.preventDefault();
    closeCookieConsent();
    cookieConsentAcceptAll();
});

bannerDeclineButton.addEventListener('click', e => {
    e.preventDefault();
    closeCookieConsent();
    cookieConsentDeclineAll();
});

let editModus = 'closed';
bannerEditButton.addEventListener('click', e => {
    e.preventDefault();
    console.log('more');
    openAdditional();
});




const cookieConsentAcceptAll = () => {
    cookieConsentSetCookie(true);
    cookieConsentSetStateCookie('all');
    resetScripts();
}
const cookieConsentDeclineAll = () => {
    cookieConsentSetCookie(true);
    cookieConsentSetStateCookie('none');
    removeCookiesAndScripts();
}

const cookieConsentSetCookie = val => {
    Cookies.set(cookieConsentOptions.gdprOptions.consentCookie.name, val, { expires: 365, path: '/', sameSite: 'strict' });
}

const cookieConsentRemoveCookie = () => {
    Cookies.remove(cookieConsentOptions.gdprOptions.consentCookie.name, { path: '/' });
}

const cookieConsentSetStateCookie = (val = 'all') => {
    Cookies.set(cookieConsentOptions.gdprOptions.consentState.name, val, { expires: 365, path: '/', sameSite: 'Strict' });
}

const showAllCookies = () => {
    const Cookies = document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=').map(c => c.trim());
        return { ...cookies, [name]: value };
    }, {});

    return JSON.stringify(Cookies);
}

const deleteAllCookies = () => {
    const allCookies = JSON.parse(showAllCookies());
    Object.entries(allCookies).forEach(([key]) => {
        Cookies.remove(key, { path: '/', domain: `.${getDomain(window.location.origin, false)}` });
        Cookies.remove(key, { path: '/', domain: `${getDomain(window.location.origin, true)}` });
        Cookies.remove(key, {
            path: window.location.pathname, domain: window.location.hostname
        });
    });
}

const removeScripts = () => {

    const allLoadedScripts = document.querySelectorAll("script");

    const opt = document.querySelectorAll(".gdpr-opt");
    opt.forEach((val, key) => {
        opt[key].setAttribute('type', 'text');

    });

    allLoadedScripts.forEach((val, key) => {
        if (val.src !== '') {
            if (cookieConsentOptions.scripts.includes(val.src)) {
                allLoadedScripts[key].setAttribute('data-src', allLoadedScripts[key].src);
                allLoadedScripts[key].src = '';

            }
        }
    });
}

const resetScripts = () => {
    const allLoadedScripts = document.querySelectorAll("script");

    allLoadedScripts.forEach((val, key) => {
        if (cookieConsentOptions.scripts.includes(allLoadedScripts[key].getAttribute('data-src'))) {
            allLoadedScripts[key].src = allLoadedScripts[key].getAttribute('data-src');
            allLoadedScripts[key].removeAttribute('data-src');
            allLoadedScripts[key].removeAttribute('type');
        }
    });

    const opt = document.querySelectorAll(".gdpr-opt");
    let res;
    opt.forEach((val, key) => {
        opt[key].removeAttribute('type');
        opt[key].removeAttribute('src');
        Function(opt[key].innerText)();
    });

}

const getScripts = () => {
    return JSON.stringify(cookieConsentOptions.scripts);
}

const removeCookiesAndScripts = () => {
    removeScripts();
    deleteAllCookies()
}

const cookieConsentInit = () => {
    const cookieSet = Cookies.get(cookieConsentOptions.gdprOptions.consentCookie.name);
    const cookieSetState = Cookies.get(cookieConsentOptions.gdprOptions.consentState.name);

    if (typeof cookieSet === 'undefined') {
        openCookieConsent();
        cookieConsentSetStateCookie('all');
    } else if (cookieSet === 'true' && cookieSetState === 'none') {
        closeCookieConsent();
        removeScripts();
    } else {
        resetScripts();
        closeCookieConsent();
    }


}

const getDomain = (url, subdomain) => {
    subdomain = subdomain || false;

    url = url.replace(/(https?:\/\/)?(www.)?/i, '');

    if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
    }

    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }

    return url;
}

export {
    showDemoCookies,
    removeDemoCookies,
    showAllCookies,
    deleteAllCookies,
    removeScripts,
    getScripts,
    removeCookiesAndScripts,
    cookieConsentInit,
    cookieConsentRemoveCookie
};

