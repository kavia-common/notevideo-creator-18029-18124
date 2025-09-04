import { Theme, NoteItem } from "./NotesVideo";

export const palette = {
  primary: "#1565c0",
  secondary: "#43a047",
  accent: "#e53935",
  background: "#ffffff",
  foreground: "#0f172a",
};

export const defaultTheme = (): Theme => ({
  primary: palette.primary,
  secondary: palette.secondary,
  accent: palette.accent,
  background: palette.background,
  foreground: palette.foreground,
});

export const defaultNotes = (): NoteItem[] => [
  { title: "Welcome", content: "Turn your notes into engaging videos." },
  { title: "Edit Notes", content: "Add, edit, and remove notes in the left panel." },
  { title: "Preview", content: "See a live preview of your video on the right." },
  { title: "Download", content: "Export when ready. Backend integration coming soon." },
];
