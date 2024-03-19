import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../routeservice/auth.service';
import { TokenService } from '../../../auth/token/token.service';
import { initFlowbite } from 'flowbite';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-createcollage',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './createcollage.component.html',
  styleUrl: './createcollage.component.css'
})
export class CreatecollageComponent implements OnInit{
  workspaceId: any;
  collage = {
    collage_image_id: "",
    workspace_id: ""
  }

  collageId: any;
  
  constructor(
    private authService: AuthService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private tokenService: TokenService,
  ) { }

  ngOnInit(): void {
    if (document !== undefined) {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.collageId = params["params"]["collage_id"];
      this.workspaceId = params["params"]["workspace_id"];
    });
  }

  createCollage() {
    this.collage["workspace_id"] = this.workspaceId;
    console.log(this.collage);
    this.authService.createCollage(this.collage).subscribe(
      (response) => {
        this.collage = response.data.collage;
        this.route.navigate(["../collage"], {relativeTo: this.aRoute})
      },
      (error) => {
        console.log(error);
      }
    )
  }

  goToCollage() {
    this.route.navigate(['../../collage'], {relativeTo: this.aRoute}) 
  }


}
