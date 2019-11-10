const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //按需加载，需要再每个页面里面都引入“antd/dist/antd.css”
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true  //这里一定要写true，css和less都不行哦
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { "@primary-color": "#aaa" }         // 全局主色
    })
)