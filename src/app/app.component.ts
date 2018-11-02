import { Component, SimpleChanges } from '@angular/core';
import { DummyData } from "./data/dummyData";
import { TrailingInputItem } from './components/interfaces/trailing-input-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'playground';
  test = {};
  test2 = false;
  currentValue;
  dataSource: DummyData;

  toggleTest2() {
    this.test2 = !this.test2;
    console.log(this.test2);
  }
  constructor() {
    this.dataSource = new DummyData();
  }

  modelChanged(updatedObject: TrailingInputItem) {

  }

  generateValue() {
    this.currentValue = this.dataSource.fromDotNotation("Root 1.Root 1-1::Root 1-1-1");
  }
}
 