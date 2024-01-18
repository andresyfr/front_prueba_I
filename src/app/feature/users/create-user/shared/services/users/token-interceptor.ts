import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '@feature/login/shared/services/login/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor{
  
    private tokenInterceptado : string= '';

    constructor(private loginService: LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('ingrese a interceptación');
      this.loginService.loginTokenChange.subscribe((token)=>{
        this.tokenInterceptado=token;
        localStorage.setItem('token',this.tokenInterceptado);
      });
      console.log('petición interceptada: '+this.tokenInterceptado);
      const request = req.clone({
        setHeaders: {
          Authorization:'Token: '+this.tokenInterceptado
        }
      });
      return next.handle(request);
    }

}