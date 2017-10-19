import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaobaoPage } from '../taobao/taobao';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {

    items = [
        { title: "我的淘宝", link: "https://h5.m.taobao.com/mlapp/mytaobao.html#mlapp-mytaobao" },
        { title: "购物车", link: "https://h5.m.taobao.com/mlapp/cart.html" },
        { title: "我的订单", link: "https://h5.m.taobao.com/mlapp/olist.html" },
        { title: "待付款", link: "https://h5.m.taobao.com/mlapp/olist.html?spm=a2141.7756461.2.1&tabCode=waitPay" },
        { title: "待发货", link: "https://h5.m.taobao.com/mlapp/olist.html?spm=a2141.7756461.2.2&tabCode=waitSend" },
        { title: "待收货", link: "https://h5.m.taobao.com/mlapp/olist.html?spm=a2141.7756461.2.3&tabCode=waitConfirm" },
        { title: "待评价", link: "https://h5.m.taobao.com/mlapp/olist.html?spm=a2141.7756461.2.4&tabCode=waitRate" }
        // { title: "关于", link: "assets/html/about.html" }
    ];

    constructor(public navCtrl: NavController) {

    }

    itemClick(item) {
        this.navCtrl.push(TaobaoPage, { title: item.title, link: item.link });
    }

}
