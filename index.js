document.addEventListener("DOMContentLoaded", function () {
    let newQuoteBtn = document.getElementById("new-quote");
    let tweetBtn = document.getElementById("tweet-quote");

    fetch("https://api.jsonbin.io/b/5ff32bad09f7c73f1b6d902c")
        .then((res) => res.json())
        .then((data) => {
            showNewQuote(data);
            newQuoteBtn.addEventListener("click", function () {
                showNewQuote(data);
            });
        });

    tweetBtn.addEventListener("click", () => tweetQuote());
});

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function showNewQuote(data) {
    let quoteElement = document.getElementById("text");
    let authorElement = document.getElementById("author");
    let authorImage = document.getElementById("author-img");
    let randomNumber = 0;

    randomNumber = getRandomArbitrary(0, data["quotes"].length);
    console.log(randomNumber);

    let quotesData = data["quotes"][randomNumber];

    if (quotesData["imgLink"] == "No link found.") {
        authorImage.backgroundImage = `url(https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg)`;
    } else {
        authorImage.style.backgroundImage = `url(${quotesData["imgLink"]})`;
        authorImage.title = `${quotesData["author"]}`;
    }
    quoteElement.innerText = `"${quotesData["quote"]}"`;
    authorElement.innerText = `-${quotesData["author"]}`;
}

function tweetQuote() {
    let quoteText = document.getElementById("text").innerText;
    let authorText = document
        .getElementById("author")
        .innerText.split("")
        .slice(1)
        .join("");
    let tweetLinkBtn = document.getElementById("tweet-quote");
    tweetLinkBtn.href += `?text=${quoteText} ${authorText}&hashtags=quotes`;
    console.log(tweetLinkBtn);
}
