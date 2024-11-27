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
}

const Form: React.FC<FormProps> = (props) => {
  const { setEstimatedRide } = props;
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const submitForm: SubmitHandler<FormData> = async (data) => {
    const formattedData = {
      ...data,
      customerId: +data.customerId,
    };

    const response = await api.post('/ride/estimate', formattedData);
    const sucessfulResponse = 201;

    if (response.status === sucessfulResponse) {
      setEstimatedRide(response.data);
    }
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
