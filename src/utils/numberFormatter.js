export const formatNumberWithAbbreviation = (numbertobeformatted) => {
  const abbreviations = ['', 'K', 'M', 'B', 'T'];
  const base = Math.floor(Math.log10(Math.abs(numbertobeformatted)) / 3);
  const rounded = (numbertobeformatted / Math.pow(1000, base)).toFixed(0);
  return `${rounded}${abbreviations[base]}`;
};
