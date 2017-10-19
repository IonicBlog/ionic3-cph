import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


declare var Wechat;
declare var YCQQ;

@Component({
  selector: 'page-share',
  template: '\
      <ion-list>\
      <button ion-item (click)="qqShare()">QQ好友</button>\
      <button ion-item (click)="qqZoneShare()">QQ空间</button>\
      <button ion-item (click)="wxShare(0)">微信好友</button>\
      <button ion-item (click)="wxShare(1)">朋友圈</button>\
    </ion-list>'
})
export class SharePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    console.log('Hello SharePage Page');
  }
  wxShare(scene) {
    console.log(scene);
    // Show the action sheet
    var params = {
      title: "成品会",
      description: "精选淘宝天猫最具人气情趣商品！",
      thumb: "",
      link: "http://store.tongedev.cn",
      scene: scene
    }
    try {
      Wechat.share({
        message: {
          title: params.title,
          description: params.description,
          thumb: params.thumb,
          mediaTagName: "TEST-TAG-001",
          messageExt: "",  // 这是第三方带的测试字段
          messageAction: "", // <action>dotalist</action>
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: params.link
          }
        },
        scene: params.scene == 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline  // share to Timeline
      }, function () {
        alert("Success");
      }, function (reason) {
        alert("Failed: " + reason);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  qqShare() {
    var args: any = {};
    args.url = "http://store.tongedev.cn";
    args.title = "成品会";
    args.description = "精选淘宝天猫最具人气情趣商品！";
    args.imageUrl = "";
    args.appName = "成品会";
    YCQQ.shareToQQ(function () {
      console.log("share success");
    }, function (failReason) {
      console.log(failReason);
    }, args);
  }

  qqZoneShare() {
    var args: any = {};
    args.url = "http://store.tongedev.cn";
    args.title = "成品会";
    args.description = "精选淘宝天猫最具人气情趣商品！";
    var imgs = [
      'https://www.baidu.com/img/bdlogo.png',
      'https://www.baidu.com/img/bdlogo.png'
    ];
    args.imageUrl = imgs;
    YCQQ.shareToQzone(function () {
      alert("share success");
    }, function (failReason) {
      alert(failReason);
    }, args);
  }

}
