async function initBlog() {
  const index = await fetch("posts/index.json").then((r) => r.json());
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
    card.style.cursor = "pointer";
    card.innerHTML = `
      <p class="is-size-6"><strong>${post.title}</strong></p>
      <p class="is-size-7 has-text-grey mb-2">${post.date}</p>
      <p class="is-size-7">${post.summary}</p>
    `;
    card.addEventListener("click", () => openPost(post, posts));
    container.appendChild(card);
  });
}

async function openPost(post, posts) {
  const md = await fetch(`posts/${post.slug}.md`).then((r) => r.text());
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
