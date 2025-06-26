import { addWinnerToSheet } from '../../utils/sheets';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { phone, answers } = req.body;
  
  // Validate request body
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  
  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: 'Answers must be an array' });
  }
  
  if (answers.length !== 17) {
    return res.status(400).json({ error: 'Must have exactly 17 answers' });
  }
  
  // Validate Egyptian phone number
  if (!/^01[0-9]{9}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid Egyptian phone number' });
  }
  
  const timestamp = Date.now();
  const entry = { phone, answers, timestamp };
  quizData.push(entry);
  
  // Check if all answers are correct
  const allCorrect = QUESTIONS.every((q, i) => String(q.correct) === String(answers[i]));
  
  // If all answers are correct, add to Google Sheets
  if (allCorrect) {
    try {
      // Log environment variables for debugging (without exposing sensitive data)
      console.log('Environment check:', {
        hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
        hasSpreadsheetId: !!process.env.SPREADSHEET_ID,
        spreadsheetId: process.env.SPREADSHEET_ID ? 'Set' : 'Not set'
      });
      
      const result = await addWinnerToSheet({ phone, timestamp });
      
      if (!result.success) {
        console.error('Google Sheets error:', result.error);
        // Don't fail the request, just log the error
      }
    } catch (error) {
      console.error('Failed to add winner to Google Sheets:', error);
      // Don't fail the request if Google Sheets fails
    }
  }
  
  return res.status(200).json({ success: true });
} 