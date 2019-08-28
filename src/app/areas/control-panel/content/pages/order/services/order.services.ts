import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthenService } from '../../../../services/authen.service';
// import { GridRequest } from '../../../services/grid-request';
import { environment } from '../../../../../../../environments/environment';
import { filter, map, flatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class OrderService {
    header = new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        });
    constructor(private http: HttpClient,
        private authService: AuthenService
    ) {
    }

    public getOrders(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Orders`);
    }

    public getOrdersWithName(): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Orders/ordersList`, { headers: this.header });
    }

    public getOrdersByClient(userId: any): Observable<any> {
        return this.http.get(`${environment.apiRootUrl}/v1/Orders/${userId}`, { headers: this.header });
    }

    // public getOrderPage(userId: any, orderId: any): Observable<any> {
    //     return this.http.get(`${environment.apiRootUrl}/v1/Orders/orderPage/${userId}/${orderId}`, { headers: this.header });
    // }

    public updateOrder(Id: any, model: any): Observable<any> {
        return this.http.put(`${environment.apiRootUrl}/v1/Orders/${Id}`, model, { headers: this.header });
    }

    public deleteOrder(id: any): Observable<any> {
        return this.http.delete(`${environment.apiRootUrl}/v1/Orders/${id}`, { headers: this.header });
    }

    public createOrder(model: any): Observable<any> {
        return this.http.post<any>(`${environment.apiRootUrl}/v1/Orders`, model, { headers: this.header });
    }
}
