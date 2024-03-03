import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AppComponent } from './app/app.component'; // Import AppComponent

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
