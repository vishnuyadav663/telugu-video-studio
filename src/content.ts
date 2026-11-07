export type KarnaScene = {
  id: number;
  label: string;
  durationInFrames: number;
  headline: string;
  subtitle: string;
  visual: "battlefield" | "faceoff" | "wheel" | "struggle" | "reminder" | "bow" | "arrow" | "silence";
  accent: string;
  narrationCue: string;
};

export const shortContent = {
  title: "కర్ణుడి చివరి క్షణాలు | మహాభారతం",
  fps: 30,
  scenes: [
    {
      id: 1, label: "THE FINAL DUEL", durationInFrames: 180,
      headline: "కురుక్షేత్రంలో…\nచివరి సమరం",
      subtitle: "కర్ణుడు • అర్జునుడు • ఒక నిర్ణయాత్మక క్షణం",
      visual: "battlefield", accent: "#E8B96D",
      narrationCue: "కర్ణుడు, అర్జునుడు ముఖాముఖి తలపడ్డారు."
    },
    {
      id: 2, label: "TWO WARRIORS", durationInFrames: 180,
      headline: "ఒకవైపు కర్ణుడు…\nమరోవైపు అర్జునుడు",
      subtitle: "రథాలపై సాగిన భీకర ద్వంద్వయుద్ధం",
      visual: "faceoff", accent: "#E8B96D",
      narrationCue: "బాణాల వర్షంలో యుద్ధం ఉధృతమైంది."
    },
    {
      id: 3, label: "THE TURN", durationInFrames: 180,
      headline: "అప్పుడే…\nకర్ణుడి రథచక్రం",
      subtitle: "భూమిలో కూరుకుపోయిన చక్రం",
      visual: "wheel", accent: "#D99A58",
      narrationCue: "యుద్ధం మధ్యలో కర్ణుడి రథచక్రం భూమిలో దిగబడింది."
    },
    {
      id: 4, label: "A MOMENT OF VULNERABILITY", durationInFrames: 180,
      headline: "చక్రాన్ని పైకి\nలేపేందుకు కర్ణుడి ప్రయత్నం",
      subtitle: "ఆయుధం పక్కన పెట్టి రథం దగ్గరకు వంగాడు",
      visual: "struggle", accent: "#D99A58",
      narrationCue: "చక్రాన్ని బయటకు తీయడానికి కర్ణుడు ప్రయత్నించాడు."
    },
    {
      id: 5, label: "KRISHNA'S REMINDER", durationInFrames: 180,
      headline: "కృష్ణుడు అర్జునుడిని\nఆపలేదు",
      subtitle: "గతంలో జరిగిన అధర్మాన్ని గుర్తుచేశాడు",
      visual: "reminder", accent: "#83C9B5",
      narrationCue: "కృష్ణుడు, ద్రౌపది అవమానం సహా కర్ణుడి గత చర్యలను గుర్తుచేశాడు."
    },
    {
      id: 6, label: "THE DECISION", durationInFrames: 180,
      headline: "అర్జునుడి చేతిలో\nగాండీవం సిద్ధమైంది",
      subtitle: "యుద్ధం ఒక్క క్షణంలో ముగియబోతోంది",
      visual: "bow", accent: "#E8B96D",
      narrationCue: "కృష్ణుడి మాటలతో అర్జునుడు నిర్ణయం తీసుకున్నాడు."
    },
    {
      id: 7, label: "THE FATAL ARROW", durationInFrames: 180,
      headline: "బాణం దూసుకెళ్లింది…",
      subtitle: "కర్ణుడి జీవితం అక్కడితో ముగిసింది",
      visual: "arrow", accent: "#E8B96D",
      narrationCue: "అర్జునుడి బాణం కర్ణుడిని తాకింది."
    },
    {
      id: 8, label: "THE QUESTION", durationInFrames: 180,
      headline: "కర్ణుడు ఓడింది\nయుద్ధంలోనా… విధి చేతనా?",
      subtitle: "మహాభారతంలో ఇప్పటికీ చర్చకు దారి తీసే ఘట్టం",
      visual: "silence", accent: "#C8A77A",
      narrationCue: "కర్ణుడి అంతం… ధర్మం, విధి గురించి ఒక ప్రశ్నను మిగిల్చింది."
    }
  ] satisfies KarnaScene[]
};

export const totalFrames = shortContent.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);
