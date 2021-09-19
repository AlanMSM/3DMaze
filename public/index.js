import * as THREE from  './library/three.module.js'
import {PointerLockControls} from './library/PointerLockControls.js'
import {STLLoader} from './library/STLLoader.js'
import {OrbitControls} from './library/OrbitControls.js';

let scene,camera,renderer,object,oControl, pControl
let xdir=0, zdir=0
let tiempoI, tiempoF, vel, delta

function init(){
    scene = new THREE.Scene();
    scene.background= new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 0, 500);
    scene.add(new THREE.GridHelper(10000,1000,0xff0000));
    scene.add(new THREE.HemisphereLight(0xffffff));

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 10;
    camera.position.y = 5;

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    scene.add(object);

        //let oControl = new OrbitControls(camera,renderer.domElement);
    
    //controls    
    pControl = new PointerLockControls(camera, renderer.domElement);
    document.getElementById('btnPlay').onclick = ()=>{
        pControl.lock()
    }
    document.addEventListener('keydown', (e)=>{
        switch (e.keyCode) {
            case 65:
            case 37:
                xdir=-1
                break;
            case 87:
            case 38:
                zdir=1
                break;
            case 68:
            case 39:
                xdir=1
                break;
            case 83:
            case 40:
                zdir=-1
                break;
        }
    })
    document.addEventListener('keyup', (e)=>{
        switch (e.keyCode) {
            case 65:
            case 37:
                xdir=0
                break;
            case 87:
            case 38:
                zdir=0
                break;
            case 68:
            case 39:
                xdir=0
                break;
            case 83:
            case 40:
                zdir=0
                break;
        }
    })

    tiempoI = Date.now();
    vel = 100;


    animate();
}

function animate(){
    requestAnimationFrame(animate);
    if(pControl.isLocked===true){
        tiempoF= Date.now();
        delta=(tiempoF-tiempoI)/1000;
        let xDis = xdir*vel*delta;
        let zDis = zdir*vel*delta;
        pControl.moveRight(xDis);
        pControl.moveForward(zDis);
        tiempoI=tiempoF;
    }
    renderer.render(scene,camera);
}

let loader = new STLLoader();
loader.load('/3dmodels/Maze.stl', (model)=>{
    object = new THREE.Mesh(
        model,
        new THREE.MeshLambertMaterial({color:0x00ff00})
    );
    object.scale.set(0.1,0.1,0.1    );
    object.position.set(0,0,0);
    init();
});

