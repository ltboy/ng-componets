import { Component, forwardRef, Input, Output, EventEmitter, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() length: number;
  @Output() search = new EventEmitter<string>();
  @ViewChild('input') el: ElementRef;
  constructor(private render: Renderer2, ) { }

  private _value: string | number = '';
  private composing = false;
  private onChange = (_: any) => { };
  private onTouched = () => { };

  private getSafeStr(val = '') {
    let safeStr: number | string;
    if (this.type === 'number') {
      if (isNaN(Number(val)) || val === '') {
        safeStr = '';
      } else {
        const str = Number(val);
        safeStr = this.length ? Number(('' + str).slice(0, this.length)) : str;
      }
    } else {
      safeStr = this.length ? val.slice(0, this.length) : val;
    }
    this._value = safeStr;
    return safeStr;
  }
  hanleInput(value) {
    if (!this.composing) {
      this.writeValue(value);
    }
  }
  handleCompositionstart() {
    this.composing = true;
  }
  handleCompositionend(value) {
    this.composing = false;
    this.writeValue(value);
  }

  writeValue(value: string) {

    const safeStr = this.getSafeStr(('' + value).trim());
    this.render.setProperty(this.el.nativeElement, 'value', safeStr);
    this.onChange(safeStr);
  }

  // 设置当控件接收到change事件后，调用的函数
  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }

  // 设置当控件接收到touched事件后，调用的函数
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
