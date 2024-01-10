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
  // fav list
  let fav = JSON.parse(localStorage.getItem("favorite"));
  console.log(fav);

  const URL = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${public_key}&hash=${hash}`;

  const response = await fetch(URL);
  const { data } = await response.json();
  // console.log(data.data.results);
  // console.log(data.results[0].name);
  const path =
    data.results[0].thumbnail.path + "." + data.results[0].thumbnail.extension;

  // <i class="fa-solid fa-heart"></i>
  // font icon
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-heart";

  if (fav.length) {
    fav.forEach((f) => {
      if (f == data.results[0].id) {
        icon.className = "fa-solid fa-heart love";
      }
    });
  }
  icon.addEventListener("click", function () {
    if (icon.className.includes("love")) {
      fav = fav.filter((f) => f != data.results[0].id);
      icon.className = "fa-solid fa-heart";
    } else {
      icon.className = "fa-solid fa-heart love";
      fav.push(data.results[0].id);
    }
    localStorage.setItem("favorite", JSON.stringify(fav));
  });
  // container
  const div1 = document.createElement("div");

  const img = document.createElement("img");
  img.src = path;
  div1.appendChild(img);
  const div2 = document.createElement("div");
  div2.className = "flexHelp";
  const favDivHeading = document.createElement("div");
  favDivHeading.className = "flexFav";
  const name = document.createElement("h1");
  const desc = document.createElement("p");
  name.textContent = data.results[0].name;
  desc.textContent = data.results[0].description;

  const comic = document.createElement("h3");
  comic.textContent = "Available Comics :" + data.results[0].comics.available;

  const series = document.createElement("h3");
  series.textContent = "Total Series :" + data.results[0].series.available;

  const stories = document.createElement("h3");
  stories.textContent = "Total Stories :" + data.results[0].stories.available;

  favDivHeading.appendChild(name);
  favDivHeading.appendChild(icon);

  div2.appendChild(favDivHeading);
  div2.appendChild(desc);
  div2.appendChild(comic);
  div2.appendChild(series);
  div2.appendChild(stories);

  const div3 = document.createElement("div");
  const h2 = document.createElement("h2");
  const link = document.createElement("p");
  h2.textContent = `Read More About ${data.results[0].name}`;
  let html = ``;
  data.results[0].urls.forEach((u) => {
    html += `<a href=${u.url} target="_blank" rel="noopener noreferrer">${u.type} </a>`;
  });
  link.innerHTML = html;

  div3.appendChild(h2);
  div3.appendChild(link);
  div2.appendChild(div3);
  const favdiv = document.createElement("div");
  favdiv.className = "fav-div";

  favdiv.appendChild(div1);
  favdiv.appendChild(div2);
  profile.appendChild(favdiv);

  // data.data.results.forEach((d) => {
  //   // console.log(d);
  //   const path = d.thumbnail.path + "." + d.thumbnail.extension;
  //   // console.log(path);
  //   let link='';
  //   d.urls.forEach((u) => {
  //     link += `<a href=${u.url} target="_blank" rel="noopener noreferrer">${u.type} </a>`;
  //   });
  //   // fav icon

  //   html = `
  //   <div class="profile-div">
  //   <div>
  //   <img src=${path} alt ="Hero Image"/></div>
  //   <div class="profile-details">
  //   <h1>${d.name} </h1>
  //   <p>${d.description}</p>
  //   <h3>Available Comics : ${d.comics.available} </h3>
  //   <h3>Total Series : ${d.series.available} </h3>
  //   <h3>Total Stories : ${d.stories.available} </h3>
  //   <div class="link" >
  //   <h1>Read More About ${d.name} </h1>

  //       ${link}
  //   </div>

  //   </div>

  //   `;
  // });
  // profile.innerHTML = html;
}
apiCall();
