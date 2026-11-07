export type ShortScene = {
  eyebrow: string;
  headline: string;
  supporting: string;
  background: string;
  accent: string;
};

export const shortContent = {
  series: "TELUGU DOCUMENTARY",
  title: "ఒక ఆలోచన… ఒక విప్లవం!",
  hook: "ఒక చిన్న నిర్ణయం… కోట్ల మంది జీవితాలను మార్చగలదా?",
  closing: "ఇలాంటి కథల కోసం Follow అవ్వండి",
  scenes: [
    {
      eyebrow: "THE BIG QUESTION",
      headline: "ఒక చిన్న ఆలోచన…",
      supporting: "దేశం మొత్తం ఆలోచించే విధానాన్నే మార్చగలదా?",
      background: "#101827",
      accent: "#F6B94A"
    },
    {
      eyebrow: "THE BEGINNING",
      headline: "ప్రారంభం ఎప్పుడూ సులభం కాదు",
      supporting: "ప్రతి పెద్ద మార్పు వెనుక ఒక ధైర్యమైన నిర్ణయం ఉంటుంది.",
      background: "#17233A",
      accent: "#67D5C5"
    },
    {
      eyebrow: "THE TURNING POINT",
      headline: "అక్కడే కథ మలుపు తిరిగింది",
      supporting: "పాత పద్ధతిని ప్రశ్నించినప్పుడు… కొత్త దారి మొదలవుతుంది.",
      background: "#25203A",
      accent: "#C5A5FF"
    },
    {
      eyebrow: "THE IMPACT",
      headline: "మార్పు ఒక్కరోజులో రాదు",
      supporting: "కానీ ఒక నిర్ణయం… భవిష్యత్తుకు దిశ చూపిస్తుంది.",
      background: "#182D32",
      accent: "#F2A36B"
    },
    {
      eyebrow: "YOUR TAKEAWAY",
      headline: "ఇదే అసలైన కథ!",
      supporting: "చరిత్రను మార్చేది ఆలోచన మాత్రమే కాదు — దాన్ని అమలు చేసే ధైర్యం.",
      background: "#241D2D",
      accent: "#F6B94A"
    }
  ] satisfies ShortScene[]
};
