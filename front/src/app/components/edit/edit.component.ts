import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { BookService } from '../../book.service';
// import { Book } from '../../book.model';
interface EnumStatus {
  value: String;
  viewValue: String;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id: String;
  book: any = {};
  updateForm: FormGroup;
  statuses: EnumStatus[] = [
    { value: 'Available', viewValue: 'Available' },
    { value: 'Transfer', viewValue: 'Transfer' },
    { value: 'Out of stock', viewValue: 'Out of stock' }
  ];

  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      author: '',
      status: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.bookService.getBookById(this.id).subscribe(res => {
        this.book = res;
        this.updateForm.get('title').setValue(this.book.title);
        this.updateForm.get('author').setValue(this.book.author);
        this.updateForm.get('status').setValue(this.book.status);
      });
    });
  }

  updateBook(title, author, status) {
    if (status === undefined) {
      status = this.book.status;
    }
    this.bookService.updateBook(this.id, title, author, status).subscribe(() => {
      this.router.navigate(['list', 'create']);
      this.snackBar.open('Book updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
