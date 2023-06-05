import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { TranslationWidth } from '@angular/common';

const WEEKDAYS = [ 'L', 'M', 'M', 'J', 'V', 'S','D']; // Traducción de los días de la semana en español


@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
    getWeekdayLabel(weekday: number): string {
        return WEEKDAYS[weekday - 1];
    }
    getWeekdayShortName(weekday: number): string {
        const weekdays: string[] = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
        return weekdays[weekday];
    }

    getMonthShortName(month: number): string {
        const months: string[] = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        return months[month - 1];
    }

    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }

    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }

  
}
