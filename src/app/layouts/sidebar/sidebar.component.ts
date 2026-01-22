import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  inject,
  ChangeDetectionStrategy,
  AfterViewInit,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { MENU } from "./menu1";
import { MenuItem } from "./menu.model";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, AfterViewInit {
  private router = inject(Router);
  translate = inject(TranslateService);
  
  menu: MenuItem[] | null = null;
  toggle: boolean = true;
  menuItems: MenuItem[] = [];
  @ViewChild("sideMenu") sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();

  constructor() {
    this.translate.setDefaultLang("es");
  }

  ngOnInit(): void {
    // Menu Items
    this.menuItems = MENU;
    this.router.events.subscribe((event) => {
      if (document.documentElement.getAttribute("data-layout") != "twocolumn") {
        if (event instanceof NavigationEnd) {
          this.initActiveMenu();
        }
      }
    });
  }

  /***
   * Activate droup down set
   */
  ngAfterViewInit() {
    setTimeout(() => {
      this.initActiveMenu();
    }, 0);
  }

  removeActivation(items: Element[]): void {
    items.forEach((item: Element) => {
      item.classList.remove("active");
    });
  }

  toggleItem(item: MenuItem): void {
    this.menuItems.forEach((menuItem: MenuItem) => {
      if (menuItem == item) {
        menuItem.isCollapsed = !menuItem.isCollapsed;
      } else {
        menuItem.isCollapsed = true;
      }
      if (menuItem.subItems) {
        menuItem.subItems.forEach((subItem: MenuItem) => {
          if (subItem == item) {
            menuItem.isCollapsed = !menuItem.isCollapsed;
            subItem.isCollapsed = !subItem.isCollapsed;
          } else {
            subItem.isCollapsed = true;
          }
          if (subItem.subItems) {
            subItem.subItems.forEach((childitem: MenuItem) => {
              if (childitem == item) {
                childitem.isCollapsed = !childitem.isCollapsed;
                subItem.isCollapsed = !subItem.isCollapsed;
                menuItem.isCollapsed = !menuItem.isCollapsed;
              } else {
                childitem.isCollapsed = true;
              }
              if (childitem.subItems) {
                childitem.subItems.forEach((childrenitem: MenuItem) => {
                  if (childrenitem == item) {
                    childrenitem.isCollapsed = false;
                    childitem.isCollapsed = false;
                    subItem.isCollapsed = false;
                    menuItem.isCollapsed = false;
                  } else {
                    childrenitem.isCollapsed = true;
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  // remove active items of two-column-menu
  activateParentDropdown(item: Element): boolean {
    item.classList.add("active");
    const parentCollapseDiv = item.closest(".collapse.menu-dropdown");

    if (parentCollapseDiv && parentCollapseDiv.parentElement) {
      const parentElement = parentCollapseDiv.parentElement;
      // to set aria expand true remaining
      if (parentElement.children[0]) {
        (parentElement.children[0] as Element).classList.add("active");
      }

      const closestCollapse = parentElement.closest(".collapse.menu-dropdown");
      if (closestCollapse) {
        const collapseElement = parentElement.closest(".collapse");
        if (collapseElement) {
          collapseElement.classList.add("show");
          
          const previousSibling = collapseElement.previousElementSibling;
          if (previousSibling) {
            previousSibling.classList.add("active");
            
            const siblingClosestCollapse = previousSibling.closest(".collapse");
            if (siblingClosestCollapse) {
              siblingClosestCollapse.classList.add("show");
              
              const siblingPreviousSibling = siblingClosestCollapse.previousElementSibling;
              if (siblingPreviousSibling) {
                siblingPreviousSibling.classList.add("active");
              }
            }
          }
        }
      }
      return false;
    }
    return false;
  }

  updateActive(event: Event): void {
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      this.removeActivation(items);
    }
    if (event.target && event.target instanceof Element) {
      this.activateParentDropdown(event.target);
    }
  }

  initActiveMenu() {
    let pathName = window.location.pathname;
    // Check if the application is running in production
    if (environment.production) {
      // Modify pathName for production build
      pathName = pathName.replace("/velzon/angular/material", "");
    }

    const active = this.findMenuItem(pathName, this.menuItems);
    if (active) {
      this.toggleItem(active);
    }
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link")) as HTMLAnchorElement[];
      const activeItems = items.filter((x: HTMLAnchorElement) =>
        x.classList.contains("active")
      );
      this.removeActivation(activeItems);

      const matchingMenuItem = items.find((x: HTMLAnchorElement) => {
        if (environment.production) {
          let path = x.pathname;
          path = path.replace("/velzon/angular/material", "");
          return path === pathName;
        } else {
          return x.pathname === pathName;
        }
      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  private findMenuItem(pathname: string, menuItems: MenuItem[]): MenuItem | null {
    for (const menuItem of menuItems) {
      if (menuItem.link && menuItem.link === pathname) {
        return menuItem;
      }

      if (menuItem.subItems) {
        const foundItem = this.findMenuItem(pathname, menuItem.subItems);
        if (foundItem) {
          return foundItem;
        }
      }
    }

    return null;
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: Event): void {
    var sidebarsize =
      document.documentElement.getAttribute("data-sidebar-size");
    if (sidebarsize == "sm-hover-active") {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover");
    } else {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        "sm-hover-active"
      );
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    document.body.classList.remove("vertical-sidebar-enable");
  }
}
