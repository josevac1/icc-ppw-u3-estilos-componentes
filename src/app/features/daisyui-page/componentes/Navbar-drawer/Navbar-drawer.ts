import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeSwitcher } from "../../../../shared/components/theme-switcher/theme-switcher";

@Component({
  selector: 'app-navbar-drawer',
  imports: [RouterLink, RouterLinkActive, ThemeSwitcher],
  templateUrl: './Navbar-drawer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarDrawer { 
  
}