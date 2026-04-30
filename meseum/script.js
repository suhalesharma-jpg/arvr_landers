console.log("JS IS RUNNING");

// ===== VIDEO SETUP =====
const video = document.createElement("video");
video.autoplay = true;
video.muted = true;
video.playsInline = true;
video.style.width = "400px";
document.body.appendChild(video);

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Button
const startBtn = document.createElement("button");
startBtn.innerText = "Start Camera";
document.body.appendChild(startBtn);

// ===== MODEL =====
let session = null;

const MODEL_URL =
  "https://huggingface.co/suhalesharma34/arvr-model/resolve/main/my_model.onnx";

// Load model
async function loadModel() {
  console.log("Loading model...");
  try {
    session = await ort.InferenceSession.create(MODEL_URL);
    console.log("✅ Model loaded");
  } catch (err) {
    console.error("❌ Model load error:", err);
  }
}

// ===== START CAMERA =====
startBtn.onclick = async () => {
  console.log("Start button clicked");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    await video.play();
    console.log("Camera started");

    await loadModel();
    runDetection();

  } catch (err) {
    console.error("Camera error:", err);
  }
};

// ===== PREPROCESS =====
function preprocess() {
  const size = 640;

  // Resize frame to model input
  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(video, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const { data } = imageData;

  const input = new Float32Array(3 * size * size);

  for (let i = 0; i < size * size; i++) {
    input[i] = data[i * 4] / 255; // R
    input[i + size * size] = data[i * 4 + 1] / 255; // G
    input[i + 2 * size * size] = data[i * 4 + 2] / 255; // B
  }

  return new ort.Tensor("float32", input, [1, 3, size, size]);
}

// ===== MAIN LOOP =====
function runDetection() {
  setInterval(async () => {

    if (!video.videoWidth) return;

    // Draw live video frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    // If model not ready
    if (!session) {
      ctx.fillStyle = "red";
      ctx.font = "20px Arial";
      ctx.fillText("Loading model...", 20, 30);
      return;
    }

    try {
      const tensor = preprocess();

      const results = await session.run({ images: tensor });

      console.log("Raw output:", results);

      // ===== TEMP VISUAL (until decoding added) =====
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 4;
      ctx.strokeRect(50, 50, 200, 200);

      ctx.fillStyle = "lime";
      ctx.font = "20px Arial";
      ctx.fillText("DETECTED", 60, 45);

    } catch (err) {
      console.error("Detection error:", err);
    }

  }, 1000);
}
