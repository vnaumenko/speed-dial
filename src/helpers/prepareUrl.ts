export const cleanUrl = (url: string) => {
  try {
    const urlObject = new URL(url);

    const hostname = urlObject.hostname.replace("www.", "");
    const pathname = urlObject.pathname.endsWith("/")
      ? urlObject.pathname.slice(0, -1)
      : urlObject.pathname;

    return hostname + pathname;
  } catch {
    return url;
  }
};
