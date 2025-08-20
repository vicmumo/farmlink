<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;

Route::middleware('auth:sanctum')->get('/products', function () {
    return Product::with('farm')->get()->map(function ($product) {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'farm' => ['name' => $product->farm->name ?? 'Ungrouped'],
        ];
    });
});
