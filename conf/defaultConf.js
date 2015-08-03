var fis = require('fis3');

// 模板产出后放到 /WEB-INF/views 目录下
fis.match('{page,layout,widget}/**/*.{html,jsp,vm,ftl}', {
  isMod : true, 
  release: '/WEB-INF/views/$0',
  url: '/WEB-INF/views/$0',
  id: '$0'
});

// 静态资源产出
fis.match('{page,layout,widget}/**/*.{js,css,less}', {
  isMod : true, 
  release: '/static/$0',
  url: '/static/$0',
  id: '$0'
});

fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});

fis.match('::package', {
  spriter: fis.plugin('csssprites')
});

//fis3-hook-module
fis.hook('module', {
  mode: 'commonjs' 
});

// widget源码目录下的资源被标注为组件
fis.match('/widget/**/*', {
    isMod: true
});

// widget下的 js 调用 jswrapper 进行自动化组件化封装
fis.match('/widget/**/*.js', {
    postprocessor: fis.plugin('jswrapper', {
        type: 'commonjs'
    })
});

// 生产环境
fis.media('prod')
  .match('**.js', {
      optimizer: fis.plugin('uglify-js')
  })
  .match('**.css', {
      optimizer: fis.plugin('clean-css')
  })
  .match('*.png', {
    optimizer: fis.plugin('png-compressor')
  });


module.exports = fis;

