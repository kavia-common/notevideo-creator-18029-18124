/* global setTimeout, Blob, URL, document */
import React, { useMemo, useState } from "react";
import { Player } from "@remotion/player";
import { NotesVideo, NoteItem, Theme } from "./NotesVideo";
import { defaultNotes, defaultTheme, palette } from "./theme";
import { DownloadIcon, PlayIcon, StopIcon, PlusIcon, TrashIcon } from "./icons";
import "./styles.css";

/**
 * PUBLIC_INTERFACE
 * App
 * Main application shell for the notes-to-video UI. It provides:
 * - Header with branding
 * - Left column: Notes editor (create/edit/delete)
 * - Right column: Video preview using Remotion Player
 * - Footer: Action buttons including simulated "Generate" and "Download"
 */
export const App: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(defaultNotes());
  const [theme] = useState<Theme>(defaultTheme());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const totalDurationInFrames = useMemo(() => {
    // 5 seconds per note at 30 fps
    const perSlide = 30 * 5;
    return Math.max(perSlide * notes.length, 30 * 5);
  }, [notes.length]);

  const handleAddNote = () => {
    setNotes((prev) => [
      ...prev,
      { title: `New Note ${prev.length + 1}`, content: "Write something here..." },
    ]);
  };

  const handleDeleteNote = (idx: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateNote = (idx: number, patch: Partial<NoteItem>) => {
    setNotes((prev) =>
      prev.map((n, i) => (i === idx ? { ...n, ...patch } : n))
    );
  };

  const simulateGenerate = async () => {
    // Frontend-only: just simulate a generation delay and success UI state.
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsGenerating(false);
  };

  const simulateDownload = async () => {
    // Frontend-only: create a JSON blob to simulate a downloadable asset.
    const payload = {
      kind: "notes-video-export",
      generatedAt: new Date().toISOString(),
      theme,
      notes,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes-video.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onPlayPause = () => setIsPlaying((p) => !p);

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" />
          <div className="brand-text">
            <span className="brand-title">NoteVideo</span>
            <span className="brand-sub">Create videos from your notes</span>
          </div>
        </div>
        <div className="header-actions">
          <span className="badge" style={{ background: palette.secondary }}>
            Beta
          </span>
        </div>
      </header>

      <main className="app-main">
        <section className="editor-panel">
          <div className="panel-header">
            <h2>Notes</h2>
            <button
              className="btn btn-accent"
              onClick={handleAddNote}
              aria-label="Add note"
              title="Add note"
            >
              <PlusIcon />
              <span>Add</span>
            </button>
          </div>

          <div className="notes-list" role="list">
            {notes.map((n, idx) => (
              <article key={idx} className="note-item" role="listitem">
                <div className="note-row">
                  <input
                    className="note-title"
                    value={n.title}
                    onChange={(e) => updateNote(idx, { title: e.target.value })}
                    placeholder="Title"
                    aria-label={`Title for note ${idx + 1}`}
                  />
                  <button
                    className="icon-btn danger"
                    onClick={() => handleDeleteNote(idx)}
                    aria-label={`Delete note ${idx + 1}`}
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <textarea
                  className="note-content"
                  value={n.content}
                  onChange={(e) => updateNote(idx, { content: e.target.value })}
                  placeholder="Write your content here..."
                  rows={4}
                  aria-label={`Content for note ${idx + 1}`}
                />
              </article>
            ))}
            {notes.length === 0 && (
              <div className="empty-state">
                <p>No notes yet.</p>
                <button className="btn btn-primary" onClick={handleAddNote}>
                  <PlusIcon />
                  <span>Create your first note</span>
                </button>
              </div>
            )}
          </div>

          <div className="panel-footer">
            <div className="theme-preview" aria-label="Theme preview">
              <span className="dot" style={{ background: theme.primary }} />
              <span className="dot" style={{ background: theme.secondary }} />
              <span className="dot" style={{ background: theme.accent }} />
            </div>
          </div>
        </section>

        <section className="preview-panel">
          <div className="panel-header">
            <h2>Preview</h2>
            <div className="preview-actions">
              <button
                className="icon-btn"
                onClick={onPlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <StopIcon /> : <PlayIcon />}
              </button>
            </div>
          </div>

          <div className="player-wrap">
            <Player
              component={NotesVideo}
              inputProps={{ notes, theme }}
              durationInFrames={totalDurationInFrames}
              compositionWidth={1280}
              compositionHeight={720}
              fps={30}
              controls
              loop
              autoPlay={false}
              style={{ borderRadius: 12, border: "1px solid #e5e7eb" }}
              clickToPlay
            />
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-left">
          <button
            className="btn btn-primary"
            onClick={simulateGenerate}
            disabled={isGenerating || notes.length === 0}
          >
            {isGenerating ? "Generating..." : "Generate Preview"}
          </button>
          <button
            className="btn"
            onClick={simulateDownload}
            disabled={notes.length === 0}
          >
            <DownloadIcon />
            <span>Download</span>
          </button>
        </div>
        <div className="footer-right">
          <small>
            Frontend demo only. Rendering pipeline not connected to backend.
          </small>
        </div>
      </footer>
    </div>
  );
}
