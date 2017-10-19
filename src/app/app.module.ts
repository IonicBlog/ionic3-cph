import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { TaobaoPage } from '../pages/taobao/taobao';
import { SharePage } from '../pages/share/share';
import { AppService } from '../service/app.service';
import { Safe } from '../pipes/safe';

import { ProductItemComponent } from '../components/product-item/product-item';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    Safe, ProductItemComponent,
    MyApp, SearchPage, TaobaoPage, SharePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, ProductPage, ProductDetailsPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''       //返回文字的定义
      // iconMode: 'ios',              //图标样式 
      // mode: 'ios',                  //整个应用的样式
      // // modalEnter: 'modal-slide-in', //modal加载的动画
      // // modalLeave: 'modal-slide-out',//modal移除的动画
      // tabsPlacement: 'bottom',      //tab的位置
      // pageTransition: 'ios'         //页面切换效果
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ProductItemComponent,
    MyApp, SearchPage, TaobaoPage, SharePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, ProductPage, ProductDetailsPage
  ],
  providers: [AppService]
})
export class AppModule { }
