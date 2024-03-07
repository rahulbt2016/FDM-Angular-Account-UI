import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IAccount } from '../../models/account.model';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
}
