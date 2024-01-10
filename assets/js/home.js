// localStorage.clear()
if (localStorage.getItem("favorite") == null) {
  localStorage.setItem("favorite", JSON.stringify([]));
}
// api public key
let public_key = "0ca107dcc83d2d017103b0096ad6d269";
let private_key = "7a0dbc0d88f93bc7cfd7cd650567f84e84dad871";

let ts = Date.now();
let st = ts + private_key + public_key;
let hash = CryptoJS.MD5(st).toString();

// variable of home.html
const submit = document.querySelector("#form");
const input = document.querySelector("#search-input");
const suggestion = document.querySelector("#displaySuggestion");
const heroSuggestion = document.querySelector("#heroContainer");
// function or events

// !fetch function
async function apiCall(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data.data.results;
}

// ! event on input tag
input.addEventListener("keyup", async function (e) {
  let value = e.target.value;
  if (value == " " || value.length == 0) {
    // console.log(`empty`);
    suggestion.innerHTML = "";
  } else if (value.length > 0) {
    const URL = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&ts=${ts}&apikey=${public_key}&hash=${hash}`;
    let data = await apiCall(URL);
    suggestion.style.display = "block";

    displaySuggestions(data);
  }
});
// on load run
async function onLoad() {
  if (input.value.length == 0) {
    const URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;
    const data = await apiCall(URL);
    heroDisplay(data);
  }
}
onLoad();

// ! suggestion box function
function displaySuggestions(dataes) {
  suggestion.innerHTML = "";

  dataes.forEach((data) => {
    // console.log(data.name)
    const suggestionElement = document.createElement("li");
    const heroDetails = document.createElement("a");
    heroDetails.href = `superHero.html?id=${data.id}`;

    // suggestionElement.className = 'suggestion';
    heroDetails.textContent = data.name;

    suggestionElement.addEventListener("click", function () {
      input.value = data.name;
      suggestion.style.display = "none";
    });
    suggestionElement.appendChild(heroDetails);
    suggestion.appendChild(suggestionElement);
  });
}

// event on form tag
// submit.addEventListener("submit", async function (e) {
//   e.preventDefault();
//   let value = input.value.trim();
//   suggestion.style.display = "none";

//   input.value='';
//   heroSuggestion.innerHTML = "";

//   if (value.length == 0) {
//     const URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${public_key}&hash=${hash}`;
//     const data = await apiCall(URL);
//     heroDisplay(data);
//   } else {
//     const URL = `https://gateway.marvel.com/v1/public/characters?name=${value}&ts=${ts}&apikey=${public_key}&hash=${hash}`;
//     const data = await apiCall(URL);
//     heroDisplay(data);
//   }
// });
function heroDisplay(dataes) {
  let fav = JSON.parse(localStorage.getItem("favorite"));
  dataes.forEach((data) => {
    // console.log(data);
    const heroContainer = document.createElement("div");
    heroContainer.className = "box";
    // basic details
    // * hero name
    const heroName = document.createElement("h3");
    heroName.className = "hero-title";
    heroName.textContent = data.name;
    // * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    // hero fav button
    // <i class="fa-solid fa-heart"></i>
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-heart";

    if (fav.length) {
      fav.forEach((f) => {
        if (f == data.id) {
          icon.className = "fa-solid fa-heart love";
          // return;
        }
      });
    }
    icon.addEventListener("click", function () {
      // console.log(`click`);
      if (icon.className.includes("love")) {
        // console.log(`love`);
        fav = fav.filter((f) => f != data.id);
        // icon.className = "heart";
        // console.log(icon);
        // console.log(fav);
        icon.className = "fa-solid fa-heart";
      } else {
        // icon.className = "heart love";
        icon.className = "fa-solid fa-heart love";

        fav.push(data.id);
        // console.log(icon);
        // console.log(fav);
      }
      localStorage.setItem("favorite", JSON.stringify(fav));
      // console.log(fav);
    });

    // * hero imgae

    const heroImage = document.createElement("img");
    heroImage.className = "hero-image";
    const path = data.thumbnail.path + "." + data.thumbnail.extension;
    // console.log(path)
    heroImage.src = path;

    // * more detail on hero

    const heroDetails = document.createElement("a");
    heroDetails.href = `superHero.html?id=${data.id}`;
    heroDetails.className = "link";
    heroDetails.textContent = "READ MORE";
    const innerbox = document.createElement("div");
    innerbox.className = "inner-box";
    innerbox.append(heroName);
    innerbox.append(icon);
    // append all element
    heroContainer.appendChild(heroImage);
    heroContainer.appendChild(innerbox);
    heroContainer.appendChild(heroDetails);

    heroSuggestion.appendChild(heroContainer);
  });
}
