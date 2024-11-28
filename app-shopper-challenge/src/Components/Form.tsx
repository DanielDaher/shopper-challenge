import { z } from 'zod';
import api from '../API';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormStyles from '../TailwindStyles/Form.styles';

const formSchema = z.object({
  customerId: z.string().min(1, 'O ID do usuário é obrigatório'),
  origin: z.string().min(1, 'O endereço de origem é obrigatório'),
  destination: z.string().min(1, 'O endereço de destino é obrigatório'),
});

type FormData = z.infer<typeof formSchema>;

interface FormProps {
  setEstimatedRide: (value: any) => void;
  setIsLoading: (value: boolean) => void;
  setCustomerId: (value: number) => void;
  setOriginAddress: (value: string) => void;
  setDestinationAddress: (value: string) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const { setEstimatedRide, setIsLoading, setCustomerId, setOriginAddress, setDestinationAddress } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const submitForm: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const formattedData = {
      ...data,
      customerId: +data.customerId,
    };

    setCustomerId(+data.customerId);
    setOriginAddress(data.origin);
    setDestinationAddress(data.destination);

    const response = await api.post('/ride/estimate', formattedData);
    const sucessfulResponse = 201;

    if (response.status === sucessfulResponse) {
      setIsLoading(false);
      setEstimatedRide(response.data);
    }
    
    setIsLoading(false);
  };

  return (
    <form 
      onSubmit={handleSubmit(submitForm)} 
      className={FormStyles.formContainer}
    >
      <h1 className={FormStyles.formTitle}>Solicitação de Corrida</h1>
      
      <div className={FormStyles.inputContainer}>
        <label className={FormStyles.label}>Id do cliente:</label>
        <input 
          type="text" 
          {...register('customerId')} 
          className={`${FormStyles.input} ${
            errors.customerId ? FormStyles.inputError : FormStyles.inputDefault
          }`}
        />
        {errors.customerId && <p className={FormStyles.errorText}>{errors.customerId.message}</p>}
      </div>

      <div className={FormStyles.inputContainer}>
        <label className={FormStyles.label}>Origem:</label>
        <input 
          type="text" 
          {...register('origin')} 
          className={`${FormStyles.input} ${
            errors.origin ? FormStyles.inputError : FormStyles.inputDefault
          }`}
        />
        {errors.origin && <p className={FormStyles.errorText}>{errors.origin.message}</p>}
      </div>

      <div className={FormStyles.inputContainer}>
        <label className={FormStyles.label}>Destino:</label>
        <input 
          type="text" 
          {...register('destination')} 
          className={`${FormStyles.input} ${
            errors.destination ? FormStyles.inputError : FormStyles.inputDefault
          }`}
        />
        {errors.destination && <p className={FormStyles.errorText}>{errors.destination.message}</p>}
      </div>

      <button 
        type="submit" 
        className={FormStyles.submitButton}
      >
        Enviar
      </button>
    </form>
  );
};

export default Form;
