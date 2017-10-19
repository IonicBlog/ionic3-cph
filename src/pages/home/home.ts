import { AppGlobal } from './../../service/app.service';
import { Component, ViewChild } from '@angular/core';

import { NavController, Platform, Content, PopoverController } from 'ionic-angular';
import { AppService } from '../../service/app.service';
import { ProductPage } from '../product/product';
import { SearchPage } from '../search/search';
import { SharePage } from '../share/share';
import { ProductDetailsPage } from '../product-details/product-details';
import { TaobaoPage } from '../taobao/taobao';

declare var window;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    mySlideOptions = {
        initialSlide: 0,
        loop: true,
        pager: true,
        autoplay: 5000,
        speed: 500
    };

    mySlideOptions1 = {
        initialSlide: 0,
        loop: false,
        pager: true,
        autoplay: 10000,
        speed: 500
    };

    categories: Array<any> = [];
    products: Array<any> = [];
    slides: Array<any> = [];
    stores: Array<any> = [];
    coupons: Array<any> = [];

    spinner1: boolean = true;

    hasmore: boolean = true;

    params = {
        favoritesId: 1927415,
        pageNo: 1,
        pageSize: 20
    }

    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController,
        private popoverCtrl: PopoverController,
        public appService: AppService,
        public platform: Platform) {
        platform.ready().then(() => {
            // 极光推送
            this.initJpush();
            // handler notification
            this.handlerNotification();
        });

    }

    share(event) {
        let popover = this.popoverCtrl.create(SharePage);
        popover.present({
            ev: event
        });
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    ionViewDidLoad() {
        this.getFavorites();
        this.getStores();
        this.getCoupons();
    }

    getFavorites() {
        this.appService.httpGet(AppGlobal.API.getCategories, { appTag: 'cherry' ,cateType:1}, rs => {
            console.debug(rs);
            this.categories = rs.data;
            var top = this.categories.slice(0, 1)[0];
            this.getSlides(top)
        })
    }

    getStores() {
        this.appService.getResources('assets/data/stores.json', d => {
            this.stores = this.appService.toPaging(d, 3);
        })
    }

    goTaobao(item) {
        this.navCtrl.push(TaobaoPage, { title: item.name, link: item.link });
    }

    getSlides(top) {
        var params = {
            favoritesId: top.FavoritesId,
            pageNo: 1,
            pageSize: 5
        }
        this.appService.httpGet(AppGlobal.API.getProducts, params, rs => {
            this.slides = rs.data;
            this.spinner1 = false;
        })
    }

    getCoupons() {
        this.appService.httpGet(AppGlobal.API.getProducts, this.params, rs => {
            this.coupons = rs.data;
        })
    }

    goProducts(item) {
        this.navCtrl.push(ProductPage, { item: item });
    }
    goDetails(item) {
        this.navCtrl.push(ProductDetailsPage, { item: item });
    }

    doRefresh(refresher) {
        refresher.complete();
    }
    onFocus(event) {
        this.navCtrl.push(SearchPage);
    }

    doInfinite(infiniteScroll) {
        if (this.hasmore == false) {
            infiniteScroll.complete();
            return;
        }
        this.appService.httpGet(AppGlobal.API.getProducts, this.params, d => {
            if (d.length > 0) {
                this.coupons = this.coupons.concat(d);
                this.params.pageNo += 1;
            } else {
                this.hasmore = false;
                console.log("没有数据啦！")
            }
            infiniteScroll.complete();
        });
    }


    // 处理极光推送
    handlerNotification() {
        document.addEventListener("jpush.setTagsWithAlias", (event: any) => {
            try {
                var result = "设置tags和alias回调结果：onTagsWithAlias:result code:" + event.resultCode + " ";
                result += "tags:" + event.tags + " ";
                result += "alias:" + event.alias + " ";
                console.log(result);
            } catch (exception) {
                console.log("onTagsWithAlias exception:" + exception)
            }
        }, false);
        document.addEventListener("jpush.openNotification", (event) => {
            try {
                var alertContent;
                if (this.platform.is('android')) {
                    alertContent = window.plugins.jPushPlugin.openNotification.alert;
                } else {
                    // alertContent = event.aps.alert;
                }
                let link = window.plugins.jPushPlugin.openNotification.extras.link;
                let title = window.plugins.jPushPlugin.openNotification.extras.title;
                this.openActionPlant(title, alertContent, link);
                console.log("Open Notification:" + alertContent);
            } catch (exception) {
                console.log("JPushPlugin:onOpenNotification" + exception);
            }
        }, false);
        document.addEventListener("jpush.receiveNotification", (event) => {
            try {
                var alertContent;
                if (this.platform.is('android')) {
                    alertContent = window.plugins.jPushPlugin.receiveNotification.alert;
                } else {
                    // alertContent = event.aps.alert;
                }
                console.log("receive notification:" + alertContent);
            } catch (exception) {
                console.log(exception)
            }
        }, false);
        document.addEventListener("jpush.receiveMessage", (event) => {
            try {

                let message;
                if (this.platform.is('android')) {
                    message = window.plugins.jPushPlugin.receiveMessage.message;
                } else {
                    // message = event.content;
                }

                let link = window.plugins.jPushPlugin.receiveMessage.extras.link;
                let title = window.plugins.jPushPlugin.receiveMessage.extras.title;
                this.openActionPlant(title, message, link);

                console.log("receive message:" + message);
            } catch (exception) {
                console.log("JPushPlugin:onReceiveMessage-->" + exception);
            }
        }, false);
    }

    // 初始化极光推送
    initJpush() {
        try {
            window.plugins.jPushPlugin.init();
            this.getRegistrationID();
            if (!this.platform.is('android')) {
                window.plugins.jPushPlugin.setDebugModeFromIos();
                window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
            } else {
                window.plugins.jPushPlugin.setDebugMode(false);
                window.plugins.jPushPlugin.setStatisticsOpen(true);
            }
        } catch (exception) {
            console.log(exception);
        }
    }

    // 获取RegistrationID
    getRegistrationID() {
        window.plugins.jPushPlugin.getRegistrationID((data) => {
            try {
                if (data.length == 0) {
                    window.setTimeout(this.getRegistrationID, 1000);
                }
                this.setTagsAndAlias();
                console.debug("JPushPlugin:registrationID is " + data);
            } catch (exception) {
                console.debug(exception);
            }
        });
    };

    // 设置tags和alias
    setTagsAndAlias() {
        try {
            console.log("准备设置tag/alias...");
            window.plugins.jPushPlugin.setTagsWithAlias("tonge", "");
            console.log("setTagsAndAlias:" + '已设置tags和alias，正在等待回调...');
        } catch (exception) {
            console.log(exception);
        }
    }

    openActionPlant(title, message, link) {
        this.navCtrl.push(TaobaoPage, { title: title, link: link });
        // let alert = this.alertCtrl.create({
        //     title: '小樱桃 - 情趣商城',
        //     message: message,
        //     buttons: [
        //         {
        //             text: '取消',
        //             role: 'cancel',
        //             handler: () => {
        //                 console.log('Cancel clicked');
        //             }
        //         },
        //         {
        //             text: '查看',
        //             handler: () => {
        //                 this.navCtrl.push(TaobaoPage, { title: title, link: link });
        //             }
        //         }
        //     ]
        // });
        // alert.present();
    }
}
