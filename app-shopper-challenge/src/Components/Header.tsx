import NavButton from './NavButton';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [currentChoice, setCurrentChoice] = useState<string>('');
  const [pageTitle] = useState<string[]>(['Solicitar viagem', 'Histórico'])
  const navigate = useNavigate();

  useEffect(() => {
    const rideSolicitation = 'Solicitar';
    const ridesHistory = 'Histórico';

    if (!currentChoice.length) {
      navigate('/');
      return;
    };


    if (currentChoice.includes(rideSolicitation)) {
      navigate('/ride-solicitation');
      return;
    }

    if (currentChoice.includes(ridesHistory)) {
      navigate('/history-rides');
      return;
    }
  }, [currentChoice, navigate])

  return (
    <div className="flex-col space-x-2 justify-center my-10 space-y-3">
      { pageTitle.map(( title, index ) => {
        return (
          <NavButton
          key={index}
          currentChoice={currentChoice}
          setCurrentChoice={setCurrentChoice}
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