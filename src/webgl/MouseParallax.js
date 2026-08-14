export class MouseParallax {
  constructor(onMoveCallback) {
    this.mouseX = 0;
    this.mouseY = 0;
    this.callback = onMoveCallback;

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
  }

  onMouseMove(e) {
    this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    if (this.callback) {
      this.callback(this.mouseX, this.mouseY);
    }
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;

      if (this.callback) {
        this.callback(this.mouseX, this.mouseY);
      }
    }
  }
}
