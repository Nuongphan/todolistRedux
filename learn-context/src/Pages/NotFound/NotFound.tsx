import { Images } from "../../assets/images";

type Props = {};

const NotFound = () => {
  return (
    <div>
      <img
        src={Images.getNotFound()}
        alt=""
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default NotFound;
