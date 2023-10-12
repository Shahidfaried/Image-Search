const accessKey = "ER_FmiIjB7EANfkWeJ-iwmgAECRRRzmn5Qh6vqsYv5k"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results") //for class selector use dot
const showMore = document.getElementById("show-more-button") 

let inputData = "" //stores the input data from user 
let page = 1; // increase the page no. after the search 

async function searchImages(){ //async() is used for response and fetch
    inputData = inputEl.value; // it will hold the values from input 
    const url  = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`// on clicking the seach button the api will fetch images from the unsplash 

    const response = await fetch (url) //fetch images
    const data = await response.json() //json will hold the data 

    const results = data.results  //those json data will be stoed in result 

    if (page === 1){ // the front page as it is 
        searchResults.innerHTML = "" 

    }

    results.map((result) => { //above result have lot os data to show some data we simply map  and push them in container 
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add ("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html 
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        //we have to appent those upper elemnet in html page 

        imageLink.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
   });
   page++
   if(page > 1){ 
    showMore.style.display = "block"  //showMore button 
   }


}
//the search box will take any keyword and call the above function 

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages() //function call
})

showMore.addEventListener("click", () => {
    
    searchImages() //function call
})

