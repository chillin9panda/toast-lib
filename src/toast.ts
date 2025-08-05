import { BadgeCheck, createElement, Info, TriangleAlert, X, XCircle, type IconNode } from "lucide";
import type { ToastPosition, ToastTheme, ToastTypes } from "./types";

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
  theme?: ToastTheme;
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

function getIconNode(type: ToastTypes = "default"): IconNode {
  switch (type) {
    case "success":
      return BadgeCheck;
    case "error":
      return XCircle
    case "warning":
      return TriangleAlert
    case "default":
    default:
      return Info;
  }
}

function getIcon(type: ToastTypes = "default") {
  const iconNode = getIconNode(type);
  return createElement(iconNode, { size: 20 });
}

export function showToast({ message, type = "default", duration = 5000, position = "bottom-right", theme = "dark" }: ToastOptions) {
  const container = getContainer(position);

  const toast = document.createElement("div");
  toast.className = `toast ${type} ${theme}`;
  container.appendChild(toast);

  const icon = getIcon(type);
  icon.classList.add("toast-icon");
  toast.appendChild(icon);

  const toastMesssage = document.createElement("span");
  toastMesssage.className = "toast-message";
  toastMesssage.textContent = message;
  toast.appendChild(toastMesssage);

  const closeIcon = createElement(X, { size: 16 });
  closeIcon.classList.add("toast-close-icon");

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast-close";
  closeBtn.classList.add("toast-close");
  closeBtn.appendChild(closeIcon);

  toast.appendChild(closeBtn);

  let timeout: number;
  let startTime: number;
  let remaining: number = duration;

  const removeToast = () => {
    toast.remove();
  };

  const startTimer = () => {
    startTime = Date.now();
    timeout = window.setTimeout(removeToast, duration);
  };

  const pauseTimer = () => {
    clearTimer();
    const elapsed: number = Date.now() - startTime;
    remaining -= elapsed;
  };

  const clearTimer = () => {
    clearTimeout(timeout);
  };

  startTimer();

  closeBtn.onclick = () => {
    clearTimer();
    removeToast();
  }

  toast.addEventListener("mouseenter", pauseTimer);
  toast.addEventListener("mouseleave", () => {
    clearTimer();
    startTimer();
  });
}

(window as any).showToast = showToast;
