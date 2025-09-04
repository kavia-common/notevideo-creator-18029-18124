/* global document */
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

/**
 * PUBLIC_INTERFACE
 * Entrypoint
 * - Registers Remotion compositions
 * - Renders the interactive app shell for the Studio preview
 */
registerRoot(RemotionRoot);

// Render the app UI for interactive editing/preview inside Studio page.
// When used via CLI rendering, only compositions are relevant.
if (typeof document !== "undefined") {
  const mount = document.getElementById("root");
  if (mount) {
    const root = createRoot(mount);
    root.render(React.createElement(App));
  }
}
