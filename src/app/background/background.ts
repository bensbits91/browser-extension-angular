// /// <reference types="chrome" />
import { InputStorageService } from '../services/inputStorage.service';
import { ContextMenuService } from '../services/contextMenu.service';
import { BackgroundMessagingService } from '../services/backgroundMessaging.service';

// // Initializes storage, messaging, and context menu services.
try {
  const inputStorage = new InputStorageService();
  const messagingService = new BackgroundMessagingService(inputStorage);
  const contextMenuService = new ContextMenuService(messagingService);
} catch (error) {
  console.error('Error initializing background services:', error);
}
