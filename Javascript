const API_KEY = 'your-stability-ai-api-key';  // Replace this with your API key
const API_URL = 'https://api.stability.ai/v1/generate';  // Example endpoint, check documentation for real endpoint

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

// Generate Image
generateImageBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (prompt === '') {
    alert('Please enter a prompt.');
    return;
  }
  generateContent('image', prompt);
});

// Simulate Video Generation (can be extended later)
generateVideoBtn.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  if (prompt === '') {
    alert('Please enter a prompt.');
    return;
  }
  generateContent('video', prompt);
});

// Content Generation with Stability AI API
async function generateContent(type, prompt) {
  outputArea.innerHTML = '';
  loading.classList.remove('hidden');
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1, // Number of images to generate
        size: '512x512', // You can adjust the size (e.g., '256x256', '1024x1024')
      }),
    });
    
    const data = await response.json();
    if (response.ok && data && data.images && data.images[0]) {
      const imgUrl = data.images[0].url;
      outputArea.innerHTML = `<img src="${imgUrl}" alt="Generated Image">`;
    } else {
      outputArea.innerHTML = `<p>Failed to generate image: ${data.error || 'Unknown error'}</p>`;
    }
  } catch (error) {
    outputArea.innerHTML = `<p>There was an error connecting to the AI service.</p>`;
  } finally {
    loading.classList.add('hidden');
  }

  // Add to history
  addToHistory(type, prompt);
}

// Add to History
function addToHistory(type, prompt) {
  const listItem = document.createElement('li');
  listItem.textContent = `${type.toUpperCase()} - ${prompt}`;
  historyList.prepend(listItem);
}
