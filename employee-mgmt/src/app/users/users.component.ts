import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Component, OnInit, TemplateRef } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  employeeList = [];
  deletedEmployeeList = [];
  modalRef: BsModalRef;
  isAddOperation: boolean;
  empForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.empForm = new FormGroup({
      id: new FormControl([]),
      name: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      address: new FormGroup({
        street: new FormControl('', [Validators.required]),
        suite: new FormControl([]),
        city: new FormControl([]),
        zipcode: new FormControl([])
      })
    });
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

  openAddModal(template: TemplateRef<any>) {
    this.isAddOperation = true;
    this.empForm.reset();
    this.modalRef = this.modalService.show(template);
  }

  openEditModal(item, template: TemplateRef<any>) {
    this.isAddOperation = false;
    this.empForm.reset();
    this.empForm.patchValue({
      id: item.id,
      name: item.name ? item.name : '',
      company: item.company ? item.company : '',
      address: {
        street: item.address.street ? item.address.street : '',
        suite: item.address.suite ? item.address.suite : '',
        city: item.address.city ? item.address.city : '',
        zipcode: item.address.zipcode ? item.address.zipcode : ''
      }
    })
    this.modalRef = this.modalService.show(template);
  }

  addEmployee() {
    this.modalRef.hide();
    const value = this.empForm.value;
    const obj = {
      id: this.employeeList.length + this.deletedEmployeeList.length + 1,
      name: value.name ? value.name : '',
      company: value.company ? value.company : '',
      address: {
        street: value.address.street ? value.address.street : '',
        suite: value.address.suite ? value.address.suite : '',
        city: value.address.city ? value.address.city : '',
        zipcode: value.address.zipcode ? value.address.zipcode : ''
      }
    }
    this.employeeList.push(obj);
    this.repopulateLists();
  }

  editEmployee() {
    const value = this.empForm.value;
    const employee = this.employeeList.find(item => item.id === value.id);
    employee.name = value.name;
    employee.company = value.company;
    employee.address.street = value.address.street ? value.address.street : '';
    employee.address.suite = value.address.suite ? value.address.suite : '';
    employee.address.city = value.address.city ? value.address.city : '';
    employee.address.zipcode = value.address.zipcode ? value.address.zipcode : '';
    this.modalRef.hide();
    this.repopulateLists();
  }
}
