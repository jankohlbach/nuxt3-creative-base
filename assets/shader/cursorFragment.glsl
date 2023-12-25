#version 300 es

precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution; // in pixel
uniform float u_time; // in s

out vec4 out_color;


void main() {
  // 0 (left) 0 (bottom) - 1 (top) 1 (right)
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  out_color = vec4(0.0, 0.0, 0.0, 1.0);
}
