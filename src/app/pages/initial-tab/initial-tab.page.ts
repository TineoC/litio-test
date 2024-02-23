import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-initial-tab',
  templateUrl: './initial-tab.page.html',
  styleUrls: ['./initial-tab.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InitialTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
