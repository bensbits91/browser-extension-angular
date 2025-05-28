# Angular Browser Extension (Test Project)

This is a quick test project for me to explore browser extension architecture/features and to refresh my Angular skills.  

**Goals:** 
- Simple detection forms and standalone inputs and textareas
- List detected elements in the popup UI
- Add a context menu item to highlight detected elements on the page

**Note:** This codebase might be messy and is meant for learning and exploration :)

---

## 🚀 Noteworthy Features

- **Angular 19** used for the popup UI
- **Manifest V3** Chrome extension architecture
- Modular background, content, and popup scripts
- Context menu integration
- Form detection and highlighting on web pages
- Dark mode toggle in the popup, persisted to storage.sync
- Build tooling: Angular CLI & esbuild
- Service-based architecture for messaging and storage

---

## 🛠️ Stack

- **Angular 19**
- **TypeScript**
- **Chrome Extensions API (Manifest V3)**
- **esbuild** (for background and content script bundling)
- **Karma/Jasmine** for unit testing

---

## 📦 Project Structure

- src/
  - app/
    - popup/
    - background/
    - content/
    - services/
- public/
- dist/
  - browser/

- `popup/`: Angular popup app
- `background/`: Background service worker
- `content/`: Content script & helpers
- `public/`: manifest.json, icons, static assets
- `dist/browser/`: Extension build output (load this in Chrome)

---

## 🏗️ How to Build & Use

1. **Install dependencies:**

       npm install

2. **Build everything:**

       npm run build:all

   This builds the Angular popup and bundles background/content scripts into `/dist/browser`.

3. **Load the extension in Chrome:**
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `/dist/browser` folder

4. **Try it out:**
   - Click the extension icon to open the popup
   - Right-click on a page to see the context menu and highlight forms
   - Use the popup to toggle dark mode and view detected forms

---

## 🧪 Testing

Run unit tests with:

       npm test

---

## ⚠️ Notes & Caveats

- This is a **test project**—expect rough edges, incomplete features, and messy code.
- The repo is intentionally minimal and focused on learning, not production readiness.
- The extension currently only supports Chrome (Manifest V3).
- If you run into issues with test types, see the `tsconfig.spec.json` for Jasmine setup.

---

## 📚 Resources

- [Chrome Extensions Developer Guide](https://developer.chrome.com/docs/extensions/)
- [Angular Documentation](https://angular.dev/)
- [esbuild Documentation](https://esbuild.github.io/)
