const arraySubs = [
    {
        "title": "Biotechnology Results",
        "code": "BT"
    },
    {
        "title": "Computer Science Results",
        "code": "CS"
    },
    {
        "title": "Chemical Results",
        "code": "CH"
    },
    {
        "title": "Civil Results",
        "code": "CE"
    },
    {
        "title": "Electronics Results",
        "code": "EC"
    },
    {
        "title": "Electrical Results",
        "code": "EE"
    },
    {
        "title": "Royal Mech Results",
        "code": "ME"
    },
    {
        "title": "Metallurgy Results",
        "code": "MM"
    },
]
// addHeader
const print = (data) => console.log(JSON.stringify(data, null, 4));
const heading = document.getElementById('header');
const cgpaBtn = document.getElementById('cgpabtn');
const sgpaBtn = document.getElementById('sgpabtn');
const arena = document.getElementById('arena');
const upBtn = document.getElementById('upbtn');
const inputBar = document.getElementById('search');

const upBtnListener = document.addEventListener('scroll', e => {
    if (document.documentElement.scrollTop >= 200) {
        if (upBtn.classList.contains('d-none')) {
            upBtn.classList.remove('d-none');
        }
    } else {
        if (upBtn.classList.contains('d-none') === false) {
            upBtn.classList.toggle('d-none');
        }
    }
}
);

upBtn.onclick = () => {
    document.documentElement.scrollTop = 0;
}
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let subject = params?.subject ?? 'ME'; // Royal Mech Rules you Fools !
let type = params?.type ?? 'CGPA';
if (type === 'CGPA') {
    cgpaBtn.className = 'btn btn-warning';
} else if (type === 'SGPA') {
    sgpaBtn.className = 'btn btn-warning';
}
arraySubs.map((item) => {
    if (item.code === subject) {
        heading.innerHTML += item.title;
        heading.innerHTML += `<h4 class="mt-2 text-warning">${type} wise</h4>`
        return;
    }
});

const fileName = `Ranked-${subject}-${type}-Sem7.json`

cgpaBtn.addEventListener('click', () => {
    window.location.href = `results.html?subject=${subject}&type=CGPA`;
});
sgpaBtn.addEventListener('click', () => {
    window.location.href = `results.html?subject=${subject}&type=SGPA`;
});

var jsonData;
fetch(`../${fileName}`)
    .then((res) => res.json())
    .then((data) => {
        arena.innerHTML = ''
        jsonData = setTheRank(data); // Called Once only
        setData(jsonData);
    }).catch((err) => {
        console.log(err)
        arena.innerHTML = `<h2 class="text-danger minh300 center">No Data exists</h2>`
    });

function getName(data) { // Data is array of strings
    let name = '';
    let s = 3;
    let e = data.length - 4;
    for (let i = s; i < e; i++) {
        name += data[i] + ' ';
    }
    return name.toLowerCase();
}
function getGender(data) { // data is either M or F
    if (data === 'M') {
        return '<i class="fas text-info fa-mars"></i>';
    } else if (data === 'F') {
        return '<i class="fas text-pink fa-venus"></i>';
    }
}

inputBar.addEventListener('input', search);

function search(){
    let value = inputBar.value;
    // print(value);
    if (value === '') {
        setData(jsonData);
        return;
    }
    let filteredData = jsonData.filter((item) => {
        let name = getName(item);
        return name.includes(value.toLowerCase());
    });
    // print(filteredData);
    setData(filteredData);
}

function setTheRank(data) {
    data.map((item, index) => {
        item[0] = index + 1;
    });
    return data;
}
function setData(data){
    // print('Called setData')
    arena.innerHTML = '';
    if (data.length === 0) {
        arena.innerHTML = `<h2 class="text-danger minh300">No Data exists</h2>`
        return;
    }
    data.map((item, index) => {
        let i = item.length;
        arena.innerHTML += `
            <div class="card w-100 mb-3">
                <div class="card-header position-relative">
                    <h6 class="text-capitalize mb-0">${item[0]}. ${getName(item)}</h6>
                </div>
                <div class="card-body">
                    <div class="row text-white mb-2">
                        <div class="col-6 fw-light">
                            CGPA - <span class="text-warning">${item[i - 2]}</span>
                        </div>
                        <div class="col-6 fw-light">
                            SGPA - <span class="text-warning">${item[i - 3]}</span>
                        </div>
                    </div>
                    <div class="row text-white">
                        <div class="col-6 fw-light">
                            Gender - <span class="text-bold text-warning">${getGender(item[i - 4])}</span>
                        </div>
                        <div class="col-6 fw-light">
                            Roll no. - <span class="text-bold text-warning">${item[2]}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}