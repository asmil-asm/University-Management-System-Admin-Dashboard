<div align="center">

# 🎓 نظام إدارة الجامعة – لوحة التحكم

### University Management System – Admin Dashboard

🔗 **Live Demo (Render):** [https://university-management-admin-dashboard.onrender.com/]


لوحة تحكم إدارية متكاملة وعصرية لنظام إدارة جامعي، مبنية بأحدث تقنيات **React 19** و**Vite**، وتتواصل مع واجهة API خلفية مبنية بـ **Django REST Framework**.

[![React](https://img.shields.io/badge/React-19.2.5-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0.10-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

[![GitHub stars](https://img.shields.io/github/stars/asmil-asm/Dashboard-University_system?style=social)](https://github.com/asmil-asm/Dashboard-University_system/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/asmil-asm/Dashboard-University_system?style=social)](https://github.com/asmil-asm/Dashboard-University_system/network/members)
[![GitHub issues](https://img.shields.io/github/issues/asmil-asm/Dashboard-University_system)](https://github.com/asmil-asm/Dashboard-University_system/issues)

</div>

---

## 📋 جدول المحتويات

- [نظرة عامة](#-نظرة-عامة)
- [الميزات الرئيسية](#-الميزات-الرئيسية)
- [التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [المتطلبات المسبقة](#-المتطلبات-المسبقة)
- [التثبيت](#-التثبيت)
- [الإعداد](#-الإعداد)
- [التشغيل](#-التشغيل)
- [البناء والنشر](#-البناء-والنشر)
- [النشر على Render](#-النشر-على-render)
- [هيكل المشروع](#-هيكل-المشروع)
- [التكامل مع الواجهة الخلفية](#-التكامل-مع-الواجهة-الخلفية)
- [المصادقة والأمان](#-المصادقة-والأمان)
- [التوطين (i18n)](#-التوطين-i18n)
- [إدارة الحالة](#-إدارة-الحالة)
- [استكشاف الأخطاء](#-استكشاف-الأخطاء)
- [خارطة الطريق](#-خارطة-الطريق)
- [المساهمة](#-المساهمة)
- [الترخيص](#-الترخيص)
- [التواصل](#-التواصل)

---

## 🎯 نظرة عامة

**لوحة التحكم** هي الواجهة الإدارية لنظام إدارة الجامعة، تتيح للمسؤولين إدارة جميع جوانب النظام من مكان واحد. تعتمد اللوحة على واجهة API خلفية مبنية بـ Django وتُدار عملياتها عبر RESTful endpoints مع مصادقة JWT.

### الأهداف الرئيسية

- ✅ **واجهة عصرية وسريعة** مبنية على React 19 + Vite.
- ✅ **دعم كامل للغة العربية** مع إمكانية التبديل بين `ar` و `en`.
- ✅ **تصميم متجاوب** يعمل على الحواسيب والأجهزة اللوحية والهواتف.
- ✅ **تجربة مستخدم سلسة** مع رسوم متحركة وإشعارات فورية.
- ✅ **قابلية التوسّع** عبر بنية معيارية قابلة للصيانة.

---

## ✨ الميزات الرئيسية

### 🔐 المصادقة والصلاحيات
- تسجيل دخول آمن عبر JWT.
- تجديد تلقائي للتوكن (Auto Refresh Token).
- حماية المسارات عبر `ProtectedRoute` و`RoleGuard`.
- تسجيل خروج آمن مع تنظيف الجلسة.

### 📊 لوحة النظرة العامة
- إحصائيات فورية عن المحتوى (عدد الأخبار، الرسائل، المستخدمين...).
- رسوم بيانية تفاعلية عبر **Recharts**.
- بطاقات موجزة قابلة للتخصيص.

### 🏛️ إدارة الجامعة
- تعديل معلومات الجامعة (الاسم، الشعار، الموقع، الفروع).
- إدارة روابط التواصل الاجتماعي.
- إدارة اللغات المدعومة.

### 📄 إدارة الصفحات
- إنشاء وتعديل الصفحات ثنائية اللغة (عربي/إنجليزي).
- محرر نصوص غني (Rich Text Editor).
- رفع الصور وإدارتها.

### 📚 الشؤون الأكاديمية
- إدارة الكليات والأقسام.
- إدارة البرامج الأكاديمية والمقررات.

### 🎓 القبول والتسجيل
- إدارة متطلبات القبول.
- مراجعة طلبات التقديم وتحديث حالتها.
- إدارة مستندات المتقدمين.

### 💼 الوظائف
- نشر الوظائف الشاغرة.
- مراجعة طلبات التوظيف.

### 📰 الأخبار
- إنشاء وتحرير الأخبار ثنائية اللغة.
- تصنيف الأخبار.
- جدولة النشر.

### 🛠️ الخدمات
- إدارة الخدمات التي تقدمها الجامعة.
- تصنيف الخدمات.

### ✉️ رسائل التواصل
- عرض الرسائل الواردة من الزوار.
- الرد على الرسائل.
- تصنيف الرسائل (مقروءة/غير مقروءة).

### 👥 إدارة المستخدمين
- إضافة وتعديل المستخدمين.
- تعيين الأدوار والصلاحيات.
- تعطيل/تفعيل الحسابات.

### 🌐 الترجمة
- دعم كامل للعربية والإنجليزية.
- تبديل اللغة فوري دون إعادة تحميل.
- إدارة ملفات الترجمة عبر `i18next`.

### 🔔 الإشعارات
- إشعارات فورية عبر **react-hot-toast**.
- تنبيهات النجاح والخطأ والتحذير.

### 🎨 التصميم والرسوم المتحركة
- تصميم حديث عبر **Tailwind CSS 4**.
- رسوم متحركة سلسة عبر **Framer Motion**.
- أيقونات متجهية عبر **React Icons**.
- دعم الوضع الفاتح (Light Mode) (والداكن قيد التطوير).

---

## 🛠️ التقنيات المستخدمة

### Core

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| [React](https://react.dev/) | 19.2.5 | مكتبة بناء الواجهة |
| [Vite](https://vitejs.dev/) | 8.0.10 | أداة البناء وخادم التطوير |
| [React DOM](https://react.dev/) | 19.2.5 | ربط React بـ DOM |
| [React Router DOM](https://reactrouter.com/) | 7.15.0 | التوجيه |

### Styling & UI

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| [Tailwind CSS](https://tailwindcss.com/) | 4.2.4 | إطار التنسيق |
| [React Icons](https://react-icons.github.io/react-icons/) | 5.6.0 | مكتبة الأيقونات |
| [Framer Motion](https://www.framer.com/motion/) | 12.38.0 | الرسوم المتحركة |
| [React Hot Toast](https://react-hot-toast.com/) | 2.6.0 | الإشعارات |

### State & Data

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.15 | إدارة الحالة العامة |
| [TanStack Query](https://tanstack.com/query) | 5.104.1 | جلب البيانات والتخزين المؤقت |
| [Axios](https://axios-http.com/) | 1.16.0 | عميل HTTP |

### i18n & Charts

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| [i18next](https://www.i18next.com/) | 26.2.0 | الترجمة |
| [react-i18next](https://react.i18next.com/) | 17.0.8 | ربط i18next مع React |
| [Recharts](https://recharts.org/) | 3.8.1 | الرسوم البيانية |

### Dev Tools

| الأداة | الدور |
|--------|-------|
| [ESLint](https://eslint.org/) | فحص جودة الكود |
| [Prettier](https://prettier.io/) | تنسيق الكود |

---

## 📦 المتطلبات المسبقة

قبل البدء، تأكد من توفر ما يلي:

| المتطلب | الإصدار الموصى به | التحقق |
|---------|-------------------|--------|
| **Node.js** | 18.x أو أحدث | `node --version` |
| **npm** | 9.x أو أحدث | `npm --version` |
| **yarn** (اختياري) | 1.22.x أو أحدث | `yarn --version` |
| **Git** | أي إصدار حديث | `git --version` |

### تشغيل الواجهة الخلفية

يجب أن تكون واجهة API الخلفية (Django) مشغّلة على المنفذ `8000` (أو أي منفذ آخر تحدده).

```bash
# في مجلد مستودع الواجهة الخلفية
python manage.py runserver
```

---

## ⚙️ التثبيت

### 1. استنساخ المستودع

```bash
git clone https://github.com/asmil-asm/University-Management-System-Admin-Dashboard.git
cd University-Management-System-Admin-Dashboard
```

### 2. تثبيت الحزم

```bash
npm install
```

أو باستخدام `yarn`:

```bash
yarn install
```

---

## 🔧 الإعداد

### متغيرات البيئة

أنشئ ملف `.env` في جذر المشروع وأضف المتغيرات التالية:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=University Management System
```

> **مهم:** في Vite، لا تُعرَض للمتصفح إلا المتغيرات التي تبدأ بـ `VITE_`. أي متغير بدون هذا البادئة سيكون `undefined` في كود العميل[reference:0]. لا تُضمّن مفاتيح سرية أو كلمات مرور في متغيرات `VITE_` لأنها تُحزَّم داخل ملفات JavaScript النهائية.

---

## 🚀 التشغيل

### بيئة التطوير

```bash
npm run dev
```

سيعمل التطبيق على:

```text
http://localhost:5173
```

### معاينة نسخة الإنتاج محليًا

```bash
npm run build
npm run preview
```

---

## 🏗️ البناء والنشر

### بناء نسخة الإنتاج

```bash
npm run build
```

سيتم إنشاء مجلد `dist/` يحتوي على ملفات HTML وCSS وJavaScript الجاهزة للنشر.

### النشر على Render

المشروع واجهة أمامية (SPA) مبنية بـ Vite، لذا يُنشر على Render كـ **Static Site**. يدعم Render المواقع الثابتة عبر CDN عالمي، ويعيد النشر تلقائيًا عند كل دفعة إلى الفرع المحدد[reference:1].

#### الطريقة الأولى: النشر عبر لوحة تحكم Render (موصى بها)

1. **إنشاء حساب على Render**  
   انتقل إلى [dashboard.render.com](https://dashboard.render.com) وسجّل الدخول (يُفضّل باستخدام GitHub).

2. **إنشاء Static Site جديد**  
   - اضغط **New +** ← **Static Site**.
   - اربط حساب GitHub واختر مستودع `asmil-asm/University-Management-System-Admin-Dashboard`.
   - اختر الفرع المطلوب (مثل `main`).

3. **إعدادات البناء**  
   استخدم القيم التالية لمشروع Vite[reference:2]:

   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`

   > إذا لم يكن لديك `package-lock.json`، استخدم `npm install && npm run build` بدلًا من `npm ci`.

4. **إضافة متغيرات البيئة**  
   في قسم **Environment Variables**، أضف:

   ```env
   VITE_API_BASE_URL=https://your-backend.onrender.com/api
   VITE_APP_NAME=University Management System
   ```

   > استبدل `VITE_API_BASE_URL` بعنوان URL الفعلي للواجهة الخلفية بعد نشرها على Render (أو أي استضافة أخرى).

5. **إضافة قاعدة إعادة الكتابة (SPA Rewrite)**  
   المشروع يستخدم React Router للتوجيه من جانب العميل. أضف القاعدة التالية حتى تعمل الروابط المباشرة مثل `/dashboard` أو `/users/1`:

   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`

   Render يطبق إعادة الكتابة عندما لا يوجد ملف فعلي في المسار المطلوب، مما يسمح لـ React Router بالتعامل مع المسار[reference:3][reference:4].

6. **النشر**  
   اضغط **Create Static Site**. سيبدأ Render عملية البناء والنشر، وبعد الانتهاء سيكون التطبيق متاحًا على رابط `*.onrender.com`.

7. **تحديث رابط الواجهة الخلفية**  
   تأكد من أن `VITE_API_BASE_URL` يشير إلى الواجهة الخلفية المنشورة، وأن إعدادات CORS في Django تسمح بالنطاق الجديد (`https://your-app.onrender.com`).

---

#### الطريقة الثانية: استخدام `render.yaml` (Infrastructure as Code)

لجعل النشر قابلًا للتكرار، أضف ملف `render.yaml` في جذر المستودع. هذا الملف يعرّف الخدمة والمتغيرات وقواعد التوجيه بشكل تعريفي[reference:5][reference:6].

```yaml
services:
  - type: web
    name: university-admin-dashboard
    runtime: static
    branch: main
    buildCommand: npm ci && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: VITE_API_BASE_URL
        sync: false
      - key: VITE_APP_NAME
        sync: false
```

ثم من لوحة تحكم Render:

1. اضغط **New +** ← **Blueprint**.
2. اربط المستودع واختر ملف `render.yaml`.
3. أدخل قيم متغيرات البيئة عند الطلب.
4. سيقوم Render بإنشاء الموقع الثابت وإعداداته تلقائيًا.

> إعداد `sync: false` يعني أن Render لن يقرأ القيمة من المستودع، بل سيطلبها منك أثناء الإعداد. لا تضع قيمًا سرية حقيقية داخل `render.yaml` أو المستودع.

---

### نشر الواجهة الخلفية (Django) على Render

الواجهة الخلفية مشروع Django، وتُنشر على Render كـ **Web Service** منفصل (وليس Static Site). بشكل عام:

1. أنشئ **Web Service** جديدًا واربط مستودع Django.
2. حدد أمر البناء وأمر التشغيل المناسبين (مثل `pip install -r requirements.txt` ثم `gunicorn` أو `python manage.py runserver` حسب إعدادك).
3. أضف متغيرات البيئة الخاصة بـ Django (مثل `SECRET_KEY`، `DATABASE_URL`، `ALLOWED_HOSTS`).
4. انسخ رابط الخدمة الناتج (`https://your-backend.onrender.com`) واستخدمه في `VITE_API_BASE_URL` للواجهة الأمامية.

> راجع توثيق Render الخاص بـ [Django](https://render.com/docs/deploy-django) للحصول على إعدادات مفصلة.

---

### ملاحظات مهمة حول النشر

- **المتغيرات السرية:** لا تضع مفاتيح API أو كلمات المرور في متغيرات تبدأ بـ `VITE_`، لأنها تُضمَّن في حزمة JavaScript النهائية وتكون مرئية للمستخدمين[reference:7].
- **إعادة الكتابة إلزامية:** بدون قاعدة `/* → /index.html`، ستؤدي إعادة تحميل صفحة داخلية (مثل `/dashboard`) إلى خطأ `404` على Render.
- **الواجهة الخلفية وCORS:** بعد نشر الواجهة الأمامية على Render، أضف نطاقها إلى `CORS_ALLOWED_ORIGINS` في إعدادات Django.
- **الفرع والنشر التلقائي:** أي دفعة إلى الفرع المحدد في Render ستؤدي إلى إعادة بناء ونشر تلقائي.

---

## 📁 هيكل المشروع

```text
University-Management-System-Admin-Dashboard/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── locales/
│   ├── layouts/
│   ├── utils/
│   └── assets/
├── .env.example
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── render.yaml          # اختياري: تعريف النشر على Render
└── README.md
```

---

## 🔗 التكامل مع الواجهة الخلفية

تعتمد اللوحة على واجهة API خلفية مبنية بـ Django REST Framework. نقاط النهاية الأساسية المتوقعة:

| المجموعة | نقطة النهاية (مثال) |
|----------|---------------------|
| المصادقة | `/api/auth/login/`, `/api/auth/refresh/` |
| المستخدمين | `/api/users/` |
| الأخبار | `/api/news/` |
| الصفحات | `/api/pages/` |
| الكليات | `/api/faculties/` |
| البرامج | `/api/programs/` |
| المقررات | `/api/courses/` |
| الوظائف | `/api/jobs/` |
| الخدمات | `/api/services/` |
| رسائل التواصل | `/api/contact-messages/` |

> عدّل القائمة أعلاه لتطابق المسارات الفعلية في واجهتك الخلفية.

---

## 🔐 المصادقة والأمان

- **JWT Access Token** قصير العمر يُستخدم في كل طلب.
- **Refresh Token** يُستخدم لتجديد الـ Access Token تلقائيًا.
- يتم تخزين التوكنات في `localStorage` أو `sessionStorage` حسب إعداد المشروع (راجع طبقة `services`).
- المسارات المحمية تُغلَّف بـ `ProtectedRoute`، والأدوار تُفحص عبر `RoleGuard`.
- يُنصح دائمًا باستخدام HTTPS في الإنتاج (Render يوفره تلقائيًا).

---

## 🌍 التوطين (i18n)

- الترجمة مبنية على `i18next` و`react-i18next`.
- اللغات المدعومة حاليًا: العربية (`ar`) والإنجليزية (`en`).
- ملفات الترجمة موجودة في `src/locales/`.
- يمكن تبديل اللغة فوريًا دون إعادة تحميل الصفحة.

---

## 🗂️ إدارة الحالة

- **Zustand**: للحالة العامة (مثل حالة المستخدم، اللغة، إعدادات الواجهة).
- **TanStack Query**: لجلب البيانات من الـ API وإدارة التخزين المؤقت وإعادة الجلب.
- **Axios**: طبقة HTTP مع اعتراضات (interceptors) لإرفاق التوكن ومعالجة الأخطاء.

---

## 🐛 استكشاف الأخطاء

| المشكلة | السبب المحتمل | الحل |
|---------|---------------|------|
| `404` عند تحديث صفحة داخلية | عدم وجود SPA rewrite على Render | أضف قاعدة `/* → /index.html` |
| `undefined` لمتغير بيئة في الإنتاج | المتغير لا يبدأ بـ `VITE_` | أعد تسميته ليبدأ بـ `VITE_` |
| فشل طلبات API بعد النشر | `VITE_API_BASE_URL` خاطئ أو CORS غير مضبوط | صحّح الرابط وأضف النطاق إلى CORS |
| فشل البناء على Render | `package-lock.json` غير موجود مع `npm ci` | استخدم `npm install` أو أضف ملف القفل |
| خطأ في تجديد التوكن | انتهاء صلاحية Refresh Token | أعد تسجيل الدخول |

---

## 🗺️ خارطة الطريق

- [ ] إضافة الوضع الداكن (Dark Mode).
- [ ] إضافة اختبارات آلية (Unit + E2E).
- [ ] تحسين إمكانية الوصول (Accessibility).
- [ ] إضافة إدارة الإشعارات المتقدمة.
- [ ] دعم لغات إضافية.
- [ ] تحسين الأداء وتقسيم الحزم (Code Splitting).

---

## 🤝 المساهمة

المساهمات مرحّب بها! يرجى اتباع الخطوات التالية:

1. عمل Fork للمستودع.
2. إنشاء فرع جديد: `git checkout -b feature/your-feature`.
3. تنفيذ التعديلات مع الالتزام بمعايير الكود (ESLint + Prettier).
4. فتح Pull Request مع وصف واضح للتغييرات.

---

## 📄 الترخيص

هذا المشروع مرخّص تحت رخصة **MIT**. راجع ملف [LICENSE](./LICENSE) للتفاصيل.

---

## 📬 التواصل

- **GitHub:** [asmil-asm](https://github.com/asmil-asm)
- **المستودع:** [University-Management-System-Admin-Dashboard](https://github.com/asmil-asm/University-Management-System-Admin-Dashboard)

---

<div align="center">

صُنع بـ ❤️ باستخدام React وVite

</div>
