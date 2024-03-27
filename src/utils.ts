export function pluralize(word: string, count: number) {
	return count === 1 ? word : word + 's';
}
