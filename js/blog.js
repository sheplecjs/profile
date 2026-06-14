async function initBlog() {
  document.getElementById("blog-container").innerHTML = "";
  const index = await fetch("posts/index.json").then((r) => r.json());
  await Promise.all(index.map(async (post) => {
    const md = await fetch(`posts/${post.slug}.md`).then((r) => r.text());
    post._md = md;
    const scratch = document.createElement("div");
    scratch.innerHTML = marked.parse(md);
    post._svgs = Array.from(scratch.querySelectorAll("svg"));
  }));
  renderList(index);
}

function renderList(posts) {
  const container = document.getElementById("blog-container");
  container.innerHTML = "";

  if (posts.length === 0) {
    container.innerHTML = '<p class="is-size-6">No posts yet.</p>';
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "box mb-4";
    card.style.cssText = "cursor:pointer; display:flex; align-items:center; gap:1rem;";

    const textDiv = document.createElement("div");
    textDiv.style.flex = "1";
    textDiv.innerHTML = `
      <p class="is-size-6"><strong>${post.title}</strong></p>
      <p class="is-size-7 has-text-grey mb-2">${post.date}</p>
      <p class="is-size-7">${post.summary}</p>
    `;
    card.appendChild(textDiv);

    if (post._svgs?.length) {
      const svgWrap = document.createElement("div");
      svgWrap.style.cssText = "display:flex; gap:0.5rem; flex-shrink:0;";
      post._svgs.forEach((svg) => {
        const clone = svg.cloneNode(true);
        clone.setAttribute("height", "64");
        clone.removeAttribute("width");
        clone.style.cssText = "";
        svgWrap.appendChild(clone);
      });
      card.appendChild(svgWrap);
    }

    card.addEventListener("click", () => openPost(post, posts));
    container.appendChild(card);
  });
}

async function openPost(post, posts) {
  const md = post._md ?? await fetch(`posts/${post.slug}.md`).then((r) => r.text());
  const container = document.getElementById("blog-container");
  container.innerHTML = `
    <a class="is-size-7" id="blog-back" href="#">&larr; Back</a>
    <hr>
    <div class="content is-size-6" id="blog-post-body"></div>
  `;
  document.getElementById("blog-post-body").innerHTML = marked.parse(md);
  document.getElementById("blog-back").addEventListener("click", (e) => {
    e.preventDefault();
    renderList(posts);
  });
}
