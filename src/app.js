import Cookies from '../node_modules/js-cookie/dist/js.cookie';
import {setDemoCookies} from './demo';
import './scss/styles.scss';


setDemoCookies();



const cookieConsenti18n = {};
const cookieConsentOptions = {
    mainElement: "gdpr-banner",
    accept: 'gdpr-banner-accept',
    decline: 'gdpr-banner-decline',
    edit: 'gdpr-banner-edit',
    cookies:{},
    scripts:{}
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

