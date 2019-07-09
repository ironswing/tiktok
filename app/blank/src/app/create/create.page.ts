import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {VideoCapturePlus, MediaFile, VideoCapturePlusOptions} from '@ionic-native/video-capture-plus/ngx';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public path;

  constructor( private camera: Camera, private videoCapturePlus: VideoCapturePlus) { }

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
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
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

            //If it's file URI
            // this.path = imageData;

            // this.upload();

        }, (err) => {

          console.log(err);
            // Handle error
        });
    }

    recordVideo() {
        const options: VideoCapturePlusOptions = {
            limit: 1,
            highquality: true,
            portraitOverlay: 'assets/img/camera/overlay/portrait.png',
            landscapeOverlay: 'assets/img/camera/overlay/landscape.png'
        };

        this.videoCapturePlus.captureVideo(options).then(mediafile => console.log(mediafile), error => console.log('Something went wrong'));
    }

}
