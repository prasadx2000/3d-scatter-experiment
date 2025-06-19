import * as THREE from 'three'
import * as dat from 'lil-gui'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'



//Scene
const scene = new THREE.Scene()

//Camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const perspectiveCamera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
)
scene.add(perspectiveCamera);

perspectiveCamera.position.set(0, 0, 5)

//Renderer
const canvas = document.querySelector('.canvas')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha:true })
renderer.setSize(sizes.width, sizes.height)

//Texture
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/6.png')

//Material
const normalMaterial = new THREE.MeshNormalMaterial()
const standardMaterial = new THREE.MeshStandardMaterial()


//Mesh
const cubeGroup = new THREE.Group()
const cubes = []
for (let i = 0; i < 50; i++) {
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(),
        standardMaterial
    )
    let x, y, z
    do {
        cube.position.set(
            x = (Math.random() - 0.5) ,
            y = (Math.random() - 0.5) ,
            z = (Math.random() - 0.5)
        )
        cubeGroup.add(cube)
    } while (Math.sqrt(x * x + y * y + z * z) > 3)

    cube.position.set(x, y, z)
    cube.userData.originalPosition = { x, y, z }
    const randomScaleX = Math.random()
    const randomScaleY = Math.random()
    const randomScaleZ = Math.random()

    cube.scale.set(randomScaleX, randomScaleY, randomScaleZ)

    const outX = (Math.random() - 0.5) * 10
    const outY = (Math.random() - 0.5) * 10
    const outZ = (Math.random() - 0.5) * 10

    const distance = Math.sqrt(outX * outX + outY * outY + outZ * outZ)
    if (distance < 2) {
        const scale = 1.5 / distance
        cube.userData.targetPosition = {
            x: outX * scale,
            y: outY * scale,
            z: outZ * scale
        }
    } else {
        cube.userData.targetPosition = { x: outX, y: outY, z: outZ }
    }

    cubes.push(cube)
}
scene.add(cubeGroup)

//Sphere
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xd5b201,
    emissive: 0xd5b201,
    emissiveIntensity: 200,
    metalness: 0.3,
    roughness: 0.4
})
// const sphereMaterial = new THREE.MeshBasicMaterial(
//     {color: 0xd5b201}
// )
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 62, 16),
    sphereMaterial
)
scene.add(sphere)

//Light
//Point Light
const pointLight = new THREE.PointLight(
    0xff8d0a, 2, 5, 6
)
/*
  0xff8d0a
  0xe2bb2c
*/

const bottomSecondaryPointLight = new THREE.PointLight(
    0xffffff, 1, 10, 1.5
)
bottomSecondaryPointLight.position.set(-3,-2,-1)
bottomSecondaryPointLight.lookAt(sphere.position)

const secondaryPointLight = new THREE.PointLight(
    0xffffff, 1, 10, 1.5
)
secondaryPointLight.position.set(3,2,1)
secondaryPointLight.lookAt(sphere.position)
/*
    0x4cc25a
    0x0055ff
*/

const ambientLight = new THREE.AmbientLight({ color: "white" }, 0.013)
// ambientLight.visible = false
scene.add(pointLight,secondaryPointLight,bottomSecondaryPointLight,ambientLight)

// const hemisphereLight = new THREE.HemisphereLight(
//     0xff0000,
//     0xffccaa,
//     0.2
// )

// scene.add(hemisphereLight)

//Light Helper
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
const secondaryPointLightHelper = new THREE.PointLightHelper(secondaryPointLight, 2)
// scene.add(pointLightHelper, secondaryPointLightHelper)

//Orbit Control
const controls = new OrbitControls(perspectiveCamera, canvas)

// //DebugUI
// const gui = new dat.GUI()
// const lightFolder = gui.addFolder('Light 1')
// const positionLight = lightFolder.addFolder('Position')
// const secondaryLightFolder = gui.addFolder('Light 2')
// const positionSecondaryLight = secondaryLightFolder.addFolder('Position')
// const meshFolder = gui.addFolder('Mesh')
// const sphereFolder = meshFolder.addFolder('Sphere')

// sphereFolder
//     .addColor(sphere.material, 'color')

// sphereFolder
//     .add(sphere.material,'emissiveIntensity')
//     .min(0)
//     .max(10)
//     .step(0.001)
    
// lightFolder
//     .addColor(pointLight, 'color')

// lightFolder
//     .add(pointLight, 'intensity')
//     .min(0)
//     .max(1000)

// positionLight
//     .add(pointLight.position, 'x')
//     .min(-10)
//     .max(10)
//     .step(0.01)

// positionLight
//     .add(pointLight.position, 'y')
//     .min(-10)
//     .max(10)
//     .step(0.01)

// positionLight
//     .add(pointLight.position, 'z')
//     .min(-10)
//     .max(10)
//     .step(0.01)

// positionLight.close()

// secondaryLightFolder
//     .addColor(secondaryPointLight, 'color')

// secondaryLightFolder
//     .add(secondaryPointLight, 'intensity')
//     .min(0)
//     .max(1000)

// secondaryLightFolder
//     .add(secondaryPointLight, 'distance')
//     .min(0)
//     .max(20)
//     .step(0.001)

// secondaryLightFolder
//     .add(secondaryPointLight, 'decay')
//     .min(0)
//     .max(20)
//     .step(0.001)

// positionSecondaryLight
//     .add(secondaryPointLight.position, 'x')
//     .min(-10)
//     .max(10)
//     .step(0.01)

// positionSecondaryLight
//     .add(secondaryPointLight.position, 'y')
//     .min(-10)
//     .max(10)
//     .step(0.01)

// positionSecondaryLight
//     .add(secondaryPointLight.position, 'z')
//     .min(-10)
//     .max(10)
//     .step(0.01)

// positionSecondaryLight.close()
// gui.close()

//Event Listeners
let expand = false

const hoverElement = document.querySelector('.hover-me')

hoverElement.addEventListener('mouseenter', () =>{
    expand = true
})

hoverElement.addEventListener('mouseleave', () =>{
    expand = false
})

window.addEventListener('mousedown', () => {
    expand = true
})

window.addEventListener('mouseup', () => {
    expand = false
})

window.addEventListener('touchstart', () => {
    expand = true
})

window.addEventListener('touchend', () => {
    expand = false
})

window.addEventListener('touchcancel', () => {
    expand = false
})

window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update camera
    perspectiveCamera.aspect = sizes.width / sizes.height
    perspectiveCamera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

//Animate
const clock = new THREE.Clock()

const animate = () => {
    const elapsedTime = clock.getElapsedTime();

    // pointLight.rotation.x = Math.sin(Math.PI/5) + elapsedTime
    // pointLight.rotation.y = Math.sin(Math.PI/5) + elapsedTime
    // pointLight.rotation.z = Math.sin(Math.PI/5) + elapsedTime
    cubeGroup.rotation.x = elapsedTime * 0.2
    cubeGroup.rotation.y = elapsedTime * 0.2

    // pointLight.intensity = Math.sin(Math.PI*2)
    // secondaryPointLight.intensity = Math.cos(Math.PI*2)
    // console.log(pointLight.intensity, secondaryPointLight.intensity)

    cubes.forEach(cube => {
        const target = expand ? cube.userData.targetPosition : cube.userData.originalPosition
        cube.position.lerp(new THREE.Vector3(target.x, target.y, target.z), 0.05)
    })

    controls.update()
    renderer.render(scene, perspectiveCamera)
    window.requestAnimationFrame(animate)
}

animate()