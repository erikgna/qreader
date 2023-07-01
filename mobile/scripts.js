document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("qr-reader-results");
  var lastResult,
    countResults = 0;

  function onScanSuccess(decodedText, decodedResult) {
    if (decodedText !== lastResult) {
      ++countResults;
      lastResult = decodedText.replace(" - 65", "");

      let timestamp = Math.floor(new Date().getTime() / 1000);
      var minutes = (timestamp - lastResult) / 60;
      if (timestamp > lastResult) {
        var money = parseFloat(((minutes / 60) * 5).toFixed(2));
        alert("QR Code expirado, deve pagar: R$ " + money);
        return;
      }
      alert("O QRCode não está vencido!");
      return;
    }
  }

  var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", {
    fps: 10,
    qrbox: 250,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  });
  html5QrcodeScanner.render(onScanSuccess);
});
