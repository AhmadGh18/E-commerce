<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_Item;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:10',
            'payment_method_id' => 'required|string',
            'longitude' => 'required|numeric',
            'latitude' => 'required|numeric',
            'city' => 'required|string',
            'total_price' => 'required|numeric',
            'user_id' => 'required|integer',
            'cartItems' => 'required|array',
            'cartItems.*.product_id' => 'required|integer',
            'cartItems.*.color' => 'required|string',
            'cartItems.*.price' => 'required|numeric',
            'cartItems.*.size' => 'required|string',
            'cartItems.*.quantity' => 'required|integer'
        ]);


        \Stripe\Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $request->amount *100,
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirm' => true,
                'confirmation_method' => 'automatic',
                'return_url' => env('APP_URL') . '/payment-success',


            ]);


            $order = Order::create([
                'user_id' => $request->user_id,
                'longitude' => $request->longitude,
                'latitude' => $request->latitude,
                'city' => $request->city,
                'total_price' => $request->total_price,
                'state' => 'not done',
            ]);
            foreach ($request->cartItems as $item) {
                Order_Item::create([
                    'product_id'=>$item['product_id'],
                    'color' => $item['color'],
                    "order_id"=>$order->id,
                    'size' => $item['size'],
                    'price_at_time' => $item['price'],
                    'quantity' => $item['quantity'],
                    // Add any additional fields you need
                ]);
            }






            Payment::create([
                'user_id' => $request->user_id,
                'stripe_payment_id' => $paymentIntent->id,
                'amount' => $request->amount,
                'currency' => 'usd',
                "order_id"=>$order->id,

            ]);

            return response()->json([
                'success' => true,
                'client_secret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function viewAllPayments()
    {
        try {
            $payments = Payment::with('user')->get(); // Assuming 'user' is the relationship name

            if ($payments->isEmpty()) {
                return response()->json([
                    'message' => 'No payment information available'
                ], 404);
            }

            return response()->json([
                'payments' => $payments
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage()
            ], 500);
        }
    }


}