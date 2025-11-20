import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Inject,
  ViewChild,
  TemplateRef,
} from "@angular/core";
import { Subscription } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { EventService } from "../../core/services/event.service";

//Logout
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../core/services/auth.service";
import { AuthfakeauthenticationService } from "../../core/services/authfake.service";
import { Router } from "@angular/router";
import { TokenStorageService } from "../../core/services/token-storage.service";
import { AuthNewService } from "../../core/services/auth-new.service";

// Language
import { CookieService } from "ngx-cookie-service";
import { LanguageService } from "../../core/services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { allNotification, messages } from "./data";
import { CartModel } from "./topbar.model";
import { cartData } from "./data";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginService } from "../../account/login/Services/LoginService";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit, OnDestroy {
  messages: any;
  element: any;
  mode: string | undefined;
  @Output() mobileMenuButtonClicked = new EventEmitter();
  allnotifications: any;
  flagvalue: any;
  valueset: any;
  countryName: any;
  cookieValue: any;
  userData: any;
  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;
  totalNotify: number = 0;
  newNotify: number = 0;
  readNotify: number = 0;
  isDropdownOpen = false;
  @ViewChild("removenotification") removenotification!: TemplateRef<any>;
  notifyId: any;
  private userSubscription?: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private eventService: EventService,
    public languageService: LanguageService,
    private modalService: NgbModal,
    public _cookiesService: CookieService,
    public translate: TranslateService,
    private authService: AuthenticationService,
    private loginService: LoginService,
    private authFackservice: AuthfakeauthenticationService,
    private router: Router,
    private TokenStorageService: TokenStorageService,
    private authNewService: AuthNewService
  ) {}

  ngOnInit(): void {
    this.userData = this.TokenStorageService.getUser();
    this.element = document.documentElement;

    // Obtener datos del usuario desde AuthNewService
    const currentUser = this.authNewService.getCurrentUser();
    if (currentUser) {
      this.userData = {
        name: currentUser.fullName || "Usuario",
        profile: currentUser.email || "N/A",
      };
    } else {
      // Intentar obtener desde sessionStorage como fallback
      const userStr = sessionStorage.getItem("currentUser");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          this.userData = {
            name: user.fullName || "Usuario",
            profile: user.email || "N/A",
          };
        } catch (error) {
          this.userData = {
            name: "Usuario",
            profile: "N/A",
          };
        }
      } else {
        this.userData = {
          name: "Usuario",
          profile: "N/A",
        };
      }
    }

    // Cookies wise Language set
    this.cookieValue = this._cookiesService.get("lang");
    const val = this.listLang.filter((x) => x.lang === this.cookieValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.valueset = "assets/images/flags/us.svg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    // Fetch Data
    this.allnotifications = allNotification;

    this.messages = messages;
    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      var item_price = item.quantity * item.price;
      this.total += item_price;
    });

    // Suscribirse a cambios en el usuario actual
    this.userSubscription = this.authNewService.currentUser$.subscribe((user) => {
      if (user) {
        this.userData = {
          name: user.fullName || "Usuario",
          profile: user.email || "N/A",
        };
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    document.querySelector(".hamburger-icon")?.classList.toggle("open");
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle("fullscreen-enable");
    if (
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    // this.submitted = false;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Topbar Light-Dark Mode Change
   */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast("changeMode", mode);

    switch (mode) {
      case "light":
        document.documentElement.setAttribute("data-bs-theme", "light");
        break;
      case "dark":
        document.documentElement.setAttribute("data-bs-theme", "dark");
        break;
      default:
        document.documentElement.setAttribute("data-bs-theme", "light");
        break;
    }
  }

  /***
   * Language Listing
   */
  listLang = [
    { text: "English", flag: "assets/images/flags/us.svg", lang: "en" },
    { text: "Español", flag: "assets/images/flags/spain.svg", lang: "es" },
  ];

  /***
   * Language Value Set
   */
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Logout the user
   */
  logout() {
    this.loginService.logout();
    this.router.navigate(["/auth/login"]);
  }

  windowScroll() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      const backToTopElement = document.getElementById(
        "back-to-top"
      ) as HTMLElement;
      if (backToTopElement) {
        backToTopElement.style.display = "block";
      }
      document.getElementById("page-topbar")?.classList.add("topbar-shadow");
    } else {
      const backToTopElement = document.getElementById(
        "back-to-top"
      ) as HTMLElement;
      if (backToTopElement) {
        backToTopElement.style.display = "none";
      }
      document.getElementById("page-topbar")?.classList.remove("topbar-shadow");
    }
  }

  // Delete Item
  deleteItem(event: any, id: any) {
    var price = event.target
      .closest(".dropdown-item")
      .querySelector(".item_price").innerHTML;
    var Total_price = this.total - price;
    this.total = Total_price;
    this.cart_length = this.cart_length - 1;

    const emptyCartElement = document.getElementById(
      "empty-cart"
    ) as HTMLElement;
    if (emptyCartElement) {
      this.total > 1
        ? (emptyCartElement.style.display = "none")
        : (emptyCartElement.style.display = "block");
    }

    document.getElementById("item_" + id)?.remove();
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    } else {
      this.isDropdownOpen = true;
    }
  }
  // Search Topbar
  Search() {
    var searchOptions = document.getElementById(
      "search-close-options"
    ) as HTMLAreaElement;
    var dropdown = document.getElementById(
      "search-dropdown"
    ) as HTMLAreaElement;
    var input: any,
      filter: any,
      ul: any,
      li: any,
      a: any | undefined,
      i: any,
      txtValue: any;
    input = document.getElementById("search-options") as HTMLAreaElement;

    if (!searchOptions || !dropdown || !input) {
      return; // Si alguno de los elementos no existe, salir de la función
    }

    filter = input.value.toUpperCase();
    var inputLength = filter.length;

    if (inputLength > 0) {
      dropdown.classList.add("show");
      searchOptions.classList.remove("d-none");
      var inputVal = input.value.toUpperCase();
      var notifyItem = document.getElementsByClassName("notify-item");

      Array.from(notifyItem).forEach(function (element: any) {
        var notifiTxt = "";
        if (element.querySelector("h6")) {
          var spantext = element
            .getElementsByTagName("span")[0]
            .innerText.toLowerCase();
          var name = element.querySelector("h6").innerText.toLowerCase();
          if (name.includes(inputVal)) {
            notifiTxt = name;
          } else {
            notifiTxt = spantext;
          }
        } else if (element.getElementsByTagName("span")) {
          notifiTxt = element
            .getElementsByTagName("span")[0]
            .innerText.toLowerCase();
        }
        if (notifiTxt)
          element.style.display = notifiTxt.includes(inputVal)
            ? "block"
            : "none";
      });
    } else {
      dropdown.classList.remove("show");
      searchOptions.classList.add("d-none");
    }
  }

  /**
   * Search Close Btn
   */
  closeBtn() {
    var searchOptions = document.getElementById(
      "search-close-options"
    ) as HTMLAreaElement;
    var dropdown = document.getElementById(
      "search-dropdown"
    ) as HTMLAreaElement;
    var searchInputReponsive = document.getElementById(
      "search-options"
    ) as HTMLInputElement;

    if (dropdown) {
      dropdown.classList.remove("show");
    }
    if (searchOptions) {
      searchOptions.classList.add("d-none");
    }
    if (searchInputReponsive) {
      searchInputReponsive.value = "";
    }
  }

  // Remove Notification
  checkedValGet: any[] = [];
  onCheckboxChange(event: any, id: any) {
    this.notifyId = id;
    var result;
    if (id == "1") {
      var checkedVal: any[] = [];
      for (var i = 0; i < this.allnotifications.length; i++) {
        if (this.allnotifications[i].state == true) {
          result = this.allnotifications[i].id;
          checkedVal.push(result);
        }
      }
      this.checkedValGet = checkedVal;
    } else {
      var checkedVal: any[] = [];
      for (var i = 0; i < this.messages.length; i++) {
        if (this.messages[i].state == true) {
          result = this.messages[i].id;
          checkedVal.push(result);
        }
      }
      console.log(checkedVal);
      this.checkedValGet = checkedVal;
    }

    const notificationActionsElement = document.getElementById(
      "notification-actions"
    ) as HTMLElement;
    if (notificationActionsElement) {
      checkedVal.length > 0
        ? (notificationActionsElement.style.display = "block")
        : (notificationActionsElement.style.display = "none");
    }
  }

  notificationDelete() {
    if (this.notifyId == "1") {
      for (var i = 0; i < this.checkedValGet.length; i++) {
        for (var j = 0; j < this.allnotifications.length; j++) {
          if (this.allnotifications[j].id == this.checkedValGet[i]) {
            this.allnotifications.splice(j, 1);
          }
        }
      }
    } else {
      for (var i = 0; i < this.checkedValGet.length; i++) {
        for (var j = 0; j < this.messages.length; j++) {
          if (this.messages[j].id == this.checkedValGet[i]) {
            this.messages.splice(j, 1);
          }
        }
      }
    }
    this.calculatenotification();
    this.modalService.dismissAll();
  }

  calculatenotification() {
    this.totalNotify = 0;
    this.checkedValGet = [];

    const notificationActionsElement = document.getElementById(
      "notification-actions"
    ) as HTMLElement;
    if (notificationActionsElement) {
      this.checkedValGet.length > 0
        ? (notificationActionsElement.style.display = "block")
        : (notificationActionsElement.style.display = "none");
    }

    if (this.totalNotify == 0) {
      document
        .querySelector(".empty-notification-elem")
        ?.classList.remove("d-none");
    }
  }
}
