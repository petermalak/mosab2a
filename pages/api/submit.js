// In-memory storage for Vercel compatibility
let quizData = [];

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
  
  // Prevent duplicate submissions from the same phone
  if (quizData.some(entry => entry.phone === phone)) {
    return res.status(409).json({ error: 'This phone number has already submitted answers.' });
  }
  
  const timestamp = Date.now();
  quizData.push({ phone, answers, timestamp });
  
  return res.status(200).json({ success: true });
} 