const form = document.getElementById("form");
const search = document.getElementById("search");
const showcase = document.getElementById("showcase");
const main = document.querySelector("main");
const result = document.getElementById("result");
const lyric = document.getElementById("lyrics");

const apiURL = "https://api.lyrics.ovh";

const data = [
  {
    artist: "Drake",
    title: "One Dance",
    image:
      "https://www.soul-addict.com/upload/drake%20Views%20From%20The%206%20cover.jpg",
  },
  {
    artist: "Rihanna",
    title: "Diamonds",
    image:
      "https://i.pinimg.com/originals/4b/d3/36/4bd336da122345f86f239c5d7f6593c2.jpg",
  },
  {
    artist: "Coldplay",
    title: "Yellow",
    image: "https://m.media-amazon.com/images/I/91BIt8cpbrL._SS500_.jpg",
  },
  {
    artist: "Kendrick Lamar",
    title: "Humble",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/71tAOC%2Bdf8L._SL1400_.jpg",
  },
  {
    artist: "Ed Sheeran",
    title: "Shap Of You",
    image:
      "https://img.discogs.com/Wdgn5nHuaUx4qKmDmhqJWvSQU_g=/fit-in/600x527/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9882982-1569769665-6597.jpeg.jpg",
  },
  {
    artist: "Halsey",
    title: "Without Me",
    image:
      "https://static.fnac-static.com/multimedia/Images/FR/NR/28/e8/ad/11397160/1540-1/tsp20190913093122/Manic.jpg",
  },
  {
    artist: "Dua Lipa",
    title: "Physical",
    image:
      "https://soundofbrit.fr/wp-content/uploads/2020/03/Dua-Lipa-Future-Nostalgia.jpg",
  },
  {
    artist: "J cole",
    title: "Middle Child",
    image:
      "https://static.hotmixradio.fr/wp-content/uploads/j-cole-middle-child.jpg",
  },
];

async function searchLyrics(term) {
  const resp = await fetch(`${apiURL}/suggest/${term}`);
  const data = await resp.json();
  showSearch(data);
}
function showData() {
  data.sort(() => Math.random() - 0.5);
  data.forEach((item, index) => {
    const { artist, title, image } = item;
    if (index < 5) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.innerHTML = ` 
      <img src="${image}" alt="${title}" />
      <p>
        <span><strong>${artist}</strong>-${title}</span>
      </p>
      <button class="btn add" data-artist="${artist}" data-songtitle="${title}">Get the lyrics</button>
      `;
      showcase.appendChild(box);
    }
  });
}

function showSearch(data) {
  data.data.forEach((item) => {
    const { artist, title } = item;
    const { picture_big, name } = artist;
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = ` 
      <img src="${picture_big}" alt="${title}" />
      <p>
        <span><strong>${name}</strong>-${title}</span>
      </p>
      <button class="btn add" data-artist="${name}" data-songtitle="${title}">Get the lyrics</button>
      `;
    result.appendChild(box);
  });
}
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.lyrics === undefined) {
    lyric.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle} Not available for Now 😔</h2>`;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    lyric.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const term = search.value;
  if (term.trim() === "") {
    alert("Please Enter A song Or Artist");
  } else {
    searchLyrics(term);
    search.value = "";
    lyric.innerHTML = "";
  }
});
showData();
window.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.classList.contains("add")) {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    result.innerHTML = "";
    getLyrics(artist, songTitle);
  }
});
