<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceItem;
use App\Models\Farm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MarketplaceController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $items = MarketplaceItem::with('farm', 'user')->latest()->get();

        return Inertia::render('Marketplace/Index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        $farms = Auth::user()->farms()->select('id', 'name')->get();
        
        return Inertia::render('Marketplace/Create', [
            'farms' => $farms,
        ]);
        
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'farm_id' => 'required|exists:farms,id',
        ]);

        Auth::user()->marketplaceItems()->create($validated);

        return redirect()->route('marketplace.index')->with('success', 'Item listed successfully.');
    }

    public function edit(MarketplaceItem $item)
    {
        $this->authorize('update', $item);

        $farms = Auth::user()->farms()->select('id', 'name')->get();

        return Inertia::render('Marketplace/Edit', [
            'item' => $item,
            'farms' => $farms,
        ]);
    }

    public function update(Request $request, MarketplaceItem $item)
    {
        $this->authorize('update', $item);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'farm_id' => 'required|exists:farms,id',
        ]);

        $item->update($validated);

        return redirect()->route('marketplace.index')->with('success', 'Item updated successfully.');
    }


    public function show(MarketplaceItem $item)
        {
            $item->load('farm', 'user');

            return Inertia::render('Marketplace/View', [
                'item' => $item,
            ]);
        }

}
