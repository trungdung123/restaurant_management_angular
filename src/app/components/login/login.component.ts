import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountLogin, JwtData } from 'src/app/commons/dto/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  accountLogin: AccountLogin = new AccountLogin();
  jwtData: JwtData = new JwtData();

  isSpinning: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  authentication(): void {
    this.accountService.authentication(this.accountLogin).subscribe(data => {
      this.jwtData = data.data;

      sessionStorage.setItem('jwtToken', this.jwtData.token);
      sessionStorage.setItem('username', this.jwtData.username);
      sessionStorage.setItem('role', this.jwtData.role);

      if ("ADMIN" == this.jwtData.role) {
        this.router.navigate(['/admin']);
      } else {
        this.notification.create(
          'error',
          'Lỗi đăng nhập',
          'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại'
        );
      }
      this.notification.create(
        'success',
        'Thông báo',
        'Đăng nhập thành công'
      );
      this.isSpinning = false;
      // setTimeout(() => location.reload(), 800);
    }, error => {
      this.isSpinning = false;
      this.notification.create(
        'error',
        'Lỗi đăng nhập',
        'Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại'
      );
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      console.log('submit', this.validateForm.value);
      this.accountLogin = {
        username: this.validateForm.value.userName,
        password: this.validateForm.value.password
      }
      this.authentication();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}