import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[rstSetDishComment]'
})
export class SetDishCommentDirective {
  @Input() comment:any;
  @Input() dish:any;

  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  @HostListener('click') onClick() {
    this.setComment();
  }

  constructor(private cartService:NgRestoCartService) { }

  setComment(){
    this.cartService.setDishComment(this.dish.id,this.comment).subscribe(
      res=>this.success.emit(true),
      err=>this.error.emit(err)
    )


  }

}
