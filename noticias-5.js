let pStatus = document.createElement('h1');
pStatus.innerHTML = "Ultimas Noticias";
pStatus.className = "text-center";
document.body.appendChild(pStatus);

const options1 = {
    method: 'GET',
  };
  
  const url = 'https://newsapi.org/v2/top-headlines?apiKey=8e30f1d4db0b4071a9051338bad86dda&language=pt&category=sports';
  
  fetch(url, options1)
    .then(function(response1) {
      return response1.json();
    })
    .then(function(dados1) {
      console.log(dados1);
      
      let divCardGroup = document.createElement('div');
      divCardGroup.className = "card-deck container-sm";

      let max = dados1.articles.length>5? 5: dados1.articles.length;
  
      for (let i = 0; i < max; i++) {
        let divCard = document.createElement('div');
        divCard.className = "card text-center ";
        divCard.addEventListener("click", handleClickArticle)
        divCard.setAttribute("data-url", dados1.articles[i].url); // Adicione o atributo personalizado aqui
        let divCardBody = document.createElement('div');
        divCardBody.className = "card-body";
        let imgNot = document.createElement('img');
        imgNot.src = dados1.articles[i].urlToImage;
        imgNot.classList.add("card-img-top");
        divCard.appendChild(imgNot);
  
        let pTitulo = document.createElement('h5');
        pTitulo.innerHTML = dados1.articles[i].title;
        pTitulo.classList.add("card-title");

        let pDes = document.createElement('p');
        pDes.innerHTML = dados1.articles[i].description;
        pDes.classList.add("card-text");
        divCardBody.appendChild(pTitulo);
        divCardBody.appendChild(pDes);
        
        
  
        divCard.appendChild(divCardBody);
  
        divCardGroup.appendChild(divCard);
      }
      
      document.body.appendChild(divCardGroup);
    });

// Defina a função de manipulador de evento aqui
function handleClickArticle(event) {
  let target = event.currentTarget;
  let url = target.getAttribute("data-url"); // Recupere o valor do atributo personalizado aqui
  // Faça alguma coisa com o valor da URL aqui, como navegar para a página correspondente
  // window.location.href = url;
  window.open(url, "minhaJanela", "height=500,width=500");
}
