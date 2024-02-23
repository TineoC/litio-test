import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CompaniesStateService } from './companies-state.service';
import { CompaniesService, Company } from './companies.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class CompaniesPage implements OnInit {
  constructor(private companiesStateService: CompaniesStateService) {}
  companies: Company[] = [];
  isLoading: boolean = true;
  companiesService = inject(CompaniesService);

  ngOnInit(): void {
    this.companiesStateService.companies$.subscribe((companies) => {
      this.companies = companies;
      this.isLoading = false;
    });

    // Trigger the data fetch
    this.companiesService.getAll();
  }
}
