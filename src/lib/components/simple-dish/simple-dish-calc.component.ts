import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-simple-dish',
  templateUrl: './simple-dish-calc.component.html',
  styleUrls: ['./simple-dish-calc.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleDishCalcComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
