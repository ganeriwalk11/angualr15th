import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Headers} from 'angular2/http';
@Injectable()
export class HttpTestService{
    constructor(private _httpreq:Http){
    }
    getCurrentTime(){
        return this._httpreq.get('http://date.jsontest.com').map(function(data){
            return data.json();
        })
    }
    postJSON(){
        var json = JSON.stringify({var1:'test',var2:3});
        var params = 'json=' + json;
        var headers  = new Headers();
        headers.append('Content-Type','applicaton/x-www-form-urlencoded');
        
        return this._httpreq.post('http://validate.jsontest.com',params,{
            headers:headers
        }).map(res => res.json());
    }
} 