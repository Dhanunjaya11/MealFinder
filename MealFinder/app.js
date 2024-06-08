document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    document.querySelector('#searchButton').addEventListener('click', searchMeal);
    document.querySelector('.hamburger').addEventListener('click', openNav);
    document.querySelector('.closebtn').addEventListener('click', closeNav);
});

const fetchCategories = async () => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        displayCategories(data.categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('mainCategories');
    categoriesContainer.innerHTML = '';
    document.getElementById('heading').textContent = 'CATEGORIES';
    const fragment = document.createDocumentFragment();
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
            <button>${category.strCategory.toUpperCase()}</button>
        `;
        categoryDiv.onclick = () => fetchMealsByCategory(category.strCategory);
        fragment.appendChild(categoryDiv);
    });
    categoriesContainer.appendChild(fragment);
};
const fetchMealsByCategory = async (category) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching meals by category:', error);
    }
};

const displayMeals = (meals) => {
    const categoriesContainer = document.getElementById('mainCategories');
    categoriesContainer.innerHTML = '';
    const heading = document.getElementById('heading');
    heading.textContent = 'MEALS';
    heading.style.marginLeft = '4px';
    const fragment = document.createDocumentFragment();
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'category';
        mealDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        fragment.appendChild(mealDiv);
    });
    categoriesContainer.appendChild(fragment);
};

const searchMeal = async () => {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) {
        alert('Input field cannot be empty');
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
        const data = await response.json();
        if (data.meals) {
            displayMeals(data.meals);
        } else {
            console.log('No results found');
        }
    } catch (error) {
        console.error('Error searching for meal:', error);
    }
};

const openNav = () => {
    document.getElementById("sidebar").style.width = "250px";
};

const closeNav = () => {
    document.getElementById("sidebar").style.width = "0";
};

document.querySelectorAll('#sidebars a').forEach(link => {
    link.addEventListener('click', () => fetchMealsByCategory(link.textContent));
});