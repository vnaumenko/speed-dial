const getFaviconURL = (url: string): string => {
  // @ts-expect-error
  if (!chrome.runtime) return "";

  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const imageUrl = new URL(chrome.runtime.getURL("/_favicon/"));

  imageUrl.searchParams.set("pageUrl", url);
  imageUrl.searchParams.set("size", "32");

  return imageUrl.toString();
};

export { getFaviconURL };
