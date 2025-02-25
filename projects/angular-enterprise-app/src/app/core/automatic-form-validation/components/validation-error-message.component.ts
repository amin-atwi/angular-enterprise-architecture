import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
@Component({
    selector: 'pack-and-track-validation-message',
    template: `
                <span class="text-xs text-start bottom-2 text-warn" [class.hidden]="hide">
                  {{ textMessage }}
                </span>
              `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class ValidationMessageComponent {
  textMessage = '';
  hide = true;
  constructor(private cdr: ChangeDetectorRef) {}
  @Input()
  set text(value: string) {
    if (this.textMessage !== value) {
      this.textMessage = value;
      this.hide = false;
      this.cdr.detectChanges();
    }
  }
}