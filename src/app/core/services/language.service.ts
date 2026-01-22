import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private cookieService = inject(CookieService);

  public languages: string[] = ['en', 'es', 'de', 'it', 'ru'];

  constructor() {
    let browserLang: string | undefined;
    /***
     * cookie Language Get
    */
    this.translate.addLangs(this.languages);
    if (this.cookieService.check('lang')) {
      browserLang = this.cookieService.get('lang');
    }
    else {
      browserLang = this.translate.getBrowserLang();
    }
    this.translate.use(browserLang?.match(/en|es|de|it|ru/) ? browserLang : 'en');
  }

  /***
   * Cookie Language set
   */
  public setLanguage(lang: string): void {
    this.translate.use(lang);
    this.cookieService.set('lang', lang);
  }

}
