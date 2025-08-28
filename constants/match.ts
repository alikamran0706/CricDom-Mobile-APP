import { BowlerPerformance, ManOfTheMatch, MatchMoment, PlayerPerformance, TeamInnings } from "@/lib/types/match";

export const matchData = {
  id: "1",
  title: "County Championship",
  subtitle: "Day 3 - Final",
  status: "Live",
  venue: "Lord's Cricket Ground",
  toss: "Warriors won the toss and elected to bat",
  series: "Rising Stars Division",
  timings: "09:36 AM - 02:51 PM",
  matchType: "Final",
  matchDate: "Aug 24, 2025",
  date: "March 15, 2024",
  time: "2:30 PM",
  team1: {
    name: "Stars",
    logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&auto=format&fit=crop&q=60",
    score: "285/8",
    overs: "50.0",
  },
  team2: {
    name: "Warriors",
    logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&auto=format&fit=crop&q=60",
    score: "278/10",
    overs: "49.2",
  },
  result: "Titans won by 7 runs",
  topPerformers: [
    {
      id: "1",
      name: "Ethan Carter",
      runs: 89,
      balls: 67,
      fours: 8,
      sixes: 2,
      strikeRate: 132.8,
      avatar: "https://images.unsplash.com/photo-1646282814550-f521d9b57a59?w=100&auto=format&fit=crop&q=60"
    },
    {
      id: "2",
      name: "James Wilson",
      runs: 76,
      balls: 82,
      fours: 6,
      sixes: 1,
      strikeRate: 92.7,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60"
    }
  ] as PlayerPerformance[],
  topBowlers: [
    {
      id: "1",
      name: "Mike Johnson",
      overs: "10.0",
      runs: 42,
      wickets: 3,
      economy: 4.2,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60"
    },
    {
      id: "2",
      name: "Alex Brown",
      overs: "9.2",
      runs: 38,
      wickets: 2,
      economy: 4.1,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60"
    }
  ] as BowlerPerformance[],
  keyMoments: [
    {
      id: "1",
      over: "15.3",
      description: "Ethan Carter hits a massive six over long-on",
      type: "boundary"
    },
    {
      id: "2",
      over: "23.1",
      description: "James Wilson reaches his half-century",
      type: "milestone"
    },
    {
      id: "3",
      over: "35.4",
      description: "Mike Johnson takes a brilliant catch",
      type: "wicket"
    }
  ] as MatchMoment[]
};

export const matchTypes = [{ label: "League", value: 'League' }, { label: "Semi Final", value: 'Semi' }, { label: "Final", value: 'Final' }];



// Sample data - replace with your actual match data
export const teamA: TeamInnings = {
  teamName: "Stars",
  totalRuns: 248,
  wickets: 6,
  overs: "40.0",
  runRate: "6.20",
  battingStats: [
    {
      id: "1",
      name: "Raj Shekhar",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
      runs: 8,
      balls: 13,
      fours: 1,
      sixes: 0,
      strikeRate: 61.54,
      isOut: true,
      dismissal: "c Kaushik A b Gaurav V",
      isWicketKeeper: true,
    },
    {
      id: "2",
      name: "Karthik Goud Resu",
      image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60",
      runs: 25,
      balls: 36,
      fours: 1,
      sixes: 1,
      strikeRate: 69.44,
      isOut: true,
      dismissal: "c Tarun G b Vinay Y",
    },
    {
      id: "3",
      name: "Naveen Sama",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      runs: 53,
      balls: 55,
      fours: 4,
      sixes: 3,
      strikeRate: 96.36,
      isOut: true,
      dismissal: "c Param P b Vinay Y",
    },
    {
      id: "4",
      name: "Vinodh Rajagopalan",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      runs: 0,
      balls: 3,
      fours: 0,
      sixes: 0,
      strikeRate: 0.00,
      isOut: true,
      dismissal: "c&b Vinay Y",
    },
    {
      id: "5",
      name: "Rahul Radhakrishna",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
      runs: 25,
      balls: 40,
      fours: 2,
      sixes: 0,
      strikeRate: 62.50,
      isOut: true,
      dismissal: "c Pranav M b Shanmukh Pavan Kumar Varma S",
    },
    {
      id: "6",
      name: "Dhruva Kota",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&auto=format&fit=crop&q=60",
      runs: 60,
      balls: 66,
      fours: 2,
      sixes: 4,
      strikeRate: 90.91,
      isOut: true,
      dismissal: "c Anirudh J b Taha F",
      isCaptain: true,
    },
    {
      id: "7",
      name: "Ankush Kalohia",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=60",
      runs: 41,
      balls: 28,
      fours: 1,
      sixes: 2,
      strikeRate: 146.43,
      isOut: false,
      isNotOut: true,
    },
    {
      id: "8",
      name: "Ranaveer Aelgani",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
      runs: 0,
      balls: 1,
      fours: 0,
      sixes: 0,
      strikeRate: 0.00,
      isOut: false,
      isNotOut: true,
    },
  ],
  bowlingStats: [
    {
      id: "1",
      name: "Taha Farooqi",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60",
      overs: "8.0",
      maidens: 0,
      runs: 49,
      wickets: 1,
      economy: "6.1",
      wides: 7,
      noBalls: 0,
    },
    {
      id: "2",
      name: "Gaurav Vashisht",
      image: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=100&auto=format&fit=crop&q=60",
      overs: "3.0",
      maidens: 0,
      runs: 19,
      wickets: 1,
      economy: "6.3",
      wides: 2,
      noBalls: 1,
    },
    {
      id: "3",
      name: "Shanmukh Pavan Kumar Varma Sagi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
      overs: "8.0",
      maidens: 0,
      runs: 46,
      wickets: 1,
      economy: "5.8",
      wides: 0,
      noBalls: 1,
    },
    {
      id: "4",
      name: "Pranav Madhusoodana",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
      overs: "8.0",
      maidens: 0,
      runs: 36,
      wickets: 0,
      economy: "4.5",
      wides: 1,
      noBalls: 0,
    },
  ],
  extras: {
    byes: 2,
    legByes: 2,
    noBalls: 2,
    wides: 30,
    total: 36,
  },
  fallOfWickets: [
    { playerName: "Raj S", score: 18, wicket: 1, over: "3.6" },
    { playerName: "Karthik Goud R", score: 99, wicket: 2, over: "15.4" },
    { playerName: "Vinodh R", score: 105, wicket: 3, over: "17.1" },
    { playerName: "Naveen S", score: 109, wicket: 4, over: "17.4" },
    { playerName: "Rahul R", score: 163, wicket: 5, over: "31.5" },
    { playerName: "Ankush K", score: 245, wicket: 6, over: "39.4" },
  ],
  yetToBat: [
    "Ravi S Kandru",
    "Sai Vineeth Putchala",
    "Mounish Kumar Vinnakota"
  ],
};

export  const manOfTheMatch: ManOfTheMatch = {
    id: "motm1",
    name: "Naveen Sama",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    team: "Greater Minnesota CC",
    performance: {
      batting: {
        runs: 53,
        balls: 55,
        fours: 4,
        sixes: 3,
        strikeRate: 96.36,
      },
      fielding: {
        catches: 2,
        runOuts: 0,
      },
    },
    award: "Player of the Match",
    description:
      "Outstanding batting performance with 53 runs off 55 balls including 4 fours and 3 sixes, plus 2 crucial catches in the field.",
  }