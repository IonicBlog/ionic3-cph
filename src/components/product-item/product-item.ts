import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProductDetailsPage } from '../../pages/product-details/product-details';

/*
  Generated class for the ProductItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
    selector: 'product-item',
    templateUrl: 'product-item.html'
})
export class ProductItemComponent {

    @Input() products: Array<any>=[];
 
    constructor(public navCtrl: NavController) {
        console.log('Hello ProductItem Component');
    }
   
     goDetails(item) {
        this.navCtrl.push(ProductDetailsPage, { item: item });
    }
}
