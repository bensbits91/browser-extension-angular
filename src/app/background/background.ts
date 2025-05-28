/// <reference types="chrome" />
import { FormStorageService } from '../services/formStorage.service';
import { ContextMenuService } from '../services/contextMenu.service';
import { BackgroundMessagingService } from '../services/backgroundMessaging.service';

// Main entry point for the extension's background service worker.
// Initializes storage, messaging, and context menu services.
try {
  const formStorage = new FormStorageService();
  const messagingService = new BackgroundMessagingService(formStorage);
  const contextMenuService = new ContextMenuService(messagingService);
} catch (error) {
  console.error('Error initializing background services:', error);
}
