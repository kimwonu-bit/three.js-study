import * as THREE from "three";

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerWidth);

const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//   75, //시야각
//   window.innerWidth / window.innerHeight, //종횡비
//   0.1, //near
//   1000 //far
// );

// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// scene.add(camera); //카메라를 만든 후 무대에 올려야 하므로.

const camera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight),
  window.innerWidth / window.innerHeight,
  1,
  -1,
  0.1,
  1000
);

camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0, 0, 0);
camera.zoom = 0.5;//카메라와의 거리로 생각
camera.updateProjectionMatrix();//이걸 해야 카메라의 줌인 또는 줌아웃이 반영됨
scene.add(camera);

//mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const matrial = new THREE.MeshBasicMaterial({
  // color: 0xff000
  color: "red",
});
const mesh = new THREE.Mesh(geometry, matrial);
scene.add(mesh);

//renderer가 그리기
renderer.render(scene, camera);
