# Portfolio אישי – Nadav Landesman

**תיאור כללי**
זהו פרויקט Portfolio אישי מבוסס React ו-Vite, שנועד להציג את העבודה והכישורים שלי באמצעות דפי פרויקט ועיצובים אינטראקטיביים. כרגע בנינו את מסך ההתחלה (Entrance) עם אפקט Slide to Enter וטקסט מוקלד בסגנון מכונת כתיבה (typewriter effect) יחד עם אנימציות חלקות וניהול state מתוחכם.

---

## טכנולוגיות עיקריות

- React & Vite
- SCSS מודולרי
- Framer Motion לאנימציות
- CSS Masking & requestAnimationFrame & AbortController
- מבוסס Node.js (npm) לניהול תלותים

---

## פיצ'רים נוכחיים

1. **Entrance Screen** – מסך פתיחה עם גרירת Slider לשחרור הכניסה.
2. **Typewriter Effect** – הקלדת טקסט שורה אחר שורה עם סמן מהבהב.
3. **Cursor Follower** – עיגול אינטראקטיבי העוקב אחרי העכבר בעדינות.

---

## מבנה תיקיות

```text
Portfolio/
├── public/               # HTML סטטי ותוכן ציבורי
├── src/
│   ├── components/
│   │   ├── Intro/        # רכיבי מסך כניסה והטקסט המוקלד
│   │   └── Shared/       # רכיבים משותפים (למשל CursorFollower)
│   ├── layout/           # קומפוננטת Layout כללית
│   ├── styles/           # SCSS גלובלי, משתנים ואנימציות
│   ├── App.jsx           # נקודת הכניסה ל־React
│   └── main.jsx          # אתחול Vite
├── .gitignore            # סינון node_modules, build וכו'
├── package.json          # תלויות וסקריפטים
├── package-lock.json     # נעילת גרסאות תלותים
├── vite.config.js        # קונפיגורציית Vite
└── README.md             # מסמך זה
```

---

## התקנה והרצה

```bash
git clone https://github.com/Landsmanadav/Portfolio.git
cd Portfolio
npm install
npm run dev
```

יפעיל שרת פיתוח ב־[http://localhost:3000](http://localhost:3000)

---

## פיצ'רים בתכנון (To Do)

- אנימציית רקע מבוססת Canvas או Framer Motion על Scroll
- התאמה למכשירים ניידים ו-touch gestures
- דפי פרויקט נוספים עם תצוגת תמונות וקישורים
- חיבור ל-backend (API או n8n) להדגמת Data-Driven Projects
- אופטימיזציה ובדיקות ביצועים

---

## כיצד לתרום

1. צא לענף חדש מסגנון feature/…

```bash
git checkout -b feature/your-feature
```

2. הוסף או עדכן קוד, סגנונות או הנחיות.
3. בצע commit עם הודעה ברורה:

```bash
git add .
git commit -m "feat: תיאור הפיצ׳ר"
```

4. דחוף לענף שלך:

```bash
git push origin feature/your-feature
```

5. פתח Pull Request מ-GitHub לעבר main.

---

## רישיון

MIT © Nadav Landesman
