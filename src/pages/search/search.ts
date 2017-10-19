import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppService } from '../../service/app.service';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  products:any;

  constructor(public navCtrl: NavController, public appService: AppService) { }
  
  ionViewDidLoad() {
  }

  searchProducts(event) {
    let val = event.target.value;
    var params = {
      q: val,
      cat: "",
      city: "",
      pageNo: 1
    }
    this.appService.httpGet("taobao/search", params, d => {
      console.log(d);
      this.products = d.tbk_item_get_response.results.n_tbk_item;
    });
  }

}
