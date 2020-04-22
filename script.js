//You can edit ALL of the code here

function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const mySearchInput = document.createElement("input");
  mySearchInput.onchange = function(e){
    console.log(e.target.value);
    const filterEpisode = episodeList.filter(element => {
      if(element.summary.includes(e.target.value) || element.name.includes(e.target.value))
      {
        // console.log(element)
        return element;
      }
    })
 console.log(filterEpisode)
  }
  rootElem.appendChild(mySearchInput);
  episodeList.forEach(element => { 
    // console.log(element);
    const myTitle = document.createElement("h3");
    const container = document.createElement("div");
    const myImg =  document.createElement("img");
    const mySummary = document.createElement("p");
    myTitle.textContent = `${element.name} S${element.season < 10 ? "0":""}${element.season} E${element.number < 10 ? 0:""}${element.number}`;
    container.appendChild(myTitle);
     myImg.src = element.image.medium;
     container.appendChild(myImg);
      mySummary.innerHTML = element.summary;
     container.appendChild(mySummary);
    rootElem.appendChild(container);
  });
}

window.onload = setup;
