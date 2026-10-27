/** Keep the physical preview fixed while zoom changes the application's layout space. */
export function previewGeometry(width: number, height: number, contentHeight: number, scale: number, reflow: boolean) {
  const layoutWidth = reflow ? width / scale : width;
  const layoutHeight = reflow ? height / scale : height;
  return {
    layoutWidth,
    layoutHeight,
    surfaceWidth: layoutWidth * scale,
    surfaceHeight: Math.max(height, contentHeight * scale),
  };
}
