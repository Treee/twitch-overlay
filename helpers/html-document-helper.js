"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getViewHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}
exports.getViewHeight = getViewHeight;
function getViewWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}
exports.getViewWidth = getViewWidth;
