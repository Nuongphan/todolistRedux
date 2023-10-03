import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from "../../User.module.css";
import { IOrder } from "../../redux/Type";
const HistoryOrder = () => {
  const [orderList, setOrderList] = useState<any>();
  useEffect(() => {
    axios
      .get("http://localhost:8080/orders")
      .then((res) => setOrderList(res.data));
  }, []);
  useEffect(() => {}, [orderList]);
  const updateOrderStatus = (idOrder: string) => {
    const updatedOrders = orderList.map((order: IOrder) => {
      if (order.id === idOrder) {
        return { ...order, status: "Order Canceled" };
      }
      return order;
    });
    setOrderList(updatedOrders);
  };
  async function handleCancel(idOrder: string) {
    const userConfirmed = window.confirm(
      "Bạn có chắc chắn muốn hủy đơn hàng này?"
    );
    if (userConfirmed) {
      try {
        await axios.patch(`http://localhost:8080/orders/${idOrder}`, {
          status: "Order Canceled",
        });
        // Cập nhật trạng thái đơn hàng trong state
        updateOrderStatus(idOrder);
      } catch (error) {
        console.error("Lỗi khi hủy đơn hàng", error);
      }
    }
  }
  // Hàm kiểm tra xem nút "Cancel" có thể được nhấp hay không
  const canCancel = (idOrder: string) => {
    const order = orderList.find((order: IOrder) => order.id === idOrder);
    return order.status == "Pending";
  };
  return (
    <div className={styles.orderTable}>
      <table className="  w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-5 py-3">
              ID ORDER
            </th>
            <th scope="col" className="px-5 py-3">
              DATE
            </th>
            <th scope="col" className="px-5 py-3">
              TOTAL
            </th>
            <th scope="col" className="px-5 py-3">
              STATUS
            </th>
            <th scope="col" className="px-5 py-3">
              ACTION
            </th>
            <th scope="col" className="px-5 py-3">
              DETAIL{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList?.map((item: any) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td
                scope="row"
                className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.id}
              </td>
              <td className="px-5 py-3">{item?.date}</td>
              <td className="px-5 py-3">
                {Number(item?.totalPrice.toFixed(0)).toLocaleString()}
              </td>
              <td className="px-5 py-3">{item?.status}</td>
              <td className="px-5 py-3">
                <button
                  onClick={() => handleCancel(item?.id)}
                  className={styles.buttonOrderTable}
                  disabled={!canCancel(item.id)}
                >
                  Cancel
                </button>
              </td>
              <td className="px-5 py-3">
                <button className={styles.buttonOrderTable1}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryOrder;
