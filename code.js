figma.showUI(__html__);

Promise.all([
  figma.loadFontAsync({ family: 'Inter', style: 'Light' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Bold' }),
  //   figma.loadFontAsync({ family: '12313', style: 'Bold' }),
]).catch((err) => console.log(err));

figma.ui.onmessage = (msg) => {
  if (msg.type === 'create-rectangles') {
    let s2 = figma.currentPage.findAll((n) => n.type === 'TEXT');

    // console.log(s2);
    // console.log(s2.length);

    s2.forEach((item) => {
      //   console.log(typeof item.fontName);
      // console.log(item.fontName.style);
      if (item.type === 'TEXT') {
        // if (typeof item.fontName === 'object') {
        //   if (item.fontName.family === 'Segoe UI') {
        //     item.fontName = {
        //       family: 'Inter',
        //       style:
        //         item.fontName.style === 'Semibold'
        //           ? 'Semi Bold'
        //           : item.fontName.style,
        //     };
        //   }
        // }

        if (typeof item.fontName === 'symbol') {
          console.log(
            'before',
            typeof item.getStyledTextSegments(['fontName'])
          );
          //   console.log('before', item);

          item.getStyledTextSegments(['fontName']).forEach((segment) => {
            segment.setRangeFontName(segment.start, segment.end, {
              family: 'Inter',
              style:
                segment.fontName.style === 'Semibold'
                  ? 'Semi Bold'
                  : segment.fontName.style,
            });

            // item.fontName = {
            //   family: 'Inter',
            //   style:
            //     item.fontName.style === 'Semibold'
            //       ? 'Semi Bold'
            //       : item.fontName.style,
            // };
          });

          console.log(item.getStyledTextSegments(['fontName']));
        }
      }
    });
  }

  //   figma.closePlugin();
};
