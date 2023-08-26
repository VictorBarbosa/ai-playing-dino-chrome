import { Component, OnInit, } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {

    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.keyCode == 32) {
        var box = document.getElementById("messageBox");
        if (box) {
          (box as any).style.visibility = "hidden";
        }
      }
    };

  }

  ngOnInit(): void { }

}
