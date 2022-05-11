console.clear();

const fontLoadStatusNode = document.getElementById('message');
const loader = document.getElementById('loader');
const CTAbutton = document.getElementById('create');

CTAbutton.addEventListener('click', function () {
  parent.postMessage({ pluginMessage: { type: 'create' } }, '*');
});

onmessage = (e) => {
  if (e.data.pluginMessage.name === 'font load error') {
    fontLoadStatusNode.textContent = e.data.pluginMessage.body;
    fontLoadStatusNode.classList.toggle('Text_view_alert');
    console.log('got this from the plugin code:', e.data.pluginMessage);
  }

  if (e.data.pluginMessage.name === 'fonts-loaded') {
    fontLoadStatusNode.textContent = e.data.pluginMessage.body;
    fontLoadStatusNode.classList.toggle('Text_view_success');
    console.log('got this from the plugin code:', e.data.pluginMessage);
  }

  if (e.data.pluginMessage === 'work-started') {
    console.log('work-started');
    CTAbutton.classList.add('Button_disabled');
    fontLoadStatusNode.textContent = '';
    loader.style.display = 'block';
    parent.postMessage({ pluginMessage: { type: 'search-text-nodes' } }, '*');
  }

  if (e.data.pluginMessage === 'search-finished') {
    parent.postMessage({ pluginMessage: { type: 'replace-text-nodes' } }, '*');
  }

  if (e.data.pluginMessage.name === 'replace-finished') {
    console.log('replace-finished');
    loader.style.display = 'none';
    CTAbutton.classList.remove('Button_disabled');
    fontLoadStatusNode.classList.toggle('Text_view_success');
    fontLoadStatusNode.innerHTML = e.data.pluginMessage.body;
  }
};
