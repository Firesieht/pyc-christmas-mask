/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import * as BABYLON from 'babylonjs';
import * as ZapparBabylon from '@zappar/zappar-babylonjs';
import faceMeshTexture from '../assets/4.png';
import faceMeshTexture1 from "../assets/1.png"
import faceMeshTexture2 from "../assets/2.png"
import faceMeshTexture3 from "../assets/3.png"

import 'babylonjs-loaders';
import './index.sass';

if (ZapparBabylon.browserIncompatible()) {
  ZapparBabylon.browserIncompatibleUI();
  throw new Error('Unsupported browser');
}

let next = document.getElementById("next")
let previous = document.getElementById("previous")
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const engine = new BABYLON.Engine(canvas, true);

export const scene = new BABYLON.Scene(engine);
const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

export const camera = new ZapparBabylon.Camera('ZapparCamera', scene);

ZapparBabylon.permissionRequestUI().then((granted) => {
  if (granted) camera.start(true);
  else ZapparBabylon.permissionDeniedUI();
});

const faceTracker = new ZapparBabylon.FaceTrackerLoader().load();
const trackerTransformNode = new ZapparBabylon.FaceTrackerTransformNode('tracker', camera, faceTracker, scene);

trackerTransformNode.setEnabled(false);
faceTracker.onVisible.bind(() => {
  trackerTransformNode.setEnabled(true);
});
faceTracker.onNotVisible.bind(() => {
  trackerTransformNode.setEnabled(false);
});
	



const material = new BABYLON.StandardMaterial('mat', scene);
material.diffuseTexture = new BABYLON.Texture(faceMeshTexture1, scene);
let cnt = document.getElementById("cnt")

let a = 0
let textures = [faceMeshTexture, faceMeshTexture1, faceMeshTexture2, faceMeshTexture3]
document.addEventListener("DOMContentLoaded", () => {
  if ( next != null){
    next.onclick = function(){
      if (a < textures.length-1){
        a+=1
      }
      else{
        a = 0
      }
      if (cnt != null){
        cnt.innerText = "Mask №" + (a+1).toString()
      } 
    material.diffuseTexture = new BABYLON.Texture(textures[a], scene);
    }
  }
  if (previous != null){
    previous.onclick = function(){
      if (a > 0){
        a-=1
      }
      else{
        a = textures.length-1
      }
      if (cnt != null){
        cnt.innerText = "Mask №" + (a+1).toString()
      } 
      material.diffuseTexture = new BABYLON.Texture(textures[a], scene);
    }
  }

});


const faceMesh = new ZapparBabylon.FaceMeshGeometry('mesh', scene);
faceMesh.parent = trackerTransformNode;
faceMesh.material = material;

window.addEventListener('resize', () => {
  engine.resize();
});

// Set up our render loop
engine.runRenderLoop(() => {
  faceMesh.updateFromFaceTracker(faceTracker);
  camera.updateFrame();
  scene.render();
});
