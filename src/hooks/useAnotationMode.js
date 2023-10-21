import { useState } from 'react';

export function useAnotationMode() {
	const [anotation, setAnotation] = useState(false);

	function switchAnotation() {
		setAnotation(!anotation);
	}

	return [anotation, switchAnotation];
}
