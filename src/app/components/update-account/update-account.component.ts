import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAccount } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-account',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-account.component.html',
  styleUrl: './update-account.component.css',
})
export class UpdateAccountComponent {
  accountId: number = 0;
  account: IAccount = {
    accountId: 0,
    accountHolder: '',
    accountType: '',
    accountBalance: 0,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountId = this.activatedRoute.snapshot.params['accountId'];
    this.accountService.getAccount(this.accountId).subscribe((account) => {
      this.account = account;
    });
  }

  updateAccount() {
    this.accountService.updateAccount(this.account).subscribe((account) => {
      this.router.navigate(['/']);
    });
  }
}
