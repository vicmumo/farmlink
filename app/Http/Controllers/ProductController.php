<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Models\Farm;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use AuthorizesRequests;

    public function index()
    {
        //return Inertia::render('Products/Index');
        $products = Auth::user()->products()->with('farm')->latest()->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $farms = Auth::user()->farms()->select('id', 'name')->get();

        return Inertia::render('Products/Create', [
            'farms' => $farms,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'farm_id' => 'required|exists:farms,id',
        ]);

        $request->user()->products()->create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $this->authorize('update', $product); // Optional

        $farms = Auth::user()->farms()->select('id', 'name')->get();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'farms' => $farms,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $this->authorize('update', $product); // Optional

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'farm_id' => 'required|exists:farms,id',
        ]);

        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }



}
