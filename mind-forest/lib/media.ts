const BACKGROUND_WIDTHS = [1920, 2560, 3840] as const;

export function unsplash(photoId: string, width = 3840) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=90`;
}

export function unsplashSrcSet(photoId: string) {
  return BACKGROUND_WIDTHS.map(
    (width) => `${unsplash(photoId, width)} ${width}w`,
  ).join(", ");
}

export function youtubeThumb(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}
