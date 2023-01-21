
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.disabled = true;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let intervalId = null;

function onBtnStartClick() {
  intervalId = setInterval(() => {
    btnStart.disabled = true;
    btnStop.disabled = false;
    document.body.style.background = getRandomHexColor();
  }, 1000);
};

function onBtnStopClick() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(intervalId);
};
