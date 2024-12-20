const accessKey = "7gBNG05ffCajhXM2HwXMkP6Lo3hCVGyFKqCeM6NzsjI"
const formEl = document.querySelector('form')
const inputEl = document.getElementById('search-input')
const searchResults = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button')

let inputData = ""
let page = 1;




/* ========subscribe====== */
let menuSubBtn = document.getElementById("menu-subscribe-btn");
let subInput = document.querySelector(".subscribe-input");
menuSubBtn.addEventListener("click",()=>{
    subInput.classList.toggle("display-form");
    });




async function searchImages() {
    inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-item");

        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement('a');
        //imageLink.href = '#';
        //imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        // Create Download Button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.classList.add('download-btn');  // Add a class for styling

        // Add Event Listener for Download
        downloadButton.addEventListener('click', async () => {
            const imageUrl = result.urls.full;
            const imageResponse = await fetch(imageUrl);
            const imageBlob = await imageResponse.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);

            // Create a temporary anchor element to trigger download
            const tempLink = document.createElement('a');
            tempLink.href = imageObjectURL;
            tempLink.download = result.alt_description || 'downloaded_image';  // Set filename
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        });

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(downloadButton);  // Append the download button

        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block";
    }
}

/* Event Listeners */
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    searchImages();
})





/* /////submiting Email/////////
const scriptURL = 'https://script.google.com/macros/s/AKfycbyNOraJWEFrd3iYjEPT1SpvSaQPtyc15K-R9Dotw4iqW64iZabZPBUwIXWUalDpLaEz0Q/exec'
        const form = document.forms['submit-to-google-sheet'];
        const msg = document.getElementById("subscribe-msg");

        form.addEventListener('submit', e => {
            e.preventDefault()
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    msg.style.scale = "1";
                    msg.style.opacity = "1";
                    msg.innerHTML = "Thanks For Subscribing!";
                    msg.style.background = "green "
                    setTimeout(()=>{
                        msg.style.scale = "0";
                        msg.style.opacity = "0"
                        msg.innerHTML = "";
                    },4000);
                    form.reset();
                })
                .catch(error => {
                    msg.style.scale = "1";
                    msg.style.opacity = "1";
                    msg.innerHTML = "Check you Connection";
                    msg.style.background = "red";
                    setTimeout(()=>{
                        msg.style.scale = "0";
                        msg.style.opacity = "0"
                        msg.innerHTML = "";
                    },3000);
                    console.error('Error!', error.message)
                });
        }); */