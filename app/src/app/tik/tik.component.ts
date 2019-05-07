import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tik',
  templateUrl: './tik.component.html',
  styleUrls: ['./tik.component.scss'],
})
export class TikComponent implements OnInit {

    slideOpts = {
        initialSlide: 1,
        speed: 400,
        direction: 'vertical'
    };

    strUrl = 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4';
  constructor() { }

  ngOnInit() {}

}
