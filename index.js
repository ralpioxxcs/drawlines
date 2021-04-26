let camera, scene, renderer;

init();
//drawSpline(0);
drawPointsLine();

function init() {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 100, 0);

  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xdddddd);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  var color = new THREE.Color("rgb(255, 0, 0)");
  var grid = new THREE.GridHelper(50, 20, color, 0x000000);
  scene.add(grid);

  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(15, 30, 50);
  spotLight.castShadow = true;
  scene.add(spotLight);
}

var colors = [
  0xed6a5a,
  0xf4f1bb,
  0x9bc1bc,
  0x5ca4a9,
  0xe6ebe0,
  0xf0b67f,
  0xfe5f55,
  0xd6d1b1,
  0xc7efcf,
  0xeef5db,
  0x50514f,
  0xf25f5c,
  0xffe066,
  0x247ba0,
  0x70c1b3,
];

function drawPointsLine() {
  // const curve = new THREE.CatmullRomCurve3([
  //   new THREE.Vector3(0, 0, 0),
  //   new THREE.Vector3(-5, 10, -10),
  //   new THREE.Vector3(-10, 20, -15),
  //   new THREE.Vector3(-15, 30, -20),
  //   new THREE.Vector3(-10, 20, -25),
  //   new THREE.Vector3(-5, 10, -30),
  //   new THREE.Vector3(0, 0, -35),
  // ]);

  let points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( new THREE.Vector3( -5, 10, -10 ) );
  points.push( new THREE.Vector3( -10, 20, -15 ) );
  points.push( new THREE.Vector3( -15, 30, -20 ) );
  points.push( new THREE.Vector3( -10, 20, -25 ) );
  points.push( new THREE.Vector3( -5, 10, -30 ) );
  points.push( new THREE.Vector3( 0, 0, -35 ) );
  const line = new MeshLine();
  line.setVertices(points);
  const material = new MeshLineMaterial();

  const mesh = new THREE.Mesh( line, material );
  scene.add( mesh );

  // const points = curve.getPoints(50);
  // const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // const line = new MeshLine();
  // line.setVertices(points);

  // var material = new MeshLineMaterial({
  //   useMap: true,
  //   color: new THREE.Color(0xed6a5a),
  //   opacity: 1,
  //   sizeAttenuation: false,
  //   lineWidth: 10,
  // });
  // var mesh = new THREE.Mesh(line, material);
  // scene.add(mesh);

  // const material = new THREE.LineBasicMaterial({ color: 0xff0000,
  //     linewidth : 1,
  //     linecap: "round"
  //  });
  // var geometry = new THREE.BufferGeometry();
  // const vertices = new Float32Array( [
  //     0,0,0,
  //     -5,10,-10,
  //     -10,20,-15,
  //     -15,30,-20,
  //     -10,30,-25,
  //     -5,20,-30,
  //     0,10,-35,
  //     0,0,-40,
  // ]);
  // const colors = new Float32Array([
  //   1.0,
  //   0.0,
  //   0.0, // red (normalized)
  //   0.0,
  //   1.0,
  //   0.0, // green (normalized)
  // ]);
  // geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  // geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));
  // const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
  // const curveObject = new THREE.Line(geometry, material);
  // const line = new THREE.Line(geometry, material);
  // scene.add(curveObject);
}

function drawSpline(numPoints) {
  var numPoints = 100;
  var start = new THREE.Vector3(0, 0, 0);
  var middle = new THREE.Vector3(-30, 50, 0);
  var end = new THREE.Vector3(-10, 0, -50);

  var curveQuad = new THREE.QuadraticBezierCurve3(start, middle, end);

  var tube = new THREE.TubeGeometry(curveQuad, numPoints, 0.5, 20, false);
  var mesh = new THREE.Mesh(
    tube,
    new THREE.MeshNormalMaterial({
      opacity: 1,
      transparent: true,
    })
  );
  scene.add(mesh);
}

function animation(time) {
  renderer.render(scene, camera);
}
