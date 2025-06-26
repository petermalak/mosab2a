// In-memory storage for Vercel compatibility
let quizData = [];

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
  
  // Find all entries with correct answers
  const winners = quizData.filter(entry =>
    Array.isArray(entry.answers) &&
    entry.answers.length === QUESTIONS.length &&
    entry.answers.every((ans, i) => String(ans) === String(QUESTIONS[i].correct))
  );
  
  // Sort by timestamp (earliest first)
  winners.sort((a, b) => a.timestamp - b.timestamp);
  
  const firstWinner = winners.length > 0 ? winners[0] : null;
  
  return res.status(200).json({ 
    winners: winners.map(w => ({
      phone: w.phone,
      timestamp: w.timestamp,
      date: new Date(w.timestamp).toLocaleString('ar-EG')
    })),
    firstWinner: firstWinner ? {
      phone: firstWinner.phone,
      timestamp: firstWinner.timestamp,
      date: new Date(firstWinner.timestamp).toLocaleString('ar-EG')
    } : null
  });
} 