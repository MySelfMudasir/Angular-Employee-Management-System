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
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ApiService } from 'src/app/demo/service/api.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


interface UploadEvent {
    originalEvent: Event;
    files: File[];
}


@Component({
    standalone: true,
    imports: [
        CommonModule,
        AutoCompleteModule, CalendarModule, ChipsModule, DropdownModule, InputMaskModule, InputNumberModule, CascadeSelectModule, MultiSelectModule, InputTextareaModule,
        InputTextModule,ReactiveFormsModule,
        ToastModule,
        FileUploadModule,
        ImageModule,
    ],
    templateUrl: './edit-employee.component.html',
    styleUrl: './edit-employee.component.scss',
    providers: [MessageService]
})
export class EditEmployeeComponent {
    states = undefined;
    role = undefined;
    visible: boolean = false;
    image: any;
    uploadedFiles: any;

    ngOnInit() {
        this.states = [
            {name: 'Arizona', code: 'Arizona'},
            {name: 'California', code: 'California'},
            {name: 'Florida', code: 'Florida'},
            {name: 'Ohio', code: 'Ohio'},
            {name: 'Washington', code: 'Washington'}
        ];
        this.role = [
            {name: 'Super Admin', code: 'Super Admin'},
            {name: 'Admin', code: 'Admin'},
            {name: 'User', code: 'User'}
        ]

        const currentEmployeeId = this.router.url.split('/').pop();
        if (currentEmployeeId) {
          this.getEmployeeById(currentEmployeeId);
        }
        else{
            this.router.navigate(['/view-employee']);
        }
    }

    constructor(public router:Router, public layoutService: LayoutService, private messageService: MessageService) { }
    apiService = inject(ApiService);
    



    editEmployeeForm: FormGroup = new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        address: new FormControl(''),
        state: new FormControl(''),
        city: new FormControl(''),
        zipcode: new FormControl(''),
        role: new FormControl('user'),
    })

    



    getEmployeeById(currentEmployeeId: string) {
        console.log('Fetching employee by id:', currentEmployeeId);
        
        this.apiService.getEmployeeById(currentEmployeeId).subscribe((response) => {
          console.log('Employee Data:', response);
          this.editEmployeeForm.patchValue(response.employee);
          this.image = `http://localhost:5000/${response.employee.image}`;
        }, (error) => {
          console.error('Error fetching employee:', error);
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Error fetching employee data' });
        });
    }



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
    





    onBasicUploadAuto(event: UploadEvent) {
        console.log('File Uploaded:', event);
        if (event.files.length > 0) {
            this.uploadedFiles = event.files[0];
            this.image = URL.createObjectURL(this.uploadedFiles);
        }
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }
    



    updateEmployee(currentEmployeeId: string) {
        const file = this.uploadedFiles;
        this.apiService.updateEmployee(this.editEmployeeForm.value, file, currentEmployeeId).subscribe((response) => {
            console.log('Employee updated Response:', response);
            if (response.status == 200) {
                // Redirect to view-employee
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
