import * as THREE from "three";
import { ThreeMFLoader } from "three/examples/jsm/Addons.js";
import { Sequence } from "three/examples/jsm/libs/tween.module.js";
import { reduceVertices } from "three/examples/jsm/utils/SceneUtils.js";
import { modelWorldMatrix, time } from "three/tsl";

export default function example() {
  //렌더러
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, //계단 현상 제거
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  //   renderer.setClearColor("green");

  //씬
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog("white", 3, 10); //색깔,near,far순서로 인자값 입력.
  //near은 숫자가 작을수록 가까이에 안개 생성, far은 숫자가 클 수록 멀리 안개생성
  //   scene.background = new.THREE.Color('blue');//씬 자체에 칠하는 것.오류 이유 모름...

  //빛
  const light = new THREE.DirectionalLight(0xffffff, 1); //두번째 인자로 빛의 강도 조절 가능
  light.position.set(1, 3, 10);
  scene.add(light);

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 1, 5);
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: "red" });
  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }
  scene.add(mesh);

  let oldtime = Date.now();

  function draw() {
    //js 내장 기능으로 어떤기기에서든 동일한 속도로 작동하게 하기
    const newTime = Date.now();
    const deltaTime = newTime - oldtime;
    oldtime = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);

  draw();
}
