import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}`;


  addUser(data: any): Observable<any> {
    console.log('Data Recevied In Service:', data);
    return this.http.post<any>(`${this.apiUrl}/users/add-user`, data);
  } 


  validateUser(data: any): Observable<any> {
    console.log('Data Recevied In Service:', data);
    return this.http.post<any>(`${this.apiUrl}/users/validate-user`, data);
  }

  addEmployee(data: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('firstname', data.firstname);
    formData.append('lastname', data.lastname);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('address', data.address);
    formData.append('state', data.state);
    formData.append('city', data.city);
    formData.append('zipcode', data.zipcode);
    if (file) {
        formData.append('image', file); // Append the image file
    }

    return this.http.post<any>(`${this.apiUrl}/employee/add-employee`, formData);
}



// addEmployee(data: any): Observable<any> {
  //   console.log('Data Recevied In Service:', data);
  //   return this.http.post<any>(`${this.apiUrl}/employee/add-employee`, data);
  // }

  viewEmployee(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/employee/view-employee`);
  }

  getEmployeeById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employee/get-employee/${id}`);
  }

  updateEmployee(data: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/employee/update-employee/${id}`, data);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/employee/delete-employee/${id}`);
  }


  // uploadImage(image: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('image', image);
  //   return this.http.post(`${this.apiUrl}/upload`, formData);
  // }

  // getImages(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/images`);
  // }

}
