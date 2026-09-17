export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export const questionBank: Question[] = [
  {
    id: 1,
    text: "Which Pramac Racing rider earned the popular nickname 'Thriller' in MotoGP due to his wild, charismatic riding style?",
    options: ["Jack Miller", "Johann Zarco", "Jorge Martín", "Franco Morbidelli"],
    correctAnswerIndex: 0
  },
  {
    id: 2,
    text: "Starting from which MotoGP season did Prima Pramac Racing officially partner with Yamaha as a factory-supported independent team?",
    options: ["2023", "2024", "2025", "2026"],
    correctAnswerIndex: 2
  },
  {
    id: 3,
    text: "Which multi-time World Superbike Champion made his historic switch to MotoGP to join Prima Pramac Racing in 2026 alongside Jack Miller?",
    options: ["Kenan Sofuoğlu", "Toprak Razgatlıoğlu", "Jonathan Rea", "Álvaro Bautista"],
    correctAnswerIndex: 1
  },
  {
    id: 4,
    text: "In 2023, Prima Pramac Racing achieved a historic milestone by becoming the first independent team in MotoGP history to win which title?",
    options: ["MotoGP Teams' World Championship", "Constructors' World Championship", "Moto2 Manufacturers' Cup", "Rookie of the Year Award"],
    correctAnswerIndex: 0
  },
  {
    id: 5,
    text: "What is the main colour identity traditionally featured on Prima Pramac Racing's livery alongside white and red?",
    options: ["Neon Yellow", "Purple / Light Blue", "Matte Black", "Emerald Green"],
    correctAnswerIndex: 1
  },
  {
    id: 6,
    text: "In what year did Pramac Racing officially enter Grand Prix motorcycling, marking the start of their iconic racing journey?",
    options: ["1998", "2002", "2008", "2012"],
    correctAnswerIndex: 1
  },
  {
    id: 7,
    text: "Which Pramac Racing rider delivered an emotional victory at the 2023 Australian Grand Prix?",
    options: ["Jack Miller", "Johann Zarco", "Andrea Iannone", "Danilo Petrucci"],
    correctAnswerIndex: 1
  },
  {
    id: 8,
    text: "In which European country is the Pramac corporate group and racing team headquarters historically based?",
    options: ["Spain", "Italy", "France", "Netherlands"],
    correctAnswerIndex: 1
  },
  {
    id: 9,
    text: "Which rider scored Prima Pramac Racing's very first-ever MotoGP premier-class race victory at the 2021 Styrian Grand Prix?",
    options: ["Jorge Martín", "Jack Miller", "Danilo Petrucci", "Loris Capirossi"],
    correctAnswerIndex: 0
  },
  {
    id: 10,
    text: "What engine layout powers the factory-spec YZR-M1 machines run by Prima Pramac Racing in 2026?",
    options: ["V4 Engine", "Inline-4 Engine", "Parallel-Twin Engine", "V-Twin Engine"],
    correctAnswerIndex: 0
  },
  {
    id: 11,
    text: "What is Australian star Jack Miller's official racing number in MotoGP?",
    options: ["#41", "#43", "#63", "#89"],
    correctAnswerIndex: 1
  },
  {
    id: 12,
    text: "What is Turkish superstar Toprak Razgatlıoğlu's signature racing number?",
    options: ["#1", "#7", "#54", "#99"],
    correctAnswerIndex: 2
  },
  {
    id: 13,
    text: "Jack Miller achieved a rare MotoGP milestone by winning premier-class Grand Prix races with which two different manufacturers before joining Yamaha Pramac?",
    options: ["Yamaha & Suzuki", "Honda & Ducati", "KTM & Aprilia", "Ducati & Kawasaki"],
    correctAnswerIndex: 1
  },
  {
    id: 14,
    text: "Toprak Razgatlıoğlu is world-famous among motorsport fans for executing which stunt on his bike during cool-down laps?",
    options: ["Standing No-Handed Wheelie", "Long Nose-Wheelie / Stoppie", "360-Degree Burnout", "Sidecar Drift"],
    correctAnswerIndex: 1
  },
  {
    id: 15,
    text: "Which country is Jack Miller originally from?",
    options: ["United Kingdom", "New Zealand", "Australia", "South Africa"],
    correctAnswerIndex: 2
  },
  {
    id: 16,
    text: "Toprak Razgatlıoğlu won his first World Superbike (WorldSBK) Championship in 2021 riding for which manufacturer?",
    options: ["Kawasaki", "Yamaha", "BMW", "Ducati"],
    correctAnswerIndex: 1
  },
  {
    id: 17,
    text: "Jack Miller made a famous leap in 2015 directly into the MotoGP premier class, completely skipping which intermediate class?",
    options: ["Moto3", "Moto2", "125cc", "Superstock 1000"],
    correctAnswerIndex: 1
  },
  {
    id: 18,
    text: "What popular nickname is Turkish riding legend Toprak Razgatlıoğlu known by among his global fanbase?",
    options: ["The Rocket", "El Turco", "The Flying Turk", "The Tornado"],
    correctAnswerIndex: 1
  },
  {
    id: 19,
    text: "Jack Miller earned his famous reputation as a \"Rain Master\" after winning his very first MotoGP premier-class victory in soaking wet conditions at which circuit in 2016?",
    options: ["Silverstone", "TT Circuit Assen", "Le Mans", "Valencia"],
    correctAnswerIndex: 1
  },
  {
    id: 20,
    text: "In 2024, Toprak Razgatlıoğlu set an all-time World Superbike (WorldSBK) record by winning how many consecutive races in a single season?",
    options: ["8 consecutive wins", "10 consecutive wins", "13 consecutive wins", "18 consecutive wins"],
    correctAnswerIndex: 2
  },
  {
    id: 21,
    text: "What is the name of Motul's latest offering, focusing on bringing a race-like thrill to your bikes?",
    options: ["Motul GP Series", "Motul 7100", "Motul 300V", "Motul 5100"],
    correctAnswerIndex: 0
  },
  {
    id: 22,
    text: "Motul has a deep legacy in Grand Prix racing. Which historic European MotoGP event—famously known as the \"Cathedral of Speed\"—has Motul long served as the official title sponsor for?",
    options: ["British GP at Silverstone", "TT Assen in the Netherlands (Motul TT Assen)", "German GP at Sachsenring", "Italian GP at Mugello"],
    correctAnswerIndex: 1
  },
  {
    id: 23,
    text: "What does the \"4T\" designation on Motul bike engine oil bottles stand for?",
    options: ["4-Turbos", "4-Stroke Engines", "4-Time Champion", "4-Titanium Formula"],
    correctAnswerIndex: 1
  },
  {
    id: 24,
    text: "Motul is one of the oldest lubricant brands in world history. How many years of heritage does Motul represent today?",
    options: ["Over 75 years", "Over 100 years", "Over 170 years", "Over 220 years"],
    correctAnswerIndex: 2
  },
  {
    id: 25,
    text: "Motul also serves as the official partner for which world-famous endurance car race?",
    options: ["24 Hours of Daytona", "24 Hours of Le Mans", "24 Hours of Nürburgring", "24 Hours of Spa"],
    correctAnswerIndex: 1
  },
  {
    id: 26,
    text: "Which country is Motul's global corporate headquarters located in?",
    options: ["Germany", "Italy", "France", "United States"],
    correctAnswerIndex: 2
  },
  {
    id: 27,
    text: "To honor Motul’s legendary history and partnership in Grand Prix racing, which famous Spanish MotoGP circuit officially named its Turn 8 as \"Curva Motul\" (Motul Corner)?",
    options: ["Circuito de Jerez", "Circuit de Barcelona-Catalunya", "Circuit Ricardo Tormo (Valencia)", "MotorLand Aragón"],
    correctAnswerIndex: 2
  },
  {
    id: 28,
    text: "What does the \"300V\" in Motul’s flagship racing lubricant line originally celebrate?",
    options: ["300 Velocity Index", "300 Racing Victories", "300 Miles Per Hour", "300 Viscosity Rating"],
    correctAnswerIndex: 1
  },
  {
    id: 29,
    text: "Which F1 team did Motul partner up to mark its return to F1 from the 2026 season?",
    options: ["Mercedes", "McLaren", "Audi", "Alpine"],
    correctAnswerIndex: 1
  },
  {
    id: 30,
    text: "Which French distributor renamed itself as Motul, after buying the rights in 1957?",
    options: ["Swan And Finch Oil Corporation", "Supra Penn", "Motul Tech", "Ipone"],
    correctAnswerIndex: 1
  },
  {
    id: 31,
    text: "In the current MotoGP premier class, what is the maximum engine displacement allowed for 4-stroke prototype motorcycles?",
    options: ["750cc", "800cc", "1000cc", "1200cc"],
    correctAnswerIndex: 2
  },
  {
    id: 32,
    text: "Introduced to MotoGP race weekends to add fast-paced excitement, what Saturday race format awards half-points to top finishers?",
    options: ["Superpole", "Sprint Race", "Warm-Up Shootout", "Knockout Lap"],
    correctAnswerIndex: 1
  },
  {
    id: 33,
    text: "Which Indian circuit made history by hosting India’s inaugural MotoGP race (Grand Prix of India) in 2023?",
    options: ["Madras International Circuit", "Buddh International Circuit", "Kari Motor Speedway", "Coimbatore Auto Grid"],
    correctAnswerIndex: 1
  },
  {
    id: 34,
    text: "What does the term \"Paddock\" refer to in MotoGP?",
    options: ["The starting grid line", "The pit area behind the garages where teams, riders, and hospitality operate", "The highest-speed straight section of a circuit", "The gravel trap on a sharp corner"],
    correctAnswerIndex: 1
  },
  {
    id: 35,
    text: "In MotoGP, what does a solid Yellow Flag shown by track marshals indicate to riders?",
    options: ["The race is finished", "Danger ahead on or near the track; slow down and no overtaking", "Pit lane is closed", "Rain has started falling"],
    correctAnswerIndex: 1
  },
  {
    id: 36,
    text: "What flag is waved at the finish line to signify the conclusion of a MotoGP race?",
    options: ["Red Flag", "Yellow & Red Striped Flag", "Black & White Chequered Flag", "White Flag"],
    correctAnswerIndex: 2
  },
  {
    id: 37,
    text: "What is the official name of the lane adjacent to the track where pit boxes, telemetry screens, and mechanics operate during sessions?",
    options: ["Pit Lane", "Fast Lane", "Grid Lane", "Service Corridor"],
    correctAnswerIndex: 0
  },
  {
    id: 38,
    text: "What electronic safety technology in modern MotoGP bikes prevents the rear tire from spinning uncontrollably under hard acceleration out of corners?",
    options: ["Anti-Lock Braking System (ABS)", "Traction Control System (TCS)", "Launch Control", "Quickshifter"],
    correctAnswerIndex: 1
  },
  {
    id: 39,
    text: "The Buddh International Circuit in India is famous on the MotoGP calendar for having one of the longest back-straights, measuring approximately how long?",
    options: ["500 meters", "750 meters", "Over 1 kilometer (1.06 km)", "2 kilometers"],
    correctAnswerIndex: 2
  },
  {
    id: 40,
    text: "In MotoGP, when a dry race turns wet and riders pull into pit lane to swap to a second bike fitted with rain tires, what is this format called?",
    options: ["Pit-Stop Shootout", "Flag-to-Flag Race", "Joker Lap", "Weather Restart"],
    correctAnswerIndex: 1
  }
];

export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
