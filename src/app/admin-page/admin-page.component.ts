import {Component, KeyValueChanges, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../service/user/user.service';
import {ReportService} from '../service/report/report.service';
import {ClaimService} from '../service/claim/claim.service';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {UserDialogComponent} from './dialog/user-dialog/user-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit, OnChanges {
  private type = 'Customers';
  private list: any = [];
  private search: any;
  addUserDialogRef: MatDialogRef<UserDialogComponent>;

  // TODO: Use to switch side bar to top dropdown
  isMobile: Observable<BreakpointState> = this.breakpointObserver
    .observe(Breakpoints.Handset);

  constructor(
    private $router: Router,
    private userHttp: UserService,
    private reportHttp: ReportService,
    private claimHttp: ClaimService,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    const user = sessionStorage.getItem('user');
    if (user !== 'admin') {
      return this.$router.navigate(['cover']);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openDialog() {
    this.addUserDialogRef = this.dialog.open(UserDialogComponent, {
        data: {
          type: this.type
        }
    });
    console.log(this.type);
  }

  handleLogout() {
    sessionStorage.removeItem('user');
    return this.$router.navigate(['cover']);
  }

  handleChange = (e) => {
    this.list = [];
    this.type = e.target.name;
    switch (this.type) {
      case 'Customers':
        return this.userHttp.getUsersByType('customers')
          .subscribe(data => {
            this.list = data;
            console.log(this.list);
          });
      case 'Claim Officers':
        return this.userHttp.getUsersByType('claim_officers')
          .subscribe(data => {
            this.list = data;
            console.log(this.list);
          });
      case 'Inspect Officers':
        return this.userHttp.getUsersByType('inspect_officers')
          .subscribe(data => {
            this.list = data;
            console.log(this.list);
          });
      // case 'Reports':
      //   return this.reportHttp.getReports()
      //     .subscribe(data => {
      //       this.list = data;
      //       console.log(this.list);
      //     });
      // case 'Claims':
      //   return this.claimHttp.getClaims()
      //     .subscribe(data => {
      //       this.list = data;
      //       console.log(this.list);
      //     });
    }
  }

  handleSearch() {
    this.list = [];
    console.log(`${this.type}: ${this.search}`);
    switch (this.type) {
      case 'Customers':
        return this.userHttp.getUserByID(this.search)
          .subscribe(data => {
            console.log(data);
            this.list[0] = data;
            console.log(this.list);
          });
      case 'Claim Officers':
        return this.userHttp.getUserByID(this.search)
          .subscribe(data => {
            this.list[0] = data;
            console.log(this.list);
          });
      case 'Inspect Officers':
        return this.userHttp.getUserByID(this.search)
          .subscribe(data => {
            this.list[0] = data;
            console.log(this.list);
          });
      // case 'Reports':
      //   return this.reportHttp.getReportByID()
      //     .subscribe(data => {
      //       this.list = data;
      //       console.log(this.list);
      //     });
      // case 'Claims':
      //   return this.claimHttp.getClaimByID()
      //     .subscribe(data => {
      //       this.list = data;
      //       console.log(this.list);
      //     });
    }
  }
}
