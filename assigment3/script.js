document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById("timer");
    const startButton = document.querySelector('.start');
    const pauseButton = document.querySelector('.pause');
    const stopButton = document.querySelector('.stop');
    
    // Timer variables
    let timeLeft = 60;
    let timerInterval = null;
    let isPaused = false;
    
    // Initial button states
    pauseButton.disabled = true;
    stopButton.disabled = true;
    
    // Format time
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Update timer display
    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
        
        // Check if time is below 15 seconds
        if (timeLeft <= 15) {
            timerDisplay.classList.add('low-time');
        } else {
            timerDisplay.classList.remove('low-time');
        }
        
        // Check if timer reached 0
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00";
            alert("Time's up! Take a short break!");
            resetToInitialState();
        }
    }
    
    // Start timer function
    function startTimer() {
        if (timerInterval) return; 
        
        timerInterval = setInterval(function() {
            if (!isPaused) {
                timeLeft--;
                updateDisplay();
            }
        }, 1000);
        
        // Update button states
        startButton.disabled = true;
        pauseButton.disabled = false;
        stopButton.disabled = false;
        pauseButton.textContent = "Pause";
    }
    
    // Pause/Resume function
    function togglePause() {
        if (isPaused) {
            // Resume
            isPaused = false;
            pauseButton.textContent = "Pause";
        } else {
            // Pause
            isPaused = true;
            pauseButton.textContent = "Resume";
        }
    }
    
    // Stop/Reset function
    function stopTimer() {
        // Clear the interval
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        resetToInitialState();
    }
    
    // reset to initial state
    function resetToInitialState() {
        timeLeft = 60;
        isPaused = false;
        updateDisplay();
        
        
        startButton.disabled = false;
        pauseButton.disabled = true;
        stopButton.disabled = true;
        pauseButton.textContent = "Pause";
        
        
        timerDisplay.classList.remove('low-time');
    }
    

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', togglePause);
    stopButton.addEventListener('click', stopTimer);
    
    updateDisplay();
});