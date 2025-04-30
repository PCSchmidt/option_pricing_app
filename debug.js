console.log('=== Chart debugging ===');

// Check if Chart.js is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('Chart object available:', typeof Chart !== 'undefined');
    
    // Check canvas element
    const canvas = document.getElementById('priceChart');
    console.log('Canvas element found:', canvas !== null);
    if (canvas) {
        console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
        console.log('Canvas CSS display:', getComputedStyle(canvas).display);
        
        // Try getting context 
        const ctx = canvas.getContext('2d');
        console.log('Canvas context available:', ctx !== null);
        
        // Draw something simple to test canvas
        if (ctx) {
            try {
                console.log('Testing canvas drawing...');
                ctx.fillStyle = '#ffd700';
                ctx.fillRect(10, 10, 100, 100);
                console.log('Basic canvas drawing successful');
            } catch (err) {
                console.error('Canvas drawing error:', err);
            }
        }
    }
    
    // Register for Chart.js errors
    window.addEventListener('error', function(event) {
        if (event.message && (event.message.includes('Chart') || event.message.includes('chart'))) {
            console.error('Chart.js error detected:', event.message);
        }
    });
});
