import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{
    // route:destination route where it needs to enter
    // state: current route state
    constructor(private authService:AuthService , private router:Router){}
    canActivate(route:ActivatedRouteSnapshot , state:RouterStateSnapshot){
        if(!this.authService.isAuth())
            this.router.navigate(['/login']);
        else
            return true;
    }
    canLoad(route:Route){
        if(!this.authService.isAuth())
        this.router.navigate(['/login']);
        else
        return true;
    }
}