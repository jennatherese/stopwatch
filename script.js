document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('play');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapList = document.getElementById('lapList');

    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    let lapStartTime = 0;

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            lapStartTime = startTime;
            tInterval = setInterval(updateTimer, 1000); // Update every second
            running = true;
        }
    }

    function stopTimer() {
        clearInterval(tInterval);
        running = false;
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        timerDisplay.innerHTML = '00:00:00';
        lapList.innerHTML = ''; // Clear lap times
        lapStartTime = 0;
    }

    function lapTimer() {
        if (running) {
            const lapTime = new Date().getTime();
            const lapDifference = lapTime - lapStartTime;
            lapStartTime = lapTime; // Reset lap start time

            // Calculate hours, minutes, and seconds for lap time
            const hours = Math.floor((lapDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((lapDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((lapDifference / 1000) % 60);

            // Format time as two digits
            const formattedHours = hours < 10 ? '0' + hours : hours;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

            // Add lap time to the list
            const lapItem = document.createElement('li');
            lapItem.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            lapList.appendChild(lapItem);
        }
    }

    function updateTimer() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        // Calculate hours, minutes, and seconds
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        // Format time as two digits
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        timerDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Add event listeners to the buttons
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', lapTimer);
});



