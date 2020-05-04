//You can edit ALL of the code here
function setup() {
  let allShow = getAllShows();
  //Sorts shows in alphabetical order
  allShow.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

    const homebtn = document.createElement("button");
    homebtn.textContent = "Home";
    homebtn.className = "home";
    const search = document.querySelector("#search");
    const searchInput = document.createElement("input");
    const episodeNum = document.createElement("p");
    search.appendChild(homebtn);
    //displayPage(episodeList);
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
    
    //This fetch calls the first object in (alphabetical) order and displays the main page
    fetch(`https://api.tvmaze.com/shows/${allShow[0].id}/episodes`)
    .then((response) => response.json())
    .then((data) => {
      displayPage(data);
      oneShow(data);
      displayEpisode(data);
    })
    .catch((error) => console.log(error));

//Makes search on episodes of selected show
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
    
    //Creates the tags and set up the HTML elements
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
        img.src = element.image.medium;
        episode.appendChild(img);
        summary.innerHTML = element.summary;
        episode.appendChild(summary);
        container.appendChild(episode);
      });
    }

    //Creates the all show dropdown menu
    allShow.forEach((show) => {
      const option = `<option value=${show.id}>${show.name}</option>`;
      selectShow.innerHTML += option;
    });

    //displays episodes of selected show and created the dropdown menu of the selected episode 
    selectShow.addEventListener("change", (e) => {
      const showId = e.target.value;
      console.log(showId)
      fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
        .then((response) => response.json())
        .then((data) => {
          displayPage(data);
          oneShow(data);
          displayEpisode(data);
        })
        .catch((error) => console.log(error));
    });

    //Created episodes dropdown menu for any selected show
    function oneShow(list) {
      episodeNum.textContent = `${list.length} episode(s)`;
      selectEpisode.innerHTML = "";
      list.forEach((e) => {
        let option = document.createElement("option");
        option.value = e.id;
        option.innerHTML = `S${e.season < 10 ? 0 : ""}${e.season} E${
          e.number < 10 ? 0 : ""
        }${e.number}-${e.name}`;
        selectEpisode.appendChild(option);
      });
    }

    //Displays selected episode
    function displayEpisode(list) {
      selectEpisode.addEventListener("change", (event) => {
        let newEpisode = event.target.value;
        console.log(newEpisode);
        let filteredEpisode = list.filter((key) => {
          if (key.id == newEpisode) {
            return key;
          }
        });
        displayPage(filteredEpisode);
      });
    }

    //Reloads the page when clicked on "Home" button
    homebtn.addEventListener("click", function () {
      location.reload(true);
    });
  
}
window.onload = setup;
