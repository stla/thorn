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
              "    70.0 - 18.0*u + 449.0*u*u - 3461.0*u*u*u + 6058.0*u*u*u*u - 2847.0*u*u*u*u*u, ",
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
        }

        var filter = new PIXI.Filter(null, fragmentShader);
        filter.uniforms.iResolution = [app.screen.width, app.screen.height];
        filter.uniforms.iGlobalTime = 0;
        filter.uniforms.iFixedTime = 0;
        filter.uniforms.iAnim = false;
        filter.uniforms.iMouse = { x: 0, y: 0 };

        if(x.shader === "thorn" || x.shader === "thorn-color") {
          filter.uniforms.iScale = 1;
        }

        el.onmousemove = function(evt) {
          filter.uniforms.iMouse = { x: evt.clientX, y: evt.clientY };
        };

        el.onclick = function(evt) {
          filter.uniforms.iAnim = !filter.uniforms.iAnim;
          filter.uniforms.iFixedTime = filter.uniforms.iGlobalTime;
        };

        var hamster = Hamster(el);
        if(x.shader === "thorn" || x.shader === "thorn-color") {
          var factor0 = 1.001;
          hamster.wheel(function(event, delta, deltaX, deltaY) {
            var factor = Math.max(0.1, Math.pow(factor0, deltaY));
            filter.uniforms.iScale /= factor;
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
          filter.uniforms.iResolution = [app.screen.width, app.screen.height];
        }
        window.addEventListener("resize", onresize, false);

        var startTime = Date.now();
        app.ticker.add(function(delta) {
          var currentTime = Date.now();
          filter.uniforms.iGlobalTime = (currentTime - startTime) * 0.00025;
        });

      },


      resize: function(width, height) {
        // TODO: code to re-render the widget with a new size
      }

    };
  }
});
