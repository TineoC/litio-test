import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import {
  CompaniesService,
  Company,
  UpdateCompany,
} from '../companies/companies.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CompaniesStateService } from '../companies/companies-state.service';

@Component({
  selector: 'app-your-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class YourUpdateModalComponent implements OnInit {
  // @ts-ignore
  @Input() readonly companyData: Company;
  isFormDirty: boolean = false;
  updateForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private companiesStateService: CompaniesStateService,
    private companiesService: CompaniesService
  ) {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      status: [false, Validators.required],
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if (this.companyData) {
      this.updateForm.patchValue({
        name: this.companyData.name,
        image: this.companyData.image,
        description: this.companyData.description,
        status: this.companyData.status,
      });
    }
  }

  onSubmit() {
    if (!this.updateForm || !this.updateForm.dirty) return;

    const payload = { ...this.updateForm.value };

    this.companiesStateService.updateCompany({
      ...this.companyData,
      ...payload,
    });

    this.companiesService.updateCompany(this.companyData.id, payload);

    this.closeModal();
  }

  checkFormChanges() {
    if (!this.updateForm) {
      this.isFormDirty = false;
      return;
    }

    const { createdAt, id, ...updatedFields } = this.companyData;

    this.isFormDirty =
      JSON.stringify(this.updateForm.value) !== JSON.stringify(updatedFields);
  }
}
