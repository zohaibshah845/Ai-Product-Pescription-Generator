// Content script that runs on all pages
console.log('AI Product Description Generator - Content script loaded');

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateDescription') {
    // Handle description generation
    sendResponse({ success: true });
  }
  
  if (request.action === 'getPageInfo') {
    // Get current page info
    const pageInfo = {
      url: window.location.href,
      title: document.title,
      metaDescription: getMetaContent('description'),
      productName: getProductName()
    };
    sendResponse(pageInfo);
  }
});

function getMetaContent(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta ? meta.content : '';
}

function getProductName() {
  // Try common product name selectors
  const selectors = [
    'h1.product-title',
    'h1[itemprop="name"]',
    '.product-name',
    '#product-name',
    'h1'
  ];
  
  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent.trim()) {
      return element.textContent.trim();
    }
  }
  
  return '';
}