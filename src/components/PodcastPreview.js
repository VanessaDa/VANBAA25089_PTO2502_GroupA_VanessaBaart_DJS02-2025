/**
 * <podcast-preview>
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
      :host(:focus-visible) {
        box-shadow: 0 0 0 3px #c7d2fe;
      }
      :host(:hover) {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      }
      .wrap {
        padding: 14px;
      }
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
      .meta {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #475569;
        font-size: .875rem;
      }
      .calendar {
        width: 1em;
        height: 1em;
        display: inline-block;
      }
      .tags {
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .tag {
        font-size: .75rem;
        padding: 4px 8px;
        border-radius: 999px;
        background: #f1f5f9;
        color: #0f172a;
        border: 1px solid #e2e8f0;
      }
      .updated {
        margin-top: 8px;
        color: #64748b;
        font-size: .8125rem;
      }
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
  `;

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

    // Property API (maps to attributes to keep component stateless)
    set podcast(val) {
      if (!val || typeof val !== "object") return;
      const map = {
        "podcast-id": val.podcastId ?? val.id,
        title: val.title,
        image: val.image,
        seasons: val.seasons,
        genres: Array.isArray(val.genres)
          ? JSON.stringify(val.genres)
          : val.genres,
        updated:
          val.updated instanceof Date ? val.updated.toISOString() : val.updated,
      };
      Object.entries(map).forEach(([k, v]) => {
        if (v !== undefined && v !== null) this.setAttribute(k, String(v));
      });
    }
    get podcast() {
      return this._snapshotFromAttrs();
    }

    attributeChangedCallback() {
      this._render();
    }
    connectedCallback() {
      this._render();
    }

    _snapshotFromAttrs() {
      const genresAttr = this.getAttribute("genres");
      let genres = [];
      if (genresAttr) {
        try {
          const parsed = JSON.parse(genresAttr);
          if (Array.isArray(parsed)) genres = parsed;
        } catch (_) {
          genres = String(genresAttr)
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      return {
        podcastId: this.getAttribute("podcast-id") || "",
        title: this.getAttribute("title") || "",
        image: this.getAttribute("image") || "",
        seasons: this.getAttribute("seasons") || 0,
        genres,
        updated: this.getAttribute("updated") || "",
      };
    }

    /**
     * Updates the component UI based on current attributes.
     * @private
     */
    _render() {
      const data = this._snapshotFromAttrs();
      const { cover, title, seasons, tags, updated } = this._els;
      // Cover + alt
      cover.alt = data.title ? `${data.title} cover` : "Podcast cover";
      cover.src = data.image || this._placeholder();
      // Fallback if image fails
      cover.addEventListener("error", () => {
        cover.src = this._placeholder();
      });
      // Title + seasons
      title.textContent = data.title || "Untitled Podcast";
      const count = Number(data.seasons) || 0;
      seasons.textContent = `${count} ${count === 1 ? "season" : "seasons"}`;
      // Genres
      tags.innerHTML = "";
      const genreList = Array.isArray(data.genres) ? data.genres : [];
      genreList.slice(0, 6).forEach((g) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = g;
        tags.appendChild(span);
      });
      // Human-readable updated
      updated.textContent = this._formatUpdated(data.updated);
    }

    /**
     * Formats the updated date into a human-readable string.
     * @param {string|Date} val - The date value to format.
     * @returns {string} Human-readable date string.
     * @private
     */
    _formatUpdated(val) {
      if (!val) return "";
      const d = new Date(val);
      if (Number.isNaN(d.getTime())) return "";
      const now = new Date();
      const msPerDay = 1000 * 60 * 60 * 24;
      const diffDays = Math.floor((now - d) / msPerDay);
      if (diffDays <= 0) return "Updated today";
      if (diffDays === 1) return "Updated 1 day ago";
      if (diffDays < 7) return `Updated ${diffDays} days ago`;
      const opts = { year: "numeric", month: "short", day: "numeric" };
      return `Updated ${d.toLocaleDateString(undefined, opts)}`;
    }

    /**
     * Emits a 'podcast-select' event with the current podcast data.
     * @private
     */
    _emitSelect() {
      const podcast = this._snapshotFromAttrs();
      this.dispatchEvent(
        new CustomEvent("podcast-select", {
          bubbles: true,
          composed: true,
          detail: { podcast },
        })
      );
    }

    /**
     * Returns a placeholder image data URL for the cover.
     * @returns {string} Data URL of the SVG placeholder.
     * @private
     */
    _placeholder() {
      const svg = encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
          <rect width='400' height='300' rx='16' fill='#cbd5e1'/>
          <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='system-ui,Segoe UI,Roboto' font-size='20' fill='#334155'>
            Podcast Cover
          </text>
        </svg>`
      );
      return `data:image/svg+xml;charset=utf8,${svg}`;
    }
  }

  if (!customElements.get("podcast-preview")) {
    customElements.define("podcast-preview", PodcastPreview);
  }
})();
