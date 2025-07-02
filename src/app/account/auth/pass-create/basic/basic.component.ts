import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ChangedPassRequestDTO } from "src/app/account/login/DTO/ChangedPassRequestDTO";
import { LoginResponseDTO } from "src/app/account/login/DTO/LoginResponseDTO";
import { LoginService } from "src/app/account/login/Services/LoginService";
import { AlertcustomService } from "src/app/core/services/alertcustom.service";
import { AsciiShiftService } from "src/app/core/services/ascii-shift.service";

@Component({
  selector: "app-basic",
  templateUrl: "./basic.component.html",
  styleUrls: ["./basic.component.scss"],
})

/**
 * Basic Component
 */
export class BasicComponent implements OnInit {
  // Login Form
  passresetForm!: UntypedFormGroup;
  submitted = false;
  passwordField!: boolean;
  confirmField!: boolean;
  error = "";
  returnUrl!: string;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private asciiShiftService: AsciiShiftService,
    private alertService: AlertcustomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.passresetForm = this.formBuilder.group(
      {
        password: ["", [Validators.required]],
        cpassword: ["", [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );

    // Password Validation set
    var myInput = document.getElementById("password-input") as HTMLInputElement;
    var letter = document.getElementById("pass-lower");
    var capital = document.getElementById("pass-upper");
    var number = document.getElementById("pass-number");
    var length = document.getElementById("pass-length");

    // When the user clicks on the password field, show the message box
    myInput.onfocus = function () {
      let input = document.getElementById("password-contain") as HTMLElement;
      input.style.display = "block";
    };

    // When the user clicks outside of the password field, hide the password-contain box
    myInput.onblur = function () {
      let input = document.getElementById("password-contain") as HTMLElement;
      input.style.display = "none";
    };

    // When the user starts to type something inside the password field
    myInput.onkeyup = function () {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if (myInput.value.match(lowerCaseLetters)) {
        letter?.classList.remove("invalid");
        letter?.classList.add("valid");
      } else {
        letter?.classList.remove("valid");
        letter?.classList.add("invalid");
      }

      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if (myInput.value.match(upperCaseLetters)) {
        capital?.classList.remove("invalid");
        capital?.classList.add("valid");
      } else {
        capital?.classList.remove("valid");
        capital?.classList.add("invalid");
      }

      // Validate numbers
      var numbers = /[0-9]/g;
      if (myInput.value.match(numbers)) {
        number?.classList.remove("invalid");
        number?.classList.add("valid");
      } else {
        number?.classList.remove("valid");
        number?.classList.add("invalid");
      }

      // Validate length
      if (myInput.value.length >= 8) {
        length?.classList.remove("invalid");
        length?.classList.add("valid");
      } else {
        length?.classList.remove("valid");
        length?.classList.add("invalid");
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.passresetForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.passresetForm.invalid) {
      return;
    } else {
      this.resetPassword();
    }
  }

  /**
   * Password Hide/Show
   */
  togglepasswordField() {
    this.passwordField = !this.passwordField;
  }

  /**
   * Password Hide/Show
   */
  toggleconfirmField() {
    this.confirmField = !this.confirmField;
  }

  passwordsMatchValidator(form: UntypedFormGroup) {
    const password = form.get("password")?.value;
    const cpassword = form.get("cpassword")?.value;
    return password === cpassword ? null : { passwordsMismatch: true };
  }

  /**
   * Password Reset
   */
  resetPassword() {
    const changedData = new ChangedPassRequestDTO({
      id: this.loginService.id ?? 0,
      usuario: this.loginService.username ?? "",
      clave: this.asciiShiftService.transform(
        this.passresetForm.value.password
      ),
      clave_nueva: this.asciiShiftService.transform(
        this.passresetForm.value.cpassword
      ),
    });
    console.log(changedData);

    this.loginService.changedPassword(changedData).then(
      (response: LoginResponseDTO) => {
        const mensaje = response.respuesta?.toLowerCase() || "";

        if (mensaje.includes("correctamente")) {
          this.alertService.showSuccess(response.respuesta);
          this.loginService.logout();
          this.router.navigate(["/auth/login"]);
        } else if (mensaje.includes("distinta")) {
          this.alertService.showWarning(response.respuesta);
        } else if (mensaje.includes("error")) {
          this.alertService.showError("Error:", response.respuesta);
        } else {
          // Manejo de casos no previstos
          this.alertService.showInfo(
            "Respuesta inesperada",
            response.respuesta
          );
        }
      },

      (error: LoginResponseDTO | Error) => {
        if (error instanceof Error) {
          console.error("Error inesperado:", error.message);
          this.alertService.showError("Error inesperado:", error.message);
        } else {
          console.error("Error de la API:", error.respuesta);

          this.alertService.showError("Error de la API:", error.respuesta);
          // Maneja el error devuelto por la API
        }
      }
    );
  }
}
