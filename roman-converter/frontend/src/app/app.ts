import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RomanService } from './services/roman.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  toRomanForm: FormGroup;
  romanResult: string | null = null;
  toRomanError: string | null = null;

  toIntegerForm: FormGroup;
  integerResult: number | null = null;
  toIntegerError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private romanService: RomanService,
    private cdr: ChangeDetectorRef
  ) {
    this.toRomanForm = this.fb.group({
      number: [
        '',
        [Validators.required, Validators.min(1), Validators.max(3999), Validators.pattern('^[0-9]+$')]
      ]
    });

    this.toIntegerForm = this.fb.group({
      roman: [
        '',
        [Validators.required, Validators.pattern('^[IVXLCDMivxlcdm]+$')]
      ]
    });
  }

  convertToRoman(): void {
    if (this.toRomanForm.invalid) return;
    this.romanResult = null;
    this.toRomanError = null;

    const number = parseInt(this.toRomanForm.value.number, 10);
    this.romanService.toRoman(number).subscribe({
      next: (res) => { this.romanResult = res.roman; this.cdr.detectChanges(); },
      error: (err) => { this.toRomanError = err.error?.error ?? 'Error inesperado.'; this.cdr.detectChanges(); }
    });
  }

  convertToInteger(): void {
    if (this.toIntegerForm.invalid) return;
    this.integerResult = null;
    this.toIntegerError = null;

    const roman = (this.toIntegerForm.value.roman as string).toUpperCase();
    this.romanService.toInteger(roman).subscribe({
      next: (res) => { this.integerResult = res.integer; this.cdr.detectChanges(); },
      error: (err) => { this.toIntegerError = err.error?.error ?? 'Error inesperado.'; this.cdr.detectChanges(); }
    });
  }

  get numberControl() { return this.toRomanForm.get('number'); }
  get romanControl()  { return this.toIntegerForm.get('roman'); }
}
