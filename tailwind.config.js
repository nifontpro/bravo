/* @type {import('tailwindcss').Config} */

// const { default: plugin } = require("tailwindcss");
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

const primary = '#22EAEF'

module.exports = {
	content: [
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		screens: {
			'my': '900px'
		},
		colors: {
			primary,
			black: colors.black,
			white: colors.white,
			transparent: colors.transparent,
			green: '#43EFAD',
			blue: '#22EAEF',
			yellow: '#ECEF81',
			brown: '#D6BE47',
			red: '#F2977E',

			gray: {
				100: '#F0F0F0',
				200: '#E5E5E5',
				300: '#d9dae8',
				500: '#999AA5',
				600: '#66676E',
				700: '#39393F',
				800: '#242529',
				900: '#191B1F',
				950: '#101215',
			},
		},

		extend: {
			spacing: {
				0.5: '0.12rem',
				layout: '2.75rem',
			},
			fontSize: {
				'2lg': '1.38rem',
			},
			borderRadius: {
				image: '0.5rem',
				layout: '0.8rem',
			},

			transitionTimingFunction: {
				DEFAULT: 'ease-in-out',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
			keyframes: {
				fade: {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
				scaleIn: {
					'0%': {
						opacity: 0,
						transform: 'scale(0.9)',
					},
					'50%': {
						opacity: 0.3,
					},
					'100%': {
						opacity: 1,
						transform: 'scale(1)',
					},
				},
				fadeIn: {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
			},
			animation: {
				fade: 'fadeIn .5s ease-in-out',
				scaleIn: 'scaleIn .35s ease-in-out',
			},
			zIndex: {
				1: '1',
				2: '2',
				3: '3',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		plugin(({addComponents, theme, addUtilities}) => {
			addComponents({
				'.btn-primary': {
					// backgroundColor: theme('colors.orange.500'),
					backgroundColor: primary,
					color: '#000000',
					borderRadius: '0.65rem',
					transition: 'background-color .3s ease-in-out',
					// padding: '10px 0',
					// display: 'block',
					// width: '100%',
					// fontSize: 18,
					// fontWeight: 'bold',
					'&:hover': {
						backgroundColor: '#12DADF',
					},
				},
				'.text-link': {
					textUnderlineOffset: 4,
					color: 'rgba(255, 255, 255, .9)',
					transition: 'text-decoration-color .3s ease-in-out',
					textDecorationLine: 'underline',
					textDecorationColor: 'rgba(255, 255, 255, .2)',
					'&:hover': {
						textDecorationColor: 'rgba(255, 255, 255, .2)',
					},
				},
				'.air-block': {
					borderRadius: theme('borderRadius.layout'),
					backgroundColor: theme('colors.gray.950'),
					color: theme('colors.white'),
					boxShadow: theme('boxShadow.lg'),
				},
			})
			addUtilities({
				'.text-shadow': {
					textShadow: '1px 1px rgba(0, 0, 0, 0.4)',
				},

				'.outline-border-none': {
					outline: 'none',
					border: 'none',
				},

				'.flex-center-between': {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				},

				'.image-like-bg': {
					objectPosition: 'center',
					objectFit: 'cover',
					pointerEvents: 'none',
				},
			})
		}),
	],
}
