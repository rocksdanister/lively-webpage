const container = document.getElementById("container");
let clock = new THREE.Clock();
const gui = new dat.GUI();
setDebugMenu(false);

const defaultFps = 24;
let isPaused = false;
let scene, camera, renderer, material;
let settings = { fps: defaultFps, parallaxVal: 1 };
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 1, 1));
let videoElement;

let vertexShader = `
varying vec2 vUv;        
void main() {
    vUv = uv;
    gl_Position = vec4( position, 1.0 );    
}
`;

async function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: false,
    preserveDrawingBuffer: false,
  });
  renderer.setSize(window.innerWidth, window.innerHeight, 2);
  //renderer.setPixelRatio(0.5);
  container.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  scene.add(quad);

  await setScene("rain");
  //await setScene("clouds");
  //await setScene("synthwave");

  render(); //since init is async
}

//Example: setProperty("u_intensity", 0.5);
function setProperty(property, value) {
  material.uniforms[property].value = value;
}

//Pause rendering
function setPause(val) {
  isPaused = val;
}

function filePicker() {
  document.getElementById("filePicker").click();
}

async function setScene(name, geometry = quad) {
  showTransition();

  material?.uniforms?.u_tex0?.value?.dispose();
  material?.dispose();
  disposeVideoElement(videoElement);
  this.onmousedown = this.onmousemove = null;

  switch (name) {
    case "rain":
      {
        material = new THREE.ShaderMaterial({
          uniforms: {
            u_tex0: { type: "t" },
            u_time: { value: 0, type: "f" },
            u_intensity: { value: 0.4, type: "f" },
            u_speed: { value: 0.25, type: "f" },
            u_brightness: { value: 0.8, type: "f" },
            u_normal: { value: 0.5, type: "f" },
            u_zoom: { value: 2.61, type: "f" },
            u_blur_intensity: { value: 0.5, type: "f" },
            u_blur_iterations: { value: 16, type: "i" },
            u_panning: { value: false, type: "b" },
            u_post_processing: { value: true, type: "b" },
            u_lightning: { value: false, type: "b" },
            u_texture_fill: { value: true, type: "b" },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
            u_tex0_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
          },
          vertexShader: vertexShader,
          fragmentShader: await (await fetch("shaders/rain.frag")).text(),
        });

        new THREE.TextureLoader().load("media/image.jpg", function (tex) {
          material.uniforms.u_tex0_resolution.value = new THREE.Vector2(tex.image.width, tex.image.height);
          material.uniforms.u_tex0.value = tex;
        });

        this.onmousemove = parallax;
        function parallax(event) {
          if (settings.parallaxVal == 0) return;

          const x = (window.innerWidth - event.pageX * settings.parallaxVal) / 90;
          const y = (window.innerHeight - event.pageY * settings.parallaxVal) / 90;

          container.style.transform = `translateX(${x}px) translateY(${y}px) scale(1.09)`;
        }
        //createRainGui();
      }
      break;
    case "synthwave":
      {
        material = new THREE.ShaderMaterial({
          uniforms: {
            u_time: { value: 0, type: "f" },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
          },
          vertexShader: vertexShader,
          fragmentShader: await (await fetch("shaders/synthwave.frag")).text(),
        });
      }
      break;
    case "clouds":
      {
        material = new THREE.ShaderMaterial({
          uniforms: {
            u_time: { value: 0, type: "f" },
            u_mouse: { value: new THREE.Vector4(), type: "v4" },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
          },
          vertexShader: vertexShader,
          fragmentShader: await (await fetch("shaders/clouds.frag")).text(),
        });
        //this.onmousedown = mouseClick;
        function mouseClick(e) {
          material.uniforms.u_mouse.value.x = e.pageX;
          material.uniforms.u_mouse.value.y = e.pageY;
          material.uniforms.u_mouse.value.z = 1;
          material.uniforms.u_mouse.value.w = 1;
        }
      }
      break;
  }
  geometry.material = material;
}

