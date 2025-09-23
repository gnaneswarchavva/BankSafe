import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Customer } from "../../../bank/types/Customer"

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  userError$: Observable<string>;
  userSuccess$: Observable<string>;
  isFormSubmitted: boolean = false;
  errorMsg :String;
  constructor(
    private formBuilder: FormBuilder,
    private authServie: AuthService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
    });
    this.errorMsg="";
  }
   hasSpecialCharacters(inputString:string):boolean {
    // Define a regular expression for special characters
    const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  
    // Test if the inputString contains any special characters
    return specialCharactersRegex.test(inputString);
  }
  onSubmit() {
    this.isFormSubmitted = true;
    this.userSuccess$ = of('');
    this.userError$ = of('');
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (this.userForm.invalid) {
      return;
    } else {
      const { username, password, role,name,email } = this.userForm.value;
      if(password.length < 8)
      {
        this.userError$ = of("Password must be of 8 characters");
        return;
      }
      if(this.hasSpecialCharacters(username))
      {
        this.userError$ = of("User Name must consist of letter and number only!!");
        return;
      }
      console.log(emailRegex.test(email));
      if(!emailRegex.test(email))
      {
        this.userError$ = of("Invalid Email Id!!");
        return;

      }

      const customer: Customer = new Customer({
        username,
        password,
        role,
        name,
        email
      });
      
      this.authServie.createUser(customer).subscribe(
        (res: any) => {
          this.userSuccess$ = of("User created successfully");
        },
        (error) => {
          this.userError$ = of("User Alreay Exists:");
        }
      );
    }
  }
}