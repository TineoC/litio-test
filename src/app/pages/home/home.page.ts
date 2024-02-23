import { CompaniesService } from '../companies/companies.service';
import { IonicModule } from '@ionic/angular';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Company } from '../companies/companies.service';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompaniesStateService } from '../companies/companies-state.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  companies: Company[] = [];
  isLoading: boolean = true;
  companiesService = inject(CompaniesService);
  alertButtons = ['Action'];

  constructor(private companiesStateService: CompaniesStateService) {}

  ngOnInit() {
    this.companiesStateService.companies$.subscribe((companies) => {
      this.companies = companies;
      this.isLoading = false;
    });

    // Trigger the data fetch
    this.companiesService.getAll();
  }

  // Function to create an array of n elements
  counter(i: number) {
    return new Array(i);
  }
}
