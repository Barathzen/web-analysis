const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Use morgan for HTTP request logging (web server log files)
app.use(morgan('combined', { stream: accessLogStream }));

// Also log to console for development
app.use(morgan('dev'));

// Serve static files from public directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(express.json());

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to demonstrate data collection
app.post('/api/track', (req, res) => {
  // This simulates server-side tracking
  const trackingData = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    referrer: req.get('Referrer'),
    ...req.body
  };
  
  // Log to a separate tracking file
  const trackingLogStream = fs.createWriteStream(
    path.join(logsDir, 'tracking.log'),
    { flags: 'a' }
  );
  trackingLogStream.write(JSON.stringify(trackingData) + '\n');
  trackingLogStream.end();
  
  res.json({ success: true, message: 'Data tracked successfully' });
});

// Endpoint to view server logs (for demo purposes)
app.get('/logs', (req, res) => {
  const logFile = path.join(logsDir, 'access.log');
  if (fs.existsSync(logFile)) {
    const logs = fs.readFileSync(logFile, 'utf8');
    res.type('text/plain').send(logs);
  } else {
    res.status(404).send('No logs found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Access logs being written to: ${path.join(logsDir, 'access.log')}`);
  console.log(`Tracking logs being written to: ${path.join(logsDir, 'tracking.log')}`);
});