import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import GUI from 'lil-gui';


let configState = {
    padding: 2,
    number_of_cubes: 20,
    update_padding: () => updatePaddingInstancedMesh(instancedMesh,configState.padding)
}

function createGUI(configState){
    const gui = new GUI();
    gui.add(configState,"padding").onChange((e) => configState.padding = e);
    gui.add(configState,"number_of_cubes",1,100).onChange((e) => configState.number_of_cubes = e);
    gui.add(configState,"update_padding");

    return gui  
}

const gui = createGUI(configState)
function createScene(){
    const scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
	.setPath( 'textures/cubeMaps/' )
	.load( [
				'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'
			] );
    return scene
}

function createCamera(){
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    return camera
}

function createRenderer(){
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    return renderer

}

function createMeshArray(count, padding){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( {roughness : 0.7, metalness: 0.2});
    const mesh = new THREE.InstancedMesh( geometry, material, count);
    for(let i = 0; i < count; i++){
        let matrix = new THREE.Matrix4();
        mesh.castShadow = true;
        mesh.getMatrixAt(i,matrix)
        matrix.matrixAutoUpdate = false;
        matrix.setPosition(i+ (padding*i ?? 0),0,0);
        mesh.setMatrixAt(i,matrix);
    }
    return mesh
}

function updatePaddingInstancedMesh(mesh, newPadding){
    console.log(mesh)
    console.log(mesh.count)
    for(let i = 0; i < mesh.count; i++){
        console.log("works?")
        let matrix = new THREE.Matrix4();
        mesh.getMatrixAt(i,matrix)
        matrix.setPosition(i+ (newPadding*i ?? 0),0,0);
        mesh.setMatrixAt(i,matrix);
    }
    scene.add(mesh)
}



function addAmbientLight(){
    const light = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
    return light
}

function addPointLight(){
    const light = new THREE.PointLight( 0xffffff, 50, 100 );
    light.position.set( 5, 1, 5 );
    return light
}

function addGridHelper(factor){
    const size = 10*factor;
    const divisions = 10*factor;

    const gridHelper = new THREE.GridHelper( size, divisions );
    return gridHelper;
}
const camera = createCamera();
const renderer = createRenderer();
const scene = createScene();
const ambientLight = addAmbientLight();
const pointLight = addPointLight();
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.InstancedMesh( geometry, material, 500);
const gridHelper = addGridHelper(10);
let instancedMesh;
let controls;


function init(){
    controls = new FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 25;
    controls.rollSpeed = Math.PI / 2;
    controls.autoForward = false;
    controls.dragToLook = true                                      ;
    instancedMesh = createMeshArray(configState.number_of_cubes, configState.padding);
    scene.add( ambientLight );
    scene.add( pointLight );
    scene.add( mesh );
    scene.add( instancedMesh );
    scene.add( gridHelper );
}

function animate() {
	requestAnimationFrame( animate );
	mesh.rotation.x += 0.02;
	mesh.rotation.y += 0.02;
    controls.update(0.01)
	renderer.render( scene, camera );
}
init();
animate();