export const getHostByUrl = (url: string) => {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return "";
  }
};
