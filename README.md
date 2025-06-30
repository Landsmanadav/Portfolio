# 🎮 Nadav Landesman Portfolio

מערכת אינטראקטיבית שנבנתה ב-React להצגת מסך פתיחה מסוג "Slide to Enter", עם אפקטים חזותיים מתקדמים, טקסט מוקלד כמו מכונת כתיבה, וניהול מצבים ואירועים חכם עם אנימציות מדויקות.

---

## 👢️ מבנה תיקיות

```
PORTFOLIO/
├── public/
├── src/
│   ├── assets/
│   │   └── Helper.jsx               # פונקציות עזר (כמו פיצול טקסט)
│   ├── components/
│   │   ├── Intro/
│   │   │   ├── Intro.jsx            # קומפוננטת הפתיחה הראשית
│   │   │   ├── IntroHeader.jsx      # טקסט מוקלד ואנימציות של שורות
│   │   │   ├── SlideToEnter.jsx     # קומפוננטת הסליידר
│   │   │   └── SlideToEnter.scss    # עיצוב הסליידר
│   │   ├── Shared/
│   │   │   └── CursorFollower.jsx   # אפקט עכבר אינטראקטיבי
│   │   └── Homepage/                # דפים בהמשך
│   ├── layout/
│   │   └── Layout.jsx               # עטיפת Layout כללית לאפליקציה
│   ├── styles/
│   │   ├── _animations.scss         # keyframes ואנימציות כלליות
│   │   ├── _variables.scss          # משתנים גלובליים (צבעים, spacing)
│   │   └── global.scss              # עיצוב כללי כולל reset, font וכו'
│   ├── App.jsx
│   ├── App.scss
│   └── main.jsx
├── index.html
├── vite.config.js
└── README.md ← (כאן אנחנו)
```

---

## ✨ תכונות עיקריות

- ⌨️ **טקסט מוקלד** שורה אחר שורה עם קו מהבהב (typewriter effect)
- 🎯 **Drag חכם** עם `useRef`, `AbortController` ו־ `requestAnimationFrame`
- 💡 התאמת `maxOffset` לפי גודל הכפתור וה־padding
- 🧼 מחיקת טקסט חלקית תוך כדי גרירה בעזרת CSS Mask
- 🎥 אנימציות עם `Framer Motion` לכל שורה – כולל אפקטים ייחודיים
- 👆 תמיכה בשימוש ב־SCSS מודולרי ואנימציות מותאמות אישית
- 👛 עיגול אינטראקטיבי שעוקב אחרי תנועת העכבר (`CursorFollower`)

---

## 🚧 To-Do (בשלבי פיתוח)

- [ ] אנימציית רקע שמגיבה ל־scroll (Canvas או Framer)
- [ ] תמיכה ב־mobile / טאץ׳ עם drag מותאם
- [ ] Scroll אינטראקטיבי בדפים הפנימיים
- [ ] מעבר חלק לדף הבית עם אנימציית יציאה
- [ ] חיבור ל־backend או n8n לקבלת מידע דינמי

---

## 💠 התקנה והרצה

```bash
npm install
npm run dev
```

---

## 🧪 שימוש בסיסי

```jsx
<SlideToEnter onUnlock={() => navigate("/home")} />
```

---

## 🧠 טכנולוגיות בשימוש

- React
- SCSS
- Framer Motion
- Vite
- CSS Masking
- requestAnimationFrame
- AbortController

---

בהצלחה בפרויקט – ממש מרשים מה שבנית עד עכשיו 🚀
