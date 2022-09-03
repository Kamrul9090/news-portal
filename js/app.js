const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const catagory = await res.json();
    displayCategories(catagory.data.news_category);
}

//Display categories items

const displayCategories = catagories => {
    const catagorySection = document.getElementById('category-section');
    catagories.forEach(element => {
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'style')
        ul.innerHTML = `
        <li><a href="#" onclick="loadNews('${element.category_id}')">${element.category_name}</a></li>
        `
        catagorySection.appendChild(ul);
    })
}


// displayNews section

const loadNews = async (id) => {
    try {

        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const datas = await res.json();
        displayNews(datas.data);

    } catch (error) {
        console.log(error)
    }
}


const displayNews = datas => {
    console.log(datas);
    datas.forEach(data => {
        console.log(data);

    })
}

loadCategories()