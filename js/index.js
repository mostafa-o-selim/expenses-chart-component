const colors = ["hsl(25, 47%, 15%)", "hsl(186, 34%, 60%)", "hsl(10, 79%, 65%)"];
const chart = document.getElementById("chart");
const total = document.querySelector(".total");
const add = document.querySelector(".add");
let $total = 0;


async function connect() {
  try {
    let start = await fetch("./data.json");
    let result = await start.json();

    let space = 0;

    for (let i = 0; i < result.length; i++) {
      const { day, amount } = result[i];
      const width = ~~((chart.clientWidth - (result.length - 1) * 10) / result.length),
        height = ~~(amount / 100 * chart.clientHeight);
      chart.innerHTML += `<div class="column">
      <div class="hover">
      <p class="datashow" id="svg${i}">$${amount}</p>
      <svg width="${width}" data-height="${height}" height="0" aria-describedby="svg${i}" id="day${i}">
      <rect x="0" y="0" width="${width}" height="${height}" fill="${colors[~~(colors.length * Math.random())]}" />
      Sorry, your browser does not support inline SVG.
      </svg>
      </div>
      <p class="gray" aria-describedby="day${i}">${day}</p>
      </div>`;
      space += 20;
      $total = $total + amount;
    }
    total.innerHTML = `$${($total + ($total * +add.dataset.add)).toFixed(2)}`;
    action()
  } catch (error) {
    throw error;
  }
}

connect()

function action() {
  const svg = document.querySelectorAll("svg");
  svg.forEach(sv => start(sv, sv.dataset.height));
}

function start(el, height) {
  let i = 0;
  const interval = setInterval(function () {
    el.setAttribute("height", i);
    i++;
    if (i == height) { clearInterval(interval) }
  }, height / 200);
}