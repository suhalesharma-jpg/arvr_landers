console.log("JS IS RUNNING");

// Create video
const video = document.createElement("video");
video.autoplay = true;
video.muted = true;
video.playsInline = true;

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Button (required for camera)
const startBtn = document.createElement("button");
startBtn.innerText = "Start Camera";
document.body.appendChild(startBtn);

startBtn.onclick = async () => {
  console.log("Start button clicked");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    await video.play();
    console.log("Camera started");

    runDetection();

  } catch (err) {
    console.error("Camera error:", err);
  }
};

// MAIN LOOP
function runDetection() {
  setInterval(async () => {

    console.log("loop running");

    // Wait until video is ready
    if (!video.videoWidth || !video.videoHeight) {
      console.log("waiting for video...");
      return;
    }

    console.log("video width:", video.videoWidth);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw frame
    ctx.drawImage(video, 0, 0);

    // Convert to blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        console.log("blob is null");
        return;
      }

      console.log("sending frame");

      let form = new FormData();
      form.append("image", blob, "frame.jpg");

      try {
        let res = await fetch("/detect", {
          method: "POST",
          body: form
        });

        console.log("response status:", res.status);

        if (!res.ok) {
          console.log("backend error");
          return;
        }

        let detections = await res.json();
        console.log("detections:", detections);

        // DRAW BOXES
        ctx.lineWidth = 4;
        ctx.strokeStyle = "lime";
        ctx.font = "18px Arial";

        detections.forEach(det => {
          let [x1, y1, x2, y2] = det.bbox;

          ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);

          let text = det.class + " " + (det.conf * 100).toFixed(1) + "%";
          let textWidth = ctx.measureText(text).width;

          ctx.fillStyle = "lime";
          ctx.fillRect(x1, y1 - 25, textWidth + 10, 25);

          ctx.fillStyle = "black";
          ctx.fillText(text, x1 + 5, y1 - 5);
        });

      } catch (err) {
        console.error("fetch error:", err);
      }

    }, "image/jpeg");

  }, 300);
}
