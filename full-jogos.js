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

      // Percorrer todos os jogos da lista
      for (let i = 0; i < dados.matches.length; i++) {
        console.log(i, dados.matches[i])
        let league = dados.matches[i]["League"];

        
        if (!leagues[league]) {
          
          leagues[league] = [];
        }

        
        leagues[league].push(dados.matches[i]);
      }
      
      for (let league in leagues) {
        
        let divLeague = document.createElement('div');
        divLeague.className = "container league";
        divLeague.addEventListener("click", handleClickLeague)

        
        let pLeague = document.createElement('p');
        pLeague.innerHTML = league;
        pLeague.className= " row nome";
        divLeague.appendChild(pLeague);

        
        for (let i = 0; i < leagues[league].length; i++) {
           
          let divGame = document.createElement('div');
          divGame.classList.add("game");
          divGame.addEventListener("click", function() {
            localStorage.setItem("equipa1",leagues[league][i]["Home Team"]);
            localStorage.setItem("resultado1",leagues[league][i]["Home Score"]);
            localStorage.setItem("resultado2",leagues[league][i]["Away Score"]);
            localStorage.setItem("equipa2",leagues[league][i]["Away Team"]);
            localStorage.setItem("oddHome",leagues[league][i]["Live Home Odd"]);
            localStorage.setItem("oddAway",leagues[league][i]["Live Draw Odd"]);
            localStorage.setItem("oddDraw",leagues[league][i]["Live Draw Odd"]);
            window.open('pagina-jogo.html', '_blank', 'height=500, width=1000');
          });

          let pGame = document.createElement('p');
          pGame.innerHTML = leagues[league][i]["Home Team"];
          pGame.classList.add("nome");
          divGame.appendChild(pGame);

          let pScoreHome = document.createElement('p');
          pScoreHome.innerHTML = leagues[league][i]["Home Score"];
          pScoreHome.className= "nome res";
          divGame.appendChild(pScoreHome);

          let pVS = document.createElement('p');
          pVS.innerHTML = "vs"
          pVS.classList.add("vs");
          divGame.appendChild(pVS);

          let pScoreAway = document.createElement('p');
          pScoreAway.innerHTML = leagues[league][i]["Away Score"];
          pScoreAway.className= "nome res";
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

          
          divLeague.appendChild(divGame);
        }

        divMain.appendChild(divLeague);
      


      }


        document.body.appendChild(divMain);


    });


    function handleClickLeague(event){
      let query = event.target.textContent;
      
      console.log(query);
      
    }



    
    