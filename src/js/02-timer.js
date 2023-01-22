import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');

startBtn.setAttribute('disabled', '');
let checkedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    checkedTime = selectedDates[0].getTime();
    if (options.defaultDate > checkedTime) {
      Notify.success('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
      return;
    } else {
      startBtn.removeAttribute('disabled', '');
      startBtn.addEventListener('click', onStartBtnClick);

      function onStartBtnClick() {
        const timerId = setInterval(() => {
          startBtn.setAttribute('disabled', '');
          const lengthTimer = selectedDates[0] - Date.now();

          const { days, hours, minutes, seconds } = convertMs(lengthTimer);
          if (lengthTimer <= 0) {
            clearInterval(timerId);
            return;
          }
          document.querySelector('span[data-days]').textContent = days;
          document.querySelector('span[data-hours]').textContent = hours;
          document.querySelector('span[data-minutes]').textContent = minutes;
          document.querySelector('span[data-seconds]').textContent = seconds;
        }, 1000);
      }
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}