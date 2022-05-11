figma.showUI(__html__);
figma.ui.resize(400, 300);

Promise.all([
  figma.loadFontAsync({ family: 'Inter', style: 'Light' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),

  figma.loadFontAsync({ family: 'Segoe UI', style: 'Light' }),
  figma.loadFontAsync({ family: 'Segoe UI', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Segoe UI', style: 'Semibold' }),
  figma.loadFontAsync({ family: 'Segoe UI', style: 'Bold' }),

  // figma.loadFontAsync({ family: 'Sego', style: 'Bold' }),
  // figma.loadFontAsync({ family: 'Sego PP', style: 'Bold' }),
])
  .then((res) => {
    console.log('res', res);
    figma.ui.postMessage({
      name: 'fonts-loaded',
      body: 'Все нужные шрифты установлены, можно запускать',
    });
  })
  .catch((err) => {
    console.log('err', err);
    figma.ui.postMessage({
      name: 'font load error',
      body: `Не хватает ${[...err.split('"')][1]}`,
    });
  });

let m = 0;

let nodes = [];

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create') {
    figma.ui.postMessage(`work-started`);
  }

  if (msg.type === 'search-text-nodes') {
    console.log('search-text-nodes');
    let searchResult = figma.currentPage.findAll((n) => n.type === 'TEXT');
    nodes = [...searchResult];
    figma.ui.postMessage(`search-finished`);
  }
  if (msg.type === 'replace-text-nodes') {
    nodes.forEach((item, idx) => {
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
          let segments = item.getStyledTextSegments(['fontName']);
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
    let thisRoundNodes = nodes.length;
    figma.ui.postMessage({
      name: 'replace-finished',
      body: `Заменили ${thisRoundNodes} текстовых слоя(-ев)<br/>на странице ${figma.currentPage.name}`,
    });
    nodes = [];
  }
};

// const p1 = new Promise((resolve, reject) => {
//   figma.ui.postMessage(`work-started`);
//   console.log('p1');
//   resolve('ok');
// });

// const p2 = new Promise((resolve, reject) => {
//   console.log('p2 start');
//   let s2 = figma.currentPage.findAll((n) => n.type === 'TEXT');
//   s2.forEach((item, idx) => {
//     m = m + idx;
//   });
//   resolve(s2);
//   console.log('p2 end');
// });

// Promise.all([p1, p2]).then((values) => {
//   console.log(values);
//   figma.ui.postMessage({
//     name: 'work-finished',
//     body: `Заменили ${values[1].length} текстовых слоя(-ев) на странице ${figma.currentPage.name}`,
//   });
// });

// console.log(`LAYERS TOTAL: ${s2.length}`);
// figma.ui.postMessage(`layers-found:${s2.length}`);

// s2.forEach(async (item, idx) => {

//   if (item.type === 'TEXT') {

//     if (typeof item.fontName === 'object') {
//       if (item.fontName.family === 'Segoe UI') {
//         item.fontName = {
//           family: 'Inter',
//           style:
//             item.fontName.style === 'Semibold'
//               ? 'Semi Bold'
//               : item.fontName.style,
//         };
//       }
//     }

//     if (typeof item.fontName === 'symbol') {
//       let segments = item.getStyledTextSegments(['fontName'])

//       segments.forEach((segment) => {
//         item.setRangeFontName(segment.start, segment.end, {
//           family: 'Inter',
//           style:
//             segment.fontName.style === 'Semibold'
//               ? 'Semi Bold'
//               : segment.fontName.style + '',
//         });
//       });
//     }

//     idx === s2.length && console.log('==== READY ====')
//   }
// });

//   figma.closePlugin();
