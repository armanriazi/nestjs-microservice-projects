export class CreateTransitionOrder {
  bookname: string;
  bookstateType = 1;
  id = '0';
  constructor(bookname: string) {
    this.bookname = bookname;
  }
}
