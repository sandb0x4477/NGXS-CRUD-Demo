import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

import { environment } from '../environments/environment';
import { ProductState } from './store/products.state';
import { AppComponent } from './app.component';
import { ProductPageComponent } from './containers/product-page.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsMessageComponent } from './components/products-message/products-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductPageComponent,
    ProductsTableComponent,
    ProductEditComponent,
    ProductsMessageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([ProductState], { developmentMode: !environment.production }),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
