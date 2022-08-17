export interface AnalyzeInfo {
  raw: string;
  headerProps: { [key: string]: string };
  text: string;
}
export function analyzeMarkdown(raw: string) {
  // extract header
  const analyzeInfo: AnalyzeInfo = {
    raw,
    headerProps: {},
    text: raw,
  };
  const splits = raw.split(/---[\r\n]+/g, 3);
  if (
    splits.length === 3 &&
    splits[1].split(/[\r\n]+/g).filter((line) => !/^.*?: .*?$/.test(line))
      .length === 1 // having empty line
  ) {
    analyzeInfo.text = splits[2];
    splits[1].split(/[\r\n]+/g).forEach((line) => {
      const [key, value] = line.split(": ");
      if (!key || !value) return;
      analyzeInfo.headerProps[key] = value;
    });
  }
  return analyzeInfo;
}
