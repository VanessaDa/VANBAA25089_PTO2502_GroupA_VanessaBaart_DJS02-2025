/**
 * App entry point for Podcast UI (DJS02).
 * Handles data preparation, rendering, and modal interactions.
 */
import "./components/PodcastPreview.js";
import { podcasts, genres, seasons } from "./data.js";
import { friendlyUpdated } from "./utils/helpers.js";
import { openModal } from "./views/modal.js";

// --- Data prep -------------------------------------------------------------
const previews = podcasts.filter((p) => !!p.title);
const genreById = new Map(genres.map((g) => [g.id, g.title]));
const seasonsById = new Map(
  (seasons || [])
    .filter((s) => Array.isArray(s.seasonDetails))
    .map((s) => [s.id, s.seasonDetails])
);
