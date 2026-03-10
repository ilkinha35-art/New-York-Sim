// Cena básica com Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("scene")});
renderer.setSize(window.innerWidth, window.innerHeight);

// Luz
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

// Estrada (plano cinza)
const roadGeometry = new THREE.PlaneGeometry(20, 100);
const roadMaterial = new THREE.MeshBasicMaterial({color: 0x333333});
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.rotation.x = -Math.PI/2;
scene.add(road);

// Carro (cubos vermelhos)
function createCar(x, z) {
  const geometry = new THREE.BoxGeometry(1, 1, 2);
  const material = new THREE.MeshBasicMaterial({color: 0xff0000});
  const car = new THREE.Mesh(geometry, material);
  car.position.set(x, 0.5, z);
  scene.add(car);
  return car;
}

// Ônibus (cubos azuis maiores)
function createBus(x, z) {
  const geometry = new THREE.BoxGeometry(1.5, 1.5, 4);
  const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
  const bus = new THREE.Mesh(geometry, material);
  bus.position.set(x, 0.75, z);
  scene.add(bus);
  return bus;
}

// Criar veículos
const cars = [createCar(-2, -40), createCar(2, -60)];
const buses = [createBus(0, -80)];

camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Animação
function animate() {
  requestAnimationFrame(animate);

  cars.forEach(car => {
    car.position.z += 0.1; // movimento para frente
    if (car.position.z > 50) car.position.z = -50; // loop
  });

  buses.forEach(bus => {
    bus.position.z += 0.07; // ônibus mais lento
    if (bus.position.z > 50) bus.position.z = -50;
  });

  renderer.render(scene, camera);
}
animate();
