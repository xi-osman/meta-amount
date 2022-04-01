AFRAME.registerComponent('camera-events',{
  dependencies: ['sound'],
  init: function () {
    let takePhoto = () => {
      this.el.components.sound.playSound();
    }

    this.el.addEventListener('triggerdown', takePhoto);
  }
});