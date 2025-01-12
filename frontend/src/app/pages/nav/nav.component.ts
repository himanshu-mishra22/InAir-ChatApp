import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Location } from "@angular/common";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(private location: Location) {}
  logoUrl: string = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg";
  
  data =  JSON.parse(window.localStorage.getItem('joinRoom') || '{}');
  

  goBack(): void {
    this.location.back();
    window.localStorage.removeItem('joinRoom');
  }
  handleImageError(event: any): void {
    event.target.src = "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg";
  }
}
