import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import axios from 'axios';

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

function validateEgyptPhone(phone) {
  return /^01[0-9]{9}$/.test(phone);
}

export default function Home() {
  const [step, setStep] = useState(0); // 0: phone, 1: quiz, 2: done
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(''));
  const [submitError, setSubmitError] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [done, setDone] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!validateEgyptPhone(phone)) {
      setPhoneError('يرجى إدخال رقم هاتف مصري صحيح (١١ رقم ويبدأ بـ 01)');
      return;
    }
    setPhoneError('');
    setStep(1);
  };

  const handleQuizChange = (idx, value) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWrongAnswer(false);
    setSubmitError('');
    // Check if all questions are answered
    if (answers.some(ans => ans === '')) {
      setSubmitError('يرجى الإجابة على جميع الأسئلة.');
      return;
    }
    // Check answers
    const allCorrect = QUESTIONS.every((q, i) => String(q.correct) === String(answers[i]));
    if (!allCorrect) {
      setWrongAnswer(true);
      return;
    }
    // Submit to backend
    try {
      await axios.post('/api/submit', { phone, answers });
      setDone(true);
      setStep(2);
    } catch (err) {
      setSubmitError(err.response?.data?.error || 'فشل في إرسال الإجابات.');
    }
  };

  return (
    <Box dir="rtl" display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#F9F5E1">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        {step === 0 && (
          <form onSubmit={handlePhoneSubmit}>
            <Typography variant="h5" mb={2}>أدخل رقم هاتفك المصري</Typography>
            <TextField
              label="رقم الهاتف"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              error={!!phoneError}
              helperText={phoneError}
              fullWidth
              inputProps={{ maxLength: 11, dir: 'ltr', style: { textAlign: 'right' } }}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              ابدأ الاختبار
            </Button>
          </form>
        )}
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" mb={2}>الأسئلة</Typography>
            {QUESTIONS.map((q, idx) => (
              <Box key={idx} mb={2}>
                <Typography mb={1}>{idx + 1}. {q.q}</Typography>
                <RadioGroup
                  value={answers[idx]}
                  onChange={e => handleQuizChange(idx, e.target.value)}
                  sx={{ mb: 1 }}
                >
                  {q.choices.map((choice, cidx) => (
                    <FormControlLabel
                      key={cidx}
                      value={String(cidx)}
                      control={<Radio />}
                      label={choice}
                      sx={{ textAlign: 'right', mr: 0 }}
                    />
                  ))}
                </RadioGroup>
              </Box>
            ))}
            {wrongAnswer && <Alert severity="error" sx={{ mb: 2 }}>هناك إجابة خاطئة واحدة على الأقل. حاول مرة أخرى.</Alert>}
            {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              إرسال الإجابات
            </Button>
          </form>
        )}
        {step === 2 && (
          <Box textAlign="center">
            <Typography variant="h5" mb={2}>شكرًا لإكمال الاختبار!</Typography>
            <Typography>تم إرسال إجاباتك بنجاح.</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}