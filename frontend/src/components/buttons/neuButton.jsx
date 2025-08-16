const NeuButton = ({text}) => {
  return (
      <button className="px-4 py-1 mt-1 font-medium rounded-sm bg-gray-200 text-black dark:bg-gray-500 dark:text-gray-100 w-fit transition-all shadow-[3px_-3px_0px_black] dark:shadow-[3px_-3px_0px_white] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[-3px]">
        {text}
      </button>
  );
};

export default NeuButton;