import { Composition } from "remotion";
import { NotesVideo, notesVideoSchema } from "./app/NotesVideo";

/**
 * PUBLIC_INTERFACE
 * RemotionRoot
 * This is the Remotion entrypoint where compositions are registered.
 * - NotesVideo: Main composition rendering animated slides for the provided notes.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NotesVideo"
        component={NotesVideo}
        durationInFrames={30 * 10}
        fps={30}
        width={1920}
        height={1080}
        schema={notesVideoSchema}
        defaultProps={{
          notes: [
            { title: "Welcome", content: "Create notes and turn them into videos." },
            { title: "Edit", content: "Use the editor to add, remove, and reorder notes." },
            { title: "Generate", content: "Preview and download your Remotion video." },
          ],
          theme: {
            primary: "#1565c0",
            secondary: "#43a047",
            accent: "#e53935",
            background: "#ffffff",
            foreground: "#0f172a",
          },
        }}
      />
    </>
  );
};
