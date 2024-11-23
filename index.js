const search = document.querySelector("#searchbox");
const searchbtn = document.querySelector(".searchbtn");
let databox = document.querySelector(".data-box");
let img = document.querySelector(".img");
let data = document.querySelector(".data");
let title = document.querySelector(".title");
let description = document.querySelector(".description");
let btn = document.querySelector(".btn");

async function apical(url) {
  let resp = await fetch(url);
  let data = await resp.json();
  return data;
}

async function getdata(query) {
  let data = await apical(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  databox.innerHTML = "";

  if (data.meals) {
    data.meals.forEach((element) => {
      let div = document.createElement("div");
      div.classList.add("data");

      let img = document.createElement("img");
      img.classList.add("img");
      img.src = element.strMealThumb;

      let div2 = document.createElement("div");
      div2.classList.add("details");

      let title = document.createElement("h1");
      title.classList.add("title");
      title.textContent = element.strMeal;

      let h1 = document.createElement("h3");
      h1.textContent = element.strArea + " " + element.strCategory;

      let description = document.createElement("p");
      description.classList.add("description");
      description.textContent = element.strTags;

      let btn = document.createElement("button");
      btn.classList.add("btn");
      btn.textContent = "View Recipe";
      btn.addEventListener("click", () => {
        // Redirect to a new page with recipe details
        window.location.href = `recipi.html?id=${element.idMeal}`;
      });

      div.appendChild(img);
      div2.appendChild(title);
      div2.appendChild(h1);
      div2.appendChild(description);
      div2.appendChild(btn);
      div.appendChild(div2);

      document.querySelector(".data-box").appendChild(div);
    });
  } else {
    console.log("No meals found for the given query.");
    let result = document.createElement("h1");
    result.classList.add("No-result");
    result.innerHTML =
      "No Meals Found Palese Enter Correct Meals Name Like (Cake ,Pizza, etc.)";
    document.querySelector(".data-box").appendChild(result);
  }
}

search.addEventListener("input", function () {
  document.querySelector(".data-box").innerHTML = "";
  let searchTerm = search.value.trim();
  getdata(searchTerm);
});

search.addEventListener("input", function () {
  let searchTerm = search.value.trim();
  if (searchTerm === "") {
    getdata("cake");
  }
});

getdata("cake");