async function showTransition() {
  if (material == null) return;

  renderer.render(scene, camera); //WebGLRenderer.preserveDrawingBuffer is false.
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 1, 1));
  const texture = new THREE.TextureLoader().load(renderer.domElement.toDataURL());
  quad.material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 1.0 });
  scene.add(quad);

  for (let val = 1; val >= 0; val -= 0.1) {
    quad.material.opacity = val;
    await new Promise((r) => setTimeout(r, 75));
  }

  texture.dispose();
  scene.remove(quad);
}

window.addEventListener("resize", function (e) {
  renderer.setSize(window.innerWidth, window.innerHeight, 2);

  material.uniforms.u_resolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
});

function render() {
  setTimeout(function () {
    requestAnimationFrame(render);
  }, 1000 / settings.fps);

  //reset every 6hr
  if (clock.getElapsedTime() > 21600) clock = new THREE.Clock();
  material.uniforms.u_time.value = clock.getElapsedTime();

  if (!isPaused) renderer.render(scene, camera);
}

init();

function setDebugMenu(val) {
  if (!val) {
    gui.hide();
  } else {
    let index = 0;
    gui
      .add(
        {
          next: function () {
            setScene(["rain", "clouds", "synthwave"][(index = index + 1 > 2 ? 0 : index + 1)]);
          },
        },
        "next"
      )
      .name("Switch Background");
    gui.show();
  }
}

function createRainGui() {
  let rain = gui.addFolder("Rain");
  let bg = gui.addFolder("Background");
  rain.add(material.uniforms.u_intensity, "value", 0, 1, 0.01).name("Intensity");
  rain.add(material.uniforms.u_speed, "value", 0, 10, 0.01).name("Speed");
  rain.add(material.uniforms.u_brightness, "value", 0, 1, 0.01).name("Brightness");
  rain.add(material.uniforms.u_normal, "value", 0, 3, 0.01).name("Normal");
  rain.add(material.uniforms.u_zoom, "value", 0.1, 3.0, 0.01).name("Zoom");
  rain.add(material.uniforms.u_lightning, "value").name("Lightning");
  bg.add(
    {
      picker: function () {
        document.getElementById("filePicker").click();
      },
    },
    "picker"
  ).name("Change Background");
  bg.add(material.uniforms.u_blur_iterations, "value", 1, 64, 1).name("Blur Quality");
  bg.add(material.uniforms.u_blur_intensity, "value", 0, 10, 0.01).name("Blur");
  bg.add(settings, "parallaxVal", 0, 5, 1).name("Parallax");
  bg.add(material.uniforms.u_texture_fill, "value").name("Scale to Fill");
  bg.add(material.uniforms.u_panning, "value").name("Panning");
  bg.add(material.uniforms.u_post_processing, "value").name("Post Processing");
  //rain.open();
  //bg.open();
}

document.getElementById("filePicker").addEventListener("change", function () {
  if (this.files[0] === undefined) return;
  let file = this.files[0];
  if (file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/png") {
    disposeVideoElement(videoElement);
    material.uniforms.u_tex0.value?.dispose();

    new THREE.TextureLoader().load(URL.createObjectURL(file), function (tex) {
      material.uniforms.u_tex0.value = tex;
      material.uniforms.u_tex0_resolution.value = new THREE.Vector2(tex.image.width, tex.image.height);
    });
  } else if (file.type == "video/mp4" || file.type == "video/webm") {
    disposeVideoElement(videoElement);
    material.uniforms.u_tex0.value?.dispose();

    videoElement = createVideoElement(URL.createObjectURL(file));
    let videoTexture = new THREE.VideoTexture(videoElement);
    videoElement.addEventListener(
      "loadedmetadata",
      function (e) {
        material.uniforms.u_tex0_resolution.value = new THREE.Vector2(
          videoTexture.image.videoWidth,
          videoTexture.image.videoHeight
        );
      },
      false
    );
    material.uniforms.u_tex0.value = videoTexture;
  }
});

//helpers
function getExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length) || filePath;
}

function hasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

function createVideoElement(src) {
  let htmlVideo = document.createElement("video");
  htmlVideo.src = src;
  htmlVideo.muted = true;
  htmlVideo.loop = true;
  htmlVideo.play();
  return htmlVideo;
}

//ref: https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
function disposeVideoElement(video) {
  if (video != null && video.hasAttribute("src")) {
    video.pause();
    video.removeAttribute("src"); // empty source
    video.load();
  }
}
