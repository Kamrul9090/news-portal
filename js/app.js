const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const catagory = await res.json();
        displayCategories(catagory.data.news_category);
    } catch (error) {
        console.log(error)
    }
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
    newsSection.innerHTML = '';
    console.log(newsSection);
    datas.forEach(data => {
        console.log(data);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row p-2 border">
                    <div class="col align-self-start">
                        <div><img class="img-thumbnail" src="${data.image_url}" alt="Movie"></div>
                    </div>
                    <div class="col align-self-start">
                        <div class="card-body">
                            <h4 class="card-title">${data.title}</h4>
                            <p>${data.details.slice(0, 300)}....</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <!-- author -->
                                <div class="d-flex">
                                    <div>
                                        <img class="rounded-circle" style="width:50px" src="${data.author.img}" />
                                    </div>
                                    <div class="">
                                        <span class="fw-bold">${data.author.name}</span>
                                        <p class="text-muted">${data.author.published_date}</p>
                                    </div>
                                </div>

                                <!-- views -->
                                <div>
                                    <span><i class="fa-solid fa-eye"></i> 1.4 M</span>
                                </div>
                                <!-- Icons -->
                                <div>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                </div>
                                <!-- button -->
                                <div class="">
                                    <button class="btn btn-primary">Watch</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        `
        newsSection.appendChild(div);
    })
}





loadCategories()