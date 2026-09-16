# Admin area — setup guide

The website now has a password-protected admin area at **`/admin`** for managing
gallery photos and blog posts.

| Piece | Technology | Why |
| --- | --- | --- |
| Backend | TypeScript, inside this same Next.js app (Server Actions + Route Handlers) | No second server, no second language |
| Database | PostgreSQL via Prisma | Free tier on Neon; relational data fits photos and posts |
| Sign-in | Signed HTTP-only session cookie (jose) + bcrypt password hashes | Small, no third-party auth service |
| Image storage | Cloudinary | Uploads go straight from the browser; automatic resizing and WebP |

> **Why not upload into `public/images/`?** Vercel's filesystem is read-only and
> is wiped on every deploy, so uploaded files would disappear. The database
> stores only the Cloudinary URL. The photos already in `public/images/` keep
> working exactly as before.

> **There is no default username or password.** You create your own admin
> account in step 6 — the email and password you choose there are your login.

---

## One-time setup

### 1. Create the database (Neon — free)

1. Sign up at <https://neon.tech> and create a project.
2. On the project dashboard, copy **two** connection strings:
   - the **pooled** one (host contains `-pooler`) → `DATABASE_URL`
   - the **direct** one (no `-pooler`) → `DIRECT_URL`

### 2. Create the image store (Cloudinary — free)

1. Sign up at <https://cloudinary.com>.
2. From the dashboard copy **Cloud name**, **API Key** and **API Secret**.

### 3. Fill in the environment file

```bash
cp .env.example .env
```

Then edit `.env` and paste in the values from steps 1 and 2. Generate the
session secret with:

```bash
openssl rand -base64 32
```

`.env` is git-ignored — never commit it.

### 4. Create the tables

```bash
npm run db:deploy
```

Look for **"All migrations have been successfully applied."** (`db:migrate` is
for changing the table design later; for first-time setup `db:deploy` simply
applies the tables that are already defined, without asking questions.)

### 5. Copy the existing photos into the database (optional)

```bash
npm run gallery:seed
```

This imports the photos listed in `src/lib/content.ts` so the admin gallery
starts with what is already on the site. Until you do this — or upload your
first photo — the public gallery keeps showing those bundled images.

### 6. Create your admin login

```bash
npm run admin:create
```

It asks for an email, a name and a password (minimum 10 characters) — **these
are your login credentials**. Only a bcrypt hash of the password is stored.

### 7. Sign in

```bash
npm run dev
```

Open <http://localhost:3000/admin>.

---

## Deploying to Vercel

1. Push this repository to GitHub and import it at <https://vercel.com/new>.
2. In **Settings → Environment Variables**, add all five values from your `.env`:
   `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET`,
   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`.
3. Deploy. `npm run build` runs `prisma generate` automatically.

The tables were already created in step 4, so there is nothing more to run —
Vercel and your computer use the same Neon database.

---

## Using the admin area

**Gallery** (`/admin/gallery`)
- *Add a photo* — choose an image, write a caption, pick a category, then
  **Add to gallery**. The caption is also the image's alt text, so describe what
  is happening in the picture.
- Each photo below can have its caption and category edited, or be deleted.
  Deleting also removes the file from Cloudinary.
- Photos are **resized in your browser before uploading**: the longest side is
  capped at 2000px, which is still sharp on large screens. A typical 4–5 MB
  phone photo uploads as about 500 KB, so the free Cloudinary plan holds
  roughly ten times as many photos. Resizing also removes hidden metadata,
  including the GPS location phones record in every photo.

**Blog** (`/admin/blog`)
- **New post** creates a draft and opens the editor.
- Write with the toolbar (headings, lists, quotes, links, inline images), add a
  cover image, then tick **Published** and **Save** to put it live at
  `/blog/<web-address>`.
- Leave **Published** unticked to keep working on a draft — drafts are not
  visible on the website.

**Trial classes** (`/admin/trials`)
- **Add available times** — pick a date, start time, duration, and *Online (Zoom)*
  or *In person*. Use *Repeat weekly* to add the same time for several weeks at
  once. All times are India time (IST).
- Parents see open times at **`/book-trial`** (linked from the *Book a Trial
  Class* buttons and the footer) and send a request with their child's name,
  age and WhatsApp number. Families abroad also see each time in their own time
  zone.
- New requests appear under **Needs your reply**, and the dashboard shows how
  many are waiting. **Confirm** or **Decline**.
- After confirming, press **Send confirmation on WhatsApp**. It opens WhatsApp
  with a ready-written message including the date, time and — for online
  classes — the Zoom link. Paste the Zoom link on the slot first so it is
  included. Nothing is sent until you press send in WhatsApp.
- A requested or booked time disappears for other parents, so a slot can never
  be double-booked. **Cancel booking** frees it again.
- Bookings close 1 hour before a slot starts. A time with a booking on it cannot
  be removed until that booking is cancelled.

**Enquiries** (`/admin/enquiries`)
- The two forms on **`/contact`** — *Enquire about classes* and *Enquire about a
  program* — now save straight to the website. Nothing depends on the visitor
  opening WhatsApp afterwards, so no enquiry is lost.
- New ones appear under **Waiting for a reply**, and the dashboard shows how many
  are outstanding.
- **Reply on WhatsApp** opens WhatsApp with an opening line already written,
  including the student's age or the occasion and date. Nothing is sent until
  you press send in WhatsApp.
- **Mark handled** moves it out of the waiting list once you have replied;
  **Reopen** puts it back. **Delete** removes it for good.

---

## How it fits together

```
src/proxy.ts                     blocks /admin/* for signed-out visitors
src/lib/session-token.ts         signs and verifies the session cookie
src/lib/session.ts               reads/writes the cookie (server only)
src/lib/dal.ts                   requireAdmin() — the authoritative check
src/lib/db.ts                    Prisma client (connects on first use)
src/lib/cloudinary.ts            signs browser uploads, deletes images
src/lib/sanitize.ts              whitelists blog HTML before it is stored
src/lib/trials.ts                trial slots: IST times, phone numbers, booking lock, WhatsApp messages
src/components/admin/resize-image.ts  shrinks photos and strips metadata before upload
prisma/schema.prisma             AdminUser, GalleryImage, BlogPost

src/app/admin/                   the admin area (its own layout, no site chrome)
src/app/api/admin/upload-signature/  mints upload signatures
src/app/(site)/                  the public website
src/app/(site)/blog/             public blog list and post pages
```

Security notes:

- `src/proxy.ts` is an *optimistic* gate. Every admin page, Server Action and
  Route Handler independently calls `requireAdmin()`, so a forged or expired
  cookie cannot reach data.
- Passwords are hashed with bcrypt (cost 12) and never stored or logged in
  plain text.
- Blog HTML is passed through a tag whitelist before being saved, so a
  compromised admin account cannot inject scripts into the public site.
- `/admin` and `/api` are excluded from `robots.txt` and carry `noindex`.

## Changing your password

Run `npm run admin:create` again with the same email — it updates the name and
password for that account.
