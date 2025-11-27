// src/components/themeConfig.ts

export type ThemeId = "dark-fantasy" | "royal-medieval" | "kawaii";

export const ALL_THEMES: ThemeId[] = ["dark-fantasy", "royal-medieval", "kawaii"];

export const THEME_OPTIONS: { value: ThemeId; label: string; description: string }[] = [
  {
    value: "dark-fantasy",
    label: "Dark Fantasy",
    description: "Estilo sombrio de fantasia medieval com tons escuros"
  },
  {
    value: "royal-medieval",
    label: "Royal Medieval",
    description: "Estilo real medieval com detalhes ornamentados"
  },
  {
    value: "kawaii",
    label: "Kawaii",
    description: "Estilo fofo com tons pastéis suaves e delicados"
  }
];

export const navHeaderStyles = {
  header: {
    "dark-fantasy": "border-amber-900/40 bg-gradient-to-r from-stone-900 to-stone-950 text-amber-300 shadow-lg",
    "royal-medieval": "border-amber-700 bg-gradient-to-r from-amber-800 to-orange-900 text-amber-100 shadow-xl",
    kawaii: "border-pink-300 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-pink-700 shadow-soft rounded-xl"
  },
  menuButton: {
    "dark-fantasy": "border-amber-900/40 bg-amber-900 text-amber-100 hover:bg-amber-800 transition-all",
    "royal-medieval": "border-amber-700 bg-amber-700 text-amber-100 hover:bg-amber-600 transition-all",
    kawaii: "border-pink-300 bg-pink-200 text-pink-800 hover:bg-pink-100 transition-all"
  },
  logoWrapper: {
    "dark-fantasy": "border-amber-900/40 bg-amber-900",
    "royal-medieval": "border-amber-700 bg-amber-700",
    kawaii: "border-pink-300 bg-pink-200"
  },
  brandSmall: {
    "dark-fantasy": "text-amber-200",
    "royal-medieval": "text-amber-200",
    kawaii: "text-pink-700"
  },
  brandLarge: {
    "dark-fantasy": "text-amber-50",
    "royal-medieval": "text-amber-50",
    kawaii: "text-pink-800"
  },
  bellButton: {
    "dark-fantasy": "border-amber-900/40 bg-stone-900 text-amber-100 hover:bg-stone-800",
    "royal-medieval": "border-amber-700 bg-stone-800 text-amber-100 hover:bg-stone-700",
    kawaii: "border-pink-300 bg-pink-100 text-pink-800 hover:bg-pink-50"
  },
  userContainer: {
    "dark-fantasy": "border-amber-900/40 bg-stone-900",
    "royal-medieval": "border-amber-700 bg-stone-800",
    kawaii: "border-pink-300 bg-pink-100"
  },
  userAvatar: {
    "dark-fantasy": "border-amber-900 bg-amber-800",
    "royal-medieval": "border-amber-800 bg-amber-700",
    kawaii: "border-pink-400 bg-pink-300"
  },
  userInitials: {
    "dark-fantasy": "text-amber-50",
    "royal-medieval": "text-amber-50",
    kawaii: "text-pink-800"
  },
  userName: {
    "dark-fantasy": "text-amber-50",
    "royal-medieval": "text-amber-50",
    kawaii: "text-pink-800"
  },
  userAdmin: {
    "dark-fantasy": "text-amber-300",
    "royal-medieval": "text-amber-300",
    kawaii: "text-pink-600"
  },
  loginButton: {
    "dark-fantasy": "border-amber-900/40 bg-amber-700 text-amber-50 hover:bg-amber-600",
    "royal-medieval": "border-amber-700 bg-amber-600 text-amber-50 hover:bg-amber-500",
    kawaii: "border-pink-300 bg-pink-200 text-pink-800 hover:bg-pink-100"
  }
} as const;

export const wikiPageStyles = {
  section: {
    "dark-fantasy": "bg-gradient-to-br from-stone-950 via-stone-900 to-black",
    "royal-medieval": "bg-gradient-to-br from-red-900 via-amber-900 to-orange-900",
    kawaii: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
  }
} as const;

export const sideMenuStyles = {
  sidebar: {
    "dark-fantasy": "bg-gradient-to-br from-stone-900 via-stone-950 to-black border-r-4 border-stone-900",
    "royal-medieval": "bg-gradient-to-br from-amber-800 via-orange-800 to-red-800 border-r-4 border-amber-700",
    kawaii: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 border-r-4 border-pink-300"
  },
  groupButton: {
    "dark-fantasy": "border-amber-900/30 bg-gradient-to-r from-stone-800 to-stone-900 text-amber-200 hover:bg-stone-700",
    "royal-medieval": "border-amber-700 bg-gradient-to-r from-amber-700 to-orange-800 text-amber-100 hover:bg-amber-600",
    kawaii: "border-pink-300 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-pink-700 hover:bg-pink-50"
  },
  groupDot: {
    "dark-fantasy": "bg-gradient-to-br from-amber-600 to-amber-800",
    "royal-medieval": "bg-gradient-to-br from-amber-500 to-orange-600",
    kawaii: "bg-gradient-to-br from-pink-400 to-purple-400"
  }
} as const;