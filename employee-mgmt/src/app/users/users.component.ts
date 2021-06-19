import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  employeeList = [];
  deletedEmployeeList = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.employeeService.getEmpList().subscribe((response: any) => {
      if (response && response.length) {
        const list = [];
        response.forEach(item => {
          list.push({
            id: item.id,
            name: item.name,
            address: item.address,
            company: (item.company && item.company.name) ? item.company.name : ''
          });
        })
        this.employeeList = list;
      }
    })
  }

  onDelete(item) {
    const index = this.employeeList.findIndex(emp => emp.id === item.id);
    this.deletedEmployeeList.push(this.employeeList.splice(index, 1)[0]);
    this.repopulateLists();
  }

  onRestore(item) {
    const index = this.deletedEmployeeList.findIndex(emp => emp.id === item.id);
    this.employeeList.push(this.deletedEmployeeList.splice(index, 1)[0]);
    this.repopulateLists();
  }

  repopulateLists() {
    this.employeeList = [...this.employeeList];
    this.deletedEmployeeList = [...this.deletedEmployeeList];
  }

  addEmployee() {

  }
  onEdit(item) {

  }
}
