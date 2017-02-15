import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http} from 'angular2/http';
import {SpsheetService} from './spsheet.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/Rx';


@Component({
 selector: 'my-spsheet',
 template: `
             <button id="fetch" (click)="reloadData()">Reload Data</button>
             <button *ngIf="categorybox" id="undo" (click)="undoData()">UNDO</button>
             <button *ngIf="categorybox" id="redo" (click)="redoData()">REDO</button>
             <button *ngIf="categorybox" id="save" (click)="saveData()">Save</button>
             <select *ngIf="categorybox" #t  (change)="filterData(t.value)">
                <option value="" disabled selected>Filter according to:</option>
                <option *ngFor="#cb of categorybox" [value]="cb">{{cb}}</option>
             </select>
            <table id="myTable">
            <thead>
                <tr style="border:2px solid dark margin:80px">
                    <th id="head" *ngFor="#head of heads" contenteditable="true">
                        {{head}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#dat of data; #i = index">
                    <td *ngFor="#head of heads; #j = index" contenteditable="true" (focus) = "storeData($event)" (blur)="checkHead($event,head,i,j)" >
                        {{dat[head]}}
                    </td>
                </tr>
            </tbody>
        </table>

        `,
        styleUrls:['app/style/tablestyle.css'],
providers: [SpsheetService]
 })

export class SpsheetComponent {
    data:any[];
    dataCopy:any[];
    datas:Observable<any>;
    heads:string[];
    categorybox:string[];
    otherdata:string[];
    showMe:boolean = false;
    count:any;
    undo:any[] = [];
    redo:string[] = [];
    tempData:string[] = [];
     k:HTMLElement;
    private searchStream = new Subject<string>();

    constructor(private _http:Http,private _spservice:SpsheetService){}

    ngAfterViewChecked(){
        var t1 = performance.now();
       console.log(t1);
    }

    storeData($event){
        var me =this;
        let a = $event.target.innerText.toString();
        var focusStream$ = Observable.of(a);
        focusStream$.subscribe(function(data){
            me.tempData.push(data);
        },function(err){
            console.log(err);
        },function(){
            //console.log("Focus eveent");
        });
    }

    reloadData(){
        var me =this;
        me._spservice.fetchData()
            .subscribe(function(data) 
            {
                me.data =[];
                me.categorybox=[];
                me.undo = [];
                me.redo = [];
                me.data = data;
                me.dataCopy = data;
                var t0 = performance.now();
                console.log(t0);
                me.heads = Object.keys(me.data[0]);
                var stream3$ = Observable.of(me.data,me.heads)
                                         .map(function(data)
                                         {
                                            for( var j= 0;j<me.data.length;j++)
                                            {
                                                for(var i =0;i<me.heads.length;i++)
                                                {
                                                    if(me.heads[i] === "eyeColor" && me.categorybox.indexOf(me.data[j][me.heads[i]]) === -1)
                                                    {
                                                        me.categorybox.push(me.data[j][me.heads[i]]);
                                                    }
                                                }
                                            }
                                         })
                                         .subscribe(function(data){
                                              
                                         },function(err){
                                             console.log(err);
                                         },function(){
                                            // console.log("Completed dropdown");
                                         });
                
            },
            err => console.log(err),
            () => {});
    }
    checkHead($event,headid:string,i:number,j:number){
        var me =this;
        me.count = $event.target.innerText;
        let header = headid;
        let t = me.tempData[me.tempData.length -1];
        let x =me.count;
        let stream2$ = Observable.of(me.count);
            stream2$.subscribe(function(count){
                if(me.count != (me.dataCopy[i][me.heads[j]]))
                {
                    $event.target.style.color='#148F77';
                    $event.target.style.border='3px solid #148F77';                    
                }   
            });   
        if(me.tempData[me.tempData.length -1] != me.count){
            me.undo.push({i,j,t,x});
        }
        me.tempData.pop();    
         
        if(header === "index")
        {
            let stream$ = Observable.of(me.count);
            stream$.subscribe(function(value){
                    if (value != parseInt(value, 10))
                    {
                        $event.target.style.color = 'red';
                         $event.target.style.border='3px solid red';
                    }
                    else if(me.count != me.dataCopy[i][me.heads[j]])
                    {
                        $event.target.style.color = '#148F77';
                         $event.target.style.border='3px solid #148F77';
                    }
            });
        }
        else if(header === '_id' && (me.count != me.dataCopy[i][me.heads[j]]))
        {
            let uniqueName$ = Observable.of(me.count.toString());
            uniqueName$.map(function(value){
                let a = value;
                for(var j=0;j<me.data.length;j++)
                {
                    if(me.data[j][header] == a)
                    {
                        $event.target.style.color = 'red';
                         $event.target.style.border='3px solid red'
                    }
                }
            }).subscribe(); 
        }
        if(me.count == (me.dataCopy[i][me.heads[j]]))
                {$event.target.style.color='black';$event.target.style.border='0px solid #148F77';}
        me.data[i][me.heads[j]] = me.count;    
    }

