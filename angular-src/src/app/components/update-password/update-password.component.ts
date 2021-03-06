import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";


declare const Materialize: any;

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  
  password: String;
  cpassword: String;
  token: String;
  data: any;

  updateSub: Subscription;
  resetSub: Subscription;
  routeSub: Subscription;
  

  constructor(
    private auth: AuthService,
     private route: ActivatedRoute,
     private router: Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.token = params['token'];
      // console.log(this.token);
    });
   
  }

  resetPassword(){
    const update = {
      password: this.password,
      cpassword: this.cpassword,
      token: this.token  
    }

    if(this.validateForm(update)){
      this.auth.resetPassword(update).subscribe(data => {
        if(data.success){
      Materialize.toast( data.msg || "Password Updated Successfully", 3000, 'rounded toast-success')        
        this.router.navigate(['/login'])
      } else {
          Materialize.toast( data.msg || "Something went wrong check fields", 3000, 'rounded toast-danger')
          //this.router.navigate(['/login'])
      }
      })
    } 
  }

  updatePassword(){
    
    const update = {
      password: this.password,
      cpassword: this.cpassword  
    }

    if(this.validateForm(update)){
      this.auth.updatePassword(update).subscribe(data => {
        if(data.success){
      Materialize.toast( data.msg || "Password Updated Successfully", 3000, 'rounded toast-success')        
        } else {
          Materialize.toast( data.msg || "Something went wrong check fields", 3000, 'rounded toast-danger')
        }
      })
    } 

  }

  validateForm(update){
    if (update.password == undefined || update.cpassword == undefined) {
      Materialize.toast("Fill in all fields.", 3000, 'rounded toast-danger')
      return false
    } 
    
    else if (update.password != update.cpassword) {
      Materialize.toast("Passwords do not match.", 3000, 'rounded toast-danger')
      return false
    }

     return true
  }

  ngOnDestroy() {
    if(this.resetSub != null) {
      this.resetSub.unsubscribe()    
    }
    if(this.updateSub != null) {
      this.updateSub.unsubscribe()
    }
    if(this.routeSub != null) {
      this.routeSub.unsubscribe()
    }
  }
}
