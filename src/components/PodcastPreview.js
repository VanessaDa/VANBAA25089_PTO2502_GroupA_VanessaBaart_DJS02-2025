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
    <div class="wrap" part="container" role="button" tabindex="0" aria-label="Podcast preview">
      <img class="cover" part="cover" />
      <div class="title" part="title"></div>
      <div class="meta" part="meta">
        <svg class="calendar" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10zM4 8h16V6H4v2z"/>
        </svg>
        <span class="seasons" part="seasons"></span>
      </div>
      <div class="tags" part="tags"></div>
      <div class="updated" part="updated"></div>
    </div>
  ;
   class PodcastPreview extends HTMLElement {
    static get observedAttributes() {
      return ["podcast-id", "title", "image", "seasons", "genres", "updated"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(
        template.content.cloneNode(true)
      );
      this._els = {
        root: this.shadowRoot.querySelector(".wrap"),
        cover: this.shadowRoot.querySelector(".cover"),
        title: this.shadowRoot.querySelector(".title"),
        seasons: this.shadowRoot.querySelector(".seasons"),
        tags: this.shadowRoot.querySelector(".tags"),
        updated: this.shadowRoot.querySelector(".updated"),
      };
      const fire = () => this._emitSelect();
      this._els.root.addEventListener("click", fire);
      this._els.root.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          fire();
        }
      });
    }
      
