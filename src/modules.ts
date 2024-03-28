import ColorConvert from './modules/ColorConvert.vue';
import TextCounter from './modules/TextCounter.vue';
import DataConvert from './modules/DataConvert/index.vue';

export default {
	textcounter: {
		title: 'Text Counter',
		component: TextCounter,
	},
	colorconvert: {
		title: 'Color Convert',
		component: ColorConvert,
	},
	dataconvert: {
		title: 'Data Convert',
		component: DataConvert,
	},
} as Record<string, { title: string; component: unknown }>;
