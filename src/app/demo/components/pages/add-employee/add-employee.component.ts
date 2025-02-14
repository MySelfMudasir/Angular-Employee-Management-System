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
import * as SimpleWebAuthnBrowser from '@simplewebauthn/browser';


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
    roles = undefined;
    visible: boolean = false;
    uploadedFiles: any[] = [];
    CurrentRegisteredEmployeeId: any = '';
    loading: boolean = false;

    ngOnInit() {
        
        this.states = [
            {name: 'Arizona', code: 'Arizona'},
            {name: 'California', code: 'California'},
            {name: 'Florida', code: 'Florida'},
            {name: 'Ohio', code: 'Ohio'},
            {name: 'Washington', code: 'Washington'}
        ];
        this.roles = [
            {name: 'Super Admin', code: 'Super Admin'},
            {name: 'Admin', code: 'Admin'},
            {name: 'User', code: 'User'}
        ]
    }


    constructor(public router:Router, public layoutService: LayoutService, private messageService: MessageService) { }
    apiService = inject(ApiService);
    
    
    addEmployeeForm: FormGroup = new FormGroup({
        employeeid: new FormControl('123'), // Same as
        username: new FormControl('abc'), // Same as
        firstname: new FormControl('mudasir'),
        lastname: new FormControl('maqbool'),
        email: new FormControl('mudasir7777@gmail.com'),
        phone: new FormControl('030000000'),
        address: new FormControl('BWN'),
        state: new FormControl('Arizona'),
        city: new FormControl('BWN'),
        zipcode: new FormControl('62300'),
        role: new FormControl('User'),
    })


    payload = {
        userId: 'test123',
        username: 'test123',
    };




    onSubmit() {
        if (this.addEmployeeForm.valid) {
            if (this.uploadedFiles.length == 1) {
                console.log('Form Submitted', this.addEmployeeForm.value);
                this.addEmployee();
            } else if (this.uploadedFiles.length > 1) {
                console.log('Multiple files selected');
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Please upload only one file' });
            }
            else if(this.CurrentRegisteredEmployeeId == '') {
                console.log('Fingerprint Not Recognized');
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Fingerprint Not Recognized' });
            }
            else {
                console.log('No Profile Pic uploaded');
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Please upload a Profile Pic' });
            }
        } else {
            console.log('Form Invalid');
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Form Invalid' });
        }
    }
    



    onUpload(event:UploadEvent) {
        console.log('File Uploaded:', event);
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({severity: 'success', summary: 'File Uploaded', detail: 'File Uploaded Successfully'});
        console.log(this.uploadedFiles);
    }




    

    

    addEmployee() {
        const file = this.uploadedFiles[0];
        this.addEmployeeForm.patchValue({
            employeeid: this.CurrentRegisteredEmployeeId,
            username: this.addEmployeeForm.value.firstname +'.'+ this.addEmployeeForm.value.lastname
        });
        console.log('Employee Data:', this.addEmployeeForm.value);
        
        this.apiService.addEmployee(this.addEmployeeForm.value, file).subscribe((response) => {
            console.log('Employee Added Successfully:', response);
            if (response.status == 201) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee Added Successfully' });
                // this.router.navigate(['/view-employee']);
            }
        },
        (error) => {
            if(error.error.message == 'Failed to add employee' && error.status('500')) {
                console.error('Error Adding User:', error.error.message);
                this.messageService.add({ severity: 'error', summary: 'Failed', detail:'Invalid Employee Username or Email' });
            }
            console.error('Error Adding Employee:', error);
            // Handle other server errors
            this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Server Error' });
            console.log('Server Error:', error);
        });
    }




    webAuthRegister(){
        this.loading = true;
        this.apiService.webAuthRegister(this.payload).subscribe((response: any) => {
        this.webAuthRegisterPasskey(response.id);
        });
    }

    
        
    webAuthRegisterPasskey(userId: string) {
        this.apiService.webAuthRegisterChallenge(userId).subscribe((response: any) => {
        console.log(response);
        const options = response.options;
        SimpleWebAuthnBrowser.startRegistration({ ...options }).then((authenticationResult: any) => {
            this.apiService.webAuthRegisterVerify(userId, authenticationResult).subscribe(result => {
            console.log(result);
            if(result.user.passkey.userVerified) {
                this.CurrentRegisteredEmployeeId = result.user.id;
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Fingerprint Recognized Successfully' });
                this.loading = false;
            }
            else {
                this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Fingerprint Not Recognized' });
                this.loading = false;
            }
            });
        }).catch(error => {
            console.log('Error:', error);
            this.loading = false;
            });
        });
    }
    






 }
