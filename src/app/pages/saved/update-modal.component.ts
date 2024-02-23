import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { Company } from '../companies/companies.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-your-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
  imports: [IonicModule, FormsModule],
  standalone: true,
})
export class YourUpdateModalComponent implements OnInit {
  // @ts-ignore
  @Input() companyData: Company;
  isFormDirty: boolean = false;
  regForm: FormGroup | undefined;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {}

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    if (!this.companyData) return;

    this.regForm = this.formBuilder.group({
      name: [this.companyData.name],
      image: [this.companyData.image],
      description: [this.companyData.description],
      status: [this.companyData.status],
    });
  }

  updateCompany() {}

  checkFormChanges() {
    if (!this.regForm) {
      this.isFormDirty = false;
      return;
    }

    const { createdAt, id, ...updatedFields } = this.companyData;

    this.isFormDirty =
      JSON.stringify(this.regForm.value) !== JSON.stringify(updatedFields);
  }
}
