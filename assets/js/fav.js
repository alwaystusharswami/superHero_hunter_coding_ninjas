const favList = JSON.parse(localStorage.getItem("favorite"));
console.log(favList)
// api public key
let public_key = "0ca107dcc83d2d017103b0096ad6d269";
let private_key = "7a0dbc0d88f93bc7cfd7cd650567f84e84dad871";

let ts = Date.now();
let st = ts + private_key + public_key;
let hash = CryptoJS.MD5(st).toString();

// variable of superHero page
const favHero = document.querySelector("#favHero");

// function or events

// !fetch function
function apiCall() {
  favList.forEach(async (favId) => {
    const URL = `http://gateway.marvel.com/v1/public/characters/${favId}?ts=${ts}&apikey=${public_key}&hash=${hash}`;

    const response = await fetch(URL);
    const data = await response.json();
    data.data.results.forEach((d) => {
      console.log(d)
      const path = d.thumbnail.path + "." + d.thumbnail.extension;
      const icon = document.createElement("icon");
      icon.className = "heart";
      icon.textContent = "fav";
      icon.addEventListener("click", function () {
        console.log(`click`);
        if (icon.className.includes("love")) {
          console.log(`love`);
          fav = fav.filter((f) => f != data.id);
          icon.className = "heart";
          icon.textContent = "fav";
        } else {
          icon.className = "heart love";
          fav.push(data.id);
          icon.textContent = "fav";
        }
        localStorage.setItem("favorite", JSON.stringify(fav));
        console.log(fav);
      });
      const div1 = document.createElement("div");

      const img = document.createElement("img");
      img.src = path;
      div1.appendChild(img);
      const div2 = document.createElement("div");
      div2.className='flexHelp';
      const favDivHeading=document.createElement('div');
      favDivHeading.className='flexFav';
      const name = document.createElement("h1");
      const desc = document.createElement("p");
      name.textContent = d.name;
      desc.textContent = d.description;

      const comic = document.createElement("h3");
      comic.textContent = "Available Comics :" + d.comics.available;

      const series = document.createElement("h3");
      series.textContent = "Total Series :" + d.series.available;

      const stories = document.createElement("h3");
      stories.textContent = "Total Stories :" + d.stories.available;

      favDivHeading.appendChild(name);
      favDivHeading.appendChild(icon);
      
      div2.appendChild(favDivHeading);
      div2.appendChild(desc);
      div2.appendChild(comic);
      div2.appendChild(series);
      div2.appendChild(stories);

      const div3 = document.createElement("div");
      const h2=document.createElement('h2');
      const link=document.createElement('p');
      h2.textContent=`Read More About ${d.name}`;
      let html=``;
      d.urls.forEach(u => {
        html+=`<a href=${u.url} target="_blank" rel="noopener noreferrer">${u.type} </a>`
        
      });
      link.innerHTML=html;
      

      div3.appendChild(h2);
      div3.appendChild(link);
      div2.appendChild(div3);
      const favdiv = document.createElement("div");
      favdiv.className = "fav-div";

      favdiv.appendChild(div1);
      favdiv.appendChild(div2);
      favHero.appendChild(favdiv);
    });
  });
}
apiCall();
