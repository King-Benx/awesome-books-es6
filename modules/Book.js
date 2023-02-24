class Book {
  constructor() {
    const storedData = JSON.parse(localStorage.getItem('awesome-books-es6'));
    if (storedData && storedData.length) {
      if (['id', 'author', 'title'].every((it) => Object.keys(storedData[0]).includes(it))) {
        this.listOfBooks = storedData;
      } else {
        localStorage.clear();
        this.listOfBooks = [];
      }
    } else {
      this.listOfBooks = [];
    }
  }

  updateList() {
    this.listOfBooks = JSON.parse(localStorage.getItem('awesome-books-es6'));
  }

  updateStorage(items) {
    localStorage.setItem('awesome-books-es6', JSON.stringify(items));
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
export default Book;