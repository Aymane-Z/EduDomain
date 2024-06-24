import useLocalStore from 'hooks/useLocalStore';

const i18n = (() => {
    const localStore = useLocalStore(); // Adjust this part to not be a hook.
    const locale = localStore.getLocale() || process.env.REACT_APP_LOCALE;
    let messages = {};
    try {
        messages = require(`i18n/locales/${locale}.json`);
    } catch (err) {
        console.error(err);
    }

    return {
        locale,
        messages,
        t: function (key, args) {
            let value = key.split('.').reduce((p, c) => p?.[c], messages);
            if (value && args) {
                const names = Object.keys(args);
                const vals = Object.values(args);
                return new Function(...names, `return \`${value}\`;`)(...vals);
            }
            return value || key;
        }
    };
})();

const $t = i18n.t;

export { i18n, $t };