interface NavButtonProps {
  active: boolean;
  currentChoice: string;
  text: string;
  setRedirect: (value: boolean) => void;
  setCurrentChoice: (value: string) => void;
}

function NavButton({
  text,
  active,
  setRedirect,
  currentChoice,
  setCurrentChoice,
}: NavButtonProps) {

  const updateStateHeader = (titleContent: string) => {
    const cleanChoices = '';

    setRedirect(true);
    if (titleContent === currentChoice) {
      return setCurrentChoice(cleanChoices);
    }
    return setCurrentChoice(titleContent);
  };

  return (
    <button
      onClick={() => updateStateHeader(text)}
      className={`
        px-4
        py-2
        shadow-md
        font-medium
        rounded-full
        hover:bg-blue-400
        ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}
      `}
    >
      {text}
    </button>
  );
}

export default NavButton;