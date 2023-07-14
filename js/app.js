let gold = 0;
let textWarning = "";
let allPower = [];
let loadGoldData = localStorage.getItem("totalGold");
const carrucel = document.querySelector(".container__carrucel__cards");
const goldUi = document.querySelector("#oro");
const resetgoldBtn = document.querySelector("#resetGold");
const warningUi = document.querySelector("#warning");
const digBtn = document.querySelector("#dig");

document.addEventListener("DOMContentLoaded", () => {
  const buyPickaxeBtn = document.querySelector("#button0");
  const buygroundDigBtn = document.querySelector("#button1");
  const buystoneDigBtn = document.querySelector("#button2");
  const buycopperDigBtn = document.querySelector("#button3");

  buyPickaxeBtn.addEventListener("click", buyPickaxe);
  buygroundDigBtn.addEventListener("click", buygroundDig);
  buystoneDigBtn.addEventListener("click", buystoneDig);
  buycopperDigBtn.addEventListener("click", buycopperDig);
  loadGold();
});

class Digger {
  constructor(objDigger) {
    this.name = objDigger.name;
    this.id = objDigger.id;
    this.cost = objDigger.cost;
    this.power = objDigger.power;
    this.lvl = objDigger.lvl;
    this.buyed = objDigger.buyed;
    this.image = objDigger.image;
    carrucel.innerHTML += `
    <button class="card" id="button${this.id}">
      <div class="card__title">
          <span class="card__title__name">${this.name}</span>
      </div>
      <div class="card__img">
          <span class="card__img__Photo"><img src="${this.image}" alt=""></span>
      </div>
      <div class="card__text">
          <span class="card__text__lvl">Lvl: ${this.lvl}</span>
          <span class="card__text__cost">${this.cost}$</span>
          <span class="card__text__power">Poder: ${this.power}</span>
      </div>
    </button>`;
  }
  checkGold() {
    if (gold >= this.cost) {
      this.firstBuy();
      updateWarning("");
    } else {
      updateWarning("Oro insuficiente");
    }
  }
  firstBuy() {
    if (this.buyed) {
      this.buyUpgrade();
    } else {
      this.buyed = true;
      this.buyUpgrade();
    }
  }
  buyUpgrade() {
    gold -= this.cost;
    this.lvl++;
    this.power += Math.round(this.cost / 6);
    this.cost = this.lvl * this.power * 5;
    saveGold();
    updateGold();
    updateDiggersVal(this.id);
    savediggers();
  }
}
const createDiggers = (Object) => {
  for (const digger of Object) {
    const newDigger = new Digger(digger);
    allPower.push(newDigger);
  }
};
const displayDiggers = () => {
  const newDiggers = `[
    {
      "name": "Pico",
      "id": 0,
      "cost": 10,
      "power": 1,
      "lvl": 1,
      "buyed": true,
      "image": "multimedia/img/pickaxe.webp"
    },
    {
      "name": "Mina de tierra",
      "id": 1,
      "cost": 100,
      "power": 0,
      "lvl": 0,
      "buyed": false,
      "image": "multimedia/img/clayDig.webp"
    },
    {
      "name": "Mina de piedra",
      "id": 2,
      "cost": 1000,
      "power": 0,
      "lvl": 0,
      "buyed": false,
      "image": "multimedia/img/StoneDig.webp"
    },
    {
      "name": "Mina de cobre",
      "id": 3,
      "cost": 10000,
      "power": 0,
      "lvl": 0,
      "buyed": false,
      "image": "multimedia/img/cooperDig.webp"
    }
  ]`;
  const jsonDiggers = JSON.parse(newDiggers);
  createDiggers(jsonDiggers);
};
const loadDiggers = () => {
  const diggersSaved = JSON.parse(localStorage.getItem("digger"));
  diggersSaved === null ? displayDiggers() : createDiggers(diggersSaved);
};

loadDiggers();

const buyPickaxe = () => allPower[0].checkGold();
const buygroundDig = () => allPower[1].checkGold();
const buystoneDig = () => allPower[2].checkGold();
const buycopperDig = () => allPower[3].checkGold();

const cardLvlUi = document.querySelectorAll(".card__text__lvl");
const cardCostUi = document.querySelectorAll(".card__text__cost");
const cardPowerUi = document.querySelectorAll(".card__text__power");
const cardImageUi = document.querySelectorAll(".card__img__Photo");

const dig = () => {
  let totalPower = 0;
  allPower.forEach((dig) => {
    if (dig.buyed) {
      totalPower += dig.power;
    }
  });
  gold += totalPower;
  updateGold();
};
const updateDiggersVal = (digger) => {
  cardLvlUi[digger].textContent = `Lvl: ${allPower[digger].lvl}`;
  cardCostUi[digger].textContent = `${allPower[digger].cost}$`;
  cardPowerUi[digger].textContent = `Poder: ${allPower[digger].power}`;
};
const updateGold = () => {
  goldUi.textContent = gold;
  saveGold();
  updateWarning("");
};
const reset = () => {
  localStorage.clear();
  updateWarning(
    'porfavor recargar paguina, este boton ayuda con un "localStorage.clear()"'
  );
};
const loadGold = () => {
  if (loadGoldData === null) {
    loadGoldData = gold;
    updateGold();
  } else {
    gold = Number(loadGoldData);
    updateGold();
  }
};
const saveGold = () => (localStorage.totalGold = gold);
const updateWarning = (mensaje) => (warningUi.textContent = mensaje);
const savediggers = () => {
  let diggersPower = JSON.stringify(allPower);
  localStorage.setItem("digger", diggersPower);
};

resetgoldBtn.addEventListener("click", reset);
digBtn.addEventListener("click", dig);
