import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() theme = 'white'
  blackBg: boolean = false
  mobileMenu: boolean = false

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition > 300) {
      this.blackBg = true;
    } else {
      this.blackBg = false;
    }

    // da sistemare
    // if(this.mobileMenu == true) {
    //   document.body.style.overflowY = "hidden"
    // } else {
    //   document.body.style.overflowY = "scroll"
    // }
  }
}
