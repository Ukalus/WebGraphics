import * as THREE from 'three';


export function createCamera(){
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    return camera
}

export function createDefaultRenderer(){
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    return renderer

}

export function createLightObjects(light){
  
    let lightObjects = [];
    if(light.ambient.enabled){
        const ambientLightObject = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
        lightObjects.push(ambientLightObject);
    }
    if(light.point){
        light.point.forEach((pointLight) =>{
            const light = new THREE.PointLight( 0xffffff, 50, 100 );
            light.position.set( pointLight.position);
            lightObjects.push(light);
        })
    }
    
    return lightObjects
}

export function createDefaultScene(){
    const scene = new THREE.Scene();
    return scene
}

export function createBallObject(ballconfig = {radius: 1,pos:[0,0,0],rot:[0,0,0],material: undefined, color: undefined}){
    let material;
    if(ballconfig.color == undefined){
        material = new THREE.MeshStandardMaterial( {roughness : 0.7, metalness: 0.2, color: ballconfig.color ?? 0xffff00});
    }
    else{
        material = texture;
    }
    const geometry = new THREE.SphereGeometry( ballconfig.radius, 32, 16 ) ; 
    return new THREE.Mesh( geometry, material );

}

export function bulkAddToScene(scene,initObjects){
    initObjects.forEach(element => {
        scene.add(element)
    });
}


