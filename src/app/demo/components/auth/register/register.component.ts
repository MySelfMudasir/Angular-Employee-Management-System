import { Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/demo/service/api.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
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
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    providers: [MessageService]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(public router:Router, public layoutService: LayoutService, private messageService: MessageService) {}

    apiService = inject(ApiService);

    registerForm = new FormGroup({
      name: new FormControl('mudasir7777', [Validators.required]),
      email: new FormControl('mudasir7777@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('mudasir123', [Validators.required]),
      cpassword: new FormControl('mudasir123', [Validators.required])
    }, { validators: this.passwordMatchValidator }); // Add the custom validator to the form group


    
    

    onSubmit() {
      if (this.registerForm.valid) {
        // Remove cpassword from the form value
        const formValue = { ...this.registerForm.value };
        delete formValue.cpassword;
          
        // Handle form submission
        console.log('Form Submitted', formValue);
        this.addUser(formValue);
        this.registerForm.reset();
      } 
      else {
        // Handle form errors
        console.log('Form is not valid');
      }
    }








    addUser(userData: any) {
      this.apiService.addUser(userData).subscribe((response) => {
        console.log('Response:', response);
        if(response.status == 201) {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'User Added Successfully' });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        else{
          this.messageService.add({ severity: 'danger', summary: 'Failed', detail: 'User Added Failed' });
        }
      });
    }



    // Custom Validator to check if passwords match
    passwordMatchValidator(g: FormGroup) {
      return g.get('password')?.value === g.get('cpassword')?.value
        ? null : { mismatch: true };
    }


}
