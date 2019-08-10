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
        // wireframe: true,
        map: new THREE.TextureLoader().load('img/earth.jpg')
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0, 0);

    return sphere;
}

app.createCube = (x, y, z) => {
    const cubeGeometry = new THREE.BoxGeometry(
        10, //width
        10, // height
        10, //depth
    );

    const cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
    });

    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(x, y, z);

    cube.rotation.x = Math.random();
    cube.rotation.y = Math.random();
    cube.rotation.z = Math.random();

    cube.material.color.setRGB(
        Math.random(),
        Math.random(),
        Math.random(),
    )

    return cube;
}

app.createParticleSystem = () => {
    const particles = new THREE.Geometry();
    const dist = 200;
    for(let i = 0; i < 8000; i++) {
        const particle = new THREE.Vector3(
            THREE.Math.randInt(-dist, dist),
            THREE.Math.randInt(-dist, dist),
            THREE.Math.randInt(-dist, dist),
        )
        particle.vx = 0;
        particle.vy = 0;
        particle.vz = 0;
        
        particles.vertices.push(particle);
    }

    // transparent makes transparent image part transparent and blending makes it smoother
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 10,
        map: new THREE.TextureLoader().load('img/snowflake.png'),
        transparent: true,
        blending: THREE.AdditiveBlending,
        alphaTest: 0.5,
    })

    const particleSystem = new THREE.Points(
        particles,
        particleMaterial,
    )

    return particleSystem;
}

app.animateParticleSystem = () => {
    const particles = app.particleSystem.geometry.vertices;

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const distSquared = (p.x * p.x) + (p.y * p.y) + (p.z * p.z);

        // apply Newton's gravity force to pull stars towards earth
        if (distSquared > 10.0) {
            const gravityForce = 0.2 * (1.0 / distSquared);
            p.vx += gravityForce * p.x;
            // p.vy += gravityForce * p.y;
            p.vz += gravityForce * p.z;
        }

        p.x += p.vx * -0.2;
        p.y += p.vy * 0.2;
        p.z += p.vz * 0.2;
    }

    // update position of the stars
    app.particleSystem.geometry.verticesNeedUpdate = true;
}