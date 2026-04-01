# Feature status — SolDelNilo (NewSolDeNilo)

> Summary based on a codebase review. Any feature that depends on **Supabase** or **environment variables** needs correct configuration to work in practice.

---

## 1. Working features (logic present and wired)

| Feature | Notes |
|--------|--------|
| **Next.js 15 UI** | Pages under `src/app` with `[locale]` for i18n. |
| **Trips listing & details** | Fetched from Supabase via APIs such as `/api/trips`, `/api/trips/[id]`. |
| **Categories & cities** | `/api/categories`, `/api/cities`. |
| **User registration (email/password)** | `/api/auth/register` → `user` table in Supabase + bcrypt. |
| **Login** | `/api/auth/login` + JWT in cookie (`JWT_SECRET`). |
| **Current session** | `/api/auth/me` + `/api/auth/logout`. |
| **Google sign-in** | `AuthContext` + `/api/auth/callback/google` (requires `GOOGLE_*`, `OAUTH_REDIRECT_URL`, `NEXT_PUBLIC_BASE_URL`). |
| **Trip booking (request record)** | `POST /api/purchase` writes to `purchases` with `Pending` status (no online payment). |
| **Fetching bookings** | `GET /api/purchases` (needs `SUPABASE_SERVICE_ROLE_KEY` to merge Auth user data). |
| **Cancel booking** | `/api/cancel`. |
| **Reviews** | `/api/reviews`, `/api/reviews/[id]`, likes at `/api/reviews/[id]/like`. |
| **Messages (chat)** | `/api/messages` + image uploads to `chat-images` bucket in Supabase Storage. |
| **Contact form** | `POST /api/contact` via SendGrid (`SENDGRID_API_KEY` + verified sender). |
| **Typing indicator** | `/api/typing` — **in-memory only**; on Vercel/serverless it resets between requests and is not reliable for production without Redis or another channel. |
| **Update user role (admin)** | `POST /api/updateRole` via `supabaseAdmin`. |
| **Admin dashboard (UI)** | Pages under `src/app/[locale]/admin/` for trips, bookings, and messages (assuming Supabase tables and permissions are set up). |

---

## 2. Incomplete / unreliable / broken in code

| Feature | Issue |
|--------|--------|
| **Change booking status from admin** | Code calls `POST /api/update-status` from admin `PurchaseContext`, but **there is no route file** for that path — **404**. |
| **Booking confirmation email after purchase** | `sendBookingEmail` in `src/app/api/sendBookingEmail/route.js` is **not an HTTP route** (no exported `GET`/`POST`) and is **not** called from `POST /api/purchase`. Email is not wired to the booking flow. |
| **`CartDrawer` cart** | Imports `useCartContext` from `@/context/CartContext` but **`CartContext` is missing** from the repo. The component is **not imported** elsewhere right now; using it would **break the build**. |
| **Cart checkout** | Checkout button shows an `alert` and clears the cart — **no real payment** and **no API**. |
| **Token refresh `/api/auth/refresh`** | File is **fully commented out** — no real implementation. |
| **Typing indicator** | As above: server logic does not persist state across requests in a serverless environment. |

---

## 3. Not implemented in the app (dependencies only or unused)

| Item | Status |
|--------|--------|
| **Stripe** | Listed in `package.json` — **no imports** and **no usage** in `src/`. |
| **PayPal (`@paypal/react-paypal-js`)** | Same — **no usage** in source. |
| **Prisma** | `schema.prisma` is **commented out**; **no** `@prisma/client` usage in `src/`. |
| **next-auth** | Installed — **not used** in the project. |
| **react-router-dom** | Installed — Next.js uses App Router; **no usage** in `src/`. |
| **Brevo (`@getbrevo/brevo`)** | **No usage**. |
| **Resend** | **No usage**. |
| **Nodemailer** | **No usage** in the reviewed routes (email goes through SendGrid where relevant). |

---

## 4. Quick runtime notes

- **Without** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`, most API routes and DB-backed UI will not work.
- **Without** `SUPABASE_SERVICE_ROLE_KEY`, admin-oriented routes such as `purchases`, `updateRole`, and `sendBookingEmail` (if wired later) may fail.
- **Online payments**: not implemented; booking = a row in `purchases` only.

---

*Last reviewed against the current repository state.*
