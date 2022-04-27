let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let total_sold = document.getElementById('total_sold');

let mood = 'create';
let tmp;
var total_salary = 0;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);

// get total
function gettotal() 
{
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = '#040';
    }
    else{
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(126, 0, 0)';
    }
};

// create product 
let dataPro ;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
};

submit.onclick = function() {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count: count.value,
        status:'norma',
        category:category.value.toLowerCase(),
    };

    if (title.value != '' && price.value != '' && category.value != '' && newPro.count < 200) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                };
            }else {
                dataPro.push(newPro); 
            }
        }
        else if (dataPro[tmp].status = 'sold') {
            dataPro[tmp] = newPro;
            dataPro[tmp].status = 'sold';
            console.log('sold');
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        else 
        {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearinputs();
    };
    localStorage.setItem('product',JSON.stringify(dataPro));
    console.log(dataPro);
    
    show_data();
    showSold();
    get_total();
};

// clear inputs
function clearinputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};
function show_data() {
    gettotal();
    showSold();
    get_total();
    let table = '';
    for(let i = 0;i < dataPro.length;i++){
        if (dataPro[i].status != 'sold') {
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
                <td><button onclick="sold(${i})" id="solid">${dataPro[i].status}</button></td>
            </tr>
            `;
        };
    };
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `;
    }else {
        btnDelete.innerHTML = '';
    };
    
};
show_data();
// delete
function delete_data(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    get_total();
    show_data();
}
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    get_total();
    show_data();
}
// update 
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    gettotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    if (mood == 'sold') {
        dataPro[i].status = 'sold';
    };
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth'
    });
    get_total();
};
// search
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchMood = 'title';
    }else {
        searchMood = 'category';
    };
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value = '';
    show_data();
}
function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].texes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
                    </tr>
                    `;

            }
        }
    }
    else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].texes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
                    </tr>
                    `;

            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
function sold(i) {
    mood = 'sold';
    dataPro[i].status = 'sold';
    localStorage.product = JSON.stringify(dataPro);
    get_total();
    showSold();
    show_data();
};

function get_total() {
    for (let i=0;i <dataPro.length;i++) {
        if (dataPro[i].status === 'sold') {
            let salary = +dataPro[i].total;
            total_salary += salary;
        };
    };
};
document.getElementById('total_sold').innerHTML = 'Sold: '+total_salary;


// get_total();

function showSold() {
    let table = '';
    
    for (let i=0;i <dataPro.length;i++) {
        if (dataPro[i].status == 'sold') {
            table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="delete_data(${i})" id="delete">delete</button></td>
                    </tr>
                    `;
                }
            };
            
    document.getElementById('sold').innerHTML = table;
};
// showSold();
