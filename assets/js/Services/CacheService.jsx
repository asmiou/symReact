const cache ={};

/**
 *
 * @param key
 * @param data
 */
function set(key, data) {
    let date = new Date();
    let duration = 15;
    cache[key]={
        data,
        cachedAt: date.getTime(),
        //Plus 15 min +(15*60*1000)
        expAt: date.getTime()+(duration*60*1000),
    }
}

/**
 *
 * @param key
 * @returns {Promise<unknown>}
 */
function get(key) {
    return new Promise(resolve => {
        resolve((cache[key] && cache[key].expAt > new Date().getTime())?cache[key].data:null)
    });
}

/**
 *
 * @param key
 */
function invalidate(key) {
    delete cache[key];
}

export default {
    set,
    get,
    invalidate
};
