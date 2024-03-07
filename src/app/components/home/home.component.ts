import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IAccount } from '../../models/account.model';
import { AccountService } from '../../services/account.service';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { IFilter } from '../../models/filter.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  accounts: IAccount[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  deleteAccount(accountId: number) {
    this.accountService.deleteAccount(accountId).subscribe((response) => {
      this.accounts = this.accounts.filter((a) => a.accountId !== accountId);
    });
  }

  filterAccounts(filterAccountsForm: NgForm) {
    let filter: IFilter = filterAccountsForm.value;
    this.accountService.filterAccounts(filter).subscribe((accounts) => {
      this.accounts = accounts;
      filterAccountsForm.reset();
    });
  }
}
