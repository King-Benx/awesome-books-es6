import Book from './Book.js';
import { DateTime } from './luxon/src/luxon.js';

const dateSection = document.getElementById('date-time');
const tableBody = document.getElementById('table-body');
const addBooksSection = document.getElementById('add-books-section');
const contactSection = document.getElementById('contact-section');
const allBooksSection = document.getElementById('all-books-section');
const errorSection = document.getElementById('error-section');
const listLink = document.getElementById('list');
const newLink = document.getElementById('add-new');
const contactLink = document.getElementById('contact');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const addBookButton = document.getElementById('add');
const bookForm = document.getElementById('book-form');

setInterval(() => { dateSection.innerText = DateTime.now().toISO(); }, 1000);

const book = new Book();

const createTableRow = (id, title, author) => {
  const tableRow = document.createElement('tr');
  const tableData = document.createElement('td');
  tableData.innerText = `${title} by ${author}`;
  const tableDataOption = document.createElement('td');
  tableDataOption.className = 'action';
  const tableDataOptionButton = document.createElement('button');
  tableDataOptionButton.innerText = 'Remove';
  tableDataOptionButton.id = id;
  tableDataOptionButton.className = 'remove-book';
  tableDataOption.append(tableDataOptionButton);
  tableRow.append(tableData);
  tableRow.append(tableDataOption);
  tableBody.append(tableRow);
};

const hideAllContent = () => {
  allBooksSection.style.display = 'none';
  contactSection.style.display = 'none';
  addBooksSection.style.display = 'none';
  errorSection.style.display = 'none';
  listLink.style.color = 'black';
  newLink.style.color = 'black';
  contactLink.style.color = 'black';
  listLink.style.fontWeight = 'normal';
  newLink.style.fontWeight = 'normal';
  contactLink.style.fontWeight = 'normal';
};

const showList = () => {
  const listOfBooks = book.getListOfBooks();
  if (listOfBooks.length) {
    hideAllContent();
    for (let i = 0; i < listOfBooks.length; i += 1) {
      const { id, title, author } = listOfBooks[i];
      createTableRow(id, title, author);
    }
    allBooksSection.style.display = 'block';
  } else {
    hideAllContent();
    errorSection.style.display = 'block';
  }
  listLink.style.color = 'blue';
  listLink.style.fontWeight = 'bold';
};

const populateView = () => {
  bookForm.reset();
  tableBody.innerHTML = '';
  showList();
};

populateView();

listLink.addEventListener('click', () => {
  hideAllContent();
  populateView();
  listLink.style.color = 'blue';
  listLink.style.fontWeight = 'bold';
});

newLink.addEventListener('click', () => {
  hideAllContent();
  addBooksSection.style.display = 'block';
  newLink.style.color = 'blue';
  newLink.style.fontWeight = 'bold';
});

contactLink.addEventListener('click', () => {
  hideAllContent();
  contactSection.style.display = 'block';
  contactLink.style.color = 'blue';
  contactLink.style.fontWeight = 'bold';
});

addBookButton.addEventListener('click', (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  book.addBook(title, author);
  populateView();
  bookForm.reset();
});

document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove-book');
  if (target) {
    book.removeBook(target.id.toString());
    populateView();
  }
});
