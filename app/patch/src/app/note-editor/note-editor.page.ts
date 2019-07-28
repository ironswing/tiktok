import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.page.html',
  styleUrls: ['./note-editor.page.scss'],
})
export class NoteEditorPage implements OnInit {
    note;
    @Input() id: any;

  constructor(private http: HttpClient,
              public toastController: ToastController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.id);
    this.updateNoteData();
  }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

    updateNoteData() {
        this.http.get(ROOT_URL + `note/${this.id}/detail?cookie=${localStorage.getItem('anshi_cookie')}`, ).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
              this.note = res['data'];
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

    deleteNote() {
        this.http.get(ROOT_URL + `note/${this.id}/delete?cookie=${localStorage.getItem('anshi_cookie')}`, ).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.note = res['data'];
                this.dismiss();
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });
    }
}
