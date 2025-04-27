const promptInput = document.getElementById('prompt-input');
const generateImageBtn = document.getElementById('generate-image');
const generateVideoBtn = document.getElementById('generate-video');
const outputArea = document.getElementById('output-area');
const loading = document.getElementById('loading');
const historyList = document.getElementById('history-list');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Simulate Image Generation
generateImageBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (prompt === '') {
    alert('Please enter a prompt.');
    return;
  }
  generateContent('image', prompt);
});

// Simulate Video Generation
generateVideoBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (prompt === '') {
    alert('Please enter a prompt.');
    return;
  }
  generateContent('video', prompt);
});

// Content Generation Simulation
function generateContent(type, prompt) {
  outputArea.innerHTML = '';
  loading.classList.remove('hidden');

  setTimeout(() => {
    loading.classList.add('hidden');
    if (type === 'image') {
      outputArea.innerHTML = `<img src="https://via.placeholder.com/600x400.png?text=${encodeURIComponent(prompt)}" alt="Generated Image">`;
    } else {
      outputArea.innerHTML = `<video controls width="600">
                                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                                Your browser does not support HTML video.
                              </video>`;
    }
    addToHistory(type, prompt);
  }, 2000); // Simulate API delay
}

// Add to History
function addToHistory(type, prompt) {
  const listItem = document.createElement('li');
  listItem.textContent = `${type.toUpperCase()} - ${prompt}`;
  historyList.prepend(listItem);
}
