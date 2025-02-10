import { Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/demo/service/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        ToastModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public router:Router, public layoutService: LayoutService, private messageService: MessageService) { }

    apiService = inject(ApiService);


    loginForm: FormGroup = new FormGroup({
        email: new FormControl('mudasir7777@gmail.com'),
        password: new FormControl('mudasir123')
    })
    
    onSubmit() {
        if (this.loginForm.valid) {
            // Handle form submission
            console.log('Form Submitted', this.loginForm.value);
            this.validateUser();
        }
        else {
            console.log('Form Invalid');
        }
    }




    validateUser() {
        this.apiService.validateUser(this.loginForm.value).subscribe(
            (response) => {
                console.log('User Validated', response);
                if (response.status == 200) {
                    // Redirect to dashboard
                    this.router.navigate(['/add-employee']);
                }
            },
            (error) => {
                if (error.status === 404) {
                    // Handle "User not found" case
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Invalid User' });
                    console.log('Invalid User');
                } else {
                    // Handle other server errors
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Server Error' });
                    console.log('Server Error:', error);
                }
            }
        );
    }
}
