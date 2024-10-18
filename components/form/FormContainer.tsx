'use client';

import React, { useEffect } from 'react';
import { actionFunction } from '@/utils/types';
import { useFormState } from 'react-dom';
import { useToast } from '@/hooks/use-toast';

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
};

const initialState = {
  message: '',
};

function FormContainer({ action, children }: FormContainerProps) {
  const [state, formAction] = useFormState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state && state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return <form action={formAction}>{children}</form>;
}

export default FormContainer;
