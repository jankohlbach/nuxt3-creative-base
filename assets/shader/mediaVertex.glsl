uniform vec2 uResolution; // in pixel
uniform float uTime; // in s
uniform vec2 uTextureSize; // size of texture
uniform vec2 uQuadSize; // size of texture element

#include './resources/utils.glsl';

out vec2 vUv;  // 0 (left) 0 (bottom) - 1 (top) 1 (right)
out vec2 vUvCover;


void main() {
  vUv = uv;
  vUvCover = getCoverUvVert(uv, uTextureSize, uQuadSize);

  // wave based on x
  vec3 newPosition = vec3(position.x, position.y, 10.0 * sin(uv.x * 10.0 + uTime));

  // output
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
