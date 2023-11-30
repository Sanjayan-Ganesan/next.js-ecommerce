"use client";
import React, { useState, useEffect } from "react";
import Modal from "./modal";
import CartModal from "./cartmodal";
import CheckoutModal from "./checkoutmodal";
import { MdDelete } from "react-icons/md";

function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalCartOpen, setModalCartOpen] = useState(false);
  const [selectedProductCart, setSelectedProductCart] = useState(null);
  const [records, setRecords] = useState([]);
  const [sortingOption, setSortingOption] = useState("Recommended");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [productCounters, setProductCounters] = useState({});
  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");


  useEffect(() => {
    const apiUrl =
      selectedCategory === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${encodeURIComponent(
            selectedCategory
          )}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleCardHolderNameChange = (event) => {
    setCardHolderName(event.target.value);
  };

  const isPaymentFormValid = () => {
    return (
      cardNumber.trim() !== "" &&
      expiryDate.trim() !== "" &&
      cvv.trim() !== "" &&
      cardHolderName.trim() !== ""
    );
  };


  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const IncreaseCounter = (ProductId) => {
    setProductCounters((prevCounters) => {
      return {
        ...prevCounters,
        [ProductId]: (prevCounters[ProductId] || 0) + 1,
      };
    });
  };

  const DecreaseCounter = (ProductId) => {
    setProductCounters((prevCounters) => {
      const currentCounter = prevCounters[ProductId] || 0;
      return {
        ...prevCounters,
        [ProductId]: currentCounter > 1 ? currentCounter - 1 : 1,
      };
    });
  };

  const handelOpenModalProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handelOpenModalCart = (product) => {
    // Check if the product already exists in the cart
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, product]);
      setProductCounters((prevCounters) => ({
        ...prevCounters,
        [product.id]: prevCounters[product.id] || 1,
      }));
    }

    setSelectedProductCart(product);
    setModalCartOpen(true);
  };

  const handelCloseModal = () => {
    setPaymentMethodModal(false);
    setModalCartOpen(false);
    setModalOpen(false);
  };

  const closeModal = () => {
    setPaymentMethodModal(false);
    setModalOpen(false);
    setModalCartOpen(false);
  };

  const handelCloseModalPayment = () => {
    setPaymentMethodModal(false);
    setModalOpen(false);
    setModalCartOpen(false);
  };
  const handleDeleteitem = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      return updatedCart;
    });
  };

  const handlePaymentOrder = () => {
    setIsPaid(true);
  };

  const getSortedRecords = () => {
    switch (sortingOption) {
      case "HighPrice":
        return [...records].sort((a, b) => b.price - a.price);
      case "LowPrice":
        return [...records].sort((a, b) => a.price - b.price);
      default:
        return records;
    }
  };

  const handletoproceed = () => {
    setPaymentMethodModal(true);
  };

  const calculateTotal = () => {
    const totalPrice = cart.reduce(
      (accumulator, item) =>
        accumulator + item.price * (productCounters[item.id] || 1),
      0
    );
    return totalPrice;
  };

  return (
    <div className="w-full bg-white">
      <div className="flex justify-center mb-5">
        <div className="w-3/5 h-10 flex justify-between items-center">
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("men's clothing")}
          >
            Men's
          </button>
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("women's clothing")}
          >
            Women's
          </button>
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("electronics")}
          >
            Electronics
          </button>
          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("jewelery")}
          >
            Jewelry
          </button>

          <button
            className="w-28 p-2 bg-black rounded-full border-2 text-white border-black"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
        </div>
      </div>
      <div className="w-full mt-10">
        <select
          name="sorting"
          id="sorting"
          className="border-2 border-black"
          value={sortingOption}
          onChange={handleSortingChange}
        >
          <option value="Recommended">Sort by Recommendation</option>
          <option value="HighPrice">Sort From High to Low (Price)</option>
          <option value="LowPrice">Sort From Low to High (Price)</option>
        </select>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 mt-11">
        {getSortedRecords().map((item, index) => (
          <div
            onClick={() => handelOpenModalProduct(item)}
            key={index}
            className="w-full cursor-pointer h-full p-4 border border-gray-300 rounded-md shadow-md flex flex-col justify-center items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-4/5 h-32 object-cover mb-4"
            />
            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
            <p className="text-gray-700 mb-2">${item.price}</p>
            <button
              onClick={() => handelOpenModalCart(item)}
              className="bg-gradient-to-r from-white via-pink-500 to-red-500 p-2 rounded-md mb-2 shadow-black"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {modalOpen && selectedProduct && (
        <Modal onClose={closeModal}>
          {/* Content for the modal */}
          <div className="w-full h-full">
            <div className="flex h-full justify-between gap-10">
              <div className="flex h-full items-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-72 object-cover mb-4"
                />
              </div>
              <div className="me-10 w-2/4 h-full items-center justify-center flex flex-col">
                <h1 className="text-4xl text-center font-bold line-clamp-1 mb-4">
                  {selectedProduct.title}
                </h1>
                <p className="text-center mb-4">
                  {selectedProduct.description}
                </p>
                <p className="text-center mb-4">
                  Rating: {selectedProduct.rating.rate}
                </p>
                <button
                  onClick={() => handelOpenModalCart(selectedProduct)}
                  className="w-full text-white font-semibold bg-gradient-to-r from-white via-pink-500 to-red-500 p-2 rounded-md mb-2 shadow-black"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modalCartOpen && selectedProductCart && (
        <CartModal onClose={handelCloseModal}>
          {/* Content for the modal */}
          <div className="flex flex-col justify-center h-full w-full">
            <div className="w-full h-11/12">
              <div className="flex h-full justify-between flex-col">
                {cart.length > 0 ? (
                  cart.map((item, index) => {
                    const productCounter = productCounters[item.id] || 1;

                    return (
                      <div key={index} className="mb-4">
                        <div className="w-full h-24 flex bg-white rounded-lg shadow-2xl justify-between items-center px-8">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full object-cover"
                          />
                          <p className="w-60 text-xl text-center font-bold line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-xl text-center font-bold line-clamp-1">
                            ${item.price * productCounter}
                          </p>
                          <div className="w-20 flex justify-center gap-4 border-2 border-black rounded-xl">
                            <button onClick={() => IncreaseCounter(item.id)}>
                              +
                            </button>
                            <span>{productCounter}</span>
                            <button onClick={() => DecreaseCounter(item.id)}>
                              -
                            </button>
                          </div>
                          <MdDelete
                            size={30}
                            className="cursor-pointer"
                            onClick={() => handleDeleteitem(item.id)}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <div className="w-full flex justify-center items-center flex-col">
                      <h2 className="text-4xl text-center font-bold mb-4">
                        The Cart is Empty!!!
                      </h2>
                      <img
                        className="w-50"
                        src="https://static-00.iconduck.com/assets.00/empty-cart-illustration-512x428-mcol2auz.png"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-center">
                <div
                  onClick={() => handletoproceed()}
                  className="w-2/4 h-12 rounded-lg bg-gradient-to-r from-white via-pink-500 to-red-500 flex justify-center items-center"
                >
                  <button className="text-xl text-center font-bold text-white">
                    Proceed to Check Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CartModal>
      )}

      {paymentMethodModal && (
        <CheckoutModal onClose={handelCloseModalPayment}>
          <div className="flex flex-col justify-center h-full w-full">
            <div className="w-full h-11/12 flex justify-center items-center">
              {isPaid ? (
                <div className="w-11/12">
                  <div className="flex justify-center items-center flex-col">
                    <p className="text-4xl text-center font-bold text-black">
                      Thank You For Visiting Dil Foods
                    </p>
                    <img
                      className="w-1/4"
                      src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png"
                    />
                  </div>
                </div>
              ) : (
                <form className="w-2/4 bg-gradient-to-r from-white via-pink-500 to-red-500 px-8">
                  {/* ... (previous code) */}
                  <p className="text-xl text-center font-bold text-white mb-8">
                    Payment Details
                  </p>

                  <div className="flex justify-center items-center gap-5 mb-10">
                    <input
                      className="w-full h-12 rounded-md text-md pl-2"
                      type="text"
                      required={true}
                      placeholder="Enter Card Number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>

                  <div className="flex justify-center items-center gap-5 mb-10">
                    <input
                      className="w-1/2 h-12 rounded-md text-md pl-2"
                      type="text"
                      required={true}
                      placeholder="Enter Expiry Date"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                    <input
                      className="w-1/2 h-12 rounded-md text-md pl-2"
                      type="text"
                      required={true}
                      placeholder="Enter Cvv"
                      value={cvv}
                      onChange={handleCvvChange}
                    />
                  </div>

                  <div className="flex justify-center items-center gap-5 mb-10">
                    <input
                      className="w-full h-12 rounded-md text-md pl-2"
                      type="text"
                      required={true}
                      placeholder="Enter Cardholder's Name"
                      value={cardHolderName}
                      onChange={handleCardHolderNameChange}
                    />
                  </div>

                  <div className="text-md text-center font-bold text-white">
                    <p className="mb-2">Total: ${calculateTotal()}</p>
                  </div>

                  <div className="flex w-full justify-center items-center">
                    <button
                      onClick={handlePaymentOrder}
                      className={`${
                        isPaymentFormValid() ? "bg-black" : "bg-gray-500"
                      } text-center p-2 mb-4 text-white rounded-md`}
                      disabled={!isPaymentFormValid()}
                    >
                      Place your Order
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </CheckoutModal>
      )}
    </div>
  );
}

export default Main;
