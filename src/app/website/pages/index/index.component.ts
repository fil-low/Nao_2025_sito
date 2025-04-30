import { Component, ElementRef } from '@angular/core';
import Flickity from 'flickity';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  private flickityInstance: Flickity | undefined;
  components = [
    {"name": "Andrea", "color": "#FFED66", "image": "pietro.svg"},
    {"name": "Filippo", "link": "https://www.instagram.com/fillo.mv/","color": "#84A98C", "image": "pietro.svg"},
    {"name": "Alessandro", "link": "https://www.instagram.com/alessandro.sabbadinii/","color": "#FFFFEA", "image": "pietro.svg"},
    {"name": "Martin", "link": "https://www.instagram.com/fang.bruh/","color": "#61988E", "image": "pietro.svg"},
    {"name": "Eleonora", "link": "https://www.instagram.com/e.leonoraverri/","color": "#EABDA8", "image": "alessia.svg"},
    {"name": "Francesco", "link": "https://www.instagram.com/fra.cinque.0_0/", "color": "#E6E49F", "image": "pietro.svg"},
    {"name": "Giuseppe", "color": "#F1AB86", "image": "pietro.svg"},
    {"name": "Giovanni", "color": "#00CECB", "image": "pietro.svg"},
    {"name": "Mia", "color": "#00CECB", "image": "alessia.svg"},
  ]

  constructor(private el: ElementRef) {}


  ngAfterViewInit(): void {
    this.initFlickity();
  }

  private initFlickity(): void {
    const carouselElement: HTMLElement = this.el.nativeElement.querySelector('.main-carousel');

    // Initialize Flickity
    this.flickityInstance = new Flickity(carouselElement, {
      cellAlign: 'left',
      "contain": true,
      freeScroll: true,
      wrapAround: true,
      pageDots: false
    });
  }
}
