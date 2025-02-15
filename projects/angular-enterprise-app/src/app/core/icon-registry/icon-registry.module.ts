import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@NgModule({
  declarations: [],
  exports: [],
})
export class IconSvgModule {

  svgFolderPath = 'assets/icons/';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry
    .addSvgIcon(
      'menu',
      sanitizer.bypassSecurityTrustResourceUrl(
        `${this.svgFolderPath}menu.svg`
      )
    )
      .addSvgIcon(
        'coming-soon',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}coming-soon.svg`
        )
      ).addSvgIcon(
        'dashboard',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}dashboard.svg`
        )
      ).addSvgIcon(
        'settings',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}settings.svg`
        )
      ).addSvgIcon(
        'user-management',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}user-management.svg`
        )
      ).addSvgIcon(
        'forms',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}forms.svg`
        )
      ).addSvgIcon(
        'settings-dots',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}settings-dots.svg`
      )).addSvgIcon(
        'user-profile',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}user-profile.svg`
      )).addSvgIcon(
        'exit',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}exit.svg`
      )).addSvgIcon(
        'help',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}help.svg`
      )).addSvgIcon(
        'faq',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}faq.svg`
      )).addSvgIcon(
        'whats-new',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}whats-new.svg`
      )).addSvgIcon(
        'language',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}language.svg`
      )).addSvgIcon(
        'arabic',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}arabic.svg`
      )).addSvgIcon(
        'english',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}english.svg`
      )).addSvgIcon(
        'united-states',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}united-states.svg`
      )).addSvgIcon(
        'palestine',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}palestine.svg`
      )).addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}edit.svg`
      )).addSvgIcon(
        'play-ground',
        sanitizer.bypassSecurityTrustResourceUrl(
          `${this.svgFolderPath}play-ground.svg`
      ));
  }
}
