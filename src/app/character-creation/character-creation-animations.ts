import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations'

export const ccAnimations =
trigger('fadeLeftAnimation', [
  transition('* => void', [
    style({ opacity: 1, transform: 'translateX(0)' }),
    animate('1s ease-in-out',
    style({ opacity: 0, transform: 'translateY(-30%)' }))
  ])
]);
