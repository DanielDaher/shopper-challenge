import NavButton from './NavButton';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [currentChoice, setCurrentChoice] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [pageTitle] = useState<string[]>(['Solicitar viagem', 'Histórico'])
  const navigate = useNavigate();

  useEffect(() => {
    if (!redirect) return;

    const rideSolicitation = 'Solicitar';
    const ridesHistory = 'Histórico';

    if (!currentChoice.length) {
      navigate('/');
      return;
    };


    if (currentChoice.includes(rideSolicitation)) {
      setRedirect(false);
      navigate('/ride-solicitation');
      return;
    }

    if (currentChoice.includes(ridesHistory)) {
      setRedirect(false);
      navigate('/history');
      return;
    }
  }, [currentChoice, navigate, redirect])

  return (
    <div className="flex-col space-x-2 justify-center my-10 space-y-3">
      { pageTitle.map(( title, index ) => {
        return (
          <NavButton
          key={index}
          currentChoice={currentChoice}
          setCurrentChoice={setCurrentChoice}
          setRedirect={setRedirect}
          active={currentChoice === title}
          text={title}
          />
        )
      })
      }
    </div>
  );
};

export default Header;