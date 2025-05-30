const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

const heading = document.createElement('h1');
heading.textContent = 'Чегодаев Артем 231 группа';
container.appendChild(heading);

const linksContainer = document.createElement('div');
linksContainer.id = 'links';
container.appendChild(linksContainer);

const pages = [
  { name: "lab1", url: "http://localhost:3000/lab1/lab1.html" },
  { name: "lab2", url: "http://localhost:3000/lab2/lab2.html" },
];

pages.forEach((page) => {
  const link = document.createElement("a");
  link.href = page.url;
  link.textContent = page.name;
  link.title = page.name;

  linksContainer.appendChild(link);
  linksContainer.appendChild(document.createElement("br"));
});