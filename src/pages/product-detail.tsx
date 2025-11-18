import { useParams } from "react-router";

const ProductDetail = () => {
  const {id} = useParams<{id: string}>();
  return <div>ProductDetail : {id}</div>;
};

export default ProductDetail;
