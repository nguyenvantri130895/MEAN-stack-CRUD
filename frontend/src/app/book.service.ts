import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(`${this.uri}/books`);
  }

  getBookById(id) {
    return this.http.get(`${this.uri}/books/${id}`);
  }

  addBook(title, author) {
    const book = {
      title: title,
      author: author
    };
    return this.http.post(`${this.uri}/books/add`, book);
  }

  updateBook(id, title, author, status) {
    const book = {
      title: title,
      author: author,
      status: status
    };
    return this.http.post(`${this.uri}/books/update/${id}`, book);
  }

  deleteBook(id) {
    return this.http.get(`${this.uri}/books/delete/${id}`);
  }
}
