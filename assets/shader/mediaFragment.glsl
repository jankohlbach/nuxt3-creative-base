precision highp float;

uniform sampler2D uTexture; // texture

in vec2 vUv; // 0 (left) 0 (bottom) - 1 (right) 1 (top)
in vec2 vUvCover;

out vec4 outColor;


void main() {
  // texture
  vec3 texture = vec3(texture(uTexture, vUvCover));

  // output
  outColor = vec4(texture, 1.0);
}
