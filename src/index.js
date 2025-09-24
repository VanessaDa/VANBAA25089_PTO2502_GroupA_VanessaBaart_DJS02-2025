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
/**
 * Maps an array of genre IDs to their names.
 * @param {Array<string>} ids
 * @returns {Array<string>}
 */
const genreNames = (ids = []) =>
  ids.map((id) => genreById.get(id)).filter(Boolean);

// --- UI refs ---------------------------------------------------------------
const grid = document.getElementById("grid");
const dialog = document.getElementById("podcastModal");
const body = document.getElementById("modalBody");
const closeBtn = dialog.querySelector(".close");
