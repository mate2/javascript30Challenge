let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // Clear any existing timer
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    if (remainderSeconds < 10){
        remainderSeconds = `0${remainderSeconds}`;
    }
    const display = `${minutes}:${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    let end = new Date(timestamp);
    const hour = end.getHours();
    let minutes = end.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    if (hour < 10){
        hour = `0${hour}`;
    }
    endTime.textContent = `De retour à ${hour}:${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
});
