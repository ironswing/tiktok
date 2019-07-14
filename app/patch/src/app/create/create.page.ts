import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {HttpClient} from '@angular/common/http';
import {LoadingController} from '@ionic/angular';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
    items: any[] = [];
  public path;
  public videoSource;
  public imageSource;
  public title;
  public progresss = 0;
  public upLoading = false;
  public testSrc;

  constructor( private camera: Camera, private imagePicker: ImagePicker, private transfer: FileTransfer,
               private file: File,
               private filePath: FilePath,
               private http: HttpClient,
               private loadingCtrl: LoadingController,
               private videoEditor: VideoEditor,
               private router: Router) {
      for (let i = 0; i < 1000; i++) {
          this.items.push('test' + 1);
      }
  }

  ngOnInit() {
  }

    /**
     * 打开摄像头
     */
    openCamera() {
        const options: CameraOptions = {
            // quality: 100,
            // destinationType: this.camera.DestinationType.FILE_URI,
            // encodingType: this.camera.EncodingType.JPEG,
            // mediaType: this.camera.MediaType.PICTURE
            quality: 90,                                                   // 相片质量 0 -100
            destinationType: this.camera.DestinationType.DATA_URL,        // DATA_URL 是 base64   FILE_URL 是文件路径
            // encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.VIDEO,  // VIDEO PICTURE
            saveToPhotoAlbum: true,                                       // 是否保存到相册
            // // sourceType: this.camera.PictureSourceType.CAMERA ,         //是打开相机拍照还是打开相册选择  PHOTOLIBRARY : 相册选择, CAMERA : 拍照,
        };

        console.log('test camera');

        this.camera.getPicture(options).then((imageData) => {
            // console.log("got file: " + imageData);

            // alert(imageData)

            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.path = base64Image;

        }, (err) => {

          console.log(err);
            // Handle error
        });
    }

    recordVideo() {
        this.imagePicker.getPictures({maximumImagesCount: 3}).then((results) => {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, (err) => { });
    }

    selectVideo() {
        this.camera.getPicture({destinationType: this.camera.DestinationType.DATA_URL, mediaType:
            this.camera.MediaType.VIDEO, sourceType:
            this.camera.PictureSourceType.PHOTOLIBRARY }).then(res => {
            console.log(res);
            this.upload(res);

            // this.videoEditor.transcodeVideo({
            //     fileUri: 'file://' + res,
            //     outputFileName: 'output.mp4',
            //     outputFileType: this.videoEditor.OutputFileType.MPEG4
            // })
            //     .then((fileUri: string) => console.log('video transcode success', fileUri))
            //     .catch((error: any) => console.log('video transcode error', error));

            this.videoEditor.createThumbnail({
                fileUri: 'file://' + res,
                outputFileName: 'temp'
            })
                .then((fileUri: string) => {
                    console.log('video createThumbnail success', fileUri)
                    const fileTransfer: FileTransferObject = this.transfer.create();
                    let options: FileUploadOptions = {
                        fileKey: 'file',
                        fileName: 'test.jpg',
                        mimeType: 'image/jpeg',
                        headers: {}
                    };

                    fileTransfer.upload(fileUri , ROOT_URL + '/image/upload', options)
                        .then((data) => {
                            console.log(data);
                            if(data['responseCode'] === 200){
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
                })
                .catch((error: any) => console.log('video createThumbnail error', error));

        });
    }
    upload(path) {
        const fileTransfer: FileTransferObject = this.transfer.create();

        console.log(path)

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'test.mp4',
            mimeType: 'video/mp4',
            headers: {}
        };

        let now = 0;

        fileTransfer.onProgress(progess  => {
            if (progess.lengthComputable) {
                now = progess.total / progess.loaded * 100;
            }
        });
        this.upLoading = true;

        fileTransfer.upload(path , ROOT_URL + '/video/upload', options)
            .then((data) => {
                console.log(data);
                if(data['responseCode'] === 200){
                    console.log(data['response']);
                    let res = JSON.parse(data['response']);
                    console.log(res);
                    if (res['code'] === 200) {
                        this.videoSource = res['data']['video'][0]['url'];
                        this.upLoading = false;
                        console.log(this.videoSource);
                    }
                }
                // success
            }, (err) => {
                console.log(err);
                console.log(err.body);
                // error
            });

        let timer = setInterval(() => {
            // loading.setContent('上传中 ' + Math.floor(now) + '%');
            this.progresss = Math.floor(now);
            console.log(now);
            if (now >= 99) {
                clearInterval(timer);
            }
        }, 500);
    }

    publish() {
        let params = {
            title: this.title,
            video_url: this.videoSource,
            poster: this.imageSource,
            cookie: localStorage.getItem('anshi_cookie')
        };
        console.log(params);
        this.http.post(ROOT_URL + 'post', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.router.navigate(['/home']);
            }
        });
    }

    tcookie() {
        this.http.get(ROOT_URL + 'test/test_cookie', {params: {cookie: localStorage.getItem('anshi_cookie')}}).subscribe(res => {
            console.log(res);
        });
    }
}
