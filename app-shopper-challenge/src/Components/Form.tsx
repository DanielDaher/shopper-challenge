import { z } from 'zod';
import api from '../API';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(submitForm)} style={{ maxWidth: 400, margin: '0 auto' }}>
      <div>
        <label>Id do cliente:</label>
        <input type="text" {...register('customerId')} />
        {errors.customerId && <p style={{ color: 'red' }}>{errors.customerId.message}</p>}
      </div>

      <div>
        <label>origin:</label>
        <input type="text" {...register('origin')} />
        {errors.origin && <p style={{ color: 'red' }}>{errors.origin.message}</p>}
      </div>

      <div>
        <label>destination:</label>
        <input type="text" {...register('destination')} />
        {errors.destination && <p style={{ color: 'red' }}>{errors.destination.message}</p>}
      </div>

      <button type="submit" style={{ marginTop: 20 }}>
        Enviar
      </button>
    </form>
  );
};

export default Form;
