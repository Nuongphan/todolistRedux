import { useEffect, useState } from "react";
import { IOrder } from "../../redux/Type";
import axios from "axios";

const OrderList = () => {
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const handleGetDataa = () => {
    axios
      .get("http://localhost:8080/orders")
      .then((response) => setOrderList(response.data));
  };
  async function handleChangeStatus(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    const changeStatus = e.target.value;
    const updateOrderList = orderList.map((order: any) =>
      order.id === id ? { ...order, status: changeStatus } : order
    );
    setOrderList(updateOrderList);
    await axios.patch(`http://localhost:8080/orders/${id}`, {
      status: changeStatus,
    });
    alert("Order updated successfully");
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  useEffect(() => {
    const searchResult = orderList.filter((item) => {
      return (
        item.date.includes(searchInput) || item.status.includes(searchInput)
      );
    });
    if (searchInput.length === 0) {
      handleGetDataa();
    } else {
      setOrderList(searchResult);
    }
  }, [searchInput]);
  function handleDetail(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="pb-4 bg-white dark:bg-gray-900 search ">
        <label htmlFor="table-search" className="sr-only ">
          Search
        </label>
        <div className="relative mt-1 ml-30px">
          <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={handleChange}
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg tableUser">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-2">
                #
              </th>
              <th scope="col" className="px-3 py-3">
                Order Id
              </th>
              <th scope="col" className="px-2 py-3">
                User Id
              </th>
              <th scope="col" className="px-3 py-3">
                Date
              </th>
              <th scope="col" className="px-3 py-3">
                Total
              </th>
              <th scope="col" className="px-3 py-3">
                Status
              </th>
              <th scope="col" className="px-3 py-3">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order, index) => (
              <tr
                key={order?.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-3 py-4">{order.id}</td>
                <td className="px-2 py-4">{order.idUser}</td>
                <td className="px-3 py-4">{order.date}</td>
                <td className="px-3 py-4">
                  {Number(order.totalPrice.toFixed(0)).toLocaleString()} VND
                </td>
                <td className="px-3 py-4">
                  <select
                    style={{
                      height: "26px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      padding: "0 0 0 13px",
                      fontSize: "13px",
                    }}
                    onChange={(e) => handleChangeStatus(e, order?.id)}
                    name="type"
                    id="type"
                    required
                    disabled={order.status === "Order Canceled"}
                  >
                    <option value="">{order.status}</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Successfully Delivered">
                      Successfully Delivered
                    </option>
                    <option value="Order Canceled">Order Canceled</option>
                  </select>
                </td>
                <td className="px-3 py-4">
                  <button onClick={() => handleDetail()}>Deatil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
