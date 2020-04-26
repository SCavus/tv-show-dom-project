//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function makePageForEpisodes(episodeList) {
  const homebtn = document.createElement('button')
  homebtn.textContent = 'Home'
  homebtn.className = 'home'
  const search = document.querySelector("#search");
  const searchInput = document.createElement("input");
  const episodeNum = document.createElement("p");
  search.appendChild(homebtn)
  displayPage(episodeList);
  const select = document.createElement('select')
  select.id = 'selection'
  search.appendChild(select)
  searchInput.type = "text";
  searchInput.placeholder = "Search";
  search.appendChild(searchInput);
  search.appendChild(episodeNum);
  episodeNum.style.marginLeft = "30px";
  episodeNum.textContent = `${episodeList.length} episode(s)`;
  searchInput.addEventListener("keyup", function(e) {
    e.preventDefault();
    let term = searchInput.value.toLowerCase();
    let filterEpisode = episodeList.filter(
      element =>
        element.name.toLowerCase().includes(term) ||
        element.summary.toLowerCase().includes(term)
    );
    displayPage(filterEpisode);
    episodeNum.textContent = `${filterEpisode.length} episode(s)`;
  });

  function displayPage(list) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    list.forEach(element => {
      const episode = document.createElement("div");
      const title = document.createElement("h3")
      const img = document.createElement("img")
      const summary = document.createElement("p")
      episode.className = 'episode'
      title.className = 'title'
      img.className = 'image'
      summary.className = 'summary'
      title.innerHTML = `${element.name} - S${element.season < 10 ? 0 : ""}${element.season}E${element.number < 10 ? 0 : ""}${element.number}`
      episode.appendChild(title)
      img.src = element.image.medium
      episode.appendChild(img)
      summary.innerHTML = element.summary
      episode.appendChild(summary)
      container.appendChild(episode);
    });
  }

  episodeList.forEach(e=> {
    let option = document.createElement('option')
    option.innerHTML = `S${e.season < 10 ? 0 : ""}${e.season} E${e.number < 10 ? 0 : ""}${e.number}-${e.name}`
    option.value = episodeList[e]
    select.appendChild(option)
    option.addEventListener('select', ()=> 
      displayPage(option)
    )
  })

  homebtn.addEventListener('click', function() {
    location.reload(true);
  })
}
window.onload = setup;
