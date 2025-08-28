<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
class OrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $query = Order::with(['product', 'farm']);

        if ($user->isConsumer()) {
            $query->where('user_id', $user->id);
        } elseif ($user->isFarmer()) {
            $query->where('farm_id', $user->farm->id ?? null);
        }

        $orders = $query->latest()->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    public function create()
    {
        $products = Product::with('farm')->get();

        return Inertia::render('Orders/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'delivery_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        $total = $product->price * $validated['quantity'];

        $order = Order::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'farm_id' => $product->farm_id,
            'quantity' => $validated['quantity'],
            'total_price' => $total,
            'delivery_date' => $validated['delivery_date'],
            'notes' => $validated['notes'],
        ]);

        return redirect()->route('orders.index')->with('success', 'Order placed successfully.');
    }

    public function show(string $id)
    {
        $order = Order::with(['product', 'farm', 'user'])->findOrFail($id);

        return Inertia::render('Orders/View', [
            'order' => $order
        ]);
    }

    public function edit(string $id)
    {
        $order = Order::findOrFail($id);

        return Inertia::render('Orders/Edit', [
            'order' => $order
        ]);
    }

    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
            'payment_status' => 'required|in:unpaid,paid,refunded',
            'delivery_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return redirect()->route('orders.index')->with('success', 'Order updated successfully.');
    }

    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return redirect()->route('orders.index')->with('success', 'Order deleted.');
    }
}
