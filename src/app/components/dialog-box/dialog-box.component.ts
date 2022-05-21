import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skill } from 'src/app/models/skill';

interface Lookup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action: string;
  local_data: any;
  gridType: string;
  skills: Lookup[];
  ratings: Lookup[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Skill) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.form = fb.group({
      name: [this.local_data.name, Validators.required],
      rating: [this.local_data.rating, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.gridType === 'Technical') {
      this.skills = [
        { value: 'Html', viewValue: 'HTML-CSS-JAVASCRIPT' },
        { value: 'Angular', viewValue: 'ANGULAR' },
        { value: 'React', viewValue: 'REACT' },
        { value: 'Spring', viewValue: 'SPRING' },
        { value: 'Restful', viewValue: 'RESTFUL' },
        { value: 'Hiobernate', viewValue: 'HIBERNATE' },
        { value: 'Git', viewValue: 'GIT' },
        { value: 'Docker', viewValue: 'DOCKER' },
        { value: 'Jenkins', viewValue: 'JENKINS' },
        { value: 'Aws', viewValue: 'AWS' }
      ];
    } else {
      this.skills = [
        { value: 'Spoken', viewValue: 'SPOKEN' },
        { value: 'Communication', viewValue: 'COMMUNICATION' },
        { value: 'Aptitude', viewValue: 'APTITUDE' },
      ];
    }
    this.ratings = [
      { value: '1', viewValue: '1' },
      { value: '2', viewValue: '2' },
      { value: '3', viewValue: '3' },
      { value: '4', viewValue: '4' },
      { value: '5', viewValue: '5' },
      { value: '6', viewValue: '6' },
      { value: '7', viewValue: '7' },
      { value: '8', viewValue: '8' },
      { value: '9', viewValue: '9' },
      { value: '10', viewValue: '10' },
      { value: '11', viewValue: '11' },
      { value: '12', viewValue: '12' },
      { value: '13', viewValue: '13' },
      { value: '14', viewValue: '14' },
      { value: '15', viewValue: '15' },
      { value: '16', viewValue: '16' },
      { value: '17', viewValue: '17' },
      { value: '18', viewValue: '18' },
      { value: '19', viewValue: '19' },
      { value: '20', viewValue: '20' }
    ];
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.form.value });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
