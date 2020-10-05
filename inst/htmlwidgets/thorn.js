HTMLWidgets.widget({
  name: "thorn",

  type: "output",

  factory: function(el, width, height) {
    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        var app = new PIXI.Application({
          width: width, //window.innerWidth,
          height: height //window.innerHeight
        });

        app.resizeTo = el;//window;

        var fragmentShader;
        switch(x.shader) {
          case "thorn":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform vec2 iMouse;",
              "uniform float iScale;",
              "",
              "float lerp(float t, float a, float b) {",
              "  return a + t*(b-a);",
              "}",
              "float norm(float t, float a, float b) {",
              "  return (t-a)/(b-a);",
              "}",
              "float map(float t, float e1, float s1, float e2, float s2) {",
              "  return lerp(norm(t, e1, s1), e2, s2);",
              "}",
              "",
              "vec2 product(vec2 a, vec2 b) {",
              "  return vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x);",
              "}",
              "vec2 conjugate(vec2 a) {",
              "  return vec2(a.x, -a.y);",
              "}",
              "vec2 divide(vec2 a, vec2 b) {",
              "  return vec2(a.x*b.x+a.y*b.y, a.y*b.x-a.x*b.y) / (b.x*b.x+b.y*b.y);",
              "}",
              "",
              "float pi = 3.1415926535897932384626433832795;",
              "float pio2 = pi/2.0;",
              "",
              "vec2 mobius(vec2 z, vec2 gamma, float t) {",
              "  float g2 = gamma.x*gamma.x + gamma.y*gamma.y;",
              "  float h = sqrt(1.0 - g2);",
              "  vec2 d2 = pow(h, t) * vec2(cos(t*pio2), sin(t*pio2));",
              "  vec2 d1 = conjugate(d2);",
              "  vec2 a = vec2(d1.x, -d1.y/h);",
              "  vec2 b = d2.y * gamma / h;",
              "  vec2 c = conjugate(b);",
              "  vec2 d = conjugate(a);",
              "  return divide(product(a, z) + b, product(c, z) + d);",
              "}",
              "",
              "vec2 gamma = vec2(0.1, 0.2);",
              "",
              "void main(void) {",
              "  vec2 z = vec2(",
              "    map(gl_FragCoord.x, 0.0, iResolution.x, -pi, pi),",
              "    map(gl_FragCoord.y, 0.0, iResolution.y, -pi, pi)",
              "  );",
              "  float cx = map(iMouse.x, 0.0, iResolution.x, -2.0, 2.0);",
              "  float cy = map(iMouse.y, 0.0, iResolution.y, -2.0, 2.0);",
              "  float t = iAnim ? iGlobalTime : iFixedTime;",
              "  vec2 zprime = iScale * mobius(z/iScale, gamma, 1.0 + cos(t));",
              "  float x = zprime.x; float y = zprime.y;",
              "  float ii;    ",
              "  for(int i = 0; i < 16; i++) {",
              "    float nx = x/cos(y) + cx;",
              "    float ny = y/sin(x) + cy;",
              "    x = nx;",
              "    y = ny;",
              "    ii = float(i);",
              "    if(x*x + y*y > 1000000.0) {",
              "      break;",
              "    }",
              "  }",
              "  gl_FragColor = vec4(vec3(ii/16.0), 1.0);",
              "}"
            ].join("\n");
            break;

          case "thorn-color":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform vec2 iMouse;",
              "uniform float iScale;",
              "",
              "float lerp(float t, float a, float b) {",
              "  return a + t*(b-a);",
              "}",
              "float norm(float t, float a, float b) {",
              "  return (t-a)/(b-a);",
              "}",
              "float map(float t, float e1, float s1, float e2, float s2) {",
              "  return lerp(norm(t, e1, s1), e2, s2);",
              "}",
              "",
              "vec3 viridis(float u) {",
              "  return vec3(",
              "    70.0 - 18.0*u + 449.0*u*u - 3461.0*u*u*u + 6058.0*u*u*u*u - 2847.0*u*u*u*u*u,",
              "    4.0 + 320.0*u - 50.0*u*u - 40.0*u*u*u,",
              "    85.0 + 346.0*u + 119.0*u*u - 5374.0*u*u*u + 15427.0*u*u*u*u - 17627.0*u*u*u*u*u + 7057.0*u*u*u*u*u*u",
              "  ) / 255.0;",
              "}",
              "",
              "vec2 product(vec2 a, vec2 b) {",
              "  return vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x);",
              "}",
              "vec2 conjugate(vec2 a) {",
              "  return vec2(a.x, -a.y);",
              "}",
              "vec2 divide(vec2 a, vec2 b) {",
              "  return vec2(a.x*b.x+a.y*b.y, a.y*b.x-a.x*b.y) / (b.x*b.x+b.y*b.y);",
              "}",
              "",
              "float pi = 3.1415926535897932384626433832795;",
              "float pio2 = pi/2.0;",
              "",
              "vec2 mobius(vec2 z, vec2 gamma, float t) {",
              "  float g2 = gamma.x*gamma.x + gamma.y*gamma.y;",
              "  float h = sqrt(1.0 - g2);",
              "  vec2 d2 = pow(h, t) * vec2(cos(t*pio2), sin(t*pio2));",
              "  vec2 d1 = conjugate(d2);",
              "  vec2 a = vec2(d1.x, -d1.y/h);",
              "  vec2 b = d2.y * gamma / h;",
              "  vec2 c = conjugate(b);",
              "  vec2 d = conjugate(a);",
              "  return divide(product(a, z) + b, product(c, z) + d);",
              "}",
              "",
              "vec2 gamma = vec2(0.1, 0.2);",
              "",
              "void main(void) {",
              "  vec2 z = vec2(",
              "    map(gl_FragCoord.x, 0.0, iResolution.x, -pi, pi),",
              "    map(gl_FragCoord.y, 0.0, iResolution.y, -pi, pi)",
              "  );",
              "  float cx = map(iMouse.x, 0.0, iResolution.x, -2.0, 2.0);",
              "  float cy = map(iMouse.y, 0.0, iResolution.y, -2.0, 2.0);",
              "  float t = iAnim ? iGlobalTime : iFixedTime;",
              "  vec2 zprime = iScale * mobius(z/iScale, gamma, 1.0 + cos(t));",
              "  float x = zprime.x; float y = zprime.y;",
              "  float ii;    ",
              "  for(int i = 0; i < 32; i++) {",
              "    float nx = x/cos(y) + cx;",
              "    float ny = y/sin(x) + cy;",
              "    x = nx;",
              "    y = ny;",
              "    ii = float(i);",
              "    if(x*x + y*y > 1000000.0) {",
              "      break;",
              "    }",
              "  }",
              "  gl_FragColor = vec4(viridis(ii/32.0), 1.0);",
              "}"
            ].join("\n");
            break;

          case "ikeda":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform vec2 iMouse;",
              "",
              "float lerp(float t, float a, float b) {",
              "  return a + t*(b-a);",
              "}",
              "float norm(float t, float a, float b) {",
              "  return (t-a)/(b-a);",
              "}",
              "float map(float t, float e1, float s1, float e2, float s2) {",
              "  return lerp(norm(t, e1, s1), e2, s2);",
              "}",
              "",
              "vec3 hsv2rgb(vec3 c) {",
              "  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);",
              "  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
              "  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
              "}",
              "float pi = 3.1415926535897932384626433832795;",
              "vec3 pair2hsv(vec2 z) {",
              "  float h = (atan(z.y, z.x) + pi) / 2.0 / pi;",
              "  float l = sqrt(z.x*z.x + z.y*z.y);",
              "  float x = 2.0 * pi * log(1.0 + l);",
              "  float s = (1.0 + sin(x)) / 2.0;",
              "  float v = (1.0 + cos(x)) / 2.0;",
              "  return vec3(h, s, v);",
              "}",
              "",
              "vec3 ikeda(float x, float y, float tau0, float gamma) {",
              "  float tau;",
              "  float newx;",
              "  for(int k = 0; k < 6; k++) {",
              "    tau = tau0 - 6.0/(1.0+x*x+y*y);",
              "    newx = 0.97 + gamma*(x*cos(tau)-y*sin(tau));",
              "    y = gamma*(x*sin(tau)+y*cos(tau));",
              "    x = newx;",
              "  }",
              "  return hsv2rgb(pair2hsv(vec2(x,y)));",
              "}",
              "",
              "void main(void) {",
              "  float t = iAnim ? iGlobalTime : iFixedTime;",
              "  float tau0 = (1.0 + cos(t)) / 2.0;",
              "  float gamma = 0.5 + 2.0*(iMouse.x + iMouse.y) / (iResolution.x + iResolution.y);",
              "  float x = map(gl_FragCoord.x, 0.0, iResolution.x, -10.0, 4.0);",
              "  float y = map(gl_FragCoord.y, 0.0, iResolution.y, -6.0, 5.0);",
              "  gl_FragColor = vec4(ikeda(x, y, tau0, gamma), 1.0);",
              "}"
            ].join("\n");
            break;

          case "sweet":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform vec2 iMouse;",
              "uniform float x0;",
              "uniform float y0;",
              "uniform float sx;",
              "uniform float sy;",
              "",
              "vec3 hsv2rgb(vec3 c) {",
              "  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);",
              "  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
              "  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
              "}",
              "",
              "float pi = 3.1415926535897932384626433832795;",
              "",
              "vec3 pair2hsv(vec2 z, float h0) {",
              "  float h = mod(h0 + (atan(z.y, z.x) + pi) / 2.0 / pi, 1.0);",
              "  float l = sqrt(z.x*z.x + z.y*z.y);",
              "  float x = 2.0 * pi * log(1.0 + l);",
              "  float s = (1.0 + sin(x)) / 2.0;",
              "  float v = (1.0 + cos(x)) / 2.0;",
              "  return vec3(h, s, v);",
              "}",
              "",
              "vec3 henon(float x, float y, float A, float B, float mu, float h0) {",
              "  float r2; float oldx;",
              "  for(int k = 0; k < 500; k++) {",
              "    oldx = x;",
              "    x = A - x*x + B*y;",
              "    y = A - y*y + B*(mu*x+(1.0-mu)*oldx);",
              "    r2 = x*x + y*y;",
              "    if(r2 > 10000.0) {",
              "      break;",
              "    }",
              "  }",
              "  return hsv2rgb(pair2hsv(vec2(x,y), h0));",
              "}",
              "",
              "void main(void) {",
              "  float A = 1.0 + 4.0 * iMouse.x / iResolution.x;",
              "  float B = 1.0 + 2.0 * iMouse.y / iResolution.y;",
              "  float x = sx*(gl_FragCoord.x - iResolution.x/2.0) + x0;",
              "  float y = sy*(gl_FragCoord.y - iResolution.y/2.0) + y0;",
              "  float h0 = iAnim ? cos(iGlobalTime) : cos(iFixedTime);",
              "  float mu = (1.0 + h0) / 2.0;",
              "  gl_FragColor = vec4(henon(x, y, A, B, mu, h0), 1.0);",
              "}"
            ].join("\n");
            break;

          case "biomorph1":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform vec2 iMouse;",
              "",
              "vec3 hsv2rgb(vec3 c) {",
              "  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);",
              "  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
              "  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
              "}",
              "",
              "float pi = 3.1415926535897932384626433832795;",
              "",
              "vec3 pair2hsv(vec2 z) {",
              "  float h = (atan(z.y, z.x) + pi) / 2.0 / pi;",
              "  float l = sqrt(z.x*z.x + z.y*z.y);",
              "  float x = 2.0 * pi * log(1.0 + l);",
              "  float s = (1.0 + sin(x)) / 2.0;",
              "  float v = (1.0 + cos(x)) / 2.0;",
              "  return vec3(h, s, v);",
              "}",
              "",
              "vec2 f(vec2 z) {",
              "  float re = z.x*z.x*z.x - 3.0*z.x*z.y*z.y;",
              "  float im = -z.y*z.y*z.y + 3.0*z.x*z.x*z.y;",
              "  vec2 z3 = vec2(re, im);",
              "  return 2.0/3.0 * (z3-2.0);",
              "}",
              "",
              "float R = 100.0;",
              "float alpha = 0.7;",
              "float beta = 0.8;",
              "",
              "vec3 g(vec2 z, float c, float d) {",
              "  vec3 rgb = vec3(0.0,0.0,0.0);",
              "  for(int k=1; k <= 15; k++) {",
              "    vec2 w = beta*(f(z) + c) + (1.0 - beta)*z;",
              "    z = alpha*(f(w) + d) + (1.0 - alpha)*w;",
              "    if(z.x*z.x + z.y*z.y > R) {",
              "      rgb = hsv2rgb(pair2hsv(z));",
              "      break;",
              "    }",
              "  }",
              "  return rgb;",
              "}",
              "",
              "void main(void) {",
              "  float c = iMouse.x / iResolution.x;",
              "  float d = iMouse.y / iResolution.y;",
              "  float x = 4.0 * gl_FragCoord.x / iResolution.x - 2.0;",
              "  float y = 4.0 * gl_FragCoord.y / iResolution.y - 2.0;",
              "  gl_FragColor = vec4(g(vec2(x, y), c, d), 1.0);",
              "}"
            ].join("\n");
            break;

          case "biomorph2":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform vec2 iMouse;",
              "",
              "vec3 hsv2rgb(vec3 c) {",
              "  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);",
              "  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
              "  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
              "}",
              "",
              "float pi = 3.1415926535897932384626433832795;",
              "",
              "vec3 pair2hsv(vec2 z) {",
              "  float h = (atan(z.y, z.x) + pi) / 2.0 / pi;",
              "  float l = sqrt(z.x*z.x + z.y*z.y);",
              "  float x = 2.0 * pi * log(1.0 + l);",
              "  float s = (1.0 + sin(x)) / 2.0;",
              "  float v = (1.0 + cos(x)) / 2.0;",
              "  return vec3(h, s, v);",
              "}",
              "",
              "vec2 f(vec2 z) {",
              "  float re = ",
              "    z.x*z.x*z.x*z.x*z.x - 10.0*z.x*z.x*z.x*z.y*z.y + 5.0*z.x*z.y*z.y*z.y*z.y;",
              "  float im = ",
              "    z.y*z.y*z.y*z.y*z.y - 10.0*z.x*z.x*z.y*z.y*z.y + 5.0*z.x*z.x*z.x*z.x*z.y;",
              "  vec2 z5 = vec2(re, im);",
              "  return 2.0/3.0 * (z5-2.0);",
              "}",
              "",
              "float R = 100.0;",
              "float time = iAnim ? iGlobalTime : iFixedTime;",
              "float c = cos(time);",
              "float d = sin(time);",
              "",
              "vec3 g(vec2 z, float alpha, float beta) {",
              "  vec3 rgb = vec3(0.0,0.0,0.0);",
              "  for(int k=1; k <= 15; k++) {",
              "    vec2 w = beta*(f(z) + c) + (1.0 - beta)*z;",
              "    z = alpha*(f(w) + d) + (1.0 - alpha)*w;",
              "    if(z.x*z.x + z.y*z.y > R) {",
              "      rgb = hsv2rgb(pair2hsv(z));",
              "      break;",
              "    }",
              "  }",
              "  return rgb;",
              "}",
              "",
              "void main(void) {",
              "  float alpha = iMouse.x / iResolution.x;",
              "  float beta = iMouse.y / iResolution.y;",
              "  float x = 4.0 * gl_FragCoord.x / iResolution.x - 2.0;",
              "  float y = 4.0 * gl_FragCoord.y / iResolution.y - 2.0;",
              "  gl_FragColor = vec4(g(vec2(x, y), alpha, beta), 1.0);",
              "}"
            ].join("\n");
            break;

          case "biomorph3":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform vec2 iMouse;",
              "uniform float xmin;",
              "uniform float xmax;",
              "uniform float ymin;",
              "uniform float ymax;",
              "",
              "vec3 hsv2rgb(vec3 c) {",
              "  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);",
              "  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
              "  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
              "}",
              "",
              "float pi = 3.1415926535897932384626433832795;",
              "",
              "vec3 pair2hsv(vec2 z) {",
              "  float h = (atan(z.y, z.x) + pi) / 2.0 / pi;",
              "  float l = sqrt(z.x*z.x + z.y*z.y);",
              "  float x = 2.0 * pi * log(1.0 + l);",
              "  float s = (1.0 + sin(x)) / 2.0;",
              "  float v = (1.0 + cos(x)) / 2.0;",
              "  return vec3(h, s, v);",
              "}",
              "",
              "vec2 f(vec2 z) {",
              "  float re = z.x*z.x*z.x*z.x + z.y*z.y*z.y*z.y - 6.0*z.x*z.x*z.y*z.y;",
              "  float im = 4.0*(z.y*z.y*z.y*z.x - z.x*z.x*z.x*z.y);",
              "  vec2 cz4 = vec2(re, im);",
              "  return 2.0/3.0 * (cz4-2.0);",
              "}",
              "",
              "float R = 100.0;",
              "",
              "vec3 g(vec2 z, float c, float d, float alpha, float beta) {",
              "  vec3 rgb = vec3(0.0,0.0,0.0);",
              "  for(int k=1; k <= 15; k++) {",
              "    vec2 w = beta*(f(z) + c) + (1.0 - beta)*z;",
              "    z = alpha*(f(w) + d) + (1.0 - alpha)*w;",
              "    if(z.x*z.x + z.y*z.y > R) {",
              "        rgb = hsv2rgb(pair2hsv(z));",
              "        break;",
              "    }",
              "  }",
              "  return rgb;",
              "}",
              "",
              "void main(void) {",
              "  float c = iMouse.x / iResolution.x;",
              "  float d = iMouse.y / iResolution.y;",
              "  float alpha0 = iAnim ? cos(iGlobalTime) : cos(iFixedTime);",
              "  float beta0 = iAnim ? sin(iGlobalTime) : sin(iFixedTime);",
              "  vec2 z = vec2(",
              "    (xmax - xmin) * gl_FragCoord.x/iResolution.x + xmin,",
              "    (ymax - ymin) * gl_FragCoord.y/iResolution.y + ymin",
              "  );",
              "  gl_FragColor = vec4(g(z, c, d, (1.0+alpha0)/2.0, (1.0+beta0)/2.0), 1.0);",
              "}"
            ].join("\n");
            break;

          case "apollony":
            fragmentShader = [
              "uniform vec2 iResolution;",
              "uniform float iGlobalTime;",
              "uniform float iFixedTime;",
              "uniform bool iAnim;",
              "uniform float xmin;",
              "uniform float xmax;",
              "uniform float ymin;",
              "uniform float ymax;",
              "",
              "const float pi = 3.1415926535897932384626433832795;",
              "",
              "// complex numbers",
              "vec2 product(vec2 a, vec2 b) {",
              "  return vec2(a.x*b.x-a.y*b.y, a.x*b.y+a.y*b.x);",
              "}",
              "vec2 conjugate(vec2 a) {",
              "  return vec2(a.x, -a.y);",
              "}",
              "vec2 divide(vec2 a, vec2 b) {",
              "  return vec2(a.x*b.x+a.y*b.y, a.y*b.x-a.x*b.y) / (b.x*b.x+b.y*b.y);",
              "}",
              "",
              "vec2 mobius(vec2 z, vec2 gamma, float t) {",
              "  float g2 = gamma.x*gamma.x + gamma.y*gamma.y;",
              "  float h = sqrt(1.0 - g2);",
              "  vec2 d2 = pow(h, t) * vec2(cos(t*pi/2.0), sin(t*pi/2.0));",
              "  vec2 d1 = conjugate(d2);",
              "  vec2 a = vec2(d1.x, -d1.y/h);",
              "  vec2 b = d2.y * gamma / h;",
              "  vec2 c = conjugate(b);",
              "  vec2 d = conjugate(a);",
              "  return divide(product(a, z) + b, product(c, z) + d);",
              "}",
              "",
              "const float sqrt2 = sqrt(2.0);",
              "const vec2 c1 = vec2(sqrt2, 0.0);",
              "const vec2 c2 = vec2(0.0, sqrt2);",
              "const vec2 c3 = vec2(-sqrt2, 0.0);",
              "const vec2 c4 = vec2(0.0, -sqrt2);",
              "const vec2 c5 = vec2(0.0, 0.0);",
              "const float R2 = 1.0;",
              "const float r2 = (sqrt2-1.0)*(sqrt2-1.0);",
              "",
              "float squaredLength(vec2 v) {",
              "  return v.x*v.x + v.y*v.y;",
              "}",
              "",
              "vec2 iota(vec2 pole, float k, vec2 M) {",
              "  vec2 pole_M = M - pole;",
              "  return pole + k/squaredLength(pole_M) * pole_M;",
              "}",
              "",
              "bool contains(vec2 c, float r2, vec2 M) {",
              "  return squaredLength(M-c) < r2;",
              "}",
              "",
              "vec3 color(vec2 M, int itr) {",
              "  float s = 0.08 * (4.0-length(M)) + float(itr); ",
              "  float arg = pi * s / 20.0 - 3.74;",
              "  return sin(vec3(arg - pi, arg - 3.5*pi, arg - 3.6*pi)) * 0.49 + 0.5;",
              "}",
              "",
              "vec3 g(vec2 M) {",
              "  int itr = 0;",
              "  for(int i=0; i < 50; i++) {",
              "    if(contains(c1, R2, M)) {",
              "      M = iota(c1, R2, M);",
              "      itr += 1;",
              "    }else if(contains(c2, R2, M)) {",
              "      M = iota(c2, R2, M);",
              "      itr += 1;",
              "    }else if(contains(c3, R2, M)) {",
              "      M = iota(c3, R2, M);",
              "      itr += 1;",
              "    }else if(contains(c4, R2, M)) {",
              "      M = iota(c4, R2, M);",
              "      itr += 1;",
              "    }else if(contains(c5, r2, M)) {",
              "      M = iota(c5, r2, M);",
              "      itr += 1;",
              "    }else{",
              "      break;",
              "    }",
              "  }",
              "  return color(M, itr);",
              "}",
              "",
              "void main(void) {",
              "  float t = 1.0 + (iAnim ? sin(iGlobalTime) : sin(iFixedTime));",
              "  vec2 z0 = vec2(",
              "    (xmax - xmin) * gl_FragCoord.x/iResolution.x + xmin,",
              "    (ymax - ymin) * gl_FragCoord.y/iResolution.y + ymin",
              "  );",
              "  vec2 z = mobius(z0, vec2(0.8,0.2), t);",
              "  gl_FragColor = vec4(g(z), 1.0);",
              "}"
            ].join("\n");
            break;
        }

        var filter = new PIXI.Filter(null, fragmentShader);
        filter.uniforms.iResolution = {
          x: app.screen.width,
          y: app.screen.height
        };
        if(x.shader !== "biomorph1") {
          filter.uniforms.iGlobalTime = 0;
          filter.uniforms.iFixedTime = 0;
          filter.uniforms.iAnim = false;
        }
        if(x.shader !== "apollony") {
          filter.uniforms.iMouse = {
            x: app.screen.width / 2,
            y: app.screen.height / 2
          };
        }

        if(x.shader === "thorn" || x.shader === "thorn-color") {
          filter.uniforms.iScale = 1;
        }

        if(x.shader === "sweet") {
          var xmin = -4, xmax = 4, ymin = -3, ymax = 5;
          filter.uniforms.x0 = (xmin + xmax) / 2;
          filter.uniforms.y0 = (ymin + ymax) / 2;
          filter.uniforms.sx = (xmax - xmin) / app.screen.width;
          filter.uniforms.sy = (ymax - ymin) / app.screen.height;
        } else if(x.shader === "biomorph3") {
          var xmin = -2, xmax = 2, ymin = -2, ymax = 2;
          filter.uniforms.xmin = xmin;
          filter.uniforms.xmax = xmax;
          filter.uniforms.ymin = ymin;
          filter.uniforms.ymax = ymax;
        } else if(x.shader === "apollony") {
          var xmin = -1.25, xmax = 1.25, ymin = -1.25, ymax = 1.25;
          filter.uniforms.xmin = xmin;
          filter.uniforms.xmax = xmax;
          filter.uniforms.ymin = ymin;
          filter.uniforms.ymax = ymax;
        }

        if(x.shader !== "apollony") {
          el.onmousemove = function(evt) {
            var dims = evt.target.getBoundingClientRect();
            filter.uniforms.iMouse = {
              x: evt.offsetX / dims.width * 1000,
              y: evt.offsetY / dims.height * 1000
            };
          };
        }

        if(x.shader !== "biomorph1") {
          el.onclick = function(evt) {
            filter.uniforms.iAnim = !filter.uniforms.iAnim;
            filter.uniforms.iFixedTime = filter.uniforms.iGlobalTime;
          };
        }

        if(x.shader === "thorn" || x.shader === "thorn-color") {
          var hamster = Hamster(el);
          var factor0 = 1.001;
          hamster.wheel(function(event, delta, deltaX, deltaY) {
            var factor = Math.max(0.1, Math.pow(factor0, deltaY));
            filter.uniforms.iScale /= factor;
          });
        } else if(x.shader === "apollony") {
          var hamster = Hamster(el);
          var zoom0 = 1.001;
          hamster.wheel(function(event, delta, deltaX, deltaY) {
            var ex = event.originalEvent.clientX;
            var ey = event.originalEvent.clientY;
            var zoom = Math.pow(zoom0, deltaY);
            var sx = (filter.uniforms.xmax - filter.uniforms.xmin) / filter.uniforms.iResolution.x;
            var sy = (filter.uniforms.ymax - filter.uniforms.ymin) / filter.uniforms.iResolution.y;
            var dx = ex - filter.uniforms.iResolution.x / 2;
            var dy = filter.uniforms.iResolution.y / 2 - ey;
            sx /= zoom;
            sy /= zoom;
            var midx = (filter.uniforms.xmin + filter.uniforms.xmax) / 2 + (zoom - 1) * dx * sx;
            var midy = (filter.uniforms.ymin + filter.uniforms.ymax) / 2 + (zoom - 1) * dy * sy;
            var rangex = (filter.uniforms.xmax - filter.uniforms.xmin) / zoom;
            var rangey = (filter.uniforms.ymax - filter.uniforms.ymin) / zoom;
            filter.uniforms.xmax = (rangex + 2 * midx) / 2;
            filter.uniforms.ymax = (rangey + 2 * midy) / 2;
            filter.uniforms.xmin = filter.uniforms.xmax - rangex;
            filter.uniforms.ymin = filter.uniforms.ymax - rangey;
          });
        }

        var container = new PIXI.Container();
        container.filterArea = app.screen;
        container.filters = [filter];
        app.stage.addChild(container);

        el.appendChild(app.view);

        function onresize(event) {
          if(app.resize) app.resize();
          container.filterArea = app.screen;
          filter.uniforms.iResolution = {
            x: app.screen.width,
            y: app.screen.height
          };
        }
        window.addEventListener("resize", onresize, false);

        if(x.shader !== "biomorph1") {
          var startTime = Date.now();
          app.ticker.add(function(delta) {
            var currentTime = Date.now();
            filter.uniforms.iGlobalTime = (currentTime - startTime) * 0.00025;
          });
        }

      },


      resize: function(width, height) {
        // TODO: code to re-render the widget with a new size
      }

    };
  }
});
