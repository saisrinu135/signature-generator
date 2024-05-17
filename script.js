canvas = document.querySelector("canvas")
downloadBtn = document.querySelector("#download-btn")
clearBtn = document.querySelector("#clear-btn")
userName = document.querySelector("input").value


ctn = canvas.getContext("2d")


let isDrawing = false;
let lastX = 0;
let lastY = 0;

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
    };
}

function draw(e) {
    if (!isDrawing) return;

    const { x, y } = getMousePos(e);

    ctn.beginPath();
    ctn.moveTo(lastX, lastY);
    ctn.lineTo(x, y);
    ctn.linewidth = 10;


    ctn.stroke()

    lastX = x;
    lastY = y;
}

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    const { x, y } = getMousePos(e);
    lastX = x;
    lastY = y;
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));




clearBtn.addEventListener("click", () => {
    ctn.clearRect(0, 0, canvas.width, canvas.height)
});

downloadBtn.addEventListener("click", () => {
    const img = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = img
    link.download = `${userName}.png`
    link.click()
})