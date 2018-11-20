import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Book } from '../../book.model';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  books: Book[];
  columns = ['title', 'author', 'status', 'actions'];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.bookService
      .getBooks()
      .subscribe((data: Book[]) => {
        this.books = data;
        console.log('Data requested ...');
        console.log(this.books);
      });
  }

  editBook(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteBook(id) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.fetchBooks();
    });
  }

}
