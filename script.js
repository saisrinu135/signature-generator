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



function getTouchPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
    };
}

function touchDraw(e) {
    if (!isDrawing) return;
    const { x, y } = getTouchPos(e);

    ctn.beginPath();
    ctn.moveTo(lastX, lastY);
    ctn.lintTo(x, y);
    ctn.stroke();

    lastX = x;
    lastY = y;
}


canvas.addEventListener("touchstart", (e) => {
    isDrawing = true;
    const { x, y } = getTouchPos(t);
    lastX = x;
    lastY = y;

    }
)

canvas.addEventListener("touchmove", touchDraw, {passive: false});
canvas.addEventListener("touchend", () => (isDrawing = false));
canvas.addEventListener("touchcancel", () => (isDrawing = false));



clearBtn.addEventListener("click", () => {
    ctn.clearRect(0, 0, canvas.width, canvas.height)
});

downloadBtn.addEventListener("click", () => {
    const img = canvas.toDataURL("signature/png")
    const link = document.createElement("a")
    link.href = img
    link.download = `image.png`
    link.click()
})