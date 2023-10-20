precision mediump float;

uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;

in vec2 vUv; // 0 (left) 0 (bottom) - 1 (top) 1 (right)
in vec2 vSize;

out vec4 outColor;


vec2 getUv(vec2 uv, vec2 textureSize, vec2 quadSize) {
  vec2 tempUv = uv - vec2(0.5);

  float quadAspect = quadSize.x / quadSize.y;
  float textureAspect = textureSize.x / textureSize.y;

  if (quadAspect < textureAspect) {
    tempUv *= vec2(quadAspect / textureAspect, 1.0);
  } else {
    tempUv *= vec2(1.0, textureAspect / quadAspect);
  }

  tempUv += vec2(0.5);

  return tempUv;
}

void main() {
  // aspect ratio
  vec2 newUv = getUv(vUv, uTextureSize, vSize);

  // texture
  vec3 texture = vec3(texture(uTexture, newUv));

  outColor = vec4(texture, 1.0);
}
