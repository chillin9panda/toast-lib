import type { ToastTypes } from "./types";

let container = document.querySelector(".toast-container");

if (!container) {
  container = document.createElement("div");
  container.className = ".toast-container";
  document.body.appendChild(container);
}

interface ToastOptions {
  message: string;
  type?: ToastTypes;
  duration?: number;
}

export function showToast({ message, type = "default", duration = 5000 }: ToastOptions) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  toast.innerHTML = `
    <span>${message}</span>
    <button class="close-btn">x</button>
  `

  const timeout = setTimeout(() => {
    toast.remove();
  }, duration);

  toast.querySelector(".close-btn")?.addEventListener("click", () => {
    clearTimeout(timeout);
    toast.remove();
  })

  container!.appendChild(toast);
}

(window as any).showToast = showToast;
