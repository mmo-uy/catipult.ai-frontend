import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal } from '../../../types';
import { environment } from '../../environments/environment.development';

const baseUrl = `${environment.API_URL}/goals`;
@Injectable({
  providedIn: 'root',
})
export class GoalService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Goal[]> {
    return this.http.get<Goal[]>(baseUrl);
  }

  getSingle(id: string): Observable<Goal> {
    return this.http.get<Goal>(`${baseUrl}/${id}`);
  }

  create(data: Goal): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: string, data: Goal): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string): Observable<Goal[]> {
    return this.http.get<Goal[]>(`${baseUrl}?title=${title}`);
  }
}
