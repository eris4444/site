let port;
let baudRate = 115200;

document.getElementById("baudRate").addEventListener("change", function() {
    baudRate = parseInt(this.value);
});

document.getElementById("connectBtn").addEventListener("click", async () => {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate });
        logMessage("✅ اتصال برقرار شد با Baud Rate: " + baudRate);
        document.getElementById("flashBtn").disabled = false;
    } catch (err) {
        logMessage("❌ خطا در اتصال: " + err.message);
    }
});

document.getElementById("flashBtn").addEventListener("click", async () => {
    if (!port) {
        logMessage("⚠️ ابتدا به ESP متصل شوید!");
        return;
    }

    const fileInput = document.getElementById("firmwareFile");
    if (fileInput.files.length === 0) {
        logMessage("⚠️ لطفاً یک فایل فریمور انتخاب کنید!");
        return;
    }

    const file = fileInput.files[0];
    const data = new Uint8Array(await file.arrayBuffer());
    const writer = port.writable.getWriter();

    logMessage("📤 در حال ارسال فریمور...");

    try {
        await writer.write(data);
        logMessage("✅ فریمور با موفقیت ارسال شد!");
    } catch (err) {
        logMessage("❌ خطا در ارسال: