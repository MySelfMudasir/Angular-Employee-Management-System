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
    ],
    templateUrl: './add-employee.component.html',
    styleUrl: './add-employee.component.css',
    providers: [MessageService]
})
export class AddEmployeeComponent {
    states = undefined;
    visible: boolean = false;
    uploadedFiles: any[] = [];

    ngOnInit() {
        
        this.states = [
            {name: 'Arizona', code: 'Arizona'},
            {name: 'California', code: 'California'},
            {name: 'Florida', code: 'Florida'},
            {name: 'Ohio', code: 'Ohio'},
            {name: 'Washington', code: 'Washington'}
        ];
    }


    constructor(public router:Router, public layoutService: LayoutService, private messageService: MessageService) { }
    apiService = inject(ApiService);
    
    
    addEmployeeForm: FormGroup = new FormGroup({
        firstname: new FormControl('mudasir'),
        lastname: new FormControl('maqbool'),
        email: new FormControl('mudasir@gmail.com'),
        phone: new FormControl('030000000'),
        address: new FormControl('BWN'),
        state: new FormControl('Arizona'),
        city: new FormControl('BWN'),
        zipcode: new FormControl('62300'),
    })


    onSubmit() {
        if (this.addEmployeeForm.valid) {
            if (this.uploadedFiles.length == 1) {
                console.log('Form Submitted', this.addEmployeeForm.value);
                this.addEmployee();
            } else if (this.uploadedFiles.length > 1) {
                console.log('Multiple files selected');
                this.messageService.add({ severity: 'warning', summary: 'Failed', detail: 'Please upload only one file' });
            } else {
                console.log('No file uploaded');
                this.messageService.add({ severity: 'info', summary: 'Failed', detail: 'Please upload a file' });
            }
        } else {
            console.log('Form Invalid');
            this.messageService.add({ severity: 'danger', summary: 'Failed', detail: 'Form Invalid' });
        }
    }
    

    onUpload(event:UploadEvent) {
        console.log('File Uploaded:', event);
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
        console.log(this.uploadedFiles);
    }




    

    

    addEmployee() {
        const file = this.uploadedFiles[0];
        this.apiService.addEmployee(this.addEmployeeForm.value, file).subscribe((response) => {
            console.log('Employee Added Successfully:', response);
            if (response.status == 201) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Added Successfully' });
                // this.router.navigate(['/view-employee']);
            }
        },
        (error) => {
            console.error('Error Adding Employee:', error);
            // Handle other server errors
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Server Error' });
            console.log('Server Error:', error);
        });
    }

 }
