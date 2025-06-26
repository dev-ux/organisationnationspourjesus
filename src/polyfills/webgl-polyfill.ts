// Polyfill pour gérer la dépréciation de WEBGL_debug_renderer_info
if (typeof WebGLRenderingContext !== 'undefined') {
  const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
  
  WebGLRenderingContext.prototype.getParameter = function(this: WebGLRenderingContext, parameter: number) {
    if (parameter === 0x9242) { // WEBGL_debug_renderer_info
      return this.getParameter(0x1F02); // RENDERER
    }
    return originalGetParameter.call(this, parameter);
  };
}
