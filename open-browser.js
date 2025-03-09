let open;

// Try to require the open module, but don't fail if it's not available
try {
  open = require('open');
  console.log('Browser opener module loaded successfully');
} catch (error) {
  console.error('Browser opener module not available.');
  console.error('Please run "npm install open" first.');
  process.exit(1);
}

(async () => {
  try {
    console.log('Opening browser at http://localhost:3000...');
    await open('http://localhost:3000');
    console.log('Browser opened successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to open browser:', error);
    console.log('Please manually open http://localhost:3000 in your browser');
    process.exit(1);
  }
})(); 
