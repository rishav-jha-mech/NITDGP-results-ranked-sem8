const mainContainer = document.getElementById("main");
downloadPDF = document.createElement("div");
downloadPDF.setAttribute("class", "item");
downloadPDF.innerHTML = `
<a href="https://github.com/rishav-jha-mech/NITDGP-results-ranked-sem8/raw/main/UG-SEM8_2023-24.pdf" rel="noopener noreferrer"> <i class="fas bg-danger fa-file-pdf text-white fs-2"></i> Download PDF</a>
`;
mainContainer.appendChild(downloadPDF);

const LinkList = [
  {
    title: "Overall Results",
  },
  {
    title: "Biotechnology Results",
    url: "B.Tech-BT",
  },
  {
    title: "Computer Results",
    url: "B.Tech-CS",
  },
  {
    title: "Chemical Results",
    url: "B.Tech-CH",
  },
  {
    title: "Civil Results",
    url: "B.Tech-CE",
  },
  {
    title: "Electronics Results",
    url: "B.Tech-EC",
  },
  {
    title: "Electrical Results",
    url: "B.Tech-EE",
  },
  {
    title: "Mechanical Results",
    url: "B.Tech-ME",
  },
  {
    title: "Metallurgy Results",
    url: "B.Tech-MM",
  },
];

LinkList.forEach((_, index) => {
  var div = document.createElement("div");
  div.setAttribute("class", " item");

  if (LinkList[index]["title"].includes("SCGPA")) {
    div.setAttribute("class", " itemSCGPA");
  }
  div.innerHTML = `
        <a href="${
          index === 0
            ? "./mainResults.html"
            : `./results.html?subject=${LinkList[index]["url"]}`
        }">${LinkList[index]["title"]}</a>
    `;
  mainContainer.appendChild(div);
});

thatBody = document.getElementsByTagName("body")[0];
