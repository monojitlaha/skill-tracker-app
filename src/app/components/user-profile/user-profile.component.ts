import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { Skill } from 'src/app/models/skill';
import { ProfileService } from 'src/app/services/profile.service';
import { GridComponentComponent } from '../grid-component/grid-component.component';

const SKILLS_DATA: Skill[] = [
];

const COMM_DATA: Skill[] = [
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
  technicalSkills = SKILLS_DATA;
  communicationSkills = COMM_DATA;
  submitted = false;
  username: string;
  isAddMode: boolean | undefined;
  loading = false;
  @ViewChild('techGridComp', { static: true }) techGridComp: GridComponentComponent;
  @ViewChild('commGridComp', { static: true }) commGridComp: GridComponentComponent;
  proflie: Profile;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) { 
    this.route.queryParamMap
      .subscribe(params => {
        this.username = params.get('userName') || '';
        console.log('Username:' + this.username);
      });
  }

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
    return this.form.controls;
  }

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

  techGridEventHandler(result: any) {
    if (result.event == 'Add') {
      this.addRowData(result.data, this.technicalSkills);
      this.techGridComp.table.renderRows();
    } else if (result.event == 'Update') {
      this.updateRowData(result.data, this.technicalSkills);
    }
  }

  commGridEventHandler(result: any) {
    if (result.event == 'Add') {
      this.addRowData(result.data, this.communicationSkills);
      this.commGridComp.table.renderRows();
    } else if (result.event == 'Update') {
      this.updateRowData(result.data, this.communicationSkills);
    }
  }

  addRowData(row_obj: any, dataSource: Skill[]): void {
    dataSource.push({
      name: row_obj.name,
      rating: row_obj.rating
    });
  }

  updateRowData(row_obj: any, dataSource: Skill[]) {
    dataSource = dataSource.filter((value, key) => {
      if (value.name == row_obj.name) {
        value.rating = row_obj.rating;
      }
      return true;
    });
  }
}
