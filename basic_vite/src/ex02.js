import * as THREE from "three";

export default function example() {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(1, 2, 5);
  scene.add(camera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // ✅ 애니메이션 루프 (계속 그리기)
  function draw() {
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
  draw(); // 첫 실행

  // ✅ 리사이즈 대응
  function setSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener("resize", setSize);
}
