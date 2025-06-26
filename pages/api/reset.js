// In-memory storage for Vercel compatibility
let quizData = [];

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    quizData = [];
    return res.status(200).json({ success: true, message: 'تم حذف جميع الإجابات بنجاح' });
  } catch (error) {
    return res.status(500).json({ error: 'فشل في حذف البيانات' });
  }
} 