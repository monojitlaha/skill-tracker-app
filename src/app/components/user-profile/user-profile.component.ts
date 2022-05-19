import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Skill } from 'src/app/models/skill';
import { ProfileService } from 'src/app/services/profile.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

const SKILLS_DATA: Skill[] = [
  {id: '', name: 'HTML', rating: '18'},
  {id: '', name: 'CSS', rating: '15'},
  {id: '', name: 'ANGULAR', rating:'20'},
  {id: '', name: 'AWS', rating:'18'}
];

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    associateId: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
  });
  displayedColumns: string[] = ['name', 'rating', 'action'];
  dataSource = SKILLS_DATA;
  submitted = false;
  isAddMode: boolean | undefined;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private profileService: ProfileService,
        public dialog: MatDialog
  ) { }  

  ngOnInit(): void {
    this.isAddMode = true;
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        associateId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(10)]]
    });
  }

  // convenience getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } { 
    return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  createUser() {
    throw new Error('Method not implemented.');
  }
  updateUser() {
    throw new Error('Method not implemented.');
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });
  }
}
