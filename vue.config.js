module.exports={
    configureWebpack:{
        resolve:{
			alias:{
				'assets':'@/assets',
				'common':'@/common',
				'components':'@/components',
				'network':'@/network',
				'views':'@/views',
			}
		}
    },
	devServer: {
	      port: 8090, // 端口号
	      host: 'localhost',
	      https: false, // https:{type:Boolean}
	      open: true, //配置自动启动浏览器
	       proxy: {
	               '/api': {
	                    target: 'http://127.0.0.1:9527/Project_1_war_exploded',
	                    changeOrigin: true,
	                    pathRewrite: {
	                      '^/api': '/' 
	                    }
	                  }
	          },
	  },
	
}