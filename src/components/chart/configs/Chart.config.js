import { formatChangePercent } from '../../../utils';
import * as deepmerge from 'deepmerge';


const idLogo = [
  'M 14.789062 33.492188 L 20.070312 33.492188 L 20.070312 15.117188 L 14.789062 15.117188 Z M 14.789062 11.792969 L 20.070312 11.792969 L 20.070312 7.160156 L 14.789062 7.160156 Z M 14.789062 11.792969 ',
  'M 30.882812 30.328125 C 33.191406 30.328125 34.773438 28.152344 34.773438 24.351562 C 34.773438 20.546875 33.191406 18.34375 30.882812 18.34375 C 28.574219 18.34375 27.183594 20.484375 27.183594 24.351562 C 27.183594 28.21875 28.605469 30.328125 30.882812 30.328125 M 34.742188 30.871094 C 33.414062 32.851562 31.578125 33.875 29.269531 33.875 C 25.003906 33.875 21.839844 30.230469 21.839844 24.320312 C 21.839844 18.40625 24.875 14.796875 29.175781 14.796875 C 31.578125 14.796875 33.347656 15.722656 34.644531 17.640625 L 34.644531 7.160156 L 39.894531 7.160156 L 39.894531 29.785156 C 39.855469 31.023438 39.921875 32.261719 40.082031 33.492188 L 34.898438 33.492188 Z M 34.742188 30.871094 ',
  'M 10.523438 33.714844 C 11.230469 33.722656 11.910156 33.441406 12.410156 32.9375 C 12.910156 32.433594 13.1875 31.746094 13.179688 31.03125 C 13.1875 30.3125 12.910156 29.621094 12.410156 29.109375 C 11.914062 28.601562 11.234375 28.3125 10.523438 28.3125 C 9.039062 28.3125 7.835938 29.53125 7.835938 31.03125 C 7.835938 31.746094 8.121094 32.433594 8.625 32.9375 C 9.128906 33.445312 9.8125 33.722656 10.523438 33.714844 ',
  'M 44.445312 17.511719 L 45.425781 17.511719 L 45.425781 23.425781 L 44.445312 23.425781 Z M 44.445312 14.921875 L 45.425781 14.921875 L 45.425781 16.011719 L 44.445312 16.011719 Z M 44.445312 14.921875 ',
  'M 49.820312 23.425781 L 49.820312 19.652344 C 49.84375 19.238281 49.769531 18.820312 49.601562 18.4375 C 49.410156 18.222656 49.128906 18.105469 48.839844 18.121094 C 48.496094 18.085938 48.160156 18.261719 47.988281 18.566406 C 47.769531 19.011719 47.671875 19.507812 47.703125 20.003906 L 47.703125 23.425781 L 46.691406 23.425781 L 46.691406 18.023438 C 46.660156 17.863281 46.660156 17.703125 46.628906 17.511719 L 47.671875 17.511719 L 47.671875 18.183594 C 47.863281 17.929688 48.097656 17.710938 48.367188 17.542969 C 48.632812 17.414062 48.925781 17.347656 49.222656 17.351562 C 49.65625 17.332031 50.078125 17.496094 50.390625 17.800781 C 50.664062 18.117188 50.8125 18.527344 50.800781 18.949219 L 50.800781 23.425781 Z M 49.820312 23.425781 ',
  'M 52.414062 16.488281 L 52.414062 16.105469 C 52.40625 15.890625 52.4375 15.671875 52.507812 15.46875 C 52.589844 15.328125 52.695312 15.207031 52.824219 15.117188 C 53.003906 14.984375 53.210938 14.898438 53.425781 14.859375 L 54.246094 14.796875 L 54.53125 14.796875 L 54.53125 15.59375 C 54.21875 15.5625 53.90625 15.644531 53.648438 15.820312 C 53.488281 15.945312 53.425781 16.265625 53.425781 16.777344 L 53.425781 17.511719 L 54.53125 17.511719 L 54.53125 18.246094 L 53.425781 18.246094 L 53.425781 23.425781 L 52.414062 23.425781 L 52.414062 18.246094 L 51.625 18.246094 L 51.625 17.511719 L 52.414062 17.511719 Z M 52.414062 16.488281 ',
  'M 57.25 18.246094 C 56.882812 18.21875 56.53125 18.421875 56.367188 18.757812 C 56.140625 19.292969 56.042969 19.871094 56.082031 20.453125 C 56.082031 21.28125 56.175781 21.859375 56.367188 22.175781 C 56.523438 22.527344 56.875 22.742188 57.25 22.722656 C 57.636719 22.746094 58 22.53125 58.167969 22.175781 C 58.367188 21.636719 58.453125 21.058594 58.421875 20.484375 C 58.457031 19.898438 58.371094 19.308594 58.167969 18.757812 C 57.992188 18.417969 57.628906 18.214844 57.25 18.246094 M 55.070312 20.453125 C 55.070312 19.367188 55.226562 18.597656 55.574219 18.085938 C 55.980469 17.578125 56.605469 17.304688 57.25 17.351562 C 58.042969 17.351562 58.578125 17.609375 58.925781 18.085938 C 59.273438 18.566406 59.464844 19.367188 59.464844 20.453125 C 59.464844 21.539062 59.273438 22.335938 58.925781 22.847656 C 58.578125 23.359375 58.042969 23.582031 57.25 23.582031 C 56.605469 23.632812 55.980469 23.359375 55.574219 22.847656 C 55.226562 22.335938 55.070312 21.539062 55.070312 20.453125 ',
  'M 61.425781 17.480469 L 61.519531 18.277344 C 61.605469 17.984375 61.796875 17.734375 62.058594 17.574219 C 62.335938 17.414062 62.652344 17.335938 62.972656 17.351562 L 63.164062 17.351562 L 63.164062 18.40625 L 62.910156 18.40625 C 62.519531 18.371094 62.132812 18.5 61.835938 18.757812 C 61.613281 18.980469 61.519531 19.332031 61.519531 19.875 L 61.519531 23.425781 L 60.507812 23.425781 L 60.507812 18.503906 C 60.507812 18.4375 60.476562 18.214844 60.445312 17.800781 C 60.421875 17.695312 60.410156 17.585938 60.414062 17.480469 Z M 61.425781 17.480469 ',
  'M 65.125 18.183594 C 65.296875 17.921875 65.523438 17.703125 65.789062 17.542969 C 66.375 17.269531 67.054688 17.292969 67.621094 17.609375 C 67.875 17.785156 68.066406 18.042969 68.160156 18.34375 C 68.320312 18.046875 68.546875 17.796875 68.824219 17.609375 C 69.121094 17.4375 69.460938 17.347656 69.804688 17.351562 C 70.21875 17.34375 70.625 17.492188 70.941406 17.769531 C 71.21875 18.097656 71.363281 18.519531 71.351562 18.949219 L 71.351562 23.425781 L 70.339844 23.425781 L 70.339844 19.652344 C 70.378906 19.234375 70.300781 18.816406 70.117188 18.4375 C 69.9375 18.207031 69.652344 18.085938 69.359375 18.121094 C 69.007812 18.101562 68.675781 18.285156 68.507812 18.597656 C 68.285156 19.03125 68.1875 19.519531 68.222656 20.003906 L 68.222656 23.425781 L 67.210938 23.425781 L 67.210938 19.652344 C 67.25 19.234375 67.171875 18.816406 66.988281 18.4375 C 66.8125 18.21875 66.542969 18.097656 66.261719 18.121094 C 65.910156 18.097656 65.570312 18.265625 65.375 18.566406 C 65.160156 19.011719 65.0625 19.507812 65.09375 20.003906 L 65.09375 23.425781 L 64.113281 23.425781 L 64.113281 18.4375 C 64.113281 18.3125 64.082031 18.183594 64.082031 18.023438 C 64.082031 17.863281 64.046875 17.703125 64.046875 17.511719 L 65.058594 17.511719 Z M 65.125 18.183594 ',
  'M 73.40625 19.941406 L 75.683594 19.941406 L 75.683594 19.429688 C 75.710938 19.066406 75.609375 18.703125 75.398438 18.40625 C 75.207031 18.167969 74.914062 18.039062 74.609375 18.054688 C 74.253906 18.03125 73.917969 18.203125 73.722656 18.503906 C 73.507812 18.949219 73.398438 19.441406 73.40625 19.941406 M 76.664062 21.570312 C 76.671875 22.125 76.453125 22.65625 76.0625 23.039062 C 75.609375 23.417969 75.035156 23.609375 74.449219 23.582031 C 73.691406 23.582031 73.21875 23.328125 72.902344 22.847656 C 72.585938 22.371094 72.363281 21.539062 72.363281 20.421875 C 72.363281 19.300781 72.554688 18.566406 72.902344 18.085938 C 73.773438 17.160156 75.214844 17.105469 76.15625 17.960938 C 76.503906 18.34375 76.664062 18.949219 76.664062 19.78125 L 76.664062 20.707031 L 73.40625 20.707031 L 73.40625 21.027344 C 73.367188 21.472656 73.46875 21.921875 73.691406 22.304688 C 73.902344 22.582031 74.230469 22.738281 74.578125 22.722656 C 74.851562 22.722656 75.117188 22.605469 75.304688 22.402344 C 75.507812 22.167969 75.640625 21.878906 75.683594 21.570312 Z M 76.664062 21.570312 ',
  'M 79.886719 18.214844 C 79.523438 18.207031 79.1875 18.421875 79.035156 18.757812 C 78.8125 19.292969 78.714844 19.871094 78.75 20.453125 C 78.75 21.316406 78.84375 21.953125 79.035156 22.273438 C 79.191406 22.617188 79.546875 22.820312 79.917969 22.785156 C 80.292969 22.824219 80.644531 22.597656 80.773438 22.242188 C 81 21.683594 81.097656 21.085938 81.058594 20.484375 C 81.101562 19.882812 81.003906 19.28125 80.773438 18.726562 C 80.609375 18.390625 80.257812 18.1875 79.886719 18.214844 M 81.058594 18.152344 L 81.058594 14.921875 L 82.070312 14.921875 L 82.070312 23.039062 C 82.097656 23.167969 82.105469 23.296875 82.101562 23.425781 L 80.996094 23.425781 L 81.058594 22.847656 C 80.84375 23.066406 80.601562 23.25 80.332031 23.390625 C 80.082031 23.5 79.8125 23.554688 79.539062 23.550781 C 78.992188 23.601562 78.46875 23.3125 78.210938 22.816406 C 77.898438 22.335938 77.738281 21.570312 77.738281 20.546875 C 77.738281 19.523438 77.898438 18.628906 78.210938 18.121094 C 78.511719 17.621094 79.058594 17.324219 79.636719 17.351562 C 79.921875 17.347656 80.203125 17.414062 80.457031 17.542969 C 80.703125 17.695312 80.910156 17.902344 81.058594 18.152344 ',
  'M 46.25 28.183594 C 45.878906 28.167969 45.539062 28.386719 45.394531 28.730469 C 45.199219 29.269531 45.113281 29.847656 45.140625 30.421875 C 45.140625 31.285156 45.207031 31.890625 45.394531 32.242188 C 45.570312 32.585938 45.933594 32.785156 46.3125 32.753906 C 46.679688 32.773438 47.019531 32.554688 47.164062 32.210938 C 47.363281 31.648438 47.445312 31.050781 47.417969 30.453125 C 47.460938 29.855469 47.363281 29.253906 47.132812 28.695312 C 46.96875 28.359375 46.617188 28.160156 46.25 28.183594 M 47.417969 28.121094 L 47.417969 24.894531 L 48.429688 24.894531 L 48.429688 32.339844 C 48.421875 32.5625 48.433594 32.789062 48.460938 33.011719 C 48.457031 33.140625 48.46875 33.269531 48.492188 33.394531 L 47.480469 33.394531 L 47.480469 32.820312 C 47.300781 33.035156 47.089844 33.21875 46.847656 33.363281 C 46.597656 33.46875 46.332031 33.519531 46.058594 33.523438 C 45.480469 33.558594 44.921875 33.28125 44.605469 32.789062 C 44.289062 32.320312 44.128906 31.550781 44.128906 30.488281 C 44.128906 29.421875 44.289062 28.621094 44.605469 28.089844 C 44.910156 27.578125 45.472656 27.285156 46.058594 27.324219 C 46.335938 27.316406 46.605469 27.382812 46.847656 27.515625 C 47.101562 27.65625 47.308594 27.867188 47.449219 28.121094 ',
  'M 50.296875 29.910156 L 52.570312 29.910156 L 52.570312 29.398438 C 52.597656 29.035156 52.496094 28.675781 52.289062 28.378906 C 52.09375 28.136719 51.800781 28.007812 51.496094 28.027344 C 51.144531 28.003906 50.804688 28.171875 50.613281 28.472656 C 50.390625 28.917969 50.285156 29.414062 50.296875 29.910156 M 53.550781 31.539062 C 53.554688 32.09375 53.335938 32.621094 52.953125 33.011719 C 52.542969 33.375 52.007812 33.5625 51.464844 33.523438 C 50.675781 33.523438 50.105469 33.296875 49.757812 32.820312 C 49.410156 32.339844 49.253906 31.507812 49.253906 30.390625 C 49.253906 29.273438 49.441406 28.535156 49.789062 28.058594 C 50.195312 27.546875 50.820312 27.273438 51.464844 27.324219 C 52.191406 27.324219 52.730469 27.515625 53.046875 27.929688 C 53.363281 28.34375 53.550781 28.921875 53.550781 29.75 L 53.550781 30.679688 L 50.296875 30.679688 L 50.296875 30.996094 C 50.257812 31.441406 50.355469 31.890625 50.582031 32.277344 C 50.792969 32.546875 51.125 32.691406 51.464844 32.660156 C 51.738281 32.671875 52.003906 32.570312 52.191406 32.371094 C 52.398438 32.140625 52.53125 31.851562 52.570312 31.539062 Z M 53.550781 31.539062 ',
  'M 57.597656 31.382812 L 58.609375 31.382812 C 58.613281 31.964844 58.410156 32.53125 58.042969 32.980469 C 57.621094 33.371094 57.0625 33.566406 56.492188 33.523438 C 55.734375 33.523438 55.164062 33.296875 54.816406 32.820312 C 54.46875 32.339844 54.3125 31.539062 54.3125 30.453125 C 54.3125 29.367188 54.46875 28.570312 54.816406 28.058594 C 55.222656 27.546875 55.847656 27.273438 56.492188 27.324219 C 57.042969 27.304688 57.582031 27.484375 58.011719 27.832031 C 58.386719 28.175781 58.59375 28.664062 58.578125 29.175781 L 58.578125 29.304688 L 57.597656 29.304688 C 57.617188 29 57.515625 28.699219 57.3125 28.472656 C 57.113281 28.273438 56.835938 28.171875 56.554688 28.183594 C 56.171875 28.164062 55.804688 28.363281 55.605469 28.695312 C 55.417969 29.015625 55.324219 29.625 55.324219 30.453125 C 55.285156 31.042969 55.382812 31.636719 55.605469 32.179688 C 55.78125 32.503906 56.128906 32.691406 56.492188 32.660156 C 56.789062 32.675781 57.078125 32.558594 57.28125 32.339844 C 57.488281 32.0625 57.601562 31.726562 57.597656 31.382812 ',
  'M 59.433594 27.484375 L 60.414062 27.484375 L 60.414062 33.394531 L 59.433594 33.394531 Z M 59.433594 24.894531 L 60.414062 24.894531 L 60.414062 25.980469 L 59.433594 25.980469 Z M 59.433594 24.894531 ',
  'M 61.234375 31.605469 L 62.339844 31.605469 C 62.328125 31.894531 62.417969 32.175781 62.59375 32.402344 C 62.785156 32.601562 63.050781 32.707031 63.320312 32.691406 C 63.574219 32.710938 63.824219 32.628906 64.015625 32.46875 C 64.199219 32.339844 64.296875 32.117188 64.269531 31.890625 C 64.261719 31.714844 64.195312 31.546875 64.082031 31.414062 C 63.890625 31.238281 63.675781 31.085938 63.449219 30.964844 L 62.371094 30.421875 C 62.058594 30.265625 61.78125 30.050781 61.550781 29.785156 C 61.390625 29.5625 61.308594 29.289062 61.328125 29.015625 C 61.320312 28.542969 61.515625 28.085938 61.867188 27.769531 C 62.300781 27.460938 62.824219 27.304688 63.351562 27.324219 C 63.851562 27.289062 64.34375 27.4375 64.746094 27.738281 C 65.089844 28.015625 65.289062 28.441406 65.28125 28.886719 L 65.28125 29.015625 L 64.207031 29.015625 C 64.222656 28.757812 64.132812 28.5 63.953125 28.3125 C 63.765625 28.140625 63.515625 28.046875 63.257812 28.058594 C 63.027344 28.042969 62.796875 28.121094 62.625 28.28125 C 62.453125 28.40625 62.355469 28.609375 62.371094 28.824219 C 62.371094 28.964844 62.414062 29.097656 62.5 29.207031 C 62.636719 29.34375 62.796875 29.453125 62.972656 29.527344 L 63.921875 30.007812 C 64.351562 30.1875 64.742188 30.460938 65.058594 30.804688 C 65.28125 31.0625 65.394531 31.394531 65.375 31.734375 C 65.398438 32.234375 65.1875 32.71875 64.808594 33.042969 C 64.375 33.378906 63.835938 33.550781 63.289062 33.523438 C 62.742188 33.5625 62.199219 33.390625 61.773438 33.042969 C 61.402344 32.660156 61.207031 32.140625 61.234375 31.605469 ',
  'M 66.199219 27.484375 L 67.179688 27.484375 L 67.179688 33.394531 L 66.199219 33.394531 Z M 66.199219 24.894531 L 67.179688 24.894531 L 67.179688 25.980469 L 66.199219 25.980469 Z M 66.199219 24.894531 ',
  'M 70.152344 28.183594 C 69.773438 28.164062 69.421875 28.378906 69.265625 28.730469 C 69.039062 29.261719 68.941406 29.84375 68.980469 30.421875 C 68.945312 31.007812 69.03125 31.597656 69.234375 32.148438 C 69.429688 32.472656 69.777344 32.667969 70.152344 32.667969 C 70.523438 32.667969 70.871094 32.472656 71.066406 32.148438 C 71.265625 31.605469 71.351562 31.03125 71.320312 30.453125 C 71.351562 29.855469 71.265625 29.261719 71.066406 28.695312 C 70.878906 28.367188 70.527344 28.171875 70.152344 28.183594 M 67.9375 30.421875 C 67.9375 29.335938 68.128906 28.570312 68.476562 28.058594 C 68.878906 27.546875 69.507812 27.273438 70.152344 27.324219 C 70.941406 27.324219 71.476562 27.578125 71.828125 28.058594 C 72.175781 28.535156 72.363281 29.335938 72.363281 30.421875 C 72.363281 31.507812 72.175781 32.308594 71.828125 32.789062 C 71.476562 33.265625 70.910156 33.523438 70.152344 33.523438 C 69.390625 33.523438 68.824219 33.296875 68.476562 32.789062 C 68.128906 32.277344 67.9375 31.507812 67.9375 30.421875 ',
  'M 76.410156 33.394531 L 76.410156 29.589844 C 76.433594 29.183594 76.359375 28.777344 76.1875 28.410156 C 75.996094 28.191406 75.71875 28.074219 75.429688 28.089844 C 75.078125 28.066406 74.738281 28.238281 74.546875 28.535156 C 74.355469 28.992188 74.269531 29.484375 74.292969 29.976562 L 74.292969 33.394531 L 73.28125 33.394531 L 73.28125 27.992188 C 73.25 27.832031 73.25 27.640625 73.21875 27.484375 L 74.261719 27.484375 L 74.261719 28.152344 C 74.441406 27.890625 74.679688 27.671875 74.957031 27.515625 C 75.222656 27.382812 75.515625 27.320312 75.808594 27.324219 C 76.238281 27.292969 76.65625 27.453125 76.957031 27.757812 C 77.261719 28.066406 77.417969 28.488281 77.390625 28.921875 L 77.390625 33.394531 Z M 76.410156 33.394531 ',
  'M 78.023438 31.605469 L 79.097656 31.605469 C 79.109375 31.894531 79.207031 32.171875 79.382812 32.402344 C 79.570312 32.605469 79.835938 32.710938 80.109375 32.691406 C 80.359375 32.707031 80.609375 32.628906 80.804688 32.46875 C 80.972656 32.328125 81.066406 32.113281 81.058594 31.890625 C 81.050781 31.714844 80.984375 31.546875 80.867188 31.414062 C 80.671875 31.230469 80.445312 31.078125 80.203125 30.964844 L 79.128906 30.421875 C 78.824219 30.265625 78.554688 30.050781 78.339844 29.785156 C 78.164062 29.566406 78.074219 29.292969 78.085938 29.015625 C 78.070312 28.535156 78.28125 28.070312 78.65625 27.769531 C 79.078125 27.460938 79.589844 27.304688 80.109375 27.324219 C 80.617188 27.289062 81.121094 27.4375 81.53125 27.738281 C 81.871094 28.019531 82.058594 28.445312 82.039062 28.886719 L 82.039062 29.015625 L 80.996094 29.015625 C 81.011719 28.757812 80.921875 28.5 80.742188 28.3125 C 80.546875 28.144531 80.300781 28.054688 80.046875 28.058594 C 79.804688 28.035156 79.5625 28.117188 79.382812 28.28125 C 79.21875 28.414062 79.125 28.613281 79.128906 28.824219 C 79.140625 28.964844 79.195312 29.101562 79.289062 29.207031 C 79.417969 29.335938 79.566406 29.445312 79.730469 29.527344 L 80.710938 30.007812 C 81.140625 30.1875 81.53125 30.460938 81.847656 30.804688 C 82.042969 31.074219 82.144531 31.398438 82.132812 31.734375 C 82.152344 32.226562 81.957031 32.707031 81.59375 33.042969 C 81.160156 33.378906 80.625 33.550781 80.078125 33.523438 C 79.519531 33.566406 78.964844 33.394531 78.527344 33.042969 C 78.167969 32.65625 77.984375 32.136719 78.023438 31.605469 '
]

