import type { ThemeConfig, BorderRadius } from "@/config/types";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "4px",
  rounded: "12px",
  pill: "24px",
};

export function generateThemeCSS(theme: ThemeConfig): string {
  return `
    :root {
      --site-primary: ${theme.colors.primary};
      --site-primary-dark: ${theme.colors.primaryDark};
      --site-primary-light: ${theme.colors.primaryLight};
      --site-secondary: ${theme.colors.secondary};
      --site-background: ${theme.colors.background};
      --site-surface: ${theme.colors.surface};
      --site-surface-alt: ${theme.colors.surfaceAlt};
      --site-header-bg: ${theme.colors.headerBg};
      --site-footer-bg: ${theme.colors.footerBg};
      --site-text: ${theme.colors.text};
      --site-text-light: ${theme.colors.textLight};
      --site-text-on-primary: ${theme.colors.textOnPrimary};
      --site-font-heading: "${theme.fonts.heading}";
      --site-font-body: "${theme.fonts.body}";
      --site-radius: ${radiusMap[theme.borderRadius]};
    }
  `;
}

export function getGoogleFontsUrl(theme: ThemeConfig): string {
  const families = [theme.fonts.heading, theme.fonts.body]
    .filter((f, i, arr) => arr.indexOf(f) === i)
    .map((f) => f.replace(/ /g, "+") + ":wght@400;500;600;700;800")
    .join("&family=");
  return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
}
