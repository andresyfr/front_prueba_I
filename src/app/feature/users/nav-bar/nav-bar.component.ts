import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@feature/login/shared/services/login/login.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  isLoggedIn: Promise<boolean>;

  constructor(
    private readonly router: Router,
    private loginService: LoginService,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = of(this.loginService.estAautenticado()).toPromise();
    this.loginService.loginStatusChange.subscribe((status)=>{
      this.isLoggedIn=of(status).toPromise();
    });
  }

  /**
   * Este método no se puede modificar
   * */
  public logout(): void {
    this.isLoggedIn = of(false).toPromise();
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }

}
