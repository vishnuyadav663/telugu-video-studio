export type ShortScene = {
  id: number;
  label: string;
  durationInFrames: number;
  headline: string;
  subtitle: string;
  visual: "crisis" | "reserves" | "vault" | "convoy" | "airlift" | "flight" | "repayment" | "payoff";
  accent: string;
  narration: string;
};

export const shortContent = {
  title: "1991 భారత బంగారం తాకట్టు రహస్యం",
  totalFrames: 2259,
  fps: 30,
  scenes: [
    {
      id: 1, label: "THE HOOK", durationInFrames: 305,
      headline: "దేశ బంగారమే\nవిదేశాలకు!",
      subtitle: "1991లో అప్పులు తీర్చడానికి కూడా భారత్ దగ్గర డాలర్లు లేవు!",
      visual: "crisis", accent: "#FF5757",
      narration: "1991లో... విదేశీ అప్పులు తీర్చడానికి కూడా భారత్ దగ్గర డాలర్లు లేవు! చివరికి దేశ బంగారాన్నే విదేశాలకు పంపాల్సి వచ్చింది!"
    },
    {
      id: 2, label: "THE CRISIS", durationInFrames: 264,
      headline: "కేవలం 2–3 వారాల\nదిగుమతులకే నిల్వలు",
      subtitle: "చమురు కొనడానికి, విదేశీ అప్పులు తీర్చడానికి డాలర్లు కావాలి!",
      visual: "reserves", accent: "#FFB84D",
      narration: "విదేశీ మారక నిల్వలు మూడు వారాల దిగుమతులకే సరిపోయాయి. చమురు కొనడానికి, అప్పులు తీర్చడానికి డాలర్లు కావాలి!"
    },
    {
      id: 3, label: "THE SECRET OPERATION", durationInFrames: 345,
      headline: "46.91 టన్నుల\nబంగారం",
      subtitle: "జూలై 4 నుంచి 18 వరకు • నాలుగు విడతల్లో",
      visual: "vault", accent: "#FFD166",
      narration: "రిజర్వ్ బ్యాంక్ సంచలన నిర్ణయం తీసుకుంది. జూలై 4 నుంచి 18 వరకు, నాలుగు విడతల్లో 46.91 టన్నుల బంగారాన్ని విమానాల్లో పంపించింది!"
    },
    {
      id: 4, label: "THE ROAD INCIDENT", durationInFrames: 264,
      headline: "కాన్వాయ్‌లో\nఅనుకోని ఆటంకం!",
      subtitle: "కాన్వాయ్‌లోని ఒక కారుకు టైరు సమస్య రావడంతో ప్రయాణం ఆగింది",
      visual: "convoy", accent: "#FF6B45",
      narration: "ఒక భారీ సరుకు వాహనం, కాన్వాయ్‌లోని కారుకు టైరు సమస్య రావడంతో, మార్గమధ్యంలో ఆగింది. సిబ్బంది అప్రమత్తమయ్యారు!"
    },
    {
      id: 5, label: "THE AIRLIFT", durationInFrames: 284,
      headline: "బంగారం విమానం\nఎక్కింది!",
      subtitle: "సుమారు 405 మిలియన్ అమెరికన్ డాలర్ల రుణం",
      visual: "airlift", accent: "#F6C85F",
      narration: "కట్టుదిట్టమైన భద్రత మధ్య బంగారం విమానంలోకి చేరింది. ఈ తాకట్టు ద్వారా సుమారు 405 మిలియన్ డాలర్లు సమీకరించారు!"
    },
    {
      id: 6, label: "THE TURNING POINT", durationInFrames: 284,
      headline: "సంక్షోభం నుంచి\nసంస్కరణల దిశగా",
      subtitle: "అత్యవసర చెల్లింపుల ఒత్తిడిని ఎదుర్కోవడంలో ఈ నిధులు కీలకం",
      visual: "flight", accent: "#79D6C5",
      narration: "బ్యాంక్ ఆఫ్ ఇంగ్లాండ్, బ్యాంక్ ఆఫ్ జపాన్‌తో ఒప్పందం కుదిరింది. ఆ నిధులు అత్యవసర విదేశీ చెల్లింపులకు ఊరటనిచ్చాయి!"
    },
    {
      id: 7, label: "THE REDEMPTION", durationInFrames: 244,
      headline: "నవంబర్ 1991\nరుణం తీర్చేశారు",
      subtitle: "కానీ బంగారం వెంటనే భారత్‌కు తిరిగి రాలేదు",
      visual: "repayment", accent: "#65D6A5",
      narration: "నవంబర్ 1991 నాటికి రుణం పూర్తిగా తీర్చారు. కానీ బంగారం వెంటనే భారత్‌కు తిరిగి రాలేదు!"
    },
    {
      id: 8, label: "THE PAYOFF", durationInFrames: 269,
      headline: "ఒక కఠిన నిర్ణయం…\nచరిత్రలో నిలిచిన కథ",
      subtitle: "1991 భారత ఆర్థిక సంక్షోభం",
      visual: "payoff", accent: "#FFD166",
      narration: "ఈ కఠిన నిర్ణయం, ఆర్థిక సంస్కరణల ఆరంభ కాలంలో భారత్‌ను డిఫాల్ట్ ముప్పు నుంచి కాపాడటంలో కీలకమైంది!"
    }
  ] satisfies ShortScene[]
};
