import { NgModule } from "@angular/core";
import { MenuHeaderComponent } from "./component/menu-header/menu-header/menu-header.component";

const components = [MenuHeaderComponent];

@NgModule({
  declarations: [...components],
  imports: [],
  exports: [...components],
})
export class SharedModule { }
