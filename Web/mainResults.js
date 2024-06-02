const arraySubs = [
  {
    title: "Biotechnology Results",
    code: "BT",
  },
  {
    title: "Computer Science Results",
    code: "CS",
  },
  {
    title: "Chemical Results",
    code: "CH",
  },
  {
    title: "Civil Results",
    code: "CE",
  },
  {
    title: "Electronics Results",
    code: "EC",
  },
  {
    title: "Electrical Results",
    code: "EE",
  },
  {
    title: "Royal Mech Results",
    code: "ME",
  },
  {
    title: "Metallurgy Results",
    code: "MM",
  },
];
const print = (data) => console.log(JSON.stringify(data, null, 4));
const arena = document.getElementById("arena");
const heading = document.getElementById("header");
const upBtn = document.getElementById("upbtn");

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

heading.innerHTML += "Overall Results";
heading.innerHTML += `<h4 class="mt-2 text-warning">Entire Batch</h4>`;

var jsonData;
fetch(`../OverallResult-CGPA.json`)
  .then((res) => res.json())
  .then((data) => {
    jsonData = setTheRank(data);
    arena.innerHTML = "";
    setData(data);
  })
  .catch((err) => {
    console.log(err);
    arena.innerHTML = `<h2 class="text-white minh300 center">No Data exists</h2>`;
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

function setTheRank(data) {
  data.map((item, index) => {
    item[0] = index + 1;
  });
  return data;
}
function setData(data) {
  // print('Called setData')
  arena.innerHTML = ""; // Clearing the arena
  if (data.length === 0) {
    arena.innerHTML = `<h2 class="text-white minh300">No Data exists</h2>`;
    return;
  }
  data.map((item, _) => {
    let i = item.length;
    setTimeout(() => {
      arena.innerHTML += `
                <div class="card w-100 mb-3">
                    <div class="card-header position-relative">
                        <h6 class="text-capitalize mb-0">#${item[0]} ${getName(
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
                            <div class="col-12 fw-light">
                                Department - <span class="text-bold text-warning">${
                                  item[2]
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    }, 0);
  });
}
