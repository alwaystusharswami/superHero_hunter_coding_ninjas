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
input.addEventListener("input", async function () {
  let value = input.value.trim();
  console.log(value);
  if (value == " " || value.length == 0) {
    console.log(`empty`);
    suggestion.innerHTML = " ";
  } else if (value.length > 0) {
    console.log(`empty 2`);

    const URL = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&ts=${ts}&apikey=${public_key}&hash=${hash}`;
    let data = await apiCall(URL);
    displaySuggestions(data);
  }
});

// ! suggestion box function
function displaySuggestions(dataes) {
  suggestion.innerHTML = "";

  dataes.forEach((data) => {
    // console.log(data.name)
    const suggestionElement = document.createElement("li");
    // suggestionElement.className = 'suggestion';
    suggestionElement.textContent = data.name;

    suggestionElement.addEventListener("click", function () {
      input.value = data.name;
      suggestion.style.display = "none";
    });
    suggestion.appendChild(suggestionElement);
  });
}

// event on form tag
submit.addEventListener("submit", async function (e) {
  e.preventDefault();
  let value = input.value.trim();
  suggestion.innerHTML = "";
  if (value.length == 0) {
    return;
  }

  const URL = `http://gateway.marvel.com/v1/public/characters?name=${value}&ts=${ts}&apikey=${public_key}&hash=${hash}`;
  const data = await apiCall(URL);
  heroDisplay(data);
});
function heroDisplay(dataes) {
    dataes.forEach(data => {
        console.log(data)
        const heroContainer = document.createElement("div");
    // heroElement.className = 'suggestion';
    // basic details 
    const heroName=document.createElement('h3');
    heroName.textContent=data.name;
    const heroImage=document.createElement('img');
    const path=data.thumbnail.path+'.'+data.thumbnail.extension;
    // console.log(path)
    heroImage.src=path;
    

    const heroDetails=document.createElement('a');
    heroDetails.href=`superHero.html?id=${data.id}`
    heroDetails.textContent="More Details";
    heroDetails.addEventListener('click',function(){
        document.id=data.id;
        
    })


    heroContainer.appendChild(heroName);
    heroContainer.appendChild(heroImage);
    heroContainer.appendChild(heroDetails);

    // heroContainer.textContent = data.name;

    heroContainer.addEventListener("click", function () {
        
    //   input.value = data.name;
    //   suggestion.style.display = "none";
    });
    heroSuggestion.appendChild(heroContainer);
    });
}
