"use client";

import { useParams } from "next/navigation";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import type { Dictionary } from "./dictionaries";

export function useDict(): Dictionary {
  const params = useParams();
  const locale = (params.locale as string) || "en";
  return locale === "es" ? (es as unknown as Dictionary) : (en as unknown as Dictionary);
}
