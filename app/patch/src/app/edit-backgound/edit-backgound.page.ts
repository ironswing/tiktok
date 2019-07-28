import {Component, Input, OnInit} from '@angular/core';
import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';
import {HttpClient} from '@angular/common/http';
import {ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Camera} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-edit-backgound',
  templateUrl: './edit-backgound.page.html',
  styleUrls: ['./edit-backgound.page.scss'],
})
export class EditBackgoundPage implements OnInit {

    upLoading;
    imgError = false;
    @Input() path: any;
    imageSource;

  constructor(private modalCtrl: ModalController,
              private router: Router,
              private transfer: FileTransfer,
              private http: HttpClient,
              private camera: Camera,
              public toastController: ToastController) { }

  ngOnInit() {
      console.log(this.path);
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
                        this.saveBackground();
                    }
                }
                // success
            }, (err) => {
                console.log(err);
                console.log(err.body);
                // error
            });
    }

    saveBackground() {
        let params = {
            background_image: this.imageSource,
            cookie: localStorage.getItem('anshi_cookie')
        };
        console.log(params);
        this.http.post(ROOT_URL + 'user/background/edit', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                // this.goMine();
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


    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }


    showDefaultSrc() {
        console.log('image error');
        this.imgError = true;
    }
}
