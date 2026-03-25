/** Canonical staff directory — keyed by email, value is display name */
export const STAFF_MAP: Record<string, string> = {
  "marlon@dentalcitycr.com": "Marlón",
  "francisco@dentalcitycr.com": "Dr. Francisco",
  "mariela@dentalcitycr.com": "Dra. Mariela",
  "info@dentalcitycr.com": "Admin",
};

/** Get display name for a staff email, or the email itself as fallback */
export function staffDisplayName(email: string | null): string {
  if (!email) return "Unassigned";
  return STAFF_MAP[email] || email;
}
