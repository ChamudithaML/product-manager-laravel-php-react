<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',  
            'products' => 'required|json',  
            'total_amount' => 'required|numeric',
            'shipping_address' => 'required|string',
            'order_status' => 'required|in:pending,completed,shipped,canceled', 
            'payment_status' => 'required|in:paid,pending,failed',  
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the order
        $order = Order::create([
            'user_id' => $request->user_id,
            'products' => $request->products,
            'total_amount' => $request->total_amount,
            'shipping_address' => $request->shipping_address,
            'order_status' => $request->order_status,
            'payment_status' => $request->payment_status,
        ]);

        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    }

    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'products' => 'nullable|json',
            'total_amount' => 'nullable|numeric',
            'shipping_address' => 'nullable|string',
            'order_status' => 'nullable|in:pending,completed,shipped,canceled',
            'payment_status' => 'nullable|in:paid,pending,failed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the order by ID
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Update the order details
        $order->update([
            'products' => $request->products ?? $order->products,
            'total_amount' => $request->total_amount ?? $order->total_amount,
            'shipping_address' => $request->shipping_address ?? $order->shipping_address,
            'order_status' => $request->order_status ?? $order->order_status,
            'payment_status' => $request->payment_status ?? $order->payment_status,
        ]);

        return response()->json(['message' => 'Order updated successfully', 'order' => $order]);
    }

    public function destroy($id)
    {
        // Find the order by ID
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Delete the order
        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }
}
