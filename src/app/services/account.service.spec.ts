import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { IFilter } from '../models/filter.model';
import { IAccount } from '../models/account.model';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all accounts', () => {
    const dummyAccounts = [
      {
        accountId: 1,
        accountType: 'Savings',
        accountHolder: 'Rahul Tiwari',
        accountBalance: 1000,
      },
      {
        accountId: 2,
        accountType: 'Current',
        accountHolder: 'Sandeep Das',
        accountBalance: 2000,
      },
    ];

    service.getAccounts().subscribe((accounts) => {
      expect(accounts.length).toBe(2);
      expect(accounts).toEqual(dummyAccounts);
    });

    const request = httpMock.expectOne(`${service.baseUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyAccounts);
  });

  it('should get account by id', () => {
    const dummyAccount = {
      accountId: 1,
      accountType: 'Savings',
      accountHolder: 'Rahul Tiwari',
      accountBalance: 1000,
    };

    service.getAccount(1).subscribe((account) => {
      expect(account).toEqual(dummyAccount);
    });

    const request = httpMock.expectOne(`${service.baseUrl}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyAccount);
  });

  it('should create an account', () => {
    const dummyAccount = {
      accountId: 1,
      accountType: 'Savings',
      accountHolder: 'Rahul Tiwari',
      accountBalance: 1000,
    };

    service.addAccount(dummyAccount).subscribe((account) => {
      expect(account).toEqual(dummyAccount);
    });

    const request = httpMock.expectOne(`${service.baseUrl}`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyAccount);
  });

  it('should update an account', () => {
    const dummyAccount = {
      accountId: 1,
      accountType: 'Savings',
      accountHolder: 'Rahul Tiwari',
      accountBalance: 1000,
    };

    service.updateAccount(dummyAccount).subscribe((account) => {
      expect(account).toEqual(dummyAccount);
    });

    const request = httpMock.expectOne(
      `${service.baseUrl}/${dummyAccount.accountId}`
    );
    expect(request.request.method).toBe('PUT');
    request.flush(dummyAccount);
  });

  it('should delete an account', () => {
    const dummyAccount = {
      accountId: 1,
      accountType: 'Savings',
      accountHolder: 'Rahul Tiwari',
      accountBalance: 1000,
    };

    service.deleteAccount(dummyAccount.accountId).subscribe((account) => {
      expect(account).toEqual(dummyAccount);
    });

    const request = httpMock.expectOne(
      `${service.baseUrl}/${dummyAccount.accountId}`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush(dummyAccount);
  });

  it('should filter accounts based on provided filter criteria with accountId only', () => {
    const filter: IFilter = {
      accountId: 1,
    } as IFilter;

    const dummyFilteredAccounts: IAccount[] = [
      {
        accountId: 1,
        accountType: 'Savings',
        accountHolder: 'Rahul Tiwari',
        accountBalance: 1000,
      },
    ];

    service.filterAccounts(filter).subscribe((filteredAccounts) => {
      expect(filteredAccounts).toEqual(dummyFilteredAccounts);
    });

    const request = httpMock.expectOne(
      `${service.baseUrl}/filterAccounts?accountId=1`
    );
    expect(request.request.method).toBe('GET');

    request.flush(dummyFilteredAccounts);
  });

  it('should filter accounts based on provided filter criteria with accountType only', () => {
    const filter: IFilter = {
      accountType: 'Savings',
    } as IFilter;

    const dummyFilteredAccounts: IAccount[] = [
      {
        accountId: 1,
        accountType: 'Savings',
        accountHolder: 'Rahul Tiwari',
        accountBalance: 1000,
      },
    ];

    service.filterAccounts(filter).subscribe((filteredAccounts) => {
      expect(filteredAccounts).toEqual(dummyFilteredAccounts);
    });

    const request = httpMock.expectOne(
      `${service.baseUrl}/filterAccounts?accountType=Savings`
    );
    expect(request.request.method).toBe('GET');

    request.flush(dummyFilteredAccounts);
  });

  it('should filter accounts based on provided filter criteria with accountHolder only', () => {
    const filter: IFilter = {
      accountHolder: 'Rahul Tiwari',
    } as IFilter;

    const dummyFilteredAccounts: IAccount[] = [
      {
        accountId: 1,
        accountType: 'Savings',
        accountHolder: 'Rahul Tiwari',
        accountBalance: 1000,
      },
    ];

    service.filterAccounts(filter).subscribe((filteredAccounts) => {
      expect(filteredAccounts).toEqual(dummyFilteredAccounts);
    });

    const request = httpMock.expectOne(
      `${service.baseUrl}/filterAccounts?accountHolder=Rahul%20Tiwari`
    );
    expect(request.request.method).toBe('GET');

    request.flush(dummyFilteredAccounts);
  });

  it('should filter accounts based on provided filter criteria with minAccountBalance only', () => {
    const filter: IFilter = {
      minAccountBalance: 1000,
    } as IFilter;

    const dummyFilteredAccounts: IAccount[] = [
      {
        accountId: 1,
        accountType: 'Savings',
        accountHolder: 'Rahul Tiwari',
        accountBalance: 10000,
      },
    ];

    service.filterAccounts(filter).subscribe((filteredAccounts) => {
      expect(filteredAccounts).toEqual(dummyFilteredAccounts);
    });

    const request = httpMock.expectOne(
      `${service.baseUrl}/filterAccounts?minAccountBalance=1000`
    );
    expect(request.request.method).toBe('GET');

    request.flush(dummyFilteredAccounts);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
