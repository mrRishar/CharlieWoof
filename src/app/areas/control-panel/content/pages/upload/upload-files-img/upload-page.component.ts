import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadDataService } from '../services/upload.services';
import { ValidationService } from '../../../../../services/validation-service';
import { NotificationService } from '../../../../services/notification.service';
import { NotificationType } from '../../../../../../enums/notification-type';
import { Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


// import { EnumDataService } from '../../../../services/enum.data.service';
// import { EnumNames } from '../../../../constants/enum-names';
// import { VacanciesDataService } from '../../../vacancies/services/vacancies-data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalService } from '../../../../../public/content/pages/components/notifications/services/modal.service';
import { AuthenticationService } from '../../../../../../core/auth/authentication.service';
// import 'rxjs/add/observable/forkJoin';

@Component({
    templateUrl: './upload-page.component.html',
    styleUrls: ['./upload-page.component.scss']
})
export class UploadComponent implements OnInit {
    public setStageModalVisible = false;
    public selectedRadio = 0;
    private subscription: Subscription = new Subscription();
    public submitted = false;
    public id = 0;
    public name: string = '';
    public fileOrImg: number = 0;

    public file: File = null;

    public uploadFrom: FormGroup = new FormGroup({
        'id': new FormControl(''),
        'name': new FormControl('', Validators.required),
        'photoUrl': new FormControl('', Validators.required),
        'fileOrImg': new FormControl('', Validators.required),
    });


    public progress: number;
    public message: string;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onUploadFinished = new EventEmitter();
    header = new HttpHeaders(
        {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });

    constructor(
        private authService: AuthenticationService,
        private uploadDataService: UploadDataService,
        private activeRoute: ActivatedRoute,
        public validationService: ValidationService,
        private router: Router,
        private modalService: ModalService,
        private notificationService: NotificationService
    ) {

        this.subscription = activeRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
    }

    public radioChange(event) {
        this.selectedRadio = event.target.value;
    }

    public uploadFile = (files) => {
        this.file = files.item(0);
        if (files.length === 0) {
            return;
        }

        const fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.uploadDataService.uploadPhotoUser(this.name, formData, this.selectedRadio).subscribe(event => {
            this.name = '';
            this.selectedRadio = 2;
            if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event.type === HttpEventType.Response) {
                this.message = 'Upload success.';
                this.onUploadFinished.emit(event.body);
                this.openModalClick(event, 'custom-modal-1');

            }
        }, error => {
            if (error.status === 400) {
                this.notificationService.notify(NotificationType.Error, 'candidateChangeStatusError');
            }
            if (error.status === 401) {
                this.authService.logout(true);
            }
        });
    }

    public openModalClick($event, id) {
        this.modalService.open(id);
    }

    public closeModal(id: string) {
        this.modalService.close(id);
    }
}

  // handleFileInput(file: FileList) {
    //     this.file = file.item(0);

    //     // Show image preview
    //     const reader = new FileReader();
    //     reader.onload = (event: any) => {
    //         this.imageUrl = event.target.result;
    //     }
    //     reader.readAsDataURL(this.file);
    // }

    // OnSubmit(Caption, Image) {
    //     this.uploadDataService.uploadPhotoUser(Caption.value, Image, 1).subscribe(
    //         data => {

    //             console.log('done');
    //             Caption.value = null;
    //             Image.value = null;
    //             this.imageUrl = "./../../../../../../assets/app/media/images/default-image.png";
    //         }
    //     );
    // }


//     onFileSelected(event) {
//         this.file = <File>event.target.files[0];
//         alert(this.selectedFile);
//     }

//     onUploaded() {
//         const formData = new FormData();
//         formData.append(this.name, this.selectedFile, this.selectedFile.name);
//         this.uploadDataService.uploadPhotoUser(this.selectedFile.name, this.selectedFile, 1).subscribe(
//             data => {

//             }
//         );
//     }
