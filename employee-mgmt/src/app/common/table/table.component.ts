import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input()
  set empList(list: any[]) {
    this.employeeList = list;
    this.originalEmployeeList = _.cloneDeep(list);
  }

  @Input() showRestore = false;

  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onRestore = new EventEmitter();

  employeeList = [];
  originalEmployeeList: Array<any> = [];
  isSorted = false;
  sortColumnName: string = null;

  constructor() { }

  ngOnInit() {

  }

  // Sort employee list in ascending and descending order and display the result.
  sortEmployees(sortColumn: string) {
    if (this.sortColumnName !== sortColumn) {
      this.isSorted = false;
    }
    this.sortColumnName = sortColumn;
    let sortOrder: string;
    if (this.isSorted) {
      sortOrder = 'desc';
    } else {
      sortOrder = 'asc';
    }
    this.isSorted = !this.isSorted;
    this.employeeList = _.orderBy(this.employeeList, [sortColumn], [sortOrder]);
  }

  // Search the employee and display the result.
  searchEmployee(event: any, columnName: string) {
    if (event.target.value) {
      const value = event.target.value.toLowerCase();
      this.employeeList = _.filter(this.originalEmployeeList, (obj) => {
        if (columnName === 'address') {
          if (obj.address.street.toLowerCase().indexOf(value) !== -1) { return obj; }
        } else {
          if (obj[columnName].toLowerCase().indexOf(value) !== -1) { return obj; }
        }
      })
    } else {
      this.employeeList = _.cloneDeep(this.originalEmployeeList);
    }
  }

  edit(item: any) {
    this.onEdit.emit(item);
  }

  remove(item: any) {
    this.onDelete.emit(item);
  }

  restore(item: any) {
    this.onRestore.emit(item);
  }

}
