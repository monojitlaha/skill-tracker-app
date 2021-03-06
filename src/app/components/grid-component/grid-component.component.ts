import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid-component.component.html',
  styleUrls: ['./grid-component.component.css']
})
export class GridComponentComponent implements OnInit {
  @Input() displayedColumns: string[];
  @Input() dataSource: any;
  @Input() gridType: any;
  @Input() isButtonsVisible: boolean;
  @Output() afterCloseEvent: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  buttonDesc:string;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.gridType === 'Technical') {
      this.buttonDesc = "Add Technical Skills"
    } else {
      this.buttonDesc = "Add Communication Skills"
    }
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });
    dialogRef.componentInstance.gridType = this.gridType;

    dialogRef.afterClosed().subscribe(result => {
      this.afterCloseEvent.emit(result);
    });
  }
}
