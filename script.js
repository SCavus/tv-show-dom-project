//You can edit ALL of the code here
function setup() {
  let allShow = getAllShows();
  makePageForEpisodes(allShow);

  function makePageForEpisodes(episodeList) {
    const homebtn = document.createElement("button");
    homebtn.textContent = "Home";
    homebtn.className = "home";
    const search = document.querySelector("#search");
    const searchInput = document.createElement("input");
    const episodeNum = document.createElement("p");
    search.appendChild(homebtn);
    displayPage(episodeList);
    let selectShow = document.createElement("select");
    selectShow.className = "selectshow";
    search.appendChild(selectShow);
    let selectEpisode = document.createElement("select");
    selectEpisode.className = "select";
    search.appendChild(selectEpisode);
    searchInput.type = "text";
    searchInput.placeholder = "Search";
    search.appendChild(searchInput);
    search.appendChild(episodeNum);
    episodeNum.style.marginLeft = "30px";
    episodeNum.textContent = `${episodeList.length} episode(s)`;
    searchInput.addEventListener("keyup", function (e) {
      e.preventDefault();
      let term = searchInput.value.toLowerCase();
      let filterEpisode = episodeList.filter(
        (element) =>
          element.name.toLowerCase().includes(term) ||
          element.summary.toLowerCase().includes(term)
      );
      //This part displays the searched elements
      displayPage(filterEpisode);
      episodeNum.textContent = `${filterEpisode.length} episode(s)`;
    });

    allShow.forEach((show) => {
      const option = `<option value=${show.id}>${show.name}</option>`;
      selectShow.innerHTML += option;
    });

    selectShow.addEventListener("change", (e) => {
      const showId = e.target.value;
      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
        .then((response) => response.json())
        .then((data) => {
          displayPage(data);
          oneShow(data);
          // displayEpisode(data);
        })
        .catch((error) => console.log(error));
    });

    function oneShow(episode) {
      episode.forEach((e) => {
        let option = document.createElement("option");
        option.value = e.id;
        option.innerHTML = `S${e.season < 10 ? 0 : ""}${e.season} E${
          e.number < 10 ? 0 : ""
        }${e.number}-${e.name}`;
        selectEpisode.appendChild(option);
        selectEpisode.addEventListener("change", (event) => {
          let newEpisode = event.target.value;
          let filteredEpisode = episode.filter((key) => {
            if (key.id == newEpisode) {
              return key;
            }
          });
          displayPage(filteredEpisode);
        });
      });
    }

    // function displayEpisode(list) {

    // }

    function displayPage(episodeList) {
      const container = document.getElementById("container");
      container.innerHTML = "";
      episodeList.forEach((element) => {
        const episode = document.createElement("div");
        const title = document.createElement("h3");
        const img = document.createElement("img");
        const summary = document.createElement("p");
        episode.className = "episode";
        title.className = "title";
        img.className = "image";
        summary.className = "summary";
        title.innerHTML = `${element.name} - S${element.season < 10 ? 0 : ""}${
          element.season
        }E${element.number < 10 ? 0 : ""}${element.number}`;
        episode.appendChild(title);
        img.src = `${element.image.medium ? element.image.medium : null}`;
        episode.appendChild(img);
        summary.innerHTML = element.summary;
        episode.appendChild(summary);
        container.appendChild(episode);
      });
    }

    homebtn.addEventListener("click", function () {
      location.reload(true);
    });
  }
}
window.onload = setup;
