# Supabase Email Templates — Dental City

Go to **Supabase Dashboard** → **Authentication** → **Email Templates** and paste these for each template type.

> **Project**: https://supabase.com/dashboard/project/emwkbwsryxwxrftlckwb/auth/templates

---

## 1. Confirm Signup

**Subject:** `Welcome to Dental City — Confirm Your Email`

```html
<div style="max-width:520px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333">
  <div style="background:#02222e;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center">
    <img src="https://site-sagemind.vercel.app/images/logos/logo-white-full.jpg" alt="Dental City" style="height:48px" />
  </div>
  <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
    <h2 style="margin:0 0 8px;color:#02222e;font-size:22px">Welcome to Dental City!</h2>
    <p style="color:#666;font-size:14px;line-height:1.6;margin:0 0 24px">
      Thank you for creating your account. Please confirm your email address to access your personalized savings estimates and treatment tools.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#0891b2;color:#ffffff;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:14px">
      Confirm My Email
    </a>
    <p style="color:#999;font-size:12px;margin:24px 0 0;line-height:1.5">
      If you didn't create an account with Dental City, you can safely ignore this email.
    </p>
  </div>
  <div style="text-align:center;padding:16px;color:#999;font-size:11px">
    Dental City Costa Rica · Aguas Zarcas, San Carlos<br />
    <a href="https://site-sagemind.vercel.app" style="color:#0891b2;text-decoration:none">dentalcitycostarica.com</a>
  </div>
</div>
```

---

## 2. Reset Password

**Subject:** `Reset Your Dental City Password`

```html
  <div style="max-width:520px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333">
    <div style="background:#02222e;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center">
      <img src="https://site-sagemind.vercel.app/images/logos/logo-white-full.jpg" alt="Dental City" style="height:48px" />
    </div>
    <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
      <h2 style="margin:0 0 8px;color:#02222e;font-size:22px">Reset Your Password</h2>
      <p style="color:#666;font-size:14px;line-height:1.6;margin:0 0 24px">
        We received a request to reset the password for your Dental City account. Click the button below to choose a new password.
      </p>
      <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#0891b2;color:#ffffff;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:14px">
        Reset Password
      </a>
      <p style="color:#999;font-size:12px;margin:24px 0 0;line-height:1.5">
        If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>
    </div>
    <div style="text-align:center;padding:16px;color:#999;font-size:11px">
      Dental City Costa Rica · Aguas Zarcas, San Carlos<br />
      <a href="https://site-sagemind.vercel.app" style="color:#0891b2;text-decoration:none">dentalcitycostarica.com</a>
    </div>
  </div>
```

---

## 3. Magic Link (if enabled)

**Subject:** `Your Dental City Login Link`

```html
<div style="max-width:520px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333">
  <div style="background:#02222e;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center">
    <img src="https://site-sagemind.vercel.app/images/logos/logo-white-full.jpg" alt="Dental City" style="height:48px" />
  </div>
  <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
    <h2 style="margin:0 0 8px;color:#02222e;font-size:22px">Your Login Link</h2>
    <p style="color:#666;font-size:14px;line-height:1.6;margin:0 0 24px">
      Click the button below to log in to your Dental City account. This link will expire in 24 hours.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#0891b2;color:#ffffff;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:14px">
      Log In to Dental City
    </a>
    <p style="color:#999;font-size:12px;margin:24px 0 0;line-height:1.5">
      If you didn't request this link, you can safely ignore this email.
    </p>
  </div>
  <div style="text-align:center;padding:16px;color:#999;font-size:11px">
    Dental City Costa Rica · Aguas Zarcas, San Carlos<br />
    <a href="https://site-sagemind.vercel.app" style="color:#0891b2;text-decoration:none">dentalcitycostarica.com</a>
  </div>
</div>
```

---

## 4. Change Email Address

**Subject:** `Confirm Your New Email — Dental City`

```html
<div style="max-width:520px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#333">
  <div style="background:#02222e;padding:24px 32px;border-radius:12px 12px 0 0;text-align:center">
    <img src="https://site-sagemind.vercel.app/images/logos/logo-white-full.jpg" alt="Dental City" style="height:48px" />
  </div>
  <div style="background:#ffffff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px">
    <h2 style="margin:0 0 8px;color:#02222e;font-size:22px">Confirm Your New Email</h2>
    <p style="color:#666;font-size:14px;line-height:1.6;margin:0 0 24px">
      Please confirm this new email address for your Dental City account by clicking the button below.
    </p>
    <a href="{{ .ConfirmationURL }}" style="display:inline-block;background:#0891b2;color:#ffffff;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;font-size:14px">
      Confirm New Email
    </a>
    <p style="color:#999;font-size:12px;margin:24px 0 0;line-height:1.5">
      If you didn't request this change, please contact us immediately.
    </p>
  </div>
  <div style="text-align:center;padding:16px;color:#999;font-size:11px">
    Dental City Costa Rica · Aguas Zarcas, San Carlos<br />
    <a href="https://site-sagemind.vercel.app" style="color:#0891b2;text-decoration:none">dentalcitycostarica.com</a>
  </div>
</div>
```

---

## Notes

- **Colors used**: Navy `#02222e` (header), Primary/Cyan `#0891b2` (buttons/links), Text `#333/#666/#999`
- **Logo**: Uses the white version on dark navy header
- The `{{ .ConfirmationURL }}` placeholder is Supabase's Go template variable — do not change it
- Update the domain from `site-sagemind.vercel.app` to the production domain when ready
