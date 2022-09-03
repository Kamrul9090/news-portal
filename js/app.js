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
        const list = document.createElement('ul');
        list.classList.add('nav')
        list.classList.add('nav-pills')
        list.classList.add('nav-pill')
        list.classList.add('list-style')
        list.innerHTML = `
        <li class="nav-item" onclick="loadNews('${element.category_id}')">
            <a class="nav-link" aria-current="page" href="#">${element.category_name}</a>
        </li>
        `
        catagorySection.appendChild(list);
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
    const newsSection = document.getElementById('news-section');

    datas.forEach(data => {
        console.log(data);

        const div = document.createElement('div');
        div.innerHTML = `


        `
        newsSection.appendChild(div);
    })
}





loadCategories()