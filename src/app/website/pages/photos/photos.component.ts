import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  images: any = []
  page = 0;
  image_end = false
  isLoading = false
  isExpanded = {
    "show": false,
    "target": null
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadImages();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
      this.loadImages();
      this.page += 1
    }
  }

  loadImages() {
    if(this.image_end == false) {
      this.isLoading = true
      // ottengo i nomi delle immagini dal server
      this.http.post<any>("http://galileiisnao.it/php/infinity_scroll.php", {
        page: this.page,
        n_photos: 8
      }).subscribe(res => {
        if(res == null) {
          this.image_end = true
        }else{
          this.images = [...new Set([...this.images, ...res])];
        }
        this.isLoading = false
      })
    }
  }
}
