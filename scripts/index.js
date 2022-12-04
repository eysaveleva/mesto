//Создание переменных
const popup = document.querySelector('.popup');
console.log(popup.textContent)
const editBtn = document.querySelector('.profile__edit-btn');
console.log(editBtn.textContent)
const closeBtn = popup.querySelector('.popup__close-btn');
console.log(closeBtn.textContent)

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
let nameInput =  document.querySelector('.popup__input_name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_job'); // Воспользуйтесь инструментом .querySelector()

let profileTitle = document.querySelector('.profile__title');
console.log(profileTitle.textContent)
let profileSubtitle = document.querySelector('.profile__subtitle');
console.log(profileSubtitle.textContent)


// Объявление функций
function openPopup() {  //Открытие и добавление класса
  nameInput.value=profileTitle.textContent;
  jobInput.value=profileSubtitle.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() { //Закрытие
  popup.classList.remove('popup_opened');
}
console.log(nameInput.textContent)
console.log(nameInput.value)
function formSubmitHandler(evt) { // Получение внесенных значений
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

//Отслеживание событий и вызов функций
editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);