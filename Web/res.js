const arraySubs = [
  {
    title: "Biotechnology Results",
    code: "B.Tech-BT",
  },
  {
    title: "Computer Science Results",
    code: "B.Tech-CS",
  },
  {
    title: "Chemical Results",
    code: "B.Tech-CH",
  },
  {
    title: "Civil Results",
    code: "B.Tech-CE",
  },
  {
    title: "Electronics Results",
    code: "B.Tech-EC",
  },
  {
    title: "Electrical Results",
    code: "B.Tech-EE",
  },
  {
    title: "Royal Mech Results",
    code: "B.Tech-ME",
  },
  {
    title: "Metallurgy Results",
    code: "B.Tech-MM",
  },
];
// addHeader
const print = (data) => console.log(JSON.stringify(data, null, 4));
const heading = document.getElementById("header");
const cgpaBtn = document.getElementById("cgpabtn");
const sgpaBtn = document.getElementById("sgpabtn");
const arena = document.getElementById("arena");
const upBtn = document.getElementById("upbtn");
const inputBar = document.getElementById("search");

const upBtnListener = document.addEventListener("scroll", (e) => {
  if (document.documentElement.scrollTop >= 200) {
    if (upBtn.classList.contains("d-none")) {
      upBtn.classList.remove("d-none");
    }
  } else {
    if (upBtn.classList.contains("d-none") === false) {
      upBtn.classList.toggle("d-none");
    }
  }
});

upBtn.onclick = () => {
  document.documentElement.scrollTop = 0;
};
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let subject = params?.subject ?? "B.Tech-ME";
let type = params?.type ?? "CGPA";
if (type === "CGPA") {
  cgpaBtn.className = "btn btn-warning";
} else if (type === "SGPA") {
  sgpaBtn.className = "btn btn-warning";
}
arraySubs.map((item) => {
  if (item.code === subject) {
    heading.innerHTML += item.title;
    heading.innerHTML += `<h4 class="mt-2 text-warning">${type} wise</h4>`;
    return;
  }
});

const fileName = `Ranked-${subject}-${type}-Sem8.json`;

cgpaBtn.addEventListener("click", () => {
  window.location.href = `results.html?subject=${subject}&type=CGPA`;
});
sgpaBtn.addEventListener("click", () => {
  window.location.href = `results.html?subject=${subject}&type=SGPA`;
});

var jsonData;
fetch(`../${fileName}`)
  .then((res) => res.json())
  .then((data) => {
    jsonData = setTheRank(data);
    arena.innerHTML = "";
    setData(data);
  })
  .catch((err) => {
    console.log(err);
    arena.innerHTML = `<h2 class="text-danger minh300 center">No Data exists</h2>`;
  });

function getName(data) {
  let name = "";
  for (let i = 3; i < data.length; i++) {
    const item = data[i];
    if (isNaN(item)) {
      name += item + " ";
    } else {
        break;
    }
  }
  return name.toLowerCase();
}
// Search Functionality
inputBar.addEventListener("input", () => {
  let value = inputBar.value;
  if (value === "") {
    setData(jsonData);
    return;
  }
  let filteredData = jsonData.filter((item) => {
    let name = getName(item);
    return name.includes(value.toLowerCase());
  });
  setData(filteredData);
});

function setTheRank(data) {
  data.map((item, index) => {
    item[0] = index + 1;
  });
  return data;
}
function setData(data) {
  // print('Called setData')
  arena.innerHTML = "";
  if (data.length === 0) {
    arena.innerHTML = `<h2 class="text-danger minh300">No Data exists</h2>`;
    return;
  }
  data.map((item, _) => {
    let i = item.length;
    arena.innerHTML += `
            <div class="card w-100 mb-3">
                <div class="card-header position-relative">
                    <h6 class="text-capitalize mb-0">${item[0]}. ${getName(
      item
    )}</h6>
                </div>
                <div class="card-body">
                    <div class="row text-white mb-2">
                        <div class="col-6 fw-light">
                            CGPA - <span class="text-warning">${
                              item[i - 2]
                            }</span>
                        </div>
                        <div class="col-6 fw-light">
                            SGPA - <span class="text-warning">${
                              item[i - 3]
                            }</span>
                        </div>
                    </div>
                    <div class="row text-white">
                        <div class="col-6 fw-light">
                            Roll no. - <span class="text-bold text-warning">${
                              item[2]
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  });
}
