figma.showUI(__html__);

Promise.all([
  figma.loadFontAsync({ family: 'Inter', style: 'Light' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),

  figma.loadFontAsync({ family: 'Segoe UI', style: 'Light' }),
  figma.loadFontAsync({ family: 'Segoe UI', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Segoe UI', style: 'Semibold' }),
  figma.loadFontAsync({ family: 'Segoe UI', style: 'Bold' }),

])
.then(() => {
  figma.ui.postMessage('fonts-loaded');

})
.catch((err) => {
  console.log(err)
  figma.ui.postMessage('font load error');
});

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create') {
    let s2 = figma.currentPage.findAll((n) => n.type === 'TEXT');

    console.log(`LAYERS TOTAL: ${s2.length}`)
    figma.ui.postMessage(`layers-found:${s2.length}`);

    s2.forEach((item, idx) => {
      console.log(idx)
      if (item.type === 'TEXT') {
        
        if (typeof item.fontName === 'object') {
          if (item.fontName.family === 'Segoe UI') {
            item.fontName = {
              family: 'Inter',
              style:
                item.fontName.style === 'Semibold'
                  ? 'Semi Bold'
                  : item.fontName.style,
            };
          }
        }

        if (typeof item.fontName === 'symbol') {
          let segments = item.getStyledTextSegments(['fontName'])

          segments.forEach((segment) => {
            item.setRangeFontName(segment.start, segment.end, {
              family: 'Inter',
              style:
                segment.fontName.style === 'Semibold'
                  ? 'Semi Bold'
                  : segment.fontName.style + '',
            });
          });
        }
      }
    });
  }

  //   figma.closePlugin();
};
