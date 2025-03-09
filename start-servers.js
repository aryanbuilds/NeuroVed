const { spawn } = require('child_process');
const path = require('path');
let open;

// Try to require the open module, but don't fail if it's not available
try {
  open = require('open');
  console.log('Browser opener module loaded successfully');
} catch (error) {
  console.warn('Browser opener module not available. Browser will not open automatically.');
  console.warn('Please run "npm install open" or manually navigate to http://localhost:3000');
}

// Define paths
const frontendPath = path.join(__dirname, 'frontend');
const segmentationModelPath = path.join(__dirname, 'backend', '3d_segmentation_model');

// Function to start a server
function startServer(name, command, args, cwd) {
  console.log(`Starting ${name} server...`);
  
  const server = spawn(command, args, {
    cwd,
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', (data) => {
    const output = data.toString().trim();
    console.log(`[${name}] ${output}`);
    
    // Check for Next.js ready message
    if (name === 'Next.js' && output.includes('ready') && output.includes('started')) {
      openBrowser();
    }
  });

  server.stderr.on('data', (data) => {
    console.error(`[${name} ERROR] ${data.toString().trim()}`);
  });

  server.on('close', (code) => {
    console.log(`${name} server process exited with code ${code}`);
  });

  return server;
}

// Function to open browser
async function openBrowser() {
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
}

// Start 3D Segmentation Model server
const segmentationServer = startServer(
  '3D Segmentation',
  'npm',
  ['run', 'dev'],
  segmentationModelPath
);

// Start Next.js server (frontend) - this should be started last
const nextServer = startServer(
  'Next.js',
  'npm',
  ['run', 'dev'],
  frontendPath
);

// Fallback browser opening after a delay (in case we miss the ready message)
setTimeout(() => {
  openBrowser();
}, 10000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  nextServer.kill();
  segmentationServer.kill();
  process.exit(0);
});

console.log('\nServers started:');
console.log('- Next.js: http://localhost:3000 (opening in browser)');
console.log('- 3D Segmentation Model: http://localhost:3001 (running in background)');
console.log('\nPress Ctrl+C to stop all servers.\n'); 