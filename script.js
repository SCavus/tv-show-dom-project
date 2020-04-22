//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root")
  const searchDiv = document.querySelector('#search')
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`
  const searchInput = document.createElement("input")
  searchInput.style.height = '30px'
  
  searchDiv.appendChild(searchInput);
  function displayPage (list) {
    list.forEach(element => { 
      const container = document.createElement("div")
      const title = document.createElement("h3")
      const img = document.createElement("img")
      const summary = document.createElement("p")
      container.setAttribute('id', 'container')
      title.setAttribute('class', 'title')
      img.setAttribute('class', 'image')
      summary.setAttribute('class', 'summary')
      title.textContent = `${element.name} - S${element.season < 10 ? 0 : ""}${element.season}E${element.number < 10 ? 0 : ""}${element.number}`
      container.appendChild(title)
      img.src = element.image.medium
      container.appendChild(img)
      summary.innerHTML = element.summary
      container.appendChild(summary)
      rootElem.appendChild(container)
    })
  }
  displayPage(episodeList)
  searchInput.onchange = function(e){
    //console.log(e.target.value)
    const filterEpisode = episodeList.filter(element => {
      if(element.summary.includes(e.target.value) || element.name.includes(e.target.value)) {
        return element
      }
    displayPage(filterEpisode)
    })
  //console.log(typeOf filterEpisode)
  }
}

window.onload = setup;
