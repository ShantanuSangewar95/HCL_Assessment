import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  NgForm,
} from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-parent',
  standalone: true,
  templateUrl: './parent.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, AgGridAngular],
  styleUrl: './parent.component.scss',
})
export class ParentComponent {
  employeeForm: FormGroup;
  technologies: string[] = [
    'Angular',
    'Javascript',
    'Typescript',
    'Java',
    'Spring Boot',
  ];
  isSubmitted: boolean = false;
  employeeArray: any = [];
  api: any;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      employeeAddress: ['', Validators.required],
      employeeNeedPF: ['', Validators.required],
      employeeTechnology: ['', Validators.required],
    });


  }

  columnDefs = [
    { headerName: 'Employee Name', field: 'employeeName', editable: true },
    { headerName: 'Contact Number', field: 'employeeNumber', editable: true },
    { headerName: 'Address', field: 'employeeAddress', editable: true },
    { headerName: 'PF Required', field: 'employeeNeedPF', editable: true },
    {
      headerName: 'Primary Technology',
      field: 'employeeTechnology',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: this.technologies,
        handleGridCellEvent: this.onDataChangeHandler.bind(this),
      },
    },
    {
      headerName: 'Edit',
      cellRendererParams: {
        onClick: this.onEditButtonClick.bind(this),
        label: 'Edit',
      }
    }
  ];

  get f(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }

  onDataChangeHandler(params: ICellRendererParams): string {
    return params.value ? 
      params.value :
      (['Failed', 'Completed'].includes(params.data.status)) && !params.value ? this.technologies[0] : '';
  }

  getEmployeeDetails() {
    this.isSubmitted = true;
    this.employeeArray = [...this.employeeArray, this.employeeForm.value];
    this.resetForm();
  }

  resetForm() {
    this.employeeForm.reset();
  }

  validateContactNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onEditButtonClick(params: any) {
    this.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: 'employeeName',
    });
  }

  onSaveButtonClick(params: any) {
    this.api.stopEditing();
  }

  onRowEditingStopped(params: any) {
    console.log(params);
  }
}
