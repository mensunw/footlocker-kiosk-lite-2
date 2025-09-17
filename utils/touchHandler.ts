import { TouchInteraction } from '../types';

export class TouchHandler {
  private startPosition: { x: number; y: number } | null = null;
  private startTime: number = 0;

  detectTouch(event: TouchEvent | MouseEvent, element?: string): TouchInteraction | null {
    const isTouch = 'touches' in event;
    const clientX = isTouch ? event.touches[0]?.clientX : (event as MouseEvent).clientX;
    const clientY = isTouch ? event.touches[0]?.clientY : (event as MouseEvent).clientY;

    if (event.type === 'touchstart' || event.type === 'mousedown') {
      this.startPosition = { x: clientX, y: clientY };
      this.startTime = Date.now();
      return null;
    }

    if (event.type === 'touchend' || event.type === 'mouseup') {
      if (!this.startPosition) return null;

      const endPosition = { x: clientX, y: clientY };
      const distance = Math.sqrt(
        Math.pow(endPosition.x - this.startPosition.x, 2) +
        Math.pow(endPosition.y - this.startPosition.y, 2)
      );
      const duration = Date.now() - this.startTime;

      // Determine interaction type
      let type: TouchInteraction['type'] = 'tap';

      if (distance > 50 && duration < 500) {
        // Swipe detection
        const deltaX = endPosition.x - this.startPosition.x;
        const deltaY = endPosition.y - this.startPosition.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          type = 'swipe';
        } else {
          type = 'swipe';
        }
      } else if (distance > 10) {
        type = 'drag';
      }

      const interaction: TouchInteraction = {
        type,
        startPosition: this.startPosition,
        endPosition,
        timestamp: Date.now(),
        element,
      };

      this.startPosition = null;
      return interaction;
    }

    return null;
  }

  calculateSwipeDirection(start: { x: number; y: number }, end: { x: number; y: number }): 'left' | 'right' | 'up' | 'down' {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? 'right' : 'left';
    } else {
      return deltaY > 0 ? 'down' : 'up';
    }
  }

  calculateDistance(start: { x: number; y: number }, end: { x: number; y: number }): number {
    return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  }
}

export const touchHandler = new TouchHandler();