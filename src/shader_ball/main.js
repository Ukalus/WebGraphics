import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import GUI from 'lil-gui';
import {createDefaultRenderer, createLightObjects , createDefaultScene, createCamera, createBallObject, bulkAddToScene} from "../utils/util"

// config for loading a scene 
let config = {
    background:{
        skybox: {
            enabled: false,
            folder_path: undefined,
        },
        texture: {
            enabled: false,
        }
    },
    controller: {
        // possible modes could include "FlyingController and PlayerWalkingController"
        mode: "Orbit",
    },
    light: {
        ambient: {
            enabled: true,
            position: new THREE.Vector3(),

        },
        point: [
            {
                enabled: true,
                position: new THREE.Vector3()
            },
            {
                enabled: true,
                position: new THREE.Vector3()
            },
            {
                enabled: true,
                position: new THREE.Vector3()
            },
        ]
    },
    initObjects:[]
}

const scene = createDefaultScene();
const renderer = createDefaultRenderer();
const camera = createCamera();



function init(){
    config.initObjects.push(createBallObject({}));
    config.initObjects.push(...createLightObjects(config.light));
    bulkAddToScene(scene, config.initObjects);

}

function update(){
    requestAnimationFrame( update );
    renderer.render( scene, camera );
}

init();
update();

