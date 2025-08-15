<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        $subscriptions = Subscription::query()
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('SubscriptionList', [
            'subscriptions' => $subscriptions->items(),
            'meta' => $subscriptions->toArray()['meta'] ?? [],
            'links' => $subscriptions->toArray()['links'] ?? [], 
            'auth' => $request->user(),
        ]);
    }

    public function create()
    {
        return Inertia::render('SubscriptionForm', [
            'products' => Product::all(), // or filtered by role
            'auth' => auth()->user(),
        ]);
    }

    public function edit(Subscription $subscription)
    {
        return Inertia::render('SubscriptionForm', [
            'subscription' => $subscription,
            'products' => Product::all(),
            'selectedProducts' => $subscription->products->pluck('id'),
            'auth' => auth()->user(),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'plan' => 'required|string|max:255',
            'frequency' => 'required|in:weekly,monthly,quarterly',
            'start_date' => 'required|date',
            'status' => 'required|in:active,paused,cancelled',
        ]);

        Subscription::create($validated);

        // return redirect()->route('subscriptions.index')->with('success', 'Subscription created.');
        // return redirect()->route('subscriptions.index')->with('success', 'Subscription created successfully');
        // return redirect()->back()->with('error', 'Failed to create subscription');

        try {
            Subscription::create($validated);
            return redirect()->route('subscriptions.index')->with('success', 'Subscription created successfully');
        } catch (\Exception $e) {
            \Log::error('Subscription creation failed', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to create subscription');

        }


    }

    public function update(Request $request, Subscription $subscription)
    {
        $validated = $request->validate([
            'plan' => 'required|string|max:255',
            'frequency' => 'required|in:weekly,monthly,quarterly',
            'start_date' => 'required|date',
            'status' => 'required|in:active,paused,cancelled',
        ]);

        $subscription->update($validated);

        return redirect()->route('subscriptions.index')->with('success', 'Subscription updated successfully');
    }

}
