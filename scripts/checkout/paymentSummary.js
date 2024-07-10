import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";

export function renderPaymentSummary() {
    let productsPrice = 0;
    let shippingPrice = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productsPrice += product.priceCents * cartItem.quantity;
        const deliveryOptionPrice = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingPrice += deliveryOptionPrice.priceCents;

    });
    const totalBeforeTax = productsPrice + shippingPrice;
    const totalAfterTax = Math.round(totalBeforeTax * 0.1);
    const total = totalBeforeTax + totalAfterTax;

    const paymentSummaryHTMl =
        `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${productsPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${shippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₹${totalAfterTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTMl;
}