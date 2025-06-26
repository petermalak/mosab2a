import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'quiz-answers.json');
const QUESTIONS = [
  { q: 'ما هي عاصمة مصر؟', choices: ['الإسكندرية', 'القاهرة', 'أسوان', 'الأقصر'], correct: 1 },
  { q: 'كم يساوي ٢ + ٢؟', choices: ['٣', '٤', '٥', '٦'], correct: 1 },
  { q: 'ما لون السماء؟', choices: ['أزرق', 'أخضر', 'أحمر', 'أصفر'], correct: 0 },
  { q: 'ما هو أكبر قارة؟', choices: ['أفريقيا', 'آسيا', 'أوروبا', 'أمريكا الجنوبية'], correct: 1 },
  { q: 'ما هي درجة غليان الماء (°م)؟', choices: ['٥٠', '١٠٠', '١٥٠', '٢٠٠'], correct: 1 },
  { q: 'من كتب هاملت؟', choices: ['توفيق الحكيم', 'طه حسين', 'شكسبير', 'نجيب محفوظ'], correct: 2 },
  { q: 'ما هي عملة مصر؟', choices: ['الدولار', 'اليورو', 'الجنيه', 'الريال'], correct: 2 },
  { q: 'ما هو الرمز الكيميائي للماء؟', choices: ['CO2', 'O2', 'H2O', 'NaCl'], correct: 2 },
  { q: 'كم عدد أيام الأسبوع؟', choices: ['٥', '٦', '٧', '٨'], correct: 2 },
  { q: 'ما هو أسرع حيوان بري؟', choices: ['الأسد', 'الفهد', 'الغزال', 'الحصان'], correct: 1 },
];

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!fs.existsSync(DATA_FILE)) {
    return res.status(200).json({ winner: null });
  }
  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return res.status(500).json({ error: 'Failed to read data' });
  }
  // Find the first entry with all correct answers (as string indices)
  const winner = data.find(entry =>
    Array.isArray(entry.answers) &&
    entry.answers.length === QUESTIONS.length &&
    entry.answers.every((ans, i) => String(ans) === String(QUESTIONS[i].correct))
  );
  if (!winner) {
    return res.status(200).json({ winner: null });
  }
  return res.status(200).json({ winner: winner.phone, timestamp: winner.timestamp });
} 