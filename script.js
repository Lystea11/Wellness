document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    const moodButtons = document.querySelectorAll('.mood-option');
    const moodRows = document.getElementById('moodRows');
    const moodSubmissionSection = document.getElementById('moodSubmission');
    const mindSnapAppSection = document.getElementById('mindSnapApp');
    const greeting = document.getElementById('greeting');

    // Affirmations array
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

    const stressButton = document.getElementById('stressButton');
    stressButton.addEventListener('click', () => {
        window.location.href = 'stress-relief.html';
    });

    const contactButton = document.getElementById('contactButton');
    contactButton.addEventListener('click', () => {
        window.location.href = 'mailto:ehopwood@asij.ac.jp';  // Replace with the correct email
    });

    // Modal elements
    const affirmationModal = document.getElementById('affirmationModal');
    const affirmationText = document.getElementById('affirmationText');
    const closeModalButton = document.getElementById('closeModal');

    // Timer variable for scheduling affirmations
    let affirmationTimer;

    // Get current date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];

    // Retrieve moodData from localStorage
    let storedData = JSON.parse(localStorage.getItem('moodData')) || {};

    // Check if stored data is for today
    if (storedData.date !== today) {
        // Reset moodData for new day
        storedData = {
            date: today,
            data: {} // Empty data
        };
        localStorage.setItem('moodData', JSON.stringify(storedData));
    }

    const moodData = storedData.data;

    const startHour = 8;
    const endHour = 22;
    const currentHour = new Date().getHours();

    // Determine whether to show mood submission or schedule
    if (currentHour >= startHour && currentHour <= endHour && !moodData[currentHour]) {
        // User has not submitted mood for current hour
        moodSubmissionSection.classList.remove('hidden');
        mindSnapAppSection.classList.add('hidden');
        greeting.textContent = 'Hello Mustang, how are you feeling today?';
    } else {
        // Mood already submitted or outside hours
        moodSubmissionSection.classList.add('hidden');
        mindSnapAppSection.classList.remove('hidden');
        greeting.textContent = 'Welcome Back Mustang';
    }

    // Add click event listeners to mood buttons
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedMood = button.getAttribute('data-mood');
            if (selectedMood) {
                moodData[currentHour] = selectedMood;

                // Update storedData with new moodData
                storedData.data = moodData;
                localStorage.setItem('moodData', JSON.stringify(storedData));

                // After submitting mood, hide submission section and show schedule
                moodSubmissionSection.classList.add('hidden');
                mindSnapAppSection.classList.remove('hidden');
                greeting.textContent = 'Welcome Back Mustang'; // Update the greeting text

                renderMoodRows(moodData);
            }
        });
    });

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', () => {
        affirmationModal.classList.add('hidden');
        scheduleRandomAffirmation(); // Schedule next affirmation
    });

    // Close modal when clicking outside the modal content
    affirmationModal.addEventListener('click', (e) => {
        if (e.target === affirmationModal || e.target.classList.contains('modal-overlay')) {
            affirmationModal.classList.add('hidden');
            scheduleRandomAffirmation(); // Schedule next affirmation
        }
    });

    // Start scheduling random affirmations
    scheduleRandomAffirmation();

    // Only render mood rows if schedule is visible
    if (!mindSnapAppSection.classList.contains('hidden')) {
        renderMoodRows(moodData);
    }

    // Function to schedule the affirmation modal at random intervals
    function scheduleRandomAffirmation() {
        // Clear any existing timers
        if (affirmationTimer) {
            clearTimeout(affirmationTimer);
        }

        // Set minimum and maximum delay in milliseconds (e.g., between 5 to 15 minutes)
        const minDelay = 0.1 * 60 * 1000; // 5 minutes
        const maxDelay = 0.6 * 60 * 1000; // 15 minutes

        const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

        affirmationTimer = setTimeout(() => {
            showAffirmationModal();
        }, randomDelay);
    }

    // Function to display the affirmation modal
    function showAffirmationModal() {
        // Pick a random affirmation
        const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
        affirmationText.textContent = randomAffirmation;
        affirmationModal.classList.remove('hidden');
    }
}

function renderMoodRows(moodData) {
    const moodRows = document.getElementById('moodRows');
    moodRows.innerHTML = ''; // Clear previous rows

    for (let hour = 8; hour <= 22; hour++) {
        const mood = moodData[hour] || 'Not Submitted';
        const moodRow = document.createElement('div');

        // Apply the mood class if the mood exists, else use a default class
        const moodClass = mood !== 'Not Submitted' ? `mood-${mood.toLowerCase()}` : 'mood-neutral';

        moodRow.className = `mood-row ${moodClass}`;
        moodRow.innerHTML = `
            <div class="mood-time">${formatHour(hour)}</div>
            <div class="mood-value">${capitalizeFirstLetter(mood)}</div>
        `;
        moodRows.appendChild(moodRow);
    }
}

function formatHour(hour) {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${adjustedHour}:00 ${suffix}`;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}