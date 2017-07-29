import { Component, OnInit } from '@angular/core';
import { RelationshipService } from '../../services/relationship.service'
import { Subscription } from "rxjs/Subscription";
import {Router, ActivatedRoute, Params} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-pending-relationship',
  templateUrl: './pending-relationship.component.html',
  styleUrls: ['./pending-relationship.component.css']
})
export class PendingRelationshipComponent implements OnInit {
  private profile: any;
  private profileRequests: Array<any>;
  private profileRequested: Array<any>;
  constructor( private relationshipService: RelationshipService) { 

  }

  ngOnInit() {
    this.fetchRequests()
    this.fetchRequesting()
  }

  ngAfterContentInit() {
      $(document).ready(function() {
        $('select').material_select();
      });
      this.getProfileRequests()
  }

  fetchRequests(){

  }

  fetchRequesting(){
    
  }

  getProfileRequests() {
    this.getProfileRemoveRequest()
    this.getProfileRemoveReject()
    this.getProfileReject()
    this.getProfileConfirm()
  }


  getProfileRemoveRequest(){
    this.relationshipService.listenProfileToRemoveRequest().subscribe(res => {
      console.log(res)
      this.relationshipService.removePendingRequest({_id: res.profile._id}).subscribe(res => {
        console.log(res)        
      })      
    })
  }

  getProfileReject(){
    this.relationshipService.listenProfileToReject().subscribe(res => {
      console.log(res)
      this.relationshipService.rejectRequest({_id: res.profile._id}).subscribe(res => {
        console.log(res)
      })      
    })
  }

  getProfileRemoveReject(){
    this.relationshipService.listenProfileToRemoveReject().subscribe(res => {
      console.log(res)
      this.relationshipService.removeRejectRequest({_id: res.profile._id}).subscribe(res => {
        console.log(res)        
      })      
    })
  }

  getProfileConfirm(){
    this.relationshipService.listenProfileToConfirm().subscribe(res => {
      console.log(res)      
    })
  }

  

}
