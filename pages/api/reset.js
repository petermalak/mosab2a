import { clearWinnersSheet } from '../../utils/sheets';

// In-memory storage for Vercel compatibility
let quizData = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Clear in-memory data
    quizData = [];
    
    // Clear Google Sheets data
    const sheetsResult = await clearWinnersSheet();
    
    if (sheetsResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'تم حذف جميع الإجابات بنجاح (من الذاكرة وملف جوجل شيتس)' 
      });
    } else {
      return res.status(200).json({ 
        success: true, 
        message: 'تم حذف الإجابات من الذاكرة فقط (فشل في حذف ملف جوجل شيتس)' 
      });
    }
  } catch (error) {
    console.error('Error in reset endpoint:', error);
    return res.status(500).json({ error: 'فشل في حذف البيانات' });
  }
} 