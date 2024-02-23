// companies-state.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Company } from './companies.service';

@Injectable({
  providedIn: 'root',
})
export class CompaniesStateService {
  private companiesSubject: BehaviorSubject<Company[]> = new BehaviorSubject<
    Company[]
  >([]);
  public companies$ = this.companiesSubject.asObservable();

  constructor() {}

  updateCompanies(companies: Company[]) {
    this.companiesSubject.next(companies);
  }

  addCompany(newCompany: Company) {
    const currentCompanies = this.companiesSubject.getValue();
    const updatedCompanies = [...currentCompanies, newCompany];
    this.companiesSubject.next(updatedCompanies);
  }
}
