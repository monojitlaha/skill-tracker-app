import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

interface Lookup {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  searchCriterias: Lookup[];
  displayedColumns: string[] = ['name', 'rating'];
  profiles: Profile[];
  submitted = false;
  form: FormGroup = new FormGroup({
    searchby: new FormControl(''),
    searchvalue: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profiles = [];
    this.searchCriterias = [
      { value: 'name', viewValue: 'Name' },
      { value: 'associateId', viewValue: 'Associate Id' },
      { value: 'email', viewValue: 'Email' },
      { value: 'mobile', viewValue: 'Mobile' },
      { value: 'skill', viewValue: 'Skill' }
    ];
    this.form = this.formBuilder.group({
      searchby: ['', Validators.required],
      searchvalue: ['', Validators.required]
    });

    this.getAllProfiles();
  }

  getAllProfiles() {
    this.profileService.getProfiles().subscribe((result) => {
      if (result && result.length > 0) {
        this.profiles = result;
      }
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.profiles = [];
    this.profileService.getProfileByCriteria(this.f['searchby'].value, this.f['searchvalue'].value).subscribe((result) => {
      if (result && result[0]) {
        let profile = new Profile();
        profile = result[0];        
        this.profiles.push(profile);
      } 
    });
  }

  onReset() {
    this.form.reset();
    this.getAllProfiles();
  }

  techGridEventHandler(result: any) {}
  commGridEventHandler(result: any) {}
}
