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
        console.log(element);
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

// Loading Spinner

const loading = (isLoading) => {
    const spinner = document.getElementById('spinner-loader')
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

// Load News section

const loadNews = async (id) => {
    loading(true)
    try {

        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const datas = await res.json();
        displayNews(datas.data);
    } catch (error) {
        console.log(error)
    }
}

//  Displaynews

const displayNews = (datas) => {
    const newsItems = document.getElementById('news-items');

    newsItems.innerText = `${datas.length > 0 ? datas.length + ' news items found' : 'No news today'}`;
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = '';
    datas.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="row p-2 border">
                <div class="col-12 col-md-12 col-lg-6 align-self-start">
                    <div><img class="img-thumbnail" src="${data.image_url}" alt="Movie"></div>
                </div>
                    <div class="col align-self-start">
                        <div class="card-body">
                            <h4 class="card-title">${data.title}</h4>
                            <p>${data.details.slice(0, 300)}....</p>

                            <div class="d-flex justify-content-between align-items-center">
                                <!-- author -->
                                <div class="d-flex align-items-center">
                                    <div>
                                        <img class="rounded-circle" style="width:30px" src="${data.author.img}" />
                                    </div>
                                    <div class="pl-1 mt-2">
                                        <span class="fw-bold">${data.author.name}</span>
                                        <p class="text-muted" style="font-size:10px">${data.author.published_date}</p>
                                    </div>
                                </div>

                                <!-- views -->
                                <div style="font-size:13px">
                                    <span class="fw-bold"><i class="fa-solid fa-eye"></i> ${data.total_view} M</span>
                                </div>
                                <!-- Icons -->
                                <div style="font-size:13px">
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                    <i class="fa-solid fa-star text-orange-400"></i>
                                </div>
                                <!-- button -->
                                <div class="">
                                    <button class="btn btn-primary" onclick="detailNews('${data._id}')" data-bs-toggle="modal" data-bs-target="#detailNewsModal">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        `
        newsSection.appendChild(div);
    })
    loading(false)
}


// showing news details

const detailNews = async (newsId) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
        const res = await fetch(url)
        const datas = await res.json();
        displayDetails(datas.data)
    } catch (error) {
        console.log(error);
    }
}

const displayDetails = (datas) => {
    const detailNewsModalLabel = document.getElementById('detailNewsModalLabel');
    detailNewsModalLabel.innerText = `${datas[0].title}`;

    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <div class="fw-bold">
        <img class="img-thumbnail" src="${datas[0].author.img}">
        <p>Author: ${datas[0].author.name ? datas[0].author.name : 'No Name'}</p>
        <p>Rating: ${datas[0].rating.number ? datas[0].rating.number : 'No Rating'}</p>
        <p>Rating: ${datas[0].total_view ? datas[0].total_view : 'No Info'}</p>
        <p>Badge: ${datas[0].rating.badge ? datas[0].rating.badge : 'No Badge'}</p>
    </div>
    `
}

loadCategories()