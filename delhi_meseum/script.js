const title = document.getElementById("title");
const description = document.getElementById("description");

const params = new URLSearchParams(window.location.search);

// SETTINGS
let category = params.get("category") || "anthropology";
let set = parseInt(params.get("set") || "1");

const MAX_SETS = 3;
const SWITCH_TIME = 9000;

let artworks = [];
let detected = false;

const scene = document.getElementById("scene");


// 🔘 CATEGORY SELECT
window.selectCategory = function (cat) {
  window.location.href = `?category=${cat}&set=1`;
};


// 🚨 CRITICAL FIX → SET MINDAR BEFORE LOAD
const mindPath = `targets/${category}/set${set}.mind`;

scene.setAttribute(
  "mindar-image",
  `imageTargetSrc: ${mindPath}; autoStart: true;`
);


// 🧠 INIT
async function init() {

  description.innerText = `Loading ${category} (set ${set})...`;

  try {
    // Load data
    const module = await import(`./data/${category}/set${set}.js`);
    artworks = module.artworks;

    createTargets();
    startAutoSwitch();

  } catch (err) {
    console.error(err);
    description.innerText = "Error loading data";
  }
}


// 🎯 CREATE TARGETS
function createTargets() {
  artworks.forEach((_, index) => {

    const entity = document.createElement("a-entity");

    entity.setAttribute("id", `target${index}`);
    entity.setAttribute("mindar-image-target", `targetIndex: ${index}`);

    scene.appendChild(entity);

    setupTarget(entity, index);
  });
}


// 🔥 TARGET EVENTS
function setupTarget(target, index) {

  target.addEventListener("targetFound", () => {
    detected = true;

    const art = artworks[index];

    title.innerText = art.name;
    description.innerText = art.desc;
  });

  target.addEventListener("targetLost", () => {
    setTimeout(() => {
      detected = false;
    }, 2000);

    title.innerText = "Scanning...";
    description.innerText = `Searching ${category} (set ${set})...`;
  });
}


// 🔄 AUTO SWITCH
function startAutoSwitch() {

  setTimeout(() => {

    if (!detected) {

      let nextSet = set + 1;
      if (nextSet > MAX_SETS) nextSet = 1;

      window.location.href =
        `?category=${category}&set=${nextSet}`;
    }

  }, SWITCH_TIME);
}


// 🚀 START
init();
