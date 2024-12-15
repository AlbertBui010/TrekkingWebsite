export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				// Định nghĩa ảnh nền cho header
				'header-bg': "url('/src/assets/img/background-header.png')",
				'introduce-bg': "url('/src/assets/img/background-introduce.jpg')",
				'footer-bg': "url('/src/assets/img/background-footer.png')",
				'about-bg': 'url(/src/assets/img/background-about.png)',
				'save-bg': 'url(/img/bg-2.jpg)',
			},
			colors: {
				'dark-green': 'rgba(0, 61, 56, 255)', // Định nghĩa màu xanh lá cây đậm
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
