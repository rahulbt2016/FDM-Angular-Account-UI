import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { IAccount } from '../../models/account.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-account-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-account-form.component.html',
  styleUrl: './add-account-form.component.css',
})
export class AddAccountFormComponent {
  constructor(private accountService: AccountService, private router: Router) {}
  account: IAccount = {
    accountId: 0,
    accountType: '',
    accountBalance: 0,
    accountHolder: '',
  };
  addAccount(form: NgForm) {
    this.account = form.value;
    this.accountService.addAccount(this.account).subscribe((account) => {});
    form.reset();
    this.router.navigate(['/']);
  }
}
