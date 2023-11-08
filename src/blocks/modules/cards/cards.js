const DEFAULT_CARDS_NUMBER = 10;
const MAX_CARDS_NUMBER = 30;
const LOADING_CARDS_STEP = 5;
const AUTHORS_NAMES = ["Peter", "Eugenia", "Marina", "Segrey", "Nika"];
const TITLES = ["Forest", "Nature", "Rock", "Sea", "World"];

const randomIntFromInterval = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const fetchCards = async (startPosition, endPosition) => {
  const cards = await fetch("https://jsonplaceholder.typicode.com/posts")
    .then((responce) => {
      if (!responce.ok) {
        throw new Error("Cards not loaded!");
      }

      return responce.json();
    })
    .then((data) => {
      return data.slice(startPosition, endPosition).map(item => {
        const cardNumber = randomIntFromInterval(1, 10);
        const textItemNumber = randomIntFromInterval(0, 4);

        return {
          title: item.title,
          body: item.body,
          mainTitle: TITLES[textItemNumber],
          cardNumber: cardNumber,
          author: AUTHORS_NAMES[textItemNumber],
          dateTime: "July 24, 2019",
          date: "2019-07-24",
          fullPostLink: "/" 
        };
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return cards;
};

const composeCard = (cardData) => {
  const cardTemplate = document.getElementById("card-template");
  if(!cardTemplate) return;

  const card = cardTemplate.content.cloneNode(true);
  const { 
    title, 
    body, 
    mainTitle, 
    cardNumber, 
    author, 
    dateTime, 
    date, 
    fullPostLink 
  } = cardData;

  card.querySelector(".card__cover source").srcset = `img/cards/card-${cardNumber}.webp 1x, img/cards/card-${cardNumber}@2x.webp 2x`;
  card.querySelector(".card__cover img").src = `img/cards/card-${cardNumber}.jpg`;
  card.querySelector(".card__cover img").srcset = `img/cards/card-${cardNumber}@2x.jpg 2x`;
  card.querySelector(".card__title").innerText = mainTitle;
  card.querySelector(".card__lead").innerText = title;
  card.querySelector(".card__preview").innerText = body;
  card.querySelector(".card__info .card__author").innerText = author;
  card.querySelector(".card__info time").innerText = date;  
  card.querySelector(".card__info time").dateTime = dateTime;
  card.querySelector(".card__continue").href = fullPostLink;  

  return card;
};

const appendCard = (cardData) => {
  if (!cardData) return;

  const cardsList = document.querySelector(".cards__list");
  const cardNode = composeCard(cardData);

  if (!cardsList) return;
  cardsList.append(cardNode);
};

let currentVisibleCardsNumber = DEFAULT_CARDS_NUMBER;
let isLoading = false;
let shouldLoad = true;

const addNewCards = async () => {
  const loadMoreButton = document.querySelector(".cards__load-more");

  if (!loadMoreButton) return;

  loadMoreButton.addEventListener("click", async () => {
    if (isLoading || !shouldLoad) return;

    const topLimit = currentVisibleCardsNumber + LOADING_CARDS_STEP;
    isLoading = true;
    loadMoreButton.disabled = true;

    const cardsResponce = await fetchCards(currentVisibleCardsNumber, topLimit);

    cardsResponce.forEach(card => appendCard(card));

    currentVisibleCardsNumber = topLimit;
    shouldLoad = currentVisibleCardsNumber < MAX_CARDS_NUMBER;

    isLoading = false;
    loadMoreButton.disabled = !shouldLoad;
  });
};

addNewCards();