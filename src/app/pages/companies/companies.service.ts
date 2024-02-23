// companies.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CompaniesStateService } from './companies-state.service';

export interface Company {
  id: string;
  name: string;
  image?: string;
  description?: string;
  createdAt: string;
  status: boolean;
}

interface CreateCompany {
  name: string;
  image?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  constructor(
    private http: HttpClient,
    private companiesStateService: CompaniesStateService
  ) {}

  API_URL = 'http://localhost:3000/company';

  getAll() {
    return this.http
      .get<Company[]>(this.API_URL)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe((companies) => {
        this.companiesStateService.updateCompanies(companies);
      });
  }

  create(newCompany: CreateCompany) {
    return this.http
      .post<Company>(this.API_URL, { ...newCompany })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
