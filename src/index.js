const quoteListUl = document.querySelector("#quote-list")
// let quoteIdCounter = quotesArray.length.value
let quoteIdCounter = 12

const submitForm = document.querySelector("#new-quote-form")
// const onSubmit =
 submitForm.addEventListener("submit", function(event){ 
    event.preventDefault();
    const newQuote = document.querySelector("#new-quote").value
    const newAuthor = document.querySelector("#author").value
    const newQuoteObj = {
        "quote": newQuote,
        "author": newAuthor,
        "dataset-id": quoteIdCounter++
    }    
    renderNewQuote(newQuoteObj);
})

const renderQuote = (quotesArray) => {
    quotesArray.forEach(quoteObj => {
        let quoteLi = document.createElement("li");
        quoteLi.className = 'quote-card'
        quoteLi.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quoteObj.quote}</p>
        <footer class="blockquote-footer">${quoteObj.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
        `
        quoteListUl.append(quoteLi)
    })
}

const renderNewQuote = (newQuoteObj) => {
    let newQuoteLi = document.createElement("li");    
    newQuoteLi.className = 'quote-card'
    newQuoteLi.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${newQuoteObj["quote"]}</p>
        <footer class="blockquote-footer">${newQuoteObj["author"]}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
    `
    persistQuoteToDB(newQuoteLi, newQuoteObj["dataset-id"])
    quoteListUl.append(newQuoteLi)
 }

const persistQuoteToDB = (newQuoteLi, id) => {
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuoteLi),
      })
      .then(response => response.json())
      .then(persistedQuote => {
        //renderNewQuote(persistedQuote);
      })
}

const getQuotes = () => {
    fetch("http://localhost:3000/quotes?_embed=likes")
        .then(r => r.json())
        .then(renderQuote)
}

getQuotes()


