import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static files from root with HTML extension support
app.use(express.static(__dirname, {
  extensions: ['html', 'htm']
}));

// Route fallback: send 404.html if route not found
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`ZevairaLifestyle server running on http://${HOST}:${PORT}`);
});
