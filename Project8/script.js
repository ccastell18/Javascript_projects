const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = '';

  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML =
            '<p>There are no search results.  Try again!</p>';
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
              <div class="meal-info" data-mealId="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>`
            )
            .join('');
        }
      });
    search.value = '';
  } else {
    alert('please enter a search term');
  }
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function getRandomMeal() {
  //clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

//Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute('data-mealid');
    getMealById(mealId);
  }
});
