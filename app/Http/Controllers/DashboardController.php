<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $data = match ($user->role) {
            'farmer' => [
                'farmCount' => $user->farms()->count(),
                'productCount' => $user->farm?->products()->count() ?? 0,
                'orderCount' => $user->orders()->count(),
            ],
            'consumer' => [
                'subscriptionStatus' => $user->subscriptions()->latest()->first()?->status ?? 'none',
                'orderCount' => $user->orders()->count(),
            ],
            'admin' => [
                'userCount' => \App\Models\User::count(),
                'farmCount' => \App\Models\Farm::count(),
                'productCount' => \App\Models\Product::count(),
            ],
        };

        return Inertia::render('Dashboard/Index', [
            'user' => $user,
            'data' => $data,
        ]);
    }


}




