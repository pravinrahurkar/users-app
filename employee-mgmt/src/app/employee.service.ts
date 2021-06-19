import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) { }

  employees: any = {"data":
    [
      {
        "id": 1,
        "name": "John",
        "phone": "9999999999",
        "address":
          {
            "city": "Pune",
            "address_line1":"ABC road",
            "address_line2":"XYZ building",
            "postal_code":"12455"
          }
      },
      {
        "id": 2,
        "name": "Jacob",
        "phone": "AZ99A99PQ9",
        "address":
          {
            "city": "Pune",
            "address_line1":"PQR road",
            "address_line2":"ABC building",
            "postal_code":"13455"
          }
      },
      {
        "id": 3,
        "name": "Arit",
        "phone": "145458522",
        "address":
          {
            "city": "Mumbai",
            "address_line1":"ABC road",
            "address_line2":"XYZ building",
            "postal_code":"12455"
          }
      },
      {
        "id": 4,
        "name": "Mila",
        "phone": "AS8787898",
        "address":
          {
            "city": "New York",
            "address_line1":"JM road",
            "address_line2":"ASH building",
            "postal_code":"34323"
          }
      },
      ]
  }

  addEmployee(value: any) {
    this.employees.data.push(value);
  }

  getEmpList() {
    return this.http.get(this.url);
  }
}
