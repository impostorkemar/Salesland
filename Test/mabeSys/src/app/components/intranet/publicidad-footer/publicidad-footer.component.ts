import { Component } from '@angular/core';

@Component({
  selector: 'app-publicidad-footer',
  templateUrl: './publicidad-footer.component.html',
  styleUrls: ['./publicidad-footer.component.css']
})
export class PublicidadFooterComponent {
  adMessage = document.getElementById('ad-message');

  // Array con mensajes publicitarios
  messages = [
    "¡Oferta especial por tiempo limitado!"    
  ];
  
}
