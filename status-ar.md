# حالة الميزات — SolDelNilo (NewSolDeNilo)

> ملخص بحسب مراجعة الكود في المستودع. أي ميزة تعتمد على **Supabase** أو **متغيرات البيئة** تحتاج إعدادًا صحيحًا حتى تعمل فعليًا.

---

## 1. الميزات العاملة (منطق موجود ومتصل)

| الميزة | ملاحظات |
|--------|---------|
| **واجهة Next.js 15** | صفحات تحت `src/app` مع دعم `[locale]` للغات. |
| **عرض الرحلات والتفاصيل** | جلب من Supabase عبر API مثل `/api/trips`، `/api/trips/[id]`. |
| **الفئات والمدن** | `/api/categories`، `/api/cities`. |
| **تسجيل مستخدم (إيميل/كلمة مرور)** | `/api/auth/register` → جدول `user` في Supabase + bcrypt. |
| **تسجيل دخول** | `/api/auth/login` + JWT في الكوكي (`JWT_SECRET`). |
| **جلسة المستخدم الحالية** | `/api/auth/me` + `/api/auth/logout`. |
| **تسجيل الدخول بـ Google** | `AuthContext` + `/api/auth/callback/google` (يتطلب `GOOGLE_*`، `OAUTH_REDIRECT_URL`، `NEXT_PUBLIC_BASE_URL`). |
| **حجز رحلة (تسجيل طلب)** | `POST /api/purchase` يكتب في جدول `purchases` بحالة `Pending` (بدون دفع إلكتروني). |
| **جلب الحجوزات** | `GET /api/purchases` (يحتاج `SUPABASE_SERVICE_ROLE_KEY` لدمج بيانات المستخدمين من Auth). |
| **إلغاء حجز** | `/api/cancel`. |
| **المراجعات** | `/api/reviews`، `/api/reviews/[id]`، إعجابات `/api/reviews/[id]/like`. |
| **الرسائل (شات)** | `/api/messages` + رفع صور لـ bucket `chat-images` في Supabase Storage. |
| **نموذج التواصل** | `POST /api/contact` عبر SendGrid (`SENDGRID_API_KEY` + مرسل موثّق). |
| **مؤشر الكتابة (typing)** | `/api/typing` — تخزين **في الذاكرة فقط**؛ على Vercel/Serverless يُعاد التعيين بين الطلبات ولا يناسب إنتاجًا موثوقًا بدون Redis/قناة أخرى. |
| **تحديث دور المستخدم (Admin)** | `POST /api/updateRole` عبر `supabaseAdmin`. |
| **لوحة الأدمن (واجهة)** | صفحات تحت `src/app/[locale]/admin/` لإدارة الرحلات والحجوزات والرسائل (مع افتراض أن الجداول والصلاحيات في Supabase مضبوطة). |

---

## 2. الميزات غير المكتملة / غير الموثوقة / معطوبة في الكود

| الميزة | المشكلة |
|--------|---------|
| **تغيير حالة الحجز من الأدمن** | الكود يستدعي `POST /api/update-status` من `PurchaseContext` في الأدمن، **ولا يوجد ملف route** لهذا المسار — الطلب يفشل (404). |
| **إيميل تأكيد الحجز بعد الشراء** | الدالة `sendBookingEmail` في `src/app/api/sendBookingEmail/route.js` **ليست route HTTP** (لا يوجد `GET`/`POST` مصدّر)، و**لا يُستدعى** من `POST /api/purchase`. إرسال الإيميل غير مربوط بتدفق الحجز. |
| **السلة `CartDrawer`** | يستورد `useCartContext` من `@/context/CartContext` بينما **ملف `CartContext` غير موجود** في المشروع. المكوّن **غير مستورد** في أماكن أخرى حاليًا؛ أي استخدام له سيكسر البناء. |
| **Checkout السلة** | زر الدفع يعرض `alert` ويمسح السلة — **لا دفع حقيقي ولا API**. |
| **تحديث التوكن `/api/auth/refresh`** | الملف **كله معطّل بتعليقات** — لا يوجد تنفيذ فعلي. |
| **مؤشر الكتابة** | كما فوق: منطق السيرفر لا يحافظ على الحالة عبر الطلبات في بيئة serverless. |

---

## 3. غير موجودة في التطبيق (اعتمادات فقط أو بدون استخدام)

| البند | الوضع |
|--------|--------|
| **Stripe** | مُثبَّت في `package.json` — **لا استيراد ولا استخدام** في `src/`. |
| **PayPal (`@paypal/react-paypal-js`)** | نفس الشيء — **لا استخدام في الكود**. |
| **Prisma** | `schema.prisma` **معطّل بالتعليقات**؛ **لا** `@prisma/client` في `src/`. |
| **next-auth** | مُثبَّت — **لا يُستخدم** في المشروع. |
| **react-router-dom** | مُثبَّت — Next.js يستخدم App Router؛ **لا استخدام** في `src/`. |
| **Brevo (`@getbrevo/brevo`)** | **لا استخدام**. |
| **Resend** | **لا استخدام**. |
| **Nodemailer** | **لا استخدام** في المسارات التي رُاجعت (الإيميل عبر SendGrid في الملفات ذات الصلة). |

---

## 4. ملاحظات تشغيل سريعة

- **بدون** `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY` معظم الـ API والواجهة المرتبطة بقاعدة البيانات لن تعمل.
- **بدون** `SUPABASE_SERVICE_ROLE_KEY` مسارات مثل `purchases` المكوّنة للأدمن و`updateRole` و`sendBookingEmail` (إن وُصلت لاحقًا) قد تفشل.
- **الدفع الإلكتروني**: غير مطبّق؛ الحجز = سجل في جدول `purchases` فقط.

---

*آخر تحديث للمراجعة: وفقًا لحالة المستودع الحالية.*
