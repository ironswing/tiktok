import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public path;

  constructor( private camera: Camera, private imagePicker: ImagePicker) { }

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

            //If it's file URI
            // this.path = imageData;

            // this.upload();

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
        this.camera.getPicture({destinationType: this.camera.DestinationType.DATA_URL, mediaType: this.camera.MediaType.VIDEO, sourceType: this.camera.PictureSourceType.PHOTOLIBRARY }).then(res => {
            console.log(res);
        });
    }
}
