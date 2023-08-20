float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec2 cover(vec2 resolution, sampler2D image, vec2 texCoord) {
  vec2 aspectRatio = vec2(resolution.x / resolution.y, 1.0);
  vec2 textureSize = vec2(textureSize(image, 0));
  float textureAspectRatio = textureSize.x / textureSize.y;

  float stretchDirection = step(textureAspectRatio, aspectRatio.x);

  texCoord.x *= pow(aspectRatio.x / textureAspectRatio, stretchDirection);
  texCoord.x += ((1.0 - aspectRatio.x / textureAspectRatio) / 2.0) * stretchDirection;

  texCoord.y *= pow(textureAspectRatio / aspectRatio.x, (1.0 - stretchDirection));
  texCoord.y += ((1.0 - textureAspectRatio / aspectRatio.x) / 2.0) * (1.0 - stretchDirection);

  // readable code
  // if (aspectRatio.x > textureAspectRatio) {
  //   texCoord.x *= aspectRatio.x / textureAspectRatio;
  //   texCoord.x += (1.0 - aspectRatio.x / textureAspectRatio) / 2.0;
  // } else {
  //   texCoord.y *= textureAspectRatio / aspectRatio.x;
  //   texCoord.y += (1.0 - textureAspectRatio / aspectRatio.x) / 2.0;
  // }

  return texCoord;
}

// uv, rotation (in radians), mid (point to rotate around)
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
  return vec2(
    cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
    cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
  );
}


// float circle(vec2 st, float radius) {
//   vec2 dist = st - vec2(0.5);
// 	return 1.0 - smoothstep(radius - (radius * 0.01),
//                           radius + (radius * 0.01),
//                           dot(dist, dist) * 4.0);
// }

// float circle(vec2 uv, vec2 resolution, vec2 disc_center, float disc_radius, float border_size) {
//   uv -= disc_center;
//   uv *= resolution;
//   float dist = sqrt(dot(uv, uv));
//   return smoothstep(disc_radius + border_size, disc_radius - border_size, dist);
// }
