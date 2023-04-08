const container = document.getElementById("container");
let clock = new THREE.Clock();

const defaultFps = 24;
let isPaused = false;
let currentScene = null;
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
  //await setScene("snow");
  //await setScene("clouds");
  //await setScene("synthwave");

  render(); //since init is async
}

//Example: setProperty("u_intensity", 0.5);
function setProperty(property, value) {
  material.uniforms[property].value = value;
}

function setTexture(texName, value) {
  let ext = getExtension(value);
  disposeVideoElement(videoElement);
  material.uniforms[texName].value?.dispose();

  //check if resolution variable of format "texName_resolution" present.
  let texResolutionName = null;
  for (var key in material.uniforms) {
    if (key.includes(texName + "_resolution")) {
      texResolutionName = key;
      break;
    }
  }

  if (ext == "jpg" || ext == "jpeg" || ext == "png") {
    new THREE.TextureLoader().load(value, function (tex) {
      material.uniforms[texName].value = tex;
      if (texResolutionName != null)
        material.uniforms[texResolutionName].value = new THREE.Vector2(tex.image.width, tex.image.height);
    });
  } else if (ext == "webm" || ext == "mp4") {
    videoElement = createVideoElement(value);
    let videoTexture = new THREE.VideoTexture(videoElement);
    videoElement.addEventListener(
      "loadedmetadata",
      function (e) {
        if (texResolutionName != null)
          material.uniforms[texResolutionName].value = new THREE.Vector2(
            videoTexture.image.videoWidth,
            videoTexture.image.videoHeight
          );
      },
      false
    );
    material.uniforms.u_tex0.value = videoTexture;
  }
}

//Pause rendering
function setPause(val) {
  isPaused = val;
}

function openFilePicker() {
  document.getElementById("filePicker").click();
}

async function setScene(name, geometry = quad) {
  if (name == currentScene) return;

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
            //u_blur_intensity: { value: 0.5, type: "f" },
            //u_blur_iterations: { value: 16, type: "i" },
            u_panning: { value: false, type: "b" },
            u_post_processing: { value: true, type: "b" },
            u_lightning: { value: false, type: "b" },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
            u_tex0_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
          },
          vertexShader: vertexShader,
          fragmentShader: await (await fetch("shaders/rain.frag")).text(),
        });

        new THREE.TextureLoader().load("media/mountain.jpg", function (tex) {
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
      }
      break;
    case "snow":
      {
        material = new THREE.ShaderMaterial({
          uniforms: {
            u_tex0: { type: "t" },
            u_time: { value: 0, type: "f" },
            u_mouse: { value: new THREE.Vector4(), type: "v4" },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
            u_tex0_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight), type: "v2" },
          },
          vertexShader: vertexShader,
          fragmentShader: await (await fetch("shaders/snow.frag")).text(),
        });

        new THREE.TextureLoader().load("media/mountain.jpg", function (tex) {
          material.uniforms.u_tex0_resolution.value = new THREE.Vector2(tex.image.width, tex.image.height);
          material.uniforms.u_tex0.value = tex;
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
  }
  currentScene = name;
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
