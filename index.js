const BASE_URL="/msgIndex.html",MAX_CRUSHES=50,
createNewElement=async()=>{

  if(document.getElementById("mehboobas").childElementCount>=10)
  {
    alert("No more crushes allowed!");
    return
  }
  var h=[...document.getElementsByClassName("mehbooba")].map(a=>a.value.trim());
  var a=document.createElement("div");
  var am = (CryptoJS.AES.decrypt(h[0], "123NSA")).toString(CryptoJS.enc.Utf8).trim();
  var u = await openpgp.readMessage({armoredMessage: am});
  pk=await openpgp.readPrivateKey({armoredKey: document.getElementById("aashiq").value.trim()});
  var pArray = [pk]
  var decryptedLocal = await openpgp.decrypt({
    message: u,
    decryptionKeys: pArray,
    format: "armored",
    config: { allowInsecureDecryptionWithSigningKeys: true }
  });
  a.setAttribute("class","row mehbooba-row"),a.innerHTML=`
    <div class="card text-bg-light mb-3 mehbooba-nopad">
    <div class="card-header">
    ${h[0].substr(0, 16) + '...'}
    </div>
    <div class="card-body">
    <p class="font-monospace ">${decryptedLocal.data.toString()}</p>
    </div>
    </div>`,document.getElementById("mehboobas").prepend(a)
};

fetchUserName=()=>document.getElementById("aashiq").value.trim();
fetchCrushNames=()=>[...document.getElementsByClassName("mehbooba")].map(a=>a.value.trim());
encryptWithAES=a=>CryptoJS.AES.encrypt(a,"123NSA").toString();
generateURL=async()=>{
  // stuff below not really necessary
  // let a=fetchUserName();
  // c=fetchCrushNames();
  // d=await openpgp.createMessage({text:a});
  // start here
  if (document.getElementById("aashiq").value == "") {
    e=await openpgp.generateKey({userIDs:{name: 'Joe Blow'}});
    p=e.privateKey;
    f=encodeURIComponent(encryptWithAES(e.publicKey));
    document.getElementById("aashiq").value = p.trim();
  } else {
    p=await openpgp.readKey({armoredKey: document.getElementById("aashiq").value.trim()});
    f=encodeURIComponent(encryptWithAES(p.toPublic().armor()))
  }
  b=window.location.href+"msgIndex.html"+`?hash=${f}`;
  document.getElementById("finalURL").innerHTML=`
  <div class="col card text-bg-light mb-3">
    <div class="card-body">
    <button class="btn btn-primary clippy-button card-title cpbtn" type="button" id="button-addon2" data-clipboard-action="copy" 
    data-clipboard-target="#finalURL"><img class="invert" src="assets/images/clippy.svg" width="13" alt="Copy to clipboard"></button>
    <a href=${b} id="disclaimer-links" target="_blank" rel="noopener noreferrer">${b}</a></div>
    </div>`;
  document.getElementById("generateURL-block").innerHTML=`
  <div class="btn-group" role="group">
  <button type="button" id="generateURL" class="btn btn-warning btn-lg" onclick="generateURL();">
  Regenerate Private Key</button>
  <button class="btn btn-info btn-lg dropdown" type="button" data-bs-toggle="collapse" data-bs-target="#finalURLCollapse" aria-expanded="true">
  <span class="text-collapsed">Expand</span>
  <span class="text-expanded">Hide</span>
  </button>
  </div>`;
};

function clearPrivateKey()
{
    document.getElementById("aashiq").value='';
};

var clipboard = new ClipboardJS('.cpbtn');