    filterData(t:string){
        var me2 = this;
         me2._spservice.fetchData()
            .subscribe(function(data) 
            {
                me2.data =[];
                me2.categorybox=[];
                me2.heads = Object.keys(data[0]);
                var stream3$ = Observable.of(data,me2.heads)
                                         .map(function(data)
                                         {
                                             var k=0;
                                            for( var j= 0;j<data.length;j++)
                                            {
                                                for(var i =0;i<me2.heads.length;i++)
                                                {
                                                    if(me2.heads[i] === "eyeColor" && data[j][me2.heads[i]] === t )
                                                    {
                                                        me2.data[k++] = data[j];
                                                    }
                                                    if(me2.heads[i] === "eyeColor" && me2.categorybox.indexOf(data[j][me2.heads[i]]) === -1)
                                                    {
                                                        me2.categorybox.push(data[j][me2.heads[i]]);
                                                    }
                                                }
                                            }
                                         })
                                         .subscribe(function(data){
                                              
                                         },function(err){
                                             console.log(err);
                                         },function(){
                                            //console.log("Completed dropdown");
                                         });
                
            },
            err => console.log(err),
            () => {});
        }

        undoData(){
            var me = this;
            if(me.undo.length === 0){
                alert("No changes made");
            }
            else{
                let len = me.undo.length -1;
                let r = (me.undo[len]["i"]);
                let c = (me.undo[len]["j"]);
                let value = (me.undo[len]["t"]);
                let x = me.undo[len]["x"];

                var myTable = document.getElementsByTagName('tr')[r+1];
                myTable.children[c].innerHTML = value;
                me.data[r][me.heads[c]] = value;
                me.data[r][me.heads[c]] = value
                me.redo.push(me.undo.pop());
            }
        }
        redoData(){
            var me = this;
            if(me.redo.length === 0){
                alert("Nothing undone");
            }
            else{
                let len = me.redo.length -1;
                let r = (me.redo[len]["i"]);
                let c = (me.redo[len]["j"]);
                let value = (me.redo[len]["x"]);
                let x = me.redo[len]["value"];
                
                var myTable = document.getElementsByTagName('tr')[r+1];
                myTable.children[c].innerHTML = value;
                me.data[r][me.heads[c]] = value;
                me.data[r][me.heads[c]] = value
               // console.log(myTable.children[c].innerHTML);
                me.undo.push(me.redo.pop());
            }
            
        }

        saveData(){
            var me =this;
            var abc = me._spservice.postData(me.data);

            abc.subscribe(
                                comments => {
                                   console.log(comments);
                                }, 
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
        }
        addNewEntry(){
            var newtr = document.createElement("tr");
            var x= document.getElementById("myTable").children[1];
            var y =x.children[1];
            var addRow$ = Observable.create();
            addRow$.map(function(e){
               
            });
           
        }

    }


