import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-taobao',
  templateUrl: 'taobao.html'
})
export class TaobaoPage {

  title: any;
  link: any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, public navParams: NavParams) {
    this.title = this.navParams.get("title");
    this.link = this.navParams.get("link");
  }

  ionViewDidLoad() {
    console.log('Hello TaobaoPage Page');
    let loading = this.loadingCtrl.create({
      showBackdrop: false
    });
    loading.present();

    var tbFrame = document.getElementById("tbFrame");
    tbFrame.onload = tbFrame.onratechange = function (event: any) {
      if (event.currentTarget != null && event.srcElement != null && event.target != null)
        loading.dismiss();
    }
  }

}
