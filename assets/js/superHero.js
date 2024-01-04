const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// console.log(id);

// api public key
let public_key = "0ca107dcc83d2d017103b0096ad6d269";
let private_key = "7a0dbc0d88f93bc7cfd7cd650567f84e84dad871";

let ts = Date.now();
let st = ts + private_key + public_key;
let hash = CryptoJS.MD5(st).toString();

// variable of superHero page
const profile = document.querySelector("#heroProfile");

// function or events

// !fetch function
async function apiCall() {
  const URL = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${public_key}&hash=${hash}`;

  const response = await fetch(URL);
  const data = await response.json();
  // console.log(data.data.results);
  let html = "";
  data.data.results.forEach((d) => {
    // console.log(d);
    const path = d.thumbnail.path + "." + d.thumbnail.extension;
    // console.log(path);
    let link='';
    d.urls.forEach((u) => {
      link += `<a href=${u.url} target="_blank" rel="noopener noreferrer">${u.type} </a>`;
    });
    html = `
    <div class="profile-div">
    <div>
    <img src=${path} alt ="Hero Image"/></div>
    <div class="profile-details">
    <h1>${d.name} </h1>
    <p>${d.description}</p>
    <h3>Available Comics : ${d.comics.available} </h3>
    <h3>Total Series : ${d.series.available} </h3>
    <h3>Total Stories : ${d.stories.available} </h3>
    <div class="link" >
    <h1>Read More About ${d.name} </h1>

        ${link}
    </div>
    
    </div>
    

    `;
  });
  profile.innerHTML = html;
}
apiCall();
