import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'quiz-answers.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { phone, answers } = req.body;
  if (!phone || !Array.isArray(answers) || answers.length !== 10) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  // Validate Egyptian phone number
  if (!/^01[0-9]{9}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid Egyptian phone number' });
  }
  // Save to file
  let data = [];
  if (fs.existsSync(DATA_FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
      data = [];
    }
  }
  // Prevent duplicate submissions from the same phone
  if (data.some(entry => entry.phone === phone)) {
    return res.status(409).json({ error: 'This phone number has already submitted answers.' });
  }
  const timestamp = Date.now();
  data.push({ phone, answers, timestamp });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return res.status(200).json({ success: true });
} 