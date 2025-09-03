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
    use AuthorizesRequests;

    public function index()
    {
        $products = Auth::user()
            ->products()
            ->with(['farm', 'linkedProducts:id,name']) // eager load linked products
            ->latest()
            ->get();

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
            'linked_product_ids' => 'array',
            'linked_product_ids.*' => 'exists:products,id',
        ]);

        $validated['user_id'] = $request->user()->id;

        $product = $request->user()->products()->create($validated);

        if ($request->filled('linked_product_ids')) {
            $product->linkedProducts()->sync($request->linked_product_ids);
        }

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        $this->authorize('update', $product);

        $product->load('linkedProducts:id,name'); // preload linked products
        $farms = Auth::user()->farms()->select('id', 'name')->get();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'farms' => $farms,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'farm_id' => 'required|exists:farms,id',
            'linked_product_ids' => 'array',
            'linked_product_ids.*' => 'exists:products,id',
        ]);

        $product->update($validated);

        if ($request->filled('linked_product_ids')) {
            $product->linkedProducts()->sync($request->linked_product_ids);
        } else {
            $product->linkedProducts()->detach();
        }

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function filtered()
    {
        $user = auth()->user();

        $query = Product::query()->with('farm');

        if ($user->role === 'farmer') {
            $query->where('farm_id', $user->farm_id); // assuming farm_id is linked to user
        }

        return $query->get()->map(fn ($product) => [
            'id' => $product->id,
            'name' => $product->name,
            'category' => $product->farm->name ?? 'Unassigned',
        ]);
    }
}
