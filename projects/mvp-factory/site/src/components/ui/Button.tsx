import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  const base = "inline-block font-semibold px-8 py-3.5 transition-colors text-lg";
  const styles: Record<ButtonVariant, string> = {
    primary: "bg-primary hover:bg-primary-dark text-text-on-primary",
    secondary: "bg-secondary hover:opacity-90 text-white",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-text-on-primary",
  };

  return (
    <a
      href={href}
      className={`${base} ${styles[variant]} ${className}`}
      style={{ borderRadius: "var(--site-radius, 12px)" }}
    >
      {children}
    </a>
  );
}
