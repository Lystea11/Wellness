document.addEventListener('DOMContentLoaded', () => {
    const instructions = document.querySelector('.instructions');
    const innerCircle = document.querySelector('.inner-circle');
    const countdownElement = document.querySelector('.countdown');

    const inhaleTime = 4000;  // Inhale for 4 seconds
    const holdTime = 7000;    // Hold for 7 seconds
    const exhaleTime = 8000;  // Exhale for 8 seconds

    const affirmations = [
        "You're doing great!",
        "Keep up the good work!",
        "Today is a new opportunity!",
        "Believe in yourself!",
        "Every day is a fresh start!",
        "You're capable of amazing things!",
        "Stay positive and strong!",
        "Your potential is limitless!",
        "Keep pushing forward!",
        "Embrace the journey!"
    ];

    // Modal elements
    const affirmationModal = document.getElementById('affirmationModal');
    const affirmationText = document.getElementById('affirmationText');
    const closeModalButton = document.getElementById('closeModal');

    // Timer variable for scheduling affirmations
    let affirmationTimer;

    function updateCountdown(seconds) {
        countdownElement.textContent = seconds;
        const interval = setInterval(() => {
            seconds--;
            countdownElement.textContent = seconds;
            if (seconds <= 0) clearInterval(interval);
        }, 1000);
    }

    function breatheAnimation() {
        innerCircle.classList.remove('expandAnimation', 'shrink');
        void innerCircle.offsetWidth; // Trigger reflow
    
        // Inhale phase
        instructions.textContent = 'Breathe In';
        innerCircle.classList.add('expandAnimation');
        updateCountdown(inhaleTime / 1000);
    
        setTimeout(() => {
            // Hold after inhale
            instructions.textContent = 'Hold';
            updateCountdown(holdTime / 1000);
    
            setTimeout(() => {
                // Exhale phase
                instructions.textContent = 'Breathe Out';
                innerCircle.classList.remove('expandAnimation');
                innerCircle.classList.add('shrink');
                updateCountdown(exhaleTime / 1000);
    
                setTimeout(() => {
                    breatheAnimation(); // Restart the animation cycle
                }, exhaleTime);
    
            }, holdTime);
    
        }, inhaleTime);
    }

    breatheAnimation();
});