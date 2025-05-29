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
    {"name": "Andrea", "color": "#40E0D0", "image": "pietro.svg"},
    {"name": "Filippo", "link": "https://www.instagram.com/fillo.mv/","color": "#FFD700", "image": "pietro.svg"},
    {"name": "Alessandro", "link": "https://www.instagram.com/alessandro.sabbadinii/","color": "#32CD32", "image": "pietro.svg"},
    {"name": "Martin", "link": "https://www.instagram.com/fang.bruh/","color": "#2A3D66", "image": "pietro.svg"},
    {"name": "Eleonora", "link": "https://www.instagram.com/e.leonoraverri/","color": "#FF6F61", "image": "alessia.svg"},
    {"name": "Francesco", "link": "https://www.instagram.com/fra.cinque.0_0/", "color": "#3EB489", "image": "pietro.svg"},
    {"name": "Giuseppe", "color": "#3B5249", "image": "pietro.svg"},
    {"name": "Gama", "color": "#6593B4", "image": "pietro.svg"},
    {"name": "Giovanni", "color": "#FF7F50", "image": "pietro.svg"},
    {"name": "Mia", "color": "#E6E6FA", "image": "alessia.svg"},
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
