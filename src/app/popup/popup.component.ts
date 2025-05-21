import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  darkMode = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.themeService.getDarkMode().then((value) => {
      this.darkMode = value;
    });
  }

  toggleDarkMode() {
    this.themeService.setDarkMode(!this.darkMode);
    this.darkMode = !this.darkMode;
  }
}
