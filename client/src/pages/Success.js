import React, { useEffect } from 'react';
import { idbPromise } from "../utils/helpers";
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron/index.js';
import { ADD_ORDER } from '../utils/mutations';

async function Success() {

    const [addOrder] = useMutation(ADD_ORDER);

useEffect(() => {
  async function saveOrder() {
    if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
      
        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }
  }

  saveOrder();
}, [addOrder]);

const cart = await idbPromise('cart', 'get');
const products = cart.map(item => item._id);

    return (
      <div>
        <Jumbotron>
          <h1>Success!</h1>
          <h2>
            Thank you for your purchase!
          </h2>
          <h2>
            You will now be redirected to the homepage
          </h2>
        </Jumbotron>
      </div>
    );
  };

  export default Success;