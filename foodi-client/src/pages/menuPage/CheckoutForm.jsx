import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/ThemeContext";
import axios from "axios";

const CheckoutForm = ({ price, cart }) => {
  const [orderData, setorderData] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { isDarkMode } = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setcardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [payment, setpayment] = useState("");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const params = useParams();
  console.log(params);
  const { id } = params;

  console.log(id);

  useEffect(() => {
    // Load Razorpay SDK script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log("inside fetchOrder");
        const { data } = await axiosSecure.get(`/payments/${id}`);
        console.log(data);
        setorderData(data);
        // data = {shippingAddress: {…}, _id: '6491802b42a5af26e4e4b037', orderItems: Array(1), paymentMethod: 'RazorPay', itemsPrice: 240, …}

        // if (data.user !== userInfo._id) {
        //   // Order does not belong to the logged-in user
        //   toast.error("Order not found.");
        //   navigate("/"); // Redirect to a different page or show an error message
        //   return;
        // }
      } catch (err) {
        alert(err);
      }
      // console.log(result);
      // setProducts(result.data);
    };

    fetchOrder();
  }, [navigate]);

  // Function to handle Razorpay payment response
  // const handlePaymentResponse = (response) => {
  //   if (response) {
  //     // Handle successful payment
  //     alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
  //   } else {
  //     // Handle payment failure
  //     alert('Payment failed!');
  //   }
  // };

  // const createOrder = async () => {
  //   // creating a new order
  //   const dataResult = await axios.post("http://localhost:5000/api/create", {
  //     order_id: id,
  //     amount: 5000,
  //     currency: "INR",
  //     payment_capture: "1",
  //   });
  //   return dataResult;
  // };

  // // Function to open Razorpay payment popup
  // const openRazorpayPopup = async() => {
  //   // const res = await axios.post("http://localhost:5000/")
  //   const result = await createOrder();
  //   console.log(`create order res = ${result}`);
  //   const options = {
  //     key: "rzp_test_7CppkCYAcSX7Bx", // Replace 'YOUR_KEY_ID' with your Razorpay Key ID
  //     amount: '5000', // Amount is in currency subunits. Default currency is INR (50000 paise = INR 500)
  //     currency: 'INR',
  //     name: 'Apna Canteen', // Your business name
  //     description: 'Test Transaction',
  //     order_id: id, // Sample Order ID (replace with actual Order ID)
  //     handler: handlePaymentResponse,
  //     prefill: {
  //       name: 'Manjeet Kumar',
  //       email: 'manjeet826510@gmail.com',
  //       contact: '7992346031',
  //     },
  //     notes: {
  //       address: 'Razorpay Corporate Office',
  //     },
  //     theme: {
  //       color: '#3399cc',
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  const handlePaymentResponse = (response) => {
    if (response) {
      // Handle successful payment
      const paymentid = response.razorpay_payment_id;
      // setpayment(paymentid)
      alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
      setPaymentStatus("success");
      navigate("/order");
    } else {
      // Handle payment failure
      alert("Payment failed!");
    }
  };

  const createOrder = async () => {
    console.log(`id = ${id}`);
    // creating a new order
    const dataResult = await axios.post("http://localhost:5000/api/create", {
      order_id: `${id}`,
      amount: orderData.price,
      currency: "INR",
      payment_capture: "1",
    });
    // console.log("holahola");
    // console.log(dataResult);
    return dataResult;
  };

  // Function to open Razorpay payment popup
  const openRazorpayPopup = async () => {
    // const res = await axios.post("http://localhost:5000/")
    const result = await createOrder();
    console.log("inside checkouyt");
    console.log(result);
    const options = {
      key: "rzp_test_jCfEB86LonUUue", // Replace 'YOUR_KEY_ID' with your Razorpay Key ID
      amount: result.data.data.amount * 100, // Amount is in currency subunits. Default currency is INR (50000 paise = INR 500)
      currency: result.data.data.currency,

      name: "Foodi", // Your business name
      description: "Test Transaction",
      order_id: result.data.data.id, // Sample Order ID (replace with actual Order ID)
      handler: handlePaymentResponse,
      prefill: {
        // name: 'Saurabh Kumar',
        email: orderData.email,
        // contact: '7992342792',
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // handleSubmit btn click
  // const handleSubmit = async (event) => {
  // Block native form submission.
  // event.preventDefault();

  // if (!stripe || !elements) {
  //   // Stripe.js has not loaded yet. Make sure to disable
  //   return;
  // }

  // const card = elements.getElement(CardElement);

  // if (card == null) {
  //   return;
  // }

  // // console.log('card: ', card)
  // const {error, paymentMethod} = await stripe.createPaymentMethod({
  //   type: 'card',
  //   card,
  // });

  // if (error) {
  //   console.log('[error]', error);
  //   setcardError(error.message);
  // } else {
  //   // setcardError('Success!');
  //   // console.log('[PaymentMethod]', paymentMethod);
  // }

  // const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
  //   clientSecret,
  //   {
  //     payment_method: {
  //       card: card,
  //       billing_details: {
  //         name: user?.displayName || 'anonymous',
  //         email: user?.email || 'unknown'
  //       },
  //     },
  //   },
  // );

  // if(confirmError){
  //   console.log(confirmError)
  // }

  // console.log('paymentIntent', paymentIntent)

  // if(paymentIntent.status ==="succeeded") {
  //   const transitionId =paymentIntent.id;
  //   setcardError(`Your transitionId is: ${transitionId}`)

  //   // save payment info to server
  //   const paymentInfo ={email: user.email, transitionId: paymentIntent.id, price, quantity: cart.length,
  //     status: "order pending", itemsName: cart.map(item => item.name), cartItems: cart.map(item => item._id), menuItems: cart.map(item => item.menuItemId)}

  //   // send payment info
  //   axiosSecure.post('/payments', paymentInfo)
  //   .then( res => {
  //     console.log(res.data)
  //     if(res.data){
  //       alert('Payment info sent successfully!')
  //       navigate('/order')
  //     }
  //   })
  // }

  // };
  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8">
      <div className="md:w-1/2 space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: Rs{orderData.price}</p>
      </div>
      <div
        className={`md:w-1/3 w-full border space-y-5  card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 ${
          isDarkMode ? "dark" : ""
        }`}
      >
        {/* <h4 className="text-lg font-semibold">Process your Payment!</h4> */}

        {/* <form >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        </form> */}
        {cardError ? (
          <p className="text-red text-xs italic">{cardError}</p>
        ) : (
          ""
        )}
        {paymentStatus === "success" && (
          <p className="text-green-500 text-xs italic">Payment was successful!</p>
        )}
        {paymentStatus === "failed" && (
          <p className="text-red-500 text-xs italic">Payment failed. Please try again.</p>
        )}
        <div className="mt-5 text-center">
          <hr />
          <button
            onClick={openRazorpayPopup}
            className="btn  btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with Razorpay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
