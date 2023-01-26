//console.log("hello world");

//változó deklarálás
let scores, roundScore, activePlayer;

function newGame() {
  //értékadás (value assignment)
  //a játékosok pontszámai , mindkét játékos nulla ponttal indul

  scores = [0, 0];

  //a forduló alatt megszerzett pontok

  roundScore = 0;

  //az első játékos kezd

  activePlayer = 0;

  // dom manipuláció (dom: document object model = HTML kód)

  //kiválasztjuk a score-0 id-val rendelkező html elemet és a tartalmát beállítjuk 0ra
  document.querySelector('#score-0').textContent = 0;
  // document.getElementById('score-0').textContent =0;
  //ugyanaz mint a másik csak itt rögtön id-t kell megadni, ezért nem kell #
  //de a querySelector mindenre jó

  //cammelCase:JavaScript, PascalCase:JavaScript, snake-case:Python,php, kebab-case:CSS

  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  //a játék indításakor a kocka még nem látszik
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
}

newGame();

//a kockadobás
document.querySelector('.btn-roll').addEventListener('click', function () {
  //1. generálunk egy véletlen számot 1-6 között, azaz dobunk kockával
  const dice = Math.floor(Math.random() * 6) + 1;

  //2. jelenítsük meg a dobást
  document.querySelector('.dice').style.display = 'block';
  //template string
  document.querySelector('.dice').setAttribute('src', `dice-${dice}.png`);
  //string concatenation - strin összefűzés - ugyanaz csak csúnyább
  //document.querySelector('.dice').setAttribute('src', 'dice-' + dice + '.png');
  //szekvencia szerint az alapértelmezett 5ös dobásnak elöször meg kellene jelenni
  //de nem fog mert a JS okos ->videó
  //meg lehetne a két sor sorrendjét cserélni, hogy "helyes" sorrendben fussanak, de így is helyes a kód

  //3.meg kell vizsgálni a dobást
  //ha a dobott érték 1, akkor a pontok elvesznek és a másik játékos következik
  //ha nem 1 a dobott érték, akkor hozzáadjuk a dobás értékét a pontokhoz, és ugyanaz a játékos dobhat
  //vezérlési szerkezet: elágazás
  if (dice !== 1) {
    roundScore = roundScore + dice;
    //a UI-on megjelenítjük az eredményt
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
});

//DRY = do not repeat yourself

function nextPlayer() {
  roundScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  //UI-on is frissitsük az értékeket
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function () {
  //1. a jatékos megszerzi a kör alatt szerzett pontjait
  scores[activePlayer] += roundScore;

  //2. UI frissités
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //3. Ellenőrizzük van-e nyertes
  if (scores[activePlayer] >= 20) {
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
  } else {
    //a másik játékos jön
    nextPlayer();
  }
});

document.querySelector('.btn-new').addEventListener('click', newGame);
