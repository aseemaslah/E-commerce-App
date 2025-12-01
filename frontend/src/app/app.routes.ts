import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { Cartpage } from './cartpage/cartpage';
import { Purchasepage } from './purchasepage/purchasepage';
import { Orderdetails } from './orderdetails/orderdetails';
import { Categorypage } from './categorypage/categorypage';
import { Aboutus } from './aboutus/aboutus';
import { Contactus } from './contactus/contactus';
import { Developerinformation } from './developerinformation/developerinformation';
import { Privacypolicy } from './privacypolicy/privacypolicy';
import { Termsandcondtions } from './termsandcondtions/termsandcondtions';

export const routes: Routes = [
{
    path: "home",
    component: Home
},
{
    path: "",
    redirectTo: "home",
    pathMatch: "full"
},
{
    path: "cartpage",
    component: Cartpage
},
{
    path: "purchasepage",
    component: Purchasepage
},
{
    path: "orderdetails",
    component: Orderdetails
},
{
    path: "categorypage/:category",
    component: Categorypage
}, 

{
    path: "about",
    component: Aboutus
},
{
    path: "contact",
    component: Contactus
},
{
    path: "developer",
    component: Developerinformation
},
{
    path: "privacypolicy",
    component:Privacypolicy
},
{
    path: "terms",
    component: Termsandcondtions
}
    
];
