export const getFaviconURL = (url: string): string => {
  // @ts-expect-error
  if (!chrome.runtime) return "";

  // @ts-expect-error
  const imageUrl = new URL(chrome.runtime.getURL("/_favicon/"));

  imageUrl.searchParams.set("pageUrl", url);
  imageUrl.searchParams.set("size", "64");

  return imageUrl.toString();
};
