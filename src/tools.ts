import ColorConvert from './tools/ColorConvert.vue';
import TextCounter from './tools/TextCounter.vue';
import DataConvert from './tools/DataConvert/index.vue';
import LoremIpsum from './tools/LoremIpsum.vue';

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
	loremipsum: {
		title: 'Lorem Ipsum Generator',
		component: LoremIpsum,
	},
} as Record<string, { title: string; component: unknown }>;
