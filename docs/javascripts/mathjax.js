window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true,
    packages: {'[+]': ['mhchem', 'color', 'colortbl']}
  },
  options: {
    ignoreHtmlClass: "tex2jax_ignore|mathjax_ignore",
    processHtmlClass: "arithmatex|arithmatex-box"
  },
  loader: {load: ['[tex]/mhchem', '[tex]/color', '[tex]/colortbl']},
  startup: {
    pageReady: () => {
      return MathJax.startup.defaultPageReady().then(() => {
        // Marca en el DOM que MathJax ha terminado de pintar todas las ecuaciones
        document.body.setAttribute("data-mathjax-ready", "true");
      });
    }
  }
};