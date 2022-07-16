import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations';
export const appAnimations =
  trigger('routeAnimations', [
    transition('* => Info', [
      query(':enter, :leave',
        style({ position: 'fixed',  width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20%)' }),
          animate('0.8s ease-in-out',
          style({ opacity: 1, transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate('0.8s ease-in-out',
          style({ opacity: 0 }))
          ], { optional: true }),
      ])
    ]),
    transition('Info => *', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ opacity: 0}),
          animate('0.8s ease-in-out',
          style({ opacity: 1}))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'translateY(0%)' }),
          animate('0.8s ease-in-out',
          style({ opacity: 0, transform: 'translateY(20%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('CharCreation => NewCharacter', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20%)' }),
          animate('0.8s 1.5s ease-in-out',
          style({ opacity: 1, transform: 'translateY(0%)'}))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate('1.5s ease-in-out',
          style({ opacity: 0 }))
        ], { optional: true }),
      ])
    ]),
    transition('* => *', [
      query(':enter, :leave',
        style({ position: 'fixed',  width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ opacity: 0 }),
          animate('0.8s ease-in-out',
          style({ opacity: 1 }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1 }),
          animate('0.8s ease-in-out',
          style({ opacity: 0 }))
          ], { optional: true }),
      ])
    ]),

  ]);

export const introAnimations =
  trigger('dropDownAnimation', [
    transition('void => *', [
      style({ transform: 'translateY(-100%)' }),
      animate('1s ease-in-out',
      style({ transform: 'translateY(0%)' }))
    ])
  ]);




