import { data } from "./data.js";

const mainNews = data.items.slice(0, 3);
const smallNews = data.items.slice(3, 12);

const mainNewsContainer = document.querySelector(".article__big_column");
const smallNewsContainer = document.querySelector(".article__small_column");

const escapeString = (str) => {
  const simbols = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
  };

  return str.replace(/[&<>]/g, (tag) => {
    return simbols[tag] || tag;
  });
};

mainNews.forEach((item) => {
  const categoryData = data.categories.find((categoryItem) => categoryItem.id === item.category_id).name;
  const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id).name;

  const template = document.createElement("template");

  template.innerHTML = `
    <article class="main-article">
      <div class="main-article__image-container">
        <img class="main-article__img" src="${encodeURI(item.image)}" alt="Фото новости">
      </div>

      <div class="main-article__content">
        <span class="article__category main-article__category">${escapeString(categoryData)}</span>
        <h2 class="main-article__title">${escapeString(item.title)}</h2>
        <p class="main-article__text">${escapeString(item.description)}</p>
        <span class="article__source main-article__source">${escapeString(sourceData)}</span>
      </div>
    </article>
  `;

  mainNewsContainer.append(template.content);
});

smallNews.forEach((item) => {
  const dateData = new Date(item.date).toLocaleDateString("ru-RU", { month: "long", day: "numeric" });
  const sourceData = data.sources.find((sourceItem) => sourceItem.id === item.source_id).name;

  const template = document.createElement("template");

  template.innerHTML = `
    <article class="small-article">
      <h2 class="small-article__title">${escapeString(item.title)}</h2>
      <p class="small-article__caption">
        <span class="article__date small-article__date">${dateData}</span>
        <span class="article__source small-article__source">${escapeString(sourceData)}</span>
      </p>
    </article>
  `;

  smallNewsContainer.append(template.content);
});
