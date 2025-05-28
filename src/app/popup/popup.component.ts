import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMessagingService } from '../services/inputMessaging.service';
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
  inputs: any[] = [];

  constructor(
    private inputMessaging: InputMessagingService,
    private themeService: ThemeService,
    private tabInfoService: TabInfoService // private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.themeService.getDarkMode().then((value) => {
      this.darkMode = value;
    });

    this.tabInfoService.getTabInfo().then((info) => {
      this.tabTitle = info.title;
      this.tabUrl = info.url;
    });

    this.inputMessaging.getInputs().then((inputs) => {
      this.inputs = inputs;
    });
  }

  toggleDarkMode() {
    this.themeService.setDarkMode(!this.darkMode);
    this.darkMode = !this.darkMode;
  }
}
