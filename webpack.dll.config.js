const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
	mode: 'none',
	entry: ['react', 'react-dom'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].dll.js',
		library: '_dll_[name]',
	},
	modules: {
		rules: [
			new DllPlugin({
				name: '_dll_[name]',
				path: path.resolve(__dirname, 'dist', '[name].manifest.json'),// 生成.json的描述文件
			})
		]
	}
}