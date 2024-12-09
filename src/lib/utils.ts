import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateID() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function toTitleCase(text: string) {
  return text
    .split(" ")
    .map((i) => i.replace(i[0], i[0].toUpperCase()))
    .join(" ");
}

const IconsMap = new Map<string, string>([
  ["Python", "logos:python"],
  ["github", "github"],
  ["instagram", "instagram"],
  ["linkedin", "linkedin"],
  ["youtube", "youtube"],
  ["email", "envelope"],
  ["phone", "phone"],
]);
export function getIcon(icon: string) {
  return IconsMap.get(toTitleCase(icon)) || "question-circle";
}
