/** <podcast-preview>
 * Stateless Web Component for a podcast card.
 * @fires {CustomEvent<'podcast-select'>} when the card is activated.
 * @property {{podcastId:string,title:string,image?:string,seasons?:number,genres?:string[],updated?:string|Date}} podcast
 */
(function () {
  "use strict";

  const template = document.createElement("template");
  template.innerHTML = `
    <style>
      :host {
        display: block;
        border-radius: 14px;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
        border: 1px solid #eee;
        transition: transform .08s ease, box-shadow .2s ease;
        cursor: pointer;
        outline: none;
      }
          :host(:focus-visible) { box-shadow: 0 0 0 3px #c7d2fe; }
      :host(:hover) {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      }
      .wrap { padding: 14px; }
      .cover {
        width: 100%;
        aspect-ratio: 16 / 12;
        border-radius: 10px;
        background: #a3aab6;
        object-fit: cover;
        display: block;
      }
      .title {
        margin: 12px 0 6px;
        font: 600 1rem/1.25 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial;
        color: #0f172a;
      }
      .meta { display:flex; align-items:center; gap:6px; color:#475569; font-size:.875rem; }
      .calendar { width:1em; height:1em; display:inline-block; }
      .tags { margin-top:8px; display:flex; flex-wrap:wrap; gap:6px; }
      .tag { font-size:.75rem; padding:4px 8px; border-radius:999px; background:#f1f5f9; color:#0f172a; border:1px solid #e2e8f0; }
      .updated { margin-top:8px; color:#64748b; font-size:.8125rem; }
    </style>
