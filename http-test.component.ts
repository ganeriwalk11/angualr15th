 import {Component} from 'angular2/core';
import {Config} from './config.service';
import {AppComponent} from './app.component';
import {video} from './video';
import {HttpTestService} from './http-test.service';
import { Pipe, PipeTransform } from 'angular2/core';

@Component({
    selector: 'http-test',
    template: `
        <button (click)="getIt()">Get Request</button><br/><br/><br/>
        <h1>Output:  </h1><br/><br/>
        <button (click)="onTestPost()">Post Request</button><br/>
        <p>Output:  {{PostData}} </p>
        <p>{{getData | async}}</p>
    `,
    providers: [HttpTestService]
})



export class HttpTestComponent{
    getData: string;
    PostData: string;
    
    constructor(private _httptest:HttpTestService){

    }

    getIt(){
        this._httptest.getCurrentTime().subscribe(function(data){
            this.getData = JSON.stringify(data);
            console.log(this.getData);
        },
        function(err){
            console.log(err);
        },
        function(){
            console.log("Completed");
        });
    }
    onTestPost(){
        this._httptest.postJSON().subscribe(function(data){
            this.PostData = JSON.stringify(data);
            console.log(this.PostData);
        },
        function(err){
            console.log(err);
        },
        function(){
            console.log("Completed");
        });
    }
    }


