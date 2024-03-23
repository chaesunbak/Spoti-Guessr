const setDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 사용법 : await delay(5000);

export default setDelay;