# Dental City — Staff Accounts

## Overview

Each staff member has an individual login to the admin portal using Google Workspace email aliases. All aliases route to the shared `info@dentalcitycr.com` inbox (no extra Google Workspace seats needed).

## Current Staff Accounts

| Email | Display Name | Role | Supabase ID |
|---|---|---|---|
| `info@dentalcitycr.com` | Admin | Shared/Admin | `617621f5-c84c-4973-bee1-76bc76604b05` |
| `marlon@dentalcitycr.com` | Marlón | Patient Coordinator | `e9679759-a458-47b1-a8eb-1c63ed269f2a` |
| `francisco@dentalcitycr.com` | Dr. Francisco | Doctor | `8a09a414-dfe8-4c28-b666-f92ac10d32bf` |
| `mariela@dentalcitycr.com` | Dra. Mariela | Doctor | `ebd4a0c4-48b7-4b21-8aea-2ecaeb79118e` |

## How It Works

### Google Workspace Aliases
- Aliases are added in **Google Admin Console** → Users → `info@dentalcitycr.com` → Account → "Alternate email addresses"
- All aliases deliver to the same `info@dentalcitycr.com` inbox
- Free — no additional Google Workspace seats required
- Password reset emails go to the shared inbox

### Admin Portal Auth
- Each alias has its own Supabase auth account with a unique password
- The middleware restricts access to `@dentalcitycr.com` emails only
- On first login, staff must change their password (verified by entering their last name)
- The `assigned_to` field in submissions stores the staff email (e.g., `marlon@dentalcitycr.com`)
- The UI displays friendly names using `STAFF_MAP` in `admin/src/lib/staff.ts`

### First Login Flow
1. Staff logs in with their alias email + initial password (`dentalcity2025`)
2. Middleware detects `must_change_password: true` in user metadata → redirects to `/change-password`
3. Staff enters their verification code (last name, lowercase)
4. Staff sets a new password
5. `must_change_password` is set to `false` — future logins go straight to the dashboard

## Adding a New Staff Member

### Step 1: Google Admin — Add Alias
1. Go to Google Admin Console (admin.google.com)
2. Navigate to: Users → click on `info@dentalcitycr.com`
3. Go to: Account → "Alternate email addresses (email alias)"
4. Click "Add an alternate email" → enter the new alias (e.g., `newperson@dentalcitycr.com`)
5. Save

### Step 2: Supabase — Create Auth Account
```bash
curl -X POST "https://emwkbwsryxwxrftlckwb.supabase.co/auth/v1/admin/users" \
  -H "apikey: SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newperson@dentalcitycr.com",
    "password": "dentalcity2025",
    "email_confirm": true,
    "user_metadata": {
      "display_name": "New Person",
      "verification_code": "lastname",
      "must_change_password": true
    }
  }'
```

### Step 3: Code — Update STAFF_MAP
Edit `admin/src/lib/staff.ts` and add the new entry:
```typescript
export const STAFF_MAP: Record<string, string> = {
  "marlon@dentalcitycr.com": "Marlón",
  "francisco@dentalcitycr.com": "Dr. Francisco",
  "mariela@dentalcitycr.com": "Dra. Mariela",
  "info@dentalcitycr.com": "Admin",
  "newperson@dentalcitycr.com": "New Person",  // ← add here
};
```

### Step 4: Deploy
Redeploy the admin portal for the display name to take effect.

## Upgrading to Individual Inboxes

If Dental City later decides to give each staff member their own Google Workspace inbox:

1. In Google Admin, convert each alias to a full user account
2. **No changes needed to the admin portal** — the email addresses stay the same, Supabase credentials stay the same, everything continues to work
3. Staff will now have their own inbox, calendar, etc.
4. Password reset emails will go to their individual inbox instead of the shared one

## Technical Details

- **Supabase project:** `emwkbwsryxwxrftlckwb`
- **Staff map file:** `admin/src/lib/staff.ts`
- **Middleware:** `admin/src/middleware.ts` — domain check + password change redirect
- **Change password page:** `admin/src/app/change-password/`
- **Assignment field:** `submissions.assigned_to` stores email addresses (not display names)
