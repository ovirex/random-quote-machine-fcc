document.addEventListener("DOMContentLoaded", function () {
    let newQuoteBtn = document.getElementById("new-quote");
    let tweetBtn = document.getElementById("tweet-quote");

    fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
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
    let tweetBtn = document.getElementById("tweet-quote");
    let randomNumber = 0;

    randomNumber = getRandomArbitrary(0, data["quotes"].length);
    console.log(randomNumber);

    let quotesData = data["quotes"][randomNumber];

    quoteElement.innerText = `"${quotesData["quote"]}"`;
    authorElement.innerText = `-${quotesData["author"]}`;
}

function tweetQuote(quote, author) {
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
