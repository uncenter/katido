import ColorConvert from './tools/ColorConvert.vue';
import TextCounter from './tools/TextCounter.vue';
import DataConvert from './tools/DataConvert/index.vue';
import LoremIpsum from './tools/LoremIpsum.vue';

export default [
	{
		title: 'Text Counter',
		id: 'textcounter',
		component: TextCounter,
	},
	{
		title: 'Color Convert',
		id: 'colorconvert',
		component: ColorConvert,
	},
	{
		title: 'Data Convert',
		id: 'dataconvert',
		component: DataConvert,
	},
	{
		title: 'Lorem Ipsum Generator',
		id: 'loremipsum',
		component: LoremIpsum,
	},
] as Array<{ title: string; id: string; component: unknown }>;
