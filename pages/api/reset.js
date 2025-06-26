import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'quiz-answers.json');

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    if (fs.existsSync(DATA_FILE)) {
      fs.unlinkSync(DATA_FILE);
    }
    return res.status(200).json({ success: true, message: 'تم حذف جميع الإجابات بنجاح' });
  } catch (error) {
    return res.status(500).json({ error: 'فشل في حذف الملف' });
  }
} 