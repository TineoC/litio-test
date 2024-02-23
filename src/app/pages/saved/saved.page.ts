import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { CompaniesStateService } from '../companies/companies-state.service';
import { CompaniesService, Company } from '../companies/companies.service';
import { IonModal } from '@ionic/angular';
import { YourUpdateModalComponent } from './update-modal.component';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SavedPage implements OnInit {
  constructor(
    private companiesStateService: CompaniesStateService,
    private modalController: ModalController
  ) {}
  companies: Company[] = [];
  isLoading: boolean = true;
  companiesService = inject(CompaniesService);

  @ViewChild(IonModal) modal?: IonModal;

  name?: string;
  description?: string;
  image?: string;

  closeModal() {
    if (!this.modal) return;

    this.modal.dismiss(null, 'cancel');
  }

  create() {
    if (!this.name) return;

    const payload = {
      name: this.name,
      description: this.description,
      image: this.image,
    };

    this.companiesStateService.addCompany({
      ...payload,
      id: '',
      createdAt: '',
      status: true,
    });

    this.companiesService.create({ ...payload });

    this.closeModal();
  }

  async openUpdateModal(company: Company) {
    const modal = await this.modalController.create({
      component: YourUpdateModalComponent,
      componentProps: {
        companyData: company,
      },
    });
    return await modal.present();
  }

  ngOnInit(): void {
    this.companiesStateService.companies$.subscribe((companies) => {
      this.companies = companies;
      this.isLoading = false;
    });

    this.companiesService.getAll();
  }
}
