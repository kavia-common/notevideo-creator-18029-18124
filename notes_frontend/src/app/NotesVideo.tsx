import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

/**
 * PUBLIC_INTERFACE
 * NoteItem
 * Represents a single note slide containing a title and content.
 */
export type NoteItem = {
  title: string;
  content: string;
};

/**
 * PUBLIC_INTERFACE
 * Theme
 * Colors for theming the video and UI.
 */
export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
};

export const notesVideoSchema = z.object({
  notes: z.array(
    z.object({
      title: z.string(),
      content: z.string(),
    })
  ),
  theme: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
    background: z.string(),
    foreground: z.string(),
  }),
});

const Slide: React.FC<{
  note: NoteItem;
  theme: Theme;
}> = ({ note, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animate in/out for each slide: 10 frames fade in, 10 frames fade out on 150 frames per slide.
  const enter = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const float = interpolate(frame, [0, fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "extend",
  });
  const exit = interpolate(frame, [fps * 4.7, fps * 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });

  const opacity = enter * exit;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        padding: 120,
        boxSizing: "border-box",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 60,
          borderRadius: 24,
          border: `1px solid rgba(15, 23, 42, 0.08)`,
          boxShadow:
            "0 10px 30px rgba(15, 23, 42, 0.06), inset 0 0 0 1px rgba(255,255,255,0.4)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.85))",
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 160,
          right: 160,
          top: 180,
          opacity,
          transform: `translateY(${float}px)`,
          transition: "transform 300ms ease-out",
        }}
      >
        <h1
          style={{
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: -0.5,
            margin: 0,
            color: theme.primary,
          }}
        >
          {note.title}
        </h1>
        <div
          style={{
            width: 80,
            height: 5,
            background: theme.secondary,
            borderRadius: 8,
            marginTop: 28,
            marginBottom: 28,
          }}
        />
        <p
          style={{
            fontSize: 42,
            lineHeight: 1.35,
            margin: 0,
            maxWidth: 1400,
            color: "rgba(15, 23, 42, 0.9)",
            whiteSpace: "pre-wrap",
          }}
        >
          {note.content}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          left: 60,
          top: 60,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          borderRadius: 999,
          background: "rgba(21, 101, 192, 0.08)",
          color: theme.primary,
          fontWeight: 600,
          fontSize: 28,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: theme.accent,
            boxShadow: `0 0 0 4px rgba(229,57,53,0.15)`,
          }}
        />
        NoteVideo
      </div>
    </AbsoluteFill>
  );
};

/**
 * PUBLIC_INTERFACE
 * NotesVideo
 * Animated composition that renders one slide per note.
 * Props:
 * - notes: Array of NoteItem objects.
 * - theme: Theme colors for styling.
 * Returns an animated sequence of slides with gentle transitions.
 */
export const NotesVideo: React.FC<z.infer<typeof notesVideoSchema>> = ({
  notes,
  theme,
}) => {
  const perSlide = 30 * 5; // 5 seconds at 30 fps
  return (
    <AbsoluteFill>
      {notes.map((note, i) => (
        <Sequence key={i} from={i * perSlide} durationInFrames={perSlide}>
          <Slide note={note} theme={theme} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
