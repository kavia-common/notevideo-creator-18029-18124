# NoteVideo Frontend (Remotion)

A modern, minimalistic frontend for creating notes and generating videos with Remotion. This container provides:
- Notes creation and editing
- Video generation (simulated on frontend)
- Preview video before download
- Download (simulated export as JSON)

## Quick start

Install dependencies:
```bash
npm i
```

Start Remotion Studio and the UI:
```bash
npm run dev
```

Open the browser preview (or the provided preview URL) to use the app:
- Left: Notes editor
- Right: Remotion Player preview
- Footer: Generate (simulated) and Download buttons

## Rendering with CLI

A composition named `NotesVideo` is registered. You can render via CLI:

```bash
npx remotion render src/index.ts NotesVideo out/notes-video.mp4 --props='{"notes":[{"title":"Hello","content":"World"}],"theme":{"primary":"#1565c0","secondary":"#43a047","accent":"#e53935","background":"#ffffff","foreground":"#0f172a"}}'
```

Note: This demo focuses on frontend features. Replace the simulated generate/download with actual backend rendering/export as needed.

## Tech

- Remotion 4
- React 19
- TypeScript
- Light theme, modern minimalistic styling using the provided palette:
  - primary: #1565c0
  - secondary: #43a047
  - accent: #e53935
