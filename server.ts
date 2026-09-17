import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('*all', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running on port ${PORT}`);
});
