import { useState, useCallback, createContext, useContext } from "react";
import {
  Home, Dumbbell, Calendar, TrendingUp, Trophy, Users, CreditCard, CalendarDays,
  Menu, X, Bell, Settings, Shield, ChevronRight, ChevronDown, Flame, Clock,
  PartyPopper, ArrowUpRight, ArrowDownRight, Award, DollarSign, LayoutDashboard,
  UserCheck, Megaphone, LogOut, Plus, Edit3, Send, Search, Copy,
  CheckCircle2, UserPlus, Heart, Target
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ═══════════════════════════════════════════════════════════════
//  GYM_CONFIG — Portland Strength Collective
//  Change this object to deploy for any gym.
// ═══════════════════════════════════════════════════════════════
const GYM_CONFIG = {
  name: "PSC",
  subtitle: "PORTLAND STRENGTH COLLECTIVE",
  tagline: "Welcome to the best hour of your day.",
  logoMark: "PSC",
  logoImage: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/psc-logo-arch-white-sm.png",
  description: "An inclusive functional fitness gym in SE Portland focused on building strength and community.",
  heroLine1: "BUILD",
  heroLine2: "STRENGTH",
  heroImage: "https://portlandstrengthcollective.com/wp-content/uploads/2024/09/cropped-cropped-IMG_0144-3-scaled-1-1.jpg",

  address: { street: "1225 SE Grand Ave", city: "Portland", state: "OR", zip: "97214" },
  phone: "(860) 550-3776",
  email: "info@portlandstrengthcollective.com",
  neighborhood: "SE Portland",
  website: "https://portlandstrengthcollective.com",
  social: { instagram: "@portlandstrengthcollective" },

  photos: {
    community: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A4507-1600x800.jpg",
  },

  pageHeroes: {
    home: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/09/cropped-cropped-IMG_0144-3-scaled-1-1.jpg", gradient: "linear-gradient(135deg, #1a2e2a 0%, #0d1917 100%)" },
    wods: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/09/1C9A4699-1600x800.jpg", gradient: "linear-gradient(135deg, #1f2d28 0%, #111a16 100%)" },
    schedule: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A4674-1-1600x800.jpg", gradient: "linear-gradient(135deg, #1a2a26 0%, #0f1c18 100%)" },
    track: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A5002-1600x800.jpg", gradient: "linear-gradient(135deg, #22332d 0%, #131e1a 100%)" },
    leaderboards: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A5679-1600x800.jpg", gradient: "linear-gradient(135deg, #2a3530 0%, #141d19 100%)" },
    coaches: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A4435-1600x800.jpg", gradient: "linear-gradient(135deg, #1e2d28 0%, #101b17 100%)" },
    membership: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A3846-1600x800.jpg", gradient: "linear-gradient(135deg, #253530 0%, #131f1b 100%)" },
    events: { image: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/1C9A4507-1600x800.jpg", gradient: "linear-gradient(135deg, #2a302d 0%, #151c19 100%)" },
  },

  // Teal / forest green — earthy, inclusive, Portland vibe
  theme: {
    accent:     { h: 162, s: 63, l: 41 },   // Deep teal green
    accentAlt:  { h: 45,  s: 93, l: 47 },   // Warm gold
    warning:    { h: 25,  s: 95, l: 53 },    // Burnt orange
    primary:    { h: 200, s: 18, l: 10 },    // Dark charcoal
    surface:    { h: 0,   s: 0,  l: 100 },
    surfaceDim: { h: 160, s: 8,  l: 96 },
  },

  features: {
    competitions: true,
    openGym: true,
    olympicLifting: true,
    barbellClub: true,
    foundations: true,
    yoga: true,
    communityWorkout: true,
    progressPhotos: false,
    leaderboards: true,
    guestPasses: true,
    prFeed: true,
  },

  classCapacity: 16,
  specialtyCapacity: 10,
};

// ═══════════════════════════════════════════════════════════════
//  THEME SYSTEM
// ═══════════════════════════════════════════════════════════════
const hsl = (c, a) => a !== undefined ? `hsla(${c.h},${c.s}%,${c.l}%,${a})` : `hsl(${c.h},${c.s}%,${c.l}%)`;
const hslShift = (c, lShift) => `hsl(${c.h},${c.s}%,${Math.max(0, Math.min(100, c.l + lShift))}%)`;

const T = {
  accent: hsl(GYM_CONFIG.theme.accent),
  accentDark: hslShift(GYM_CONFIG.theme.accent, -12),
  accentLight: hslShift(GYM_CONFIG.theme.accent, 30),
  accentGhost: hsl(GYM_CONFIG.theme.accent, 0.1),
  accentBorder: hsl(GYM_CONFIG.theme.accent, 0.2),
  success: hsl(GYM_CONFIG.theme.accentAlt),
  successGhost: hsl(GYM_CONFIG.theme.accentAlt, 0.1),
  successBorder: hsl(GYM_CONFIG.theme.accentAlt, 0.2),
  warning: hsl(GYM_CONFIG.theme.warning),
  warningGhost: hsl(GYM_CONFIG.theme.warning, 0.12),
  warningBorder: hsl(GYM_CONFIG.theme.warning, 0.25),
  bg: hsl(GYM_CONFIG.theme.primary),
  bgCard: hsl(GYM_CONFIG.theme.surface),
  bgDim: hsl(GYM_CONFIG.theme.surfaceDim),
  text: "#18181b",
  textMuted: "#71717a",
  textFaint: "#a1a1aa",
  border: "#e4e4e7",
  borderLight: "#f4f4f5",
};

// ═══════════════════════════════════════════════════════════════
//  DATE HELPERS
// ═══════════════════════════════════════════════════════════════
const today = new Date().toISOString().split("T")[0];
const offsetDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split("T")[0]; };
const formatDateShort = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
const formatDateLong = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); };
const fmtTime = (t) => { const [h, m] = t.split(":"); const hr = +h; return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; };

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA — PSC Content
// ═══════════════════════════════════════════════════════════════
const COACHES = [
  { id: "c1", firstName: "Quint", lastName: "Fischer", nickname: "Q", role: "Founder & Head Coach", pronouns: "He/Him", certs: ["CF-L1", "USAW-L1", "USAW-L2", "FMS", "CF Football", "OPT CCP Assessment", "OPT CCP Program Design", "Starrett Mobility", "Robb Wolf Nutrition", "Everett Oly Lifting"], specialties: ["Strength & Conditioning", "Olympic Lifting", "Programming", "Mobility"], yearsCoaching: 16, bio: "Quint discovered CrossFit in December 2007 and began coaching in August 2008 at Primal Fitness in Washington, DC. He later served as an Olympic weightlifting and CrossFit coach at Balance Gym while working as an intelligence analyst at INTERPOL Washington. He had the honor of coaching Christy Phillips at the 2009 CrossFit Games, where she placed 6th overall. He has coached everyone from weightlifters to roller derby jammers to Members of Congress. Since 2015, he has served as the S&C coach for the Rose City Rollers Wheels of Justice, four-time WFTDA World Champions (2015, 2016, 2018, 2019). He is a firm believer in strength development, mobility, structural balance, movement quality, and the Utah Jazz.", photo: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/quint-e1727903668160.jpg" },
  { id: "c2", firstName: "Jay", lastName: "Mendoza", nickname: null, role: "Head Coach", pronouns: "He/Him", certs: ["USAW-L1", "USAW-L2", "BS Public Health", "MPH (in progress)"], specialties: ["Olympic Weightlifting", "Barbell Strength", "Hypertrophy", "S&C"], yearsCoaching: 14, bio: "Jay has been a professional in the health, fitness, and Olympic weightlifting realm for nearly a decade and a half, with his earliest coaching experiences at a CrossFit affiliate in Southern California where he competed in the now-defunct SoCal Regionals. He achieved national-level qualification in 2015 as a competitor in the 77kg weight category and has coached numerous athletes to the national and international level. He coaches through a lens of empathy, inclusivity, and trauma-sensitivity. When not coaching, he's completing his Master of Public Health at OHSU-PSU, attending live music events, or exploring Portland with his corgi/Aussie shepherd mix, Vader.", photo: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/jay-e1727903620934.jpg" },
  { id: "c3", firstName: "Emma", lastName: "Krnacik", nickname: null, role: "Coach", pronouns: "She/Her", certs: ["ACE Group Fitness Instructor", "ACE Personal Trainer", "USAW-L1", "CPR/AED"], specialties: ["Functional Fitness", "Barbell Work", "Rugby Background"], yearsCoaching: 3, bio: "As a former rugby player, Emma transitioned to CrossFit in 2018 as a more sustainable option for her body. She channels her love for the community into coaching, encouraging others to find confidence through the barbell. Outside the gym you can find her playing board games, making DIY furniture, or hiking with her dog Rey.", photo: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/emma-e1727903741318.jpg" },
  { id: "c4", firstName: "Olivia", lastName: "Dudo", nickname: null, role: "Coach", pronouns: "She/They", certs: ["ACE Group Fitness Instructor", "ACE Personal Trainer", "CPR/AED"], specialties: ["Functional Fitness", "Movement Quality", "Lacrosse Background"], yearsCoaching: 5, bio: "Olivia found coaching through the coaches she's had throughout her life — through high school sports, college lacrosse, distance running, and CrossFit. It has been the great coaches, like PSC's founder Quint — the listeners, teachers, the ones who show up every day for their athletes — that inspire her most. She believes everyone deserves to learn what their body can do, whether it's your first squat or your latest PR. Caring for our bodies is the first step in caring for our communities.", photo: "https://portlandstrengthcollective.com/wp-content/uploads/2026/03/IMG_0373-600x600.jpg" },
  { id: "c5", firstName: "Steph", lastName: "Brownstein", nickname: null, role: "Coach", pronouns: "They/Them", certs: ["CF-L1", "CF-L2", "CPR/AED"], specialties: ["Functional Fitness", "Team Sports", "Field Hockey Background"], yearsCoaching: 7, bio: "Movement and team sports have been part of Steph's life from a very young age, progressing to D1 collegiate field hockey. CrossFit entered their life in 2010 in central Illinois. They've seen strength training provide a sense of achievement and resilience that carries over into so many other areas of life. Outside the gym — hiking, biking, skiing, bouldering, and making homemade kombucha.", photo: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/steph-e1727903693391.jpg" },
  { id: "c6", firstName: "Nick", lastName: "Kuzma", nickname: null, role: "Coach", pronouns: "He/Him", certs: ["ACE Group Fitness Instructor (in progress)", "CPR/AED"], specialties: ["CrossFit", "Olympic Lifting", "Strength & Conditioning"], yearsCoaching: 10, bio: "Nick brings a pragmatic yet passionate approach to fitness, shaped by his concurrent roles as CEO of Stesso and VP of Growth at Chptr. With over a decade of experience in CrossFit, strength conditioning, and Olympic lifting, Nick sees the gym as a vital counterbalance to the pressures of professional life.", photo: "https://portlandstrengthcollective.com/wp-content/uploads/2024/10/kuzma-e1727903725760.jpg" },
];

const TODAYS_WOD = {
  id: "wod-today", date: today, name: "The Collective", type: "BENCHMARK", structure: "For Time",
  timeCap: 18,
  rx: "3 Rounds For Time:\n• 12 Deadlifts (225/155 lbs)\n• 9 Hang Power Cleans (135/95 lbs)\n• 6 Shoulder-to-Overhead (135/95 lbs)\n• 400m Run",
  scaled: "3 Rounds For Time:\n• 12 Deadlifts (155/105 lbs)\n• 9 Hang Power Cleans (95/65 lbs)\n• 6 Shoulder-to-Overhead (95/65 lbs)\n• 400m Run/Row",
  warmup: "2 Rounds: 200m Jog, 10 Deadlifts (empty bar), 10 Front Squats, 5 Push Press, 10 Banded Pull-aparts",
  cooldown: "2:00 Foam Roll Hamstrings, 1:00/side Pigeon Stretch, 1:00 Hang from Bar",
  coachNotes: "Focus on hip hinge positioning. Break the cleans early — 5/4 or 3/3/3. Keep the run pace conversational in Rd 1.",
};

const PAST_WODS = [
  { id: "wod-y1", date: offsetDate(-1), name: "Pause Squats + MetCon", type: "METCON", structure: "Strength + Conditioning", timeCap: 60, rx: "Strength:\nPause Back Squat\n6 x 1 @ 80% w/ 2 sec pause\n\nMetCon — 5 Rounds for Time:\n• Run 250m\n• 8 Push Press (95/63 lbs)\n\nAccessory:\nSide Lying External Rotation\n3 x 12/arm", scaled: "Strength:\nPause Back Squat\n6 x 1 @ moderate w/ 2 sec pause\n\nMetCon — 5 Rounds for Time:\n• Run 200m\n• 8 Push Press (65/45 lbs)\n\nAccessory:\nSide Lying External Rotation\n3 x 12/arm", coachNotes: "2 full seconds in the hole. Drive hard out of the pause. Break push press at round 3 if needed." },
  { id: "wod-y2", date: offsetDate(-2), name: "Upper Body Strength", type: "STRENGTH", structure: "Superset Focus", rx: "EMOM x 7 min:\n2 Pause Hang Power Clean (hips) + 1 Clean @ 60-65%\n\nSuperset A — 4 Rounds:\n• Dips: 6-10 reps\n• Chin-ups: 5-10 reps\n\nSuperset B — 4 Rounds:\n• Ring Row: 10 reps w/ 3 sec eccentric\n• Narrow Push-ups: 10-15+ reps\nRest 60s between sets", scaled: "EMOM x 7 min:\n2 Pause Hang Power Clean + 1 Clean @ light\n\nSuperset A — 4 Rounds:\n• Box Dips: 6-10 reps\n• Banded Chin-ups: 5-10 reps\n\nSuperset B — 4 Rounds:\n• Ring Row: 10 reps\n• Knee Push-ups: 10-15 reps", coachNotes: "Eccentric ring rows are the money move. Control the descent. This is a hypertrophy day — chase the pump." },
  { id: "wod-y3", date: offsetDate(-3), name: "DT", type: "HERO", structure: "For Time", timeCap: 15, rx: "5 Rounds For Time:\n• 12 Deadlifts (155/105)\n• 9 Hang Power Cleans\n• 6 Push Jerks", scaled: "5 Rounds For Time:\n• 12 Deadlifts (115/75)\n• 9 Hang Power Cleans\n• 6 Push Jerks" },
];

const UPCOMING_WOD = { id: "wod-tmrw", date: offsetDate(1), name: "Filthy Fifty", type: "BENCHMARK", structure: "For Time", timeCap: 30, rx: "For Time:\n• 50 Box Jumps (24\")\n• 50 Jumping Pull-ups\n• 50 KB Swings (35/26 lbs)\n• 50 Walking Lunges\n• 50 Knees-to-Elbows\n• 50 Push Press (45/35 lbs)\n• 50 Back Extensions\n• 50 Wall Balls (20/14)\n• 50 Burpees\n• 50 Double Unders", scaled: "For Time (reduce to 30 reps each):\n• Box Step-ups\n• Ring Rows\n• KB Swings (26/18)\n• Walking Lunges\n• Hanging Knee Raises\n• Push Press (35/25)\n• Good Mornings\n• Wall Balls (14/10)\n• Burpees (step-out)\n• 100 Single Unders", coachNotes: "Pace this like a long run. Chip away at each movement. Don't go all-out on box jumps — save legs for lunges." };

const CLASSES_TODAY = [
  { id: "cl1", time: "06:00", type: "Strength & Conditioning", coach: "Quint Fischer", capacity: 16, registered: 14, waitlist: 0 },
  { id: "cl2", time: "07:00", type: "Strength & Conditioning", coach: "Steph Brownstein", capacity: 16, registered: 16, waitlist: 2 },
  { id: "cl3", time: "12:00", type: "Strength & Conditioning", coach: "Emma Krnacik", capacity: 16, registered: 9, waitlist: 0 },
  { id: "cl4", time: "16:30", type: "Strength & Conditioning", coach: "Olivia Dudo", capacity: 16, registered: 12, waitlist: 0 },
  { id: "cl5", time: "17:30", type: "Strength & Conditioning", coach: "Quint Fischer", capacity: 16, registered: 16, waitlist: 3 },
  { id: "cl6", time: "18:30", type: "Barbell Club", coach: "Jay Mendoza", capacity: 10, registered: 8, waitlist: 0 },
  { id: "cl7", time: "19:30", type: "Open Gym", coach: null, capacity: 20, registered: 5, waitlist: 0 },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", classes: [{ time: "06:00", type: "Strength & Conditioning", coach: "Quint" }, { time: "07:00", type: "Strength & Conditioning", coach: "Steph" }, { time: "12:00", type: "Strength & Conditioning", coach: "Emma" }, { time: "16:30", type: "Strength & Conditioning", coach: "Olivia" }, { time: "17:30", type: "Strength & Conditioning", coach: "Quint" }, { time: "18:30", type: "Barbell Club", coach: "Jay" }, { time: "19:30", type: "Open Gym" }] },
  { day: "Tuesday", classes: [{ time: "06:00", type: "Strength & Conditioning", coach: "Steph" }, { time: "07:00", type: "Strength & Conditioning", coach: "Quint" }, { time: "12:00", type: "Strength & Conditioning", coach: "Nick" }, { time: "16:30", type: "Strength & Conditioning", coach: "Emma" }, { time: "17:30", type: "Barbell Club", coach: "Jay" }, { time: "18:30", type: "Strength & Conditioning", coach: "Olivia" }, { time: "19:30", type: "Open Gym" }] },
  { day: "Wednesday", classes: [{ time: "06:00", type: "Strength & Conditioning", coach: "Emma" }, { time: "07:00", type: "Strength & Conditioning", coach: "Steph" }, { time: "12:00", type: "Strength & Conditioning", coach: "Quint" }, { time: "16:30", type: "Strength & Conditioning", coach: "Olivia" }, { time: "17:30", type: "Strength & Conditioning", coach: "Quint" }, { time: "18:30", type: "Barbell Club", coach: "Jay" }, { time: "19:30", type: "Open Gym" }] },
  { day: "Thursday", classes: [{ time: "06:00", type: "Strength & Conditioning", coach: "Quint" }, { time: "07:00", type: "Strength & Conditioning", coach: "Nick" }, { time: "12:00", type: "Strength & Conditioning", coach: "Emma" }, { time: "16:30", type: "Strength & Conditioning", coach: "Olivia" }, { time: "17:30", type: "Barbell Club", coach: "Jay" }, { time: "18:30", type: "Strength & Conditioning", coach: "Steph" }, { time: "19:30", type: "Open Gym" }] },
  { day: "Friday", classes: [{ time: "06:00", type: "Strength & Conditioning", coach: "Steph" }, { time: "07:00", type: "Strength & Conditioning", coach: "Quint" }, { time: "16:30", type: "Strength & Conditioning", coach: "Olivia" }, { time: "17:30", type: "Strength & Conditioning", coach: "Emma" }, { time: "18:30", type: "Open Gym" }] },
  { day: "Saturday", classes: [{ time: "09:00", type: "Free Community Workout", coach: "Quint" }, { time: "10:00", type: "Strength & Conditioning", coach: "Steph" }, { time: "11:00", type: "Barbell Club", coach: "Jay" }, { time: "12:00", type: "Open Gym" }] },
  { day: "Sunday", classes: [{ time: "10:00", type: "Yoga", coach: "Guest Instructor" }] },
];

const PR_FEED = [
  { id: "pr1", user: "Bryant G.", lift: "Front Squat", weight: 315, unit: "lbs", improvement: 15, date: today, celebrations: 14 },
  { id: "pr2", user: "Madeline V.", lift: "Clean & Jerk", weight: 165, unit: "lbs", improvement: 5, date: today, celebrations: 11 },
  { id: "pr3", user: "Ryan M.", lift: "Back Squat", weight: 385, unit: "lbs", improvement: 10, date: offsetDate(-1), celebrations: 18 },
  { id: "pr4", user: "Alex P.", lift: "Snatch", weight: 195, unit: "lbs", improvement: 10, date: offsetDate(-1), celebrations: 9 },
];

const LEADERBOARD_DATA = {
  "The Collective": [
    { rank: 1, user: "Ryan M.", score: "11:34", rx: true },
    { rank: 2, user: "Alex P.", score: "12:02", rx: true },
    { rank: 3, user: "Bryant G.", score: "12:45", rx: true },
    { rank: 4, user: "Madeline V.", score: "13:18", rx: true },
    { rank: 5, user: "Forrest K.", score: "14:06", rx: true },
    { rank: 6, user: "Amy P.", score: "14:22", rx: false },
    { rank: 7, user: "Monica N.", score: "15:01", rx: true },
    { rank: 8, user: "Joe N.", score: "15:33", rx: false },
  ],
  "Back Squat": [
    { rank: 1, user: "Ryan M.", score: "385 lbs", rx: true },
    { rank: 2, user: "Bryant G.", score: "365 lbs", rx: true },
    { rank: 3, user: "Alex P.", score: "345 lbs", rx: true },
    { rank: 4, user: "Joe N.", score: "315 lbs", rx: true },
    { rank: 5, user: "Madeline V.", score: "265 lbs", rx: true },
    { rank: 6, user: "Monica N.", score: "245 lbs", rx: true },
    { rank: 7, user: "Forrest K.", score: "235 lbs", rx: true },
  ],
  "DT": [
    { rank: 1, user: "Alex P.", score: "7:22", rx: true },
    { rank: 2, user: "Ryan M.", score: "7:45", rx: true },
    { rank: 3, user: "Bryant G.", score: "8:18", rx: true },
    { rank: 4, user: "Amy P.", score: "9:02", rx: false },
    { rank: 5, user: "Madeline V.", score: "9:55", rx: true },
  ],
  "Clean & Jerk": [
    { rank: 1, user: "Alex P.", score: "275 lbs", rx: true },
    { rank: 2, user: "Ryan M.", score: "255 lbs", rx: true },
    { rank: 3, user: "Joe N.", score: "235 lbs", rx: true },
    { rank: 4, user: "Bryant G.", score: "225 lbs", rx: true },
    { rank: 5, user: "Madeline V.", score: "165 lbs", rx: true },
  ],
};

const MEMBERSHIP_TIERS = [
  { id: "m1", name: "Drop-In", type: "drop-in", price: 20, period: "per visit", classLimit: 1, features: ["1 class or open gym session", "All equipment access", "Valid for 6 months", "Experienced athletes only"], popular: false },
  { id: "m2", name: "10-Visit Punchcard", type: "punch-card", price: 150, period: "one-time", classLimit: 10, features: ["10 classes or open gym visits", "Valid for 6 months", "All class types included", "Great for flexible schedules"], popular: false },
  { id: "m3", name: "Limited", type: "limited", price: 149, period: "/month", classLimit: 12, features: ["Up to 12 classes + 1 bonus per cycle", "Open gym access", "All class types", "First month just $99"], popular: false },
  { id: "m4", name: "Unlimited", type: "unlimited", price: 199, period: "/month", classLimit: 0, features: ["Unlimited classes", "Unlimited open gym", "All class types included", "Priority registration", "First month just $99"], popular: true },
  { id: "m5", name: "Unlimited Annual", type: "unlimited", price: 149, period: "/month", annualPrice: 1788, classLimit: 0, features: ["Everything in Unlimited", "Best per-month value ($149/mo)", "Pre-paid annually", "Locked-in rate guarantee"], popular: false },
];

const COMPETITIONS = [
  { id: "comp1", name: "PSC Summer Throwdown 2026", date: "2026-08-22", startTime: "09:00", type: "Team", description: "Annual team competition! 3-person teams. 5 events testing strength, conditioning, and teamwork. All levels welcome with Rx and Scaled divisions.", fee: 75, maxParticipants: 30, registered: 18, divisions: ["Rx", "Scaled", "Foundations"], events: ["Team Deadlift Ladder", "Partner AMRAP", "Relay Sprint", "Max Snatch Complex", "Final Chipper"], status: "Registration Open", prizes: "1st: $300 team, 2nd: $150, 3rd: PSC Merch Pack" },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "Free Community Workout Every Saturday!", message: "Bring a friend to our free, all-levels community workout every Saturday at 9:00 AM. No experience needed — coaches will guide you through everything!", type: "celebration", pinned: true },
  { id: "a2", title: "March Foundations Course — $99", message: "New to functional fitness? Our 3-class Group Foundations course starts March 10th. Includes 3 weeks of free classes upon completion!", type: "info", pinned: false },
  { id: "a3", title: "Summer Throwdown Registration Open", message: "August 22nd — 3-person teams, 5 events, Rx & Scaled divisions. Sign up before spots fill!", type: "celebration", pinned: false },
];

const MEMBERS_DATA = [
  { id: "mem1", name: "Bryant Glandorf", email: "bryant@email.com", membership: "Unlimited", status: "active", joined: "2023-06-15", checkIns: 256, lastVisit: today },
  { id: "mem2", name: "Madeline Valenzuela", email: "madeline@email.com", membership: "Unlimited", status: "active", joined: "2024-01-10", checkIns: 198, lastVisit: offsetDate(-1) },
  { id: "mem3", name: "Ryan Mooney", email: "ryan@email.com", membership: "Unlimited", status: "active", joined: "2022-03-01", checkIns: 412, lastVisit: today },
  { id: "mem4", name: "Alex Park", email: "alex@email.com", membership: "Unlimited", status: "active", joined: "2023-09-15", checkIns: 189, lastVisit: offsetDate(-1) },
  { id: "mem5", name: "Forrest Kim", email: "forrest@email.com", membership: "Limited", status: "active", joined: "2024-05-01", checkIns: 67, lastVisit: offsetDate(-2) },
  { id: "mem6", name: "Amy Peeler", email: "amy@email.com", membership: "10-Visit Punchcard", status: "active", joined: "2025-01-20", checkIns: 8, lastVisit: offsetDate(-4) },
  { id: "mem7", name: "Monica Napoli", email: "monica@email.com", membership: "Unlimited", status: "active", joined: "2023-11-01", checkIns: 234, lastVisit: today },
  { id: "mem8", name: "Joe Napoli", email: "joe@email.com", membership: "Unlimited", status: "active", joined: "2023-11-01", checkIns: 228, lastVisit: today },
  { id: "mem9", name: "TB Rodriguez", email: "tb@email.com", membership: "Unlimited", status: "active", joined: "2022-08-15", checkIns: 389, lastVisit: offsetDate(-1) },
  { id: "mem10", name: "Chris Wallace", email: "chris@email.com", membership: "Unlimited", status: "frozen", joined: "2021-05-01", checkIns: 502, lastVisit: offsetDate(-30) },
];

const ADMIN_METRICS = {
  activeMembers: 94, memberChange: 6,
  todayCheckIns: 38, weekCheckIns: 267,
  monthlyRevenue: 18650, revenueChange: 9.3,
  renewalRate: 96.1, prsThisWeek: 17,
};

const ADMIN_CHARTS = {
  attendance: [
    { day: "Mon", total: 52, avg: 13 }, { day: "Tue", total: 48, avg: 12 },
    { day: "Wed", total: 45, avg: 11 }, { day: "Thu", total: 50, avg: 13 },
    { day: "Fri", total: 38, avg: 10 }, { day: "Sat", total: 42, avg: 14 },
    { day: "Sun", total: 12, avg: 12 },
  ],
  revenue: [
    { month: "Sep", revenue: 15200 }, { month: "Oct", revenue: 16100 },
    { month: "Nov", revenue: 15800 }, { month: "Dec", revenue: 14900 },
    { month: "Jan", revenue: 17200 }, { month: "Feb", revenue: 18100 },
    { month: "Mar", revenue: 18650 },
  ],
  classPopularity: [
    { name: "6:00 AM", pct: 88 }, { name: "7:00 AM", pct: 95 },
    { name: "12:00 PM", pct: 62 }, { name: "4:30 PM", pct: 78 },
    { name: "5:30 PM", pct: 97 }, { name: "6:30 PM BB", pct: 82 },
  ],
  membershipBreakdown: [
    { name: "Unlimited", value: 48, color: T.accent },
    { name: "Limited", value: 22, color: T.warning },
    { name: "Annual", value: 14, color: T.success },
    { name: "Punchcard", value: 10, color: T.textMuted },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  APP CONTEXT
// ═══════════════════════════════════════════════════════════════
const AppContext = createContext(null);

// ═══════════════════════════════════════════════════════════════
//  CONSUMER PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const { classRegistrations, registerForClass, prCelebrations, celebratePR } = useContext(AppContext);
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const upcoming = CLASSES_TODAY.filter(c => c.time >= currentTime).slice(0, 4);

  return (
    <div className="pb-6">
      {/* Hero */}
      <section style={{ background: T.bg, color: "#fff", position: "relative", overflow: "hidden" }}>
        {/* Hero Image Zone */}
        <div style={{ height: 160, position: "relative", overflow: "hidden" }}>
          <img src={GYM_CONFIG.heroImage} alt="Portland Strength Collective" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 40, background: "linear-gradient(to top, hsl(200,18%,10%), transparent)" }} />
        </div>
        <div style={{ padding: "20px 20px 28px" }}>
          <p style={{ color: T.accent, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>
            {formatDateLong(today)}
          </p>
          <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 52, lineHeight: 0.95, letterSpacing: "-0.01em", margin: 0 }}>
            {GYM_CONFIG.heroLine1}<br/>
            <span style={{ color: T.accent }}>{GYM_CONFIG.heroLine2}</span>
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: 13, maxWidth: 280, marginTop: 8 }}>{GYM_CONFIG.description}</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: "0 16px", marginTop: -16, position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: Calendar, label: "Reserve", page: "schedule", color: T.accent },
            { icon: TrendingUp, label: "Log PR", page: "track", color: T.success },
            { icon: Trophy, label: "Leaders", page: "leaderboards", color: T.warning },
            { icon: Users, label: "Coaches", page: "coaches", color: T.textMuted },
          ].map(a => (
            <QuickAction key={a.label} {...a} />
          ))}
        </div>
      </section>

      {/* Today's WOD */}
      <section style={{ padding: "0 16px", marginTop: 24 }}>
        <SectionHeader title="Today's WOD" linkText="All WODs" linkPage="wods" />
        <WODCardFull wod={TODAYS_WOD} variant="featured" />
      </section>

      {/* Upcoming Classes */}
      <section style={{ padding: "0 16px", marginTop: 28 }}>
        <SectionHeader title="Upcoming Classes" linkText="Full Schedule" linkPage="schedule" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.length > 0 ? upcoming.map(c => {
            const regs = (classRegistrations[c.id] || 0);
            const totalReg = c.registered + regs;
            const isFull = totalReg >= c.capacity;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 44 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, color: T.text }}>{c.time.split(":")[0]}</span>
                  <span style={{ display: "block", fontSize: 12, color: T.textMuted }}>:{c.time.split(":")[1]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: T.text, fontSize: 14, margin: 0 }}>{c.type}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{c.coach ? c.coach.split(" ")[0] : "Self-guided"}</p>
                </div>
                <div style={{ textAlign: "right", marginRight: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: isFull ? T.warning : totalReg >= c.capacity * 0.8 ? T.success : T.accent }}>{totalReg}/{c.capacity}</span>
                  {c.waitlist > 0 && <span style={{ display: "block", fontSize: 11, color: T.textFaint }}>+{c.waitlist} waitlist</span>}
                </div>
                <button onClick={() => !isFull && registerForClass(c.id)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: isFull ? T.bgDim : T.accent, color: isFull ? T.textMuted : "#fff", transition: "all 0.15s" }}>
                  {isFull ? "Waitlist" : "Reserve"}
                </button>
              </div>
            );
          }) : (
            <EmptyState icon={Clock} message="No more classes today" sub="See tomorrow's schedule" />
          )}
        </div>
      </section>

      {/* PR Feed */}
      {GYM_CONFIG.features.prFeed && (
        <section style={{ padding: "0 16px", marginTop: 28 }}>
          <SectionHeader title="PR Feed 🔥" linkText="View All" linkPage="leaderboards" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PR_FEED.slice(0, 3).map(pr => {
              const myC = prCelebrations[pr.id] || 0;
              return (
                <div key={pr.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Trophy size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>
                      {pr.user} <span style={{ color: T.success }}>hit a new PR!</span>
                    </p>
                    <p style={{ fontSize: 13, color: "#52525b", margin: "2px 0 0" }}>
                      {pr.lift}: <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{pr.weight} {pr.unit}</span>
                      {pr.improvement && <span style={{ color: T.success, marginLeft: 4 }}>(+{pr.improvement})</span>}
                    </p>
                  </div>
                  <button onClick={() => celebratePR(pr.id)} style={{ padding: 8, borderRadius: 8, border: "none", background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.15s" }}>
                    <PartyPopper size={18} color={T.success} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>{pr.celebrations + myC}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Announcements */}
      {ANNOUNCEMENTS.length > 0 && (
        <section style={{ padding: "0 16px", marginTop: 28 }}>
          <SectionHeader title="Announcements" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} style={{ padding: "14px 16px", borderRadius: 12, borderLeft: `4px solid ${a.type === "celebration" ? T.accent : a.type === "alert" ? T.warning : T.textMuted}`, background: a.type === "celebration" ? T.accentGhost : a.type === "alert" ? T.warningGhost : T.bgDim }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: 0 }}>{a.title}</h3>
                    <p style={{ fontSize: 13, color: "#52525b", margin: "4px 0 0" }}>{a.message}</p>
                  </div>
                  {a.pinned && <span style={{ fontSize: 11, fontWeight: 600, color: T.accent, background: T.accentGhost, padding: "2px 8px", borderRadius: 99, flexShrink: 0 }}>Pinned</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section style={{ padding: "0 16px", marginTop: 28 }}>
        <CTACard />
      </section>
    </div>
  );
}

function WODsPage() {
  const [expandedWOD, setExpandedWOD] = useState(null);
  const allWODs = [TODAYS_WOD, ...PAST_WODS, UPCOMING_WOD].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="wods" title="Workouts" subtitle="Past, present, and upcoming programming — structured on 7-12 week training cycles" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {allWODs.map(w => (
          <WODCardFull key={w.id} wod={w} expanded={expandedWOD === w.id} onToggle={() => setExpandedWOD(expandedWOD === w.id ? null : w.id)} />
        ))}
      </div>
    </div>
  );
}

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const { classRegistrations, registerForClass } = useContext(AppContext);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="schedule" title="Schedule" subtitle="Reserve your spot — classes fill fast. Morning, noon, and night." />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {days.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedDay === i ? T.accent : T.bgDim, color: selectedDay === i ? "#fff" : T.textMuted, transition: "all 0.15s" }}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {WEEKLY_SCHEDULE[selectedDay]?.classes.map((cls, i) => {
          const isSC = cls.type === "Strength & Conditioning";
          const cap = isSC ? GYM_CONFIG.classCapacity : GYM_CONFIG.specialtyCapacity;
          // Deterministic mock registration count based on day + time slot index
          const mockReg = Math.floor(cap * 0.5) + ((selectedDay * 7 + i) % Math.floor(cap * 0.4));
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12 }}>
              <div style={{ textAlign: "center", minWidth: 50 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: T.text }}>{fmtTime(cls.time)}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>{cls.type}</p>
                  {!isSC && cls.type !== "Open Gym" && <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "1px 6px", borderRadius: 4, background: cls.type === "Barbell Club" ? T.successGhost : cls.type === "Yoga" ? "hsl(280,60%,95%)" : cls.type === "Free Community Workout" ? T.accentGhost : T.warningGhost, color: cls.type === "Barbell Club" ? T.success : cls.type === "Yoga" ? "hsl(280,50%,45%)" : cls.type === "Free Community Workout" ? T.accent : T.warning }}>{cls.type === "Barbell Club" ? "Oly" : cls.type === "Free Community Workout" ? "Free" : "Special"}</span>}
                </div>
                {cls.coach && <p style={{ fontSize: 12, color: T.textMuted, margin: "3px 0 0" }}>Coach {cls.coach}</p>}
              </div>
              <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: cls.type === "Free Community Workout" ? T.success : T.accent, color: "#fff" }}>
                {cls.type === "Free Community Workout" ? "Join Free" : "Reserve"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrackPage() {
  const [activeTab, setActiveTab] = useState("wod");
  const [wodResult, setWodResult] = useState({ time: "", rounds: "", reps: "", rx: true, notes: "" });
  const [prData, setPrData] = useState({ lift: "", weight: "", unit: "lbs", reps: "1", notes: "" });
  const [saved, setSaved] = useState(null);
  const handleSave = (type) => { setSaved(type); setTimeout(() => setSaved(null), 2000); if (type === "wod") setWodResult({ time: "", rounds: "", reps: "", rx: true, notes: "" }); if (type === "pr") setPrData({ lift: "", weight: "", unit: "lbs", reps: "1", notes: "" }); };
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="track" title="Track" subtitle="Log your results and personal records" />
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.bgDim, borderRadius: 10, padding: 4 }}>
        {[{ id: "wod", label: "WOD Result" }, { id: "pr", label: "Personal Record" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === tab.id ? "#fff" : "transparent", color: activeTab === tab.id ? T.text : T.textMuted, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,.08)" : "none", transition: "all 0.15s" }}>
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "wod" && (
        <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Flame size={18} color={T.accent} />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Log Today's WOD — {TODAYS_WOD.name || "Metcon"}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InputField label="Time (mm:ss)" value={wodResult.time} onChange={v => setWodResult({...wodResult, time: v})} placeholder="11:34" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <InputField label="Rounds" value={wodResult.rounds} onChange={v => setWodResult({...wodResult, rounds: v})} placeholder="3" />
              <InputField label="+ Reps" value={wodResult.reps} onChange={v => setWodResult({...wodResult, reps: v})} placeholder="0" />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
              <ToggleButton active={wodResult.rx} onClick={() => setWodResult({...wodResult, rx: !wodResult.rx})} />
              <span style={{ fontSize: 13, color: T.textMuted }}>{wodResult.rx ? "Rx — As prescribed" : "Scaled"}</span>
            </div>
            <InputField label="Notes" value={wodResult.notes} onChange={v => setWodResult({...wodResult, notes: v})} placeholder="How did it feel?" multiline />
            <button onClick={() => handleSave("wod")} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", fontSize: 18 }}>
              {saved === "wod" ? "✓ SAVED!" : "LOG RESULT"}
            </button>
          </div>
        </div>
      )}
      {activeTab === "pr" && (
        <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Trophy size={18} color={T.success} />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Log a New PR</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <InputField label="Movement / Lift" value={prData.lift} onChange={v => setPrData({...prData, lift: v})} placeholder="e.g. Back Squat, Clean & Jerk" />
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
              <InputField label="Weight" value={prData.weight} onChange={v => setPrData({...prData, weight: v})} placeholder="225" />
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit</label>
                <div style={{ display: "flex", gap: 4, background: T.bgDim, borderRadius: 8, padding: 3 }}>
                  {["lbs", "kg"].map(u => (
                    <button key={u} onClick={() => setPrData({...prData, unit: u})} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: prData.unit === u ? "#fff" : "transparent", color: prData.unit === u ? T.text : T.textMuted }}>{u}</button>
                  ))}
                </div>
              </div>
              <InputField label="Reps" value={prData.reps} onChange={v => setPrData({...prData, reps: v})} placeholder="1" />
            </div>
            <InputField label="Notes" value={prData.notes} onChange={v => setPrData({...prData, notes: v})} placeholder="Any details..." multiline />
            <button onClick={() => handleSave("pr")} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.success, color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", fontSize: 18 }}>
              {saved === "pr" ? "✓ PR LOGGED!" : "LOG PR"}
            </button>
          </div>
        </div>
      )}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: "0.02em", margin: "0 0 12px" }}>Recent History</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { date: today, type: "WOD", name: "The Collective", result: "12:45 Rx", badge: "rx" },
            { date: offsetDate(-1), type: "PR", name: "Front Squat", result: "315 lbs", badge: "pr" },
            { date: offsetDate(-2), type: "WOD", name: "AMRAP 20", result: "5 Rounds + 14 Reps", badge: "scaled" },
            { date: offsetDate(-3), type: "WOD", name: "DT", result: "8:18 Rx", badge: "rx" },
          ].map((h, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#fff", border: `1px solid ${T.border}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: h.badge === "pr" ? T.successGhost : h.badge === "rx" ? T.accentGhost : T.warningGhost, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {h.badge === "pr" ? <Trophy size={16} color={T.success} /> : <Dumbbell size={16} color={h.badge === "rx" ? T.accent : T.warning} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{h.name}</p>
                <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{formatDateShort(h.date)}</p>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 600, color: T.text }}>{h.result}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeaderboardsPage() {
  const [selectedBoard, setSelectedBoard] = useState("The Collective");
  const boards = Object.keys(LEADERBOARD_DATA);
  const data = LEADERBOARD_DATA[selectedBoard] || [];
  const medalColors = ["#FFD700", "#C0C0C0", "#CD7F32"];
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="leaderboards" title="Leaderboards" subtitle="See where you stack up against the collective" />
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {boards.map(b => (
          <button key={b} onClick={() => setSelectedBoard(b)} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedBoard === b ? T.accent : T.bgDim, color: selectedBoard === b ? "#fff" : T.textMuted, transition: "all 0.15s" }}>{b}</button>
        ))}
      </div>
      <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
        {data.map((entry, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < data.length - 1 ? `1px solid ${T.borderLight}` : "none", background: i < 3 ? `${medalColors[i]}08` : "transparent" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, fontWeight: 700, background: i < 3 ? medalColors[i] : T.bgDim, color: i < 3 ? "#fff" : T.textMuted }}>{entry.rank}</div>
            <div style={{ flex: 1 }}><p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: T.text }}>{entry.user}</p></div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {entry.rx && <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent, border: `1px solid ${T.accentBorder}` }}>Rx</span>}
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 600, color: T.text }}>{entry.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoachesPage() {
  const [expandedCoach, setExpandedCoach] = useState(null);
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="coaches" title="Coaches" subtitle="Our staff lead the way — wide variety of athletic backgrounds, qualifications, and specialties" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {COACHES.map(coach => {
          const expanded = expandedCoach === coach.id;
          return (
            <div key={coach.id} onClick={() => setExpandedCoach(expanded ? null : coach.id)} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                {coach.photo ? (
                  <img src={coach.photo} alt={`${coach.firstName} ${coach.lastName}`} loading="lazy" style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", objectPosition: "center top", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", flexShrink: 0 }}>
                    {coach.firstName[0]}{coach.lastName[0]}
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: T.text }}>
                    {coach.firstName} {coach.nickname ? `"${coach.nickname}" ` : ""}{coach.lastName}
                  </h3>
                  <p style={{ fontSize: 13, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{coach.role}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{coach.pronouns} · {coach.yearsCoaching} years coaching</p>
                </div>
                <ChevronDown size={18} color={T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </div>
              {expanded && (
                <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                  {coach.photo && <img src={coach.photo} alt={`${coach.firstName} ${coach.lastName}`} loading="lazy" style={{ width: "100%", height: 200, objectFit: "cover", objectPosition: "center top", borderRadius: 10, marginBottom: 12 }} />}
                  <p style={{ fontSize: 13, color: "#52525b", lineHeight: 1.6, margin: "0 0 12px" }}>{coach.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {coach.specialties.map(s => (
                      <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {coach.certs.map(c => (
                      <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MembershipPage() {
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="membership" title="Membership" subtitle="Join the collective — inclusive fitness for every body" />
      {/* Foundations CTA */}
      <div style={{ background: `linear-gradient(135deg, ${T.accentGhost}, ${T.successGhost})`, border: `1px solid ${T.accentBorder}`, borderRadius: 14, padding: "18px 18px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Target size={18} color={T.accent} />
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, margin: 0, color: T.text }}>New to Fitness?</h3>
        </div>
        <p style={{ fontSize: 13, color: "#52525b", margin: "0 0 10px" }}>Start with our Foundations course! Group Foundations ($99) includes 3 classes + 3 weeks of free classes upon completion.</p>
        <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>Learn About Foundations</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: "#fff", border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 14, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            {tier.popular && (
              <div style={{ position: "absolute", top: 12, right: -28, background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Popular</div>
            )}
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, margin: "0 0 4px", color: T.text }}>{tier.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: T.accent }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>{tier.period}</span>
            </div>
            {tier.annualPrice && (
              <p style={{ fontSize: 12, color: T.success, fontWeight: 600, marginBottom: 12 }}>
                Annual: ${tier.annualPrice}/yr (save ${MEMBERSHIP_TIERS.find(t => t.name === "Unlimited")?.price * 12 - tier.annualPrice}/yr vs monthly)
              </p>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {tier.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#52525b" }}>
                  <CheckCircle2 size={14} color={T.accent} style={{ flexShrink: 0 }} /> {f}
                </li>
              ))}
            </ul>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", background: tier.popular ? T.accent : T.bg, color: "#fff" }}>
              GET STARTED
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div style={{ padding: "0 16px" }}>
      <PageHero pageKey="events" title="Events" subtitle="Competitions, free community workouts, and gatherings" />
      {COMPETITIONS.map(comp => (
        <div key={comp.id} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ background: `linear-gradient(135deg, ${T.bg}, #1a2e2a)`, padding: "20px 18px", color: "#fff" }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.accent }}>{comp.type} Competition</span>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, margin: "6px 0 4px" }}>{comp.name}</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#a1a1aa" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={14} /> {formatDateShort(comp.date)}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {fmtTime(comp.startTime)}</span>
            </div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 13, color: "#52525b", margin: "0 0 12px", lineHeight: 1.5 }}>{comp.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 14 }}>
              <StatBox label="Entry Fee" value={`$${comp.fee}`} />
              <StatBox label="Registered" value={`${comp.registered}/${comp.maxParticipants}`} />
              <StatBox label="Events" value={comp.events.length} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px" }}>Divisions</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {comp.divisions.map(d => (
                  <span key={d} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{d}</span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 6px" }}>Events</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {comp.events.map((e, i) => (
                  <span key={i} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{i + 1}. {e}</span>
                ))}
              </div>
            </div>
            <p style={{ fontSize: 12, color: T.success, fontWeight: 600, margin: "0 0 12px" }}>Prizes: {comp.prizes}</p>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em", background: T.accent, color: "#fff" }}>
              REGISTER NOW
            </button>
          </div>
        </div>
      ))}
      {/* Free Saturday Workout */}
      <div style={{ background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 14, padding: "20px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Heart size={18} color={T.success} />
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, margin: 0, color: T.text }}>Free Community Workout</h3>
        </div>
        <p style={{ fontSize: 13, color: "#52525b", margin: "0 0 12px", lineHeight: 1.5 }}>Every Saturday at 9:00 AM! All fitness levels welcome — our coaches will guide you through everything. Bring a friend and kick off the weekend right!</p>
        <button style={{ padding: "10px 20px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", background: T.success, color: "#fff", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>SIGN UP FREE</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ═══════════════════════════════════════════════════════════════

function AdminDashboard() {
  const { setPage } = useContext(AppContext);
  const [period, setPeriod] = useState("today");
  const metrics = [
    { label: "Total Members", value: ADMIN_METRICS.activeMembers, sub: `+${ADMIN_METRICS.memberChange} this month`, icon: Users, color: "#6366f1" },
    { label: "Active Today", value: ADMIN_METRICS.todayCheckIns, sub: `${Math.round(ADMIN_METRICS.todayCheckIns / ADMIN_METRICS.activeMembers * 100)}% of members`, icon: TrendingUp, color: T.accent },
    { label: "Monthly Revenue", value: `$${ADMIN_METRICS.monthlyRevenue.toLocaleString()}`, sub: `+${ADMIN_METRICS.revenueChange}% vs last month`, icon: DollarSign, color: T.accent, positive: true },
    { label: "Retention Rate", value: `${ADMIN_METRICS.renewalRate}%`, sub: "5 renewals due", icon: CheckCircle2, color: T.accent },
  ];
  const quickActions = [
    { label: "Add WOD", icon: Plus, page: "admin-wods" },
    { label: "Send Broadcast", icon: Bell, page: "admin-broadcast" },
    { label: "Add Member", icon: UserPlus, page: "admin-members" },
    { label: "Edit Schedule", icon: CalendarDays, page: "admin-schedule" },
  ];
  const recentActivity = [
    { text: "Sarah Chen", detail: "checked in to 6:00 AM S&C", time: "6:02 AM", icon: CheckCircle2, color: T.accent },
    { text: "Bryant G.", detail: "logged new PR: Front Squat 315 lbs", time: "5:45 AM", icon: Trophy, color: T.success },
    { text: "Emily Rodriguez", detail: "signed up for Unlimited membership", time: "Yesterday", icon: UserPlus, color: "#6366f1" },
    { text: "David Kim", detail: "cancelled 9:00 AM class reservation", time: "Yesterday", icon: X, color: T.warning },
    { text: "Ryan Mooney", detail: "payment received — Monthly", time: "Yesterday", icon: DollarSign, color: T.accent },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: T.text, margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: 14, color: T.textMuted, margin: "4px 0 0" }}>Welcome back! Here's what's happening at {GYM_CONFIG.name}.</p>
        </div>
        <div style={{ display: "flex", gap: 0, background: T.bgDim, borderRadius: 8, border: `1px solid ${T.border}`, overflow: "hidden" }}>
          {["today", "week", "month"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{ padding: "8px 16px", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: period === p ? T.bg : "transparent", color: period === p ? "#fff" : T.textMuted }}>{p}</button>
          ))}
        </div>
      </div>
      {/* Metric cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 20px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 6px", fontWeight: 500 }}>{m.label}</p>
              <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: T.text, margin: "0 0 4px", lineHeight: 1 }}>{m.value}</p>
              <p style={{ fontSize: 12, color: m.positive ? T.accent : T.textMuted, fontWeight: 500, margin: 0 }}>{m.sub}</p>
            </div>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: `${m.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><m.icon size={20} color={m.color} /></div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        {quickActions.map((a, i) => (
          <button key={i} onClick={() => setPage(a.page)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, cursor: "pointer", transition: "all 0.15s" }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: T.bgDim, display: "flex", alignItems: "center", justifyContent: "center" }}><a.icon size={20} color={T.text} /></div>
            <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{a.label}</span>
          </button>
        ))}
      </div>
      {/* Today's Classes + Recent Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
        <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, margin: 0, color: T.text }}>Today's Classes</h2>
            <button onClick={() => setPage("admin-schedule")} style={{ fontSize: 13, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>View All <ChevronRight size={14} /></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CLASSES_TODAY.slice(0, 5).map(c => {
              const pct = Math.round(c.registered / c.capacity * 100);
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: T.bgDim, borderRadius: 10 }}>
                  <div style={{ textAlign: "center", minWidth: 50 }}>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.text, display: "block", lineHeight: 1 }}>{fmtTime(c.time).replace(" ", "")}</span>
                    <span style={{ fontSize: 11, color: T.textFaint }}>60 min</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>{c.coach ? c.coach.split(" ")[0] + " " + c.coach.split(" ")[1]?.[0] + "." : "Self-guided"}</p>
                    <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{c.type === "Strength & Conditioning" ? "S&C" : c.type}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: pct >= 95 ? T.warning : T.text }}>{c.registered}/{c.capacity} spots</span>
                    {c.waitlist > 0 && <span style={{ display: "block", fontSize: 11, color: T.warning }}>{c.waitlist} reserved</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, margin: 0, color: T.text }}>Recent Activity</h2>
            <Clock size={18} color={T.textFaint} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <a.icon size={16} color={a.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: T.text, margin: 0 }}><span style={{ fontWeight: 700 }}>{a.text}</span> {a.detail}</p>
                  <p style={{ fontSize: 12, color: T.textFaint, margin: "3px 0 0" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <AdminCard title="Weekly Attendance">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_CHARTS.attendance}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="day" stroke={T.textFaint} fontSize={12} />
                <YAxis stroke={T.textFaint} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }} />
                <Bar dataKey="total" fill={T.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
        <AdminCard title="Revenue Trend">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_CHARTS.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
                <XAxis dataKey="month" stroke={T.textFaint} fontSize={12} />
                <YAxis stroke={T.textFaint} fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.accent} stopOpacity={0.3} /><stop offset="100%" stopColor={T.accent} stopOpacity={0} /></linearGradient></defs>
                <Area type="monotone" dataKey="revenue" stroke={T.accent} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <AdminCard title="Membership Breakdown">
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart><Pie data={ADMIN_CHARTS.membershipBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>{ADMIN_CHARTS.membershipBreakdown.map((entry, i) => (<Cell key={i} fill={entry.color} />))}</Pie><Tooltip contentStyle={{ backgroundColor: "#fff", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }} /></PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {ADMIN_CHARTS.membershipBreakdown.map((entry, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: entry.color }} /><span style={{ fontSize: 12, color: T.textMuted }}>{entry.name} ({entry.value})</span></div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="Class Popularity (% Capacity)">
          <div style={{ height: 210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_CHARTS.classPopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
                <XAxis type="number" stroke={T.textFaint} fontSize={12} domain={[0, 100]} />
                <YAxis type="category" dataKey="name" stroke={T.textFaint} fontSize={11} width={65} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text }} formatter={v => [`${v}%`, "Avg Capacity"]} />
                <Bar dataKey="pct" fill={T.accent} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = MEMBERS_DATA.filter(m => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>Members</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: T.text, fontWeight: 600, fontSize: 13, cursor: "pointer" }}><UserPlus size={16} /> Add Member</button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.textFaint }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ width: "100%", padding: "10px 12px 10px 36px", background: "#fff", border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["all", "active", "frozen"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: filter === f ? T.accent : "#1f2937", color: filter === f ? "#fff" : T.textMuted }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: `1px solid ${T.border}` }}>
            {["Member", "Membership", "Status", "Check-ins", "Last Visit"].map(h => (
              <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: T.textMuted, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: "12px 16px" }}><p style={{ color: T.text, fontWeight: 600, margin: 0 }}>{m.name}</p><p style={{ color: T.textFaint, fontSize: 12, margin: "2px 0 0" }}>{m.email}</p></td>
                <td style={{ padding: "12px 16px", color: T.text }}>{m.membership}</td>
                <td style={{ padding: "12px 16px" }}><span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: m.status === "active" ? `${T.accent}20` : `${T.warning}20`, color: m.status === "active" ? T.accent : T.warning }}>{m.status}</span></td>
                <td style={{ padding: "12px 16px", color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{m.checkIns}</td>
                <td style={{ padding: "12px 16px", color: T.textMuted, fontSize: 12 }}>{formatDateShort(m.lastVisit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminWODsPage() {
  const allWODs = [UPCOMING_WOD, TODAYS_WOD, ...PAST_WODS];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>WOD Programming</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: T.text, fontWeight: 600, fontSize: 13, cursor: "pointer" }}><Plus size={16} /> New WOD</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {allWODs.map(w => (
          <div key={w.id} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.textMuted }}>{formatDateShort(w.date)}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: w.type === "BENCHMARK" ? T.accentGhost : w.type === "HERO" ? `${T.warning}20` : w.type === "STRENGTH" ? `${T.success}20` : T.bgDim, color: w.type === "BENCHMARK" ? T.accent : w.type === "HERO" ? T.warning : w.type === "STRENGTH" ? T.success : T.textMuted }}>{w.type}</span>
                  {w.date === today && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accent + "20", color: T.accent }}>TODAY</span>}
                  {w.date > today && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#3b82f620", color: "#3b82f6" }}>UPCOMING</span>}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: "0 0 4px" }}>{w.name || w.structure}</h3>
                <pre style={{ fontSize: 12, color: T.text, margin: 0, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{w.rx.split("\n").slice(0, 3).join("\n")}</pre>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit3 size={14} /></button>
                <button style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Copy size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSchedulePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>Schedule Management</h1>
      <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr style={{ borderBottom: `1px solid ${T.border}` }}>
            {["Time", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(h => (
              <th key={h} style={{ padding: "10px 8px", textAlign: "center", color: T.textMuted, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {["06:00", "07:00", "09:00", "10:00", "11:00", "12:00", "16:30", "17:30", "18:30", "19:30"].map(time => (
              <tr key={time} style={{ borderBottom: `1px solid ${T.border}` }}>
                <td style={{ padding: "8px", color: T.text, fontFamily: "'JetBrains Mono', monospace", textAlign: "center", fontSize: 11 }}>{fmtTime(time)}</td>
                {WEEKLY_SCHEDULE.map((day, i) => {
                  const cls = day.classes.find(c => c.time === time);
                  return (
                    <td key={i} style={{ padding: "4px", textAlign: "center" }}>
                      {cls ? (
                        <div style={{ padding: "4px 6px", borderRadius: 4, fontSize: 9, fontWeight: 600, background: cls.type === "Strength & Conditioning" ? T.accentGhost : cls.type === "Barbell Club" ? T.successGhost : cls.type === "Yoga" ? "hsl(280,60%,95%)" : T.bgDim, color: cls.type === "Strength & Conditioning" ? T.accent : cls.type === "Barbell Club" ? T.success : cls.type === "Yoga" ? "hsl(280,50%,45%)" : T.textMuted }}>
                          {cls.type === "Strength & Conditioning" ? "S&C" : cls.type === "Barbell Club" ? "BB Club" : cls.type === "Free Community Workout" ? "Free WOD" : cls.type}
                        </div>
                      ) : <span style={{ color: T.bgDim }}>—</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCoachesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>Coaching Staff</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {COACHES.map(coach => (
          <div key={coach.id} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              {coach.photo ? (
                <img src={coach.photo} alt={`${coach.firstName} ${coach.lastName}`} loading="lazy" style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover", objectPosition: "center top" }} />
              ) : (
                <div style={{ width: 48, height: 48, borderRadius: 10, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#fff" }}>{coach.firstName[0]}{coach.lastName[0]}</div>
              )}
              <div>
                <h3 style={{ color: T.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{coach.firstName} {coach.lastName}</h3>
                <p style={{ fontSize: 12, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{coach.role}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
              {coach.certs.map(c => (
                <span key={c} style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: T.bgDim, color: T.textMuted }}>{c}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.text, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.text, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPricingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>Pricing & Memberships</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: "#fff", border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 12, padding: 18 }}>
            {tier.popular && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: T.accentGhost, color: T.accent, marginBottom: 8, display: "inline-block" }}>MOST POPULAR</span>}
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: T.text, margin: "0 0 4px" }}>{tier.name}</h3>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: T.accent }}>${tier.price}<span style={{ fontSize: 14, color: T.textMuted }}>{tier.period}</span></div>
            <p style={{ fontSize: 12, color: T.textMuted, margin: "8px 0" }}>{tier.features.length} features included</p>
            <button style={{ width: "100%", padding: "8px 0", borderRadius: 6, border: `1px solid ${T.border}`, background: "transparent", color: T.text, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit Tier</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCompetitionsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>Competitions</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: T.text, fontWeight: 600, fontSize: 13, cursor: "pointer" }}><Plus size={16} /> New Competition</button>
      </div>
      {COMPETITIONS.map(comp => (
        <div key={comp.id} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}20`, color: T.accent }}>{comp.status}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: T.text, margin: "8px 0 4px" }}>{comp.name}</h3>
              <p style={{ fontSize: 13, color: T.textMuted }}>{formatDateShort(comp.date)} · {comp.type} · ${comp.fee} entry</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.accent }}>{comp.registered}</div>
              <p style={{ fontSize: 11, color: T.textMuted }}>of {comp.maxParticipants} spots</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminBroadcastPage() {
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: T.text, margin: 0 }}>Broadcast & Notifications</h1>
      <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, padding: 18 }}>
        <h3 style={{ color: T.text, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>New Broadcast</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Title" style={{ padding: "10px 14px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 13, outline: "none" }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." rows={4} style={{ padding: "10px 14px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "active", "inactive", "coaches"].map(a => (
              <button key={a} onClick={() => setAudience(a)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: audience === a ? T.accent : T.bgDim, color: audience === a ? "#fff" : T.textMuted }}>{a}</button>
            ))}
          </div>
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Send size={16} /> Send Broadcast</button>
        </div>
      </div>
      <div>
        <h3 style={{ color: T.text, fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Sent Broadcasts</h3>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 10, padding: 14, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ color: T.text, margin: 0, fontSize: 14, fontWeight: 600 }}>{a.title}</h4>
              {a.pinned && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>PINNED</span>}
            </div>
            <p style={{ fontSize: 12, color: T.textMuted, margin: "4px 0 0" }}>{a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════
function SectionHeader({ title, linkText, linkPage }) {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h2 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 24, letterSpacing: "0.02em", margin: 0 }}>{title}</h2>
      {linkText && <button onClick={() => setPage(linkPage)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer" }}>{linkText} <ChevronRight size={16} /></button>}
    </div>
  );
}

function PageTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 36, letterSpacing: "0.01em", margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>{subtitle}</p>}
    </div>
  );
}

function PageHero({ pageKey, title, subtitle, overlay }) {
  const hero = GYM_CONFIG.pageHeroes[pageKey];
  if (!hero) return null;
  return (
    <div style={{ position: "relative", margin: "0 -16px 20px", padding: "40px 20px 32px", background: hero.gradient, overflow: "hidden" }}>
      {hero.image && <img src={hero.image} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: 36, color: "#fff", letterSpacing: "0.01em", margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "6px 0 0", maxWidth: 280 }}>{subtitle}</p>}
        {overlay}
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, page, color }) {
  const { setPage } = useContext(AppContext);
  return (
    <button onClick={() => setPage(page)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: "#fff", borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={20} color="#fff" /></div>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{label}</span>
    </button>
  );
}

function WODCardFull({ wod, variant, expanded, onToggle }) {
  const [showScaled, setShowScaled] = useState(false);
  const isFeatured = variant === "featured";
  const isExpanded = expanded !== undefined ? expanded : isFeatured;
  return (
    <div onClick={onToggle} style={{ background: "#fff", border: `1px solid ${T.border}`, borderLeft: `4px solid ${wod.type === "HERO" ? T.warning : wod.type === "BENCHMARK" ? T.accent : wod.type === "STRENGTH" ? T.success : T.textMuted}`, borderRadius: 12, padding: isFeatured ? "18px 18px" : "14px 16px", cursor: onToggle ? "pointer" : "default", transition: "all 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: isExpanded ? 10 : 0 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            {wod.date === today ? <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>TODAY</span> : <span style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>{formatDateShort(wod.date)}</span>}
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: wod.type === "HERO" ? T.warningGhost : wod.type === "BENCHMARK" ? T.accentGhost : wod.type === "STRENGTH" ? T.successGhost : T.bgDim, color: wod.type === "HERO" ? T.warning : wod.type === "BENCHMARK" ? T.accent : wod.type === "STRENGTH" ? T.success : T.textMuted }}>{wod.type}</span>
            {wod.timeCap && <span style={{ fontSize: 11, color: T.textFaint }}>⏱ {wod.timeCap} min</span>}
          </div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: isFeatured ? 28 : 20, margin: 0, color: T.text }}>{wod.name || wod.structure}</h3>
        </div>
        {onToggle && <ChevronDown size={18} color={T.textFaint} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />}
      </div>
      {isExpanded && (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 10, background: T.bgDim, borderRadius: 8, padding: 3 }}>
            <button onClick={e => { e.stopPropagation(); setShowScaled(false); }} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: !showScaled ? T.accent : "transparent", color: !showScaled ? "#fff" : T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Rx</button>
            <button onClick={e => { e.stopPropagation(); setShowScaled(true); }} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer", background: showScaled ? T.warning : "transparent", color: showScaled ? "#fff" : T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Scaled</button>
          </div>
          <pre style={{ fontSize: 14, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "pre-wrap", lineHeight: 1.7, color: T.text, margin: 0, padding: "8px 0" }}>{showScaled ? wod.scaled : wod.rx}</pre>
          {wod.warmup && <div style={{ marginTop: 10, padding: "8px 10px", background: T.bgDim, borderRadius: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Warm-up</span><p style={{ fontSize: 12, color: "#52525b", margin: "4px 0 0", lineHeight: 1.5 }}>{wod.warmup}</p></div>}
          {wod.coachNotes && <div style={{ marginTop: 8, padding: "8px 10px", background: T.warningGhost, borderRadius: 8 }}><span style={{ fontSize: 11, fontWeight: 700, color: T.warning, textTransform: "uppercase", letterSpacing: "0.05em" }}>Coach Notes</span><p style={{ fontSize: 12, color: "#52525b", margin: "4px 0 0", lineHeight: 1.5 }}>{wod.coachNotes}</p></div>}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "10px 12px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 14, color: T.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {multiline ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...style, resize: "vertical" }} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />}
    </div>
  );
}

function ToggleButton({ active, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: active ? T.accent : T.border, position: "relative", transition: "background 0.2s" }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: active ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} />
    </button>
  );
}

function EmptyState({ icon: Icon, message, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <Icon size={36} color={T.textFaint} style={{ margin: "0 auto 8px" }} />
      <p style={{ color: T.textMuted, margin: 0 }}>{message}</p>
      {sub && <p style={{ fontSize: 13, color: T.accent, margin: "6px 0 0" }}>{sub}</p>}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: T.bgDim, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: T.text, margin: 0 }}>{value}</p>
    </div>
  );
}

function CTACard() {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ background: T.bg, borderRadius: 16, padding: "24px 20px", color: "#fff", position: "relative", overflow: "hidden" }}>
      <img src={GYM_CONFIG.photos.community} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,42,38,0.9), rgba(13,25,23,0.95))" }} />
      <div style={{ position: "relative" }}>
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, margin: "0 0 6px" }}>Not a member yet?</h3>
        <p style={{ fontSize: 13, color: "#a1a1aa", margin: "0 0 16px" }}>Join {GYM_CONFIG.subtitle} and become part of {GYM_CONFIG.neighborhood}'s most inclusive fitness community.</p>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setPage("membership")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: "0.05em", cursor: "pointer" }}>
            View Memberships <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminCard({ title, children }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 14, padding: 20 }}>
      <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.text, margin: "0 0 14px" }}>{title}</h3>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════════
function SettingsModal({ onClose }) {
  const [notifWOD, setNotifWOD] = useState(true);
  const [notifPR, setNotifPR] = useState(true);
  const [notifClass, setNotifClass] = useState(true);
  const [notifComp, setNotifComp] = useState(false);
  const [unit, setUnit] = useState("lbs");
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 390, maxHeight: "85vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, margin: 0 }}>Settings</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Profile</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: "#fff" }}>BG</div>
            <div>
              <p style={{ fontWeight: 700, margin: 0, fontSize: 15 }}>Bryant Glandorf</p>
              <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>Unlimited Member · Since Jun 2023</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Units</h3>
          <div style={{ display: "flex", gap: 4, background: T.bgDim, borderRadius: 8, padding: 3 }}>
            {["lbs", "kg"].map(u => (
              <button key={u} onClick={() => setUnit(u)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: unit === u ? "#fff" : "transparent", color: unit === u ? T.text : T.textMuted }}>{u === "lbs" ? "Pounds (lbs)" : "Kilograms (kg)"}</button>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Notifications</h3>
          {[{ label: "WOD Posted", active: notifWOD, toggle: () => setNotifWOD(!notifWOD) }, { label: "PR Celebrations", active: notifPR, toggle: () => setNotifPR(!notifPR) }, { label: "Class Reminders", active: notifClass, toggle: () => setNotifClass(!notifClass) }, { label: "Competition Updates", active: notifComp, toggle: () => setNotifComp(!notifComp) }].map(n => (
            <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}><span style={{ fontSize: 14, color: T.text }}>{n.label}</span><ToggleButton active={n.active} onClick={n.toggle} /></div>
          ))}
        </div>
        <div style={{ padding: "14px 0" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>About</h3>
          <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{GYM_CONFIG.subtitle} App v1.0</p>
          <p style={{ fontSize: 12, color: T.textFaint, margin: "4px 0 0" }}>Powered by GymOS Platform</p>
          <p style={{ fontSize: 12, color: T.textFaint, margin: "2px 0 0" }}>{GYM_CONFIG.address.street}, {GYM_CONFIG.address.city}, {GYM_CONFIG.address.state} {GYM_CONFIG.address.zip}</p>
        </div>
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.accent, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>Sign Out</button>
      </div>
    </div>
  );
}

function NotificationsModal({ onClose }) {
  const notifications = [
    { id: 1, title: "Tomorrow's WOD Posted", message: "Filthy Fifty is on the schedule. Prepare mentally.", type: "wod", time: "2 hours ago", read: false },
    { id: 2, title: "New PR! 🎉", message: "Bryant G. just hit a 315 lb Front Squat!", type: "pr", time: "4 hours ago", read: false },
    { id: 3, title: "Class Reminder", message: "You're registered for 5:30 PM Strength & Conditioning today", type: "class", time: "6 hours ago", read: true },
    { id: 4, title: "Free Saturday Workout", message: "Join us tomorrow at 9 AM for the free community workout!", type: "event", time: "1 day ago", read: true },
    { id: 5, title: "March Foundations Course", message: "Group Foundations starts March 10th — share with friends!", type: "event", time: "2 days ago", read: true },
  ];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 390, maxHeight: "80vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 26, margin: 0 }}>Notifications</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notifications.map(n => (
            <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 14px", background: n.read ? "transparent" : T.accentGhost, border: `1px solid ${n.read ? T.borderLight : T.accentBorder}`, borderRadius: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: n.type === "wod" ? T.accentGhost : n.type === "pr" ? T.successGhost : n.type === "class" ? "#3b82f615" : T.warningGhost, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {n.type === "wod" ? <Dumbbell size={16} color={T.accent} /> : n.type === "pr" ? <Trophy size={16} color={T.success} /> : n.type === "class" ? <Calendar size={16} color="#3b82f6" /> : <CalendarDays size={16} color={T.warning} />}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: n.read ? 500 : 700, color: T.text, margin: 0 }}>{n.title}</p>
                <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{n.message}</p>
                <p style={{ fontSize: 11, color: T.textFaint, margin: "4px 0 0" }}>{n.time}</p>
              </div>
              {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent, marginTop: 4, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [showAdminToggle, setShowAdminToggle] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classRegistrations, setClassRegistrations] = useState({});
  const [prCelebrations, setPrCelebrations] = useState({});

  const registerForClass = useCallback((classId) => {
    setClassRegistrations(prev => ({ ...prev, [classId]: (prev[classId] || 0) + 1 }));
  }, []);

  const celebratePR = useCallback((prId) => {
    setPrCelebrations(prev => ({ ...prev, [prId]: (prev[prId] || 0) + 1 }));
  }, []);

  const handleLogoClick = useCallback(() => {
    const n = logoClicks + 1;
    setLogoClicks(n);
    if (n >= 5 && !showAdminToggle) setShowAdminToggle(true);
    setTimeout(() => setLogoClicks(0), 2000);
  }, [logoClicks, showAdminToggle]);

  const mainTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "wods", label: "WODs", icon: Dumbbell },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "track", label: "Track", icon: TrendingUp },
    { id: "more", label: "More", icon: Menu },
  ];

  const moreItems = [
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "coaches", label: "Coaches", icon: Users },
    { id: "membership", label: "Membership", icon: CreditCard },
    { id: "events", label: "Events", icon: CalendarDays },
  ];

  const adminTabs = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-wods", label: "WODs", icon: Dumbbell },
    { id: "admin-schedule", label: "Schedule", icon: Calendar },
    { id: "admin-members", label: "Members", icon: Users },
    { id: "admin-coaches", label: "Coaches", icon: UserCheck },
    { id: "admin-competitions", label: "Competitions", icon: Trophy },
    { id: "admin-pricing", label: "Pricing", icon: DollarSign },
    { id: "admin-broadcast", label: "Broadcast", icon: Megaphone },
  ];

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "wods": return <WODsPage />;
      case "schedule": return <SchedulePage />;
      case "track": return <TrackPage />;
      case "leaderboards": return <LeaderboardsPage />;
      case "coaches": return <CoachesPage />;
      case "membership": return <MembershipPage />;
      case "events": return <EventsPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-wods": return <AdminWODsPage />;
      case "admin-schedule": return <AdminSchedulePage />;
      case "admin-members": return <AdminMembersPage />;
      case "admin-coaches": return <AdminCoachesPage />;
      case "admin-competitions": return <AdminCompetitionsPage />;
      case "admin-pricing": return <AdminPricingPage />;
      case "admin-broadcast": return <AdminBroadcastPage />;
      default: return <HomePage />;
    }
  };

  const isMoreActive = moreItems.some(item => item.id === page);
  const unreadCount = 2;

  // ——— ADMIN LAYOUT ———
  if (isAdmin) {
    return (
      <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, prCelebrations, celebratePR }}>
        <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", background: T.bgDim }}>
          <aside style={{ width: 240, background: T.bg, color: "#fff", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40 }}>
            <div style={{ padding: "20px 18px", borderBottom: "1px solid #27272a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {GYM_CONFIG.logoImage ? <img src={GYM_CONFIG.logoImage} alt={GYM_CONFIG.name} style={{ height: 30, objectFit: "contain" }} /> : <div style={{ width: 40, height: 40, borderRadius: 10, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: "#fff" }}>{GYM_CONFIG.logoMark}</div>}
                <span style={{ fontSize: 9, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.15em" }}>Admin Portal</span>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "12px 8px", overflow: "auto" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#71717a", padding: "0 10px", margin: "0 0 8px" }}>Management</p>
              {adminTabs.map(tab => {
                const active = page === tab.id;
                return (
                  <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: active ? T.accent : "transparent", color: active ? "#fff" : "#a1a1aa", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
                    <tab.icon size={18} /><span>{tab.label}</span>
                    {active && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />}
                  </button>
                );
              })}
            </nav>
            <div style={{ padding: "10px 8px" }}>
              <button onClick={() => setPage("admin-settings")} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#a1a1aa", fontSize: 13, cursor: "pointer", textAlign: "left", marginBottom: 2 }}><Settings size={18} /><span>Settings</span></button>
            </div>
            <div style={{ borderTop: "1px solid #27272a", padding: "10px 8px" }}>
              <button onClick={() => { setIsAdmin(false); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: T.accent, fontSize: 13, cursor: "pointer", textAlign: "left" }}><LogOut size={18} /><span>Exit Admin</span></button>
            </div>
          </aside>
          <main style={{ flex: 1, marginLeft: 240, padding: 28, overflow: "auto" }}>{renderPage()}</main>
        </div>
      </AppContext.Provider>
    );
  }

  // ——— CONSUMER LAYOUT ———
  return (
    <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, prCelebrations, celebratePR }}>
      <div style={{ position: "fixed", inset: 0, fontFamily: "'DM Sans', system-ui, sans-serif", background: "#fafafa", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>

        {/* ——— LEFT PANEL ——— */}
        <div className="demo-side-panel" style={{ width: 300, flexShrink: 0, paddingRight: 48, display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: T.accent, marginBottom: 16 }}>Prototype Demo</p>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: T.bg, lineHeight: 1, marginBottom: 4 }}>{GYM_CONFIG.name}</h1>
          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#a1a1aa", letterSpacing: "0.05em", marginBottom: 4 }}>STRENGTH COLLECTIVE</p>
          <p style={{ fontSize: 13, color: "#a1a1aa", marginBottom: 32 }}>CrossFit Gym App</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: Dumbbell, label: "Daily WODs", desc: "Rx & scaled with coach notes" },
              { icon: Calendar, label: "Class Schedule", desc: "Reserve spots & check in" },
              { icon: TrendingUp, label: "Progress Tracking", desc: "Log PRs, WODs & body stats" },
              { icon: Trophy, label: "Leaderboards", desc: "Benchmarks & monthly challenges" },
              { icon: Users, label: "Coach Profiles", desc: "Bios, certs & specialties" },
              { icon: CreditCard, label: "Membership", desc: "Plans, pricing & billing" },
              { icon: Award, label: "Competitions", desc: "In-house throwdowns & events" },
              { icon: Bell, label: "Notifications", desc: "WOD alerts & PR celebrations" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <f.icon size={17} style={{ color: T.accent }} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#27272a", lineHeight: 1.2 }}>{f.label}</p>
                  <p style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.3 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#d4d4d8", marginTop: 36 }}>Built by Nimbus Labs</p>
        </div>

        {/* ——— CENTER: Phone Mockup ——— */}
        <div style={{ width: 390, height: "min(92vh, 844px)", flexShrink: 0, position: "relative", display: "flex", flexDirection: "column", borderRadius: 32, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.06)", background: T.bgDim }}>
          {/* Top Header Bar — fixed */}
          <header style={{ flexShrink: 0, zIndex: 30, background: T.bg, color: "#fff", padding: "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
            <button onClick={handleLogoClick} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
              {GYM_CONFIG.logoImage ? <img src={GYM_CONFIG.logoImage} alt={GYM_CONFIG.name} style={{ height: 28, objectFit: "contain" }} onError={e => { e.target.style.display = "none"; e.target.nextElementSibling.style.display = "flex"; }} /> : null}
              <div style={{ width: 38, height: 38, borderRadius: 8, background: T.accent, display: GYM_CONFIG.logoImage ? "none" : "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: "#fff" }}>{GYM_CONFIG.logoMark}</div>
            </button>
            {/* Right Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {showAdminToggle && <button onClick={() => { setIsAdmin(true); setPage("admin-dashboard"); }} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: T.accent }}><Shield size={20} /></button>}
              <button onClick={() => setShowNotifications(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff", position: "relative" }}>
                <Bell size={20} />
                {unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: T.accent, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{unreadCount}</span>}
              </button>
              <button onClick={() => setShowSettings(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff" }}><Settings size={20} /></button>
            </div>
          </header>
          {/* Click-away for More dropdown */}
          {showMore && <div onClick={() => setShowMore(false)} style={{ position: "absolute", inset: 0, zIndex: 29 }} />}
          {/* Scrollable Main Content */}
          <main style={{ flex: 1, overflowY: "auto", overflowX: "hidden", WebkitOverflowScrolling: "touch" }}>
            {renderPage()}
          </main>
          {/* Bottom Navigation — fixed */}
          <nav style={{ flexShrink: 0, zIndex: 30, background: T.bg, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-around", height: 60, padding: "0 8px", position: "relative" }}>
            {mainTabs.map(tab => {
              const active = tab.id === "more" ? (isMoreActive || showMore) : page === tab.id;
              if (tab.id === "more") {
                return (
                  <button key={tab.id} onClick={() => setShowMore(!showMore)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: active ? "#fff" : "rgba(255,255,255,0.45)" }}>
                    <tab.icon size={22} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
                  </button>
                );
              }
              return (
                <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 12px", borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: active ? "#fff" : "rgba(255,255,255,0.45)" }}>
                  <tab.icon size={22} strokeWidth={active ? 2.5 : 2} /><span style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
                </button>
              );
            })}
            {/* More dropdown — positioned above bottom nav */}
            {showMore && (
              <div style={{ position: "absolute", bottom: 64, left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: 12, padding: "10px 8px", boxShadow: "0 8px 32px rgba(0,0,0,.15)", zIndex: 50, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, width: 280 }}>
                {moreItems.map(item => {
                  const active = page === item.id;
                  return (
                    <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? T.accentGhost : T.bgDim, color: active ? T.accent : T.textMuted }}>
                      <item.icon size={20} /><span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </nav>
          {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
          {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
        </div>

        {/* ——— RIGHT PANEL ——— */}
        <div className="demo-side-panel" style={{ width: 300, flexShrink: 0, paddingLeft: 48, display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center", gap: 20 }}>
          {/* Admin Dashboard CTA card */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Shield size={20} style={{ color: T.accent }} />
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: T.bg, marginBottom: 8 }}>Admin Dashboard</h3>
            <p style={{ fontSize: 13, color: "#71717a", lineHeight: 1.5, marginBottom: 16 }}>Click the <span style={{ color: T.accent, fontWeight: 600 }}>shield icon</span> in the header to toggle to the admin side of the app.</p>
            <button onClick={() => { setIsAdmin(true); setPage("admin-dashboard"); }} style={{ width: "100%", padding: "10px 0", borderRadius: 10, border: "none", background: T.accent, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Shield size={16} /> Open Admin View
            </button>
          </div>

          {/* Admin Features list */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: T.bg, marginBottom: 16 }}>Admin Features</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: LayoutDashboard, label: "Dashboard", desc: "Revenue, attendance & growth" },
                { icon: Dumbbell, label: "WOD Builder", desc: "Create & publish workouts" },
                { icon: Users, label: "Member CRM", desc: "Profiles, billing & check-ins" },
                { icon: Megaphone, label: "Broadcast", desc: "Push, email & SMS campaigns" },
                { icon: Settings, label: "Gym Settings", desc: "White-label configuration" },
              ].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: T.bgDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <f.icon size={16} style={{ color: "#71717a" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#27272a", lineHeight: 1.2 }}>{f.label}</p>
                    <p style={{ fontSize: 12, color: "#a1a1aa", lineHeight: 1.3 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AppContext.Provider>
  );
}
