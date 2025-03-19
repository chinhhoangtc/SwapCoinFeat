import { useState } from "react";
import Select from "react-select";
import { dataPrice } from "../../_mock/data";
// import a from "../../assets/tokens/";
export function Home() {
  const [isPrice, setIsPrice] = useState(0);
  const [isPriceSwap, setIsPriceSwap] = useState(0);
  const [isCurrent, setIsCurrent] = useState("BLUR");
  const [isCurrentSwap, setIsCurrentSwap] = useState("BLUR");

  const options = dataPrice.map((item) => ({
    value: item.currency,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={`/tokens/${item.currency}.svg`}
          alt={item.currency}
          className="w-6 h-6"
        />

        {item.currency}
      </div>
    ),
  }));

  const selectedCurrency = dataPrice.find(
    (item) => item.currency === isCurrent
  );
  const selectedCurrency2 = dataPrice.find(
    (item) => item.currency === isCurrentSwap
  );

  const price1 = selectedCurrency?.price;
  const price2 = selectedCurrency2?.price;

  const handleSwaps = () => {
    if (price1 && price2) {
      setIsPriceSwap((isPrice * price1) / price2);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex gap-4 items-end ">
          <div className="flex flex-col ">
            <Select
              options={options}
              value={options.find((opt) => opt.value === isCurrent)}
              onChange={(e) => setIsCurrent(e.value)}
              className="mb-4"
            />
            <input
              type="number"
              className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Nhập số tiền"
              value={isPrice}
              onChange={(e) => setIsPrice(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col">
            <Select
              options={options}
              value={options.find((opt) => opt.value === isCurrentSwap)}
              onChange={(e) => setIsCurrentSwap(e.value)}
              className="mb-4"
            />
            <input
              type="number"
              className="border p-2 rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
              disabled
              value={isPriceSwap}
            />
          </div>

          <button
            onClick={handleSwaps}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Hoán Đổi
          </button>
        </div>
      </div>
    </div>
  );
}
