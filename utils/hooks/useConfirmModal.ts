"use client"

import { useState } from 'react';

interface UseConfirmModalReturn {
  isOpen: boolean;
  message: string;
  confirmAction: () => void;
  cancelAction: () => void;
  openModal: (message: string, onConfirm: () => void) => void;
}

export const useConfirmModal = (): UseConfirmModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

  const openModal = (msg: string, confirmAction: () => void) => {
    setMessage(msg);
    setOnConfirm(() => confirmAction);
    setIsOpen(true);
  };

  const confirmAction = () => {
    onConfirm();
    setIsOpen(false);
  };

  const cancelAction = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    message,
    confirmAction,
    cancelAction,
    openModal,
  };
};