export const ChartDefault = (...opts) => {
  const options = Object.assign.apply(Object, [{}].concat(...opts));
  const chartDefaults = {};
  const getHeight = () => options.height !== undefined ? options.height : 400;
  const marginBottom = 60;
  const posSourceText = getHeight() + 30;
  const posSourceLogo = getHeight() + 10;

  chartDefaults.chart = {
    height: getHeight(),
    /* SETTING HEIGHT TO 400 FOR REPORTING TO PDF. TO FIT 2 CHARTS INSIDE ONE PAGE IN PDF EXPORT */
    spacingRight: 50,
    spacingLeft: 20,
    marginLeft: null,
    zoomType: 'x',
    className: 'standard-chart',
    styledMode: true,
  };

  chartDefaults.exporting = {
    enabled: false,
    sourceWidth: 850,
    fallbackToExportServer: true,
    useHTML: true,
    chartOptions: {
      chart: {
        height: getHeight() + marginBottom,
        spacingBottom: marginBottom,
        events: {
          load() {
            const group = this.renderer
              .g()
              .attr({
                transform: `translate(740, ${posSourceLogo})`,
                class: "exportLogo",
              })
              .add()
            for (let i = 0; i < idLogo.length; i++) {
              this.renderer
                .path()
                .attr({
                  d: idLogo[i],
                  fill: "gray",
                })
                .add(group)
            }
            this.renderer
              .text(options.source, 20, posSourceText)
              .css({
                width: '600px',
                fontSize: '10px',
                color: '#6a6a6a',
              })
              .add();
          },
        },
      },
      title: {
        style: {
          color: 'black',
        },
      },
    },
  };

  chartDefaults.xAxis = {
    tickmarkPlacement: 'on',
    style: {
      textOverflow: 'none',
    },
    croshair: false,
    title: {
      align: 'middle',
      text: 'xAxis title',
    },
    labels: {
      staggerLines: 0,
      format: '',
    },
    opposite: false,
    plotBands: [],
  };

  chartDefaults.yAxis = {
    style: {
      textOverflow: 'none',
    },
    alignTicks: true,
    allowDecimals: false,
    softMin: 0,
    title: {
      text: 'yAxis title',
    },
    labels: {
      staggerLines: 0,
      formatter: function () {
        const formatedNumber = formatChangePercent(this.value);
        return formatedNumber;
      },
      // ...options.yAxis.labels,
    },
    opposite: false,
    plotBands: [],
    croshair: false,
  };

  chartDefaults.plotOptions = {
    series: {
      groupPadding: 0.2,
      pointPadding: 0,
      borderWidth: 0,
      stacking: undefined,
    },
    column: {
      pointPadding: 0.05,
      borderWidth: 0,
    },
    line: {
      marker: {
        enabled: false,
      },
    },
  };

  chartDefaults.legend = {
    align: 'left',
    enabled: options.series != undefined ? options.series.length !== 1 : 1,
    /* only display legend when more than 1 series exists */
    symbolWidth: 25,
    symbolRadius: 0,
    squareSymbol: false,
    symbolHeight: 12,
    verticalAlign: 'top',
    x: 5,
    y: -30,
    margin: 30,
  };

  chartDefaults.title = {
    x: 10,
    text: options.title != undefined ? options.title.text : '',
    align: 'left',
    margin: 40,
    widthAdjust: -100,
  };
  chartDefaults.subtitle = {
    x: 10,
    align: 'left',
  };

  const deepmerged = deepmerge(chartDefaults, options);
  return deepmerged;
};
