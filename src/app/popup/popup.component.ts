import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { TabInfoService } from '../services/tabInfo.service';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  darkMode = false;
  tabTitle = '';
  tabUrl = '';

  constructor(
    private themeService: ThemeService,
    private tabInfoService: TabInfoService
  ) {}

  ngOnInit() {
    this.themeService.getDarkMode().then((value) => {
      this.darkMode = value;
    });

    this.tabInfoService.getTabInfo().then((info) => {
      this.tabTitle = info.title;
      this.tabUrl = info.url;
    });
  }

  toggleDarkMode() {
    this.themeService.setDarkMode(!this.darkMode);
    this.darkMode = !this.darkMode;
  }
}
