console.clear();

const fontLoadStatusNode = document.getElementById("message");
const loader = document.getElementById("loader");
const CTAbutton = document.getElementById("create");

async function loadingState() {
  //   CTAbutton.classList.add("Button_disabled");
  //   console.log("clicked");
  //   fontLoadStatusNode.textContent = "";
  //   loader.style.display = "block";
  await parent.postMessage({ pluginMessage: { type: "create" } }, "*");
}

CTAbutton.addEventListener("click", function () {
  // this.classList.add("Button_disabled");
  // console.log("button clicked");
  // fontLoadStatusNode.textContent = "";
  // loader.style.display = "block";
  // setTimeout(loadingState(), 1000);
  // loadingState()
  parent.postMessage({ pluginMessage: { type: "create" } }, "*");
});

onmessage = (e) => {
  if (e.data.pluginMessage.name === "font load error") {
    fontLoadStatusNode.textContent = e.data.pluginMessage.body;
    fontLoadStatusNode.classList.toggle("Text_view_alert");
    console.log("got this from the plugin code:", e.data.pluginMessage);
  }
  if (e.data.pluginMessage.name === "fonts-loaded") {
    fontLoadStatusNode.textContent = e.data.pluginMessage.body;
    fontLoadStatusNode.classList.toggle("Text_view_success");
    console.log("got this from the plugin code:", e.data.pluginMessage);
  }
  // if (e.data.pluginMessage.includes('layers-found')) {
  //   fontLoadStatusNode.textContent = fontLoadStatusNode.textContent + [...e.data.pluginMessage.split(':')][1];
  // }
  if (e.data.pluginMessage === "work-started") {
    console.log('work-started')
    CTAbutton.classList.add("Button_disabled");
    fontLoadStatusNode.textContent = "";
    loader.style.display = "block";
  }
  if (e.data.pluginMessage.name === "work-finished") {
    console.log('work-finished')
    loader.style.display = "none";
    CTAbutton.classList.remove("Button_disabled");
    fontLoadStatusNode.classList.toggle("Text_view_success");
    fontLoadStatusNode.textContent = e.data.pluginMessage.body;
  }
};
