let allBooks = [];
let activeSubject = "All";

const grid = document.getElementById("grid");
const countRow = document.getElementById("countRow");
const tabsEl = document.getElementById("tabs");
const searchInput = document.getElementById("searchInput");

async function loadBooks() {
  try {
    const res = await fetch("books.json", { cache: "no-store" });
    if (!res.ok) throw new Error("books.json not found");
    allBooks = await res.json();
  } catch (err) {
    grid.innerHTML = `<div class="empty">Couldn't load the catalog (books.json). Check the browser console for details.</div>`;
    console.error(err);
    return;
  }
  buildTabs();
  render();
}

function buildTabs() {
  const subjects = ["All", ...new Set(allBooks.map(b => b.subject))];
  tabsEl.innerHTML = "";
  subjects.forEach(subject => {
    const tab = document.createElement("button");
    tab.className = "tab" + (subject === activeSubject ? " active" : "");
    tab.textContent = subject;
    tab.addEventListener("click", () => {
      activeSubject = subject;
      buildTabs();
      render();
    });
    tabsEl.appendChild(tab);
  });
}

function render() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = allBooks.filter(b => {
    const matchesSubject = activeSubject === "All" || b.subject === activeSubject;
    const haystack = `${b.title} ${b.author} ${b.description} ${b.subject}`.toLowerCase();
    const matchesQuery = query === "" || haystack.includes(query);
    return matchesSubject && matchesQuery;
  });

  filtered.sort((a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || ""));

  countRow.textContent = `${filtered.length} item${filtered.length === 1 ? "" : "s"} on the shelf`;

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty">Nothing matches that search. Try a different subject or keyword.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(cardHTML).join("");
}

function cardHTML(b) {
  const readUrl = `read.html?file=${encodeURIComponent(b.file)}&title=${encodeURIComponent(b.title)}`;
  return `
    <article class="card">
      <div class="card-call">${escapeHTML(b.callNumber || "")} · ${escapeHTML(b.type || "Notes")}</div>
      <h3 class="card-title">${escapeHTML(b.title)}</h3>
      <div class="card-meta">${escapeHTML(b.subject)} — ${escapeHTML(b.author || "")}</div>
      <p class="card-desc">${escapeHTML(b.description || "")}</p>
      <div class="card-actions">
        <a class="btn" href="${readUrl}">Read</a>
        <a class="btn primary" href="${encodeURI(b.file)}" download>Download</a>
      </div>
    </article>
  `;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

searchInput.addEventListener("input", render);

loadBooks();
