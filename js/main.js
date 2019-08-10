// use app if it exists or create new object
var app = app || {};

app.init = () => {
    // console.log('hello');
    // create scene
    app.scene = new THREE.Scene();
    // create perspective camera
    app.camera = new THREE.PerspectiveCamera(
        60, // field of view
        window.innerWidth / window.innerHeight, // screen ratio width divided by height
        0.1, // near plane
        1000, // far plane
    );

    // create camera position
    app.camera.position.x = -100;
    app.camera.position.y = 250;
    app.camera.position.z = 100;
    // or shorthand
    // app.camera.position.set(-100, 250, 100);

    app.camera.lookAt(app.scene.position);  // default is 0,0,0

    app.renderer = new THREE.WebGLRenderer();
    app.renderer.setSize(window.innerWidth, window.innerHeight);
    app.renderer.setClearColor(0x000000);

    // append renderer to html
    document.getElementById('output').appendChild(app.renderer.domElement);

    // helps you visualise your axes on screen
    app.axes = new THREE.AxesHelper(200);
    app.scene.add(app.axes);

    // create a spotlight that is defined in main.lib file and add it to the scene
    app.spotLight = app.createSpotLight();
    app.scene.add(app.spotLight);

    // create object that is defined in mainlib
    app.sphere = app.createSphere();
    app.scene.add(app.sphere);

    // render scene onto the canvas
    app.renderer.render(app.scene, app.camera);
}

window.onload = app.init;

// if you update window size your graphics will be updated to the new window size - responsiveness
app.resize = () => {
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.renderer.setSize(window.innerWidth, window.innerHeight);

    app.camera.updateProjectionMatrix();
    console.log('size update')
}

window.addEventListener('resize', app.resize);