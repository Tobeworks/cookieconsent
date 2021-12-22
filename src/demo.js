import Cookies from '../node_modules/js-cookie/dist/js.cookie';

const demoCookies = {
    foo: JSON.stringify({ foo: 'bar', baz: 'bar', name: 'Tobias' }),
    bar: 'baz',
    demoCookies: 'gdu3458dfgdfgk dfg dfgkdfgd fgkfg '
};

const setDemoCookies = () => {
    Object.entries(demoCookies).forEach(([key, value]) => { 
        Cookies.set(key, value);
    });
}
const removeDemoCookies = () => {
    Object.entries(demoCookies).forEach(([key, value]) => {
        Cookies.remove(key);
    });
}

const showDemoCookies = () => {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i - 1] + "\n";
    }
    return aString;

}

export { removeDemoCookies, setDemoCookies, showDemoCookies }