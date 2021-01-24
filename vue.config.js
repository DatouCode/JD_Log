module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:10001",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}