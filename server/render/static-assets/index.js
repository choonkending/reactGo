const staticAssets = __PRODUCTION__ ? require('./prod') : require('./dev');

export default staticAssets;

