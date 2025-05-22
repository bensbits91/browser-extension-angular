import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { TabInfoService } from '../services/tabInfo.service';

declare const chrome: any;

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
  forms: any[] = [];

  constructor(
    private themeService: ThemeService,
    private tabInfoService: TabInfoService,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.themeService.getDarkMode().then((value) => {
      this.darkMode = value;
    });

    this.tabInfoService.getTabInfo().then((info) => {
      this.tabTitle = info.title;
      this.tabUrl = info.url;
    });

    chrome.runtime.sendMessage({ type: 'GET_FORMS' }, (response: any) => {
      this.ngZone.run(() => {
        this.forms = response?.forms || [];
      });
    });
  }

  toggleDarkMode() {
    this.themeService.setDarkMode(!this.darkMode);
    this.darkMode = !this.darkMode;
  }
}
