import { useState } from 'react';

export function useModals() {
	const [isOpen, setIsOpen] = useState(false);

	function onClose() {
		setIsOpen(false);
	}
	function onOpen() {
		setIsOpen(true);
	}

	return [isOpen, onOpen, onClose];
}
