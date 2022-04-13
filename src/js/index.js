//minha versão
let sacar = document.querySelector('#sacar');
let retornar = document.querySelector('#retornar');

document.getElementById('mostrar-carta').addEventListener('click', () => mostrarImagemEQtdRestante())

document.getElementById('retornar-cartas').addEventListener('click', () => {
  retornarCartasProDeck(id)
  atualizarCartasRestantes(id)

})

let id = "" //funciona sem isso

async function atribuirDeckID(){
  id = await criarDeckID()
}

async function criarDeckID() {
  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  const resposta = await fetch(url)
  const json =  await resposta.json()
  return json.deck_id
}

async function pegarImagemEQtdRestante(ID) {
  const url = `https://deckofcardsapi.com/api/deck/${ID}/draw/?count=1`
  const resposta = await fetch(url)
  const json = await resposta.json()
  return [json.cards[0].image, json.remaining]
}

async function mostrarImagemEQtdRestante() {
  const [imagem, restantes] = await pegarImagemEQtdRestante(id)
  document.getElementById('carta').src = imagem
  document.getElementById('restantes').innerHTML = `Cartas restantes: ${restantes}`

  if (restantes >= 0) {
    sacar.play()
  }

  if (restantes == 0) {
    document.getElementById('restantes').innerHTML = `O baralho terminou!`
  }
}

async function retornarCartasProDeck(ID) {
  const url = `https://deckofcardsapi.com/api/deck/${ID}/return/`
  const resposta = await fetch(url)
  const json = await resposta.json()
  return json.remaining
}

async function atualizarCartasRestantes() {
  const restantes = await retornarCartasProDeck(id)
  document.getElementById('restantes').innerHTML = `Cartas restantes: ${restantes}`
  document.getElementById('carta').src = "src/images/baralho.svg"
  retornar.play()
}

atribuirDeckID()













