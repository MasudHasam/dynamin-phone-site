//this function is for load data by api. 
const loadPhones = async (brandName, datalimit) => { //by using brandName perameter we make the api dynamic.
    const url = `https://openapi.programming-hero.com/api/phones?search=${brandName}`;
    const res = await fetch(url)
    const data = await res.json()
    displayPhones(data.data, datalimit);
}

const commonfunction = (datalimit) => {
    spiner(true);
    const searchValue = document.getElementById('searchValue');
    const searchValueText = searchValue.value;
    loadPhones(searchValueText, datalimit);
}

//this function will get search value from input area and load data according to it
const searchButton = () => {
    commonfunction(10)
};

//search while press enter button. get search value from input area and load data according to it
document.getElementById('searchValue').addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        commonfunction(10)
    }
});


//this function will show the phones on the display.
const displayPhones = (phones, datalimit) => {

    const noResult = document.getElementById('noResult');
    if (phones.length === 0) {
        noResult.classList.remove('d-none');
    } else {
        noResult.classList.add('d-none');
    }


    const showAllBtn = document.getElementById('showAllBtn');
    if (phones.length > datalimit) {
        phones = phones.slice(0, 10);
        showAllBtn.classList.remove('d-none');
    } else {
        showAllBtn.classList.add('d-none');
    }


    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = '';
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="col">
            <div class="card h-100">
               <img src="${phone.image}" class="card-img-top" alt="...">
               <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                       to additional content. This content is a little bit longer.</p>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"" >Details</button>
               </div>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });

    spiner(false);
}


//this function is for spiner.
const spiner = (isSpin) => {
    if (isSpin) {
        const spiner = document.getElementById('spiner');
        spiner.classList.remove('d-none');
    } else {
        const spiner = document.getElementById('spiner');
        spiner.classList.add('d-none');
    }
}


//show all phones button.
const showAllBtn = () => {
    commonfunction();
}


//this function is for show phone details
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetaisl(data.data));
}


//set data on a modal by this function\
const setDetaisl = (details) => {
    const title = document.getElementById('title')
    title.innerText = `${details.name}`
    const releaseDate = document.getElementById('releaseDate')
    releaseDate.innerText = `${details.releaseDate ? details.releaseDate : 'Not found'}`
    //we can add more details hear .
}