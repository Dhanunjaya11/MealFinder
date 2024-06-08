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