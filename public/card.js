lucide.createIcons();

// Function to convert HTML to image
function convertToImage() {
    const element = document.getElementById('personal-card');
    
    // Temporarily remove any right margin or padding
    const originalStyle = element.style.cssText;
    element.style.margin = '0';
    element.style.padding = '0';
    element.style.boxSizing = 'border-box';
    
    const originalWidth = element.offsetWidth;
    const originalHeight = element.offsetHeight;
    
    html2canvas(element, {
        scale: 2, // Increase resolution
        width: originalWidth,
        height: originalHeight,
        logging: true,
        letterRendering: 1,
        useCORS: true,
        backgroundColor: null, // Ensure transparent background
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
    }).then(canvas => {
        // Restore original style
        element.style.cssText = originalStyle;
        
        // Trim any potential white space
        const trimmedCanvas = trimCanvas(canvas);
        
        // Create image element
        const img = new Image();
        img.src = trimmedCanvas.toDataURL('image/png');
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.display = 'block'; // Prevent inline gaps
        
        // Append image to body
        document.body.appendChild(img);
        
        // Optional: create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = img.src;
        downloadLink.download = '个人社交名片.png';
        downloadLink.textContent = '下载图片';
        downloadLink.style.display = 'block';
        downloadLink.style.marginTop = '20px';
        document.body.appendChild(downloadLink);
    });
}

// Function to trim white space from canvas
function trimCanvas(canvas) {
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let left = canvas.width, top = canvas.height, right = 0, bottom = 0;

    for (let i = 0; i < canvas.width; i++) {
        for (let j = 0; j < canvas.height; j++) {
            const alpha = data[(j * canvas.width + i) * 4 + 3];
            if (alpha !== 0) {
                if (i < left) left = i;
                if (j < top) top = j;
                if (i > right) right = i;
                if (j > bottom) bottom = j;
            }
        }
    }

    const trimmed = context.getImageData(left, top, right - left + 1, bottom - top + 1);
    const trimmedCanvas = document.createElement('canvas');
    trimmedCanvas.width = right - left + 1;
    trimmedCanvas.height = bottom - top + 1;
    trimmedCanvas.getContext('2d').putImageData(trimmed, 0, 0);

    return trimmedCanvas;
}

// Call the function when the page loads
window.onload = function() {
    // Wait a bit for fonts to load
    setTimeout(convertToImage, 1000);
};