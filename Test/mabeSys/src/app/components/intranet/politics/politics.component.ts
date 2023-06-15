import { Component } from '@angular/core';

@Component({
  selector: 'app-politics',
  templateUrl: './politics.component.html',
  styleUrls: ['./politics.component.css']
})
export class PoliticsComponent {

  onCardHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.classList.toggle('hovered');
  }

}
