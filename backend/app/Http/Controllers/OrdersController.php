<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrdersRequest;
use App\Models\Order;
use App\Models\Order_Item;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    public function createOrder(OrdersRequest $request){
        $formFields = $request->validated();


        // Create the order
        $order = Order::create([
            'user_id' => $formFields['user_id'],
            'longitude' => $formFields['longitude'],
            'latitude' => $formFields['latitude'],
            'city' => $formFields['city'],

            'state' => $formFields['state'],
        ]);

        foreach ($formFields['cartItems'] as $item) {
            Order_Item::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['qnty'],
                // Add any additional fields you need
            ]);
        }

        return response()->json(['message' => 'Order added successfully']);
    }

    public function updateState($id, Request $request)
    {
        $formFields = $request->validate([
            'state' => 'required|string|max:255', // Adjust validation rules as needed
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->update([
            'state' => $formFields['state'], // Use validated state
        ]);

        return response()->json(['message' => 'Order state updated successfully']);
    }

    public function viewAllOrders()
    {
        $orders = Order::with('orderedItems')->get();

        return response()->json(['orders' => $orders], 200);
    }
    public function viewSingleOrder($id)
    {
        $order = Order::with('orderedItems')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json(['order' => $order], 200);
    }





    }