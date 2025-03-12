let port;
let baudRate = 115200;

document.getElementById("baudRate").addEventListener("change", function() {
    baudRate = parseInt(this.value);
});

document.getElementById("connectBtn").addEventListener("click", async () => {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate });
        logMessage("✅ اتصال برقرار شد با Baud Rate: " + baudRate, "success");
        document.getElementById("flashBtn").classList.remove("disabled");
        document.getElementById("flashBtn").disabled = false;
    } catch (err) {
        logMessage("❌ خطا در اتصال: " + err.message, "error");
    }
});

document.getElementById("flashBtn").addEventListener("click", async () => {
    if (!port) {
        logMessage("⚠️ ابتدا به ESP متصل شوید!", "warning");
        return;
    }

    const fileInput = document.getElementById("firmwareFile");
    if (fileInput.files.length === 0) {
        logMessage("⚠️ لطفاً یک فایل فریمور انتخاب کنید!", "warning");
        return;
    }

    const file = fileInput.files[0];
    const data = new Uint8Array(await file.arrayBuffer());
    const writer = port.writable.getWriter();

    logMessage("📤 در حال ارسال فریمور...", "info");

    document.getElementById("flashBtn").classList.add("disabled");
    document.getElementById("flashBtn").disabled = true;

    try {
        await writer.write(data);
        logMessage("✅ فریمور با موفقیت ارسال شد!", "success");
    } catch (err) {
        logMessage("❌ خطا در ارسال: " + err.message, "error");
    } finally {
        writer.releaseLock();
        document.getElementById("flashBtn").classList.remove("disabled");
        document.getElementById("flashBtn").disabled = false;
    }
});

function logMessage(message, type = "info") {
    const logElement = document.getElementById("log");
    const logEntry = document.createElement("div");

    logEntry.textContent = message;
    logEntry.classList.add("log-" + type);
    logElement.appendChild(logEntry);

    logElement.scrollTop = logElement.scrollHeight;
}