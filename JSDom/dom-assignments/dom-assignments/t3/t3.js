const browserInfo = `${navigator.appName}, ${navigator.appVersion}`;

const osInfo = `${navigator.platform}`;

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const availableScreenWidth = window.screen.availWidth;
const availableScreenHeight = window.screen.availHeight;

const currentDate = new Date().toLocaleDateString('fi-FI', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

document.getElementById('browserInfo').textContent = `Browser: ${browserInfo}`;
document.getElementById('osInfo').textContent = `Operating System: ${osInfo}`;
document.getElementById(
  'screenInfo'
).textContent = `Screen Size: ${screenWidth} x ${screenHeight}, Available Space: ${availableScreenWidth} x ${availableScreenHeight}`;
document.getElementById(
  'dateTimeInfo'
).textContent = `Current Date and Time: ${currentDate}`;
