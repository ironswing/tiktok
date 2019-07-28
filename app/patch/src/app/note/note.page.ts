import {Component, OnInit, ViewChild} from '@angular/core';
import {EditBackgoundPage} from '../edit-backgound/edit-backgound.page';
import {ModalController, ToastController} from '@ionic/angular';
import {NoteEditorPage} from '../note-editor/note-editor.page';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

    textPosition = '-40vh';
    edit = false;
    curOffsetX = 0;
    curOffsetY = 0;

    context = '';

    @ViewChild('inputRef')
    public inputRef;

    points = [];

  constructor(private modalController: ModalController,
              private http: HttpClient, public toastController: ToastController) { }

  ngOnInit() {
      this.loadData();
  }
  loadData() {

      this.http.get(ROOT_URL + 'note/list?cookie=' + localStorage.getItem('anshi_cookie')).subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              res['data']['data'].forEach(item => {
                  console.log(item);
                  this.points.push({
                      id: item['id'],
                      content: item['content'],
                      offsetX: item['offset_x'] + 'px',
                      offsetY: item['offset_y'] + 'px'
                  });
              });
          }
      }, (err) => {
          console.log(err);
          this.presentToast(err['error']['msg']).then(r => {
              console.log(r);
          });
      });
  }

    testPoint(e) {
    console.log(e);
    this.curOffsetX = e.offsetX;
    this.curOffsetY = e.offsetY;
    this.textPosition = '5vh';
        this.inputRef.setFocus().then( res => {
            console.log('input focus');
        });

    //
    // this.points.push({
    //     content: 'hahhah',
    //     offsetX: e.offsetX + 'px',
    //     offsetY: e.offsetY + 'px'
    // });
    }

    async presentEditorModal(e) {
        const modal = await this.modalController.create({
            component: NoteEditorPage,
            componentProps: e,
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        console.log(data);
        // return await modal.present();
    }

    sendNote() {
        let params = {
            content: this.context,
            offset_x: this.curOffsetX,
            offset_y: this.curOffsetY,
            cookie: localStorage.getItem('anshi_cookie')
        }
        console.log(params);
        this.http.post(ROOT_URL + 'note/add', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.context = '';
                this.textPosition = '-40vh';
                this.points = [];
                this.loadData();

                // this.loadComment();
            }
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

    showDetal(e) {
      console.log(e);
      this.presentEditorModal(e).then(res => {
          this.points = [];
          this.loadData();
      });
    }
}
