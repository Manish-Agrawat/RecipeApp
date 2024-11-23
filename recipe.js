async function fetchRecipeDetails() {
  const params = new URLSearchParams(window.location.search);
  const mealId = params.get("id");

  if (mealId) {
    const resp = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await resp.json();

    if (data.meals) {
      const meal = data.meals[0];
      const container = document.getElementById("recipe-container");

      // Clear existing content
      container.innerHTML = "";

      // Recipe text section
      const recipeText = document.createElement("div");
      recipeText.classList.add("recipe-text");

      const title = document.createElement("h1");
      title.textContent = meal.strMeal;

      const category = document.createElement("h3");
      category.textContent = `Category: ${meal.strCategory}`;

      const area = document.createElement("h3");
      area.textContent = `Area: ${meal.strArea}`;

      const ingredientsTitle = document.createElement("h3");
      ingredientsTitle.textContent = "Ingredients:";

      const ingredientsList = document.createElement("ul");
      Object.keys(meal)
        .filter((key) => key.startsWith("strIngredient") && meal[key])
        .forEach((key) => {
          const ingredient = meal[key];
          const measure = meal[`strMeasure${key.slice(13)}`];
          const listItem = document.createElement("li");
          listItem.textContent = `${ingredient} - ${measure}`;
          ingredientsList.appendChild(listItem);
        });
      const steps = document.createElement("h3");
      steps.textContent = "Steps :";
      const instructions = document.createElement("p");
      instructions.textContent = meal.strInstructions;

      // Append text elements
      recipeText.appendChild(title);
      recipeText.appendChild(category);
      recipeText.appendChild(area);

      recipeText.appendChild(ingredientsTitle);
      recipeText.appendChild(ingredientsList);
      recipeText.appendChild(steps);
      recipeText.appendChild(instructions);

      // Recipe image section
      const recipeImage = document.createElement("div");
      recipeImage.classList.add("recipe-image");

      const image = document.createElement("img");
      image.src = meal.strMealThumb;
      image.alt = meal.strMeal;

      recipeImage.appendChild(image);

      // Append text and image to container
      container.appendChild(recipeText);
      container.appendChild(recipeImage);
    } else {
      document.body.innerHTML = "<h1>Recipe not found</h1>";
    }
  }
}

// Call the function to load recipe data
fetchRecipeDetails();
