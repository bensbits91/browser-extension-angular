import { BackgroundMessagingService } from './backgroundMessaging.service';

export class ContextMenuService {
  constructor(private messagingService: BackgroundMessagingService) {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'highlight-forms',
        title: 'Highlight Forms',
        contexts: ['all'],
      });
    });

    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'highlight-forms' && tab?.id) {
        this.messagingService.sendHighlightMessage(tab.id);
      }
    });
  }
}
