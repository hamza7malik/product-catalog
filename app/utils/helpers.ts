export const limitedText = (text: string, count: number) => {
  return `${text.substring(0, count)}${text.length > count ? '...' : ''}`;
};
