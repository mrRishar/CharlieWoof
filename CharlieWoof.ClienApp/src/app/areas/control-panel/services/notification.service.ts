import { Injectable } from '@angular/core';

import { NotificationType } from '../../../enums/notification-type';

import { NotificationComponent } from '../components/notification/notification.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {

    constructor(private translateService: TranslateService) { }

    private messageContainer = {};

    private notificationComponent: NotificationComponent | null = null;

    public initialize(notificationComponent: NotificationComponent) {
        if (!this.notificationComponent) {
            this.notificationComponent = notificationComponent;
        }
    }

    public notify(notificationType: NotificationType, message: string) {
        if (this.notificationComponent) {
            this.loadMessages();
            this.notificationComponent.show(notificationType, this.messageContainer[message]);
        }
    }

    private loadMessages() {
        this.translateService.get('notificationMessage').subscribe(res => {
            this.messageContainer = res;
        });
    }
}
