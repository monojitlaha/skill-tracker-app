import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Profile } from '../../models/profile';
import { Skill } from '../../models/skill';
import { AlertService } from '../../services/alert.service';
import { ProfileService } from '../../services/profile.service';
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
  isTechnicalSkillsValid = true;
  isCommunicationSkillsValid = true;
  @ViewChild('techGridComp', { static: true }) techGridComp: GridComponentComponent;
  @ViewChild('commGridComp', { static: true }) commGridComp: GridComponentComponent;
  proflie: Profile;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private alertService: AlertService
  ) {
    this.route.queryParamMap
      .subscribe(params => {
        this.username = params.get('userName') || '';
        console.log('Username:' + this.username);
      });
  }

  ngOnInit(): void {
    this.isAddMode = true;
    this.proflie = new Profile();
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

    setTimeout(() => {
      if (!this.technicalSkills || this.technicalSkills.length === 0) {
        this.isTechnicalSkillsValid = false;
      } else {
        this.isTechnicalSkillsValid = true;
      }
      if (!this.communicationSkills || this.communicationSkills.length === 0) {
        this.isCommunicationSkillsValid = false;
      } else {
        this.isCommunicationSkillsValid = true;
      } 
      
      if(!this.isCommunicationSkillsValid || !this.isTechnicalSkillsValid) {
        return;
      }

      this.proflie.name = this.f['name'].value;
      this.proflie.userName = this.username;
      this.proflie.associateId = this.f['associateId'].value;
      this.proflie.email = this.f['email'].value;
      this.proflie.mobile = this.f['mobile'].value;
      this.proflie.technicalSkills = this.technicalSkills;
      this.proflie.communicationSkills = this.communicationSkills;

      if (this.isAddMode) {
        this.createUser();
      } else {
        this.updateUser();
      }
    }, 1000);     
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  createUser() {    
    this.profileService.createProfile(this.proflie)
      .subscribe(
        data => {
          this.proflie = data;
          this.isAddMode = false;
          this.alertService.success('Profile added successfully', { keepAfterRouteChange: true });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  updateUser() {
    this.profileService.updateProfile(this.proflie.id, this.proflie)
      .subscribe(
        data => {
          this.alertService.success('Profile updated successfully', { keepAfterRouteChange: true });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  techGridEventHandler(result: any) {
    this.isTechnicalSkillsValid = true;
    if (result.event == 'Add') {
      this.addRowData(result.data, this.technicalSkills);
      this.techGridComp.table.renderRows();
    } else if (result.event == 'Update') {
      this.updateRowData(result.data, this.technicalSkills);
    } else if(result.event == 'Delete'){
      this.deleteRowData(result.data, this.technicalSkills);
      this.techGridComp.table.renderRows();
    }
  }

  commGridEventHandler(result: any) {
    this.isCommunicationSkillsValid = true;
    if (result.event == 'Add') {
      this.addRowData(result.data, this.communicationSkills);
      this.commGridComp.table.renderRows();
    } else if (result.event == 'Update') {
      this.updateRowData(result.data, this.communicationSkills);
    } else if(result.event == 'Delete'){
      this.deleteRowData(result.data, this.communicationSkills);
    }
  }

  addRowData(row_obj: any, dataSource: Skill[]): void {
    dataSource.push({
      description: row_obj.description,
      rating: row_obj.rating
    });
  }

  updateRowData(row_obj: any, dataSource: Skill[]) {
    dataSource = dataSource.filter((value, key) => {
      if (value.description == row_obj.description) {
        value.rating = row_obj.rating;
      }
      return true;
    });
  }

  deleteRowData(row_obj: any, dataSource: Skill[]) {
    dataSource = dataSource.filter((value,key)=>{
      return value.description != row_obj.description;
    });
  }
}
