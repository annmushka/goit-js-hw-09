import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('button[data-start]');
const timerDaysRef = document.querySelector('span[data-days]');
const timerHoursRef = document.querySelector('span[data-hours]');
const timerMinutesRef = document.querySelector('span[data-minutes]');
const timerSecondsRef = document.querySelector('span[data-seconds]');

let intervalId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notify.failure('Please choose a date in the future');

      //alert('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

//console.log(flatpickr('#datetime-picker', options));

const flatpickrObj = flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onBtnStartClick);

function onBtnStartClick() {
  intervalId = setInterval(() => {
    btnStart.disabled = true;
    const difference = flatpickrObj.selectedDates[0] - Date.now();
    console.log(difference);

    if (difference <= 0) {
      clearInterval(intervalId);
      btnStart.disabled = false;
      return;
    }

    getValues(convertMs(difference));

  }, 1000);
}

function getValues({ days, hours, minutes, seconds }) {
  timerDaysRef.textContent = addLeadingZero(days);
  timerHoursRef.textContent = addLeadingZero(hours);
  timerMinutesRef.textContent = addLeadingZero(minutes);
  timerSecondsRef.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}