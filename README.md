<div dir="rtl">

# 🎨 Nadav Landesman – תיק עבודות (Portfolio)

> מערכת אינטראקטיבית להצגת מסך פתיחה “Slide to Enter” עם אנימציות מתקדמות, אפקט טקסט מוקלד וחוויית משתמש חלקה.

---

## 📂 מבנה הפרויקט

```
Portfolio/
├── public/
├── src/
│   ├── assets/
│   │   └── Helper.jsx            # פונקציות עזר (כמו פיצול טקסט)
│   ├── components/
│   │   ├── Intro/
│   │   │   ├── Intro.jsx          # קומפוננטת הפתיחה הראשית
│   │   │   ├── IntroHeader.jsx    # טקסט מוקלד ואנימציות
│   │   │   ├── SlideToEnter.jsx   # סליידר כניסה
│   │   │   └── SlideToEnter.scss  # עיצוב סליידר
│   │   └── Shared/
│   │       └── CursorFollower.jsx # עיגול עוקב אחר העכבר
│   ├── layout/
│   │   └── Layout.jsx             # תבנית (Layout) כללית
│   ├── styles/
│   │   ├── _animations.scss       # אנימציות ו-keyframes
│   │   ├── _variables.scss        # משתני SCSS גלובליים
│   │   └── global.scss            # איפוס סגנון ו-font
│   ├── App.jsx
│   ├── App.scss
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md                      # ← כאן
```

---

## ✨ תכונות עיקריות

- ⌨️ **Typewriter effect** לטקסט שורה אחרי שורה עם קו מהבהב
- 🕹️ **Drag חכם** עם `useRef`, `AbortController` ו-`requestAnimationFrame`
- 🎭 **CSS Mask** לחיתוך חלקי של טקסט בעת גרירה
- 🎥 **אנימציות חלקות** לכל אלמנט באמצעות Framer Motion
- 🖌️ **SCSS מודולרי** עם משתני עיצוב ואנימציות מותאמות
- 🌀 **Cursor Follower** – עיגול אינטראקטיבי העוקב אחרי העכבר

---

## 🚀 התקנה והרצה

```bash
# התקנת תלותים
npm install

# הפעלה במצב פיתוח
npm run dev
```

---

## 🛠️ טכנולוגיות בשימוש

- **React**
- **Vite**
- **SCSS**
- **Framer Motion**
- **CSS Masking**
- **requestAnimationFrame**
- **AbortController**

---

## 🔭 בתכנון (To-Do)

- 🌈 אנימציית רקע דינמית באמצעות Canvas או Framer
- 📱 תמיכה מלאה במובייל ו-touch drag
- 📜 אנימציית Scroll פנימית בדפים הפנימיים
- 🔄 אנימציית יציאה חלקה לדף הבית
- 🔌 חיבור ל-backend או ל-n8n לקבלת תוכן דינמי

---

## 🤝 תרומה

שאלות, הערות או שיפורים?

1. פתח Issue
2. שלח Pull Request

---

## 📄 רישיון

MIT © Nadav Landesman

---

### ליצירת קשר

[GitHub של Nadav Landesman](https://github.com/Landsmanadav)

</div>
