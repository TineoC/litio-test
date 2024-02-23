// companies.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { CompaniesStateService } from './companies-state.service';

export interface CreateCompany {
  name: string;
  image?: string;
  description?: string;
}

export interface Company extends CreateCompany {
  id: string;
  createdAt: string;
  status: boolean;
}

export interface UpdateCompany extends CreateCompany {
  status: boolean;
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

  fetchCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.API_URL).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getAll() {
    this.fetchCompanies().subscribe((companies) => {
      this.companiesStateService.updateCompanies(companies);
    });
  }

  getAllActive() {
    this.fetchCompanies().subscribe((companies) => {
      this.companiesStateService.updateCompanies(
        companies.filter(({ status }) => status === true)
      );
    });
  }

  updateCompany(id: string, payload: UpdateCompany) {
    return this.http
      .patch<Company>(`${this.API_URL}/${id}`, { ...payload })
      .subscribe((updatedCompany) => {
        this.companiesStateService.updateCompany(updatedCompany);
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
