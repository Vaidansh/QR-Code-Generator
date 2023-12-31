const qrFormEl = document.getElementById('qrForm');
const qrImageEl = document.getElementById('qrImage');
const qrContainerEl = document.getElementById('qrContainer');
const qrInputTextEl = document.getElementById('qrInputText');
const generateBtnEl = document.getElementById('generateBtn');


const renderQRCode = (url)=>{
    if(!url){
        return;
    }
    generateBtnEl.innerText="Generating QR Code...";
    qrImageEl.src = url;


    const onImageLoad = ()=>{
        const interval = setInterval(()=>{
            qrContainerEl.classList.add("show");
            clearInterval(interval);
            generateBtnEl.innerText = "Generate QR Code";
        },500);
    };

    qrImageEl.addEventListener('load',(onImageLoad));
}


qrFormEl.addEventListener("submit", (event)=>{
    const formData = new FormData(qrFormEl);
    const text = formData.get("qrText");

    if (!text.trim()) {
        alert("Please enter text to generate QR Code");
        generateBtnEl.innerText = "Enter text to generate QR Code";
        generateBtnEl.style.color = "red";
    } else {
        generateBtnEl.style.color = "white";
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text}`;
        renderQRCode(qrCodeUrl);
    }
    event.preventDefault();
});

qrInputTextEl.addEventListener("keyup",(event)=>{
    if(!qrInputTextEl.value.trim()){
        qrContainerEl.classList.remove("show");
    }
});