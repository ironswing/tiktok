import {Component, OnInit} from '@angular/core';
import {Camera} from '@ionic-native/camera/ngx';
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {HttpClient} from '@angular/common/http';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-profile-edit',
    templateUrl: './profile-edit.page.html',
    styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

    imageSource;
    name;
    email;
    signature;
    baseUrl = ROOT_URL + 'storage';

    constructor(private router: Router, private transfer: FileTransfer, private http: HttpClient, private camera: Camera, public toastController: ToastController) {
    }

    ngOnInit() {
    }

    selectPictrue() {
        this.camera.getPicture({
            destinationType: this.camera.DestinationType.FILE_URI, mediaType:
            this.camera.MediaType.PICTURE, sourceType:
            this.camera.PictureSourceType.PHOTOLIBRARY
        }).then(res => {
            console.log(res);
            this.upload(res);
        });
    }

    upload(fileUri) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'test.jpg',
            mimeType: 'image/jpeg',
            headers: {}
        };

        fileTransfer.upload(fileUri, ROOT_URL + '/image/upload', options)
            .then((data) => {
                console.log(data);
                if (data['responseCode'] === 200) {
                    console.log(data['response']);
                    let res = JSON.parse(data['response']);
                    console.log(res);
                    if (res['code'] === 200) {
                        this.imageSource = res['data']['img'][0]['url'];
                        console.log(this.imageSource);
                    }
                }
                // success
            }, (err) => {
                console.log(err);
                console.log(err.body);
                // error
            });
    }

    saveProfile() {
        let params = {
            avatar: this.imageSource,
            name: this.name,
            email: this.email,
            signature: this.signature,
            cookie: localStorage.getItem('anshi_cookie')
        };
        console.log(params);
        this.http.post(ROOT_URL + 'user/profile/edit', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.goMine();
            };
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }


    goMine() {
        this.router.navigate(['/mine']).then(res => {
            console.log('mine');
        });
    }
}
