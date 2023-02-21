class Book {
  constructor() {
    this.listOfBooks = JSON.parse(localStorage.getItem('data')) || [];
  }

  updateList() {
    this.listOfBooks = JSON.parse(localStorage.getItem('data'));
  }

  updateStorage(items) {
    localStorage.setItem('data', JSON.stringify(items));
    this.updateList();
  }

  addBook(title, author) {
    const allBooks = this.listOfBooks;
    const updatedData = [
      ...allBooks,
      { id: Math.floor(Math.random() * 100) + 1, title, author },
    ];
    this.updateStorage(updatedData);
  }

  removeBook(id) {
    const allBooks = this.listOfBooks;
    const updatedData = allBooks.filter((book) => book.id.toString() !== id);
    this.updateStorage(updatedData);
  }

  getListOfBooks() {
    return this.listOfBooks;
  }
}

const book = new Book();
export default book;