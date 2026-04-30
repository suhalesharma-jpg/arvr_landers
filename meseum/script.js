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

// ===== LOAD MODEL =====
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
  const size = 320; // ✅ FIXED

  canvas.width = size;
  canvas.height = size;
  ctx.drawImage(video, 0, 0, size, size);

  const imageData = ctx.getImageData(0, 0, size, size);
  const { data } = imageData;

  const input = new Float32Array(3 * size * size);

  for (let i = 0; i < size * size; i++) {
    input[i] = data[i * 4] / 255;
    input[i + size * size] = data[i * 4 + 1] / 255;
    input[i + 2 * size * size] = data[i * 4 + 2] / 255;
  }

  return new ort.Tensor("float32", input, [1, 3, size, size]);
}

// ===== YOLO OUTPUT DECODER =====
function processYOLOOutput(output, threshold = 0.4) {
  const data = output.data;
  const dims = output.dims;

  console.log("Output shape:", dims);

  let boxes = [];

  // Handle YOLOv8 format: [1, 84, 8400]
  if (dims.length === 3 && dims[1] === 84) {
    const numPred = dims[2];

    for (let i = 0; i < numPred; i++) {
      const x = data[i];
      const y = data[i + numPred];
      const w = data[i + numPred * 2];
      const h = data[i + numPred * 3];
      const objConf = data[i + numPred * 4];

      if (objConf < threshold) continue;

      // class scores
      let maxClass = 0;
      let maxScore = 0;

      for (let c = 5; c < 84; c++) {
        let score = data[i + numPred * c];
        if (score > maxScore) {
          maxScore = score;
          maxClass = c - 5;
        }
      }

      boxes.push({
        x, y, w, h,
        conf: objConf,
        classId: maxClass
      });
    }
  }

  return boxes;
}

// ===== MAIN LOOP =====
function runDetection() {
  setInterval(async () => {

    if (!video.videoWidth) return;

    // Draw camera
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    if (!session) {
      ctx.fillStyle = "red";
      ctx.fillText("Loading model...", 20, 30);
      return;
    }

    try {
      const tensor = preprocess();
      const results = await session.run({ images: tensor });

      const output = Object.values(results)[0];

      const boxes = processYOLOOutput(output, 0.4);

      // Draw detections
      ctx.strokeStyle = "lime";
      ctx.lineWidth = 2;
      ctx.font = "14px Arial";

      boxes.forEach(box => {
        let x1 = box.x - box.w / 2;
        let y1 = box.y - box.h / 2;

        ctx.strokeRect(x1, y1, box.w, box.h);

        ctx.fillStyle = "lime";
        ctx.fillText(
          `ID:${box.classId} ${(box.conf * 100).toFixed(1)}%`,
          x1,
          y1 - 5
        );
      });

    } catch (err) {
      console.error("Detection error:", err);
    }

  }, 500);
}
