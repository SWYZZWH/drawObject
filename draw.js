import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 400);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

//draw a cube
//load in texture
const loader = new THREE.TextureLoader();
loader.load("./crate.gif", (texture) => {
  const cube_geometry = new THREE.BoxGeometry(200, 200, 200);
  const cube_material = new THREE.MeshPhongMaterial({ map: texture });
  cube_material.side = THREE.DoubleSide;
  cube_material.visible = true;
  const cube = new THREE.Mesh(cube_geometry, cube_material);
  cube.position.set(0, 0, 0);
  scene.add(cube);
});

//draw a line
/*
{
  const line_material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  const line_geometry = new THREE.BufferGeometry();
  const points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  line_geometry.setFromPoints(points);
  const line = new THREE.Line(line_geometry, line_material);
  scene.add(line);
}
*/

//add a light
{
  const color = 0xffffff;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(300, 300, 100);
  scene.add(light);
}

let canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
document.body.appendChild(renderer.domElement);

//user controlled camera
const controller = new OrbitControls(camera, canvas);
controller.target.set(0, 5, 0);
controller.update();

function animate(time) {
  //time默认为毫秒
  time *= 0.001;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //cube.position.x += 0.001;
  //cube.position.y += 0.001;

  //旋转角为弧度制
  //cube.rotation.x = time;
  //cube.rotation.y = time;

  //动态伸缩
  canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
}

animate();
