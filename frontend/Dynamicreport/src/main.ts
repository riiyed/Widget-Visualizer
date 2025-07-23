import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { AppModule } from './app/app.module';

ModuleRegistry.registerModules([AllCommunityModule]);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
