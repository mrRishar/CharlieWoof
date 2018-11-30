import { Component } from '@angular/core';

import { NotificationType } from '../../../../enums/notification-type';

@Component({
    selector: 'apl-notification-message',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    public message = '';
    public notificationType: NotificationType = NotificationType.Success;

    public visible = false;

    public successNotificatioType = NotificationType.Success;
    public errorNotificatioType = NotificationType.Error;

    public show(notificationType: NotificationType, message: string) {
        this.message = message;
        this.notificationType = notificationType;
        this.visible = true;

        setTimeout(() => {
            this.visible = false;
        }, 5000);
    }
}
