# The Study Shelf

A static website for sharing your course notes and reference PDFs — anyone with the link can browse, read inline, or download. Built to run for free on **GitHub Pages**.

## How it works

GitHub Pages only serves static files — there's no server, database, or login. So instead of a real "upload" button, the pattern here is:

1. You add the PDF file itself to the `notes/` folder.
2. You add one entry for it in `books.json` (title, subject, description, filename).
3. The site reads `books.json` and displays a searchable, filterable catalog automatically.

This is the standard, reliable way to do this kind of project on GitHub Pages — no backend needed, and it costs nothing to host.

## Putting it on GitHub

1. Create a new repository (e.g. `study-shelf`).
2. Upload all these files (`index.html`, `read.html`, `style.css`, `script.js`, `books.json`, the `notes/` folder) to the repo, keeping the same folder structure.
3. Go to **Settings → Pages** in your repo.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, pick the `main` branch and `/ (root)` folder, then save.
5. GitHub gives you a live URL, usually `https://yourusername.github.io/study-shelf/`, within a minute or two.

## Adding a new PDF later

1. Drop the PDF file into the `notes/` folder (via GitHub's "Add file → Upload files" button works fine, no command line needed).
2. Open `books.json`, copy one entry, and edit it:

```json
{
  "id": "unique-short-id",
  "title": "Your note title",
  "author": "Your Name",
  "subject": "Subject name — reused subjects become filter tabs",
  "callNumber": "e.g. CS 101.2",
  "type": "Notes",
  "description": "One or two sentences about what's in it.",
  "file": "notes/your-file-name.pdf",
  "dateAdded": "YYYY-MM-DD"
}
```

3. Commit the change. The live site updates automatically within a minute.

## Notes on file size

GitHub warns on files over 50 MB and blocks anything over 100 MB. If a PDF is large, compress it first (most PDF tools have a "reduce file size" option) — this also makes the site faster for visitors on mobile data.

## If you outgrow this later

If you eventually want real drag-and-drop uploading from the browser (without editing `books.json` by hand), that needs either the GitHub API (possible, but a personal access token in client-side code is visible to anyone who views the page source, so it's not safe for a public repo) or a small backend with a database. Worth knowing as a next step, but not necessary for a class project.
