import {Component} from 'angular2/core';
import {SpsheetComponent} from './spsheet.component';


@Component({
 selector: 'my-app',
 template: `
            <div class="header">
                <h1><b>Spreadsheet App</b></h1>
            </div><br/><br/>
            <my-spsheet></my-spsheet>
        `,
styles: [
    `
    .header{
         border: 1px solid black;
        background-color: #3b5998;
        width:300%;
    }
    h1{
        color: white;
        width:300%;
        padding: 45px 30px 20px 20px;
        align:center;
    }
    `
],
directives: [SpsheetComponent]
 })

export class AppComponent {
	
 }

