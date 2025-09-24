# PodcastApp | Web Component Preview

## 📌 Project Overview

This project implements a reusable **Web Component** (`<podcast-preview>`) that displays podcast previews in a responsive grid.  
It uses **vanilla JavaScript**, **custom elements**, and the **Shadow DOM** to encapsulate logic and styling.  
Clicking a preview card opens a **modal** with extended podcast details.

The project demonstrates **Web Component standards**, **object-oriented programming**, **functional utilities**, and accessibility best practices.

---

## 🚀 Features

- 🧩 **Reusable Web Component** `<podcast-preview>`
- 🎨 Encapsulated **Shadow DOM styles** (no global conflicts)
- 🖼️ Displays **cover image, title, genres, seasons, last updated date**
- 📅 Dates shown in a **human-readable format** (`Updated today`, `Updated 2 days ago`)
- 📢 Emits **`podcast-select` custom event** on click
- 📖 Modal view with:
  - Larger cover image
  - Description
  - Genres
  - Seasons with episode counts
- ♿ Accessibility features:
  - `aria-modal`, `aria-labelledby`
  - Focus trap & return on close
  - Keyboard controls (Esc to close, Tab cycling)
- 📱 Fully **responsive**: works on desktop, tablet, and mobile

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (Grid + Flexbox for responsive layout)
- JavaScript (ES6+), including:
  - Custom Elements API
  - Shadow DOM
  - JSDoc for self-documenting code

---

## 🧩 How It Works (Usage Instructions)

1. Open `index.html` in your browser.
2. The landing page shows a grid of **podcast previews**.
3. Each preview card includes:
   - Cover image
   - Title
   - Genres
   - Number of seasons
   - Last updated date
4. Click a card to open the **modal**.
5. Close the modal by:
   - Clicking the close (×) button
   - Clicking outside (backdrop)
   - Pressing **Esc**

---

## ⚙️ Setup Instructions

1. Clone or download the repository.
2. Ensure the following structure is intact:

   ```
   ├── index.html
   ├── styles.css
   └── src/
       ├── index.js
       ├── data.js
       ├── components/PodcastPreview.js
       ├── utils/helpers.js
       └── views/modal.js
   ```

3. Open `index.html` in a browser.
4. Interact with the previews and modal.

---

## 🧪 Example Usage

### ➕ Define in HTML

```html
<podcast-preview
  title="The AI Show"
  image="cover.jpg"
  seasons="3"
  genres="Technology,AI,Interviews"
  updated="2025-08-15"
>
</podcast-preview>
```

### ➕ Create via JavaScript

```js
const el = document.createElement("podcast-preview");
el.podcast = {
  podcastId: 1,
  title: "Tech Talks Daily",
  image: "cover.jpg",
  seasons: 5,
  genres: ["Technology", "News"],
  updated: "2025-09-18",
};
document.querySelector("#grid").appendChild(el);
```

### 📢 Listen for Selection

```js
document.addEventListener("podcast-select", (e) => {
  const { podcast } = e.detail;
  alert(`You clicked: ${podcast.title}`);
});
```

---

## 💡 Additional Usage Examples

### 🖼️ Missing Images

If the cover image fails to load, the component automatically falls back to a **placeholder SVG**.

### 📅 Human-Readable Dates

- Updated today
- Updated 1 day ago
- Updated 5 days ago
- Updated Aug 15, 2025 (fallback absolute date)

### ♿ Keyboard Support

- **Enter/Space** on a card → opens modal
- **Esc** → closes modal
- **Tab / Shift+Tab** → cycles focus inside the modal

---

## 👤 Author

**Vanessa Baart**  
[GitHub](https://github.com/VanessaDa)  
[LinkedIn](https://www.linkedin.com/in/vanessa-gwama-50841ab7)

---

## 📎 Notes

This project forms part of the [CodeSpace Academy](https://codespace.co.za/) JavaScript curriculum (DJS02 challenge).  
Focus areas: **Web Components**, **Shadow DOM encapsulation**, **events**, **responsive design**, and **accessibility**.
