import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ApiService } from 'src/app/demo/service/api.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        AutoCompleteModule, CalendarModule, ChipsModule, DropdownModule, InputMaskModule, InputNumberModule, CascadeSelectModule, MultiSelectModule, InputTextareaModule,
        InputTextModule,ReactiveFormsModule,
        ToastModule,
    ],
    templateUrl: './edit-employee.component.html',
    styleUrl: './edit-employee.component.scss',
    providers: [MessageService]
})
export class EditEmployeeComponent {
    states = undefined;
    visible: boolean = false;

    ngOnInit() {
        this.states = [
            {name: 'Arizona', code: 'Arizona'},
            {name: 'California', code: 'California'},
            {name: 'Florida', code: 'Florida'},
            {name: 'Ohio', code: 'Ohio'},
            {name: 'Washington', code: 'Washington'}
        ];

        const currentEmployeeId = this.router.url.split('/').pop();
        if (currentEmployeeId) {
          this.getEmployeeById(currentEmployeeId);
        }
    }

    constructor(public router:Router, public layoutService: LayoutService, private messageService: MessageService) { }
    apiService = inject(ApiService);
    


    getEmployeeById(currentEmployeeId: string) {
      console.log('Fetching employee by id:', currentEmployeeId);
      
      this.apiService.getEmployeeById(currentEmployeeId).subscribe((response) => {
        console.log('Employee:', response);
        this.editEmployeeForm.patchValue(response.employee);
      }, (error) => {
        console.error('Error fetching employee:', error);
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Error fetching employee data' });
      });
    }
    
    editEmployeeForm: FormGroup = new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        address: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        zipcode: new FormControl(''),
    })


    onSubmit() {
        if(this.editEmployeeForm.valid) {
            console.log('Update Form', this.editEmployeeForm.value);
            const currentEmployeeId = this.router.url.split('/').pop();
            this.updateEmployee(currentEmployeeId);
        }
        else {
            console.log('Form Invalid');
        }
    }
    

    

    updateEmployee(currentEmployeeId: string) {
        this.apiService.updateEmployee(this.editEmployeeForm.value, currentEmployeeId).subscribe((response) => {
            console.log('Employee updated Response:', response);
            if (response.status == 200) {
                // Redirect to dashboard
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Updated Successfully' });
                setTimeout(() => {
                  this.router.navigate(['/view-employee']);
                }, 2000);
            }
        },
        (error) => {
            console.error('Error Updating Employee:', error);
            // Handle other server errors
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Server Error' });
            console.log('Server Error:', error);
        });
    }

 }
