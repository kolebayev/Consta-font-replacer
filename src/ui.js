document.getElementById("create").onclick = () => {
  parent.postMessage({ pluginMessage: { type: "create" } }, "*");
  console.log('clicked')
};

const fontLoadStatusNode = document.getElementById("message");

onmessage = (e) => {
  if (e.data.pluginMessage === "font load error") {
    fontLoadStatusNode.textContent = "шрифты не загружены";
    console.log("got this from the plugin code:", e.data.pluginMessage);
  }
  if (e.data.pluginMessage === "fonts-loaded") {
    fontLoadStatusNode.textContent = "шрифты загружены";
    console.log("got this from the plugin code:", e.data.pluginMessage);
  }
  if (e.data.pluginMessage.includes('layers-found')) {
    fontLoadStatusNode.textContent = fontLoadStatusNode.textContent + [...e.data.pluginMessage.split(':')][1];
  }
};
