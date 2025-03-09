const { spawn } = require('child_process');
const path = require('path');
const { exec } = require('child_process');

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
    console.log(`[${name}] ${data.toString().trim()}`);
  });

  server.stderr.on('data', (data) => {
    console.error(`[${name} ERROR] ${data.toString().trim()}`);
  });

  server.on('close', (code) => {
    console.log(`${name} server process exited with code ${code}`);
  });

  return server;
}

// Start Next.js server (frontend)
const nextServer = startServer(
  'Next.js',
  'npm',
  ['run', 'dev'],
  frontendPath
);

// Start 3D Segmentation Model server
const segmentationServer = startServer(
  '3D Segmentation',
  'npm',
  ['run', 'dev'],
  segmentationModelPath
);

// Open browser for Next.js frontend only
setTimeout(() => {
  const url = 'http://localhost:3000';
  console.log(`Opening browser for ${url}...`);
  
  // Open browser based on platform
  const platform = process.platform;
  let command;
  
  if (platform === 'win32') {
    command = `start ${url}`;
  } else if (platform === 'darwin') {
    command = `open ${url}`;
  } else {
    command = `xdg-open ${url}`;
  }
  
  exec(command, (error) => {
    if (error) {
      console.error(`Failed to open browser: ${error}`);
    }
  });
}, 3000); // Wait 3 seconds to ensure server is ready

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