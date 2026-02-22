document.addEventListener("DOMContentLoaded", async () => {

  let monuments = [];
  let activeIndex = null;
  const audioElement = document.getElementById("audioPlayer");

  // ================= LOAD JSON =================
  try {
    const response = await fetch("monuments.json");
    monuments = await response.json();
    console.log("Monuments loaded:", monuments.length);
  } catch (error) {
    console.error("Failed to load monuments.json:", error);
    return;
  }

  // ================= INIT AR =================
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.querySelector("#ar-container"),
    imageTargetSrc: "./targets.mind?v=50"
  });

  const { renderer, scene, camera } = mindarThree;

  monuments.forEach((monument, index) => {

    const anchor = mindarThree.addAnchor(index);

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 0.6),
      new THREE.MeshBasicMaterial({
        color: monument.color || 0x00bcd4,
        transparent: true,
        opacity: 0.75
      })
    );

    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      console.log("Detected:", monument.title);
      activeIndex = index;
      showInfo(monument);
    };

    anchor.onTargetLost = () => {
      console.log("Lost:", monument.title);
      resetState();
    };
  });

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });

  // ================= SHOW INFO =================
  function showInfo(monument) {

    document.getElementById("title").innerText = monument.title;
    document.getElementById("description").innerText = monument.description;

    const list = document.getElementById("details");
    list.innerHTML = "";

    monument.details.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      list.appendChild(li);
    });

    document.getElementById("infoPanel").classList.add("active");
  }

  // ================= RESET =================
  function resetState() {
    document.getElementById("infoPanel").classList.remove("active");
    audioElement.pause();
    audioElement.currentTime = 0;
    activeIndex = null;
  }

  // ================= AUDIO =================
  document.getElementById("audioBtn").addEventListener("click", () => {

    if (activeIndex === null) return;

    const monument = monuments[activeIndex];
    if (!monument.audio) return;

    audioElement.src = monument.audio;
    audioElement.load();
    audioElement.play().catch(err => console.log("Audio error:", err));
  });

});
