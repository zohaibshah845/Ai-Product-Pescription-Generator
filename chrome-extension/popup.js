document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const generateBtn = document.getElementById('generateBtn');
    const productName = document.getElementById('productName');
    const category = document.getElementById('category');
    const features = document.getElementById('features');
    const audience = document.getElementById('audience');
    const tone = document.getElementById('tone');
    const length = document.getElementById('length');
    const resultDiv = document.getElementById('result');
    const descriptionText = document.getElementById('descriptionText');
    const copyBtn = document.getElementById('copyBtn');
    const saveBtn = document.getElementById('saveBtn');
    const statusDiv = document.getElementById('status');

    // API endpoint - change to your backend URL
    const API_URL = 'http://localhost:8000/api/generate/description';

    // Generate description
    generateBtn.addEventListener('click', async function() {
        // Validate inputs
        if (!productName.value.trim()) {
            showStatus('Please enter a product name', 'error');
            return;
        }

        if (!category.value.trim()) {
            showStatus('Please enter a category', 'error');
            return;
        }

        if (!features.value.trim()) {
            showStatus('Please enter key features', 'error');
            return;
        }

        // Prepare request data
        const requestData = {
            product_name: productName.value.trim(),
            category: category.value.trim(),
            key_features: features.value.split(',').map(f => f.trim()).filter(f => f),
            target_audience: audience.value.trim() || 'general consumers',
            tone: tone.value,
            length: length.value,
            language: 'en'
        };

        // Show loading state
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        showStatus('Generating description...', 'info');
        resultDiv.style.display = 'none';

        try {
            // Send request to backend
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Display result
            displayResult(data);
            showStatus('Description generated successfully!', 'success');
            
            // Save to history
            saveToHistory({
                product: requestData.product_name,
                description: data.content,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Error:', error);
            showStatus('Error generating description: ' + error.message, 'error');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Description';
        }
    });

    // Display result
    function displayResult(data) {
        let html = `<h3>${data.title || 'Product Description'}</h3>`;
        html += `<p>${data.content || 'No description generated'}</p>`;
        
        if (data.bullet_points && data.bullet_points.length > 0) {
            html += '<ul>';
            data.bullet_points.forEach(point => {
                html += `<li>${point}</li>`;
            });
            html += '</ul>';
        }

        if (data.seo_keywords && data.seo_keywords.length > 0) {
            html += '<div class="keywords">';
            html += '<strong>SEO Keywords:</strong> ';
            html += data.seo_keywords.join(', ');
            html += '</div>';
        }

        descriptionText.innerHTML = html;
        resultDiv.style.display = 'block';
        
        // Store for copy/save
        descriptionText.dataset.fullText = JSON.stringify(data);
    }

    // Copy to clipboard
    copyBtn.addEventListener('click', function() {
        const text = descriptionText.innerText;
        navigator.clipboard.writeText(text).then(() => {
            showStatus('Copied to clipboard!', 'success');
        }).catch(err => {
            console.error('Copy failed:', err);
            showStatus('Failed to copy', 'error');
        });
    });

    // Save to local storage
    saveBtn.addEventListener('click', function() {
        const data = descriptionText.dataset.fullText;
        if (data) {
            try {
                const parsed = JSON.parse(data);
                saveToHistory({
                    product: parsed.title || 'Untitled',
                    description: parsed.content || '',
                    timestamp: new Date().toISOString()
                });
                showStatus('Saved to history!', 'success');
            } catch (e) {
                showStatus('Failed to save', 'error');
            }
        }
    });

    // Save to history
    function saveToHistory(item) {
        chrome.storage.local.get(['history'], function(result) {
            let history = result.history || [];
            history.unshift(item); // Add to beginning
            if (history.length > 50) {
                history = history.slice(0, 50); // Keep only last 50
            }
            chrome.storage.local.set({ history: history });
        });
    }

    // Show status message
    function showStatus(message, type = 'info') {
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + type;
        statusDiv.style.display = 'block';
        
        if (type !== 'error') {
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Load saved history on popup open
    chrome.storage.local.get(['history'], function(result) {
        const history = result.history || [];
        if (history.length > 0) {
            // Show last generated description
            const last = history[0];
            productName.value = last.product || '';
        }
    });
});