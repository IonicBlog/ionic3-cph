import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../service/app.service';
import { TaobaoPage } from '../taobao/taobao';

/*
  Generated class for the ProductDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {

  // product: any;
  selectedItem: any;
  imgs: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
    this.selectedItem = this.navParams.get("item");
    console.log(this.selectedItem);

    if (this.selectedItem.SmallImages) {
      this.imgs = this.selectedItem.SmallImages;
    }
  }

  ionViewDidLoad() {
    this.getProduct();
  }

  goTaobao() {
    if (this.selectedItem.ClickUrl) {
      this.navCtrl.push(TaobaoPage, { title: this.selectedItem.Title, link: this.selectedItem.ClickUrl });
    } else {
      this.navCtrl.push(TaobaoPage, { title: "oh,no ", link: "assets/html/ohno.html" });
    }
  }
  getProduct() {
   
  }
}
