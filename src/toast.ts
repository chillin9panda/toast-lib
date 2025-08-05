import type { ToastPosition, ToastTypes } from "./types";

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
  position?: ToastPosition;
}

function getContainer(position: ToastPosition): HTMLElement {
  let container = document.querySelector(`.toast-container.${position}`);
  if (!container) {
    container = document.createElement("div");
    container.className = `toast-container ${position}`;
    document.body.appendChild(container);
  }
  return container as HTMLElement;
}

export function showToast({ message, type = "default", duration = 5000, position = "bottom-right" }: ToastOptions) {
  const container = getContainer(position);

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  container.appendChild(toast);

  const toastMesssage = document.createElement("span");
  toastMesssage.className = "toast-message";
  toastMesssage.textContent = message;
  toast.appendChild(toastMesssage);

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast-close";
  closeBtn.innerHTML = "x";
  toast.appendChild(closeBtn);

  const timeout = setTimeout(() => {
    toast.remove();
  }, duration);

  closeBtn.onclick = () => {
    clearTimeout(timeout);
    toast.remove();
  }
}

(window as any).showToast = showToast;
