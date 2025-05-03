import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

// we need to create 3 things: scene, camera, renderer

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });

// size of the renderer
const w = window.innerWidth;
const h = window.innerHeight;
renderer.setSize(w, h);

// append renderer to the dom (canvas element)
document.body.appendChild(renderer.domElement);

// CAMERA
// it needs 4 variables to be defined: fill of the view, aspect, near and far
const fov = 75; // field of view
const aspect = w / h; // aspect ratio
const near = 0.1; // near plane
const far = 10; // far plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
// position of the camera
camera.position.z = 2; // z axis

// SCENE
const scene = new THREE.Scene();

// add orbit controls to the camera
// this allows us to move the camera around the scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth movement
controls.dampingFactor = 0.03; // smoothness

// OBJECT
// the library has build into it some geometries primitives that can be used
// create a isosphere
const geo = new THREE.IcosahedronGeometry(1.0, 2); //(size, detail)
// create a cube
// const geo = new THREE.BoxGeometry(1, 1, 1); // (width, height, depth)
const mat = new THREE.MeshStandardMaterial({
  // standard interact with light
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
// add the mesh to the scene
scene.add(mesh);

// add another geometry mesh
const wireMat = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001); // makes the wireframe a bit bigger
mesh.add(wireMesh); // add wireframe as a child of the previous mesh object
// end of the geometry mesh

// LIGHTING
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
// add light to the scene
scene.add(hemiLight);

// ANIMATION LOOP
function animate(t = 0) {
  // t is time in milliseconds to start with
  requestAnimationFrame(animate);
  // rotate the mesh (add movement to the object)
  // mesh.rotation.y = t * 0.0001; // every 10 seconds
  // mesh.rotation.x += 0.01;
  // render the scene
  renderer.render(scene, camera);
  controls.update();
}

animate();
