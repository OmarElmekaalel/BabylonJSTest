import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Mesh, MeshBuilder } from "babylonjs";
import { FreeCamera, GroundMesh, Vector3 } from "babylonjs";

//============ FIREBASE
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDKa76mF4NIjfvDC-ivl8O3a0BFsyyKjsM",
    authDomain: "babylonjstest.firebaseapp.com",
    projectId: "babylonjstest",
    storageBucket: "babylonjstest.appspot.com",
    messagingSenderId: "879881086303",
    appId: "1:879881086303:web:960d5f252ce95c02e582ea",
    measurementId: "G-6KXN8XL4X0"
  };
//============

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.querySelector("canvas");
        // var canvas = document.createElement("canvas");
        // canvas.style.width = "70%";
        // canvas.style.height = "70%";
        // canvas.style.alignContent = "center";
        // canvas.id = "gameCanvas";
        // document.body.appendChild(canvas);

        // initialize babylon scene and engine
        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

        // var camera = new FreeCamera("Camera", new Vector3(0, 1, 1));
        var camera = new FreeCamera("camera", new Vector3(1, 1, 0), scene, true);
        camera.attachControl();
        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        var ground = MeshBuilder.CreateGround("ground", {width:10, height:10}, scene);

        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();