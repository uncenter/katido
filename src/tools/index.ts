import ColorConvert from './ColorConvert.vue';
import TextCounter from './TextCounter.vue';
import DataConvert from './DataConvert/index.vue';
import LoremIpsum from './LoremIpsum.vue';

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
