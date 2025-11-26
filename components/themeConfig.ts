export type ThemeId = "dark-fantasy" | "royal-medieval" | "kawaii";

export const ALL_THEMES: ThemeId[] = ["dark-fantasy", "royal-medieval", "kawaii"];

export const THEME_OPTIONS: { value: ThemeId; label: string; description: string; emoji: string }[] = [
  {
    value: "dark-fantasy",
    label: "Dark Fantasy",
    description: "Estilo sombrio de fantasia medieval com tons escuros",
    emoji: "🏰"
  },
  {
    value: "royal-medieval",
    label: "Royal Medieval",
    description: "Estilo real medieval com detalhes ornamentados",
    emoji: "👑"
  },
  {
    value: "kawaii",
    label: "Kawaii",
    description: "Estilo fofo com tons pastéis suaves e delicados",
    emoji: "✨"
  }
];

export const navHeaderStyles = {
  header: {
    "dark-fantasy": "border-amber-950 bg-amber-900 text-amber-100",
    "royal-medieval": "border-amber-800 bg-amber-800 text-amber-100",
    kawaii: "border-pastel-pinkDark bg-gradient-to-r from-pastel-pink via-pastel-lilac to-pastel-blue text-pastel-pinkDark shadow-soft"
  },
  menuButton: {
    "dark-fantasy": "border-amber-950 bg-amber-800 hover:bg-amber-700 text-amber-100",
    "royal-medieval": "border-amber-800 bg-amber-700 hover:bg-amber-600 text-amber-100",
    kawaii: "border-pastel-pinkDark bg-pastel-cream hover:bg-pastel-mint text-pastel-pinkDark"
  },
  logoWrapper: {
    "dark-fantasy": "border-amber-950 bg-amber-800",
    "royal-medieval": "border-amber-800 bg-amber-700",
    kawaii: "border-pastel-pinkDark bg-pastel-cream"
  },
  brandSmall: {
    "dark-fantasy": "text-amber-200",
    "royal-medieval": "text-amber-200",
    kawaii: "text-pastel-pinkDark"
  },
  brandLarge: {
    "dark-fantasy": "text-amber-50",
    "royal-medieval": "text-amber-50",
    kawaii: "text-pastel-pinkDark"
  },
  bellButton: {
    "dark-fantasy": "border-amber-950 bg-stone-900 text-amber-100 hover:bg-stone-800",
    "royal-medieval": "border-amber-800 bg-stone-800 text-amber-100 hover:bg-stone-700",
    kawaii: "border-pastel-pinkDark bg-pastel-cream text-pastel-pinkDark hover:bg-pastel-mint"
  },
  userContainer: {
    "dark-fantasy": "border-amber-950 bg-stone-900",
    "royal-medieval": "border-amber-800 bg-stone-800",
    kawaii: "border-pastel-pinkDark bg-pastel-cream"
  },
  userAvatar: {
    "dark-fantasy": "border-amber-900 bg-amber-800",
    "royal-medieval": "border-amber-800 bg-amber-700",
    kawaii: "border-pastel-pinkDark bg-pastel-mint"
  },
  userInitials: {
    "dark-fantasy": "text-amber-50",
    "royal-medieval": "text-amber-50",
    kawaii: "text-pastel-pinkDark"
  },
  userName: {
    "dark-fantasy": "text-amber-50",
    "royal-medieval": "text-amber-50",
    kawaii: "text-pastel-pinkDark"
  },
  userAdmin: {
    "dark-fantasy": "text-amber-300",
    "royal-medieval": "text-amber-300",
    kawaii: "text-pastel-pinkDark/80"
  },
  loginButton: {
    "dark-fantasy": "border-amber-950 bg-amber-700 text-amber-50 hover:bg-amber-600",
    "royal-medieval": "border-amber-800 bg-amber-600 text-amber-50 hover:bg-amber-500",
    kawaii: "border-pastel-pinkDark bg-pastel-cream text-pastel-pinkDark hover:bg-pastel-mint"
  }
} as const;

export const wikiPageStyles = {
  section: {
    "dark-fantasy": "bg-gradient-to-br from-stone-950 via-stone-900 to-black",
    "royal-medieval": "bg-gradient-to-br from-amber-950 via-orange-950 to-red-950",
    kawaii: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
  }
} as const;

export const sideMenuStyles = {
  sidebar: {
    "dark-fantasy": "bg-gradient-to-br from-stone-900 via-stone-950 to-black border-r-4 border-stone-950 shadow-amber-900/50",
    "royal-medieval": "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 border-r-4 border-amber-800 shadow-amber-900/50",
    kawaii: "bg-gradient-to-br from-pastel-cream via-pastel-mint to-pastel-blue border-r-4 border-pastel-pinkDark shadow-soft"
  },
  groupButton: {
    "dark-fantasy": "border-amber-700 bg-gradient-to-r from-stone-800 to-stone-900 text-amber-100 shadow-amber-900/30 hover:shadow-amber-900/50",
    "royal-medieval": "border-amber-700 bg-gradient-to-r from-amber-800 to-orange-800 text-amber-100 shadow-amber-900/30 hover:shadow-amber-900/50",
    kawaii: "border-pastel-pinkDark bg-gradient-to-r from-pastel-pink via-pastel-lilac to-pastel-blue text-pastel-pinkDark shadow-soft hover:shadow-lg"
  },
  groupDot: {
    "dark-fantasy": "bg-gradient-to-br from-amber-500 to-amber-700",
    "royal-medieval": "bg-gradient-to-br from-amber-500 to-orange-600",
    kawaii: "bg-gradient-to-br from-pastel-pink to-pastel-lilac"
  }
} as const;
