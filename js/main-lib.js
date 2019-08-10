var app = app || {};

app.createSpotLight = () => {
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 100, 50);

    return spotLight;
}

// mesh = geometry + material -- look up specs in documentation
app.createSphere = () => {
    const sphereGeometry = new THREE.SphereGeometry(
        30,
        50,
        50,
    );

    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);

    return sphere;
}