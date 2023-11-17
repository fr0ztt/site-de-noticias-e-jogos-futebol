const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4856fe267dmsh729017d2097aecap1e2f55jsn88a65d99b8cd',
    'X-RapidAPI-Host': 'sports-live-scores.p.rapidapi.com'
  }
};

fetch('https://sports-live-scores.p.rapidapi.com/football/live', options)
  .then(function(response) {
    return response.json();
  })
  .then(function(dados) {
            
    let divMain = document.createElement('div');
    divMain.className = "before-league";


    let leagues = {};
    let max = dados.matches.length>5? 5: dados.matches.length;
    // Percorrer todos os jogos da lista
    for (let i = 0; i < max; i++) {
      console.log(i, dados.matches[i])
      
      let league = dados.matches[i]["League"];

      // Verificar se a liga já foi adicionada ao objeto
      if (!leagues[league]) {
        // Se não tiver sido adicionada, criar um array vazio para armazenar os jogos
        leagues[league] = [];
      }

      // Adicionar o jogo atual ao array da liga correspondente
      leagues[league].push(dados.matches[i]);
    }
    // Percorrer todas as ligas
    for (let league in leagues) {
      // Criar uma div para a liga atual

      // Criar uma div para a liga atual
      let divLeague = document.createElement('div');
      divLeague.className = "container league";
      divLeague.addEventListener("click", handleClickLeague)

      // Adicionar o nome da liga ao elemento <p>
      let pLeague = document.createElement('p');
      pLeague.innerHTML = league;
      pLeague.className= " row nome";
      divLeague.appendChild(pLeague);

      // Percorrer todos os jogos da liga atual
      for (let i = 0; i < leagues[league].length; i++) {
        // Criar uma div para o jogo atual
        let divGame = document.createElement('div');
        divGame.classList.add("game");

        // Adicionar o jogo atual ao elemento <p>
        let pGame = document.createElement('p');
        pGame.innerHTML = leagues[league][i]["Home Team"];
        pGame.classList.add("nome");
        divGame.appendChild(pGame);

        let pScoreHome = document.createElement('p');
        pScoreHome.innerHTML = leagues[league][i]["Home Score"];
        pScoreHome.classList.add("nome");
        divGame.appendChild(pScoreHome);

        let pVS = document.createElement('p');
        pVS.innerHTML = "vs"
        pVS.classList.add("vs");
        divGame.appendChild(pVS);

        let pScoreAway = document.createElement('p');
        pScoreAway.innerHTML = leagues[league][i]["Away Score"];
        pScoreAway.classList.add("nome");
        divGame.appendChild(pScoreAway);
        
        let pNameHome = document.createElement('p');
        pNameHome.innerHTML = leagues[league][i]["Away Team"];
        pNameHome.classList.add("nome");
        divGame.appendChild(pNameHome);

        let pStatus = document.createElement('p');
        pStatus.innerHTML = "("+ leagues[league][i]["Status"] +")";
        pStatus.classList.add("nome");
        divGame.appendChild(pStatus);

        let divOdds = document.createElement('div');

        let poddHome = document.createElement('p');
        poddHome.innerHTML = leagues[league][i]["Live Home Odd"] + " |";
        poddHome.classList.add("ods");
        divOdds.appendChild(poddHome);

        let poddDraw = document.createElement('p');
        poddDraw.innerHTML =leagues[league][i]["Live Draw Odd"];
        poddDraw.classList.add("ods");
        divOdds.appendChild(poddDraw);

        let poddAway = document.createElement('p');
        poddAway.innerHTML = "| " + leagues[league][i]["Live Away Odd"];
        poddAway.classList.add("ods");
        divOdds.appendChild(poddAway);

        divGame.appendChild(divOdds);
        // Adicionar a div do jogo atual à div da liga
        divLeague.appendChild(divGame);
      }

      divMain.appendChild(divLeague);
    

      // // Adicionar a div da liga atual ao documento
      // document.body.appendChild(divLeague);
    }
      // Adicionar a div da liga atual ao documento
      // document.body.appendChild(divLeague);

      document.body.appendChild(divMain);


  });


  function handleClickLeague(event){
    let query = event.target.textContent;

    
    console.log(query);
    const options1 = {
      method: 'GET',
    };

    const url = 'https://newsapi.org/v2/top-headlines?apiKey=8e30f1d4db0b4071a9051338bad86dda&language=pt&category=sports&q=' + query;

    fetch( url , options1)
    .then(function(response1) {
      return response1.json();
    })
    .then(function(dados1) {
      console.log(dados1)
      let imgNot = document.createElement('img');
      imgNot.src = dados1.articles[0].urlToImage;
      imgNot.classList.add("img");
      document.body.appendChild(imgNot);

      let pGame = document.createElement('p');
      pGame.innerHTML = dados1.articles[0].title;
      pGame.classList.add("nome");
      document.body.appendChild(pGame);
    });
  }



  
  