const { spawn } = require('child_process');
let open;

// Try to require the open module, but don't fail if it's not available
try {
  open = require('open');
  console.log('Browser opener module loaded successfully');
} catch (error) {
  console.warn('Browser opener module not available. Browser will not open automatically.');
  console.warn('Please run "npm install open" or manually navigate to http://localhost:3000');
}

console.log('Starting Next.js frontend...');

// Start Next.js
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Wait for the server to start
setTimeout(async () => {
  if (!open) {
    console.log('Cannot open browser automatically. Please navigate to http://localhost:3000 manually.');
    return;
  }
  
  try {
    console.log('Opening browser at http://localhost:3000...');
    await open('http://localhost:3000');
    console.log('Browser opened successfully!');
  } catch (error) {
    console.error('Failed to open browser:', error);
    console.log('Please manually open http://localhost:3000 in your browser');
  }
}, 5000); // Wait 5 seconds for the server to start

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down Next.js...');
  nextProcess.kill();
  process.exit(0);
}); 