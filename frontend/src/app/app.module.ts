import { ApplicationRef, NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './approutingmodule/app.router.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './auth/register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BrowserModule
  ],
  providers: [CookieService],
  // Don't include bootstrap array if bootstrapping AppComponent dynamically
})
export class AppModule {
  ngDoBootstrap(appRef: ApplicationRef) {
    // Bootstrap the AppComponent dynamically
    // Make sure AppComponent is properly defined and imported
    appRef.bootstrap(AppComponent); 
  }
}
