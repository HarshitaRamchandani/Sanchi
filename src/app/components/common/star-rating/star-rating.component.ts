import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input()
  rating!: number;
  stars: string[] = [];

  ngOnChanges() {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= this.rating) {
        this.stars.push('fa-star');
      } else if (i - 0.5 === this.rating) {
        this.stars.push('fa-star-half-alt');
      } else {
        this.stars.push('fa-star-o');
      }
    }
  }
}
