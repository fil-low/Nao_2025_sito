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
    {"name": "Pietro", "link": "https://www.instagram.com/pietro.peerani/", "color": "#FF5E5B", "image": "pietro.svg"},
    {"name": "Alessia", "color": "#FFED66", "image": "alessia.svg"},
    {"name": "Thomas", "color": "#00CECB", "image": "pietro.svg"},
    {"name": "Alice", "color": "#FFFFEA", "image": "alessia.svg"},
    {"name": "Andrea", "color": "#61988E", "image": "pietro.svg"},
    {"name": "Eleonora", "color": "#EABDA8", "image": "alessia.svg"},
    {"name": "Lorenzo", "color": "#D36135", "image": "pietro.svg"},
    {"name": "Matteo", "color": "#E6E49F", "image": "pietro.svg"},
    {"name": "Filippo", "link": "https://www.instagram.com/fillo.mv/","color": "#84A98C", "image": "pietro.svg"},
    {"name": "Giuseppe", "color": "#F1AB86", "image": "pietro.svg"},
    {"name": "Neri", "color": "#F7DBA7", "image": "pietro.svg"},
    {"name": "Andrea", "link": "https://www.instagram.com/andre.delgiu/", "color": "#DBD9DB", "image": "alessia.svg"},
    {"name": "Alessandro", "link": "https://www.instagram.com/aim.alle_/", "color": "#E7EFC5", "image": "pietro.svg"},
    {"name": "Ludovica", "link": "https://www.instagram.com/ludovica.valentee/", "color": "#F896D8", "image": "alessia.svg"},
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
