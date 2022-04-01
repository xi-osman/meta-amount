import './style.css'
import 'aframe'
import './components/camera-events'
import 'aframe-extras'

window.loadMetaverse = function loadMetaverse() {
  document.querySelector('#app').innerHTML = `
  <a-scene cursor="rayOrigin: mouse;" raycaster="objects: .raycastable">
    <a-assets>
      <a-asset-item id="home" src="common/home.glb"></a-asset-item>
      <a-asset-item id="tree" src="common/tree.glb"></a-asset-item>
      <a-asset-item id="cybertruck" src="common/cybertruck.glb"></a-asset-item>
      <a-asset-item id="amount_logo" src="common/amount_logo.glb"></a-asset-item>
      <img id="sky" src="textures/sky.jpeg">
    </a-assets>
    <a-entity id="rig" movement-controls>
      <a-entity camera position="0 1.6 0" look-controls>
      </a-entity>
      <a-entity oculus-touch-controls="hand: left" laser-controls="hand: left"></a-entity>
      <a-entity oculus-touch-controls="hand: right"></a-entity>
    </a-entity>
    <a-entity gltf-model="#home" rotation="0 180 0" position="30 0 -10"></a-entity>
    <a-entity gltf-model="#tree" position="25 0 -20" material="shader: flat;"></a-entity>
    <a-entity gltf-model="#tree" position="25 0 -3" material="shader: flat;"></a-entity>
    <a-entity gltf-model="#tree" position="20 0 -4" material="shader: flat;"></a-entity>
    <a-entity gltf-model="#tree" position="37 0 -5" material="shader: flat;"></a-entity>
    <a-entity gltf-model="#cybertruck" position="24 0 -12" scale="2 2 2" rotation="0 12 0"></a-entity>
    <a-entity light="type: ambient; color: #BBB"></a-entity>
    <a-entity light="type: directional; color: #FFF; intensity: 1.3" position="-0.5 1 1"></a-entity>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="100" height="100" material="shader: flat; src: textures/grass_top.png; repeat: 60 60;"></a-plane>
    <a-sky src="#sky"></a-sky>
  </a-scene>
  `


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const purchased = urlParams.get('purchased') == "true"
  var sceneEl = document.querySelector('a-scene');
  var div = document.createElement('div');

  if (purchased) {
    div.innerHTML = `
      <a-entity gltf-model="#amount_logo" position="22 8 -16" animation="property: rotation; to: 0 360 0; loop: true; dur: 10000" material="shader: flat;"></a-entity>
      <a-cylinder color="white" height="15" position="22 0 -16" radius="0.08"></a-cylinder>
    `
  } else {
    div.innerHTML = `
      <a-box class="raycastable" color="#cc0000" depth=".2" height="1" width="1.5" rotation="0 -90 0" position="22 1.5 -16"
        animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter"
        animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
        text="value: Want this amazing virtual house? Click here to continue the purchase process.; zOffset: .12; align: center; width: 1.4; wrapCount: 20; color: white">
      </a-box>
      <a-cylinder color="white" height="3" position="22 0 -15.5" radius="0.04"></a-cylinder>
      <a-cylinder color="white" height="3" position="22 0 -16.5" radius="0.04"></a-cylinder>
    `
  }

  sceneEl.append(...div.childNodes);

  document.querySelector('a-box').addEventListener('click', function (evt) {
    window.open("/pages/verifications.html?scene=meta", "_self");
  });
}

window.loadNFT = function loadNFT() {
  document.querySelector('#app').innerHTML = `
  <a-scene cursor="rayOrigin: mouse;" raycaster="objects: .raycastable">
    <a-assets>
    <a-asset-item id="gallery" src="gallery/scene.gltf"></a-asset-item>
      <a-asset-item id="camera" src="common/camera.glb"></a-asset-item>
      <img id="sky" src="textures/sky.jpeg">
      <audio id="camera_trigger" src="sounds/camera.mp3"></audio>
    </a-assets>
    <a-entity id="rig" movement-controls speed="0.05">
      <a-entity camera position="0 1.6 0" look-controls></a-entity>
      <a-entity oculus-touch-controls="hand: left" laser-controls="hand: left"></a-entity>
      <a-entity oculus-touch-controls="hand: right; model:false" gltf-model="#camera" sound="src: #camera_trigger;" camera-events></a-entity>
    </a-entity>
    <a-box class="raycastable" color="gray" depth="0.05" height="0.5" width="1.15" rotation="-30 180 0" position="0 0.5 3.5"
      animation__scale="property: scale; to: 1.2 1.2 1.2; dur: 200; startEvents: mouseenter"
      animation__scale_reverse="property: scale; to: 1 1 1; dur: 200; startEvents: mouseleave"
      text="value: Want this amazing nft? Click here to continue the purchase process.; zOffset: .06; align: center; width: 1.1; wrapCount: 20; color: black">
    </a-box>
    <a-cylinder color="white" height="1" position="0 0 3.5" radius="0.02"></a-cylinder>
    <a-entity gltf-model="#gallery" position="0 1 0"></a-entity>
    <a-sky src="#sky"></a-sky>
  </a-scene>
  `

  document.querySelector('a-box').addEventListener('click', function (evt) {
    window.open("/pages/verifications.html?scene=nft", "_self");
  });
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const scene = urlParams.get('scene')

switch (scene) {
  case 'meta':
    loadMetaverse();
    break;
  case 'nft':
    loadNFT();
    break;
  default:
}