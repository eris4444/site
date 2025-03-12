let port;
let firmwareFile;

// عناصر DOM
const connectButton = document.getElementById('connect-button');
const uploadButton = document.getElementById('upload-button');
const firmwareInput = document.getElementById('firmware-file');
const logOutput = document.getElementById('log-output');

// افزودن لاگ به صفحه
function log(message) {
  logOutput.textContent += message + '\n';
  logOutput.scrollTop = logOutput.scrollHeight; // اسکرول به پایین
}

// اتصال به دستگاه
connectButton.addEventListener('click', async () => {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    log('Connected to device.');
    uploadButton.disabled = false;
  } catch (err) {
    log('Error connecting to device: ' + err.message);
  }
});

// انتخاب فایل فرمور
firmwareInput.addEventListener('change', (event) => {
  firmwareFile = event.target.files[0];
  log('Firmware file selected: ' + firmwareFile.name);
});

// آپلود فرمور
uploadButton.addEventListener('click', async () => {
  if (!port || !firmwareFile) {
    log('Please connect to a device and select a firmware file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const firmwareData = new Uint8Array(reader.result);
    const writer = port.writable.getWriter();

    try {
      log('Uploading firmware...');
      const chunkSize = 1024; // اندازه هر بسته داده
      let uploadedBytes = 0;

      for (let i = 0; i < firmwareData.length; i += chunkSize) {
        const chunk = firmwareData.slice(i, i + chunkSize);
        await writer.write(chunk);
        uploadedBytes += chunk.length;
        const progress = ((uploadedBytes / firmwareData.length) * 100).toFixed(2);
        log(`Uploaded: ${progress}%`);
      }

      log('Firmware uploaded successfully!');
    } catch (err) {
      log('Error uploading firmware: ' + err.message);
    } finally {
      writer.releaseLock();
    }
  };
  reader.readAsArrayBuffer(firmwareFile);
});
