/// <reference types="chrome" />
import { FormStorageService } from '../services/formStorage.service';
import { ContextMenuService } from '../services/contextMenu.service';
import { BackgroundMessagingService } from '../services/backgroundMessaging.service';

console.log('Background script running...');

const formStorage = new FormStorageService();
const messagingService = new BackgroundMessagingService(formStorage);
const contextMenuService = new ContextMenuService(messagingService);
