import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AppGlobal {
    static cache: any = {
        slides: "_cph_slides",
        categories: "_cph_categories",
        products: "_chp_products"
    }
    static domain = "https://tlimama.tongedev.cn"
    static API: any = {
        getCategories: '/api/ionic3/getCategories',
        getProducts: '/api/ionic3/getProducts',
        getDetails: '/api/ionic3/details'
    };
}

@Injectable()
export class AppService {
    
    constructor(public http: Http) { }

    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str;
    }

    httpGet(url, params, callback) {
        this.http.get(AppGlobal.domain + url + this.encode(params)).subscribe(res => {
            callback(res.json() == null ? "[]" : res.json());
        })
    }

    httpPost(url, params, callback) {
        this.http.post(AppGlobal.domain + url, params).subscribe(res => {
            callback(res.json() == null ? "[]" : res.json());
        })
    }

    getResources(url, callback) {
        this.http.get(url).subscribe(res => {
            callback(res.json() == null ? "[]" : res.json());
        })
    }

    toPaging(items, count) {
        var newItems = [];
        var page = items.length / count;
        for (var p = 0; p < page; p++) {
            var temp = []
            for (var i = (p * count); i < (p * count) + count; i++) {
                if (i < items.length) {
                    temp.push(items[i]);
                }
            }
            newItems.push(temp);
        }
        return newItems;
    }
 
    
}
