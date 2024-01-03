

// api public key
let public_key = "0ca107dcc83d2d017103b0096ad6d269";
let private_key = "7a0dbc0d88f93bc7cfd7cd650567f84e84dad871";

let ts = Date.now();
console.log(ts);
let st = ts + private_key + public_key;
let hash = CryptoJS.MD5(st).toString();

// variable of home.html
const submit = document.querySelector("#form");
const input = document.querySelector("#search-input");

// function or events

// fetch function
async function apiCall(URL) {
  await fetch(URL)
    .then((res) => res.json())
    .then((data) => console.log(data.data.results));
}
// apiCall("t");

// event on input tag
input.addEventListener("input", function (e) {
  const URL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${e.target.value}&ts=${ts}&apikey=${public_key}&hash=${hash}`;
 apiCall(URL);



});

// event on form tag
submit.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(`hello`);
});
