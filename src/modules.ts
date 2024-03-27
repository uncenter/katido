import ColorConvert from './modules/ColorConvert.vue';
import TextCounter from './modules/TextCounter.vue';

export default {
	textcounter: {
		title: 'Text Counter',
		component: TextCounter,
	},
	colorconvert: {
		title: 'Color Convert',
		component: ColorConvert,
	},
} as Record<string, { title: string; component: unknown }>;
