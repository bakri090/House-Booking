import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../../model/iproperty';
import { IPropertyBase } from '../../model/ipropertyBase';
import { ToastrService } from 'ngx-toastr';
import { Property as Property } from '../../model/property';
import { HousingServiceService } from '../../services/housingService.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  standalone: false,
})
export class AddComponent implements OnInit {
  // @ViewChild('Form') Form: NgForm;
  @ViewChild('formTabs') formTabs?: TabsetComponent;
  addPropretyForm: FormGroup;
  nextClicked: boolean = false;
  property = new Property();
  PropretyView: IPropertyBase = {
    Id: null,
    Name: null,
    PType: null,
    SellRent: null,
    Price: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null,
  };
  propretyType = ['House', 'Apartment', 'Duplex'];
  furnishType = ['Fully', 'Semi', 'Unfurnished'];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast:ToastrService,
    private house:HousingServiceService
  ) {}
  ngOnInit() {
    this.CreateAddPropretyForm();
    this.addPropretyForm.valueChanges.subscribe((val) => {
      this.PropretyView = {
        ...val.BasicInfo,
        ...val.PriceInfo,
      };
    });
    console.log(this.BasicInfo.value);
  }
  CreateAddPropretyForm() {
    this.addPropretyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),
      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null, Validators.required],
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null,Validators.required],
        LandMark: [null],
      }),
      OtherInfo: this.fb.group({
        RTM: [null],
        PossessionOn: null,
        AOP: null,
        Gated: null,
        MainEntrance: null,
        Description: null,
      }),
    });
  }
mapProprety(){
  this.property.Id = this.house.getAutoId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
}
  // getter methods
  // #region <formGroups>
  // #region BasicInfo
  get BasicInfo() {
    return this.addPropretyForm.controls['BasicInfo'] as FormGroup;
  }
  get SellRent() {
    return this.BasicInfo.controls['SellRent'];
  }
  get BHK() {
    return this.BasicInfo.controls['BHK'];
  }
  get PType() {
    return this.BasicInfo.controls['PType'];
  }
    get Name() {
    return this.BasicInfo.controls['Name'];
  }
  get City() {
    return this.BasicInfo.controls['City'];
  }
  get FType() {
    return this.BasicInfo.controls['FType'];
  }
  // #endregion
  //#region PriceInfo
  get PriceInfo() {
    return this.addPropretyForm.controls['PriceInfo'] as FormGroup;
  }
  get Price() {
    return this.PriceInfo.controls['Price'];
  }
  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'];
  }
  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'];
  }
  // #endregion
  // #region AddressInfo
  get AddressInfo() {
    return this.addPropretyForm.controls['AddressInfo'] as FormGroup;
  }
  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }
  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  // #endregion
  // #region OtherInfo
  get OtherInfo() {
    return this.addPropretyForm.controls['OtherInfo'] as FormGroup;
  }
  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }
  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }
  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  // #endregion
  // #endregion
  goBack() {
    this.router.navigate(['/']);
  }
  onSubmit() {
    this.nextClicked = true;
   if(this.allTabsValid()){
    this.mapProprety();
    this.house.AddProprety(this.property);
    this.toast.success('Congrats, your proprety listed succefully on our your website',"Added Success");
    console.log(this.addPropretyForm.controls);
   }else{
    this.toast.error('Please review the form and provide all valid entries');
   }
  }

  allTabsValid():boolean{
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      console.log(this.BasicInfo.controls);
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      console.log(this.PriceInfo.controls);
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      console.log(this.AddressInfo.controls);
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      console.log(this.OtherInfo.controls);
      return false;
    }
    return true;
  }
  previouseTab(tabId:number){
      Promise.resolve().then(() => {
        if (this.formTabs?.tabs[tabId]) {
          this.formTabs.tabs[tabId].active = true;
          console.log('skd');
        }
      });
  }
  nextTab(tabId: number, currentTabIsValid?: boolean) {
    this.nextClicked = true;
    if (currentTabIsValid) {
      Promise.resolve().then(() => {
        if (this.formTabs?.tabs[tabId]) {
          this.formTabs.tabs[tabId].active = true;
          this.nextClicked=false;
          console.log('skd');
        }
      });
    }
  }
}
