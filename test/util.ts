const original = new Map();

export function mock<T extends object, K extends keyof T>(context: T, key: K, implementation: T[K]): void {
	if (!original.has(context))
		original.set(context, {});
	const orig = original.get(context);
	if (!orig[key])
		orig[key] = context[key];
	context[key] = implementation;
}

export function unmock<T extends object, K extends keyof T>(context: T, key: K): void {
	const orig = original.get(context);
	if (!orig || !orig[key])
		return;
	context[key] = orig[key];
}
