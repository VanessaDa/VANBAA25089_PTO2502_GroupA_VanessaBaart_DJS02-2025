/**
 * Modal view logic for displaying podcast details.
 */
import { friendlyUpdated } from "../utils/helpers.js";

/**
 * Open the podcast details modal.
 * @param {HTMLDialogElement} dialog
 * @param {HTMLElement} body - container inside the dialog
 * @param {{previews:Array, seasonsById:Map<string,Array>, friendlyUpdated:(v:string)=>string}} context
 * @param {{podcastId:string,title:string,image?:string,seasons?:number,genres?:string[],updated?:string}} podcast
 */
export function openModal(dialog, body, context, podcast) {
  const { previews, seasonsById } = context;
  const full = previews.find((p) => p.id === podcast.podcastId) || {};
  const seasonList = seasonsById.get(podcast.podcastId) || [];

  body.innerHTML = `
    <div class="row">
      <img alt="${podcast.title} cover" src="${podcast.image}" />
      <div>
        <h2>${podcast.title}</h2>
        <div class="muted">
          ${podcast.seasons} ${
    Number(podcast.seasons) === 1 ? "season" : "seasons"
  } ·
          ${friendlyUpdated(podcast.updated)}
        </div>
        <div class="chips">
          ${(podcast.genres || [])
            .map((g) => `<span class="chip">${g}</span>`)
            .join("")}
        </div>
        <p class="description">${full.description ?? ""}</p>
      </div>
    </div>

    <div class="seasons">
      <h3 style="margin:0 0 8px">Seasons</h3>
      ${
        seasonList.length
          ? seasonList
              .map(
                (s) => `
            <div class="season">
              <div>${s.title}</div>
              <div class="muted">${s.episodes} ${
                  s.episodes === 1 ? "episode" : "episodes"
                }</div>
            </div>
          `
              )
              .join("")
          : '<div class="muted">No season breakdown available.</div>'
      }
    </div>
  `;
  dialog.showModal();
}
