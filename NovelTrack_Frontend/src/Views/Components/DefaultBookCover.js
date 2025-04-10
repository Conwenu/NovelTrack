const getDefaultCover = (title, author) => {
    console.log(title, author)
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300">
        <!-- Gradient Definition -->
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
          </linearGradient>
        </defs>
  
        <!-- Background with Gradient -->
        <rect width="100%" height="100%" fill="url(#grad1)" />
  
        <!-- Title Text -->
        <text x="50%" y="40%" text-anchor="middle" font-size="18" fill="white">${title}</text>
  
        <!-- Author Text -->
        <text x="50%" y="60%" text-anchor="middle" font-size="14" fill="white">${author}</text>
      </svg>
    `;
  
    const encodedSvg = encodeURIComponent(svgContent);
    return `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getDefaultCoverOld = (title, author) => {
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="300">
      <rect width="100%" height="100%" fill="lightgray" />
      <text x="50%" y="40%" text-anchor="middle" font-size="18" fill="black">${title}</text>
      <text x="50%" y="60%" text-anchor="middle" font-size="14" fill="black">${author}</text>
    </svg>
  `;
  const encodedSvg = encodeURIComponent(svgContent);
  return `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
};

export {getDefaultCover, getRandomColor};