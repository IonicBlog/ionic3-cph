import { AlertController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class UITool {

    constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {
    }

    showAlert(message) {
        let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: message.toString(),
            buttons: ['确定']
        });
        alert.present();
    }

    presentToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 1500,
            position: 'middle' //
        });
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
}