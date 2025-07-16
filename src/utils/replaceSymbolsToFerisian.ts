type Config = {
  key: string;
  value: string;
}[];

const config: Config = [
  { key: "ß", value: "сс" },
  { key: "ш", value: "сс" },
  { key: "ф", value: "пв" },
  { key: "и", value: "i" },
  { key: "ж", value: "зз" },
];

export function replaceSymbolsToFerisian(str: string): string {
  for (let i = 0; i < config.length; i++) {
    const c = config[i];
    str = str.replaceAll(c.key, c.value);
  }

  return str;
}
