import * as THREE from "three";
import { Sequence } from "three/examples/jsm/libs/tween.module.js";
import { reduceVertices } from "three/examples/jsm/utils/SceneUtils.js";
import { time } from "three/tsl";

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

  let oldtime = Date.now();

  function draw() {
    //js 내장 기능으로 어떤기기에서든 동일한 속도로 작동하게 하기
    const newTime = Date.now();
    const deltaTime = newTime - oldtime;
    oldtime = newTime;

    mesh.rotation.x += 0.001 * deltaTime;
    mesh.rotation.y += 0.001 * deltaTime;

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
