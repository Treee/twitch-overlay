export function getViewHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export function getViewWidth() {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
