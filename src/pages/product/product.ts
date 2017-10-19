import { AppGlobal } from './../../service/app.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from '../../service/app.service';

/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-product',
    templateUrl: 'product.html'
})
export class ProductPage {

    hasmore = true;
    products: any;
    selectedItem: any;

    spinner1: boolean = true;

    params = {
        pageNo: 1,
        favoritesId: 0,
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService) {
        this.selectedItem = this.navParams.get("item");
        this.params.favoritesId = this.selectedItem.FavoritesId;
    }

    ionViewDidLoad() {
        this.getFavoritesItems();
    }

    getFavoritesItems() {
        this.appService.httpGet(AppGlobal.API.getProducts,this.params, d => {
            this.products = d.data;
            this.params.pageNo += 1;
            this.spinner1 = false;
        });
    }

    doInfinite(infiniteScroll) {
        if (this.hasmore == false) {
            infiniteScroll.complete();
            return;
        }
        this.appService.httpGet(AppGlobal.API.getProducts,this.params, d => {
            if (d.data.length > 0) {
                this.products = this.products.concat(d.data);
                this.params.pageNo += 1;
            } else {
                this.hasmore = false;
                console.log("没有数据啦！")
            }
            infiniteScroll.complete();
        });
    }

}
