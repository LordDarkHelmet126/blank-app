import { loadContent } from "./content.js";
import { boot } from "./ui.js";

const bootEl = document.getElementById("boot");

try {
  const content = await loadContent();
  boot(content);
} catch (err) {
  console.error(err);
  bootEl.textContent =
    "Could not load game data. Serve the folder over HTTP (see README) rather than opening the file directly.";
}
