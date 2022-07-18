// const fetchUserName = () => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString)
//     const user_name = decodeURIComponent(urlParams.get("name"))

//     document.getElementById("aashiq").textContent = user_name
// }
// fetchUserName();

const decryptWithAES = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, "123NSA");
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

const processURL = async () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const hash = urlParams.get("hash")
  // const aashiq = decodeURIComponent(urlParams.get("name"))
  const decryptedHash = decryptWithAES(decodeURIComponent(hash))

  const inputName = document.getElementById("mehbooba").value.trim();

  const publicKey = await openpgp.readKey({
    armoredKey: decryptedHash,
  });

  d = await openpgp.createMessage({text:inputName})
  g = await openpgp.encrypt({
    message: d,
    encryptionKeys: publicKey,
    format: "armored",
  });
  b = CryptoJS.AES.encrypt(g,"123NSA").toString();
  l =
    "https://" +
    window.location.hostname +
    "/index.html" +
    `?message=${b}` +
    `&pubkey=${encodeURIComponent(hash)}`;
  document.getElementById(
    "finalURL"
  ).innerHTML = `<div class="card text-bg-light mb-3" style="max-width: 30rem;">
  <div class="card-body">
  <button class="btn btn-primary clippy-button card-title" type="button" id="button-addon2" data-clipboard-action="copy" 
  data-clipboard-target="#finalURL"><img class="invert" src="assets/images/clippy.svg" width="13" alt="Copy to clipboard"></button>
    <p class="font-monospace">${b}</p></div>
    </div>`;
  // document.getElementById("answer").textContent = "YOU MATCHED! 🎉🎉🎉"

  // catch {
  //     document.getElementById("answer").textContent = "SORRY NOPE! 😭😭😭"
  // }
  // try {
  //     await openpgp.decrypt({
  //         message: encryptedMessage,
  //         passwords: [inputName],
  //         format: 'text'
  //     });
  //     document.getElementById("answer").textContent = "YOU MATCHED! 🎉🎉🎉"
  // }
  // catch {
  //     document.getElementById("answer").textContent = "SORRY NOPE! 😭😭😭"
  // }
};

var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);
});

clipboard.on('error', function (e) {
  console.log(e);
});