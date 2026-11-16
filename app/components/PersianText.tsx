// Isolate Persian runs in otherwise English copy for correct reading order and
// assistive-technology pronunciation. Leave the underlying source text intact.
const persianRun = /([\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\u200c\u200d\ufb50-\ufdff\ufe70-\ufeff]+)/u;

export default function PersianText({ text }: { text: string }) {
  return text.split(persianRun).map((part, index) =>
    index % 2 === 1 ? <bdi key={index} lang="fa" dir="rtl">{part}</bdi> : part,
  );
}
