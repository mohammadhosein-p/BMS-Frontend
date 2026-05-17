const SendingDots = ({ text = "در حال ارسال", dotColor = "bg-current" }) => {
  return (
    <span className="flex items-center gap-1">
      {text}
      <span className="flex gap-0.5 mt-1">
        <span className={`w-1 h-1 ${dotColor} rounded-full animate-bounce [animation-delay:-0.3s]`} />
        <span className={`w-1 h-1 ${dotColor} rounded-full animate-bounce [animation-delay:-0.15s]`} />
        <span className={`w-1 h-1 ${dotColor} rounded-full animate-bounce`} />
      </span>
    </span>
  );
};

export default SendingDots
