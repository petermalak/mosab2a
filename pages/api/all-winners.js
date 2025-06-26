import { getWinnersFromSheet } from '../../utils/sheets';

// In-memory storage for Vercel compatibility
let quizData = [];

const QUESTIONS = [
  {
    "q": "ما هي اللغة الأصلية التي كُتب بها العهد القديم؟",
    "choices": [
      "اليونانية",
      "الآرامية",
      "العبرية",
      "اللاتينية"
    ],
    "correct": 2
  },
  {
    "q": "ما هو الاسم الذي يطلقه المسيحيون على الأناجيل الأربعة؟",
    "choices": [
      "التوراة",
      "الزبور",
      "الإنجيل",
      "المزامير"
    ],
    "correct": 2
  },
  {
    "q": "ما هي العقيدة التي تؤمن بها الكنيسة الأرثوذكسية بخصوص الثالوث القدوس؟",
    "choices": [
      "أن الله واحد في الأقانيم والجوهر",
      "أن الله ثلاثة أقانيم في جوهر واحد",
      "أن الله ثلاثة آلهة منفصلة",
      "أن الله أقنوم واحد فقط"
    ],
    "correct": 1
  },
  {
    "q": "ما هو مفهوم الخلاص في المسيحية الأرثوذكسية؟",
    "choices": [
      "الخلاص يتم بالإيمان فقط",
      "الخلاص يتم بالأعمال فقط",
      "الخلاص يتم بالإيمان والأعمال معًا",
      "الخلاص يتم بالمعمودية فقط"
    ],
    "correct": 2
  },
  {
    "q": "ما هي الأسفار التي يرفضها البروتستانت من العهد القديم وتعتبرها الكنيسة الأرثوذكسية أصيلة؟",
    "choices": [
      "أسفار الأنبياء",
      "أسفار القانونية الثانية",
      "أسفار المزامير",
      "أسفار التوراة"
    ],
    "correct": 1
  },
  {
    "q": "ما هو التقليد الكنسي في المسيحية الأرثوذكسية؟",
    "choices": [
      "مجموعة من العادات والتقاليد البشرية",
      "هو تعليم الكنيسة الذي استلمته من الرسل والآباء",
      "هو مجموعة من القوانين الكنسية فقط",
      "هو تفسير شخصي للكتاب المقدس"
    ],
    "correct": 1
  },
  {
    "q": "ما هي أهمية المجامع المسكونية في الكنيسة الأرثوذكسية؟",
    "choices": [
      "لتحديد القوانين الكنسية فقط",
      "لتحديد العقائد والإيمان المسيحي",
      "لتنظيم الحياة الرهبانية",
      "لتحديد أعياد الكنيسة"
    ],
    "correct": 1
  },
  {
    "q": "ما هو دور الروح القدس في الإيمان المسيحي الأرثوذكسي؟",
    "choices": [
      "هو مجرد قوة إلهية",
      "هو الذي يوحي بالكتاب المقدس ويهدي المؤمنين",
      "هو أقنوم منفصل عن الآب والابن",
      "هو مجرد رمز للإلهام"
    ],
    "correct": 1
  },
  {
    "q": "ما هو سر المعمودية في المسيحية الأرثوذكسية؟",
    "choices": [
      "هو مجرد طقس رمزي",
      "هو سر للخلاص وغفران الخطايا",
      "هو إعلان عام للإيمان",
      "هو شرط لدخول الكنيسة فقط"
    ],
    "correct": 1
  },
  {
    "q": "ما هو مفهوم التجسد في العقيدة المسيحية الأرثوذكسية؟",
    "choices": [
      "أن الله ظهر في هيئة إنسان لفترة مؤقتة",
      "أن الله اتخذ جسدًا بشريًا كاملاً دون أن يفقد لاهوته",
      "أن المسيح كان مجرد نبي عظيم",
      "أن المسيح كان إنسانًا عاديًا تم تأليهه"
    ],
    "correct": 1
  },
  {
    "q": "ما هي أهمية الصوم في المسيحية الأرثوذكسية؟",
    "choices": [
      "هو وسيلة لتعذيب الجسد",
      "هو وسيلة للتقرب إلى الله وضبط النفس",
      "هو مجرد تقليد قديم",
      "هو شرط لدخول الملكوت"
    ],
    "correct": 1
  },
  {
    "q": "من هو شفيع الكنيسة القبطية الأرثوذكسية؟",
    "choices": [
      "القديس بطرس",
      "القديس بولس",
      "القديس مرقس",
      "القديس يوحنا"
    ],
    "correct": 2
  },
  {
    "q": "متى تأسست الكنيسة القبطية الأرثوذكسية؟",
    "choices": [
      "في القرن الأول الميلادي على يد القديس بطرس",
      "في القرن الأول الميلادي على يد القديس مرقس الرسولي",
      "في القرن الرابع الميلادي بعد مجمع نيقية",
      "في القرن السابع الميلادي بعد الفتح الإسلامي لمصر"
    ],
    "correct": 1
  },
  {
    "q": "ما هو المجمع المسكوني الذي رفضت فيه الكنيسة القبطية الأرثوذكسية قراراته؟",
    "choices": [
      "مجمع نيقية",
      "مجمع القسطنطينية الأول",
      "مجمع أفسس",
      "مجمع خلقيدونية"
    ],
    "correct": 3
  },
  {
    "q": "من هو القبطي الذي يعتبر مؤسس الرهبنة في العالم؟",
    "choices": [
      "البابا أثناسيوس الرسولي",
      "البابا كيرلس الأول",
      "الأنبا أنطونيوس الكبير",
      "البابا شنودة الثالث"
    ],
    "correct": 2
  },
  {
    "q": "ما هو الحدث التاريخي الذي أدى إلى انفصال الكنيسة القبطية عن الكنائس الأخرى في القرن الخامس الميلادي؟",
    "choices": [
      "مجمع نيقية",
      "مجمع القسطنطينية الأول",
      "مجمع أفسس",
      "مجمع خلقيدونية"
    ],
    "correct": 3
  },
  {
    "q": "ما هو الدور الذي لعبته الكنيسة القبطية في الحفاظ على اللغة القبطية؟",
    "choices": [
      "لم تلعب أي دور في الحفاظ عليها",
      "استخدمتها في الطقوس والصلوات فقط",
      "قامت بتطويرها ونشرها بين عامة الشعب",
      "حظرت استخدامها واستبدلتها باليونانية"
    ],
    "correct": 1
  }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Try to get winners from Google Sheets first (persistent storage)
    const sheetsResult = await getWinnersFromSheet();
    
    if (sheetsResult.success && sheetsResult.data.length > 0) {
      // Use Google Sheets data
      const winners = sheetsResult.data;
      const firstWinner = winners.length > 0 ? winners[0] : null;
      
      return res.status(200).json({ 
        winners: winners.map(w => ({
          phone: w.phone,
          timestamp: w.timestamp,
          date: w.date
        })),
        firstWinner: firstWinner ? {
          phone: firstWinner.phone,
          timestamp: firstWinner.timestamp,
          date: firstWinner.date
        } : null,
        source: 'google-sheets'
      });
    }
    
    // Fallback to in-memory data if Google Sheets is empty or fails
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
      } : null,
      source: 'memory'
    });
    
  } catch (error) {
    console.error('Error in all-winners endpoint:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 