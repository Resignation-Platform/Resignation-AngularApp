import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { ResignationService } from 'src/services/resignation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private service :ResignationService,
    private router:Router) {


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,

    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


     return this.service.isLoggedIn.pipe(
        take(1),
        map(
            (isLoggedIn: boolean) =>
          {
            if (!isLoggedIn)
            {
              this.router.navigate(['/login'])
              return false;
            }
            return true;
          }
        )
      );

  }

}
