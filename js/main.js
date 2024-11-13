var quotes = [
    {
        quote: "The only limit to our realization of tomorrow is our doubts of today.",
        author: "Franklin D. Roosevelt",
        imgUrl: "./images/Franklin-D.Roosevelt.jpg",
    },
    { 
        quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
        author: "Martin Luther King Jr.",
        imgUrl: "./images/martin-luther-king-jr.webp",
    },
    { 
        quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
        author: "Ralph Waldo Emerson",
        imgUrl: "./images/Ralph Waldo.jpeg"
    },
    { 
        quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson",
        imgUrl: "./images/Ralph Waldo.jpeg" 
    },
    { 
        quote: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
        author: "Charles Darwin",
        imgUrl: "./images/Charles_Darwin.jpg" 
    },
    { 
        quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill",
        imgUrl: "./images/Winston-Churchill.webp" 
    },
    { 
        quote: "Divide Each Difficulty into as Many Parts as Is Feasible and Necessary to Resolve It.",
        author: "René Descartes",
        imgUrl: "./images/Descarte-Rene.jpg" 
    },
    { 
        quote: "By all means, marry If you get a good wife, you 'll become happy if you get a bad one you 'll become a philosopher.",
        author: "Socrates",
        imgUrl: "./images/Socrates.jpg" 
    },
    {
        quote: "The greatest use of a life is to spend it on something that will outlast it. ",
        author: "william james",
        imgUrl: "./images/William_James.jpg"
    },
    {
        quote: "The most important thing is to enjoy your life - to be happy - its all that matters.",
        author:"Audrey Hepburn",
        imgUrl: "./images/Audrey_Hepburn.jpg"
    },
    {
        quote: "Nobody made a greater mistake than he who did nothing because he could do only a little.",
        author: "Edmund Burke",
        imgUrl: "./images/Edmund- Burke.jfif"
    }
];

var quoteGenerator = document.getElementById("quote-generate")
var paragraph = document.getElementById("quote-text-tex");
var author = document.getElementById("author-text");
var image = document.querySelector(".image img");
var heartIcon = document.getElementById("heart");
var bookMarkIcon = document.getElementById("bookmark");
var modalBody = document.querySelector(".modal-body");
var copyBtn = document.getElementById("copy");
var volumeBtn = document.getElementById("volume");

var prevRandom;
var RandomNum;
var savedQuotes = []; 

window.onload = getRandomNum();

if(localStorage.getItem("quotes")){
    savedQuotes = JSON.parse(localStorage.getItem("quotes")) ;
    updateModal()
}

function getRandomNum(){

    do {
        RandomNum = Math.floor(Math.random() * quotes.length);
    } while (RandomNum === prevRandom);

    quoteGenerator.innerHTML =`
            <p id="quote-text-tex" class="mb-0">
                <i class="fa-solid fa-quote-left text-success"></i>
                ${quotes[RandomNum].quote}
                <i class="fa-solid fa-quote-right text-success"></i>
            </p>
            <div
                class="quote-author d-flex justify-content-end align-items-center mt-4 column-gap-3"
            >
                <div class="image">
                    <img src="${quotes[RandomNum].imgUrl}" alt="author" />
                </div>
                <span id="author-text" class="fw-bold opacity-75 fst-italic"
                >${quotes[RandomNum].author}</span
                >
            </div>
    ` 
    prevRandom = RandomNum;
    heartIcon.classList.remove("active");
    bookMarkIcon.classList.remove("active");
}

function updateModal(){
    modalBody.innerHTML = '';
    savedQuotes.forEach(function(quote) {
        modalBody.innerHTML += `
        <div
            class="modal-contents w-100 d-flex flex-column justify-content-center align-items-center border-bottom"
        >
            <p class="fs-6 text-start">
                ${quote.quote}
            </p>
            <span class="align-self-end">- ${quote.auth}</span>
        </div>
        `;
    });
}

function likeActive(){
    heartIcon.classList.toggle("active");
};

copyBtn.addEventListener("click", function(){
    var quoteText = quotes[RandomNum].quote;
    navigator.clipboard.writeText(quoteText);
});

volumeBtn.addEventListener("click", () => {
    let say = new SpeechSynthesisUtterance(`${quotes[RandomNum].quote} by ${quotes[RandomNum].author}`);
    speechSynthesis.speak(say);
});

function saveQuotes() {
    var quoteText = {
        quote: quotes[RandomNum].quote,
        auth: quotes[RandomNum].author
    };
    var quoteIndex = -1;

    for(var i = 0; i < savedQuotes.length; i++){
        if(savedQuotes[i].quote === quoteText.quote && savedQuotes[i].auth === quoteText.auth){
            quoteIndex = i; 
            break; 
        }
    }

    if (quoteIndex !== -1) {
        savedQuotes.splice(quoteIndex, 1);
        bookMarkIcon.classList.remove("active");
    } else {
        savedQuotes.push(quoteText);
        bookMarkIcon.classList.add("active");
    }

    localStorage.setItem("quotes", JSON.stringify(savedQuotes));

    updateModal();
}

function deleteModal(){
    savedQuotes = [];
    localStorage.clear(savedQuotes);
    bookMarkIcon.classList.remove("active");
    heartIcon.classList.remove("active");
    updateModal()
}

