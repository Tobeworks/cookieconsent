const setDemoCookies = () =>{
    Cookies.set('foo', { foo: 'bar' });
    Cookies.set('foo', { foo: 'bar' });
    console.log(Cookies.get('foo').foo);
}
const removeDemoCookies = () => {}

const showDemoCookies = () => {
    
}

export {removeDemoCookies, setDemoCookies}