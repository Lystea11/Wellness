document.addEventListener('DOMContentLoaded', () => {
  const moodSubmission = document.getElementById('moodSubmission');
  const moodSchedule = document.getElementById('moodSchedule');
  const moodSelect = document.getElementById('moodSelect');
  const submitMoodButton = document.getElementById('submitMood');
  const moodRows = document.getElementById('moodRows');
  const startHour = 8;  // 8 AM
  const endHour = 22;   // 10 PM
  const currentHour = new Date().getHours();
  let moodData = JSON.parse(localStorage.getItem('moodData')) || {};

  // Show the mood submission form if the current hour needs input
  if (currentHour >= startHour && currentHour <= endHour && !moodData[currentHour]) {
      moodSubmission.classList.remove('hidden');
  } else {
      showMoodSchedule(); // If already submitted or out of range, show schedule
  }

  // Handle mood submission
  submitMoodButton.addEventListener('click', () => {
      const selectedMood = moodSelect.value;
      if (selectedMood) {
          moodData[currentHour] = selectedMood;
          saveMoodData();
          moodSubmission.classList.add('hidden');  // Hide submission form
          showMoodSchedule();  // Show the schedule after submission
      } else {
          alert('Please select a mood!');
      }
  });

  // Save mood data to local storage
  function saveMoodData() {
      localStorage.setItem('moodData', JSON.stringify(moodData));
  }

  // Show the mood schedule
  function showMoodSchedule() {
      populateMoodRows();  // Populate rows with data
      moodSchedule.classList.remove('hidden');  // Ensure schedule is visible
  }

  // Populate the mood rows with saved data
  function populateMoodRows() {
      moodRows.innerHTML = '';  // Clear existing rows

      for (let hour = startHour; hour <= endHour; hour++) {
          const row = document.createElement('div');
          const mood = moodData[hour] || 'Not Submitted';

          const moodClass = getMoodClass(mood);  // Get class for mood

          // Only add a class if it's not empty
          if (moodClass) row.classList.add('mood-row', moodClass);
          else row.classList.add('mood-row');

          row.innerHTML = `
              <div class="mood-time">${formatHour(hour)}</div>
              <div class="mood-value">${mood}</div>
          `;
          moodRows.appendChild(row);
      }
  }

  // Get the appropriate class for mood-based coloring
  function getMoodClass(mood) {
      switch (mood.toLowerCase()) {
          case 'happy':
              return 'mood-happy';
          case 'neutral':
              return 'mood-neutral';
          case 'sad':
              return 'mood-sad';
          case 'stressed':
              return 'mood-stressed';
          case 'angry':
              return 'mood-angry';
          default:
              return '';  // Return empty string if no valid mood
      }
  }

  // Format the hour to display in 12-hour format (e.g., 8:00 AM)
  function formatHour(hour) {
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour > 12 ? hour - 12 : hour;
      return `${formattedHour}:00 ${suffix}`;
  }
});