var MD5 = require("crypto-js/md5");
const ts=Date.now();
console.log(MD5(ts+'0ca107dcc83d2d017103b0096ad6d269'+'7a0dbc0d88f93bc7cfd7cd650567f84e84dad871').toString());