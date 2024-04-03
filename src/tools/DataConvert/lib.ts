import { parse as parseCsv } from 'csv-parse/sync';
import { stringify as stringifyCsv } from 'csv-stringify/sync';
import { parse as parseIni, stringify as stringifyIni } from 'ini';
import { parse as parseToml, stringify as stringifyToml } from 'smol-toml';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

import iniLang from 'shiki/langs/ini.mjs';
import csvLang from 'shiki/langs/csv.mjs';
import tsvLang from 'shiki/langs/tsv.mjs';
import tomlLang from 'shiki/langs/toml.mjs';
import yamlLang from 'shiki/langs/yaml.mjs';
import jsonLang from 'shiki/langs/json.mjs';

export const langs = [iniLang, csvLang, tsvLang, tomlLang, yamlLang, jsonLang];

export const formats: Record<
	Format,
	{
		name: string;
		parse: (text: string) => unknown;
		stringify: (value: unknown) => string;
		canStringify: (value: unknown) => boolean;
	}
> = {
	ini: {
		name: 'INI',
		parse: (text: string) => parseIni(text),
		stringify: (value: unknown) =>
			stringifyIni(value, { whitespace: true }) as string,
		canStringify: (value: unknown) =>
			typeof value === 'object' &&
			value !== null &&
			!Array.isArray(value),
	},
	csv: {
		name: 'CSV',
		parse: (text: string) =>
			parseCsv(text.trim(), { columns: true, trim: true }),
		stringify: (value: unknown) =>
			stringifyCsv(value as any, { header: true }),
		canStringify: (value: unknown) =>
			Array.isArray(value) &&
			value.every(
				(v) => typeof v === 'object' && v !== null && !Array.isArray(v),
			),
	},
	tsv: {
		name: 'TSV',
		parse: (text: string) =>
			parseCsv(text.trim(), {
				delimiter: '\t',
				columns: true,
				trim: true,
			}),
		stringify: (value: unknown) =>
			stringifyCsv(value as any, { delimiter: '\t', header: true }),
		canStringify: (value: unknown) =>
			Array.isArray(value) &&
			value.every(
				(v) => typeof v === 'object' && v !== null && !Array.isArray(v),
			),
	},
	toml: {
		name: 'TOML',
		parse: (text: string) => parseToml(text),
		stringify: (value: unknown) => stringifyToml(value),
		canStringify: (value: unknown) =>
			typeof value === 'object' &&
			value !== null &&
			!Array.isArray(value),
	},
	yml: {
		name: 'YAML',
		parse: (text: string) => parseYaml(text),
		stringify: (value: unknown) => stringifyYaml(value),
		canStringify: (value: unknown) =>
			typeof value === 'object' && value !== null,
	},
	json: {
		name: 'JSON',
		parse: (text: string) => JSON.parse(text),
		stringify: (value: unknown) => JSON.stringify(value, undefined, 2),
		canStringify: () => true,
	},
};

export type Format = 'ini' | 'csv' | 'tsv' | 'toml' | 'yml' | 'json';
