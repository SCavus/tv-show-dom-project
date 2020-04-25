//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root")
  const searchDiv = document.querySelector('#search')
  const searchInput = document.createElement("input")
  const episodeNum = document.createElement('p')

  displayPage(episodeList)
  searchInput.type = 'text'
  searchInput.placeholder = 'Search'
  searchDiv.appendChild(searchInput)
  searchDiv.appendChild(episodeNum)
  episodeNum.style.marginLeft = '30px'
  episodeNum.textContent = `${episodeList.length} episode(s)`

  searchInput.addEventListener('keyup', function(){
    let term = searchInput.value.toLowerCase()
    let filterEpisode = episodeList.filter(element => 
      element.name.toLowerCase().includes(term) || 
      element.summary.toLowerCase().includes(term)
    )
  episodeNum.textContent = `${filterEpisode.length} episode(s)`
  })

  function displayPage(list) {
    list.forEach(element => { 
      const title = document.createElement("h3")
      const img = document.createElement("img")
      const summary = document.createElement("p")
      const container = document.createElement("div")

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

  // if(search) {
  //   displayPage(filterEpisode)
  // }
  // else displayPage(episodeList)
}
window.onload = setup;

