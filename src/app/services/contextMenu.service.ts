import { BackgroundMessagingService } from './backgroundMessaging.service';

/**
 * Service for managing the browser extension's context menu.
 * Adds a "Highlight Inputs" menu item and handles its click events.
 */
export class ContextMenuService {
  /**
   * Constructs the ContextMenuService and sets up context menu listeners.
   * @param messagingService - Service for sending messages to content scripts.
   */
  constructor(private messagingService: BackgroundMessagingService) {
    // Create the context menu item when the extension is installed
    chrome.runtime.onInstalled.addListener(() => {
      chrome.contextMenus.create({
        id: 'highlight-inputs',
        title: 'Highlight Inputs',
        contexts: ['all'],
      });
    });

    // Listen for context menu item clicks and send highlight message
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (info.menuItemId === 'highlight-inputs' && tab?.id) {
        this.messagingService.sendHighlightMessage(tab.id);
      }
    });
  }
}
