import * as THREE from "three";
import { Sequence } from "three/examples/jsm/libs/tween.module.js";
import { reduceVertices } from "three/examples/jsm/utils/SceneUtils.js";

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
  //   scene.background = new.THREE.Color('blue');//씬 자체에 칠하는 것.오류 이유 모름...

  //빛
  const light = new THREE.DirectionalLight(0xffffff, 1); //두번째 인자로 빛의 강도 조절 가능
  light.position.z = 2;
  scene.add(light);

  //카메라
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 5);
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: "red" });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  function draw() {
    //그리기
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
  draw(); // 첫 실행

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", setSize);
}
