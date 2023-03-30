let startTime;
let stopwatch = document.getElementById("stopwatch");
let intervalId;

function startStopwatch() {
  startTime = Date.now();
  intervalId = setInterval(updateStopwatch, 10);
}

function updateStopwatch() {
  let elapsedTime = Date.now() - startTime;
  stopwatch.innerHTML = 'Time:' + (elapsedTime / 1000).toFixed(3);
}

function stopStopwatch() {
  clearInterval(intervalId);
}
// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  const arr = [];
  for (let i = 1; i <= count / 2; i++) {
    arr.push(i, i);
  }
  return arr;
  }

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
  }
// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
  const pairsArray = createNumbersArray(count); // Генерируем парные числа
  const shuffledArray = shuffle(pairsArray); // Перемешиваем массив
  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("container-cards")

  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.classList.add('card');
    card.dataset.number = shuffledArray[i];
    card.textContent = card.dataset.number;
    cardsContainer.appendChild(card);
  }
  return cardsContainer;
  }

  document.addEventListener('DOMContentLoaded', function() {

    const timerBtn = document.querySelector('.timer-btn');
    const timerBtnAgain = document.querySelector('.timer-btn-again-close');

    let timerHdr = document.querySelector('.timer-hdr');

    let numberOfCards = 16;// колличество карт
    let guessedCards = 0;// колличество угаданных карт

    const cardsContainer = startGame(numberOfCards);
    document.body.appendChild(cardsContainer);

    let firstCard = null; // первая открытая карта
    let secondCard = null; // вторая открытая карта

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('card-close');// закрываем карты пока не началась игра
    });


    timerBtn.addEventListener('click', ()=>{//запускаем таймер по нажатию на кнопку
      document.querySelector('.timer-hdr').classList.remove('timer-hdr-anim')
      timerHdr.textContent = 'Go! Go! Go!';
      cards.forEach(card => {
        card.classList.remove('card-close');
      });
      startStopwatch();
      timerBtn.classList.add('timer-btn-off');
    })

    timerBtnAgain.addEventListener('click', ()=>{// запускаем игру заново
      this.location.reload();
    })

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        if(card !== firstCard && card !== secondCard) {
          if (!firstCard) {
            // если это первая открытая карта
            firstCard = card;
            card.classList.add('card-open');
          } else if (!secondCard) {
            // если это вторая открытая карта
            secondCard = card;
            card.classList.add('card-open');

            // проверяем, совпадают ли номера карт
            if (firstCard.dataset.number === secondCard.dataset.number) {
              // если совпадают, устанавливаем класс card-win для каждой карты
              firstCard.classList.add('card-win');
              secondCard.classList.add('card-win');
              guessedCards += 2;
              if (numberOfCards === guessedCards) {
                stopStopwatch()
                timerHdr.textContent = 'Victory!';
                timerBtnAgain.classList.add('timer-btn-again-open');
              }

              // обнуляем значения переменных, чтобы начать новую игру
              firstCard = null;
              secondCard = null;
            } else {
              // если не совпадают, добавляем задержку, чтобы игрок мог увидеть обе карты перед тем, как они перевернутся обратно
              setTimeout(() => {
                firstCard.classList.remove('card-open');
                secondCard.classList.remove('card-open');
                // обнуляем значения переменных, чтобы начать новую игру
                firstCard = null;
                secondCard = null;
              }, 700);
            }
          }
        }
      });
    });
  });


