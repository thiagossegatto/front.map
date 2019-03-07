export const loadScript = (url, callback) => {
  return new Promise(function(resolve, reject) {
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    index.parentNode.insertBefore(script, index);
  });
}