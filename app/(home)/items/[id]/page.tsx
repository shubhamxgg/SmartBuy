interface ItemPageProps {
  param: {
    id: number;
  };
}

const ItemPage = ({ param: { id } }: ItemPageProps) => {
  return <div>{id}</div>;
};

export default ItemPage;
