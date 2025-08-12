<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;

use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    public function index()
    {
        return Inertia::render('Marketplace/Index');
    }

    public function show(Product $product)
    {
        return Inertia::render('Marketplace/Product', [
            'product' => $product,
        ]);
    }

}
