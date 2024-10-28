type Props = {
  title: string,
  showButtons: boolean
};

export const Header = ({ title, showButtons }: Props) => {
  return <div className="mb-2 flex flex-row justify-between">
    <span>{title}</span>
    {showButtons && (
      <span className="right-0 absolute text-sm">Upload</span>
    )}
  </div>;
};
