const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const catagory = await res.json();
    displayCategories(catagory.data.news_category);
}

const displayCategories = catagories => {
    console.log(catagories);
    const catagorySection = document.getElementById('category-section');
    catagories.forEach(element => {
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'style')
        ul.innerHTML = `
        <li><a href="#" id="home">${element.category_name}</a></li>
        `
        catagorySection.appendChild(ul);
    })
}

loadCategories()